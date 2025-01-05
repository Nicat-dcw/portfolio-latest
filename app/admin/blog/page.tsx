import { Card, Title } from "@tremor/react";
import { BlogPostsList } from "@/app/components/admin/BlogPostsList";
import { db } from "@/app/lib/db";
import { posts } from "@/app/lib/db/schema";

export default async function BlogManagementPage() {
  const allPosts = await db.select().from(posts).orderBy(posts.createdAt);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your blog posts
          </p>
        </div>
        <a 
          href="/admin/blog/new"
          className="inline-flex items-center rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500"
        >
          New Post
        </a>
      </div>

      <Card>
        <BlogPostsList posts={allPosts} />
      </Card>
    </div>
  );
} 