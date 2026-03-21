import { defineMiddleware } from 'astro:middleware';
import { verifySessionToken } from './lib/auth';

// 这些路径不需要登录
const PUBLIC_PATHS = ['/login', '/register', '/api/login', '/api/register'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = new URL(context.request.url);

  if (PUBLIC_PATHS.includes(pathname)) {
    return next();
  }

  const token = context.cookies.get('session')?.value;
  const secret = context.locals.runtime.env.SESSION_SECRET;

  if (!token || !secret) {
    return context.redirect('/login');
  }

  const user = await verifySessionToken(token, secret);
  if (!user) {
    return context.redirect('/login');
  }

  // 把用户信息传给页面
  context.locals.user = user;
  return next();
});
