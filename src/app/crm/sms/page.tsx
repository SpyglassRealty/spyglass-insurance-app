"use client";

import { useEffect, useState } from "react";

export default function SmsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [to, setTo] = useState("+15125550102");
  const [body, setBody] = useState("Hi — Spyglass Insurance following up on your quote.");
  const [result, setResult] = useState("");

  async function load() {
    const r = await fetch("/api/crm/dashboard");
    const d = await r.json();
    setLogs(d.smsLogs || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function send() {
    const r = await fetch("/api/sms/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, body, agentName: "Ryan Rodenbeck" }),
    });
    const d = await r.json();
    setResult(JSON.stringify(d, null, 2));
    load();
  }

  return (
    <div className="space-y-4 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">SMS</h1>
        <p className="text-sm text-spy-muted">
          Outbound SMS + Twilio webhook at <code className="text-xs bg-spy-surface px-1 rounded">/api/sms/webhook</code>
        </p>
      </div>

      <div className="card p-5 space-y-3">
        <label className="block text-sm font-semibold">
          To
          <input
            className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </label>
        <label className="block text-sm font-semibold">
          Message
          <textarea
            className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal min-h-24"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <button onClick={send} className="btn-primary">
          Send SMS
        </button>
        {result && (
          <pre className="text-xs bg-spy-surface p-3 rounded-lg overflow-auto border border-spy-border">
            {result}
          </pre>
        )}
        <p className="text-xs text-spy-muted">
          Without <code>TWILIO_ACCOUNT_SID</code>, <code>TWILIO_AUTH_TOKEN</code>, and{" "}
          <code>TWILIO_FROM_NUMBER</code>, messages are stored in demo mode only.
        </p>
      </div>

      <div className="card overflow-hidden">
        <div className="px-4 py-3 border-b border-spy-border font-semibold text-sm">Recent SMS log</div>
        <ul className="divide-y divide-spy-border">
          {logs.map((l) => (
            <li key={l.id} className="px-4 py-3 text-sm">
              <div className="flex justify-between gap-2">
                <span className="font-medium">
                  {l.direction} · {l.provider} · {l.status}
                </span>
                <span className="text-xs text-spy-muted">{new Date(l.createdAt).toLocaleString()}</span>
              </div>
              <div className="text-xs text-spy-muted">
                {l.from} → {l.to}
              </div>
              <div className="mt-1">{l.body}</div>
            </li>
          ))}
          {!logs.length && <li className="px-4 py-6 text-sm text-spy-muted">No SMS yet</li>}
        </ul>
      </div>
    </div>
  );
}
