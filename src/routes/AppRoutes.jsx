import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist';
import Menu from '../pages/Menu';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Rewards from '../pages/Rewards';
import Blog from '../pages/Blog';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Child Pages */}
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:productId" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="menu" element={<Menu />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="blog" element={<Blog />} />
        
        {/* Fallback routing redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
