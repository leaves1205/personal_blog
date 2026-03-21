import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const { userId, role } = locals.user;
  const formData = await request.formData();
  const postId = formData.get('post_id')?.toString();
  const from = formData.get('from')?.toString() ?? '/my-posts';

  if (!postId) return redirect(from);

  if (role === 'admin') {
    await env.learning_blog_db
      .prepare('DELETE FROM posts WHERE id = ?')
      .bind(postId)
      .run();
  } else {
    await env.learning_blog_db
      .prepare('DELETE FROM posts WHERE id = ? AND author_id = ?')
      .bind(postId, userId)
      .run();
  }

  return redirect(from);
};
