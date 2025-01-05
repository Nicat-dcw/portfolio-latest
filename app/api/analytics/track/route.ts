import { db } from "@/app/lib/db";
import { visitors } from "@/app/lib/db/schema";

export async function POST(req: Request) {
  try {
    const { ip, path, userAgent } = await req.json();

    await db.insert(visitors).values({
      ipAddress: ip,
      path: path,
      userAgent: userAgent,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Failed to track visitor:', error);
    return Response.json({ error: "Failed to track visitor" }, { status: 500 });
  }
} 