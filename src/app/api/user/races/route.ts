/**
 * GET /api/user/races — ログインユーザーの大会登録一覧
 */
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createAuth } from '@/lib/auth';
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import * as schema from '@/lib/db/schema';

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

  return Response.json(rows);
}
