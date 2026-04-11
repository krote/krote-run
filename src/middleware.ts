import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // _next, _static, 静的ファイル, /api を除くすべてのパスに適用
    '/((?!_next|_static|api|favicon.ico|.*\\..*).*)',
  ],
};
