"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Stats = {
  openLeads: number;
  openConvos: number;
  needsHuman: number;
  tasksDue: number;
  pipelineValue: number;
  policies: number;
};

export default function CrmDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/crm/dashboard")
      .then((r) => r.json())
      .then((d) => {
        setStats(d.stats);
        setTasks(d.tasks || []);
      });
  }, []);

  const cards = [
    { label: "Open leads", value: stats?.openLeads ?? "—", href: "/crm/leads" },
    { label: "Open conversations", value: stats?.openConvos ?? "—", href: "/crm/inbox" },
    { label: "Needs human / unread", value: stats?.needsHuman ?? "—", href: "/crm/inbox" },
    { label: "Open tasks", value: stats?.tasksDue ?? "—", href: "/crm" },
    {
      label: "Pipeline $ (est.)",
      value: stats ? `$${stats.pipelineValue.toLocaleString()}` : "—",
      href: "/crm/leads",
    },
    { label: "Policies", value: stats?.policies ?? "—", href: "/crm/policies" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-spy-muted text-sm mt-1">
          Insurance CRM — leads, renewals, SMS, and chatbot takeover in one place.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="card p-4 hover:shadow-md transition">
            <div className="text-xs uppercase tracking-wide text-spy-muted">{c.label}</div>
            <div className="text-3xl font-bold mt-2 text-spy-dark">{c.value}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <section className="card p-5">
          <h2 className="font-semibold mb-3">Priority tasks</h2>
          <ul className="space-y-2">
            {tasks.filter((t) => !t.done).slice(0, 6).map((t) => (
              <li key={t.id} className="flex items-start justify-between gap-3 text-sm border-b border-spy-border pb-2">
                <div>
                  <div className="font-medium">{t.title}</div>
                  <div className="text-spy-muted text-xs">
                    {t.contact ? `${t.contact.firstName} ${t.contact.lastName}` : "—"} · {t.type}
                  </div>
                </div>
                <div className="text-xs text-spy-muted whitespace-nowrap">
                  {new Date(t.dueAt).toLocaleDateString()}
                </div>
              </li>
            ))}
            {!tasks.length && <li className="text-sm text-spy-muted">Loading…</li>}
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="font-semibold mb-3">Built for insurance ops</h2>
          <ul className="text-sm space-y-2 text-spy-muted">
            <li>• Lead pipeline: New → Contacted → Qualified → Quoted → Bound</li>
            <li>• Omnichannel inbox: website chat + SMS</li>
            <li>• AI chatbot with one-click agent takeover</li>
            <li>• Outbound SMS (Twilio when configured)</li>
            <li>• Renewal / follow-up tasks</li>
            <li>• Website form → CRM lead capture</li>
          </ul>
          <div className="mt-4 flex gap-2">
            <Link href="/crm/inbox" className="btn-primary text-sm">Open inbox</Link>
            <Link href="/crm/leads" className="btn-dark text-sm">View pipeline</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
