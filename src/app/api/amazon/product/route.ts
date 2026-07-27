/**
 * GET /api/amazon/product?asin=B0XXXXXXXX
 * Creators API を使って商品タイトル・ブランドを取得する
 */
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createAuth } from '@/lib/auth';
import { getProductByAsin, AmazonUpstreamError } from '@/lib/amazon-creators';

const ASIN_RE = /^[A-Z0-9]{10}$/;

export async function GET(request: Request) {
  const { env } = getCloudflareContext();
  const auth = createAuth(env.DB);
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(request.url);
  const asin = url.searchParams.get('asin');

  if (!asin || !ASIN_RE.test(asin)) {
    return Response.json({ error: 'Invalid ASIN' }, { status: 400 });
  }

  try {
    const product = await getProductByAsin(asin, env);
    if (!product) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json(product);
  } catch (e) {
    if (e instanceof AmazonUpstreamError) {
      return Response.json({ error: 'Service unavailable' }, { status: 502 });
    }
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}
