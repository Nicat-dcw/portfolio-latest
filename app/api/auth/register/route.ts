import { db } from "@/app/lib/db";
import { users } from "@/app/lib/db/schema";
import { hashPassword } from "@/app/lib/auth/password";
import { setSession } from "@/app/lib/auth/jwt";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email, username, password } = await request.json();

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).get();

    if (existingUser) {
      return Response.json({ error: "Email already in use" }, { status: 400 });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await db.insert(users).values({
      email,
      username,
      passwordHash,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`,
    }).returning().get();

    // Create session
    await setSession({
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json({ error: "Registration failed" }, { status: 500 });
  }
} 