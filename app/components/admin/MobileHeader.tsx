"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleLogout = () => {
    document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/admin/login";
  };
  
  return (
    <header className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex h-16 items-center justify-between px-6">
        <button
          type="button"
          className="text-gray-700 dark:text-gray-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
              A
            </div>
          </div>
        </div>
      </div>
      
      {menuOpen && (
        <nav className="py-4 px-6 border-t border-gray-200 dark:border-gray-800">
          <ul className="space-y-4">
            <li>
              <Link href="/admin" className="block py-2 hover:text-violet-500">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/blog" className="block py-2 hover:text-violet-500">
                Blog Posts
              </Link>
            </li>
            <li>
              <Link href="/admin/api-keys" className="block py-2 hover:text-violet-500">
                API Keys
              </Link>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className="w-full text-left py-2 text-red-600 hover:text-red-700"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
} 