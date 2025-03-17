import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  uuid: text('uuid').notNull().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  description: text('description').notNull(),
  date: text('date').notNull(),
  tags: text('tags').notNull(),
  authorName: text('author_name').notNull(),
  authorAvatar: text('author_avatar').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const pageViews = sqliteTable('page_views', {
  id: integer('id').primaryKey(),
  path: text('path').notNull(),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
  userId: text('user_id'),
  sessionId: text('session_id').notNull(),
});

export const apiKeys = sqliteTable('api_keys', {
  id: integer('id').primaryKey(),
  key: text('key').notNull().unique(),
  name: text('name').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  lastUsed: text('last_used'),
  expiresAt: text('expires_at'),
});

export const visitors = sqliteTable('visitors', {
  id: integer('id').primaryKey(),
  ipAddress: text('ip_address').notNull(),
  path: text('path').notNull(),
  userAgent: text('user_agent'),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
});

export type Post = typeof posts.$inferSelect; 