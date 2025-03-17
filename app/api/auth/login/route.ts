import { db } from "@/app/lib/db";
import { users } from "@/app/lib/db/schema";
import { verifyPassword } from "@/app/lib/auth/password";
import { setSession } from "@/app/lib/auth/jwt";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // For testing purposes, allow a default login
    if (email === "admin@example.com" && password === "adminpassword") {
      await setSession({
        id: 1,
        email: "admin@example.com",
        username: "Admin",
        avatar: "https://ui-avatars.com/api/?name=Admin&background=random",
      });
      
      return Response.json({ success: true });
    }

    // Find user by email
    const user = await db.select().from(users).where(eq(users.email, email)).get();

    if (!user) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Verify password
    const isValid = await verifyPassword(user.passwordHash, password);

    if (!isValid) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Create session
    await setSession({
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Authentication failed" }, { status: 500 });
  }
} 