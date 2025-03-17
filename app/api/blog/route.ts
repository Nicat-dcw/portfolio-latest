import { db } from "@/app/lib/db";
import { posts } from "@/app/lib/db/schema";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    // Check for session cookie instead of using next-auth
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get("session");
    
    if (!sessionCookie || sessionCookie.value !== "authenticated") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const uuid = nanoid();

    // Validate required fields
    if (!data.title || !data.content || !data.description) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Process tags
    let tagsArray = [];
    if (typeof data.tags === 'string' && data.tags.trim()) {
      tagsArray = data.tags.split(',').map((tag: string) => tag.trim());
    } else if (Array.isArray(data.tags)) {
      tagsArray = data.tags;
    }

    // Insert post with hardcoded author info since we're not using next-auth
    const post = await db.insert(posts).values({
      uuid,
      title: data.title,
      content: data.content,
      description: data.description,
      date: new Date().toISOString(),
      tags: JSON.stringify(tagsArray),
      authorName: "Admin User", // Hardcoded for now
      authorAvatar: "https://ui-avatars.com/api/?name=Admin&background=random",
    }).returning().get();

    return Response.json({ success: true, post });
  } catch (error) {
    console.error("Failed to create post:", error);
    return Response.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allPosts = await db.select().from(posts);
    return Response.json({ posts: allPosts });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return Response.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
} 