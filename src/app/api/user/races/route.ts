/**
 * GET /api/user/races — ログインユーザーの大会登録一覧
 */
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createAuth } from '@/lib/auth';
import { drizzle } from 'drizzle-orm/d1';
import { eq, inArray } from 'drizzle-orm';
import * as schema from '@/lib/db/schema';
import { getTodayJST } from '@/lib/utils/date';

export async function GET(request: Request) {
  const { env } = getCloudflareContext();
  const auth = createAuth(env.DB);
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = drizzle(env.DB, { schema });
  const rows = await db
    .select()
    .from(schema.user_races)
    .where(eq(schema.user_races.user_id, session.user.id));

  // 開催日を過ぎても「参加予定」のまま残っている登録は、自動で「参加済み（未記録）」に遷移する
  const pendingRows = rows.filter((r) => r.is_planning && !r.is_participated);
  if (pendingRows.length > 0) {
    const raceDateRows = await db
      .select({ id: schema.races.id, date: schema.races.date })
      .from(schema.races)
      .where(inArray(schema.races.id, pendingRows.map((r) => r.race_id)));
    const dateByRaceId = new Map(raceDateRows.map((r) => [r.id, r.date]));

    const today = getTodayJST();
    const now = new Date().toISOString();

    for (const row of pendingRows) {
      const raceDate = dateByRaceId.get(row.race_id);
      if (raceDate && raceDate < today) {
        await db
          .update(schema.user_races)
          .set({ is_participated: true, updated_at: now })
          .where(eq(schema.user_races.id, row.id));
        row.is_participated = true;
      }
    }
  }

  return Response.json(rows);
}
