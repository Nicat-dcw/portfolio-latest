import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import { posts } from "@/app/lib/db/schema";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  const session = await auth();
  
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, content, description, tags } = await req.json();

    const post = await db.insert(posts).values({
      uuid: nanoid(),
      title,
      content,
      description,
      date: new Date().toISOString(),
      tags: JSON.stringify(tags.split(',').map((tag: string) => tag.trim())),
      authorName: session.user.name || 'Anonymous',
      authorAvatar: session.user.image || '',
    });

    return Response.json({ success: true, post });
  } catch (error) {
    console.error('Failed to create post:', error);
    return Response.json({ error: "Failed to create post" }, { status: 500 });
  }
} 