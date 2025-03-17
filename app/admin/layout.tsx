import { redirect } from "next/navigation";
import { MobileHeader } from "@/app/components/admin/MobileHeader";
import { cookies, headers } from "next/headers";

// This layout only applies to /admin routes EXCEPT /admin/login
// /admin/login has its own layout

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the current path
  const url = new URL(headers().get("x-url") || "/", "http://localhost");
  const path = url.pathname;
  
  // If this is the login page, don't apply the admin layout
  if (path === "/admin/login") {
    return <>{children}</>;
  }
  
  // Check for auth cookie
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session");

  // Redirect to login if no session
  if (!sessionCookie) {
    redirect("/admin-login");
  }

  return (
    <div className="flex">
      <aside className="hidden lg:block w-64 h-screen sticky top-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h2 className="text-xl font-bold">Admin Panel</h2>
          </div>
          <nav className="flex-1 px-4 space-y-1">
            <a 
              href="/admin" 
              className="flex items-center px-4 py-2 text-gray-700 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Dashboard
            </a>
            <a 
              href="/admin/blog" 
              className="flex items-center px-4 py-2 text-gray-700 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Blog Posts
            </a>
            <a 
              href="/admin/api-keys" 
              className="flex items-center px-4 py-2 text-gray-700 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              API Keys
            </a>
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <form action="/api/auth/logout" method="POST">
              <button 
                type="submit"
                className="w-full px-4 py-2 text-sm text-red-600 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </aside>
      <main className="flex-1 min-h-screen">
        <MobileHeader />
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
} 