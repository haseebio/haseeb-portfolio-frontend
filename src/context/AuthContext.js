import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
const AuthContext = createContext(null);
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('shopflow_token'));
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (token) { axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; fetchUser(); }
    else setLoading(false);
  }, [token]);
  const fetchUser = async () => {
    try { const res = await axios.get(`${API}/auth/me`); setUser(res.data.user); }
    catch { logout(); } finally { setLoading(false); }
  };
  const login = async (email, password) => {
    const res = await axios.post(`${API}/auth/login`, { email, password });
    const { token: t, user: u } = res.data;
    localStorage.setItem('shopflow_token', t);
    axios.defaults.headers.common['Authorization'] = `Bearer ${t}`;
    setToken(t); setUser(u); return u;
  };
  const signup = async (name, email, password, role) => {
    const res = await axios.post(`${API}/auth/signup`, { name, email, password, role });
    const { token: t, user: u } = res.data;
    localStorage.setItem('shopflow_token', t);
    axios.defaults.headers.common['Authorization'] = `Bearer ${t}`;
    setToken(t); setUser(u); return u;
  };
  const logout = useCallback(() => {
    localStorage.removeItem('shopflow_token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null); setUser(null);
  }, []);
  return (
    <AuthContext.Provider value={{ user, token, loading, isAdmin: user?.role==='admin', isAuthenticated: !!user, login, signup, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => { const ctx = useContext(AuthContext); if (!ctx) throw new Error('useAuth must be inside AuthProvider'); return ctx; };
