"use client";

import { useState } from "react";
import Link from "next/link";
import { Cog6ToothIcon, Bars3Icon } from "@heroicons/react/24/outline";
import SettingsModal from "./SettingsModal";
import MobileDrawer from "./MobileDrawer";
import { useTranslations } from "./i18n-provider";

export default function Navbar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const t = useTranslations();

  return (
    <>
      <div className="h-16 md:h-20" />
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-filter-blur backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4 transition-colors">
            {/* Left side - Profile */}
            <div className="flex items-center gap-3 motion-preset-slide-down">
              <div>
                <a href="/" className="font-medium dark:text-white motion-preset-rebound-down motion-delay-[400ms]">Nicat-dcw</a>
                <div className="flex items-center gap-2">
                  <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full font-medium">
                    beta
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 motion-preset-rebound-down motion-delay-[400ms]">v2.0</span>
                </div>
              </div>
            </div>

            {/* Center - Navigation (Hidden on mobile) */}
            <div className="hidden md:flex gap-6 font-bold ">
              <Link
                href="#projects"
                className="text-gray-800 motion-preset-rebound-down motion-delay-[400ms] dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
              >
                {t.navbar.projects}
              </Link>
              <Link
                href="/blog"
                className="text-gray-800 motion-preset-rebound-down motion-delay-[400ms] dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
              >
                {t.navbar.blog}
              </Link>
              <Link
                href="/social"
                className="text-gray-800 motion-preset-rebound-down motion-delay-[400ms] dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
              >
                {t.navbar.social}
              </Link>
            </div>

            {/* Right side - Github + Settings + Mobile Menu */}
            <div className="flex items-center gap-2">
              <Link
                href="https://github.com/Nicat-dcw"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden motion-preset-rebound-down motion-delay-[400ms] md:inline-block px-4 py-1 rounded hover:bg-gray-100 dark:hover:bg-[#212121] text-gray-800 dark:text-gray-200 transition-colors"
              >
                {t.navbar.github}
              </Link>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 motion-preset-rebound-down motion-delay-[400ms] rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors"
                aria-label={t.navbar.settings}
              >
                <Cog6ToothIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors"
                aria-label="Menu"
              >
                <Bars3Icon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        closeModal={() => setIsSettingsOpen(false)} 
      />
      <MobileDrawer
        isOpen={isDrawerOpen}
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </>
  );
}