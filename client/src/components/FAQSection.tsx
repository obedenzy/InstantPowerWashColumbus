import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-brand-white">
      <button
        onClick={toggleOpen}
        className="w-full flex justify-between items-center py-5 px-6 text-left text-lg font-medium text-brand-navy-blue hover:bg-brand-white focus:outline-none"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-brand-slate-gray">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const faqsData = [
  {
    question: 'How long does a typical power washing project take?',
    answer: 'Project duration varies based on size and complexity. Small residential jobs might take a few hours, while larger commercial projects could take a day or more. We provide a detailed timeline with our quote.',
  },
  {
    question: 'Do I need to prepare my property before you start?',
    answer: 'We recommend clearing the immediate area of small items, closing windows, and ensuring pets are indoors. Our team will cover delicate plants and outdoor furniture as needed.',
  },
  {
    question: 'What kind of cleaning solutions do you use?',
    answer: 'We use high-quality, biodegradable, and eco-friendly cleaning solutions that are effective yet safe for your property, landscaping, and the environment.',
  },
  {
    question: 'Are you insured and licensed?',
    answer: 'Yes, Instant Wash Columbus is fully licensed and insured for your peace of mind. We prioritize safety and professionalism on every job site.',
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first FAQ by default

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-brand-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="section-tag">FAQs</span>
          <h2 className="text-4xl font-bold text-brand-navy-blue">
            Frequently Asked <span className="text-brand-orange">Questions</span>
          </h2>
        </div>
        <div className="max-w-3xl mx-auto bg-brand-white rounded-lg shadow-lg overflow-hidden">
          {faqsData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggleOpen={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
