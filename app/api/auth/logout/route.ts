import { clearSession } from "@/app/lib/auth/jwt";

export async function POST() {
  await clearSession();
  return Response.json({ success: true });
} 