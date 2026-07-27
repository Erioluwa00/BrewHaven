import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, X, BookOpen } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import '../css/blog.css';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);

  // List of unique categories for filters
  const blogCategories = useMemo(() => {
    return ['All', 'Coffee tips', 'Benefits of Matcha', 'Smoothie recipes', 'Behind the scenes', 'Brewing guide', 'Healthy drinks'];
  }, []);

  // Filter blog posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="blog-page container">
      <div className="section-header">
        <h2>BrewHaven Diaries</h2>
        <p>Your guide to specialty coffee notes, benefits of organic matcha, recipes, and home brewing tips.</p>
      </div>

      {/* Search Bar Input Row */}
      <div style={{ maxWidth: '500px', margin: '40px auto 0 auto' }}>
        <div className="search-wrapper">
          <input 
            type="text" 
            placeholder="Search articles, recipes, guides..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="search-icon" size={16} />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="blog-category-filter">
        {blogCategories.map((cat) => (
          <button 
            key={cat}
            className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
            style={{ fontSize: '0.85rem', padding: '8px 18px' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid listing */}
      {filteredPosts.length > 0 ? (
        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <article key={post.id} className="blog-card" onClick={() => setActiveArticle(post)}>
              <div className="blog-image-wrapper">
                <img src={post.image} alt={post.title} className="blog-img" />
                <span className="blog-card-category">{post.category}</span>
              </div>

              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} /> {post.date}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>

                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>

                <div className="blog-card-author-row">
                  <div className="author-avatar">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="author-details">
                    <h4>{post.author}</h4>
                    <span>{post.role}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center" style={{ padding: '80px 40px', backgroundColor: 'var(--color-card)', borderRadius: '24px', border: '1px dashed var(--color-primary)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📝</div>
          <h3>No Articles Match Your Search</h3>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '8px', marginBottom: '20px' }}>Try resetting your category tab or refining your query word.</p>
          <button className="btn btn-primary" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
            Reset Filters
          </button>
        </div>
      )}

      {/* ==========================================
         FULL ARTICLE MODAL VIEW OVERLAY
         ========================================== */}
      {activeArticle && (
        <div className="article-modal-overlay" onClick={() => setActiveArticle(null)}>
          <div className="article-modal-container glass-card" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="article-close-btn icon-btn" onClick={() => setActiveArticle(null)} aria-label="Close article">
              <X size={22} />
            </button>

            <div className="article-modal-header">
              <span className="article-modal-category">{activeArticle.category}</span>
              <h1 className="article-modal-title">{activeArticle.title}</h1>
            </div>

            <div className="article-modal-author-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="author-avatar" style={{ width: '44px', height: '44px', fontSize: '1rem' }}>
                  {activeArticle.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="author-details">
                  <h4 style={{ fontSize: '0.95rem' }}>{activeArticle.author}</h4>
                  <span>{activeArticle.role}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {activeArticle.date}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {activeArticle.readTime}</span>
              </div>
            </div>

            <img src={activeArticle.image} alt={activeArticle.title} className="article-modal-img" />

            <div className="article-modal-content">
              <p>{activeArticle.content}</p>
              <p>
                Interested in learning more or trying our signature recipes? Come by any of our boutique locations and speak to our head baristas for coffee grind tuning recommendations or matcha preparation tips.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
