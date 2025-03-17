import { auth } from "@/app/lib/auth"
import { redirect } from "next/navigation"
import { LoginForm } from "@/app/components/admin/LoginForm"

export default async function LoginPage() {
  const session = await auth()
  
  if (session) {
    redirect("/admin")
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="w-full max-w-lg mb-24 space-y-8 p-8 backdrop-filter-blur backdrop-blur-3xl bg-white/30 dark:bg-neutral-400/40 border border-white/70 dark:border-gray-800/70 rounded-2xl">
        <div className="text-center">
          <div className="mb-8 inline-flex items-center bg-gray-800 text-red-500 px-2 py-0.5 rounded-full text-sm font-semibold">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Access Restricted
          </div>
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
} 