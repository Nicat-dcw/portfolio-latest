"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useTranslations } from "@/app/components/i18n-provider";
import { useRouter } from "next/navigation";

export default function Hero() {
  const t = useTranslations();
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-16 md:pt-20 flex flex-col justify-center relative">
      {/* Only keep the local gradient, remove the grid pattern */}
      <div className="absolute -z-10 h-[300px] w-[300px] rounded-full bg-violet-500/20 blur-[100px] md:h-[500px] md:w-[500px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-12 md:grid-cols-[1fr,1fr] items-center"
      >
        {/* Content */}
        <div className="space-y-10 order-2 md:order-1">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 px-3 py-1 text-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
              <span className="text-gray-600 dark:text-gray-400">v2</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-bold sm:text-6xl lg:text-7xl tracking-tight"
            >
              {t.hero.title}{" "}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-400 sm:text-2xl max-w-3xl"
            >
              {t.hero.description}
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link
              href="https://github.com/Nicat-dcw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white transition-all bg-black rounded-full hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              <FaGithub className="w-5 h-5" />
              {t.hero.github}
            </Link>
            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all rounded-full bg-transparent border border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-300"
            >
              {t.hero.work}
              <HiOutlineArrowNarrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4"
          >
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.hero.techStack}</p>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Node.js", "more"].map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + (i * 0.1) }}
                    onClick={() => router.push("#tech")}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="order-1 md:order-2 flex justify-center"
        >
          <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-2xl overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl">
            <Image
              src="https://avatars.githubusercontent.com/u/59221034?s=400&u=467d7330f5108f682fb7aae7c846f4722dc76050&v=4"
              alt="Profile Image"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-transparent"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
