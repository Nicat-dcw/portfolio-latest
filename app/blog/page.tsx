import { db } from "@/app/lib/db";
import { posts } from "@/app/lib/db/schema";
import { BlogPostCard } from "@/app/components/BlogPostCard";
import { getDictionary } from "@/app/lib/i18n/dictionaries";
import { headers } from "next/headers";
import { sql } from "drizzle-orm";

export default async function BlogPage() {
  const headersList = headers();
  const locale = (headersList.get('x-locale') || 'en') as 'en' | 'es' | 'az';
  const dict = await getDictionary(locale);

  const allPosts = await db
    .select()
    .from(posts)
    .orderBy(sql`${posts.createdAt} DESC`);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold sm:text-5xl">
            {dict.blog.title}{" "}
            <span className="bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent">
              {dict.blog.titleHighlight}
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-4">
            {dict.blog.description}
          </p>
        </div>

        {allPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post) => (
              <BlogPostCard 
                key={post.uuid} 
                post={post}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {dict.blog.noResults}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 