import { db } from "@/app/lib/db";
import { visitors } from "@/app/lib/db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    // Get daily visitor counts for the last 7 days
    const dailyVisitors = await db
      .select({
        date: sql<string>`date(timestamp)`,
        visitors: sql<number>`COUNT(DISTINCT ip_address)`,
      })
      .from(visitors)
      .where(sql`timestamp > datetime('now', '-7 day')`)
      .groupBy(sql`date(timestamp)`)
      .orderBy(sql`date(timestamp)`);

    // Format dates to be more readable
    const formattedData = dailyVisitors.map(day => ({
      date: new Date(day.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      }),
      visitors: day.visitors
    }));

    return Response.json({ 
      success: true, 
      data: formattedData 
    });
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return Response.json(
      { error: "Failed to fetch analytics" }, 
      { status: 500 }
    );
  }
} 