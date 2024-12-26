import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { posts } from './schema';

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite);

// Helper function to seed the database
export async function seedDatabase() {
  const existingPosts = await db.select().from(posts);
  if (existingPosts.length === 0) {
    // Add your seed data here
    await db.insert(posts).values([
      // ... your blog posts data
    ]);
  }
} 