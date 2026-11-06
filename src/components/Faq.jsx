import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'Will using GhostLead risk my LinkedIn account?',
    answer:
      'No. GhostLead uses intelligent human-paced browsing intervals and only inspects DOM elements already rendered on your screen. It never opens dozens of background bot sessions.',
  },
  {
    question: 'Do my purchased credits expire?',
    answer:
      'Never. All lifetime founder deal credits remain in your account until you actively verify deliverable leads.',
  },
  {
    question: 'How does the zero-waste credit policy work?',
    answer:
      'Credits are only deducted when an email is 100% verified as active and deliverable. If an address is catch-all, risky, or invalid, you pay exactly $0.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="mx-auto max-w-3xl mt-10 space-y-3">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={item.question}
              className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur"
            >
              <button
                type="button"
                id={`faq-question-${idx}`}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                onClick={() => toggleItem(idx)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-slate-900 cursor-pointer"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 motion-reduce:transition-none ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  className="px-5 pb-5 text-base text-slate-600"
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export { Faq };
