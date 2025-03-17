import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/auth/jwt";

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie) {
      return Response.json({ authenticated: false }, { status: 401 });
    }

    // Verify the JWT
    const session = await decrypt(sessionCookie.value);
    
    if (!session) {
      return Response.json({ authenticated: false }, { status: 401 });
    }

    return Response.json({ authenticated: true });
  } catch (error) {
    return Response.json({ authenticated: false }, { status: 401 });
  }
} 