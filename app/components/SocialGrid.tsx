"use client";

import { motion } from "framer-motion";
import { 
  FaGithub, 
  FaTwitter, 
  FaLinkedin, 
  FaDiscord,
  FaTwitch,
  FaYoutube
} from "react-icons/fa";
import { useTranslations } from "./i18n-provider";

const socialLinks = [
  {
    name: "GitHub",
    icon: FaGithub,
    url: "https://github.com/Nicat-dcw",
    iconColor: "text-gray-900 dark:text-white",
    description: "Open source projects and contributions"
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    url: "https://twitter.com/nicatdcw",
    iconColor: "text-blue-500",
    description: "Thoughts and updates"
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    url: "https://linkedin.com/in/nicatdcw",
    iconColor: "text-blue-700",
    description: "Professional profile and connections"
  },
  {
    name: "Discord",
    icon: FaDiscord,
    url: "https://discord.gg/your-server",
    iconColor: "text-indigo-600",
    description: "Join our community"
  },
  {
    name: "Twitch",
    icon: FaTwitch,
    url: "https://twitch.tv/your-channel",
    iconColor: "text-purple-600",
    description: "Live coding streams"
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    url: "https://youtube.com/@your-channel",
    iconColor: "text-red-600",
    description: "Tutorials and tech content"
  }
];

export function SocialGrid() {
  const t = useTranslations();

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold sm:text-5xl">
          <span className="text-gray-900 dark:text-gray-100">
            {t.social.title}{" "}
          </span>
          <span className="bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent">
            {t.social.titleHighlight}
          </span>
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {t.social.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative p-6 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700/50 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700">
                <link.icon className={`w-6 h-6 ${link.iconColor}`} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {link.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {link.description}
                </p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
} 