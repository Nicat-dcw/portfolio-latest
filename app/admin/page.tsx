import { Card } from "@tremor/react";
import { AnalyticsChart } from "@/app/components/admin/AnalyticsChart";
import { db } from "@/app/lib/db";
import { visitors } from "@/app/lib/db/schema";
import { sql } from "drizzle-orm";

export default async function AdminDashboard() {
  // Get unique visitors count
  const uniqueVisitors = await db
    .select({ 
      count: sql<number>`COUNT(DISTINCT ip_address)` 
    })
    .from(visitors);

  // Get total visits
  const totalVisits = await db
    .select({ 
      count: sql<number>`COUNT(*)` 
    })
    .from(visitors);

  // Get last 24 hours visitors
  const last24Hours = await db
    .select({ 
      count: sql<number>`COUNT(DISTINCT ip_address)` 
    })
    .from(visitors)
    .where(sql`timestamp > datetime('now', '-1 day')`);

  // Get last 7 days visitors
  const last7Days = await db
    .select({ 
      count: sql<number>`COUNT(DISTINCT ip_address)` 
    })
    .from(visitors)
    .where(sql`timestamp > datetime('now', '-7 day')`);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold dark:text-gray-100">Analytics Overview</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Website traffic and engagement</p>
            </div>
            <span className="text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1.5 rounded-full text-sm font-medium">
              Active
            </span>
          </div>
          <AnalyticsChart />
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
            <h3 className="text-2xl font-bold dark:text-gray-100">{uniqueVisitors[0].count}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Unique Visitors</p>
          </Card>
          <Card className="p-6 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
            <h3 className="text-2xl font-bold dark:text-gray-100">{totalVisits[0].count}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Page Views</p>
          </Card>
          <Card className="p-6 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
            <h3 className="text-2xl font-bold dark:text-gray-100">{last24Hours[0].count}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Visitors (24h)</p>
            <span className="text-emerald-500 text-sm mt-2 inline-block">Active now ●</span>
          </Card>
          <Card className="p-6 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
            <h3 className="text-2xl font-bold dark:text-gray-100">{last7Days[0].count}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Visitors (7d)</p>
          </Card>
        </div>
      </div>

      <div className="lg:col-span-1">
        <Card className="p-6 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold dark:text-gray-100">Quick Actions</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Common admin tasks</p>
            </div>
            <div className="space-y-4">
              <button className="w-full px-4 py-2.5 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors">
                Create New Post
              </button>
              <button className="w-full px-4 py-2.5 text-sm font-medium text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 hover:bg-violet-100 dark:hover:bg-violet-500/20 rounded-lg transition-colors">
                Generate API Key
              </button>
              <button className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-700">
                View Analytics
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}