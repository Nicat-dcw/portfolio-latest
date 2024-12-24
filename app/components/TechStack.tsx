"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, SiTailwindcss, 
  SiMongodb, SiPrisma, SiPostgresql, SiPython, SiVercel, SiNetlify, 
  SiRust, SiBun, SiNpm, SiYarn, SiGnubash
} from "react-icons/si";
import { useTranslations } from "./i18n-provider";

type Category = "all" | "frontend" | "backend" | "database" | "tools";

const technologies = [
  // Frontend
  { 
    name: "React", 
    icon: SiReact, 
    color: "hover:text-blue-400",
    category: "frontend"
  },
  { 
    name: "Next.js", 
    icon: SiNextdotjs, 
    color: "hover:text-black dark:hover:text-white",
    category: "frontend"
  },
  { 
    name: "TypeScript", 
    icon: SiTypescript, 
    color: "hover:text-blue-500",
    category: "backend"
  },
  { 
    name: "Tailwind", 
    icon: SiTailwindcss, 
    color: "hover:text-cyan-400",
    category: "frontend"
  },
  // Backend
  { 
    name: "Node.js", 
    icon: SiNodedotjs, 
    color: "hover:text-green-500",
    category: "backend"
  },
  { 
    name: "Python", 
    icon: SiPython, 
    color: "hover:text-yellow-500",
    category: "backend"
  },
  { 
    name: "Rust", 
    icon: SiRust, 
    color: "hover:text-orange-500",
    category: "backend"
  },
  { 
    name: "Bash", 
    icon: SiGnubash, 
    color: "hover:text-gray-500",
    category: "backend"
  },
  // Database
  { 
    name: "MongoDB", 
    icon: SiMongodb, 
    color: "hover:text-green-500",
    category: "database"
  },
  { 
    name: "Prisma", 
    icon: SiPrisma, 
    color: "hover:text-indigo-500",
    category: "database"
  },
  { 
    name: "PostgreSQL", 
    icon: SiPostgresql, 
    color: "hover:text-blue-500",
    category: "database"
  },
  // Tools
  { 
    name: "Vercel", 
    icon: SiVercel, 
    color: "hover:text-black dark:hover:text-white",
    category: "tools"
  },
  { 
    name: "Netlify", 
    icon: SiNetlify, 
    color: "hover:text-teal-500",
    category: "tools"
  },
  { 
    name: "Bun", 
    icon: SiBun, 
    color: "hover:text-pink-500",
    category: "tools"
  },
  { 
    name: "NPM", 
    icon: SiNpm, 
    color: "hover:text-red-500",
    category: "tools"
  },
  { 
    name: "Yarn", 
    icon: SiYarn, 
    color: "hover:text-blue-400",
    category: "tools"
  }
];

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
  { id: "tools", label: "Tools" },
];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const t = useTranslations();

  const filteredTechnologies = technologies.filter(
    tech => activeCategory === "all" || tech.category === activeCategory
  );

  return (
    <section className="py-20" id="tech">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12 "
      >
        <div className="space-y-2 text-center">
          <h2 className="text-4xl font-bold sm:text-5xl">
            {t.techStack.title}{" "}
            <span className="bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent">
              {t.techStack.titleHighlight}
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t.techStack.description}
          </p>
        </div>
<div className="invisible w-24 shadow-[0px_20px_207px_10px_rgba(165,_39,_255,_0.48)]"></div>
        {/* Category Tabs */}
        <div className="flex justify-center gap-2 flex-wrap ">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${activeCategory === category.id
                  ? "text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
            >
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-violet-500 rounded-lg -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {category.label}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {filteredTechnologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group flex flex-col items-center gap-2 p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-colors"
            >
              <tech.icon className={`w-12 h-12 transition-colors ${tech.color}`} />
              <span className="font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
} 