import { Sidebar } from "@/app/components/admin/Sidebar";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { MobileHeader } from "@/app/components/admin/MobileHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/admin/login");
  }

  // Only allow specific GitHub users by ID
  const allowedUsers = [process.env.GITHUB_USER_ID];
  if (!session.user.id || !allowedUsers.includes(session.user.id)) {
    redirect("/");
  }

  return (
    <div className="flex h-screen">
      <Sidebar user={session.user} />
      <div className="flex-1 flex flex-col">
        <MobileHeader user={session.user} />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 sm:px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 