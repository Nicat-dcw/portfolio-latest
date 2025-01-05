import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { navigation } from "./Sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function MobileSidebar({ open, setOpen }: MobileSidebarProps) {
  const pathname = usePathname();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50 md:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-800 px-6 pb-2">
                <div className="flex h-16 shrink-0 items-center">
                  <h2 className="text-lg font-semibold">Admin Panel</h2>
                </div>
                <nav className="flex flex-1 flex-col">
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
                                  group flex gap-x-3 rounded-md p-2 text-sm font-semibold
                                  ${isActive 
                                    ? 'bg-gray-200 dark:bg-gray-700 text-violet-600 dark:text-violet-400' 
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                  }
                                `}
                                onClick={() => setOpen(false)}
                              >
                                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
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
                                        onClick={() => setOpen(false)}
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
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 