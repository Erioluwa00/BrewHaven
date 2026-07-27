import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee, Leaf, CupSoda, Apple, Milk, Sparkles } from 'lucide-react';
import '../css/global.css';

// Map categories to modern Lucide Icons
const iconMap = {
  'Coffee': Coffee,
  'Matcha': Leaf,
  'Boba': CupSoda,
  'Smoothies': Apple,
  'Milkshakes': Milk,
  'Refreshers': Sparkles
};

export default function CategoryCard({ category, count }) {
  const navigate = useNavigate();
  const IconComponent = iconMap[category] || Coffee;

  const handleClick = () => {
    // Navigate to shop and pass category filter state
    navigate('/shop', { state: { selectedCategory: category } });
  };

  return (
    <div className="category-card glass-card float-item-slow" onClick={handleClick}>
      <div className="category-icon-wrapper">
        <IconComponent className="category-icon" size={32} />
      </div>
      <h3 className="category-title">{category}</h3>
      <span className="category-count-badge">{count} Drinks</span>

      <style>{`
        .category-card {
          padding: 30px 20px;
          text-align: center;
          cursor: pointer;
          border-radius: var(--border-radius-lg);
          transition: var(--transition-bounce);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          position: relative;
          overflow: hidden;
        }

        .category-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: var(--color-primary);
          transform: scaleX(0);
          transition: var(--transition-smooth);
        }

        .category-card:hover {
          transform: translateY(-8px);
          background-color: var(--color-card);
        }

        .category-card:hover::before {
          transform: scaleX(1);
        }

        .category-icon-wrapper {
          width: 70px;
          height: 70px;
          border-radius: var(--border-radius-circle);
          background-color: #FFF0F5;
          color: var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-bounce);
          box-shadow: 0 4px 10px var(--color-shadow);
        }

        [data-theme='dark'] .category-icon-wrapper {
          background-color: #381B28;
          color: var(--color-primary);
        }

        .category-card:hover .category-icon-wrapper {
          transform: scale(1.1) rotate(10deg);
          background-color: var(--color-primary);
          color: var(--color-accent);
        }

        .category-title {
          font-family: var(--font-body);
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--color-accent);
          transition: var(--transition-smooth);
        }

        [data-theme='dark'] .category-title {
          color: var(--color-primary);
        }

        .category-count-badge {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
