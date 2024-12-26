import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  uuid: text('uuid').notNull().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  description: text('description').notNull(),
  date: text('date').notNull(),
  tags: text('tags', { mode: 'json' }).$type<string[]>().notNull(),
  authorName: text('author_name').notNull(),
  authorAvatar: text('author_avatar').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export type Post = typeof posts.$inferSelect; 