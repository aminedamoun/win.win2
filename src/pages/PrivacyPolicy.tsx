import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  const content = isEnglish ? {
    title: 'PRIVACY POLICY (GDPR + ZVOP-2)',
    lastUpdated: 'Last updated: January 19, 2026',
    sections: [
      {
        title: '1) Data Controller',
        content: `Win-Win, prodajno posredovanje d.o.o.
Koštialova ulica 32, 8000 Novo mesto, Slovenia
E: office@win-win.si | T: +386 31 678 732`
      },
      {
        title: '2) What Personal Data We Process',
        content: `a) Contact (inquiry / call / email / form): name and surname (if provided), email, phone, message content, date/time of communication.
b) Job Application: data from application, CV and attachments (e.g., education, experience, contact), interview notes, appointment schedules.
c) Newsletter: email (and name if needed), consent record, subscription/unsubscription date, open/click statistics (if you consent to marketing analytics).
d) Technical Data from Website Visits: IP address, cookie and similar technology identifiers, device/browser data, events (e.g., page view, click, form submission) – only if you provide consent.`
      },
      {
        title: '3) Processing Purposes and Legal Bases',
        content: `Contact and Inquiries: performance of pre-contractual measures or communication (GDPR 6(1)(b)) and/or legitimate interest (GDPR 6(1)(f)).
Job Application: execution of selection process (GDPR 6(1)(b) and/or 6(1)(f)).
Newsletter/Marketing: consent (GDPR 6(1)(a)); unsubscribe option available in every message.
Analytics (Google Analytics): consent (GDPR 6(1)(a)); analytical cookies are not necessary and require prior active consent.
Advertising/Remarketing/Conversion Tracking ("pixels"): consent (GDPR 6(1)(a)); marketing tracking technologies always require consent.
Essential Website Operation and Security: legitimate interest (GDPR 6(1)(f)).`
      },
      {
        title: '4) Cookies, GTM and "Pixels" – How Consent Works',
        content: `We use a consent management mechanism (cookie banner) on the site that allows Accept / Reject / Settings and subsequent change of choice. Prior installation of non-essential cookies ("opt-out") is not permitted; only essential cookies are allowed.
Tracking and tags can be loaded:
• via Google Tag Manager (GTM) and/or
• directly in code and/or via GoHighLevel.
Regardless of implementation method, analytics and marketing are activated only after your consent.`
      },
      {
        title: '5) What Systems/Data Recipients May Be Used',
        content: `Hosting: GoDaddy (processor).
CRM/Forms/Newsletter/Automation: HighLevel (GoHighLevel) (processor).
Analytics: Google Analytics (Google Ireland) – after consent.
Advertising/Measurement (after consent):
• Meta Pixel (Meta Platforms Ireland)
• Google Ads (Google Ireland)
• LinkedIn Insight Tag (LinkedIn)
• TikTok Pixel (TikTok)
Important: when using Google advertising/analytics services, you must clearly identify all involved parties, maintain consent records, and enable easy withdrawal.`
      },
      {
        title: '6) Joint Controllership (Meta)',
        content: `For certain Meta business technologies (e.g., Pixel), part of the processing is defined as joint processing and is subject to the Meta Controller Addendum (included in Meta Business Tools Terms).`
      },
      {
        title: '7) Transfers Outside EU/EEA',
        content: `With some providers, data may be transferred outside the EU/EEA. In such cases, appropriate safeguards (e.g., standard contractual clauses) are used, in accordance with GDPR.`
      },
      {
        title: '8) Retention Periods',
        content: `Contact/Inquiries: up to 12 months from last communication, then deletion/anonymization, unless otherwise required by law.
Job Applications: up to 6 months after completion of process (unless candidate expressly consents to longer retention).
Newsletter: until consent withdrawal (unsubscribe).
Consent Records (cookies/marketing): up to 5 years (provability).
Cookies: until expiration of individual cookie (description in Cookie Policy).`
      },
      {
        title: '9) Your Rights',
        content: `Access, correction, deletion, restriction, portability, objection, withdrawal of consent (does not affect legality before withdrawal). Complaint: Information Commissioner of the Republic of Slovenia.`
      }
    ]
  } : {
    title: 'POLITIKA ZASEBNOSTI (GDPR + ZVOP-2)',
    lastUpdated: 'Datum zadnje posodobitve: 19. 01. 2026',
    sections: [
      {
        title: '1) Upravljavec',
        content: `Win-Win, prodajno posredovanje d.o.o.
Koštialova ulica 32, 8000 Novo mesto, Slovenija
E: office@win-win.si | T: +386 31 678 732`
      },
      {
        title: '2) Katere osebne podatke obdelujemo',
        content: `a) Kontakt (povpraševanje / klic / e-mail / obrazec): ime in priimek (če ga navedete), e-pošta, telefon, vsebina sporočila, datum/čas komunikacije.
b) Prijava na delo: podatki iz prijave, CV-ja in prilog (npr. izobrazba, izkušnje, kontakt), zapiski razgovorov, terminski dogovori.
c) Newsletter: e-pošta (in po potrebi ime), evidenca privolitve, datum prijave/odjave, statistika odpiranj/klikov (če privolite v analitiko marketinga).
d) Tehnični podatki ob obisku strani: IP naslov, identifikatorji piškotkov in podobnih tehnologij, podatki o napravi/brskalniku, dogodki (npr. ogled strani, klik, oddaja obrazca) – samo, če za to podate privolitev.`
      },
      {
        title: '3) Nameni obdelave in pravne podlage',
        content: `Kontakt in povpraševanja: izvedba ukrepov pred sklenitvijo pogodbe ali komunikacija (GDPR 6(1)(b)) in/ali zakoniti interes (GDPR 6(1)(f)).
Prijava na delo: izvedba postopka izbora (GDPR 6(1)(b) in/ali 6(1)(f)).
Newsletter/marketing: privolitev (GDPR 6(1)(a)); odjava je možna v vsakem sporočilu.
Analitika (Google Analytics): privolitev (GDPR 6(1)(a)); analitični piškotki niso nujni in zahtevajo predhodno aktivno privolitev.
Oglaševanje/remarketing/merjenje konverzij ("pixels"): privolitev (GDPR 6(1)(a)); trženjske sledilne tehnologije vedno zahtevajo privolitev.
Nujno delovanje in varnost spletne strani: zakoniti interes (GDPR 6(1)(f)).`
      },
      {
        title: '4) Piškotki, GTM in "pixels" – kako deluje privolitev',
        content: `Na strani uporabljamo mehanizem za upravljanje soglasij (cookie banner), ki omogoča Sprejmi / Zavrni / Nastavitve ter kasnejšo spremembo izbire. Predhodno nameščanje nenujnih piškotkov ("opt-out") ni dopustno; dopustni so le nujni piškotki.
Sledenje in oznake lahko nalagamo:
• prek Google Tag Manager (GTM) in/ali
• direktno v kodi ter/ali prek GoHighLevel.
Ne glede na način vgradnje se analitika in marketing aktivirata šele po vaši privolitvi.`
      },
      {
        title: '5) Kateri sistemi/prejemniki podatkov se lahko uporabljajo',
        content: `Gostovanje (hosting): GoDaddy (obdelovalec).
CRM/obrazci/newsletter/avtomatizacije: HighLevel (GoHighLevel) (obdelovalec).
Analitika: Google Analytics (Google Ireland) – po privolitvi.
Oglaševanje/meritve (po privolitvi):
• Meta Pixel (Meta Platforms Ireland)
• Google Ads (Google Ireland)
• LinkedIn Insight Tag (LinkedIn)
• TikTok Pixel (TikTok)
Pomembno: pri uporabi Google oglaševalskih/analitičnih storitev morate jasno identificirati vse vpletene stranke, voditi evidenco privolitve in omogočiti enostaven preklic.`
      },
      {
        title: '6) Skupno upravljavstvo (Meta)',
        content: `Za določene Meta poslovne tehnologije (npr. Pixel) je del obdelave opredeljen kot skupna obdelava in je predmet Meta Controller Addendum (vključen v Meta Business Tools Terms).`
      },
      {
        title: '7) Prenosi izven EU/EGP',
        content: `Pri nekaterih ponudnikih lahko pride do prenosa podatkov izven EU/EGP. V takih primerih se uporabljajo ustrezni zaščitni mehanizmi (npr. standardne pogodbene klavzule), skladno z GDPR.`
      },
      {
        title: '8) Roki hrambe',
        content: `Kontakt/povpraševanja: do 12 mesecev od zadnje komunikacije, nato izbris/anonymizacija, razen če zakon zahteva drugače.
Prijave na delo: do 6 mesecev po zaključku postopka (razen če kandidat izrecno privoli v daljšo hrambo).
Newsletter: do preklica privolitve (odjava).
Evidenca privolitev (piškotki/marketing): do 5 let (dokazljivost).
Piškotki: do izteka posameznega piškotka (opis v Politiki piškotkov).`
      },
      {
        title: '9) Vaše pravice',
        content: `Dostop, popravek, izbris, omejitev, prenosljivost, ugovor, preklic privolitve (ne vpliva na zakonitost pred preklicem). Pritožba: Informacijski pooblaščenec RS.`
      }
    ]
  };

  return (
    <>
      <SEO
        title={isEnglish ? 'Privacy Policy' : 'Politika zasebnosti'}
        description={isEnglish ? 'Privacy Policy for Win-Win' : 'Politika zasebnosti Win-Win'}
      />
      <div className="min-h-screen bg-black">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <div className="bg-gradient-to-b from-neutral-900 to-black rounded-lg border border-red-900/20 p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {content.title}
            </h1>
            <p className="text-sm text-gray-400 mb-8">{content.lastUpdated}</p>

            <div className="space-y-8">
              {content.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-xl font-semibold text-white mb-3">
                    {section.title}
                  </h2>
                  <div className="text-gray-300 whitespace-pre-line leading-relaxed">
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
