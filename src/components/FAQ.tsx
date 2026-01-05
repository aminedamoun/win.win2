import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = t('home.faq.items', { returnObjects: true }) as Record<string, FAQItem>;
  const faqs = Object.values(faqItems);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          <span dangerouslySetInnerHTML={{ __html: t('home.faq.title') }} />
        </h2>
        <p className="text-lg text-gray-300">
          {t('home.faq.description')}
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="glass-card overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              aria-expanded={openIndex === index}
              aria-label={`Toggle FAQ: ${faq.q}`}
            >
              <h3 className="text-lg font-semibold pr-8">{faq.q}</h3>
              <ChevronDown
                className={`flex-shrink-0 text-red-500 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                size={24}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                {faq.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
