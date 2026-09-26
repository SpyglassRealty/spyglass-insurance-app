import { NextResponse } from "next/server";
import { notifyLeadRecipients } from "../../lib/notify";

export const dynamic = "force-dynamic";

// Lightweight lead intake for marketing forms.
// When CRM store is available under src/, upgrade this to upsertLeadFromForm.
const g = globalThis;

function storeLead(lead) {
  if (!g.__spyglassLeads) g.__spyglassLeads = [];
  g.__spyglassLeads.push({ ...lead, id: `lead_${Date.now()}`, createdAt: new Date().toISOString() });
  if (g.__spyglassLeads.length > 200) g.__spyglassLeads.shift();
  return g.__spyglassLeads[g.__spyglassLeads.length - 1];
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const interest = String(body.interest || "").trim();
  const location = String(body.location || body.zip || "").trim();
  const message = String(body.message || "").trim();
  const source = String(body.source || "website_form").trim();

  if (!name || !email || !phone || !interest) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  let saved = null;
  let crmResult = null;

  try {
    // Prefer CRM store if present
    const mod = await import("@/lib/store").catch(() => null);
    if (mod?.upsertLeadFromForm) {
      crmResult = mod.upsertLeadFromForm({
        name,
        email,
        phone,
        interest,
        location,
        message,
        source,
      });
      saved = {
        id: crmResult?.leadId || crmResult?.id || `lead_${Date.now()}`,
        name,
        email,
        phone,
        interest,
        location,
        message,
        source,
        createdAt: new Date().toISOString(),
      };
    }
  } catch {
    // fall through to in-memory
  }

  if (!saved) {
    saved = storeLead({ name, email, phone, interest, location, message, source });
  }

  // Email + SMS Ryan and Tony (and any LEAD_NOTIFY_* env recipients)
  let notify = null;
  try {
    notify = await notifyLeadRecipients(saved);
    if (!notify.ok) {
      console.error("[leads] notify partial/fail", JSON.stringify(notify));
    }
  } catch (err) {
    console.error("[leads] notify threw", err);
    notify = { ok: false, errors: [String(err?.message || err)] };
  }

  return NextResponse.json({
    ok: true,
    leadId: saved.id,
    ...(crmResult || {}),
    notifyOk: Boolean(notify?.ok),
  });
}
