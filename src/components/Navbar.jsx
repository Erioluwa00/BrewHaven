import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Heart, Sun, Moon, Menu as MenuIcon, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import '../css/navbar.css';

export default function Navbar({ onMobileMenuToggle }) {
  const { theme, toggleTheme, cartItems, wishlistItems } = useApp();
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo">
          <svg className="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="36" height="36">
            <circle cx="50" cy="50" r="45" fill="#FFA6C9" opacity="0.2"/>
            <path d="M30 40h35v25c0 8.3-6.7 15-15 15h-5c-8.3 0-15-6.7-15-15V40z" fill="#6E3A52" />
            <path d="M65 45h5c4.4 0 8 3.6 8 8v2c0 4.4-3.6 8-8 8h-5" fill="none" stroke="#6E3A52" stroke-width="6" stroke-linecap="round" />
            <path d="M42 22c1-3 3-5 3-7M50 25c1.5-4 4.5-6 4.5-9M58 23c1-3 3-5 3-7" stroke="#FFA6C9" stroke-width="4" stroke-linecap="round" fill="none" />
            <path d="M47.5 52.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 2.2-2.5 4.5-2.5 4.5s-2.5-2.3-2.5-4.5z" fill="#FFA6C9" />
          </svg>
          <span className="logo-text">Brew<span>Haven</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
          <NavLink to="/menu" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Menu</NavLink>
          <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Shop</NavLink>
          <NavLink to="/rewards" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Rewards</NavLink>
          <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Blog</NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Contact</NavLink>
        </div>

        {/* Action Controls */}
        <div className="navbar-actions">
          {/* Theme Toggle */}
          <button className="icon-btn theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Wishlist Icon */}
          <Link to="/wishlist" className="icon-btn wishlist-icon-link" aria-label="Wishlist">
            <Heart size={20} />
            {wishlistCount > 0 && <span className="badge badge-wishlist">{wishlistCount}</span>}
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="icon-btn cart-icon-link" aria-label="Cart">
            <ShoppingBag size={20} />
            {totalCartQuantity > 0 && <span className="badge badge-cart">{totalCartQuantity}</span>}
          </Link>

          {/* Mobile Hamburguer Toggle */}
          <button className="icon-btn mobile-menu-btn" onClick={onMobileMenuToggle} aria-label="Open Menu">
            <MenuIcon size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
