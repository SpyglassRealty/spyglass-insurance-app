/**
 * Lead notifications: email (Gmail API) + SMS (Twilio).
 * All recipients / credentials come from env — never hardcode secrets.
 */

function splitList(value) {
  return String(value || "")
    .split(/[,;\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function e164(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (String(phone || "").startsWith("+") && digits.length >= 10) return `+${digits}`;
  return null;
}

function formatLeadBody(lead) {
  const lines = [
    "New Spyglass Insurance quote request",
    "",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Interest: ${lead.interest}`,
    `Location: ${lead.location || "—"}`,
    `Source: ${lead.source || "website_form"}`,
    `Message: ${lead.message || "—"}`,
    `Lead ID: ${lead.id || "—"}`,
    `Time: ${lead.createdAt || new Date().toISOString()}`,
    "",
    "Reply to the client email/phone above.",
  ];
  return lines.join("\n");
}

function formatLeadSms(lead) {
  const loc = lead.location ? ` · ${lead.location}` : "";
  return (
    `Spyglass Insurance lead: ${lead.name}` +
    ` · ${lead.interest}${loc}` +
    ` · ${lead.phone}` +
    ` · ${lead.email}` +
    (lead.message ? ` · "${String(lead.message).slice(0, 80)}"` : "")
  ).slice(0, 320);
}

async function getGmailAccessToken() {
  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    return { error: "Gmail OAuth env missing (GMAIL_CLIENT_ID/SECRET/REFRESH_TOKEN)" };
  }
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    return { error: `Gmail token refresh failed: ${data.error || res.status}` };
  }
  return { accessToken: data.access_token };
}

function toBase64Url(str) {
  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function sendGmail({ to, subject, text }) {
  const tokenResult = await getGmailAccessToken();
  if (tokenResult.error) return { ok: false, error: tokenResult.error };

  const from = process.env.GMAIL_SENDER || "ryan@spyglassrealty.com";
  const raw = [
    `From: Spyglass Insurance Leads <${from}>`,
    `To: ${to}`,
    `Reply-To: ${from}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    text,
  ].join("\r\n");

  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenResult.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw: toBase64Url(raw) }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { ok: false, error: data.error?.message || `Gmail send ${res.status}` };
  }
  return { ok: true, id: data.id };
}

async function sendTwilioSms({ to, body }) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const auth = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER || process.env.TWILIO_FROM_NUMBER;
  if (!sid || !auth || !from) {
    return { ok: false, error: "Twilio env missing (TWILIO_ACCOUNT_SID/AUTH_TOKEN/PHONE_NUMBER)" };
  }
  const toE164 = e164(to);
  if (!toE164) return { ok: false, error: `Invalid SMS destination: ${to}` };

  const params = new URLSearchParams({ To: toE164, From: from, Body: body });
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${sid}:${auth}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    }
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { ok: false, error: data.message || `Twilio ${res.status}` };
  }
  return { ok: true, sid: data.sid };
}

/**
 * Notify configured email + SMS recipients about a new lead.
 * Failures are returned (not thrown) so the lead API can still succeed.
 */
export async function notifyLeadRecipients(lead) {
  const emails = splitList(
    process.env.LEAD_NOTIFY_EMAILS || "ryan@spyglassrealty.com"
  );
  // SMS recipients come ONLY from env (this repo is public, so personal mobile
  // numbers are not committed). Set LEAD_NOTIFY_PHONES in Vercel, e.g.
  // "+15125550100,+15125550101". If unset, no SMS alerts are sent.
  const phones = splitList(process.env.LEAD_NOTIFY_PHONES || "");

  const subject = `Insurance lead: ${lead.name} · ${lead.interest}`;
  const emailBody = formatLeadBody(lead);
  const smsBody = formatLeadSms(lead);

  const results = { email: [], sms: [] };

  // One email with all recipients in To (or individual if preferred)
  if (emails.length) {
    const to = emails.join(", ");
    const r = await sendGmail({ to, subject, text: emailBody }).catch((e) => ({
      ok: false,
      error: String(e?.message || e),
    }));
    results.email.push({ to, ...r });
  }

  for (const phone of phones) {
    const r = await sendTwilioSms({ to: phone, body: smsBody }).catch((e) => ({
      ok: false,
      error: String(e?.message || e),
    }));
    results.sms.push({ to: phone, ...r });
  }

  const failed = [...results.email, ...results.sms].filter((r) => !r.ok);
  return {
    ok: failed.length === 0,
    results,
    errors: failed.map((f) => f.error).filter(Boolean),
  };
}
