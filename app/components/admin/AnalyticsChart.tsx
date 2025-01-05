"use client";

import { Card, Title, AreaChart } from "@tremor/react";
import { useState, useEffect } from "react";

export function AnalyticsChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch analytics data
    const fetchData = async () => {
      const response = await fetch('/api/analytics');
      const json = await response.json();
      setData(json);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Title>Page Views Over Time</Title>
      <AreaChart
        className="mt-4 h-72"
        data={data}
        index="date"
        categories={["views"]}
        colors={["violet"]}
      />
    </div>
  );
} 