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
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Key</TableHeaderCell>
          <TableHeaderCell>Created</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {keys.map((key) => (
          <TableRow key={key.id}>
            <TableCell>{key.name}</TableCell>
            <TableCell>{key.key}</TableCell>
            <TableCell>
              {key.createdAt ? new Date(key.createdAt).toLocaleDateString() : 'N/A'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 