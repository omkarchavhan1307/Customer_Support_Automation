import React, { createContext, useContext, useState, useEffect } from 'react';
import { useOrder } from './OrderContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { selectedRestaurantId } = useOrder();

  const [cartByRestaurant, setCartByRestaurant] = useState(() => {
    const saved = localStorage.getItem('bitecraft_cart_by_restaurant');
    return saved ? JSON.parse(saved) : { r1: [], r2: [], r3: [] };
  });
  
  const [couponCodeByRestaurant, setCouponCodeByRestaurant] = useState(() => {
    const saved = localStorage.getItem('bitecraft_coupons_by_restaurant');
    return saved ? JSON.parse(saved) : { r1: '', r2: '', r3: '' };
  });

  const [discountByRestaurant, setDiscountByRestaurant] = useState(() => {
    const saved = localStorage.getItem('bitecraft_discounts_by_restaurant');
    return saved ? JSON.parse(saved) : { r1: 0, r2: 0, r3: 0 };
  });

  useEffect(() => {
    localStorage.setItem('bitecraft_cart_by_restaurant', JSON.stringify(cartByRestaurant));
  }, [cartByRestaurant]);

  useEffect(() => {
    localStorage.setItem('bitecraft_coupons_by_restaurant', JSON.stringify(couponCodeByRestaurant));
  }, [couponCodeByRestaurant]);

  useEffect(() => {
    localStorage.setItem('bitecraft_discounts_by_restaurant', JSON.stringify(discountByRestaurant));
  }, [discountByRestaurant]);

  const cartItems = cartByRestaurant[selectedRestaurantId] || [];
  const couponCode = couponCodeByRestaurant[selectedRestaurantId] || '';
  const discountPercent = discountByRestaurant[selectedRestaurantId] || 0;

  const updateCartItems = (updater) => {
    setCartByRestaurant(prev => {
      const current = prev[selectedRestaurantId] || [];
      const updated = typeof updater === 'function' ? updater(current) : updater;
      return { ...prev, [selectedRestaurantId]: updated };
    });
  };

  const addToCart = (item) => {
    updateCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    updateCartItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId, q) => {
    if (q <= 0) {
      removeFromCart(itemId);
      return;
    }
    updateCartItems((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity: q } : i)));
  };

  const applyCoupon = (code) => {
    const uppercaseCode = code.toUpperCase().trim();
    if (uppercaseCode === 'AICRAFT15') {
      setCouponCodeByRestaurant(prev => ({ ...prev, [selectedRestaurantId]: uppercaseCode }));
      setDiscountByRestaurant(prev => ({ ...prev, [selectedRestaurantId]: 15 }));
      return { success: true, message: 'Coupon applied! 15% discount.' };
    }
    return { success: false, message: 'Invalid coupon code.' };
  };

  const removeCoupon = () => {
    setCouponCodeByRestaurant(prev => ({ ...prev, [selectedRestaurantId]: '' }));
    setDiscountByRestaurant(prev => ({ ...prev, [selectedRestaurantId]: 0 }));
  };

  const clearCart = () => {
    updateCartItems([]);
    removeCoupon();
  };

  const getSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const getDiscountAmount = () => {
    return Math.round((getSubtotal() * discountPercent) / 100);
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const discount = getDiscountAmount();
    const tax = Math.round(subtotal * 0.05);
    return Math.max(0, subtotal - discount + tax);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        couponCode,
        discountPercent,
        applyCoupon,
        removeCoupon,
        getSubtotal,
        getDiscountAmount,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
