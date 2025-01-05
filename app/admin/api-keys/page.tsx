import { Card } from "@tremor/react";
import { APIKeysList } from "@/app/components/admin/APIKeysList"
import { CreateAPIKeyForm } from "@/app/components/admin/CreateAPIKeyForm";
import { db } from "@/app/lib/db";
import { apiKeys } from "@/app/lib/db/schema";

export default async function APIKeysPage() {
  const keys = await db.select().from(apiKeys).orderBy(apiKeys.createdAt);

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold">API Keys</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your API keys
        </p>
      </div>

      <Card className="rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Create New API Key</h2>
          <CreateAPIKeyForm />
        </div>
      </Card>

      <Card className="rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Your API Keys</h2>
          <APIKeysList initialKeys={keys} />
        </div>
      </Card>
    </div>
  );
} 