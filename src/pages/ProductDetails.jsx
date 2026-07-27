import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Plus, Minus, ShieldCheck, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import '../css/product-details.css';

export default function ProductDetails() {
  const { productId } = useParams();
  const { addToCart, wishlistItems, toggleWishlist } = useApp();

  // Find active product
  const product = useMemo(() => {
    return products.find(p => p.id === productId);
  }, [productId]);

  // Gallery Thumbnail State
  const [activeImage, setActiveImage] = useState('');

  // Customization States
  const [size, setSize] = useState('Regular');
  const [sugar, setSugar] = useState('100%');
  const [ice, setIce] = useState('50%');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Quick View State (needed for related products cards!)
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState(null);

  // Sync state on product change
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      if (product.sizes && product.sizes.length > 0) setSize(product.sizes[0].name);
      if (product.sugarLevels && product.sugarLevels.length > 0) setSugar(product.sugarLevels[product.sugarLevels.length - 1]);
      if (product.iceLevels && product.iceLevels.length > 0) setIce(product.iceLevels[Math.floor(product.iceLevels.length / 2)]);
      setSelectedToppings([]);
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product, productId]);

  if (!product) {
    return (
      <div className="container text-center" style={{ padding: '100px 24px' }}>
        <h2>Beverage Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', margin: '16px 0' }}>We couldn't find the drink you are looking for.</p>
        <Link to="/shop" className="btn btn-primary">Go to Shop</Link>
      </div>
    );
  }

  const isFavorited = wishlistItems.some(item => item.id === product.id);

  // Price math
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
  };

  // Filter Related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Mock thumbnails gallery
  const galleryImages = [
    product.image,
    product.image, // duplicate for demo
    product.image  // duplicate for demo
  ];

  return (
    <div className="product-details-page container">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
        <Link to="/" style={{ hoverColor: 'var(--color-primary)' }}>Home</Link>
        <ChevronRight size={14} />
        <Link to="/shop">Shop</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>{product.name}</span>
      </nav>

      <div className="details-grid">
        {/* ==========================================
           LEFT: GALLERY
           ========================================== */}
        <div className="image-gallery-container">
          <div className="main-image-wrapper">
            <img src={activeImage} alt={product.name} />
          </div>
          
          <div className="thumbnail-row">
            {galleryImages.map((img, idx) => (
              <button 
                key={idx}
                className={`thumb-btn ${activeImage === img ? 'active' : ''}`}
                onClick={() => setActiveImage(img)}
              >
                <img src={img} alt={`${product.name} thumb ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* ==========================================
           RIGHT: DETAILS & CUSTOMIZATION
           ========================================== */}
        <div className="info-section">
          <span className="details-category">{product.category}</span>
          <h1 className="details-title">{product.name}</h1>

          <div className="details-meta-row">
            <div className="details-stars">
              <Star size={16} fill="#F4A261" stroke="#F4A261" />
              <span>{product.rating}</span>
              <span className="details-reviews-count">({product.reviewsCount} reviews)</span>
            </div>
            <span className="details-calories">{product.calories} Calories</span>
          </div>

          <p className="details-desc">{product.description}</p>

          {/* Ingredients list */}
          <div className="ingredients-section">
            <h4>Ingredients</h4>
            <div className="ingredients-chips">
              {product.ingredients.map((ing) => (
                <span key={ing} className="ingredient-chip">{ing}</span>
              ))}
            </div>
          </div>

          {/* Customizer Box */}
          <div className="details-customizer">
            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="customizer-group">
                <h4>Cup Size</h4>
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

            {/* Sugar Levels */}
            {product.sugarLevels && product.sugarLevels.length > 0 && (
              <div className="customizer-group">
                <h4>Sugar Preference</h4>
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

            {/* Ice Levels */}
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

            {/* Toppings Checklist */}
            {product.toppings && product.toppings.length > 0 && (
              <div className="customizer-group" style={{ marginBottom: 0 }}>
                <h4>Extra Custom Toppings</h4>
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

          {/* Action Area */}
          <div className="quickview-actions-footer" style={{ borderTop: 'none', paddingTop: 0 }}>
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
              <span>Total Price:</span>
              <h3 style={{ fontSize: '2rem' }}>₦{totalPrice.toFixed(2)}</h3>
            </div>
          </div>

          <div className="quickview-buttons-row" style={{ marginTop: '20px' }}>
            <button className="btn btn-primary quickview-add-btn" style={{ padding: '16px' }} onClick={handleAddToCart}>
              <ShoppingCart size={18} />
              <span>Add to Cart Bag</span>
            </button>

            <button 
              className={`btn btn-secondary quickview-fav-btn ${isFavorited ? 'favorited' : ''}`}
              style={{ width: '54px', height: '54px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle Wishlist"
            >
              <Heart size={20} fill={isFavorited ? 'var(--color-primary)' : 'none'} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px', fontSize: '0.85rem', color: 'var(--color-success)', fontWeight: 500 }}>
            <ShieldCheck size={16} />
            <span>Guaranteed premium, organic, locally-sourced ingredients.</span>
          </div>
        </div>
      </div>

      {/* ==========================================
         REVIEWS FEEDBACK SECTION
         ========================================== */}
      <section className="details-reviews-block">
        <h2>Customer Diaries ({product.reviewsCount})</h2>
        <div className="reviews-list-container">
          <div className="review-item">
            <div className="review-header">
              <span className="review-author">Alice Henderson</span>
              <span className="review-date">July 18, 2026</span>
            </div>
            <div className="stars-row" style={{ marginBottom: '8px' }}>
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} fill="#F4A261" stroke="#F4A261" />)}
            </div>
            <p className="review-content">
              "This was an absolutely breathtaking drink! The temperature was perfect, the sweet balance was just right. I ordered it with extra whipped cream and it made my day."
            </p>
          </div>

          <div className="review-item">
            <div className="review-header">
              <span className="review-author">Brandon Carter</span>
              <span className="review-date">July 12, 2026</span>
            </div>
            <div className="stars-row" style={{ marginBottom: '8px' }}>
              {Array.from({ length: 4 }).map((_, i) => <Star key={i} size={12} fill="#F4A261" stroke="#F4A261" />)}
              <Star size={12} fill="none" stroke="#F4A261" />
            </div>
            <p className="review-content">
              "Really solid taste. The Uji matcha is definitely ceremonial grade, you can taste the quality. I will probably order with 50% sugar next time as 100% was slightly too sweet for my taste."
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
         RELATED PRODUCTS
         ========================================== */}
      {relatedProducts.length > 0 && (
        <section className="related-drinks-section">
          <h2>You May Also Love</h2>
          <div className="grid-3">
            {relatedProducts.map((p) => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onQuickView={setSelectedQuickViewProduct} 
              />
            ))}
          </div>
        </section>
      )}

      {/* Modal Renderers */}
      <QuickViewModal 
        product={selectedQuickViewProduct} 
        onClose={() => setSelectedQuickViewProduct(null)} 
      />
    </div>
  );
}
