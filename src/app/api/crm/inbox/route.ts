import { NextResponse } from "next/server";
import {
  appendMessage,
  db,
  getContact,
  setConversationMode,
} from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = db();
  const conversations = data.conversations
    .map((c) => ({
      ...c,
      contact: c.contactId ? getContact(c.contactId) || null : null,
      lastMessage:
        data.messages
          .filter((m) => m.conversationId === c.id)
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0] || null,
    }))
    .sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt));
  return NextResponse.json({ conversations });
}

export async function POST(req: Request) {
  const body = await req.json();
  const action = String(body.action || "");
  const conversationId = String(body.conversationId || "");
  if (!conversationId) return NextResponse.json({ error: "conversationId required" }, { status: 400 });

  if (action === "takeover") {
    const conv = setConversationMode(conversationId, "human", false);
    appendMessage({
      conversationId,
      role: "system",
      channel: conv.channel,
      body: `${body.agentName || "Agent"} took over the conversation. AI paused.`,
      agentName: body.agentName || "Agent",
    });
    return NextResponse.json({ conversation: conv });
  }

  if (action === "release_to_ai") {
    const conv = setConversationMode(conversationId, "ai", true);
    appendMessage({
      conversationId,
      role: "system",
      channel: conv.channel,
      body: "Conversation released back to AI assistant.",
    });
    return NextResponse.json({ conversation: conv });
  }

  if (action === "close") {
    const conv = setConversationMode(conversationId, "closed", false);
    return NextResponse.json({ conversation: conv });
  }

  if (action === "reply") {
    const text = String(body.body || "").trim();
    if (!text) return NextResponse.json({ error: "body required" }, { status: 400 });
    const conv = db().conversations.find((c) => c.id === conversationId);
    if (!conv) return NextResponse.json({ error: "not found" }, { status: 404 });
    // Ensure human mode when agent replies
    if (conv.status === "ai") setConversationMode(conversationId, "human", false);
    const msg = appendMessage({
      conversationId,
      role: "agent",
      channel: conv.channel,
      body: text,
      agentName: body.agentName || "Agent",
    });
    conv.unread = 0;
    return NextResponse.json({ message: msg, conversation: conv });
  }

  if (action === "messages") {
    const messages = db()
      .messages.filter((m) => m.conversationId === conversationId)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    const conv = db().conversations.find((c) => c.id === conversationId) || null;
    if (conv) conv.unread = 0;
    return NextResponse.json({ conversation: conv, messages });
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
