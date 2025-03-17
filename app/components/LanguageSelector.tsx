"use client";

import { useEffect, useState } from "react";
import { i18n } from "@/i18n-config";
import { useRouter } from "next/navigation";
import { useI18n } from "./i18n-provider";

export function LanguageSelector() {
  const router = useRouter();
  const { lang, setLang } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = (locale: string) => {
    localStorage.setItem("language", locale);
    document.cookie = `language=${locale}; path=/; max-age=31536000`;
    setLang(locale);
    router.refresh();
  };

  if (!mounted) return null;

  return (
    <div className="grid grid-cols-3 gap-2">
      {i18n.locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleLanguageChange(locale)}
          className={`px-4 py-2 rounded-lg border-2 transition-all
            ${lang === locale 
              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20" 
              : "border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700"
            }
          `}
        >
          {locale === "en" ? "English" : locale === "az" ? "Azərbaycan" : "Español"}
        </button>
      ))}
    </div>
  );
} 