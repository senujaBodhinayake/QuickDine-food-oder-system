import { createContext, useState } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (item, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === item._id);
      if (existing) {
        return prev.map(i =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
        
      }
      
      
      
      return [...prev, { ...item, quantity }];
      
      
    });
    toast.success(`${item.name} added to cart`);
  };

  // Update quantity
  const updateQuantity = (id, quantity) => {
    setCart(prev =>
      prev.map(i =>
        i._id === id ? { ...i, quantity: Math.max(1, quantity) } : i
      )
    );
  };

  // Remove item
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i._id !== id));
  };

  // Clear cart
  const clearCart = () => setCart([]);

  // Total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}