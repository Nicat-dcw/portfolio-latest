import { Card } from "@tremor/react";
import { BlogPostsList } from "@/app/components/admin/BlogPostsList";
import { db } from "@/app/lib/db";
import { posts } from "@/app/lib/db/schema";

export default async function BlogManagementPage() {
  const allPosts = await db.select().from(posts).orderBy(posts.createdAt);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800/50 rounded-lg p-6 border border-gray-100 dark:border-gray-700/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold dark:text-gray-100">Blog Posts</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your blog posts
            </p>
          </div>
          <a 
            href="/admin/blog/new"
            className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
          >
            Create New Post
          </a>
        </div>
      </div>

      <Card className="overflow-hidden bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 rounded-lg">
        <div className="overflow-x-auto">
          <BlogPostsList posts={allPosts} />
        </div>
      </Card>
    </div>
  );
} 