import { db } from "@/app/lib/db";
import { posts } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";
import { Badge } from "@tremor/react";
import { notFound } from "next/navigation";

export default async function BlogPostPage({
  params: { uuid }
}: {
  params: { uuid: string }
}) {
  const post = await db
    .select()
    .from(posts)
    .where(eq(posts.uuid, uuid))
    .then(res => res[0]);

  if (!post) {
    notFound();
  }

  const tags = (typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags) as string[];

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <header className="space-y-4 mb-8">
          <h1 className="text-4xl font-bold dark:text-gray-100">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge 
                key={tag} 
                color="violet" 
                className="whitespace-nowrap rounded-full text-xs px-2.5 py-0.5"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <img 
                src={post.authorAvatar} 
                alt={post.authorName}
                className="w-8 h-8 rounded-full"
              />
              <span>{post.authorName}</span>
            </div>
            <span>•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </header>

        <div className="prose dark:prose-invert max-w-none">
          {post.content}
        </div>
      </article>
    </div>
  );
} 