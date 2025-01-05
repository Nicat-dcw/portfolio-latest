import { db } from "@/app/lib/db";
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
    const post = {
      uuid,
      ...data,
      date: new Date().toISOString(),
      authorName: session.user?.name || "Anonymous",
      authorAvatar: session.user?.image || "/default-avatar.png",
      createdAt: new Date().toISOString()
    };

    await db.createPost(post);
    return Response.json({ success: true, post });
  } catch (error) {
    console.error("Failed to create post:", error);
    return Response.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await db.getAllPosts();
    return Response.json({ posts: Object.values(posts) });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return Response.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
} 