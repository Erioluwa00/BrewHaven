import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import '../css/global.css';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      className={`btn-scroll-top ${visible ? 'active' : ''}`} 
      onClick={scrollToTop}
      aria-label="Scroll to Top"
    >
      <ChevronUp size={24} />
      
      <style>{`
        .btn-scroll-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          border-radius: var(--border-radius-circle);
          background-color: var(--color-primary);
          color: var(--color-accent);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px var(--color-shadow);
          z-index: 99;
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px) scale(0.8);
          transition: var(--transition-bounce);
        }

        .btn-scroll-top.active {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
        }

        .btn-scroll-top:hover {
          background-color: var(--color-accent);
          color: var(--color-secondary);
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 8px 20px var(--color-shadow-hover);
        }
      `}</style>
    </button>
  );
}
