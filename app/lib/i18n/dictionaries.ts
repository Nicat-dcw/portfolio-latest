import type { Locale } from '@/i18n-config';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then(module => module.default),
  es: () => import('./dictionaries/es.json').then(module => module.default),
  az: () => import('./dictionaries/az.json').then(module => module.default),
} satisfies Record<Locale, () => Promise<any>>;

export const getDictionary = async (locale: Locale) => {
  try {
    return await dictionaries[locale]();
  } catch (error) {
    console.error('Failed to load dictionary:', error);
    return dictionaries.en(); // Fallback to English
  }
}; 