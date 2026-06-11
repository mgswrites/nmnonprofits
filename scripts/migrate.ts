/**
 * Runs all SQL migration files in db/migrations/ in numeric order.
 * Usage: npm run db:migrate
 *
 * Idempotent: tracks applied migrations in a `schema_migrations` table.
 */
import { neon } from '@neondatabase/serverless';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is not set.');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function migrate() {
  // Ensure migration tracking table exists
  await sql`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename    TEXT        PRIMARY KEY,
      applied_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  const applied = await sql<{ filename: string }[]>`
    SELECT filename FROM schema_migrations ORDER BY filename
  `;
  const appliedSet = new Set(applied.map((r) => r.filename));

  const migrationsDir = join(__dirname, '..', 'db', 'migrations');
  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    if (appliedSet.has(file)) {
      console.log(`  skip  ${file}`);
      continue;
    }

    const filePath = join(migrationsDir, file);
    const sqlText = readFileSync(filePath, 'utf-8');

    console.log(`  apply ${file}...`);
    // neon() doesn't support multi-statement strings via tagged template;
    // we use the raw HTTP query API for migration files.
    await sql.transaction(async (txSql) => {
      // Execute the file as a raw query string
      await (txSql as unknown as ReturnType<typeof neon>)(sqlText as unknown as TemplateStringsArray);
      await txSql`INSERT INTO schema_migrations (filename) VALUES (${file})`;
    });

    console.log(`  done  ${file}`);
  }

  console.log('\nAll migrations applied.');
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
