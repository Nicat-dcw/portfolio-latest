"use client";

import { useState, useEffect } from "react";
import { AreaChart } from "@tremor/react";

interface VisitorData {
  date: string;
  visitors: number;
}

export function AnalyticsChart() {
  const [data, setData] = useState<VisitorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics');
        const json = await response.json();
        setData(json.data);
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AreaChart
      className="h-72 mt-6 [&_.recharts-cartesian-grid-horizontal_line]:stroke-gray-200 dark:[&_.recharts-cartesian-grid-horizontal_line]:stroke-gray-500 [&_.recharts-cartesian-axis-line]:stroke-gray-200 dark:[&_.recharts-cartesian-axis-line]:stroke-gray-500"
      data={data}
      index="date"
      categories={["visitors"]}
      colors={["cyan"]}
      valueFormatter={(value) => value.toLocaleString()}
      showLegend={false}
      showGridLines={false}
      curveType="monotone"
      minValue={0}
    />
  );
} 