import { NextResponse } from "next/server";
import { dashboardStats, db, getContact } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = db();
  return NextResponse.json({
    stats: dashboardStats(),
    agents: data.agents,
    tasks: data.tasks.map((t) => ({
      ...t,
      contact: t.contactId ? getContact(t.contactId) || null : null,
    })),
    policies: data.policies.map((p) => ({
      ...p,
      contact: getContact(p.contactId) || null,
    })),
    contacts: data.contacts,
    smsLogs: data.smsLogs.slice(0, 50),
  });
}
