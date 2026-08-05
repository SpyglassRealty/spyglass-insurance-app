"use client";

import { useEffect, useState } from "react";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/crm/dashboard")
      .then((r) => r.json())
      .then((d) => setContacts(d.contacts || []));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Contacts</h1>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-spy-surface text-left text-xs uppercase text-spy-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Tags</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-t border-spy-border">
                <td className="px-4 py-3 font-medium">
                  {c.firstName} {c.lastName}
                </td>
                <td className="px-4 py-3">{c.email}</td>
                <td className="px-4 py-3">{c.phone}</td>
                <td className="px-4 py-3">
                  {c.city || "—"} {c.zip || ""}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {(c.tags || []).map((t: string) => (
                      <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-spy-surface border border-spy-border">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
