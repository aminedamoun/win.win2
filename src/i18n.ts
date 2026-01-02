import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import sl from './locales/sl.json';
import en from './locales/en.json';

const savedLanguage = localStorage.getItem('language') || 'sl';

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
  localStorage.setItem('language', lng);
});

export default i18n;
