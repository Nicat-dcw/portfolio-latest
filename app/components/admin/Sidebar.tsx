"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { User } from "next-auth";
import { 
  ChartBarIcon, 
  KeyIcon, 
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export const navigation = [
  { name: "Dashboard", href: "/admin", icon: ChartBarIcon },
  { name: "API Keys", href: "/admin/api-keys", icon: KeyIcon },
  { 
    name: "Blog", 
    href: "/admin/blog", 
    icon: DocumentTextIcon,
    children: [
      { name: "All Posts", href: "/admin/blog" },
      { name: "New Post", href: "/admin/blog/new" },
    ]
  },
];

interface SidebarProps {
  user: User;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex h-full flex-col gap-y-5 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 px-6">
          <h2 className="text-lg font-semibold">Admin Panel</h2>
        </div>

        <nav className="flex flex-1 flex-col px-6">
          {/* Navigation items */}
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.children?.some(child => pathname === child.href));
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`
                          group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold
                          ${isActive 
                            ? 'bg-gray-200 dark:bg-gray-700 text-violet-600 dark:text-violet-400' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }
                        `}
                      >
                        <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                        {item.name}
                      </Link>
                      {item.children && (
                        <ul className="mt-1 space-y-1 pl-10">
                          {item.children.map((child) => (
                            <li key={child.name}>
                              <Link
                                href={child.href}
                                className={`
                                  group flex items-center rounded-md p-2 text-sm font-medium
                                  ${pathname === child.href
                                    ? 'text-violet-600 dark:text-violet-400'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                  }
                                `}
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>

          {/* User profile */}
          <div className="mt-auto pb-4">
            <div className="flex items-center gap-3 px-2 py-3 rounded-md">
              {user.image && (
                <Image
                  className="h-8 w-8 rounded-full bg-gray-50"
                  src={user.image}
                  alt={user.name || ""}
                  width={32}
                  height={32}
                />
              )}
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
} 