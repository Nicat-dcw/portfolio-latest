import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog-posts";
import { BlogContent } from "@/app/components/BlogContent";
import "highlight.js/styles/github-dark.css";

interface BlogPostPageProps {
  params: {
    uuid: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.uuid === params.uuid);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <BlogContent post={post} />
    </div>
  );
} 