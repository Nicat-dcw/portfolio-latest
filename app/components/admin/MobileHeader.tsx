"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MobileSidebar } from "./MobileSidebar";
import Image from "next/image";
import { User } from "next-auth";

interface MobileHeaderProps {
  user: User;
}

export function MobileHeader({ user }: MobileHeaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 md:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-200"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>

        <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <div className="flex items-center gap-3">
              <span className="hidden sm:block">{user.name}</span>
              {user.image && (
                <Image
                  className="h-8 w-8 rounded-full bg-gray-50"
                  src={user.image}
                  alt={user.name || ""}
                  width={32}
                  height={32}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <MobileSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
    </>
  );
} 