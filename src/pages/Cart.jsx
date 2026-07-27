import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, Ticket } from 'lucide-react';
import { useApp } from '../context/AppContext';
import '../css/cart.css';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart, addPurchasePoints, addToast } = useApp();
  
  // Promo code states
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // decimal e.g., 0.20 for 20%
  const [promoMessage, setPromoMessage] = useState('');

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * appliedDiscount;
  const subtotalAfterDiscount = subtotal - discountAmount;
  
  // Free delivery over ₦15,000 after discount, otherwise ₦1,500
  const deliveryFee = subtotalAfterDiscount >= 15000 || subtotalAfterDiscount === 0 ? 0 : 1500;
  const taxAmount = subtotalAfterDiscount * 0.08; // 8% sales tax
  const grandTotal = subtotalAfterDiscount + deliveryFee + taxAmount;

  // Handlers
  const handleApplyPromo = (e) => {
    e.preventDefault();
    const formattedCode = promoCode.trim().toUpperCase();
    if (formattedCode === 'BREWHAVEN20') {
      setAppliedDiscount(0.20);
      setPromoMessage('20% discount applied successfully! 🌸');
      addToast('Promo code applied: 20% off!', 'success');
    } else {
      setAppliedDiscount(0);
      setPromoMessage('Invalid coupon code. Try BREWHAVEN20!');
      addToast('Invalid coupon code', 'warning');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // Award loyalty points (10 points per dollar of subtotal)
    addPurchasePoints(subtotalAfterDiscount);
    
    // Calculate points earned
    const pointsEarned = Math.round(subtotalAfterDiscount * 10);

    addToast(`Order Placed! Thank you for choosing BrewHaven. You earned ${pointsEarned} points! 🌸`, 'success');
    
    // Clear cart
    clearCart();
    
    // Redirect to rewards page to see new points balance
    navigate('/rewards', { state: { confettiTrigger: true } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="container cart-empty-state">
        <span className="cart-empty-icon">🧋</span>
        <h3>Your Cart is Empty</h3>
        <p>Looks like you haven't added any luxury beverages to your order yet.</p>
        <Link to="/shop" className="btn btn-primary">
          <ArrowLeft size={18} />
          <span>Explore Drinks Menu</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <div className="section-header">
        <h2>Your Shopping Cart</h2>
        <p>Review your custom lattes, tea blends, and sweet treats before checking out.</p>
      </div>

      <div className="cart-layout">
        {/* ==========================================
           LEFT: ITEMS LIST & PROMO CODE
           ========================================== */}
        <div className="cart-items-container">
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-row">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <div className="cart-item-customizations">
                    <span className="custom-spec-badge">Size: {item.size}</span>
                    <span className="custom-spec-badge">Sugar: {item.sugar}</span>
                    <span className="custom-spec-badge">Ice: {item.ice}</span>
                  </div>
                  {item.toppings && item.toppings.length > 0 && (
                    <div className="cart-item-toppings">
                      + Toppings: {item.toppings.map(t => `${t.name} (+₦${t.price.toFixed(2)})`).join(', ')}
                    </div>
                  )}
                </div>

                <div className="cart-item-price-quantity">
                  <div className="quantity-controller">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                      <Plus size={14} />
                    </button>
                  </div>

                  <span className="cart-item-unit-price">₦{(item.price * item.quantity).toFixed(2)}</span>
                  
                  <button 
                    className="cart-item-remove-btn" 
                    onClick={() => removeFromCart(item.id, item.name)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Promo code entry */}
          <form className="promo-code-box glass-card" style={{ padding: '20px', border: '1px solid var(--color-border)' }} onSubmit={handleApplyPromo}>
            <input 
              type="text" 
              placeholder="Enter Promo Code (e.g. BREWHAVEN20)" 
              className="promo-input"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button type="submit" className="btn btn-secondary btn-promo-apply">
              <Ticket size={16} />
              <span>Apply</span>
            </button>
          </form>
          {promoMessage && (
            <p style={{ 
              fontSize: '0.85rem', 
              color: appliedDiscount > 0 ? 'var(--color-success)' : 'var(--color-warning)',
              fontWeight: 500,
              marginLeft: '12px',
              marginTop: '8px'
            }}>
              {promoMessage}
            </p>
          )}
        </div>

        {/* ==========================================
           RIGHT: SUMMARY PANEL
           ========================================== */}
        <aside className="order-summary-sidebar">
          <div className="order-summary-card glass-card">
            <h3 className="summary-title">Order Summary</h3>
            
            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₦{subtotal.toFixed(2)}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="summary-row discount-row">
                  <span>Discount (20%)</span>
                  <span>-₦{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Estimated Tax (8%)</span>
                <span>₦{taxAmount.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₦${deliveryFee.toFixed(2)}`}</span>
              </div>

              <div className="summary-row grand-total-row">
                <span>Total</span>
                <span>₦{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="btn btn-accent btn-checkout" onClick={handleCheckout}>
              <span>Place Secure Order</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/shop" className="btn-continue-shopping">
              <ArrowLeft size={16} style={{ marginRight: '8px' }} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
