import { Card } from "@tremor/react";
import { StatsGrid } from "@/app/components/admin/StatsGrid";
import { AnalyticsChart } from "@/app/components/admin/AnalyticsChart";
import { db } from "@/app/lib/db";
import { pageViews } from "@/app/lib/db/schema";
import { sql } from "drizzle-orm";

export default async function AdminDashboard() {
  const last24Hours = await db
    .select({ count: sql<number>`count(*)` })
    .from(pageViews)
    .where(sql`timestamp > datetime('now', '-1 day')`);

  const last7Days = await db
    .select({ count: sql<number>`count(*)` })
    .from(pageViews)
    .where(sql`timestamp > datetime('now', '-7 day')`);

  const last30Days = await db
    .select({ count: sql<number>`count(*)` })
    .from(pageViews)
    .where(sql`timestamp > datetime('now', '-30 day')`);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Website analytics and statistics
        </p>
      </div>

      <StatsGrid
        stats={[
          { name: 'Last 24 Hours', value: last24Hours[0].count },
          { name: 'Last 7 Days', value: last7Days[0].count },
          { name: 'Last 30 Days', value: last30Days[0].count },
        ]}
      />

      <Card>
        <AnalyticsChart />
      </Card>
    </div>
  );
}