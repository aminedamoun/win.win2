import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function getSavedLang() {
  const saved = localStorage.getItem("lang");
  return saved === "sl" ? "sl" : "en";
}

async function loadTranslations() {
  const { data, error } = await supabase
    .from("site_locales")
    .select("lang, content")
    .in("lang", ["en", "sl"]);

  if (error) throw error;

  const resources: any = {};
  for (const row of data || []) {
    resources[row.lang] = { translation: row.content };
  }

  // fallback if table is empty or missing one language
  if (!resources.en) resources.en = { translation: {} };
  if (!resources.sl) resources.sl = { translation: {} };

  return resources;
}

export async function initI18nRemote() {
  const lang = getSavedLang();
  const resources = await loadTranslations();

  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init({
      resources,
      lng: lang,
      fallbackLng: "en",
      interpolation: { escapeValue: false },
    });
  } else {
    // update live without reload
    Object.keys(resources).forEach((l) => {
      i18n.addResourceBundle(l, "translation", resources[l].translation, true, true);
    });
    await i18n.changeLanguage(lang);
  }

  // Set up realtime updates
  setupRealtimeUpdates();
}

function setupRealtimeUpdates() {
  supabase
    .channel('site_locales_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'site_locales'
      },
      async (payload) => {
        console.log('Translation update detected:', payload);
        try {
          const resources = await loadTranslations();
          const currentLang = i18n.language;

          // Update all language bundles
          Object.keys(resources).forEach((lang) => {
            i18n.addResourceBundle(lang, "translation", resources[lang].translation, true, true);
          });

          // Trigger a language change to force re-render
          await i18n.changeLanguage(currentLang);

          console.log('✓ Translations reloaded successfully');
        } catch (error) {
          console.error('Error reloading translations:', error);
        }
      }
    )
    .subscribe();
}

// Manual refresh function
export async function refreshTranslations() {
  try {
    const resources = await loadTranslations();
    const currentLang = i18n.language;

    Object.keys(resources).forEach((lang) => {
      i18n.addResourceBundle(lang, "translation", resources[lang].translation, true, true);
    });

    await i18n.changeLanguage(currentLang);
    console.log('✓ Translations refreshed');
    return true;
  } catch (error) {
    console.error('Error refreshing translations:', error);
    return false;
  }
}
