"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cog6ToothIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { SettingsModal } from "./SettingsModal";
import MobileDrawer from "./MobileDrawer";
import { useTranslations } from "./i18n-provider";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="h-16 md:h-20" />
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link href="/" className="font-bold text-xl dark:text-white">
                Nicat<span className="text-violet-600">.</span>
              </Link>
            </div>

            {/* Center Navigation */}
            <div className="hidden md:flex gap-8 font-medium">
              <Link
                href="#projects"
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                {t.navbar.projects}
              </Link>
              <Link
                href="/blog"
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                {t.navbar.blog}
              </Link>
              <Link
                href="/social"
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                {t.navbar.social}
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link
                href="https://github.com/Nicat-dcw"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                {t.navbar.github}
              </Link>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors"
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
      </motion.nav>

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