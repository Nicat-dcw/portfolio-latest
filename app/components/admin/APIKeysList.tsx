"use client";

import { useState } from 'react';
import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from "@tremor/react";
import { apiKeys } from '@/app/lib/db/schema';

interface APIKeysListProps {
  initialKeys: typeof apiKeys.$inferSelect[];
}

export function APIKeysList({ initialKeys }: APIKeysListProps) {
  const [keys] = useState<typeof apiKeys.$inferSelect[]>(initialKeys);

  return (
    <Table className="mt-4">
      <TableHead>
        <TableRow className="border-b border-gray-200 dark:border-gray-700">
          <TableHeaderCell className="text-gray-600 dark:text-gray-300">Name</TableHeaderCell>
          <TableHeaderCell className="text-gray-600 dark:text-gray-300">Key</TableHeaderCell>
          <TableHeaderCell className="text-gray-600 dark:text-gray-300">Created</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {keys.map((key) => (
          <TableRow 
            key={key.id}
            className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <TableCell className="font-medium">{key.name}</TableCell>
            <TableCell>
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                {key.key}
              </code>
            </TableCell>
            <TableCell>
              {key.createdAt ? new Date(key.createdAt).toLocaleDateString() : 'N/A'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 