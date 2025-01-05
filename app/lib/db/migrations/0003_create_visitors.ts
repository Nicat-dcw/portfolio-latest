import { sql } from "drizzle-orm";

export async function up(db: any) {
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS visitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip_address TEXT NOT NULL,
      path TEXT NOT NULL,
      user_agent TEXT,
      timestamp TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function down(db: any) {
  await db.run(sql`DROP TABLE IF EXISTS visitors;`);
} 