import { Card, Text, Metric } from "@tremor/react";

interface Stat {
  name: string;
  value: number;
}

interface StatsGridProps {
  stats: Stat[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card 
          key={stat.name}
          className="rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md"
        >
          <div className="p-6">
            <Text className="text-gray-500 dark:text-gray-400">{stat.name}</Text>
            <Metric className="mt-2 font-bold">{stat.value.toLocaleString()}</Metric>
          </div>
        </Card>
      ))}
    </div>
  );
} 