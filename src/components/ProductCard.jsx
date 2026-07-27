import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import '../css/shop.css';

export default function ProductCard({ product, onQuickView }) {
  const { wishlistItems, toggleWishlist, addToCart } = useApp();
  const [isHeartBurst, setIsHeartBurst] = useState(false);

  const isFavorited = wishlistItems.some(item => item.id === product.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    setIsHeartBurst(true);
    toggleWishlist(product);
    setTimeout(() => setIsHeartBurst(false), 500); // Reset heart burst animation class
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    // Add with default options: Regular size, 100% sugar, 50% ice, no extra toppings
    addToCart(product, 1, 'Regular', '100%', '50%', []);
  };

  return (
    <div className="product-card glass-card">
      {/* Favorite Button */}
      <button 
        className={`fav-btn ${isFavorited ? 'favorited' : ''} ${isHeartBurst ? 'heart-burst' : ''}`}
        onClick={handleFavoriteClick}
        aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart fill={isFavorited ? 'var(--color-primary)' : 'none'} size={18} />
      </button>

      {/* Image Gallery Hover Container */}
      <Link to={`/product/${product.id}`} className="card-image-link">
        <div className="card-image-wrapper">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-card-img" 
            loading="lazy" 
          />
          <div className="card-image-overlay">
            <button className="view-details-btn" onClick={(e) => { e.preventDefault(); onQuickView(product); }}>
              <Eye size={18} />
              <span>Quick View</span>
            </button>
          </div>
        </div>
      </Link>

      {/* Product Content Details */}
      <div className="product-card-info">
        <div className="category-rating-row">
          <span className="product-card-category">{product.category}</span>
          <span className="product-card-rating">
            <Star size={12} fill="#F4A261" stroke="#F4A261" />
            <span>{product.rating}</span>
          </span>
        </div>

        <Link to={`/product/${product.id}`} className="product-card-title-link">
          <h3 className="product-card-title">{product.name}</h3>
        </Link>
        
        <p className="product-card-desc">{product.description}</p>
        
        <div className="product-card-footer">
          <span className="product-card-price">₦{product.price.toFixed(2)}</span>
          <button 
            className="btn btn-primary product-card-cart-btn" 
            onClick={handleAddToCartClick}
            aria-label="Add default to cart"
          >
            <ShoppingCart size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
