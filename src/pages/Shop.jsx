import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid, Star } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import '../css/shop.css';

export default function Shop() {
  const location = useLocation();
  
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(15000); // Max ₦15,000
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState(null);

  const itemsPerPage = 8;

  // Auto-select category if passed through React Router state
  useEffect(() => {
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
      // Clean location state to prevent sticky filter on manual refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Reset pagination on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  // Unique Categories listing
  const categoriesList = useMemo(() => {
    return ['All', 'Coffee', 'Matcha', 'Boba', 'Smoothies', 'Milkshakes', 'Refreshers', 'Desserts'];
  }, []);

  // Filter and Sort Calculations
  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesPrice = product.price <= priceRange;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default: recommended (isSpecial first, then id)
        return (b.isSpecial ? 1 : 0) - (a.isSpecial ? 1 : 0);
      });
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  // Pagination bounds calculations
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const displayedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(start, start + itemsPerPage);
  }, [filteredAndSortedProducts, currentPage]);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  return (
    <div className="shop-page container">
      <div className="section-header">
        <h2>Shop Our Haven</h2>
        <p>Browse, customize, and order our luxury craft beverages delivered straight to your home.</p>
      </div>

      <div className="shop-layout">
        {/* ==========================================
           FILTERS SIDEBAR (sticky on desktop)
           ========================================== */}
        <aside className="filters-sidebar glass-card">
          {/* Search bar */}
          <div className="filter-section">
            <h3>Search Drink</h3>
            <div className="search-wrapper">
              <input 
                type="text" 
                placeholder="Search lattes, matcha..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="search-icon" size={16} />
            </div>
          </div>

          {/* Categories select list */}
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="category-filter-list">
              {categoriesList.map((cat) => {
                const count = cat === 'All' 
                  ? products.length 
                  : products.filter(p => p.category === cat).length;

                return (
                  <button 
                    key={cat}
                    className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span>{cat}</span>
                    <span className="category-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="filter-section">
            <h3>Max Price</h3>
            <div className="price-range-container">
              <input 
                type="range" 
                min="2000" 
                max="15000" 
                step="500"
                value={priceRange} 
                className="price-range-slider"
                onChange={(e) => setPriceRange(parseInt(e.target.value, 10))}
              />
              <div className="price-range-labels">
                <span>₦2,000</span>
                <span>Current: <strong>₦{priceRange.toLocaleString()}</strong></span>
                <span>₦15,000</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ==========================================
           MAIN PRODUCTS GRID
           ========================================== */}
        <main className="shop-main-content">
          {/* Toolbar row */}
          <div className="shop-toolbar glass-card" style={{ padding: '16px 24px', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
            <span className="results-count">
              Showing <strong>{displayedProducts.length}</strong> of <strong>{filteredAndSortedProducts.length}</strong> beverages
            </span>

            <div className="sort-select-wrapper">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
              >
                <option value="recommended">Sort by: Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Grid list or empty State */}
          {displayedProducts.length > 0 ? (
            <div className="grid-3">
              {displayedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onQuickView={setSelectedQuickViewProduct} 
                />
              ))}
            </div>
          ) : (
            <div className="shop-empty-state text-center" style={{ padding: '80px 40px', backgroundColor: 'var(--color-card)', borderRadius: '24px', border: '1px dashed var(--color-primary)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🌸</div>
              <h3>No Beverages Match Your Filters</h3>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '8px', marginBottom: '20px' }}>Try relaxing your search terms or expanding your price slider threshold.</p>
              <button className="btn btn-primary" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setPriceRange(15000); }}>
                Reset Filters
              </button>
            </div>
          )}

          {/* Pagination Row */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="page-num-btn" 
                disabled={currentPage === 1} 
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label="Previous Page"
              >
                &larr;
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button 
                    key={pageNum}
                    className={`page-num-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button 
                className="page-num-btn" 
                disabled={currentPage === totalPages} 
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label="Next Page"
              >
                &rarr;
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Quick View Modal overlays */}
      <QuickViewModal 
        product={selectedQuickViewProduct} 
        onClose={() => setSelectedQuickViewProduct(null)} 
      />
    </div>
  );
}
