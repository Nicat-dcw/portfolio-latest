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
        <Card key={stat.name}>
          <Text>{stat.name}</Text>
          <Metric>{stat.value}</Metric>
        </Card>
      ))}
    </div>
  );
} 