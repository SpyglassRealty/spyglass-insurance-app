import { NextResponse } from "next/server";
import {
  aiReply,
  appendMessage,
  findOrCreateSmsConversation,
  logSms,
  setConversationMode,
} from "@/lib/store";

export const dynamic = "force-dynamic";

/**
 * Outbound SMS
 * Production: set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER
 * Without Twilio credentials, runs in demo mode (logs only).
 */
export async function POST(req: Request) {
  const body = await req.json();
  const to = String(body.to || "").trim();
  const text = String(body.body || "").trim();
  const conversationId = body.conversationId as string | undefined;
  const agentName = String(body.agentName || "Agent");

  if (!to || !text) {
    return NextResponse.json({ error: "to and body required" }, { status: 400 });
  }

  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER || "Spyglass";

  let conv = conversationId
    ? undefined
    : findOrCreateSmsConversation(to);
  if (conversationId) {
    // keep provided id path via find
    const { db } = await import("@/lib/store");
    conv = db().conversations.find((c) => c.id === conversationId) || findOrCreateSmsConversation(to);
  }
  if (!conv) conv = findOrCreateSmsConversation(to);

  // Agent outbound => human mode
  setConversationMode(conv.id, "human", false);
  appendMessage({
    conversationId: conv.id,
    role: "agent",
    channel: "sms",
    body: text,
    agentName,
  });

  if (sid && token && process.env.TWILIO_FROM_NUMBER) {
    try {
      const auth = Buffer.from(`${sid}:${token}`).toString("base64");
      const params = new URLSearchParams({ To: to, From: process.env.TWILIO_FROM_NUMBER, Body: text });
      const res = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        logSms({
          conversationId: conv.id,
          direction: "outbound",
          from: process.env.TWILIO_FROM_NUMBER,
          to,
          body: text,
          status: "failed",
          provider: "twilio",
        });
        return NextResponse.json({ error: data, demo: false }, { status: 502 });
      }
      logSms({
        conversationId: conv.id,
        direction: "outbound",
        from: process.env.TWILIO_FROM_NUMBER,
        to,
        body: text,
        status: "sent",
        provider: "twilio",
      });
      return NextResponse.json({ ok: true, provider: "twilio", sid: data.sid, conversationId: conv.id });
    } catch (e) {
      return NextResponse.json({ error: String(e) }, { status: 500 });
    }
  }

  // Demo mode
  logSms({
    conversationId: conv.id,
    direction: "outbound",
    from: from,
    to,
    body: text,
    status: "sent",
    provider: "demo",
  });
  return NextResponse.json({
    ok: true,
    provider: "demo",
    conversationId: conv.id,
    note: "Twilio not configured — SMS logged in CRM only. Add TWILIO_* env vars for live SMS.",
  });
}
