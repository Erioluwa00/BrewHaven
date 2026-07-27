import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, MessageSquare, Award, Clock } from 'lucide-react';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import DrinkQuiz from '../components/DrinkQuiz';
import QuickViewModal from '../components/QuickViewModal';
import '../css/home.css';

export default function Home() {
  const { addToast } = useApp();
  
  // State for Featured Tabs
  const [activeTab, setActiveTab] = useState('bestseller');
  
  // Modals state
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState(null);

  // Filter Featured Products based on Tab
  const getFeaturedProducts = () => {
    switch (activeTab) {
      case 'special':
        return products.filter(p => p.isSpecial).slice(0, 4);
      case 'limited':
        return products.filter(p => p.isLimited).slice(0, 4);
      case 'bestseller':
      default:
        return products.filter(p => p.isBestSeller).slice(0, 4);
    }
  };

  const popularCategories = [
    { name: 'Coffee', count: 2 },
    { name: 'Matcha', count: 2 },
    { name: 'Boba', count: 2 },
    { name: 'Smoothies', count: 2 },
    { name: 'Milkshakes', count: 2 },
    { name: 'Refreshers', count: 2 }
  ];

  return (
    <div className="home-page">
      {/* ==========================================
         HERO SECTION WITH FLOATING OBJECTS
         ========================================== */}
      <section className="hero">
        {/* Floating Background Icons - distributed across the entire hero */}
        
        {/* Coffee Bean 1 */}
        <svg className="floating-element fe-item-1 float-item-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="12" rx="7" ry="10" transform="rotate(30 12 12)" />
          <path d="M12 2 C12 10 10 14 12 22" transform="rotate(30 12 12)" />
        </svg>

        {/* Steaming Coffee Mug 1 */}
        <svg className="floating-element fe-item-2 float-item-medium" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" x2="6" y1="2" y2="4" />
          <line x1="10" x2="10" y1="2" y2="4" />
          <line x1="14" x2="14" y1="2" y2="4" />
        </svg>

        {/* Boba Cup 1 */}
        <svg className="floating-element fe-item-3 float-item-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 3h12l-2 16a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2Z" />
          <line x1="14" x2="17" y1="1" y2="10" />
          <circle cx="9" cy="17" r="1.2" fill="currentColor" />
          <circle cx="12" cy="16" r="1.2" fill="currentColor" />
          <circle cx="15" cy="17" r="1.2" fill="currentColor" />
          <circle cx="10.5" cy="14" r="1.2" fill="currentColor" />
          <circle cx="13.5" cy="14" r="1.2" fill="currentColor" />
        </svg>

        {/* Smoothie Glass 1 */}
        <svg className="floating-element fe-item-4 float-item-fast" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 2h14v2H5Z" />
          <path d="M17 4 15 21a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2L5 4" />
          <line x1="12" x2="15" y1="1" y2="9" />
          <path d="M8 8h8" />
          <path d="M9 13h6" />
        </svg>

        {/* Artisan Croissant/Pastry */}
        <svg className="floating-element fe-item-5 float-item-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 14c2-4 6-6 10-6s8 2 10 6" />
          <path d="M6 14c1.5-2.5 4-4 7-4s5.5 1.5 7 4" />
          <path d="M9 14c1-1.5 2-2 4-2s3 .5 4 2" />
          <path d="M12 8V6a2 2 0 0 1 4 0v2" />
          <path d="M2 14c1.5 3 5 4 10 4s8.5-1 10-4H2z" />
        </svg>

        {/* Tea Bag */}
        <svg className="floating-element fe-item-6 float-item-medium" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 20h8a2 2 0 0 0 2-2V9l-5-5H11L6 9v9a2 2 0 0 0 2 2Z" />
          <path d="M12 4v4" />
          <rect x="10" y="12" width="4" height="4" rx="1" />
        </svg>

        {/* Strawberry 1 */}
        <svg className="floating-element fe-item-7 float-item-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5 20 18.5 13 17 8C14 6.5 10 6.5 7 8C5.5 13 6.5 20 12 22Z" />
          <path d="M12 2c0 2-1 3-3 4M12 2c0 2 1 3 3 4" />
          <circle cx="10" cy="11" r="0.5" fill="currentColor" />
          <circle cx="14" cy="11" r="0.5" fill="currentColor" />
          <circle cx="12" cy="14" r="0.5" fill="currentColor" />
          <circle cx="9" cy="15" r="0.5" fill="currentColor" />
          <circle cx="15" cy="15" r="0.5" fill="currentColor" />
          <circle cx="12" cy="18" r="0.5" fill="currentColor" />
        </svg>

        {/* Green Leaf 1 */}
        <svg className="floating-element fe-item-8 float-item-fast" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 22c4-4 6-10 16-14c-4 4-6 6-16 14Z" />
          <path d="M9 13l4-4" />
          <path d="M12 22C16 18 22 14 22 6C14 6 10 10 2 22Z" />
        </svg>

        {/* Sparkle 1 */}
        <svg className="floating-element fe-item-9 float-item-medium" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/>
        </svg>

        {/* Coffee Cup and Saucer */}
        <svg className="floating-element fe-item-10 float-item-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 10h11a3 3 0 0 1 3 3v1a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-1a3 3 0 0 1 3-3Z" />
          <path d="M16 10c2.5 0 4.5 1.5 4.5 4s-2 4-4.5 4" />
          <path d="M2 20h20" />
          <path d="M9 6V4M13 6V4" />
        </svg>

        {/* Boba Cup 2 */}
        <svg className="floating-element fe-item-11 float-item-medium" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 3h12l-2 16a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2Z" />
          <line x1="14" x2="17" y1="1" y2="10" />
          <circle cx="9" cy="16" r="1.2" fill="currentColor" />
          <circle cx="12" cy="17" r="1.2" fill="currentColor" />
          <circle cx="15" cy="16" r="1.2" fill="currentColor" />
          <circle cx="10" cy="13" r="1.2" fill="currentColor" />
          <circle cx="13" cy="13" r="1.2" fill="currentColor" />
        </svg>

        {/* Green Leaf 2 */}
        <svg className="floating-element fe-item-12 float-item-fast" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 22c4-4 6-10 16-14c-4 4-6 6-16 14Z" />
          <path d="M9 13l4-4" />
          <path d="M12 22C16 18 22 14 22 6C14 6 10 10 2 22Z" />
        </svg>

        {/* Steaming Coffee Mug 2 */}
        <svg className="floating-element fe-item-13 float-item-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" x2="6" y1="2" y2="4" />
          <line x1="10" x2="10" y1="2" y2="4" />
          <line x1="14" x2="14" y1="2" y2="4" />
        </svg>

        {/* Sparkle 2 */}
        <svg className="floating-element fe-item-14 float-item-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/>
        </svg>

        {/* Coffee Bean 2 */}
        <svg className="floating-element fe-item-15 float-item-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="12" rx="7" ry="10" transform="rotate(-30 12 12)" />
          <path d="M12 2 C12 10 10 14 12 22" transform="rotate(-30 12 12)" />
        </svg>

        {/* Strawberry 2 */}
        <svg className="floating-element fe-item-16 float-item-medium" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5 20 18.5 13 17 8C14 6.5 10 6.5 7 8C5.5 13 6.5 20 12 22Z" />
          <path d="M12 2c0 2-1 3-3 4M12 2c0 2 1 3 3 4" />
          <circle cx="10" cy="12" r="0.5" fill="currentColor" />
          <circle cx="14" cy="12" r="0.5" fill="currentColor" />
          <circle cx="12" cy="15" r="0.5" fill="currentColor" />
        </svg>

        <div className="container hero-grid">
          {/* Left: Content */}
          <div className="hero-content">
            <span className="hero-tag">
              <Sparkles size={16} className="sparkle-icon" />
              <span>Indulge in Premium Blends</span>
            </span>
            
            <h1 className="hero-title">
              Every Sip <span>Tells a Story.</span>
            </h1>
            
            <p className="hero-desc">
              Step into BrewHaven, a modern luxury café offering handcrafted specialty coffee, premium stone-ground matcha, slow-cooked honey boba, and whimsical desserts.
            </p>
            
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-primary">Shop Drinks</Link>
              <Link to="/menu" className="btn btn-secondary">View Menu</Link>
            </div>
          </div>

          {/* Right: Premium Large Drink & Static Image Frame */}
          <div className="hero-image-container">
            {/* Hero Main Image Circle Wrapper */}
            <div className="hero-main-img-wrapper">
              <img 
                src="/src/assets/images/hero_drink.png" 
                alt="BrewHaven Signature Strawberry Matcha Latte" 
                className="hero-drink-img"
              />
            </div>
            
            {/* Steam Animation overlay (only visual) */}
            <div style={{ position: 'absolute', top: '0px', width: '200px', height: '100px', pointerEvents: 'none' }}>
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <path className="steam-path steam-path-1" d="M30 80 Q 25 60, 35 40 T 30 10" />
                <path className="steam-path steam-path-2" d="M50 80 Q 55 60, 45 40 T 50 10" />
                <path className="steam-path steam-path-3" d="M70 80 Q 65 60, 75 40 T 70 10" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         POPULAR CATEGORIES
         ========================================== */}
      <section className="home-section bg-warm">
        <div className="container">
          <div className="section-header">
            <h2>Popular Categories</h2>
            <p>Explore our handcrafted menu by category, customized exactly to your taste preferences.</p>
          </div>
          
          <div className="grid-6" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '24px'
          }}>
            {popularCategories.map((cat) => (
              <CategoryCard 
                key={cat.name} 
                category={cat.name} 
                count={cat.count} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
         FEATURED DRINKS (TABBED BEST SELLERS ETC)
         ========================================== */}
      <section className="home-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Beverages</h2>
            <p>Discover our seasonal highlights, daily special recipes, and customer favorites.</p>
          </div>

          {/* Tabs */}
          <div className="featured-tabs">
            <button 
              className={`tab-btn ${activeTab === 'bestseller' ? 'active' : ''}`}
              onClick={() => setActiveTab('bestseller')}
            >
              Best Sellers
            </button>
            <button 
              className={`tab-btn ${activeTab === 'special' ? 'active' : ''}`}
              onClick={() => setActiveTab('special')}
            >
              Today's Special
            </button>
            <button 
              className={`tab-btn ${activeTab === 'limited' ? 'active' : ''}`}
              onClick={() => setActiveTab('limited')}
            >
              Limited Edition
            </button>
          </div>

          {/* Product Cards Grid */}
          <div className="grid-4 featured-grid">
            {getFeaturedProducts().map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={setSelectedQuickViewProduct} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
         DRINK QUIZ CTA BANNER
         ========================================== */}
      <section className="home-section bg-warm">
        <div className="container">
          <div className="quiz-cta-banner">
            <div className="quiz-cta-content">
              <span className="quiz-tag">Can't Decide?</span>
              <h2>Find Your Perfect Drink Match</h2>
              <p>Unsure which latte, matcha, or bubble tea fits your mood? Take our fun, interactive drink quiz and let our virtual barista whip up the perfect recommendation!</p>
              <button className="btn btn-primary" onClick={() => setIsQuizOpen(true)}>
                <span>Take the Quiz</span>
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="quiz-cta-image-wrapper">
              <img 
                src="/src/assets/images/boba_taro.png" 
                alt="Taro Blossom Boba representation" 
                className="quiz-cta-img" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         CUSTOMER REVIEWS / TESTIMONIALS
         ========================================== */}
      <section className="home-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Guests Say</h2>
            <p>Read review diaries from our BrewHaven cafe family about their favorite sips.</p>
          </div>

          <div className="testimonials-slider">
            {/* Testimonial 1 */}
            <div className="testimonial-card glass-card">
              <div className="stars-row">
                {Array.from({ length: 5 }).map((_, i) => <MessageSquare key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="testimonial-text">
                "The Lavender Blossom Latte is pure heaven! The floral lavender notes are extremely well-balanced, and it looks beautiful. This is my absolute favorite study spot."
              </p>
              <div className="testimonial-user">
                <div className="user-avatar">CL</div>
                <div className="user-info">
                  <h4>Chloe Laurent</h4>
                  <span>Verified Coffee Lover</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="testimonial-card glass-card">
              <div className="stars-row">
                {Array.from({ length: 5 }).map((_, i) => <MessageSquare key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="testimonial-text">
                "As a matcha purist, I was blown away by the Pink Velvet Matcha. The strawberry purée adds the perfect sweetness without overpowering the rich, earthy green tea."
              </p>
              <div className="testimonial-user">
                <div className="user-avatar">KM</div>
                <div className="user-info">
                  <h4>Kenji Matsumoto</h4>
                  <span>Ceremonial Matcha Fan</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="testimonial-card glass-card">
              <div className="stars-row">
                {Array.from({ length: 5 }).map((_, i) => <MessageSquare key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="testimonial-text">
                "I ordered the Unicorn Dream Milkshake for my portfolio party and it wowed everyone! It is colorful, delicious, and not overly sugary. The details are beautiful."
              </p>
              <div className="testimonial-user">
                <div className="user-avatar">SR</div>
                <div className="user-info">
                  <h4>Sophia Rodriguez</h4>
                  <span>Food Photographer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         LOYALTY REWARDS BANNER
         ========================================== */}
      <section className="container" style={{ marginBottom: '100px' }}>
        <div className="rewards-promo-banner">
          <div className="rewards-promo-content">
            <h2>Join <span>BrewHaven Rewards</span></h2>
            <p>Earn points on every cup, get access to secret monthly drinks, a free dessert on your birthday, and skip the line orders.</p>
            <div className="rewards-promo-actions">
              <Link to="/rewards" className="btn btn-primary">Learn Rewards</Link>
              <Link to="/contact" className="btn btn-secondary" style={{ color: '#FFFFFF', borderColor: '#FFFFFF' }}>Find Locations</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         INSTAGRAM GALLERY
         ========================================== */}
      <section className="home-section bg-warm" style={{ paddingBottom: '100px' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '40px' }}>
            <h2>Instagram Gallery</h2>
            <p>Tag <strong>@BrewHavenCafe</strong> in your aesthetic drink diaries to get featured on our wall!</p>
          </div>

          <div className="instagram-grid">
            <div className="instagram-card">
              <img src="/src/assets/images/coffee_latte.png" alt="Aesthetic Latte" className="instagram-img" />
              <div className="instagram-overlay">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
            </div>
            <div className="instagram-card">
              <img src="/src/assets/images/hero_drink.png" alt="Layered drink" className="instagram-img" />
              <div className="instagram-overlay">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
            </div>
            <div className="instagram-card">
              <img src="/src/assets/images/boba_taro.png" alt="Jasmine taro tea" className="instagram-img" />
              <div className="instagram-overlay">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
            </div>
            <div className="instagram-card">
              <img src="/src/assets/images/rose_espresso.png" alt="Macchiato rose" className="instagram-img" />
              <div className="instagram-overlay">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
            </div>
            <div className="instagram-card">
              <img src="/src/assets/images/matcha_latte.png" alt="Matcha strawberry" className="instagram-img" />
              <div className="instagram-overlay">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
            </div>
            <div className="instagram-card">
              <img src="/src/assets/images/boba_strawberry.png" alt="Boba boba boba" className="instagram-img" />
              <div className="instagram-overlay">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         MODALS RENDERING
         ========================================== */}
      <DrinkQuiz 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
        onQuickView={setSelectedQuickViewProduct} 
      />

      <QuickViewModal 
        product={selectedQuickViewProduct} 
        onClose={() => setSelectedQuickViewProduct(null)} 
      />
    </div>
  );
}
