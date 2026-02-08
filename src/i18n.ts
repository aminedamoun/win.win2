import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en.json";
import slTranslations from "./locales/sl.json";

const savedLang = localStorage.getItem("i18n_lang") || "sl";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    sl: { translation: slTranslations },
  },
  lng: savedLang,
  fallbackLng: "sl",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
