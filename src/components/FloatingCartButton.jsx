import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import '../css/global.css';

export default function FloatingCartButton() {
  const { cartItems } = useApp();
  const totalCartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (totalCartQuantity === 0) return null;

  return (
    <Link 
      to="/cart" 
      className="floating-cart-btn float-item-fast" 
      aria-label="View Shopping Cart"
    >
      <ShoppingBag size={24} />
      <span className="floating-cart-badge">{totalCartQuantity}</span>
      
      <style>{`
        .floating-cart-btn {
          position: fixed;
          bottom: 30px;
          right: 95px;
          width: 50px;
          height: 50px;
          border-radius: var(--border-radius-circle);
          background-color: var(--color-accent);
          color: var(--color-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px var(--color-shadow);
          z-index: 99;
          transition: var(--transition-bounce);
        }

        .floating-cart-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background-color: var(--color-primary);
          color: var(--color-accent);
          font-size: 0.7rem;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid var(--color-accent);
        }

        .floating-cart-btn:hover {
          background-color: var(--color-primary);
          color: var(--color-accent);
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 8px 25px var(--color-shadow-hover);
        }

        .floating-cart-btn:hover .floating-cart-badge {
          background-color: var(--color-accent);
          color: var(--color-secondary);
          border-color: var(--color-primary);
        }
      `}</style>
    </Link>
  );
}
