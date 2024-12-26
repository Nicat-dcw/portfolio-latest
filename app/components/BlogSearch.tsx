"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "./i18n-provider";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import debounce from "lodash/debounce";

interface BlogSearchProps {
  initialQuery?: string;
  tags: string[];
  selectedTag?: string;
}

export function BlogSearch({ initialQuery = "", tags, selectedTag }: BlogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const [query, setQuery] = useState(initialQuery);

  const updateSearch = debounce((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    router.push(`/blog?${params.toString()}`);
  }, 300);

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    if (tag === selectedTag) {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }
    router.push(`/blog?${params.toString()}`);
  };

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  return (
    <div className="mb-8 space-y-4">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="search"
          placeholder={t.blog.searchPlaceholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            updateSearch(e.target.value);
          }}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              tag === selectedTag
                ? "bg-violet-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
} 