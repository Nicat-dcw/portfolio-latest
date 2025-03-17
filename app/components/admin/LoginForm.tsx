"use client";

import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await signIn("github", { 
        callbackUrl: "/admin",
        redirect: true 
      });
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white bg-black rounded-lg hover:bg-stone-900 transition-colors disabled:opacity-50"
    >
      <FaGithub className="w-5 h-5" />
      {isLoading ? "Connecting..." : "Continue with GitHub"}
    </button>
  );
} 