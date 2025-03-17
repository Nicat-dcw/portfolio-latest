"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@tremor/react";
import { AnalyticsChart } from "@/app/components/admin/AnalyticsChart";
import { AuthCheck } from "@/app/components/admin/AuthCheck";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState([]);
  const [stats, setStats] = useState([
    { name: "Total Page Views", value: 0 },
    { name: "Unique Visitors", value: 0 },
    { name: "Views Today", value: 0 },
  ]);

  useEffect(() => {
    // Check if session cookie exists
    const hasSessionCookie = document.cookie.includes("session=authenticated");
    
    if (!hasSessionCookie) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
      setIsLoading(false);
      
      // Fetch analytics data
      fetchAnalytics();
    }
  }, [router]);

  const fetchAnalytics = async () => {
    try {
      // Fetch data from an API endpoint instead of direct DB access
      const response = await fetch("/api/admin/analytics");
      const data = await response.json();
      
      setAnalytics(data.analytics);
      setStats([
        { name: "Total Page Views", value: data.pageViews || 0 },
        { name: "Unique Visitors", value: data.uniqueVisitors || 0 },
        { name: "Views Today", value: data.today || 0 },
      ]);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    }
  };

  const handleLogout = () => {
    document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <AuthCheck>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>

        <Card>
          <h2 className="text-lg font-medium mb-4">Page Views</h2>
          <AnalyticsChart data={analytics} />
        </Card>

        <Card>
          <h2 className="text-lg font-medium mb-4">Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AuthCheck>
  );
}
