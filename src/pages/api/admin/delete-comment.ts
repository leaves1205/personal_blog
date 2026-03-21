import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  if (locals.user.role !== 'admin') {
    return new Response('Forbidden', { status: 403 });
  }

  const formData = await request.formData();
  const commentId = formData.get('comment_id')?.toString();
  const postSlug = formData.get('post_slug')?.toString();

  if (!commentId || !postSlug) {
    return redirect('/admin');
  }

  await env.learning_blog_db
    .prepare('DELETE FROM comments WHERE id = ?')
    .bind(commentId)
    .run();

  return redirect('/admin');
};
