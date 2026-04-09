import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createAuth } from '@/lib/auth';

async function handler(request: Request) {
  const { env } = getCloudflareContext();
  const auth = createAuth(env.DB);
  return auth.handler(request);
}

export { handler as GET, handler as POST };
