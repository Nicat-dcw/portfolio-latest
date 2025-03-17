"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { i18n } from "@/i18n-config"

const defaultTranslations = {
  navbar: {
    projects: "Projects",
    blog: "Blog",
    social: "Social",
    github: "GitHub",
    settings: "Settings"
  },
  hero: {
    title: "Hello, I'm",
    titleHighlight: "Nicat",
    description: "Full Stack Developer from Azerbaijan",
    github: "GitHub Profile",
    work: "View Work",
    techStack: "Tech Stack"
  },
  social: {
    title: "Connect",
    titleHighlight: "With Me",
    description: "Find me on various platforms and social media",
    github: "Open source projects and contributions",
    twitter: "Thoughts and updates",
    linkedin: "Professional profile and connections",
    discord: "Join our community",
    twitch: "Live coding streams",
    youtube: "Tutorials and tech content"
  },
  projects: {
    title: "Featured",
    titleHighlight: "Projects",
    description: "Some of my recent work",
    viewProject: "View Project",
    sourceCode: "Source Code"
  },
  techStack: {
    title: "Tech",
    titleHighlight: "Stack",
    description: "Technologies I work with",
    languages: "Programming Languages",
    frameworks: "Frameworks & Libraries",
    tools: "Tools & Platforms"
  },
  blog: {
    title: "Blog",
    titleHighlight: "Posts",
    description: "Latest posts and updates",
    readMore: "Read more",
    noResults: "No posts found",
    publishedOn: "Published on",
    by: "by",
    copyCode: "Copy code",
    copied: "Copied!"
  }
}

const I18nContext = createContext<{
  lang: string;
  setLang: (lang: string) => void;
  translations: typeof defaultTranslations;
}>({
  lang: "en",
  setLang: () => {},
  translations: defaultTranslations
})

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState("en")
  const [translations, setTranslations] = useState(defaultTranslations)

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en"
    setLang(savedLang)
    
    // Load translations dynamically
    import(`@/app/lib/i18n/locales/${savedLang}.json`)
      .then(module => setTranslations(module.default))
      .catch(() => setTranslations(defaultTranslations))
  }, [])

  const handleLangChange = (newLang: string) => {
    setLang(newLang)
    import(`@/app/lib/i18n/locales/${newLang}.json`)
      .then(module => setTranslations(module.default))
      .catch(() => setTranslations(defaultTranslations))
  }

  return (
    <I18nContext.Provider value={{ lang, setLang: handleLangChange, translations }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}

export function useTranslations() {
  const { translations } = useContext(I18nContext)
  return translations
} 