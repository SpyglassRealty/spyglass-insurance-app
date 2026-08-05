import { NextResponse } from "next/server";
import {
  aiReply,
  appendMessage,
  createOrGetWebConversation,
  db,
  setConversationMode,
} from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json();
  const visitorId = String(body.visitorId || "anon");
  const text = String(body.message || "").trim();
  const takeover = Boolean(body.requestHuman);

  if (!text && !takeover) {
    return NextResponse.json({ error: "message required" }, { status: 400 });
  }

  const conv = createOrGetWebConversation(visitorId, {
    email: body.email,
    phone: body.phone,
    name: body.name,
  });

  if (takeover || /human|agent|representative|take over/i.test(text)) {
    if (text) {
      appendMessage({
        conversationId: conv.id,
        role: "lead",
        channel: "web_chat",
        body: text || "Please connect me to an agent.",
      });
    }
    setConversationMode(conv.id, "human", false);
    appendMessage({
      conversationId: conv.id,
      role: "system",
      channel: "web_chat",
      body: "Conversation handed to a human agent. AI paused.",
    });
    const reply =
      "You're connected to our team queue. An agent can take over this chat from the CRM inbox.";
    appendMessage({
      conversationId: conv.id,
      role: "ai",
      channel: "web_chat",
      body: reply,
    });
    return NextResponse.json({
      conversationId: conv.id,
      status: "human",
      reply,
      aiEnabled: false,
    });
  }

  appendMessage({
    conversationId: conv.id,
    role: "lead",
    channel: "web_chat",
    body: text,
  });

  // If human mode, do not auto-reply
  if (conv.status === "human" || !conv.aiEnabled) {
    return NextResponse.json({
      conversationId: conv.id,
      status: conv.status,
      reply: null,
      aiEnabled: false,
      waitingForAgent: true,
    });
  }

  const reply = aiReply(text);
  appendMessage({
    conversationId: conv.id,
    role: "ai",
    channel: "web_chat",
    body: reply,
  });

  return NextResponse.json({
    conversationId: conv.id,
    status: conv.status,
    reply,
    aiEnabled: true,
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const visitorId = searchParams.get("visitorId");
  const conversationId = searchParams.get("conversationId");
  const data = db();
  let conv = conversationId
    ? data.conversations.find((c) => c.id === conversationId)
    : data.conversations.find((c) => c.visitorId === visitorId && c.channel === "web_chat");
  if (!conv) return NextResponse.json({ messages: [], conversation: null });
  const messages = data.messages
    .filter((m) => m.conversationId === conv!.id)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  return NextResponse.json({ conversation: conv, messages });
}
