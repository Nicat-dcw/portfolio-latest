import { blogPosts } from "@/data/blog-posts";
import { BlogList } from "@/app/components/BlogList";

export default function BlogPage() {
  return <BlogList posts={blogPosts} />;
} 