import { db } from "@/app/lib/db";
import { pageViews } from "@/app/lib/db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  const last7Days = await db
    .select({
      date: sql<string>`date(timestamp)`,
      views: sql<number>`count(*)`,
    })
    .from(pageViews)
    .where(sql`timestamp > datetime('now', '-7 day')`)
    .groupBy(sql`date(timestamp)`)
    .orderBy(sql`date(timestamp)`);

  return Response.json(last7Days);
} 