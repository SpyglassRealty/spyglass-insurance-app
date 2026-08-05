import { NextResponse } from "next/server";
import { db, getContact, updateLeadStage } from "@/lib/store";
import type { LeadStage } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = db();
  const leads = data.leads.map((l) => ({
    ...l,
    contact: getContact(l.contactId) || null,
  }));
  return NextResponse.json({ leads, stages: ["new", "contacted", "qualified", "quoted", "bound", "lost"] });
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const id = String(body.id || "");
  const stage = body.stage as LeadStage;
  if (!id || !stage) return NextResponse.json({ error: "id and stage required" }, { status: 400 });
  const lead = updateLeadStage(id, stage);
  return NextResponse.json({ lead });
}
