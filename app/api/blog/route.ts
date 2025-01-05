import { db } from "@/app/lib/db";
import { posts } from "@/app/lib/db/schema";
import { nanoid } from "nanoid";
import { auth } from "@/app/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const uuid = nanoid();

    const post = await db.insert(posts).values({
      uuid,
      title: data.title,
      content: data.content,
      description: data.description,
      date: new Date().toISOString(),
      tags: JSON.stringify(data.tags),
      authorName: session.user?.name || "Anonymous",
      authorAvatar: session.user?.image || "/default-avatar.png",
    });

    return Response.json({ success: true, post });
  } catch (error) {
    console.error("Failed to create post:", error);
    return Response.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allPosts = await db.select().from(posts);
    return Response.json({ posts: allPosts });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return Response.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
} 