"use client";

import { useEffect, useMemo, useState } from "react";

type Convo = {
  id: string;
  channel: string;
  status: string;
  subject: string;
  phone?: string;
  unread: number;
  aiEnabled: boolean;
  contact?: { firstName: string; lastName: string; phone: string } | null;
  lastMessage?: { body: string; role: string; createdAt: string } | null;
};

type Msg = {
  id: string;
  role: string;
  body: string;
  createdAt: string;
  agentName?: string;
  channel: string;
};

export default function InboxPage() {
  const [convos, setConvos] = useState<Convo[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [reply, setReply] = useState("");
  const [smsTo, setSmsTo] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadConvos() {
    const r = await fetch("/api/crm/inbox");
    const d = await r.json();
    setConvos(d.conversations || []);
    if (!activeId && d.conversations?.[0]) setActiveId(d.conversations[0].id);
  }

  async function loadMessages(id: string) {
    const r = await fetch("/api/crm/inbox", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "messages", conversationId: id }),
    });
    const d = await r.json();
    setMessages(d.messages || []);
  }

  useEffect(() => {
    loadConvos();
    const t = setInterval(loadConvos, 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (activeId) loadMessages(activeId);
  }, [activeId]);

  const active = useMemo(() => convos.find((c) => c.id === activeId) || null, [convos, activeId]);

  async function act(action: string, extra: Record<string, unknown> = {}) {
    if (!activeId) return;
    setBusy(true);
    await fetch("/api/crm/inbox", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, conversationId: activeId, agentName: "Ryan Rodenbeck", ...extra }),
    });
    await loadConvos();
    await loadMessages(activeId);
    setBusy(false);
  }

  async function sendReply() {
    if (!reply.trim() || !activeId) return;
    setBusy(true);
    if (active?.channel === "sms" && (active.phone || active.contact?.phone)) {
      await fetch("/api/sms/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: active.phone || active.contact?.phone,
          body: reply,
          conversationId: activeId,
          agentName: "Ryan Rodenbeck",
        }),
      });
    } else {
      await act("reply", { body: reply });
    }
    setReply("");
    await loadConvos();
    if (activeId) await loadMessages(activeId);
    setBusy(false);
  }

  async function startSms() {
    if (!smsTo.trim() || !reply.trim()) return;
    setBusy(true);
    const r = await fetch("/api/sms/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: smsTo, body: reply, agentName: "Ryan Rodenbeck" }),
    });
    const d = await r.json();
    setReply("");
    await loadConvos();
    if (d.conversationId) setActiveId(d.conversationId);
    setBusy(false);
  }

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col gap-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Inbox</h1>
          <p className="text-sm text-spy-muted">Web chat + SMS · take over AI conversations</p>
        </div>
        <div className="flex gap-2 items-center">
          <input
            className="border border-spy-border rounded-spy px-3 py-2 text-sm min-w-[160px]"
            placeholder="SMS to +1..."
            value={smsTo}
            onChange={(e) => setSmsTo(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        <div className="col-span-4 card overflow-auto">
          {convos.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`w-full text-left px-4 py-3 border-b border-spy-border hover:bg-spy-surface ${
                activeId === c.id ? "bg-orange-50" : ""
              }`}
            >
              <div className="flex justify-between gap-2">
                <div className="font-medium text-sm truncate">
                  {c.contact ? `${c.contact.firstName} ${c.contact.lastName}` : c.subject}
                </div>
                <span className="text-[10px] uppercase tracking-wide text-spy-muted">{c.channel}</span>
              </div>
              <div className="text-xs text-spy-muted truncate mt-0.5">
                {c.lastMessage?.body || "No messages"}
              </div>
              <div className="flex gap-2 mt-1">
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    c.status === "human"
                      ? "bg-spy-orange text-white"
                      : c.status === "ai"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {c.status === "human" ? "AGENT" : c.status.toUpperCase()}
                </span>
                {c.unread > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-spy-dark text-white">
                    {c.unread} new
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="col-span-8 card flex flex-col min-h-0">
          {active ? (
            <>
              <div className="px-4 py-3 border-b border-spy-border flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="font-semibold">
                    {active.contact
                      ? `${active.contact.firstName} ${active.contact.lastName}`
                      : active.subject}
                  </div>
                  <div className="text-xs text-spy-muted">
                    {active.channel.toUpperCase()} · {active.phone || active.contact?.phone || "—"}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={busy}
                    onClick={() => act("takeover")}
                    className="btn-primary text-xs min-h-9 px-3"
                  >
                    Take over
                  </button>
                  <button
                    disabled={busy}
                    onClick={() => act("release_to_ai")}
                    className="btn-dark text-xs min-h-9 px-3"
                  >
                    Release to AI
                  </button>
                  <button
                    disabled={busy}
                    onClick={() => act("close")}
                    className="text-xs min-h-9 px-3 rounded-spy border border-spy-border"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-4 space-y-3 bg-spy-surface">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                      m.role === "agent" || m.role === "ai"
                        ? "ml-auto bg-spy-orange text-white"
                        : m.role === "system"
                        ? "mx-auto bg-gray-200 text-gray-700 text-xs"
                        : "bg-white border border-spy-border"
                    }`}
                  >
                    <div className="opacity-70 text-[10px] mb-0.5 uppercase">
                      {m.role}
                      {m.agentName ? ` · ${m.agentName}` : ""}
                    </div>
                    {m.body}
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-spy-border flex gap-2">
                <input
                  className="flex-1 border border-spy-border rounded-full px-4 py-2 text-sm"
                  placeholder={
                    active.channel === "sms"
                      ? "Reply via SMS…"
                      : "Reply as agent (takes over AI)…"
                  }
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendReply()}
                />
                <button disabled={busy} onClick={sendReply} className="btn-primary text-sm">
                  Send
                </button>
                {smsTo && (
                  <button disabled={busy} onClick={startSms} className="btn-dark text-sm">
                    New SMS
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 grid place-items-center text-spy-muted text-sm">
              Select a conversation
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
