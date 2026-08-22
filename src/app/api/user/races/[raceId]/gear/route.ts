/**
 * GET   /api/user/races/[raceId]/gear                 — 装備リスト取得
 * GET   /api/user/races/[raceId]/gear?source=candidates — コピー元候補
 * PUT   /api/user/races/[raceId]/gear                 — リスト全置換
 * PATCH /api/user/races/[raceId]/gear                 — 個別使用記録更新
 */
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createAuth } from '@/lib/auth';
import { drizzle } from 'drizzle-orm/d1';
import { eq, and, ne, asc, inArray, desc } from 'drizzle-orm';
import * as schema from '@/lib/db/schema';
import { validatePutBody, validatePatchBody } from '@/lib/race-gear-validation';

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

// ─── GET ───────────────────────────────────────────────────────────────────

export async function GET(request: Request, { params }: Params) {
  const { raceId } = await params;
  const { session, db } = await getContext(request);

  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(request.url);

  // コピー元候補モード
  if (url.searchParams.get('source') === 'candidates') {
    const rows = await db
      .select({
        user_race_id: schema.user_race_gear.user_race_id,
        race_id: schema.user_races.race_id,
        race_name_ja: schema.races.name_ja,
        race_date: schema.races.date,
      })
      .from(schema.user_race_gear)
      .innerJoin(schema.user_races, eq(schema.user_race_gear.user_race_id, schema.user_races.id))
      .innerJoin(schema.races, eq(schema.user_races.race_id, schema.races.id))
      .where(and(eq(schema.user_races.user_id, session.user.id), ne(schema.user_races.race_id, raceId)));

    // JS側でdeduplicateしてgear_countを集計
    const countMap = new Map<string, { race_id: string; race_name_ja: string; race_date: string; gear_count: number }>();
    for (const row of rows) {
      const entry = countMap.get(row.user_race_id);
      if (entry) {
        entry.gear_count++;
      } else {
        countMap.set(row.user_race_id, { race_id: row.race_id, race_name_ja: row.race_name_ja, race_date: row.race_date, gear_count: 1 });
      }
    }

    return Response.json(
      [...countMap.entries()].map(([user_race_id, v]) => ({ user_race_id, ...v })),
    );
  }

  // 通常GETモード
  const userRace = await getUserRace(db, session.user.id, raceId);
  if (!userRace) return Response.json({ error: 'Not Found' }, { status: 404 });

  const items = await db
    .select({
      gear_id: schema.user_race_gear.gear_id,
      quantity: schema.user_race_gear.quantity,
      used: schema.user_race_gear.used,
      used_quantity: schema.user_race_gear.used_quantity,
      note: schema.user_race_gear.note,
      sort_order: schema.user_race_gear.sort_order,
      name: schema.user_gear.name,
      brand: schema.user_gear.brand,
      category: schema.user_gear.category,
      asin: schema.user_gear.asin,
      amazon_url: schema.user_gear.amazon_url,
    })
    .from(schema.user_race_gear)
    .innerJoin(schema.user_gear, eq(schema.user_race_gear.gear_id, schema.user_gear.id))
    .where(eq(schema.user_race_gear.user_race_id, userRace.id))
    .orderBy(asc(schema.user_race_gear.sort_order));

  return Response.json(items);
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

  const { items } = validation.data;

  // gear_id の所有者確認
  if (items.length > 0) {
    const gearIds = items.map((i) => i.gear_id);
    const ownedGear = await db
      .select({ id: schema.user_gear.id })
      .from(schema.user_gear)
      .where(and(eq(schema.user_gear.user_id, session.user.id), inArray(schema.user_gear.id, gearIds)));

    const ownedIds = new Set(ownedGear.map((g) => g.id));
    const invalid = gearIds.find((id) => !ownedIds.has(id));
    if (invalid) {
      return Response.json({ error: `gear_id ${invalid} はあなたのギアではありません` }, { status: 400 });
    }
  }

  // 既存の used/note を保持するため取得
  const existing = await db
    .select()
    .from(schema.user_race_gear)
    .where(eq(schema.user_race_gear.user_race_id, userRace.id));

  const existingMap = new Map(existing.map((e) => [e.gear_id, e]));

  // 削除と挿入を db.batch() でまとめて原子的に実行
  const deleteOp = db
    .delete(schema.user_race_gear)
    .where(eq(schema.user_race_gear.user_race_id, userRace.id));
  const insertOps = items.map((item) => {
    const prev = existingMap.get(item.gear_id);
    return db.insert(schema.user_race_gear).values({
      user_race_id: userRace.id,
      gear_id: item.gear_id,
      quantity: item.quantity,
      sort_order: item.sort_order,
      used: prev?.used ?? null,
      used_quantity: prev?.used_quantity ?? null,
      note: prev?.note ?? '',
    });
  });
  type BatchOp = Parameters<typeof db.batch>[0][number];
  await db.batch([deleteOp, ...insertOps] as [BatchOp, ...BatchOp[]]);

  // 更新後のリストを返す
  const updated = await db
    .select({
      gear_id: schema.user_race_gear.gear_id,
      quantity: schema.user_race_gear.quantity,
      used: schema.user_race_gear.used,
      used_quantity: schema.user_race_gear.used_quantity,
      note: schema.user_race_gear.note,
      sort_order: schema.user_race_gear.sort_order,
      name: schema.user_gear.name,
      brand: schema.user_gear.brand,
      category: schema.user_gear.category,
      asin: schema.user_gear.asin,
      amazon_url: schema.user_gear.amazon_url,
    })
    .from(schema.user_race_gear)
    .innerJoin(schema.user_gear, eq(schema.user_race_gear.gear_id, schema.user_gear.id))
    .where(eq(schema.user_race_gear.user_race_id, userRace.id))
    .orderBy(asc(schema.user_race_gear.sort_order));

  return Response.json(updated);
}

// ─── PATCH ─────────────────────────────────────────────────────────────────

export async function PATCH(request: Request, { params }: Params) {
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
  const validation = validatePatchBody(body);
  if ('error' in validation) return Response.json({ error: validation.error }, { status: 400 });

  const { gear_id, used, used_quantity, note } = validation.data;

  // そのレースのリストに gear_id が存在するか確認
  const [existingItem] = await db
    .select()
    .from(schema.user_race_gear)
    .where(and(eq(schema.user_race_gear.user_race_id, userRace.id), eq(schema.user_race_gear.gear_id, gear_id)))
    .limit(1);

  if (!existingItem) return Response.json({ error: 'Not Found' }, { status: 404 });

  const updateData: Record<string, unknown> = { used };
  if (used_quantity !== undefined) updateData.used_quantity = used_quantity;
  if (note !== undefined) updateData.note = note;

  await db
    .update(schema.user_race_gear)
    .set(updateData)
    .where(and(eq(schema.user_race_gear.user_race_id, userRace.id), eq(schema.user_race_gear.gear_id, gear_id)));

  const [updated] = await db
    .select()
    .from(schema.user_race_gear)
    .where(and(eq(schema.user_race_gear.user_race_id, userRace.id), eq(schema.user_race_gear.gear_id, gear_id)))
    .limit(1);

  return Response.json(updated);
}
