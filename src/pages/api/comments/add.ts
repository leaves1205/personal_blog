import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const formData = await request.formData();
  const content = formData.get('content')?.toString().trim();
  const postSlug = formData.get('post_slug')?.toString();

  if (!content || !postSlug || content.length > 1000) {
    return redirect(`/blog/${postSlug}#comments`);
  }

  const { userId, username } = locals.user;

  await env.learning_blog_db
    .prepare('INSERT INTO comments (post_slug, user_id, username, content) VALUES (?, ?, ?, ?)')
    .bind(postSlug, userId, username, content)
    .run();

  return redirect(`/blog/${postSlug}#comments`);
};
