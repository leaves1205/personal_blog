/// <reference types="astro/client" />

interface Env {
  DB: D1Database;
  SESSION_SECRET: string;
}

declare namespace App {
  interface Locals {
    runtime: {
      env: Env;
    };
    user: {
      userId: number;
      username: string;
    };
  }
}
