import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure the data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Use data directory for database file
const dbPath = path.join(dataDir, 'sqlite.db');
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite); 