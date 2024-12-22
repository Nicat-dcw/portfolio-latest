"use client";

import { useTranslations } from "./i18n-provider";
import Image from "next/image";
import { BlogPost } from "@/types/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useState } from "react";
import { ClipboardIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import rehypeHighlight from "rehype-highlight";

const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const t = useTranslations();

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyToClipboard}
      className="absolute top-2 right-2 p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
      title={t.blog.copyCode}
    >
      {copied ? (
        <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-500" />
      ) : (
        <ClipboardIcon className="w-5 h-5" />
      )}
    </button>
  );
};

export function BlogContent({ post }: { post: BlogPost }) {
  const t = useTranslations();

  const components = {
    pre: ({ children }: { children: any }) => {
      const code = children?.props?.children;
      return (
        <div className="relative">
          <pre className="relative">{children}</pre>
          <CopyButton code={code} />
        </div>
      );
    },
  };

  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <div className="mb-16 not-prose">
        <div className="flex items-start gap-4 mb-8">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={64}
            height={64}
            className="rounded-full mt-1"
          />
          <div className="space-y-1">
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {t.blog.publishedOn} {new Date(post.date).toLocaleDateString()} {t.blog.by} {post.author.name}
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-medium rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-b border-gray-200 dark:border-gray-800" />
      </div>
      
      <MDXRemote
        source={post.content}
        components={components}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypeHighlight],
          },
        }}
      />
    </article>
  );
} 