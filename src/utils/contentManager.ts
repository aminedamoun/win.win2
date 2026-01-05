import { supabase } from './supabase';
import i18n from '../i18n';

interface ContentOverride {
  page: string;
  section: string;
  language: string;
  content: string;
}

const contentCache = new Map<string, Map<string, string>>();

export async function loadPageContent(page: string, language: string): Promise<Map<string, string>> {
  const cacheKey = `${page}-${language}`;

  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey)!;
  }

  try {
    const { data, error } = await supabase
      .from('website_content')
      .select('section, content')
      .eq('page', page)
      .eq('language', language);

    if (error) {
      console.error('Error loading content from database:', error);
      return new Map();
    }

    const contentMap = new Map<string, string>();
    data?.forEach((item: ContentOverride) => {
      contentMap.set(item.section, item.content);
    });

    contentCache.set(cacheKey, contentMap);
    return contentMap;
  } catch (error) {
    console.error('Error loading page content:', error);
    return new Map();
  }
}

export function getContent(page: string, section: string, fallback?: string): string {
  const language = i18n.language;
  const cacheKey = `${page}-${language}`;
  const contentMap = contentCache.get(cacheKey);

  if (contentMap && contentMap.has(section)) {
    return contentMap.get(section)!;
  }

  const translationKey = `${page}.${section}`;
  const translated = i18n.t(translationKey);

  if (translated !== translationKey) {
    return translated;
  }

  return fallback || translated;
}

export async function saveContent(
  page: string,
  section: string,
  language: string,
  content: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('website_content')
      .upsert(
        { page, section, language, content },
        { onConflict: 'page,section,language' }
      );

    if (error) {
      console.error('Error saving content:', error);
      return false;
    }

    const cacheKey = `${page}-${language}`;
    const contentMap = contentCache.get(cacheKey) || new Map();
    contentMap.set(section, content);
    contentCache.set(cacheKey, contentMap);

    return true;
  } catch (error) {
    console.error('Error saving content:', error);
    return false;
  }
}

export async function deleteContent(
  page: string,
  section: string,
  language: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('website_content')
      .delete()
      .eq('page', page)
      .eq('section', section)
      .eq('language', language);

    if (error) {
      console.error('Error deleting content:', error);
      return false;
    }

    const cacheKey = `${page}-${language}`;
    const contentMap = contentCache.get(cacheKey);
    if (contentMap) {
      contentMap.delete(section);
    }

    return true;
  } catch (error) {
    console.error('Error deleting content:', error);
    return false;
  }
}

export function clearContentCache(page?: string, language?: string): void {
  if (page && language) {
    contentCache.delete(`${page}-${language}`);
  } else if (page) {
    for (const key of contentCache.keys()) {
      if (key.startsWith(`${page}-`)) {
        contentCache.delete(key);
      }
    }
  } else {
    contentCache.clear();
  }
}

export async function initializePageContent(page: string): Promise<void> {
  const currentLanguage = i18n.language;
  await loadPageContent(page, currentLanguage);

  i18n.on('languageChanged', async (lng: string) => {
    await loadPageContent(page, lng);
  });
}
