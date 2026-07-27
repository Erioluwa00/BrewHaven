import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import '../css/footer.css';

export default function Footer() {
  const { addToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    addToast('Thank you for subscribing to our newsletter! 🌸', 'success');
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Brand Section */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="logo-text">Brew<span>Haven</span></span>
          </Link>
          <p className="footer-description">
            Every sip tells a story. Crafting luxury lattes, ceremonial matcha, bubble teas, and artisan desserts in a soft, dreamy atmosphere.
          </p>
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Explore</h3>
          <ul>
            <li><Link to="/menu">Our Menu</Link></li>
            <li><Link to="/shop">Shop Drinks</Link></li>
            <li><Link to="/rewards">Loyalty Rewards</Link></li>
            <li><Link to="/blog">Blog & Tips</Link></li>
            <li><Link to="/about">Our Story</Link></li>
          </ul>
        </div>

        {/* Contact & Hours */}
        <div className="footer-info">
          <h3>Cafe Hours</h3>
          <ul className="info-list">
            <li>
              <Clock size={16} />
              <span>Mon - Fri: 7:00 AM - 8:00 PM</span>
            </li>
            <li>
              <Clock size={16} />
              <span>Sat - Sun: 8:00 AM - 9:00 PM</span>
            </li>
            <li>
              <MapPin size={16} />
              <span>123 Blossom Boulevard, Suite 100</span>
            </li>
            <li>
              <Phone size={16} />
              <span>+1 (555) 321-7654</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="footer-newsletter">
          <h3>Join the Haven</h3>
          <p>Subscribe to receive sweet rewards, brewing guides, and exclusive discount codes.</p>
          <form className="subscribe-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <button type="submit" className="btn btn-accent">Join</button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} BrewHaven Café. All rights reserved.</p>
          <p>Created with love, pink velvet cream, and sprinkles.</p>
        </div>
      </div>
    </footer>
  );
}
