import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, Trophy, Gift, ArrowUpRight, Flame, Leaf, Coffee } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Confetti from '../components/Confetti';
import '../css/rewards.css';

export default function Rewards() {
  const location = useLocation();
  const { points, pointsHistory, claimReward } = useApp();
  const [confettiTrigger, setConfettiTrigger] = useState(false);

  // Trigger confetti if navigated from checkout page with completed order
  useEffect(() => {
    if (location.state?.confettiTrigger) {
      setConfettiTrigger(true);
      // Clean location state to avoid repeating confetti on manual refresh
      window.history.replaceState({}, document.title);
      // Reset trigger
      setTimeout(() => setConfettiTrigger(false), 4000);
    }
  }, [location.state]);

  const rewardsRedemptionOptions = [
    { id: 'reward-syrup', name: 'Free Custom Syrup / Espresso Shot', cost: 500, icon: Flame, description: 'Upgrade your next cup with premium lavender, rose, vanilla syrup, or an extra organic shot.' },
    { id: 'reward-boba', name: 'Free Extra Topping (Boba / Jelly / Foam)', cost: 800, icon: Leaf, description: 'Add slow-cooked honey boba, popping peach pearls, or salted cheese cold foam to any drink.' },
    { id: 'reward-pastry', name: 'Free Fresh Dessert Pastry', cost: 1800, icon: Gift, description: 'Redeem for any single slice of Uji Matcha Crepe, Sakura Shortcake, or Giant Rose Macaron.' },
    { id: 'reward-beverage', name: 'Free Handcrafted BrewHaven Beverage', cost: 2800, icon: Coffee, description: 'Redeem for any coffee, matcha cloud, green tea, or blended milkshake on the menu.' }
  ];

  // Next reward calculation
  const getNextRewardThreshold = () => {
    if (points < 500) return 500;
    if (points < 800) return 800;
    if (points < 1800) return 1800;
    if (points < 2800) return 2800;
    return 4000; // Ultimate reward tier
  };

  const nextThreshold = getNextRewardThreshold();
  const progressPercent = Math.min(100, Math.round((points / nextThreshold) * 100));

  const handleRedeemClick = (reward) => {
    const success = claimReward(reward.id, reward.cost, reward.name);
    if (success) {
      setConfettiTrigger(true);
      setTimeout(() => setConfettiTrigger(false), 4000);
    }
  };

  return (
    <div className="rewards-page container">
      {/* Confetti canvas overlay */}
      <Confetti trigger={confettiTrigger} />

      <div className="section-header">
        <h2>Loyalty Rewards</h2>
        <p>Earn 10 points for every ₦1 spent at BrewHaven. Unlock free toppings, pastries, and signature drinks.</p>
      </div>

      <div className="rewards-grid">
        {/* ==========================================
           LEFT: POINTS BALANCE & TIER PROGRESS
           ========================================== */}
        <div className="rewards-sidebar-progress">
          <div className="points-display-card glass-card">
            <span className="quiz-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Trophy size={14} /> Loyalty Balance
            </span>
            
            <div className="points-circle">
              <span className="points-num">{points}</span>
              <span className="points-label">Points</span>
            </div>

            {/* Progress bar */}
            <div className="progress-section">
              <div className="progress-header">
                <span>Next Tier Progress</span>
                <span><strong>{points}</strong> / {nextThreshold} pts</span>
              </div>
              <div className="progress-bar-outer">
                <div className="progress-bar-inner" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>

            {/* Tiers overview */}
            <div className="rewards-tiers-legend">
              <div className={`legend-item ${points >= 500 ? 'unlocked' : ''}`}>
                <span>500 pts: Free Flavor Syrup / Shot</span>
                <span>{points >= 500 ? 'Unlocked ✓' : 'Locked'}</span>
              </div>
              <div className={`legend-item ${points >= 800 ? 'unlocked' : ''}`}>
                <span>800 pts: Free Extra Toppings</span>
                <span>{points >= 800 ? 'Unlocked ✓' : 'Locked'}</span>
              </div>
              <div className={`legend-item ${points >= 1800 ? 'unlocked' : ''}`}>
                <span>1800 pts: Free Artisan Cake Slice</span>
                <span>{points >= 1800 ? 'Unlocked ✓' : 'Locked'}</span>
              </div>
              <div className={`legend-item ${points >= 2800 ? 'unlocked' : ''}`}>
                <span>2800 pts: Free Specialty Drink</span>
                <span>{points >= 2800 ? 'Unlocked ✓' : 'Locked'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
           RIGHT: AVAILABLE REDEMPTIONS
           ========================================== */}
        <div className="rewards-redeem-container">
          <h3 style={{ fontSize: '1.5rem', color: 'var(--color-accent)', marginBottom: '8px' }}>Available Redemptions</h3>
          
          {rewardsRedemptionOptions.map((reward) => {
            const Icon = reward.icon;
            const canAfford = points >= reward.cost;

            return (
              <div key={reward.id} className="redeem-card glass-card">
                <div className="redeem-icon-box">
                  <Icon size={24} />
                </div>
                
                <div className="redeem-info">
                  <h4 className="redeem-title">{reward.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px', marginBottom: '4px' }}>
                    {reward.description}
                  </p>
                  <span className="redeem-cost">{reward.cost} Points required</span>
                </div>

                <button 
                  className={`btn ${canAfford ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ flexShrink: 0, padding: '8px 16px', fontSize: '0.8rem', borderRadius: '12px' }}
                  disabled={!canAfford}
                  onClick={() => handleRedeemClick(reward)}
                >
                  <span>Redeem</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==========================================
         POINTS HISTORY LOG
         ========================================== */}
      <section className="rewards-history-section">
        <div className="history-card glass-card">
          <h3 style={{ fontSize: '1.5rem', color: 'var(--color-accent)', marginBottom: '20px' }}>Point Ledger</h3>
          
          {pointsHistory.length > 0 ? (
            <table className="history-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Date</th>
                  <th style={{ textAlign: 'right' }}>Points</th>
                </tr>
              </thead>
              <tbody>
                {pointsHistory.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 500, color: 'var(--color-text)' }}>{item.action}</td>
                    <td>{item.date}</td>
                    <td style={{ textAlign: 'right' }}>
                      <span className={`points-badge ${item.type === 'earn' ? 'points-earn' : 'points-redeem'}`}>
                        {item.type === 'earn' ? `+${item.points}` : item.points}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '20px' }}>No points history recorded yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
