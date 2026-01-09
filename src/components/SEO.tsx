import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
}

export default function SEO({
  title = 'Win Win - Agencija za zaposlovanje | Prodajna delovna mesta v Sloveniji',
  description = 'Win Win je vodilna agencija za zaposlovanje, specializirana za prodajna delovna mesta, telefonsko prodajo, call center in telekomunikacije po Sloveniji.',
  image = 'https://www.win-win.si/logo2.png',
  canonical = 'https://www.win-win.si',
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.content = title;
      document.head.appendChild(meta);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.content = description;
      document.head.appendChild(meta);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', image);
    }

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    const currentPath = window.location.pathname;
    const currentUrl = `https://www.win-win.si${currentPath}`;

    let hreflangSl = document.querySelector('link[hreflang="sl"]');
    if (!hreflangSl) {
      hreflangSl = document.createElement('link');
      hreflangSl.setAttribute('rel', 'alternate');
      hreflangSl.setAttribute('hreflang', 'sl');
      document.head.appendChild(hreflangSl);
    }
    hreflangSl.setAttribute('href', currentUrl);

    let hreflangEn = document.querySelector('link[hreflang="en"]');
    if (!hreflangEn) {
      hreflangEn = document.createElement('link');
      hreflangEn.setAttribute('rel', 'alternate');
      hreflangEn.setAttribute('hreflang', 'en');
      document.head.appendChild(hreflangEn);
    }
    hreflangEn.setAttribute('href', `${currentUrl}?lang=en`);

    let hreflangDefault = document.querySelector('link[hreflang="x-default"]');
    if (!hreflangDefault) {
      hreflangDefault = document.createElement('link');
      hreflangDefault.setAttribute('rel', 'alternate');
      hreflangDefault.setAttribute('hreflang', 'x-default');
      document.head.appendChild(hreflangDefault);
    }
    hreflangDefault.setAttribute('href', currentUrl);

    const htmlElement = document.documentElement;
    const currentLang = localStorage.getItem('lang') || 'sl';
    htmlElement.setAttribute('lang', currentLang);
  }, [title, description, image, canonical]);

  return null;
}
