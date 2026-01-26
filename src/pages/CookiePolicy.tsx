import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

export default function CookiePolicy() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  const content = isEnglish ? {
    title: 'COOKIE POLICY (ZEKom-2)',
    lastUpdated: 'Last updated: January 19, 2026',
    sections: [
      {
        title: '1) What are cookies and "pixels"',
        content: `Cookies and similar tracking technologies (including "pixels") are files/identifiers that enable website operation, analytics, advertising, and conversion measurement.`
      },
      {
        title: '2) Legal basis and rules in Slovenia (summary)',
        content: `Non-essential cookies (analytics/marketing) require prior active consent.
Opt-out (install first, then reject) is not appropriate.
Analytical cookies are never "essential".`
      },
      {
        title: '3) How you manage consents',
        content: `On the site you have the option to:
• Reject (only essential cookies are loaded),
• Accept (analytical and/or marketing cookies are also loaded),
• Settings (select by categories).
You can change your choice at any time via the "Cookie Settings" link in the website footer.`
      },
      {
        title: '4) Cookie categories',
        content: `(A) Essential – website operation, security, storage of consent choice.
(B) Analytical (after consent) – measuring visits and usage (Google Analytics).
(C) Marketing (after consent) – remarketing, ad personalization, conversion measurement: Meta, Google Ads, LinkedIn, TikTok.`
      },
      {
        title: '5) List of main tools and typical cookies',
        content: `Google Analytics 4 (analytics): _ga, _ga_<container-id> (default 2 years).
Google Ads / Google marketing cookies (marketing): e.g., _gac_*, VISITOR_INFO1_LIVE (YouTube), etc. (various periods; from session to several months/years – depending on cookie).
LinkedIn Insight Tag (marketing): official cookie table (e.g., bcookie, bscookie, lidc, etc. with specified periods).
TikTok Pixel (marketing): cookies typically expire 13 months from setting or last use (depending on setting).
Meta Pixel (marketing): _fbc (recommended validity 90 days); Meta enables cookie type settings for Pixel.`
      },
      {
        title: '6) Google Consent Mode v2 (GTM)',
        content: `For EEA traffic, consents are communicated to Google tags via Consent Mode (including two additional parameters for granular consent).`
      }
    ]
  } : {
    title: 'POLITIKA PIŠKOTKOV (ZEKom-2)',
    lastUpdated: 'Datum zadnje posodobitve: 19. 01. 2026',
    sections: [
      {
        title: '1) Kaj so piškotki in "pixels"',
        content: `Piškotki in podobne sledilne tehnologije (vključno s "pixels") so datoteke/identifikatorji, ki omogočajo delovanje strani, analitiko, oglaševanje in merjenje konverzij.`
      },
      {
        title: '2) Pravna podlaga in pravila v Sloveniji (povzetek)',
        content: `Nenujni piškotki (analitika/marketing) zahtevajo predhodno aktivno privolitev.
Opt-out (najprej namesti, potem zavrni) ni ustrezen.
Analitični piškotki niso nikoli "nujni".`
      },
      {
        title: '3) Kako upravljate privolitve',
        content: `Na strani imate možnost:
• Zavrni (naložijo se samo nujni piškotki),
• Sprejmi (naložijo se tudi analitični in/ali marketinški),
• Nastavitve (izberete po kategorijah).
Svojo izbiro lahko kadarkoli spremenite prek povezave "Nastavitve piškotkov" v nogi spletne strani.`
      },
      {
        title: '4) Kategorije piškotkov',
        content: `(A) Nujni – delovanje strani, varnost, shranitev izbire soglasij.
(B) Analitični (po privolitvi) – merjenje obiska in uporabe (Google Analytics).
(C) Marketinški (po privolitvi) – remarketing, personalizacija oglasov, merjenje konverzij: Meta, Google Ads, LinkedIn, TikTok.`
      },
      {
        title: '5) Seznam glavnih orodij in tipičnih piškotkov',
        content: `Google Analytics 4 (analitika): _ga, _ga_<container-id> (privzeto 2 leti).
Google Ads / Google marketing piškotki (marketing): npr. _gac_*, VISITOR_INFO1_LIVE (YouTube), ipd. (različni roki; od seje do več mesecev/let – odvisno od piškotka).
LinkedIn Insight Tag (marketing): uradna tabela piškotkov (npr. bcookie, bscookie, lidc itd. z navedenimi roki).
TikTok Pixel (marketing): piškotki praviloma potečejo po 13 mesecih od nastavitve ali zadnje uporabe (odvisno od nastavitve).
Meta Pixel (marketing): _fbc (priporočena veljavnost 90 dni); Meta omogoča nastavitve tipov piškotkov za Pixel.`
      },
      {
        title: '6) Google Consent Mode v2 (GTM)',
        content: `Za promet iz EEA se privolitve posredujejo Google oznakam prek Consent Mode (vključno z dodatnima parametroma za granularno privolitev).`
      }
    ]
  };

  return (
    <>
      <SEO
        title={isEnglish ? 'Cookie Policy' : 'Politika piškotkov'}
        description={isEnglish ? 'Cookie Policy for Win-Win' : 'Politika piškotkov Win-Win'}
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.title}
            </h1>
            <p className="text-sm text-gray-600 mb-8">{content.lastUpdated}</p>

            <div className="space-y-8">
              {content.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {section.title}
                  </h2>
                  <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
