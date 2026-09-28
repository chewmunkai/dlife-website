import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";

/** Talous CMS calls this after a publish so the page re-renders with the new version. */
export async function POST(req: NextRequest) {
  const secret = process.env.TALOUS_REVALIDATE_SECRET;
  const given = req.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
  if (!secret || given.length !== secret.length || !timingSafeEqual(Buffer.from(given), Buffer.from(secret))) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  }
  const body = (await req.json().catch(() => null)) as { path?: unknown } | null;
  const path = typeof body?.path === "string" && body.path.startsWith("/") ? body.path : null;
  if (!path) return NextResponse.json({ error: "path required" }, { status: 400 });
  revalidateTag(`talous:${path === "/" ? "home" : path.slice(1)}`);
  revalidatePath(path);
  return NextResponse.json({ revalidated: path });
}
