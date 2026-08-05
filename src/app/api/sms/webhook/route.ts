import { NextResponse } from "next/server";
import {
  aiReply,
  appendMessage,
  findOrCreateSmsConversation,
  logSms,
} from "@/lib/store";

export const dynamic = "force-dynamic";

/**
 * Twilio inbound webhook (application/x-www-form-urlencoded)
 * Configure Twilio number SMS webhook → POST /api/sms/webhook
 */
export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  let from = "";
  let to = "";
  let body = "";

  if (contentType.includes("application/json")) {
    const json = await req.json();
    from = String(json.From || json.from || "");
    to = String(json.To || json.to || "");
    body = String(json.Body || json.body || "");
  } else {
    const form = await req.formData();
    from = String(form.get("From") || "");
    to = String(form.get("To") || "");
    body = String(form.get("Body") || "");
  }

  if (!from || !body) {
    return NextResponse.json({ error: "From and Body required" }, { status: 400 });
  }

  const conv = findOrCreateSmsConversation(from);
  appendMessage({
    conversationId: conv.id,
    role: "lead",
    channel: "sms",
    body,
  });
  logSms({
    conversationId: conv.id,
    direction: "inbound",
    from,
    to: to || "spyglass",
    body,
    status: "received",
    provider: "twilio",
  });

  // Auto-reply only if AI mode
  if (conv.aiEnabled && conv.status === "ai") {
    const reply = aiReply(body);
    appendMessage({
      conversationId: conv.id,
      role: "ai",
      channel: "sms",
      body: reply,
    });
    logSms({
      conversationId: conv.id,
      direction: "outbound",
      from: to || "spyglass",
      to: from,
      body: reply,
      status: "queued",
      provider: process.env.TWILIO_ACCOUNT_SID ? "twilio" : "demo",
    });

    // Twilio expects TwiML for synchronous reply (optional)
    const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escapeXml(reply)}</Message></Response>`;
    return new NextResponse(twiml, {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  }

  // Human mode — no auto reply
  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`;
  return new NextResponse(twiml, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
