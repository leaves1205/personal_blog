import type { APIRoute } from 'astro';
import { verifyPassword, createSessionToken } from '../../lib/auth';

export const POST: APIRoute = async ({ request, cookies, redirect, locals }) => {
  const formData = await request.formData();
  const username = formData.get('username')?.toString().trim();
  const password = formData.get('password')?.toString();

  if (!username || !password) {
    return redirect('/login?error=invalid');
  }

  const db = locals.runtime.env.DB;
  const secret = locals.runtime.env.SESSION_SECRET;

  const user = await db
    .prepare('SELECT id, password_hash FROM users WHERE username = ?')
    .bind(username)
    .first<{ id: number; password_hash: string }>();

  if (!user) {
    return redirect('/login?error=invalid');
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return redirect('/login?error=invalid');
  }

  const token = await createSessionToken(user.id, username, secret);

  cookies.set('session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7天
    path: '/',
  });

  return redirect('/');
};
