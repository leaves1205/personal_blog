import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

function toSlug(title: string): string {
  const safe = title.trim().replace(/\s+/g, '-').slice(0, 50);
  return `${safe}-${Date.now().toString(36)}`;
}

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const { userId, username } = locals.user;
  const formData = await request.formData();
  const title = formData.get('title')?.toString().trim();
  const description = formData.get('description')?.toString().trim() ?? '';
  const content = formData.get('content')?.toString().trim();
  const tagsRaw = formData.get('tags')?.toString().trim() ?? '';

  if (!title || !content) {
    return redirect('/write?error=missing');
  }

  const tags = tagsRaw
    ? JSON.stringify(tagsRaw.split(',').map(t => t.trim()).filter(Boolean))
    : '[]';
  const slug = toSlug(title);

  await env.learning_blog_db
    .prepare('INSERT INTO posts (slug, title, description, content, tags, author_id, author_name) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .bind(slug, title, description, content, tags, userId, username)
    .run();

  return redirect('/my-posts?submitted=1');
};
