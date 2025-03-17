"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: "light", name: "Light", icon: SunIcon },
    { id: "dark", name: "Dark", icon: MoonIcon },
    { id: "system", name: "System", icon: ComputerDesktopIcon },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {themes.map(({ id, name, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all
            ${theme === id 
              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20" 
              : "border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700"
            }`}
        >
          <Icon className="h-5 w-5" />
          <span className="text-sm">{name}</span>
        </button>
      ))}
    </div>
  );
} 