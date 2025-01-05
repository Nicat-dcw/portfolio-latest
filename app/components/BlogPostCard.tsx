import Link from "next/link";
import { Badge } from "@tremor/react";
import { Post } from "@/app/lib/db/schema";

interface BlogPostCardProps {
  post: Post;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const tags = (typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags) as string[];

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Link 
      href={`/blog/${post.uuid}`} 
      className="block group"
    >
      <article className="h-full bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 rounded-lg overflow-hidden transition-all hover:shadow-lg">
        <div className="p-6 flex flex-col h-full">
          <div className="flex-1 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 line-clamp-3">
              {post.description}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge 
                  key={tag} 
                  color="violet" 
                  className="whitespace-nowrap rounded-full text-xs px-2.5 py-0.5 text-white"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <img 
                  src={post.authorAvatar} 
                  alt={post.authorName}
                  className="w-6 h-6 rounded-full"
                />
                <span>{post.authorName}</span>
              </div>
              <time dateTime={post.date}>
                {formattedDate}
              </time>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
} 