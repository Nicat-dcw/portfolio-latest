"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";
import { useTranslations } from "./i18n-provider";

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold sm:text-5xl">
          {t.blog.title}{" "}
          <span className="bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent">
            {t.blog.titleHighlight}
          </span>
        </h1>
      </div>
      <div className="space-y-8">
        {posts.map((post) => (
          <Link
            key={post.uuid}
            href={`/blog/${post.uuid}`}
            className="block group"
          >
            <article className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl transition-all duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h2 className="text-xl font-semibold group-hover:text-violet-500 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t.blog.publishedOn} {new Date(post.date).toLocaleDateString()} {t.blog.by} {post.author.name}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {post.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-medium text-violet-500 group-hover:text-violet-600 dark:group-hover:text-violet-400">
                  {t.blog.readMore} →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
} 