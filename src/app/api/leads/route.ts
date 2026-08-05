import { NextResponse } from "next/server";
import { upsertLeadFromForm } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json();
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const interest = String(body.interest || "").trim();
  if (!name || !email || !phone || !interest) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const result = upsertLeadFromForm({
    name,
    email,
    phone,
    interest,
    location: body.location,
    message: body.message,
    source: body.source || "website_form",
  });
  return NextResponse.json({ ok: true, ...result });
}
