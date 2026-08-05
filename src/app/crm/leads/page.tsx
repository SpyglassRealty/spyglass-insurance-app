"use client";

import { useEffect, useState } from "react";

const STAGES = ["new", "contacted", "qualified", "quoted", "bound", "lost"] as const;

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);

  async function load() {
    const r = await fetch("/api/crm/leads");
    const d = await r.json();
    setLeads(d.leads || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function move(id: string, stage: string) {
    await fetch("/api/crm/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, stage }),
    });
    load();
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Pipeline</h1>
        <p className="text-sm text-spy-muted">Insurance sales stages · drag-free stage buttons</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {STAGES.map((stage) => (
          <div key={stage} className="card p-3 min-h-[280px] bg-spy-surface">
            <div className="text-xs font-bold uppercase tracking-wide text-spy-muted mb-3">
              {stage} ({leads.filter((l) => l.stage === stage).length})
            </div>
            <div className="space-y-2">
              {leads
                .filter((l) => l.stage === stage)
                .map((l) => (
                  <div key={l.id} className="bg-white border border-spy-border rounded-lg p-3 shadow-sm">
                    <div className="font-semibold text-sm">
                      {l.contact
                        ? `${l.contact.firstName} ${l.contact.lastName}`
                        : l.id}
                    </div>
                    <div className="text-xs text-spy-muted mt-1">
                      {String(l.coverageInterest).replaceAll("_", " ")}
                    </div>
                    <div className="text-xs mt-1">Score {l.score}</div>
                    {l.valueEstimate ? (
                      <div className="text-xs font-medium mt-1">
                        ${l.valueEstimate.toLocaleString()} est.
                      </div>
                    ) : null}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {STAGES.filter((s) => s !== stage).slice(0, 3).map((s) => (
                        <button
                          key={s}
                          onClick={() => move(l.id, s)}
                          className="text-[10px] px-1.5 py-0.5 rounded border border-spy-border hover:border-spy-orange hover:text-spy-orange"
                        >
                          → {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
