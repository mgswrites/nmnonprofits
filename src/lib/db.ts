import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

// Singleton — one connection per cold-start in Vercel Fluid Compute.
// The DATABASE_URL must be set in Vercel env vars (and locally in .env).
let _sql: NeonQueryFunction<false, false> | null = null;

export function getDb(): NeonQueryFunction<false, false> {
  if (!_sql) {
    const url = import.meta.env.DATABASE_URL ?? process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL is not set');
    _sql = neon(url);
  }
  return _sql;
}

export { sql } from '@neondatabase/serverless';
