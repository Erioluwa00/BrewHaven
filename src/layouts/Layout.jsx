import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import DrawerMenu from '../components/DrawerMenu';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import FloatingCartButton from '../components/FloatingCartButton';
import ToastNotifications from '../components/ToastNotifications';

export default function Layout() {
  const { pathname } = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const toggleDrawer = () => {
    setIsDrawerOpen(prev => !prev);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="app-layout">
      {/* Top Banner and Navigation */}
      <AnnouncementBar />
      <Navbar onMobileMenuToggle={toggleDrawer} />
      
      {/* Side Slide Menu for Mobile Screens */}
      <DrawerMenu isOpen={isDrawerOpen} onClose={closeDrawer} />

      {/* Primary Page Content Wrapper */}
      <main className="page-content">
        <Outlet />
      </main>

      {/* Footer Branding & Links */}
      <Footer />

      {/* Floating Helpers */}
      <ScrollToTop />
      <FloatingCartButton />
      <ToastNotifications />

      <style>{`
        .app-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .page-content {
          flex-grow: 1;
          position: relative;
        }
      `}</style>
    </div>
  );
}
