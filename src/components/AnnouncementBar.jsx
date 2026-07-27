import React from 'react';
import '../css/navbar.css';

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="announcement-track">
        <span className="announcement-item">🌸 Grand Opening Special: Use code <strong>BREWHAVEN20</strong> for 20% off! 🌸</span>
        <span className="announcement-item">✨ Free Delivery on all premium beverage orders over ₦15,000! ✨</span>
        <span className="announcement-item">🍵 Try our new Signature Pink Velvet Matcha & Sakura Cloud Crepes! 🍵</span>
        <span className="announcement-item">💖 Join BrewHaven Rewards today and earn 10 points per ₦100 spent! 💖</span>
        
        {/* Duplicate for seamless scrolling marquee */}
        <span className="announcement-item">🌸 Grand Opening Special: Use code <strong>BREWHAVEN20</strong> for 20% off! 🌸</span>
        <span className="announcement-item">✨ Free Delivery on all premium beverage orders over ₦15,000! ✨</span>
        <span className="announcement-item">🍵 Try our new Signature Pink Velvet Matcha & Sakura Cloud Crepes! 🍵</span>
        <span className="announcement-item">💖 Join BrewHaven Rewards today and earn 10 points per ₦100 spent! 💖</span>
      </div>
    </div>
  );
}
