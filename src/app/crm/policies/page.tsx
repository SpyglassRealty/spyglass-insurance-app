"use client";

import { useEffect, useState } from "react";

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/crm/dashboard")
      .then((r) => r.json())
      .then((d) => setPolicies(d.policies || []));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Policies</h1>
      <p className="text-sm text-spy-muted">Bound / pending policies and renewal dates</p>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-spy-surface text-left text-xs uppercase text-spy-muted">
            <tr>
              <th className="px-4 py-3">Insured</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Carrier</th>
              <th className="px-4 py-3">Policy #</th>
              <th className="px-4 py-3">Premium</th>
              <th className="px-4 py-3">Renewal</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((p) => (
              <tr key={p.id} className="border-t border-spy-border">
                <td className="px-4 py-3 font-medium">
                  {p.contact ? `${p.contact.firstName} ${p.contact.lastName}` : "—"}
                </td>
                <td className="px-4 py-3">{String(p.type).replaceAll("_", " ")}</td>
                <td className="px-4 py-3">{p.carrier}</td>
                <td className="px-4 py-3">{p.policyNumber}</td>
                <td className="px-4 py-3">${p.premiumMonthly}/mo</td>
                <td className="px-4 py-3">{p.renewalDate}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-100">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
            {!policies.length && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-spy-muted">
                  No policies yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
