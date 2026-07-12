/**
 * GET  /api/user/gear — マイギア一覧
 * POST /api/user/gear — マイギア登録
 */
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createAuth } from '@/lib/auth';
import { drizzle } from 'drizzle-orm/d1';
import { eq, and, asc } from 'drizzle-orm';
import * as schema from '@/lib/db/schema';
import { type GearCategory } from '@/lib/types';
import { validateCreateBody } from '@/lib/gear-validation';

async function getContext(request: Request) {
  const { env } = getCloudflareContext();
  const auth = createAuth(env.DB);
  const session = await auth.api.getSession({ headers: request.headers });
  const db = drizzle(env.DB, { schema });
  return { session, db };
}

// ─── GET ───────────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const { session, db } = await getContext(request);

  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(request.url);
  const categoryParam = url.searchParams.get('category') as GearCategory | null;

  const condition = categoryParam
    ? and(eq(schema.user_gear.user_id, session.user.id), eq(schema.user_gear.category, categoryParam))
    : eq(schema.user_gear.user_id, session.user.id);

  const rows = await db
    .select()
    .from(schema.user_gear)
    .where(condition)
    .orderBy(asc(schema.user_gear.created_at));

  return Response.json(rows);
}

// ─── POST ──────────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const { session, db } = await getContext(request);

  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const result = validateCreateBody(body);
  if ('error' in result) {
    return Response.json({ error: result.error }, { status: 400 });
  }

  const now = new Date().toISOString();
  const id = crypto.randomUUID();

  await db.insert(schema.user_gear).values({
    id,
    user_id: session.user.id,
    category: result.data.category,
    brand: result.data.brand,
    name: result.data.name,
    amazon_url: result.data.amazon_url,
    asin: result.data.asin,
    usage_tag: result.data.usage_tag,
    memo: result.data.memo,
    is_retired: false,
    created_at: now,
    updated_at: now,
  });

  const [inserted] = await db
    .select()
    .from(schema.user_gear)
    .where(eq(schema.user_gear.id, id))
    .limit(1);

  return Response.json(inserted, { status: 201 });
}
