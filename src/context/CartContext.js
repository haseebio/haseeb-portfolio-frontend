import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
const CartContext = createContext(null);
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();
  useEffect(() => { if (isAuthenticated && user?.role==='customer') fetchCart(); else setCart([]); }, [isAuthenticated, user]);
  const fetchCart = async () => { try { setCartLoading(true); const res = await axios.get(`${API}/cart`); setCart(res.data.cart||[]); } catch { setCart([]); } finally { setCartLoading(false); } };
  const addToCart = async (productId, quantity=1) => { const res = await axios.post(`${API}/cart/add`,{productId,quantity}); setCart(res.data.cart); return res.data; };
  const removeFromCart = async (productId) => { const res = await axios.delete(`${API}/cart/${productId}`); setCart(res.data.cart); };
  const updateQuantity = async (productId, quantity) => { const res = await axios.patch(`${API}/cart/${productId}`,{quantity}); setCart(res.data.cart); };
  const clearCart = async () => { await axios.delete(`${API}/cart/clear`); setCart([]); };
  const cartCount = cart.reduce((s,i)=>s+i.quantity,0);
  const cartTotal = cart.reduce((s,i)=>s+(i.product?.price||0)*i.quantity,0);
  return (
    <CartContext.Provider value={{ cart, cartLoading, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => { const ctx = useContext(CartContext); if (!ctx) throw new Error('useCart must be inside CartProvider'); return ctx; };
