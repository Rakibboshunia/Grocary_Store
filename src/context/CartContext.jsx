import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Try to get cart from local storage on initial load
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Update local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    let itemExists = false;
    
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        itemExists = true;
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    if (itemExists) {
      toast.success(`Increased ${product.name} quantity in cart!`, { id: `cart-${product.id}` });
    } else {
      toast.success(`${product.name} added to cart!`, { id: `cart-${product.id}` });
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
