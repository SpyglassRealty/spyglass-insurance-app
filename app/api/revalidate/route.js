import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { CMS_TAG } from "../../lib/content";

// Called by spyglassrealty.com on Save & Revalidate of an Insurance post.
// Auth: Authorization: Bearer <INSURANCE_REVALIDATE_SECRET> (same value on both projects).
export async function POST(request) {
  const secret = process.env.INSURANCE_REVALIDATE_SECRET;
  const auth = request.headers.get("authorization") || "";
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  let slug = "";
  try {
    const body = await request.json();
    if (typeof body?.slug === "string" && /^[a-z0-9][a-z0-9-]*$/.test(body.slug)) slug = body.slug;
  } catch {
    // no body: still flush the list
  }
  revalidateTag(CMS_TAG);
  revalidatePath("/learning");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/learning/${slug}`);
  return NextResponse.json({ ok: true, slug: slug || null });
}
