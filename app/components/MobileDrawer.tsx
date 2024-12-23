"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useTranslations } from "./i18n-provider";

interface MobileDrawerProps {
  isOpen: boolean;
  closeDrawer: () => void;
}

export default function MobileDrawer({ isOpen, closeDrawer }: MobileDrawerProps) {
  const t = useTranslations();

  const links = [
    { href: "#projects", label: t.navbar.projects, icon: "🚀" },
    { href: "/blog", label: t.navbar.blog, icon: "📝" },
    { href: "/social", label: t.navbar.social, icon: "🌐" },
    { 
      href: "https://github.com/Nicat-dcw", 
      label: t.navbar.github, 
      icon: "⭐", 
      external: true 
    },
  ];

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeDrawer}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
                    <div className="px-4 py-6 sm:px-6 border-b border-gray-200 dark:border-gray-800">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                          Menu
                        </Dialog.Title>
                        <button
                          type="button"
                          className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          onClick={closeDrawer}
                        >
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="relative flex-1 px-4 sm:px-6">
                      <div className="flex flex-col gap-2 py-4">
                        {links.map((link, index) => (
                          <Transition
                            key={link.href}
                            show={isOpen}
                            enter="transition-all duration-300"
                            enterFrom="opacity-0 translate-x-4"
                            enterTo="opacity-100 translate-x-0"
                            leave="transition-all duration-200"
                            leaveFrom="opacity-100 translate-x-0"
                            leaveTo="opacity-0 translate-x-4"
                          >
                            <div style={{ transitionDelay: `${index * 50}ms` }}>
                              <Link
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noopener noreferrer" : undefined}
                                onClick={closeDrawer}
                                className="flex items-center gap-3 px-4 py-3 text-lg font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:translate-x-1"
                              >
                                <span className="text-2xl">{link.icon}</span>
                                <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                                  {link.label}
                                </span>
                              </Link>
                            </div>
                          </Transition>
                        ))}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 