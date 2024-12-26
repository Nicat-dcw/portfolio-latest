import { Suspense } from "react";
import { BlogList } from "@/app/components/BlogList";
import { BlogSearch } from "@/app/components/BlogSearch";
import { blogPosts } from "@/data/blog-posts";

interface SearchParams {
  q?: string;
  tag?: string;
}

export default async function BlogPage({ 
  searchParams 
}: { 
  searchParams: SearchParams 
}) {
  const { q, tag } = searchParams;
  
  // Filter posts based on search query and tag
  let filteredPosts = blogPosts;
  
  if (q) {
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(q.toLowerCase()) ||
      post.description.toLowerCase().includes(q.toLowerCase())
    );
  }
  
  if (tag) {
    filteredPosts = filteredPosts.filter(post => 
      post.tags.includes(tag)
    );
  }

  // Get unique tags
  const allTags = Array.from(
    new Set(blogPosts.flatMap(post => post.tags))
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Suspense fallback={<div>Loading...</div>}>
        <BlogSearch initialQuery={q} tags={allTags} selectedTag={tag} />
        <BlogList posts={filteredPosts} />
      </Suspense>
    </div>
  );
} 