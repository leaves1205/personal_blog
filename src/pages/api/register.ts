import type { APIRoute } from 'astro';
import { hashPassword, createSessionToken } from '../../lib/auth';
import { env } from 'cloudflare:workers';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const username = formData.get('username')?.toString().trim();
  const password = formData.get('password')?.toString();

  if (!username || !password || username.length < 3 || password.length < 6) {
    return redirect('/register?error=invalid');
  }

  const db = env.learning_blog_db;
  const secret = env.SESSION_SECRET;

  // 检查用户名是否已存在
  const existing = await db
    .prepare('SELECT id FROM users WHERE username = ?')
    .bind(username)
    .first();

  if (existing) {
    return redirect('/register?error=exists');
  }

  const passwordHash = await hashPassword(password);

  const result = await db
    .prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)')
    .bind(username, passwordHash)
    .run();

  const token = await createSessionToken(result.meta.last_row_id as number, username, secret);

  cookies.set('session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return redirect('/dashboard');
};
