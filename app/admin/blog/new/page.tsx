import { Card } from "@tremor/react";
import { BlogPostForm } from "@/app/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Blog Post</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Create a new blog post
        </p>
      </div>

      <Card>
        <BlogPostForm />
      </Card>
    </div>
  );
} 