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
    <div className="w-full max-w-6xl mx-auto px-4 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>
      <div className="absolute -z-10 h-[300px] w-[300px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-[100px]"></div>

      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold sm:text-5xl tracking-tight"
        >
          <span className="text-gray-900 dark:text-gray-100">
            {t.social.title}{" "}
          </span>
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            {t.social.titleHighlight}
          </span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          {t.social.description}
        </motion.p>
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
            className="group relative p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
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