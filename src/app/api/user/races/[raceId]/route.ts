/**
 * GET    /api/user/races/[raceId] — 特定大会の登録状態取得
 * PATCH  /api/user/races/[raceId] — 登録状態更新
 * DELETE /api/user/races/[raceId] — 登録全削除
 */
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createAuth } from '@/lib/auth';
import { drizzle } from 'drizzle-orm/d1';
import { eq, and } from 'drizzle-orm';
import * as schema from '@/lib/db/schema';

type Params = { params: Promise<{ raceId: string }> };

async function getContext(request: Request) {
  const { env } = getCloudflareContext();
  const auth = createAuth(env.DB);
  const session = await auth.api.getSession({ headers: request.headers });
  const db = drizzle(env.DB, { schema });
  return { session, db };
}

function parseIds(json: string): number[] {
  try { return JSON.parse(json) as number[]; } catch { return []; }
}

// ─── GET ───────────────────────────────────────────────────────────────────

export async function GET(request: Request, { params }: Params) {
  const { raceId } = await params;
  const { session, db } = await getContext(request);

  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const [row] = await db
    .select()
    .from(schema.user_races)
    .where(
      and(
        eq(schema.user_races.user_id, session.user.id),
        eq(schema.user_races.race_id, raceId),
      ),
    )
    .limit(1);

  return Response.json(row ?? null);
}

// ─── PATCH ─────────────────────────────────────────────────────────────────

export async function PATCH(request: Request, { params }: Params) {
  const { raceId } = await params;
  const { session, db } = await getContext(request);

  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json() as {
    is_planning?: boolean;
    planning_category_id?: number | null;
    entry_reminder_period_ids?: number[];
  };

  const now = new Date().toISOString();
  const userId = session.user.id;

  const [existing] = await db
    .select()
    .from(schema.user_races)
    .where(and(eq(schema.user_races.user_id, userId), eq(schema.user_races.race_id, raceId)))
    .limit(1);

  const newIsPlanning = body.is_planning ?? existing?.is_planning ?? false;
  const newCategoryId = body.planning_category_id !== undefined
    ? body.planning_category_id
    : (existing?.planning_category_id ?? null);
  const newPeriodIds = body.entry_reminder_period_ids !== undefined
    ? body.entry_reminder_period_ids
    : parseIds(existing?.entry_reminder_period_ids ?? '[]');

  if (existing) {
    await db
      .update(schema.user_races)
      .set({
        is_planning: newIsPlanning,
        planning_category_id: newCategoryId,
        entry_reminder_period_ids: JSON.stringify(newPeriodIds),
        updated_at: now,
      })
      .where(and(eq(schema.user_races.user_id, userId), eq(schema.user_races.race_id, raceId)));
  } else {
    await db.insert(schema.user_races).values({
      id: crypto.randomUUID(),
      user_id: userId,
      race_id: raceId,
      is_planning: newIsPlanning,
      planning_category_id: newCategoryId,
      entry_reminder_period_ids: JSON.stringify(newPeriodIds),
      created_at: now,
      updated_at: now,
    });
  }

  const [updated] = await db
    .select()
    .from(schema.user_races)
    .where(and(eq(schema.user_races.user_id, userId), eq(schema.user_races.race_id, raceId)))
    .limit(1);

  return Response.json(updated);
}

// ─── DELETE ────────────────────────────────────────────────────────────────

export async function DELETE(request: Request, { params }: Params) {
  const { raceId } = await params;
  const { session, db } = await getContext(request);

  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const userId = session.user.id;

  await db
    .delete(schema.user_races)
    .where(and(eq(schema.user_races.user_id, userId), eq(schema.user_races.race_id, raceId)));

  return Response.json({ ok: true });
}
