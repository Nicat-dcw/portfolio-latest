import { sql } from "drizzle-orm";

export async function up(db: any) {
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      tags TEXT NOT NULL,
      author_name TEXT NOT NULL,
      author_avatar TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function down(db: any) {
  await db.run(sql`DROP TABLE IF EXISTS posts;`);
} 