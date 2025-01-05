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
    redirect("/login");
  }
 console.log(session)
  // Only allow specific users
  if (session?.user?.id !== "acca1304-dfbf-49aa-a0e7-22c81fd85f8f") {
    redirect("/");
  }

  return (
    <div className="flex h-screen">
      <Sidebar user={session.user} />
      <div className="flex-1 flex flex-col">
        <MobileHeader user={session.user} />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 