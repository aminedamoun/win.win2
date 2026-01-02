import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What makes Win Win different from other sales companies?',
    answer: 'We prioritize long-term relationships over quick wins. Our approach is built on trust, transparency, and genuine value delivery. We invest heavily in our team with proper training, support, and career growth opportunities. Plus, we operate with complete transparency in earnings and expectations.',
  },
  {
    question: 'What kind of training and support do you provide?',
    answer: 'We offer comprehensive onboarding that includes sales technique training, product knowledge, communication skills, and field practice. You\'ll have ongoing coaching, weekly team meetings, performance reviews, and access to experienced mentors. We believe in continuous learning and improvement.',
  },
  {
    question: 'How much can I realistically earn?',
    answer: 'Earnings vary based on performance, but our top performers earn significantly above industry averages. We offer competitive base compensation plus performance-based bonuses. New team members typically reach solid earning potential within 3-6 months. We\'re completely transparent about earnings during the interview process.',
  },
  {
    question: 'Do I need previous sales experience?',
    answer: 'Not necessarily! While experience is valuable, we value attitude, work ethic, and willingness to learn even more. Many of our most successful team members came from completely different backgrounds. What matters most is your drive, integrity, and commitment to growth.',
  },
  {
    question: 'What does a typical day look like?',
    answer: 'It depends on your role. Field sales reps spend most of their day meeting customers face-to-face across Slovenia. Call center teams work from our modern offices in Trzin or Kranj with structured shifts. Both roles include morning briefings, active selling time, and end-of-day debriefs.',
  },
  {
    question: 'What are the working hours?',
    answer: 'We offer flexible scheduling to accommodate different lifestyles. Field sales roles typically have more autonomy in scheduling, while call center positions have set shifts. We believe in work-life balance and offer both full-time and part-time opportunities.',
  },
  {
    question: 'Is this door-to-door sales?',
    answer: 'Yes, we do B2C field sales, which includes door-to-door. But it\'s done professionally and ethically. We train our team to be respectful, knowledgeable, and focused on genuine customer needs. We only represent products and services we truly believe in.',
  },
  {
    question: 'What products or services do you sell?',
    answer: 'We partner with reputable companies in energy, telecommunications, and home services sectors. We only represent products we stand behind. During the interview process, we\'ll provide detailed information about current partnerships and offerings.',
  },
  {
    question: 'What growth opportunities are available?',
    answer: 'We promote from within! Career progression can go from Sales Rep → Senior Rep → Team Lead → Manager → Director. We also offer opportunities to transition between field sales and call center operations based on your strengths and interests.',
  },
  {
    question: 'How do I apply?',
    answer: 'Click the "Apply Now" button on our Jobs page, fill out the application form, and attach your CV. Our recruitment team will review your application and contact qualified candidates within 3-5 business days to schedule an interview.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          Frequently Asked <span className="text-red-500">Questions</span>
        </h2>
        <p className="text-lg text-gray-300">
          Got questions? We've got answers. Here are the most common questions we receive.
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
              aria-label={`Toggle FAQ: ${faq.question}`}
            >
              <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
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
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
