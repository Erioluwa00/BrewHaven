import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, Heart, ShoppingBag, Sun, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import '../css/navbar.css';

export default function DrawerMenu({ isOpen, onClose }) {
  const { theme, toggleTheme, cartItems, wishlistItems } = useApp();

  const totalCartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <div className={`drawer-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className={`drawer-content ${isOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-logo">
            <span className="logo-text">Brew<span>Haven</span></span>
          </div>
          <button className="icon-btn close-drawer-btn" onClick={onClose} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        {/* Links */}
        <div className="drawer-links">
          <NavLink to="/" className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`} onClick={onClose}>Home</NavLink>
          <NavLink to="/menu" className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`} onClick={onClose}>Menu</NavLink>
          <NavLink to="/shop" className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`} onClick={onClose}>Shop</NavLink>
          <NavLink to="/rewards" className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`} onClick={onClose}>Rewards</NavLink>
          <NavLink to="/blog" className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`} onClick={onClose}>Blog</NavLink>
          <NavLink to="/about" className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`} onClick={onClose}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`} onClick={onClose}>Contact</NavLink>
        </div>

        {/* Footer controls inside drawer */}
        <div className="drawer-footer">
          <button className="drawer-action-btn theme-toggle-btn" onClick={toggleTheme}>
            {theme === 'light' ? (
              <>
                <Moon size={20} />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Sun size={20} />
                <span>Light Mode</span>
              </>
            )}
          </button>

          <NavLink to="/wishlist" className="drawer-action-btn" onClick={onClose}>
            <Heart size={20} />
            <span>Wishlist ({wishlistCount})</span>
          </NavLink>

          <NavLink to="/cart" className="drawer-action-btn" onClick={onClose}>
            <ShoppingBag size={20} />
            <span>Cart ({totalCartQuantity})</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
