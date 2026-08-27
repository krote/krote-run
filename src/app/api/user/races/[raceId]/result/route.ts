/**
 * GET    /api/user/races/[raceId]/result  — 結果取得（なければ null）
 * PUT    /api/user/races/[raceId]/result  — upsert
 * DELETE /api/user/races/[raceId]/result  — 削除
 */
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createAuth } from '@/lib/auth';
import { drizzle } from 'drizzle-orm/d1';
import { eq, and } from 'drizzle-orm';
import * as schema from '@/lib/db/schema';
import { validatePutBody } from '@/lib/result-validation';

type Params = { params: Promise<{ raceId: string }> };

async function getContext(request: Request) {
  const { env } = getCloudflareContext();
  const auth = createAuth(env.DB);
  const session = await auth.api.getSession({ headers: request.headers });
  const db = drizzle(env.DB, { schema });
  return { session, db };
}

async function getUserRace(
  db: ReturnType<typeof drizzle>,
  userId: string,
  raceId: string,
) {
  const [row] = await db
    .select()
    .from(schema.user_races)
    .where(and(eq(schema.user_races.user_id, userId), eq(schema.user_races.race_id, raceId)))
    .limit(1);
  return row ?? null;
}

async function getRaceCategory(
  db: ReturnType<typeof drizzle>,
  raceId: string,
  categoryId: number,
) {
  const [row] = await db
    .select()
    .from(schema.race_categories)
    .where(and(eq(schema.race_categories.id, categoryId), eq(schema.race_categories.race_id, raceId)))
    .limit(1);
  return row ?? null;
}

async function getResult(
  db: ReturnType<typeof drizzle>,
  userRaceId: string,
) {
  const [row] = await db
    .select()
    .from(schema.user_race_results)
    .where(eq(schema.user_race_results.user_race_id, userRaceId))
    .limit(1);
  return row ?? null;
}

// ─── GET ───────────────────────────────────────────────────────────────────

export async function GET(request: Request, { params }: Params) {
  const { raceId } = await params;
  const { session, db } = await getContext(request);

  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const userRace = await getUserRace(db, session.user.id, raceId);
  if (!userRace) return Response.json({ error: 'Not Found' }, { status: 404 });

  const result = await getResult(db, userRace.id);
  return Response.json(result);
}

// ─── PUT ───────────────────────────────────────────────────────────────────

export async function PUT(request: Request, { params }: Params) {
  const { raceId } = await params;
  const { session, db } = await getContext(request);

  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const userRace = await getUserRace(db, session.user.id, raceId);
  if (!userRace) return Response.json({ error: 'Not Found' }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'リクエストボディが不正です' }, { status: 400 });
  }
  const validation = validatePutBody(body);
  if ('error' in validation) return Response.json({ error: validation.error }, { status: 400 });

  const { status, finish_time_sec, category_id, note } = validation.data;

  if (category_id !== undefined) {
    const category = await getRaceCategory(db, raceId, category_id);
    if (!category) return Response.json({ error: 'category_id が不正です' }, { status: 400 });
  }

  const now = new Date().toISOString();

  const existing = await getResult(db, userRace.id);

  if (existing) {
    await db
      .update(schema.user_race_results)
      .set({
        status,
        finish_time_sec: finish_time_sec ?? null,
        category_id: category_id ?? null,
        note: note ?? existing.note,
        updated_at: now,
      })
      .where(eq(schema.user_race_results.id, existing.id));
  } else {
    const id = crypto.randomUUID();
    try {
      await db.insert(schema.user_race_results).values({
        id,
        user_race_id: userRace.id,
        status,
        finish_time_sec: finish_time_sec ?? null,
        category_id: category_id ?? null,
        note: note ?? '',
        created_at: now,
        updated_at: now,
      });
    } catch {
      // 並行リクエストで既に作成済みの場合（UNIQUE制約違反）はupdateにフォールバック
      await db
        .update(schema.user_race_results)
        .set({
          status,
          finish_time_sec: finish_time_sec ?? null,
          category_id: category_id ?? null,
          note: note ?? '',
          updated_at: now,
        })
        .where(eq(schema.user_race_results.user_race_id, userRace.id));
    }
  }

  const updated = await getResult(db, userRace.id);
  return Response.json(updated);
}

// ─── DELETE ────────────────────────────────────────────────────────────────

export async function DELETE(request: Request, { params }: Params) {
  const { raceId } = await params;
  const { session, db } = await getContext(request);

  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const userRace = await getUserRace(db, session.user.id, raceId);
  if (!userRace) return Response.json({ error: 'Not Found' }, { status: 404 });

  const existing = await getResult(db, userRace.id);
  if (!existing) return Response.json({ error: 'Not Found' }, { status: 404 });

  await db
    .delete(schema.user_race_results)
    .where(eq(schema.user_race_results.id, existing.id));

  return new Response(null, { status: 204 });
}
