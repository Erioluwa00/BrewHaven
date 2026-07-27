import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import FAQAccordion from '../components/FAQAccordion';
import '../css/contact.css';

export default function Contact() {
  const { addToast } = useApp();
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Trigger toast notification
    addToast(`Thank you, ${formData.name}! Your message has been sent successfully. 🌸`, 'success');
    
    // Clear form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const faqs = [
    {
      question: 'Do you offer dairy-free milk alternatives?',
      answer: 'Absolutely! We specialize in premium dairy alternatives. You can customize any beverage with Organic Oat Milk, Unsweetened Almond Milk, or Rich Creamy Coconut Milk at no extra charge.'
    },
    {
      question: 'Can I customize the sweetness and ice levels in my drinks?',
      answer: 'Yes! Almost all of our craft lattes, matcha cups, refreshers, and boba teas let you dial in your exact specifications. You can select Sugar Levels (0%, 30%, 50%, 100%) and Ice Levels (0%, 25%, 50%, 100%) when ordering.'
    },
    {
      question: 'How do I earn and redeem BrewHaven Loyalty Points?',
      answer: 'It is easy! You earn 10 rewards points automatically for every ₦100 spent on our website. You can track your balance on the Rewards page and click "Redeem" on any available rewards (like free extra toppings, cakes, or drinks).'
    },
    {
      question: 'Do you offer catering or pre-orders for whole cakes?',
      answer: 'Yes, we do! You can pre-order whole cakes (like our Signature Sakura Shortcake or Matcha Mille Crepe) with a 48-hour notice. Reach out using our contact form or call our shop directly.'
    },
    {
      question: 'Are your tea leaves and coffee beans sustainably sourced?',
      answer: 'Yes, 100%. Our ceremonial Uji matcha is stone-ground and sourced directly from organic tea farms in Kyoto. Our specialty coffee beans are certified organic, single-origin, and roasted in small batches weekly.'
    }
  ];

  return (
    <div className="contact-page container">
      <div className="section-header">
        <h2>Get in Touch</h2>
        <p>Have questions about catering, wholesaling, or our recipes? Send us a message or visit us in person.</p>
      </div>

      <div className="contact-grid">
        {/* ==========================================
           LEFT: CONTACT INFO BLOCKS & MAP
           ========================================== */}
        <div className="contact-info-column">
          <div className="contact-info-card glass-card">
            <div className="info-header-row">
              <Clock size={20} />
              <h3>Opening Hours</h3>
            </div>
            <p>Monday - Friday: 7:00 AM - 8:00 PM</p>
            <p>Saturday - Sunday: 8:00 AM - 9:00 PM</p>
          </div>

          <div className="contact-info-card glass-card">
            <div className="info-header-row">
              <MapPin size={20} />
              <h3>Boutique Café Address</h3>
            </div>
            <p>123 Blossom Boulevard, Suite 100</p>
            <p>Kyoto District, KY 604-8091</p>
            
            {/* Map Mock representation */}
            <div className="map-mock-wrapper">
              <div className="map-placeholder-content">
                <MapPin size={32} style={{ color: 'var(--color-accent)', animation: 'float-slow 3s ease-in-out infinite' }} />
                <span>Map view: Kyoto Flagship Store</span>
              </div>
            </div>
          </div>

          <div className="contact-info-card glass-card">
            <div className="info-header-row">
              <Mail size={20} />
              <h3>Contact Details</h3>
            </div>
            <p>Email: <strong>hello@brewhavencafe.com</strong></p>
            <p>Phone: <strong>+1 (555) 321-7654</strong></p>
          </div>
        </div>

        {/* ==========================================
           RIGHT: CONTACT INPUT FORM
           ========================================== */}
        <div className="contact-form-card glass-card">
          <div className="info-header-row" style={{ marginBottom: '24px' }}>
            <MessageSquare size={20} />
            <h3 style={{ fontSize: '1.4rem' }}>Send Us a Message</h3>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-control" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="form-control" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                className="form-control" 
                value={formData.subject} 
                onChange={handleInputChange} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea 
                id="message" 
                name="message" 
                className="form-control" 
                value={formData.message} 
                onChange={handleInputChange} 
                required 
              />
            </div>

            <button type="submit" className="btn btn-primary btn-send-message">
              <span>Send Message</span>
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* ==========================================
         FAQ INTERACTIVE ACCORDION
         ========================================== */}
      <section className="faq-section">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Read quick answers regarding our dietary information, beans quality, and reward logs.</p>
        </div>

        <div style={{ maxWidth: '800px', margin: '40px auto 0 auto' }}>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>
    </div>
  );
}
