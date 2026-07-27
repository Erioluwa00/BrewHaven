import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import '../css/global.css';

export default function FAQAccordion({ faqs }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="faq-accordion-container">
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;

        return (
          <div key={index} className={`faq-item glass-card ${isOpen ? 'active' : ''}`}>
            <button 
              className="faq-question-btn" 
              onClick={() => toggleAccordion(index)}
              aria-expanded={isOpen}
            >
              <h3>{faq.question}</h3>
              <ChevronDown size={20} className="faq-chevron" />
            </button>

            <div className="faq-answer-wrapper" style={{ height: isOpen ? 'auto' : 0 }}>
              <div className="faq-answer-content">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        .faq-accordion-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }

        .faq-item {
          border: 1px solid var(--color-border);
          overflow: hidden;
          transition: var(--transition-smooth);
        }

        .faq-item.active {
          border-color: var(--color-primary);
          box-shadow: 0 10px 25px var(--color-shadow-hover);
        }

        .faq-question-btn {
          width: 100%;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          color: inherit;
        }

        .faq-question-btn h3 {
          font-family: var(--font-body);
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--color-accent);
          margin-bottom: 0;
          transition: var(--transition-smooth);
        }

        [data-theme='dark'] .faq-question-btn h3 {
          color: var(--color-primary);
        }

        .faq-item.active .faq-question-btn h3 {
          color: var(--color-primary);
        }

        .faq-chevron {
          color: var(--color-text-muted);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-item.active .faq-chevron {
          transform: rotate(180deg);
          color: var(--color-primary);
        }

        .faq-answer-wrapper {
          overflow: hidden;
          transition: height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-answer-content {
          padding: 0 24px 20px 24px;
          border-top: 1px dashed var(--color-border);
          padding-top: 16px;
        }

        .faq-answer-content p {
          color: var(--color-text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
