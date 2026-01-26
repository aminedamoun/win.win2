import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

export default function TermsOfUse() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  const content = isEnglish ? {
    title: 'TERMS OF USE',
    lastUpdated: 'Last updated: January 19, 2026',
    intro: 'These terms apply to the use of the website win-win.si.',
    sections: [
      {
        title: '1) Provider',
        content: `Win-Win, prodajno posredovanje d.o.o., Koštialova ulica 32, 8000 Novo mesto
E: office@win-win.si | T: +386 31 678 732
Registration: District Court Novo mesto, June 16, 2014`
      },
      {
        title: '2) Permitted use',
        content: `The user commits to lawful use of the site. It is prohibited to:
• interfere with the operation of the site,
• perform unauthorized access,
• upload malicious code or abuse forms.`
      },
      {
        title: '3) Content and responsibility',
        content: `The content is informative in nature. We do not guarantee uninterrupted operation or flawlessness. Any damage resulting from use of the site is excluded, except where law does not allow exclusion.`
      },
      {
        title: '4) Intellectual property',
        content: `Content, logos, and materials are protected. Commercial use without written permission is not allowed.`
      },
      {
        title: '5) Forms, applications, and newsletter',
        content: `By submitting data, the user warrants that the data is true and that they are authorized to provide it. Processing of personal data is described in detail in the Privacy Policy.`
      },
      {
        title: '6) Changes to terms',
        content: `We may occasionally update the terms. The version published on the website on the day of use applies.`
      },
      {
        title: '7) Law and jurisdiction',
        content: `The law of the Republic of Slovenia applies. For disputes, the competent court in Slovenia has jurisdiction.`
      }
    ]
  } : {
    title: 'POGOJI UPORABE',
    lastUpdated: 'Datum zadnje posodobitve: 19. 01. 2026',
    intro: 'Ti pogoji veljajo za uporabo spletne strani win-win.si.',
    sections: [
      {
        title: '1) Ponudnik',
        content: `Win-Win, prodajno posredovanje d.o.o., Koštialova ulica 32, 8000 Novo mesto
E: office@win-win.si | T: +386 31 678 732
Vpis: Okrožno sodišče Novo mesto, 16. 06. 2014`
      },
      {
        title: '2) Dovoljena uporaba',
        content: `Uporabnik se zavezuje k zakoniti uporabi strani. Prepovedano je:
• posegati v delovanje strani,
• izvajati nepooblaščen dostop,
• nalagati škodljivo kodo ali zlorabljati obrazce.`
      },
      {
        title: '3) Vsebina in odgovornost',
        content: `Vsebina je informativne narave. Ne jamčimo za neprekinjeno delovanje ali brezhibnost. Morebitna škoda zaradi uporabe strani je izključena, razen kjer zakon izključitve ne dopušča.`
      },
      {
        title: '4) Intelektualna lastnina',
        content: `Vsebine, logotipi in materiali so varovani. Komercialna uporaba brez pisnega dovoljenja ni dovoljena.`
      },
      {
        title: '5) Obrazci, prijave in newsletter',
        content: `Z oddajo podatkov uporabnik jamči, da so podatki resnični in da je upravičen do posredovanja. Obdelava osebnih podatkov je podrobno opisana v Politiki zasebnosti.`
      },
      {
        title: '6) Spremembe pogojev',
        content: `Pogoje lahko občasno posodobimo. Velja verzija, objavljena na spletni strani na dan uporabe.`
      },
      {
        title: '7) Pravo in pristojnost',
        content: `Velja pravo Republike Slovenije. Za spore je pristojno stvarno pristojno sodišče v Sloveniji.`
      }
    ]
  };

  return (
    <>
      <SEO
        title={isEnglish ? 'Terms of Use' : 'Pogoji uporabe'}
        description={isEnglish ? 'Terms of Use for Win-Win' : 'Pogoji uporabe Win-Win'}
      />
      <div className="min-h-screen bg-black">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <div className="bg-gradient-to-b from-neutral-900 to-black rounded-lg border border-red-900/20 p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {content.title}
            </h1>
            <p className="text-sm text-gray-400 mb-4">{content.lastUpdated}</p>
            <p className="text-gray-300 mb-8">{content.intro}</p>

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
