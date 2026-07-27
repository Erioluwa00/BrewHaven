import React from 'react';
import { Award, Heart, Shield, Sparkles, MapPin, Coffee, Users } from 'lucide-react';
import '../css/about.css';

export default function About() {
  const teamMembers = [
    { name: 'Aria Sterling', role: 'Founder & Curator', desc: 'A tea master certified in Kyoto. Aria created BrewHaven to bring ceremonial matcha and artisanal herbal infusions to modern city neighborhoods.', initial: 'AS' },
    { name: 'Julian Thorne', role: 'Head Barista & Roaster', desc: 'Winner of the 2024 Barista Craft Cup. Julian sources our single-origin coffee beans and meticulously dials in our custom lavender espresso profiles.', initial: 'JT' },
    { name: 'Elena Rostova', role: 'Wellness Nutritionist', desc: 'Elena curates the smoothie formulas, calorie counts, and clean ingredient profiles, ensuring every drink supports skin health and natural energy.', initial: 'ER' }
  ];



  return (
    <div className="about-page container">
      {/* Introduction Header */}
      <div className="section-header">
        <h2>About BrewHaven</h2>
        <p>A luxury sanctuary designed to elevate your daily beverage ritual through high-grade organic ingredients.</p>
      </div>

      {/* Story, Mission & Vision Section */}
      <div className="grid-2" style={{ marginTop: '40px', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--color-accent)', marginBottom: '16px' }}>Our Story</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '20px' }}>
            At BrewHaven, we believe that coffee and tea are more than just fuel—they are moments of daily magic. Our brand was born out of a desire to merge the calming, stone-ground rituals of Japanese matcha tea with the bold, fast-paced art of European espresso brewing.
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: '1.7' }}>
            We selected our signature soft pink, lavender, and plum palette to create a sanctuary of soft aesthetics. Whether you are drinking a Rose Gold Macchiato or enjoying a giant Rose Raspberry Macaron, every detail has been crafted to invite warmth, playfulness, and peace.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '40px', border: '1px solid var(--color-border)' }}>
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem', color: 'var(--color-accent)', marginBottom: '8px' }}>
              <Shield size={18} style={{ color: 'var(--color-primary)' }} />
              <span>Our Mission</span>
            </h4>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              To craft visually stunning and nutritionally superior beverages using organic milk, house-cooked syrups, and clean ingredients, without artificial dyes or additives.
            </p>
          </div>

          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem', color: 'var(--color-accent)', marginBottom: '8px' }}>
              <Award size={18} style={{ color: 'var(--color-primary)' }} />
              <span>Our Vision</span>
            </h4>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              To cultivate a worldwide community of beverage enthusiasts who value aesthetic beauty, ingredient integrity, and mindful loyalty rewards.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose BrewHaven Grid */}
      <section style={{ marginTop: '100px' }}>
        <div className="section-header">
          <h2>Why BrewHaven?</h2>
          <p>We source the earth's finest raw components to compose our drink profiles.</p>
        </div>

        <div className="grid-3" style={{ marginTop: '40px' }}>
          <div className="glass-card text-center" style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#FFF0F5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
              <Coffee size={24} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', fontWeight: 600 }}>Organic Syrups</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              All floral lavender and rose extracts are boiled in-house daily with organic cane sugar—never using processed high fructose corn syrup.
            </p>
          </div>

          <div className="glass-card text-center" style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#FFF0F5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
              <Sparkles size={24} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', fontWeight: 600 }}>Uji Matcha</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              We source our vibrant green matcha directly from historic family farms in Kyoto, shade-grown for 25 days and stone-ground to a fine velvet.
            </p>
          </div>

          <div className="glass-card text-center" style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#FFF0F5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
              <Heart size={24} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', fontWeight: 600 }}>Real Fruits</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              Our taro bubble tea uses steamed fresh taro roots, and our strawberry mixes are cooked with real organic sweet strawberry halves.
            </p>
          </div>
        </div>
      </section>

      {/* Counters Statistics Section */}
      <section className="stats-grid" style={{ marginTop: '100px' }}>
        <div className="stat-item glass-card">
          <div className="stat-num">12+</div>
          <div className="stat-label">Boutique Locations</div>
          <div className="stat-desc">Designed with soft aesthetic spaces</div>
        </div>

        <div className="stat-item glass-card">
          <div className="stat-num">50k+</div>
          <div className="stat-label">Happy Guests</div>
          <div className="stat-desc">Serving luxury drink diaries daily</div>
        </div>

        <div className="stat-item glass-card">
          <div className="stat-num">100%</div>
          <div className="stat-label">Organic Milks</div>
          <div className="stat-desc">Oat, almond, coconut and fresh dairy</div>
        </div>

        <div className="stat-item glass-card">
          <div className="stat-num">15+</div>
          <div className="stat-label">Aesthetic Awards</div>
          <div className="stat-desc">Ranked Best Specialty Cafe in 2025</div>
        </div>
      </section>



      {/* Meet the Founding Team */}
      <section style={{ marginTop: '100px', marginBottom: '40px' }}>
        <div className="section-header">
          <h2>Meet the Curators</h2>
          <p>The visionaries behind our premium recipes and brand design.</p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="team-card glass-card">
              <div className="team-avatar">{member.initial}</div>
              <div className="team-info">
                <h3>{member.name}</h3>
                <span>{member.role}</span>
              </div>
              <p className="team-desc">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
