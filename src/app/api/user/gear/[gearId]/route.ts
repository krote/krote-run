/**
 * PATCH  /api/user/gear/[gearId] — マイギア部分更新
 * DELETE /api/user/gear/[gearId] — マイギア削除
 */
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createAuth } from '@/lib/auth';
import { drizzle } from 'drizzle-orm/d1';
import { eq, and } from 'drizzle-orm';
import * as schema from '@/lib/db/schema';
import { validateUpdateBody } from '@/lib/gear-validation';

type Params = { params: Promise<{ gearId: string }> };

async function getContext(request: Request) {
  const { env } = getCloudflareContext();
  const auth = createAuth(env.DB);
  const session = await auth.api.getSession({ headers: request.headers });
  const db = drizzle(env.DB, { schema });
  return { session, db };
}

// ─── PATCH ─────────────────────────────────────────────────────────────────

export async function PATCH(request: Request, { params }: Params) {
  const { gearId } = await params;
  const { session, db } = await getContext(request);

  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const [existing] = await db
    .select()
    .from(schema.user_gear)
    .where(and(eq(schema.user_gear.id, gearId), eq(schema.user_gear.user_id, session.user.id)))
    .limit(1);

  if (!existing) return Response.json({ error: 'Not Found' }, { status: 404 });

  const body = await request.json();
  const result = validateUpdateBody(body);
  if ('error' in result) {
    return Response.json({ error: result.error }, { status: 400 });
  }

  const now = new Date().toISOString();
  await db
    .update(schema.user_gear)
    .set({ ...result.data, updated_at: now })
    .where(and(eq(schema.user_gear.id, gearId), eq(schema.user_gear.user_id, session.user.id)));

  const [updated] = await db
    .select()
    .from(schema.user_gear)
    .where(and(eq(schema.user_gear.id, gearId), eq(schema.user_gear.user_id, session.user.id)))
    .limit(1);

  return Response.json(updated);
}

// ─── DELETE ────────────────────────────────────────────────────────────────

export async function DELETE(request: Request, { params }: Params) {
  const { gearId } = await params;
  const { session, db } = await getContext(request);

  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const [existing] = await db
    .select()
    .from(schema.user_gear)
    .where(and(eq(schema.user_gear.id, gearId), eq(schema.user_gear.user_id, session.user.id)))
    .limit(1);

  if (!existing) return Response.json({ error: 'Not Found' }, { status: 404 });

  await db
    .delete(schema.user_gear)
    .where(and(eq(schema.user_gear.id, gearId), eq(schema.user_gear.user_id, session.user.id)));

  return Response.json({ ok: true });
}
