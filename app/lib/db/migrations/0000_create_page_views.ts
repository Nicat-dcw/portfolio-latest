import { sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export async function up(db: any) {
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS page_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT NOT NULL,
      timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
      user_id TEXT,
      session_id TEXT NOT NULL
    );
  `);
}

export async function down(db: any) {
  await db.run(sql`DROP TABLE IF EXISTS page_views;`);
} 