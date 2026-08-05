"use client";

import { useEffect, useRef, useState } from "react";

type ChatMsg = { role: "bot" | "user"; text: string; time: string };

function visitorId() {
  if (typeof window === "undefined") return "ssr";
  const key = "spy_visitor_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = "vis_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(key, id);
  }
  return id;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    {
      role: "bot",
      text: "Hi — I’m the Spyglass Insurance assistant. I can help with P&C, professional liability, renters, or supplemental coverage.",
      time: "Just now",
    },
  ]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [aiEnabled, setAiEnabled] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  async function send(text: string, requestHuman = false) {
    const clean = text.trim();
    if (!clean && !requestHuman) return;
    if (clean) {
      setMsgs((m) => [...m, { role: "user", text: clean, time: "Now" }]);
    }
    setInput("");
    const r = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId: visitorId(),
        message: clean || "Please connect me to an agent",
        requestHuman,
        conversationId,
      }),
    });
    const d = await r.json();
    if (d.conversationId) setConversationId(d.conversationId);
    if (typeof d.aiEnabled === "boolean") setAiEnabled(d.aiEnabled);
    if (d.reply) {
      setMsgs((m) => [...m, { role: "bot", text: d.reply, time: "Now" }]);
    } else if (d.waitingForAgent) {
      setMsgs((m) => [
        ...m,
        {
          role: "bot",
          text: "An agent has this chat. They’ll reply here from the CRM inbox.",
          time: "Now",
        },
      ]);
    }
  }

  return (
    <div className="fixed right-5 bottom-5 z-[100]">
      {open && (
        <div className="mb-3 w-[min(360px,calc(100vw-2rem))] h-[min(480px,70vh)] bg-white border border-spy-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-spy-charcoal text-white px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-spy-orange grid place-items-center text-xs font-bold">
              SI
            </div>
            <div>
              <div className="font-semibold text-sm">Spyglass AI</div>
              <div className="text-[11px] text-white/70">
                {aiEnabled ? "Online · AI assistant" : "Agent mode · AI paused"}
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-3 space-y-2 bg-spy-surface">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[88%] rounded-xl px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-spy-orange text-white"
                    : "bg-white border border-spy-border"
                }`}
              >
                {m.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="px-3 pb-2 flex flex-wrap gap-1 bg-spy-surface">
            {["Renters", "P&C", "Professional liability", "Talk to agent"].map((q) => (
              <button
                key={q}
                className="text-[11px] px-2 py-1 rounded-full bg-white border border-spy-border hover:border-spy-orange hover:text-spy-orange"
                onClick={() =>
                  q === "Talk to agent"
                    ? send("I'd like to talk to an agent", true)
                    : send(
                        q === "P&C"
                          ? "Tell me about property and casualty"
                          : q === "Renters"
                          ? "I need renters insurance"
                          : "I need professional liability"
                      )
                }
              >
                {q}
              </button>
            ))}
          </div>
          <form
            className="p-3 border-t border-spy-border flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              className="flex-1 border border-spy-border rounded-full px-3 py-2 text-sm"
              placeholder="Ask about coverage…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="w-11 h-11 rounded-full bg-spy-orange text-white font-bold">
              →
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-[60px] h-[60px] rounded-full bg-spy-orange text-white shadow-lg shadow-orange-500/30 grid place-items-center text-2xl ml-auto"
        aria-label="Open chat"
      >
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}
