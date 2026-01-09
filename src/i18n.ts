import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { supabase } from "./lib/supabase";

type LocaleRow = {
  lang: string;
  content: Record<string, any>;
  updated_at?: string;
};

export async function initI18n() {
  // Fallback if Supabase is down
  const resources: Record<string, { translation: any }> = {
    en: { translation: {} },
    sl: { translation: {} },
  };

  try {
    const { data, error } = await supabase
      .from("site_locales")
      .select("lang, content, updated_at");

    if (error) throw error;

    (data as LocaleRow[] | null)?.forEach((row) => {
      if (row?.lang && row?.content) {
        resources[row.lang] = { translation: row.content };
      }
    });
  } catch (e) {
    console.error("Failed to load site_locales from Supabase:", e);
  }

  const savedLang = localStorage.getItem("i18n_lang") || "sl";

  await i18n.use(initReactI18next).init({
    resources,
    lng: savedLang,
    fallbackLng: "sl",
    interpolation: { escapeValue: false },
  });

  return i18n;
}

export default i18n;
