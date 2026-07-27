import React, { useState } from 'react';
import { Leaf, Award, Eye, Plus, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';
import QuickViewModal from '../components/QuickViewModal';
import '../css/global.css';

export default function Menu() {
  const { addToCart, theme } = useApp();
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState(null);

  // Group products by category
  const menuCategories = ['Coffee', 'Matcha', 'Boba', 'Smoothies', 'Milkshakes', 'Refreshers', 'Desserts'];

  const getProductsByCategory = (cat) => {
    return products.filter(p => p.category === cat);
  };

  const handleQuickAdd = (product) => {
    // Add default: Regular size, 100% sugar, 50% ice, no extra toppings
    addToCart(product, 1, 'Regular', '100%', '50%', []);
  };

  return (
    <div className="container" style={{ padding: '60px 24px 100px 24px' }}>
      <div className="section-header">
        <h2>BrewHaven House Menu</h2>
        <p>A menu curated with organic syrups, ceremonial-grade tea leaves, and premium single-origin coffee beans.</p>
      </div>

      {/* Menu Board Container */}
      <div className="menu-board glass-card" style={{ padding: '50px', marginTop: '40px', border: '1px solid var(--color-border)' }}>
        
        {menuCategories.map((category) => {
          const items = getProductsByCategory(category);
          if (items.length === 0) return null;

          return (
            <div key={category} className="menu-category-section" style={{ marginBottom: '50px' }}>
              {/* Category Title */}
              <div className="menu-category-header" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '2px solid var(--color-primary)',
                paddingBottom: '10px',
                marginBottom: '24px'
              }}>
                <Leaf size={24} style={{ color: 'var(--color-primary)' }} />
                <h2 style={{ fontSize: '2rem', marginBottom: 0, textTransform: 'capitalize' }}>{category}</h2>
              </div>

              {/* Menu items list in category */}
              <div className="menu-items-list" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '30px'
              }}>
                {items.map((item) => (
                  <div key={item.id} className="menu-item-row" style={{
                    display: 'flex',
                    gap: '16px',
                    position: 'relative',
                    paddingBottom: '20px',
                    borderBottom: '1px dashed var(--color-border)'
                  }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '12px',
                        objectFit: 'cover',
                        backgroundColor: '#FFF0F5'
                      }} 
                    />
                    
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                        <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: 600, color: theme === 'dark' ? 'var(--color-primary)' : 'var(--color-accent)' }}>{item.name}</h3>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: theme === 'dark' ? 'var(--color-primary)' : 'var(--color-accent)' }}>₦{item.price.toFixed(2)}</span>
                      </div>
                      
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.4, marginBottom: '8px' }}>
                        {item.description}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.75rem', backgroundColor: theme === 'dark' ? 'rgba(255, 166, 201, 0.1)' : 'rgba(255, 166, 201, 0.15)', color: theme === 'dark' ? 'var(--color-primary)' : 'var(--color-accent)', padding: '2px 8px', borderRadius: '10px', fontWeight: 500 }}>
                          {item.calories} Cal
                        </span>
                        {item.isBestSeller && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '3px', fontWeight: 600 }}>
                            <Award size={12} /> Best Seller
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons on hover */}
                    <div className="menu-item-actions" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      justifyContent: 'center',
                      marginLeft: '8px'
                    }}>
                      <button 
                        className="icon-btn" 
                        style={{ width: '32px', height: '32px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}
                        onClick={() => setSelectedQuickViewProduct(item)}
                        title="Quick View"
                      >
                        <Eye size={14} />
                      </button>
                      <button 
                        className="icon-btn" 
                        style={{ width: '32px', height: '32px', backgroundColor: 'var(--color-primary)', color: 'var(--color-accent)' }}
                        onClick={() => handleQuickAdd(item)}
                        title="Add to Cart"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

      </div>

      <QuickViewModal 
        product={selectedQuickViewProduct} 
        onClose={() => setSelectedQuickViewProduct(null)} 
      />
    </div>
  );
}
