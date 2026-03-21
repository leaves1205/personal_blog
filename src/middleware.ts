import { defineMiddleware } from 'astro:middleware';
import { verifySessionToken } from './lib/auth';
import { env } from 'cloudflare:workers';

// 这些路径不需要登录
const PUBLIC_PATHS = ['/login', '/register', '/api/login', '/api/register'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = new URL(context.request.url);

  if (PUBLIC_PATHS.includes(pathname)) {
    return next();
  }

  const token = context.cookies.get('session')?.value;
  const secret = env.SESSION_SECRET;

  if (!token || !secret) {
    return context.redirect('/login');
  }

  const user = await verifySessionToken(token, secret);
  if (!user) {
    return context.redirect('/login');
  }

  // 从 DB 读取最新 role
  const db = env.learning_blog_db;
  const row = await db
    .prepare('SELECT role FROM users WHERE id = ?')
    .bind(user.userId)
    .first<{ role: string }>();

  context.locals.user = { ...user, role: row?.role ?? 'user' };
  return next();
});
