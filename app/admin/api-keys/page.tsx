import { Card } from "@tremor/react";
import { APIKeysList } from "@/app/components/admin/APIKeysList"
import { CreateAPIKeyForm } from "@/app/components/admin/CreateAPIKeyForm";
import { db } from "@/app/lib/db";
import { apiKeys } from "@/app/lib/db/schema";

export default async function APIKeysPage() {
  const keys = await db.select().from(apiKeys).orderBy(apiKeys.createdAt);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">API Keys</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your API keys
        </p>
      </div>

      <Card>
        <CreateAPIKeyForm />
      </Card>

      <Card>
        <APIKeysList initialKeys={keys} />
      </Card>
    </div>
  );
} 