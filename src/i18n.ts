import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import sl from './locales/sl.json';
import en from './locales/en.json';
import { supabase } from './utils/supabase';

let savedLanguage = 'sl';
try {
  savedLanguage = localStorage.getItem('language') || 'sl';
} catch (e) {
  console.warn('localStorage not available, using default language');
}

function setNestedProperty(obj: any, path: string, value: any) {
  const keys = path.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
}

async function loadDatabaseContent() {
  try {
    const { data, error } = await supabase
      .from('website_content')
      .select('*');

    if (error) {
      console.error('Error loading database content:', error);
      return { sl, en };
    }

    const slTranslations = JSON.parse(JSON.stringify(sl));
    const enTranslations = JSON.parse(JSON.stringify(en));

    data?.forEach((item) => {
      const translations = item.language === 'sl' ? slTranslations : enTranslations;

      if (!translations[item.page]) {
        translations[item.page] = {};
      }

      setNestedProperty(translations[item.page], item.section, item.content);
    });

    return {
      sl: slTranslations,
      en: enTranslations,
    };
  } catch (error) {
    console.error('Error in loadDatabaseContent:', error);
    return { sl, en };
  }
}

async function initializeI18n() {
  const translations = await loadDatabaseContent();

  i18n
    .use(initReactI18next)
    .init({
      resources: {
        sl: { translation: translations.sl },
        en: { translation: translations.en },
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
}

initializeI18n();

export async function reloadTranslations() {
  const translations = await loadDatabaseContent();

  i18n.addResourceBundle('sl', 'translation', translations.sl, true, true);
  i18n.addResourceBundle('en', 'translation', translations.en, true, true);

  const currentLang = i18n.language;
  await i18n.changeLanguage(currentLang);
}

export default i18n;
