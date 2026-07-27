import React, { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Theme State
  const [theme, setTheme] = useLocalStorage('brewhaven-theme', 'light');
  
  // Cart State
  // Cart item schema: { id, productId, name, price, image, category, size, sugar, ice, toppings: [], quantity }
  const [cartItems, setCartItems] = useLocalStorage('brewhaven-cart', []);
  
  // Wishlist State: Array of product objects
  const [wishlistItems, setWishlistItems] = useLocalStorage('brewhaven-wishlist', []);
  
  // Rewards State
  const [points, setPoints] = useLocalStorage('brewhaven-rewards-points', 120);
  const [pointsHistory, setPointsHistory] = useLocalStorage('brewhaven-rewards-history', [
    { id: '1', action: 'Welcome Sign-up Bonus', points: 100, date: 'July 01, 2026', type: 'earn' },
    { id: '2', action: 'Purchase - Lavender Bloom Latte', points: 20, date: 'July 15, 2026', type: 'earn' }
  ]);

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  // Apply theme class to HTML document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Theme Toggle Handler
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Toast Notification Handlers
  const addToast = (message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Cart Handlers
  const addToCart = (product, quantity, size, sugar, ice, toppings) => {
    // Generate a unique ID based on the selection to group identical configurations
    const toppingNames = toppings.map(t => t.name).sort().join(',');
    const cartItemId = `${product.id}-${size}-${sugar}-${ice}-${toppingNames}`;

    // Calculate total price per item
    const sizeAdjustment = product.sizes.find(s => s.name === size)?.priceAdjustment || 0;
    const toppingsPrice = toppings.reduce((acc, t) => acc + t.price, 0);
    const unitPrice = product.price + sizeAdjustment + toppingsPrice;

    // Check if it already exists outside the state updater to avoid side effects
    const exists = cartItems.some(item => item.id === cartItemId);

    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === cartItemId);

      if (existingItemIndex > -1) {
        // Update quantity without mutating original state items
        const updated = [...prevItems];
        updated[existingItemIndex] = {
          ...updated[existingItemIndex],
          quantity: updated[existingItemIndex].quantity + quantity
        };
        return updated;
      } else {
        // Add new item
        const newItem = {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          price: unitPrice,
          basePrice: product.price,
          image: product.image,
          category: product.category,
          size,
          sugar,
          ice,
          toppings,
          quantity
        };
        return [...prevItems, newItem];
      }
    });

    // Call addToast outside of state updater
    if (exists) {
      addToast(`Updated quantity of ${product.name} in Cart!`, 'success');
    } else {
      addToast(`Added ${product.name} to Cart!`, 'success');
    }
  };

  const removeFromCart = (cartItemId, name = 'Item') => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
    addToast(`Removed ${name} from Cart`, 'warning');
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      const item = cartItems.find(i => i.id === cartItemId);
      removeFromCart(cartItemId, item?.name);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Wishlist Handlers
  const toggleWishlist = (product) => {
    let exists = false;
    setWishlistItems(prevItems => {
      exists = prevItems.some(item => item.id === product.id);
      if (exists) {
        return prevItems.filter(item => item.id !== product.id);
      } else {
        return [...prevItems, product];
      }
    });

    // Call addToast outside of state updater
    if (exists) {
      addToast(`Removed ${product.name} from Wishlist`, 'warning');
    } else {
      addToast(`Added ${product.name} to Wishlist!`, 'success');
    }
  };

  // Rewards Handlers
  const claimReward = (rewardId, pointsCost, rewardName) => {
    if (points >= pointsCost) {
      setPoints(prev => prev - pointsCost);
      const newHistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        action: `Claimed Reward: ${rewardName}`,
        points: -pointsCost,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        type: 'redeem'
      };
      setPointsHistory(prev => [newHistoryItem, ...prev]);
      addToast(`Successfully claimed: ${rewardName}!`, 'success');
      return true;
    } else {
      addToast(`Insufficient points for ${rewardName}`, 'warning');
      return false;
    }
  };

  const addPurchasePoints = (amountSpent) => {
    // 10 points for every 100 Naira spent (1 point per 10 Naira)
    const earnedPoints = Math.round(amountSpent / 10);
    if (earnedPoints <= 0) return;

    setPoints(prev => prev + earnedPoints);
    const newHistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      action: `Earned points from purchase`,
      points: earnedPoints,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      type: 'earn'
    };
    setPointsHistory(prev => [newHistoryItem, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      wishlistItems,
      toggleWishlist,
      points,
      pointsHistory,
      claimReward,
      addPurchasePoints,
      toasts,
      addToast,
      removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
