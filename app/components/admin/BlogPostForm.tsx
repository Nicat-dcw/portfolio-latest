"use client";

import { useState } from "react";
import { TextInput, Textarea, Button } from "@tremor/react";

export function BlogPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add post creation logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Title</label>
        <TextInput
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Description</label>
        <TextInput
          placeholder="Brief description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Content</label>
        <Textarea
          placeholder="Write your post content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Tags</label>
        <TextInput
          placeholder="Comma-separated tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <p className="text-sm text-gray-500">
          Separate tags with commas (e.g., "typescript, nextjs, react")
        </p>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-violet-600 hover:bg-violet-500">
          Create Post
        </Button>
      </div>
    </form>
  );
} 