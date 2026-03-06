import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import arTranslations from './locales/ar/translation.json';
import enTranslations from './locales/en/translation.json';

const resources = {
  ar: { translation: arTranslations },
  en: { translation: enTranslations }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    detection: {
      order: ['localStorage', 'sessionStorage', 'cookie'], // Removed 'navigator' to prevent defaulting to browser's English
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = i18n.dir();
  document.documentElement.lang = lng;
});

export default i18n;
