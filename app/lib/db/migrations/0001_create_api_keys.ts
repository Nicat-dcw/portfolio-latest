import { sql } from "drizzle-orm";

export async function up(db: any) {
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS api_keys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      last_used TEXT,
      expires_at TEXT
    );
  `);
}

export async function down(db: any) {
  await db.run(sql`DROP TABLE IF EXISTS api_keys;`);
} 