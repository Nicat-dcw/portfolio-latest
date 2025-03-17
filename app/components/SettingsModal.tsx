"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ThemeSelector } from "@/app/components/ThemeSelector";
import { LanguageSelector } from "@/app/components/LanguageSelector";

export function SettingsModal({ 
  isOpen, 
  closeModal 
}: { 
  isOpen: boolean; 
  closeModal: () => void;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 dark:bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Settings
                </Dialog.Title>

                <div className="mt-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                      Theme
                    </h4>
                    <ThemeSelector />
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                      Language
                    </h4>
                    <LanguageSelector />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 