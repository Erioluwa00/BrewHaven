import React, { useState } from 'react';
import { X, ArrowRight, RotateCcw, Check, ShoppingBag, Eye } from 'lucide-react';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';
import '../css/global.css';

export default function DrinkQuiz({ isOpen, onClose, onQuickView }) {
  const { addToCart, addToast } = useApp();
  const [step, setStep] = useState(0); // 0: Start, 1: Base Q, 2: Temp Q, 3: Sweetness Q, 4: Result
  
  // User choices
  const [answers, setAnswers] = useState({
    base: '',        // 'coffee', 'matcha', 'boba', 'fruit/dessert'
    temperature: '', // 'hot', 'iced', 'blended'
    sweetness: ''    // 'low', 'medium', 'high'
  });

  const [recommendedProduct, setRecommendedProduct] = useState(null);

  if (!isOpen) return null;

  const handleStart = () => {
    setStep(1);
    setAnswers({ base: '', temperature: '', sweetness: '' });
    setRecommendedProduct(null);
  };

  const handleSelectAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    const nextStep = step + 1;
    setStep(nextStep);

    // If we answered all 3 questions, compute recommendations
    if (nextStep === 4) {
      calculateRecommendation(value);
    }
  };

  const calculateRecommendation = (finalSweetness) => {
    const finalAnswers = { ...answers, sweetness: finalSweetness };
    
    // Simple filter matching algorithm
    let matched = null;

    if (finalAnswers.base === 'coffee') {
      if (finalAnswers.temperature === 'hot') {
        matched = products.find(p => p.id === 'coffee-lavender-latte');
      } else {
        matched = products.find(p => p.id === 'coffee-rose-espresso') || products.find(p => p.category === 'Coffee');
      }
    } else if (finalAnswers.base === 'matcha') {
      if (finalAnswers.temperature === 'hot') {
        matched = products.find(p => p.id === 'matcha-sakura') || products.find(p => p.category === 'Matcha');
      } else {
        matched = products.find(p => p.id === 'matcha-velvet-latte');
      }
    } else if (finalAnswers.base === 'boba') {
      if (finalAnswers.sweetness === 'high') {
        matched = products.find(p => p.id === 'boba-strawberry-cream');
      } else {
        matched = products.find(p => p.id === 'boba-royal-taro');
      }
    } else { // Fruit/Dessert / Smoothies / Milkshakes
      if (finalAnswers.temperature === 'blended') {
        if (finalAnswers.sweetness === 'high') {
          matched = products.find(p => p.id === 'milkshake-unicorn');
        } else {
          matched = products.find(p => p.id === 'smoothie-pink-paradise');
        }
      } else {
        matched = products.find(p => p.id === 'refresher-peachy-jasmine') || products.find(p => p.category === 'Refreshers');
      }
    }

    // Fallback if none found
    if (!matched) {
      matched = products[Math.floor(Math.random() * products.length)];
    }

    setRecommendedProduct(matched);
  };

  const handleQuickAdd = () => {
    if (recommendedProduct) {
      addToCart(recommendedProduct, 1, 'Regular', '100%', '50%', []);
      addToast(`Added recommended ${recommendedProduct.name} to Cart! 🌸`, 'success');
      onClose();
    }
  };

  return (
    <div className="quiz-overlay" onClick={onClose}>
      <div className="quiz-container glass-card" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button className="quiz-close-btn icon-btn" onClick={onClose} aria-label="Close quiz">
          <X size={20} />
        </button>

        {/* STEP 0: Landing */}
        {step === 0 && (
          <div className="quiz-slide text-center">
            <span className="quiz-tag">Drink Finder</span>
            <h2>Find Your Perfect Sip</h2>
            <p>Answer 3 quick questions about your cravings and our barista bot will match you with your dream BrewHaven drink!</p>
            <button className="btn btn-primary quiz-start-btn" onClick={handleStart}>
              <span>Start Drink Quiz</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 1: Base */}
        {step === 1 && (
          <div className="quiz-slide">
            <span className="quiz-progress">Question 1 of 3</span>
            <h2>What flavor foundation fits your mood?</h2>
            <div className="quiz-options-grid">
              <button className="quiz-opt-btn" onClick={() => handleSelectAnswer('base', 'coffee')}>
                <span className="opt-emoji">☕</span>
                <span className="opt-title">Bold Espresso & Coffee</span>
                <p>Rich, roasted, and energizing.</p>
              </button>
              <button className="quiz-opt-btn" onClick={() => handleSelectAnswer('base', 'matcha')}>
                <span className="opt-emoji">🍵</span>
                <span className="opt-title">Ceremonial Matcha & Green Tea</span>
                <p>Smooth, earthy, and focused calm.</p>
              </button>
              <button className="quiz-opt-btn" onClick={() => handleSelectAnswer('base', 'boba')}>
                <span className="opt-emoji">🧋</span>
                <span className="opt-title">Boba & Milk Teas</span>
                <p>Sweet jasmine green or taro with chewable pearls.</p>
              </button>
              <button className="quiz-opt-btn" onClick={() => handleSelectAnswer('base', 'fruit/dessert')}>
                <span className="opt-emoji">🍓</span>
                <span className="opt-title">Smoothies, Shakes & Refreshers</span>
                <p>Cold, sweet, fruity, or dessert-like blends.</p>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Temperature */}
        {step === 2 && (
          <div className="quiz-slide">
            <span className="quiz-progress">Question 2 of 3</span>
            <h2>How do you like your temperature?</h2>
            <div className="quiz-options-grid options-3">
              <button className="quiz-opt-btn" onClick={() => handleSelectAnswer('temperature', 'hot')}>
                <span className="opt-emoji">🔥</span>
                <span className="opt-title">Hot & Steamy</span>
                <p>Warm mug and beautiful cozy steam.</p>
              </button>
              <button className="quiz-opt-btn" onClick={() => handleSelectAnswer('temperature', 'iced')}>
                <span className="opt-emoji">🧊</span>
                <span className="opt-title">Iced & Shaken</span>
                <p>Chilled over ice, crisp and refreshing.</p>
              </button>
              <button className="quiz-opt-btn" onClick={() => handleSelectAnswer('temperature', 'blended')}>
                <span className="opt-emoji">🌪️</span>
                <span className="opt-title">Blended & Creamy</span>
                <p>Thick frappe, milkshake, or smoothie texture.</p>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Sweetness */}
        {step === 3 && (
          <div className="quiz-slide">
            <span className="quiz-progress">Question 3 of 3</span>
            <h2>What is your sweetness level sweet spot?</h2>
            <div className="quiz-options-grid options-3">
              <button className="quiz-opt-btn" onClick={() => handleSelectAnswer('sweetness', 'low')}>
                <span className="opt-emoji">🍃</span>
                <span className="opt-title">Low Sugar / Earthy</span>
                <p>Barely sweet, prioritizing coffee or tea taste.</p>
              </button>
              <button className="quiz-opt-btn" onClick={() => handleSelectAnswer('sweetness', 'medium')}>
                <span className="opt-emoji">🌸</span>
                <span className="opt-title">Balanced & Sweet</span>
                <p>Just right, standard cafe sweetness.</p>
              </button>
              <button className="quiz-opt-btn" onClick={() => handleSelectAnswer('sweetness', 'high')}>
                <span className="opt-emoji">🍰</span>
                <span className="opt-title">Dessert in a Cup</span>
                <p>Rich, indulgent, drizzled, topped with cream.</p>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Result */}
        {step === 4 && recommendedProduct && (
          <div className="quiz-slide text-center quiz-result-slide">
            <span className="quiz-tag">Your Barista Match</span>
            <h2>Meet your perfect drink!</h2>
            
            <div className="matched-drink-card glass-card">
              <img src={recommendedProduct.image} alt={recommendedProduct.name} className="matched-drink-img" />
              <div className="matched-drink-details">
                <span className="matched-category">{recommendedProduct.category}</span>
                <h3>{recommendedProduct.name}</h3>
                <p>{recommendedProduct.description}</p>
                <div className="matched-price-row">
                  <span className="matched-price">₦{recommendedProduct.price.toFixed(2)}</span>
                  <div className="matched-actions">
                    <button 
                      className="btn btn-secondary btn-quick-view-quiz"
                      onClick={() => { onClose(); onQuickView(recommendedProduct); }}
                    >
                      <Eye size={16} />
                      <span>Customize</span>
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={handleQuickAdd}
                    >
                      <ShoppingBag size={16} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button className="btn btn-secondary quiz-restart-link" onClick={handleStart}>
              <RotateCcw size={16} />
              <span>Take Quiz Again</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .quiz-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(110, 58, 82, 0.4);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fade-in-overlay 0.3s ease;
        }

        .quiz-container {
          width: 90%;
          max-width: 650px;
          background-color: var(--color-card);
          border-radius: var(--border-radius-lg);
          padding: 40px;
          position: relative;
          box-shadow: 0 20px 50px rgba(110, 58, 82, 0.25);
          animation: scale-up-modal 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .quiz-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
        }

        .quiz-slide {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .quiz-tag {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--color-primary);
          font-weight: 700;
          display: inline-block;
          margin-bottom: 4px;
        }

        .quiz-progress {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }

        .quiz-slide h2 {
          font-size: 2.2rem;
          color: var(--color-accent);
          line-height: 1.25;
        }

        [data-theme='dark'] .quiz-slide h2 {
          color: var(--color-primary);
        }

        .quiz-slide p {
          color: var(--color-text-muted);
          font-size: 1.05rem;
          line-height: 1.6;
        }

        .quiz-start-btn {
          margin-top: 12px;
          align-self: center;
          padding: 14px 30px;
        }

        /* Options layout */
        .quiz-options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 12px;
        }

        .quiz-options-grid.options-3 {
          grid-template-columns: 1fr;
        }

        .quiz-opt-btn {
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius-md);
          padding: 20px;
          text-align: left;
          cursor: pointer;
          transition: var(--transition-bounce);
          display: flex;
          flex-direction: column;
          gap: 6px;
          outline: none;
        }

        .quiz-opt-btn:hover {
          transform: translateY(-4px);
          border-color: var(--color-primary);
          background-color: var(--color-card);
          box-shadow: 0 8px 20px var(--color-shadow);
        }

        .opt-emoji {
          font-size: 1.8rem;
          margin-bottom: 4px;
        }

        .opt-title {
          font-family: var(--font-body);
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--color-accent);
        }

        [data-theme='dark'] .opt-title {
          color: var(--color-primary);
        }

        .quiz-opt-btn p {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.4;
        }

        /* Result Drink Card */
        .quiz-result-slide {
          align-items: center;
        }

        .matched-drink-card {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 24px;
          border-radius: var(--border-radius-lg);
          border: 1px solid var(--color-border);
          background: var(--color-card);
          width: 100%;
          margin: 12px 0 20px 0;
          text-align: left;
        }

        .matched-drink-img {
          width: 150px;
          height: 150px;
          border-radius: var(--border-radius-md);
          object-fit: cover;
          flex-shrink: 0;
          background-color: #FFF0F5;
        }

        .matched-drink-details {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .matched-category {
          font-size: 0.75rem;
          color: var(--color-primary);
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .matched-drink-details h3 {
          font-family: var(--font-body);
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--color-accent);
          margin-bottom: 8px;
        }

        [data-theme='dark'] .matched-drink-details h3 {
          color: var(--color-primary);
        }

        .matched-drink-details p {
          font-size: 0.85rem;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .matched-price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .matched-price {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--color-accent);
        }

        [data-theme='dark'] .matched-price {
          color: var(--color-primary);
        }

        .matched-actions {
          display: flex;
          gap: 8px;
        }

        .btn-quick-view-quiz {
          padding: 8px 16px;
          font-size: 0.85rem;
        }

        .quiz-restart-link {
          padding: 10px 20px;
          font-size: 0.85rem;
        }

        /* Responsive */
        @media (max-width: 600px) {
          .quiz-container {
            padding: 24px;
          }
          .quiz-options-grid {
            grid-template-columns: 1fr;
          }
          .matched-drink-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .matched-drink-img {
            width: 100px;
            height: 100px;
          }
        }
      `}</style>
    </div>
  );
}
