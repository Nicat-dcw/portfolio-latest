import { Card } from "@tremor/react";
import { BlogPostForm } from "@/app/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800/50 rounded-lg p-6 border border-gray-100 dark:border-gray-700/50">
        <h1 className="text-2xl font-bold dark:text-gray-100">Create New Post</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Write and publish a new blog post
        </p>
      </div>

      <Card className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 rounded-lg">
        <div className="p-6">
          <BlogPostForm />
        </div>
      </Card>
    </div>
  );
} 