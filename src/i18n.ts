import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import sl from './locales/sl.json';
import en from './locales/en.json';

let savedLanguage = 'sl';
try {
  savedLanguage = localStorage.getItem('language') || 'sl';
} catch (e) {
  console.warn('localStorage not available, using default language');
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      sl: { translation: sl },
      en: { translation: en },
    },
    lng: savedLanguage,
    fallbackLng: 'sl',
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem('language', lng);
  } catch (e) {
    console.warn('Failed to save language preference');
  }
});

export default i18n;
