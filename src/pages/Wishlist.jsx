import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import '../css/shop.css'; // Reuse card styling from shop
import QuickViewModal from '../components/QuickViewModal';

export default function Wishlist() {
  const { wishlistItems, toggleWishlist, addToCart } = useApp();
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState(null);

  const handleMoveToCart = (product) => {
    // Add default: Regular size, 100% sugar, 50% ice, no extra toppings
    addToCart(product, 1, 'Regular', '100%', '50%', []);
    // Remove from wishlist
    toggleWishlist(product);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container text-center" style={{ 
        padding: '100px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px', animation: 'float-slow 6s ease-in-out infinite' }}>🌸</div>
        <h2 style={{ color: 'var(--color-accent)' }}>Your Wishlist is Empty</h2>
        <p style={{ color: 'var(--color-text-muted)', margin: '16px 0 32px 0', maxWidth: '400px', marginInline: 'auto' }}>
          Save your favorite luxury coffee blends, matcha drinks, and bubble teas here to order them later.
        </p>
        <Link to="/shop" className="btn btn-primary">
          <span>Explore Drinks Menu</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '60px 24px 100px 24px' }}>
      <div className="section-header">
        <h2>Your Saved Drinks</h2>
        <p>A quick collection of your favorite BrewHaven lattes, milkshakes, and desserts.</p>
      </div>

      <div className="grid-4" style={{ marginTop: '40px' }}>
        {wishlistItems.map((product) => (
          <div key={product.id} className="product-card glass-card" style={{ padding: '0 0 16px 0' }}>
            {/* Image */}
            <div className="card-image-wrapper">
              <img src={product.image} alt={product.name} className="product-card-img" />
              <div className="card-image-overlay">
                <button className="view-details-btn" onClick={() => setSelectedQuickViewProduct(product)}>
                  <span>Quick View</span>
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="product-card-info" style={{ padding: '20px' }}>
              <span className="product-card-category" style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700 }}>{product.category}</span>
              <h3 className="product-card-title" style={{ margin: '8px 0', fontSize: '1.1rem' }}>{product.name}</h3>
              <span className="product-card-price" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-accent)' }}>₦{product.price.toFixed(2)}</span>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', padding: '0 20px', marginTop: 'auto' }}>
              <button 
                className="btn btn-primary" 
                style={{ flexGrow: 1, padding: '10px', fontSize: '0.8rem', borderRadius: '12px' }}
                onClick={() => handleMoveToCart(product)}
              >
                <ShoppingCart size={14} />
                <span>Move to Bag</span>
              </button>

              <button 
                className="btn btn-secondary" 
                style={{ padding: '10px', borderRadius: '12px', border: '1px solid var(--color-border)' }}
                onClick={() => toggleWishlist(product)}
                aria-label="Remove item"
              >
                <Trash2 size={16} className="text-muted" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <QuickViewModal 
        product={selectedQuickViewProduct} 
        onClose={() => setSelectedQuickViewProduct(null)} 
      />
    </div>
  );
}
