import { db } from "@/app/lib/db";
import { visitors } from "@/app/lib/db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    // Fetch analytics data
    const analytics = await db
      .select({
        count: sql<number>`count(*)`,
        date: sql<string>`strftime('%Y-%m-%d', timestamp)`,
      })
      .from(visitors)
      .groupBy(sql`strftime('%Y-%m-%d', timestamp)`)
      .orderBy(sql`strftime('%Y-%m-%d', timestamp)`)
      .all();

    // Calculate stats
    const pageViews = await db.select({ count: sql<number>`count(*)` }).from(visitors).get();
    const uniqueVisitors = await db
      .select({ count: sql<number>`count(DISTINCT ip_address)` })
      .from(visitors)
      .get();
    const today = await db
      .select({ count: sql<number>`count(*)` })
      .from(visitors)
      .where(sql`date(timestamp) = date('now')`)
      .get();

    return Response.json({
      analytics,
      pageViews: pageViews?.count || 0,
      uniqueVisitors: uniqueVisitors?.count || 0,
      today: today?.count || 0
    });
  } catch (error) {
    return Response.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
} 