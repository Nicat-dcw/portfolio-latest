"use client";

import { useState } from "react";
import { Textarea, Button } from "@tremor/react";
import { useRouter } from "next/navigation";

export function BlogPostForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, description, tags }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post');
      }

      setMessage({
        type: 'success',
        text: 'Post created successfully! Redirecting...'
      });

      // Clear form
      setTitle("");
      setContent("");
      setDescription("");
      setTags("");

      // Redirect after a short delay
      setTimeout(() => {
        router.push('/admin/blog');
        router.refresh();
      }, 2000);

    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to create post'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
            : 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Title
          </label>
          <input
            placeholder="Enter post title"
            value={title}
            className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 dark:focus:border-violet-500 dark:text-gray-100 dark:placeholder-gray-400 transition-colors"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Description
          </label>
          <input
            placeholder="Brief description of your post"
            value={description}
            className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 dark:focus:border-violet-500 dark:text-gray-100 dark:placeholder-gray-400 transition-colors"
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This will appear in blog previews and meta descriptions
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Content
          </label>
          <Textarea
            placeholder="Write your post content here..."
            value={content}
            rows={15}
            className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 dark:focus:border-violet-500 dark:text-gray-100 dark:placeholder-gray-400 transition-colors"
            onChange={(e) => setContent(e.target.value)}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Supports Markdown formatting
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Tags
          </label>
          <input
            placeholder="nextjs, react, typescript"
            value={tags}
            className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 dark:focus:border-violet-500 dark:text-gray-100 dark:placeholder-gray-400 transition-colors"
            onChange={(e) => setTags(e.target.value)}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Separate tags with commas
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          {isSubmitting && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Creating post...
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            disabled={isSubmitting}
            className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-700 disabled:opacity-50"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2.5 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Publishing...' : 'Publish Post'}
          </Button>
        </div>
      </div>
    </form>
  );
} 