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
import { createGCalEvent, deleteGCalEvent } from '@/lib/gcal';

type Params = { params: Promise<{ raceId: string }> };

async function getContext(request: Request) {
  const { env } = getCloudflareContext();
  const auth = createAuth(env.DB);
  const session = await auth.api.getSession({ headers: request.headers });
  const db = drizzle(env.DB, { schema });
  return { env, session, db };
}

/** Google アカウントのアクセストークンを取得 */
async function getGoogleAccessToken(
  db: ReturnType<typeof drizzle>,
  userId: string,
): Promise<string | null> {
  const [acct] = await db
    .select({ accessToken: schema.account.accessToken })
    .from(schema.account)
    .where(
      and(
        eq(schema.account.userId, userId),
        eq(schema.account.providerId, 'google'),
      ),
    )
    .limit(1);
  return acct?.accessToken ?? null;
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
    entry_reminder?: boolean;
    /** 大会名（GCalイベントタイトル用） */
    race_name?: string;
    /** 大会開催日 "YYYY-MM-DD" */
    race_date?: string;
    /** エントリー開始日 "YYYY-MM-DD"（受付前日リマインド用） */
    entry_start_date?: string | null;
  };

  const now = new Date().toISOString();
  const userId = session.user.id;

  // 既存レコードを取得
  const [existing] = await db
    .select()
    .from(schema.user_races)
    .where(and(eq(schema.user_races.user_id, userId), eq(schema.user_races.race_id, raceId)))
    .limit(1);

  const accessToken = await getGoogleAccessToken(db, userId);

  let gcalRaceEventId = existing?.gcal_race_event_id ?? null;
  let gcalEntryEventId = existing?.gcal_entry_event_id ?? null;

  // ── 参加予定の追加/削除 ──
  if (body.is_planning !== undefined) {
    if (body.is_planning && !existing?.is_planning) {
      // 追加: GCalイベントを作成（リマインダーなし）
      if (accessToken && body.race_name && body.race_date) {
        try {
          const ev = await createGCalEvent(accessToken, {
            summary: `🏃 ${body.race_name}`,
            description: 'HASHIRU から登録された参加予定',
            date: body.race_date,
          });
          gcalRaceEventId = ev.id;
        } catch {
          // GCal失敗は無視してDB登録のみ続行
        }
      }
    } else if (!body.is_planning && existing?.is_planning) {
      // 削除: GCalイベントを削除
      if (accessToken && gcalRaceEventId) {
        try {
          await deleteGCalEvent(accessToken, gcalRaceEventId);
        } catch {
          // 無視
        }
      }
      gcalRaceEventId = null;
    }
  }

  // ── 受付開始前日リマインドの追加/削除 ──
  if (body.entry_reminder !== undefined) {
    if (body.entry_reminder && !existing?.entry_reminder) {
      // 追加: エントリー開始日の前日 (1440分=24時間) にリマインド
      if (accessToken && body.race_name && body.entry_start_date) {
        try {
          const ev = await createGCalEvent(accessToken, {
            summary: `📋 ${body.race_name} エントリー開始`,
            description: 'HASHIRU から登録されたエントリーリマインダー',
            date: body.entry_start_date,
            reminderMinutesBefore: 1440, // 前日
          });
          gcalEntryEventId = ev.id;
        } catch {
          // GCal失敗は無視
        }
      }
    } else if (!body.entry_reminder && existing?.entry_reminder) {
      // 削除
      if (accessToken && gcalEntryEventId) {
        try {
          await deleteGCalEvent(accessToken, gcalEntryEventId);
        } catch {
          // 無視
        }
      }
      gcalEntryEventId = null;
    }
  }

  const newIsPlanning = body.is_planning ?? existing?.is_planning ?? false;
  const newEntryReminder = body.entry_reminder ?? existing?.entry_reminder ?? false;

  if (existing) {
    await db
      .update(schema.user_races)
      .set({
        is_planning: newIsPlanning,
        gcal_race_event_id: gcalRaceEventId,
        entry_reminder: newEntryReminder,
        gcal_entry_event_id: gcalEntryEventId,
        updated_at: now,
      })
      .where(and(eq(schema.user_races.user_id, userId), eq(schema.user_races.race_id, raceId)));
  } else {
    await db.insert(schema.user_races).values({
      id: crypto.randomUUID(),
      user_id: userId,
      race_id: raceId,
      is_planning: newIsPlanning,
      gcal_race_event_id: gcalRaceEventId,
      entry_reminder: newEntryReminder,
      gcal_entry_event_id: gcalEntryEventId,
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

  const [existing] = await db
    .select()
    .from(schema.user_races)
    .where(and(eq(schema.user_races.user_id, userId), eq(schema.user_races.race_id, raceId)))
    .limit(1);

  if (existing) {
    const accessToken = await getGoogleAccessToken(db, userId);
    if (accessToken) {
      if (existing.gcal_race_event_id) {
        try { await deleteGCalEvent(accessToken, existing.gcal_race_event_id); } catch { /* 無視 */ }
      }
      if (existing.gcal_entry_event_id) {
        try { await deleteGCalEvent(accessToken, existing.gcal_entry_event_id); } catch { /* 無視 */ }
      }
    }
    await db
      .delete(schema.user_races)
      .where(and(eq(schema.user_races.user_id, userId), eq(schema.user_races.race_id, raceId)));
  }

  return Response.json({ ok: true });
}
