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
    <div className="min-w-full">
      <Table className="min-w-full">
        <TableHead>
          <TableRow className="border-b border-gray-200 dark:border-gray-700">
            <TableHeaderCell className="text-gray-600 dark:text-gray-300">Title</TableHeaderCell>
            <TableHeaderCell className="text-gray-600 dark:text-gray-300 hidden md:table-cell">Author</TableHeaderCell>
            <TableHeaderCell className="text-gray-600 dark:text-gray-300 hidden lg:table-cell">Tags</TableHeaderCell>
            <TableHeaderCell className="text-gray-600 dark:text-gray-300 hidden sm:table-cell">Date</TableHeaderCell>
            <TableHeaderCell className="text-gray-600 dark:text-gray-300">Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow 
              key={post.id} 
              className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <TableCell className="font-medium dark:text-gray-200">{post.title}</TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-2">
                  <img 
                    src={post.authorAvatar} 
                    alt={post.authorName}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-gray-600 dark:text-gray-400">{post.authorName}</span>
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <div className="flex gap-1 flex-wrap">
                  {(typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags).map((tag: string) => (
                    <Badge key={tag} color="violet" className="whitespace-nowrap text-white">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    onClick={() => window.location.href = `/admin/blog/edit/${post.uuid}`}
                  >
                    <PencilIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button 
                    className="p-1 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    onClick={async () => {
                      if (confirm("Are you sure you want to delete this post?")) {
                        // Add delete functionality
                      }
                    }}
                  >
                    <TrashIcon className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 