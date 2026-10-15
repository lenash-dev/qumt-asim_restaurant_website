import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

const allowedTags = new Set(["menu", "promotions"]);

/**
 * El sistema de gestión llama aquí cuando el personal cambia el menú o las
 * promociones, para que la web muestre los cambios al instante.
 *
 *   POST /api/revalidate
 *   Authorization: Bearer <REVALIDATE_SECRET>
 *   { "tags": ["menu", "promotions"] }
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { tags?: unknown } | null;
  const tags = Array.isArray(body?.tags) ? body.tags.filter((tag): tag is string => typeof tag === "string" && allowedTags.has(tag)) : [];
  if (tags.length === 0) {
    return Response.json({ ok: false, error: "Indica tags: menu y/o promotions" }, { status: 400 });
  }

  // `expire: 0`: la próxima visita ya trae los datos nuevos
  for (const tag of tags) revalidateTag(tag, { expire: 0 });
  return Response.json({ ok: true, revalidated: tags });
}
