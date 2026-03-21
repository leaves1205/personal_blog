import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  if (locals.user.role !== 'admin') {
    return new Response('Forbidden', { status: 403 });
  }

  const formData = await request.formData();
  const postId = formData.get('post_id')?.toString();
  const action = formData.get('action')?.toString(); // 'approve' | 'reject'

  if (!postId || !action) return redirect('/admin');

  const status = action === 'approve' ? 'published' : 'rejected';

  await env.learning_blog_db
    .prepare("UPDATE posts SET status = ?, updated_at = datetime('now') WHERE id = ?")
    .bind(status, postId)
    .run();

  return redirect('/admin#posts');
};
