import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, Heart, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import '../css/global.css';

export default function QuickViewModal({ product, onClose }) {
  const { addToCart, wishlistItems, toggleWishlist } = useApp();
  
  // Customization States
  const [size, setSize] = useState('Regular');
  const [sugar, setSugar] = useState('100%');
  const [ice, setIce] = useState('50%');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      // Set defaults based on product availability
      if (product.sizes && product.sizes.length > 0) setSize(product.sizes[0].name);
      if (product.sugarLevels && product.sugarLevels.length > 0) setSugar(product.sugarLevels[product.sugarLevels.length - 1]);
      if (product.iceLevels && product.iceLevels.length > 0) setIce(product.iceLevels[Math.floor(product.iceLevels.length / 2)]);
      setSelectedToppings([]);
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const isFavorited = wishlistItems.some(item => item.id === product.id);

  // Price calculations
  const sizeAdjustment = product.sizes.find(s => s.name === size)?.priceAdjustment || 0;
  const toppingsPrice = selectedToppings.reduce((acc, t) => acc + t.price, 0);
  const currentUnitPrice = product.price + sizeAdjustment + toppingsPrice;
  const totalPrice = currentUnitPrice * quantity;

  // Handlers
  const handleToppingToggle = (topping) => {
    setSelectedToppings(prev => 
      prev.some(t => t.name === topping.name)
        ? prev.filter(t => t.name !== topping.name)
        : [...prev, topping]
    );
  };

  const handleQuantityChange = (val) => {
    setQuantity(prev => Math.max(1, prev + val));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, size, sugar, ice, selectedToppings);
    onClose();
  };

  return (
    <div className="quickview-overlay" onClick={onClose}>
      <div className="quickview-container glass-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="quickview-close-btn icon-btn" onClick={onClose} aria-label="Close details">
          <X size={22} />
        </button>

        <div className="quickview-grid">
          {/* Left Column: Image */}
          <div className="quickview-image-side">
            <img src={product.image} alt={product.name} className="quickview-img" />
          </div>

          {/* Right Column: Customizer */}
          <div className="quickview-content-side">
            <span className="quickview-category">{product.category}</span>
            <h2 className="quickview-title">{product.name}</h2>

            <div className="quickview-rating-row">
              <div className="quickview-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < Math.floor(product.rating) ? '#F4A261' : 'none'} 
                    stroke="#F4A261" 
                  />
                ))}
                <span className="quickview-rating-val">{product.rating}</span>
              </div>
              <span className="quickview-calories">{product.calories} cal</span>
            </div>

            <p className="quickview-desc">{product.description}</p>

            <div className="quickview-scrollable-customizer">
              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="customizer-group">
                  <h4>Size</h4>
                  <div className="customizer-options">
                    {product.sizes.map((s) => (
                      <button 
                        key={s.name}
                        className={`option-chip ${size === s.name ? 'active' : ''}`}
                        onClick={() => setSize(s.name)}
                      >
                        {s.name} {s.priceAdjustment > 0 && `(+₦${s.priceAdjustment.toFixed(2)})`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sugar Selection */}
              {product.sugarLevels && product.sugarLevels.length > 0 && (
                <div className="customizer-group">
                  <h4>Sugar Level</h4>
                  <div className="customizer-options">
                    {product.sugarLevels.map((lvl) => (
                      <button 
                        key={lvl}
                        className={`option-chip ${sugar === lvl ? 'active' : ''}`}
                        onClick={() => setSugar(lvl)}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Ice Selection */}
              {product.iceLevels && product.iceLevels.length > 0 && (
                <div className="customizer-group">
                  <h4>Ice Level</h4>
                  <div className="customizer-options">
                    {product.iceLevels.map((lvl) => (
                      <button 
                        key={lvl}
                        className={`option-chip ${ice === lvl ? 'active' : ''}`}
                        onClick={() => setIce(lvl)}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Toppings Selection */}
              {product.toppings && product.toppings.length > 0 && (
                <div className="customizer-group">
                  <h4>Add Toppings</h4>
                  <div className="toppings-checklist">
                    {product.toppings.map((topping) => {
                      const isChecked = selectedToppings.some(t => t.name === topping.name);
                      return (
                        <label key={topping.name} className="topping-label">
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToppingToggle(topping)}
                          />
                          <span className="topping-custom-checkbox"></span>
                          <span className="topping-name">{topping.name}</span>
                          <span className="topping-price">+₦{topping.price.toFixed(2)}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Row */}
            <div className="quickview-actions-footer">
              <div className="quantity-controller">
                <button onClick={() => handleQuantityChange(-1)} aria-label="Decrease quantity">
                  <Minus size={16} />
                </button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(1)} aria-label="Increase quantity">
                  <Plus size={16} />
                </button>
              </div>

              <div className="price-tag">
                <span>Total:</span>
                <h3>₦{totalPrice.toFixed(2)}</h3>
              </div>
            </div>

            <div className="quickview-buttons-row">
              <button className="btn btn-primary quickview-add-btn" onClick={handleAddToCart}>
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </button>

              <button 
                className={`btn btn-secondary quickview-fav-btn ${isFavorited ? 'favorited' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Toggle Wishlist"
              >
                <Heart size={18} fill={isFavorited ? 'var(--color-primary)' : 'none'} />
              </button>

              <Link to={`/product/${product.id}`} className="view-details-text-link" onClick={onClose}>
                Full details &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .quickview-overlay {
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

        .quickview-container {
          width: 95%;
          max-width: 1180px;
          max-height: 90vh;
          overflow-y: auto;
          background-color: var(--color-card);
          border-radius: var(--border-radius-lg);
          position: relative;
          padding: 40px;
          display: flex;
          animation: scale-up-modal 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .quickview-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 100;
        }

        .quickview-grid {
          display: grid;
          grid-template-columns: 1.1fr 1.3fr;
          gap: 50px;
          width: 100%;
        }

        .quickview-image-side {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #FFF0F5;
          border-radius: var(--border-radius-md);
          overflow: hidden;
          height: 100%;
          min-height: 500px;
        }

        .quickview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: var(--border-radius-md);
        }

        .quickview-content-side {
          display: flex;
          flex-direction: column;
          max-height: 100%;
        }

        .quickview-category {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-primary);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }

        .quickview-title {
          font-size: 2rem;
          color: var(--color-accent);
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .quickview-rating-row {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 16px;
        }

        .quickview-stars {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text-muted);
        }

        .quickview-rating-val {
          margin-left: 6px;
        }

        .quickview-calories {
          font-size: 0.85rem;
          background-color: rgba(255, 166, 201, 0.15);
          color: var(--color-accent);
          padding: 4px 10px;
          border-radius: 12px;
          font-weight: 600;
        }

        .quickview-desc {
          color: var(--color-text-muted);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .quickview-scrollable-customizer {
          overflow-y: auto;
          flex-grow: 1;
          margin-bottom: 24px;
          padding-right: 8px;
        }

        /* Customize groups */
        .customizer-group {
          margin-bottom: 20px;
        }

        .customizer-group h4 {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 10px;
          color: var(--color-accent);
        }

        [data-theme='dark'] .customizer-group h4 {
          color: var(--color-primary);
        }

        .customizer-options {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .option-chip {
          padding: 8px 16px;
          border-radius: var(--border-radius-xl);
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          color: var(--color-text);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .option-chip:hover {
          border-color: var(--color-primary);
        }

        .option-chip.active {
          background-color: var(--color-primary);
          color: var(--color-accent);
          border-color: var(--color-primary);
          font-weight: 600;
        }

        /* Checklist toppings */
        .toppings-checklist {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .topping-label {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-size: 0.85rem;
          color: var(--color-text);
          position: relative;
        }

        .topping-label input {
          display: none;
        }

        .topping-custom-checkbox {
          width: 18px;
          height: 18px;
          border: 1px solid var(--color-border);
          border-radius: 4px;
          background-color: var(--color-bg);
          display: inline-block;
          position: relative;
          transition: var(--transition-smooth);
        }

        .topping-label input:checked + .topping-custom-checkbox {
          background-color: var(--color-primary);
          border-color: var(--color-primary);
        }

        .topping-label input:checked + .topping-custom-checkbox::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: var(--color-accent);
          font-size: 10px;
          font-weight: 700;
        }

        .topping-name {
          flex-grow: 1;
        }

        .topping-price {
          color: var(--color-primary);
          font-weight: 600;
        }

        /* Footer Actions */
        .quickview-actions-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid var(--color-border);
          margin-bottom: 20px;
        }

        .quantity-controller {
          display: flex;
          align-items: center;
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius-xl);
          overflow: hidden;
          background-color: var(--color-bg);
        }

        .quantity-controller button {
          border: none;
          background: none;
          padding: 8px 12px;
          cursor: pointer;
          color: var(--color-text);
          transition: var(--transition-smooth);
        }

        .quantity-controller button:hover {
          background-color: var(--color-border);
          color: var(--color-primary);
        }

        .quantity-controller span {
          padding: 0 16px;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .price-tag {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .price-tag span {
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }

        .price-tag h3 {
          font-size: 1.6rem;
          color: var(--color-accent);
        }

        [data-theme='dark'] .price-tag h3 {
          color: var(--color-primary);
        }

        /* Buttons Row */
        .quickview-buttons-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .quickview-add-btn {
          flex-grow: 1;
          padding: 12px 24px;
        }

        .quickview-fav-btn.favorited {
          background-color: #FFF0F5;
          color: var(--color-primary);
        }

        .view-details-text-link {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text-muted);
          transition: var(--transition-smooth);
          margin-left: auto;
        }

        .view-details-text-link:hover {
          color: var(--color-primary);
        }

        /* Animations */
        @keyframes fade-in-overlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scale-up-modal {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .quickview-container {
            padding: 24px;
            max-height: 95vh;
          }
          .quickview-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .quickview-image-side {
            height: 250px;
          }
          .toppings-checklist {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
