"use client";

import { useState } from "react";
import { 
  Table, 
  TableHead, 
  TableRow, 
  TableHeaderCell, 
  TableBody, 
  TableCell,
  Badge
} from "@tremor/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Post } from "@/app/lib/db/schema";

interface BlogPostsListProps {
  posts: Post[];
}

export function BlogPostsList({ posts: initialPosts }: BlogPostsListProps) {
  const [posts] = useState(initialPosts);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Title</TableHeaderCell>
          <TableHeaderCell>Author</TableHeaderCell>
          <TableHeaderCell>Tags</TableHeaderCell>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id} className="group">
            <TableCell className="font-medium">{post.title}</TableCell>
            <TableCell>{post.authorName}</TableCell>
            <TableCell>
              <div className="flex gap-1 flex-wrap">
                {post.tags.map((tag) => (
                  <Badge key={tag} color="violet">
                    {tag}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              {new Date(post.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                  onClick={() => window.location.href = `/admin/blog/edit/${post.uuid}`}
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button 
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-red-500"
                  onClick={async () => {
                    if (confirm("Are you sure you want to delete this post?")) {
                      // Add delete functionality
                    }
                  }}
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 