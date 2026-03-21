/// <reference types="astro/client" />

interface Env {
  learning_blog_db: D1Database;
  SESSION_SECRET: string;
}

declare module 'cloudflare:workers' {
  const env: Env;
  export { env };
}

declare namespace App {
  interface Locals {
    user: {
      userId: number;
      username: string;
      role: string;
    };
  }
}
