"use client";

import { LineChart } from "@tremor/react";

interface AnalyticsData {
  date: string;
  count: number;
}

interface AnalyticsChartProps {
  data: AnalyticsData[];
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  return (
    <LineChart
      data={data}
      index="date"
      categories={["count"]}
      colors={["violet"]}
      yAxisWidth={40}
      className="h-72"
    />
  );
} 