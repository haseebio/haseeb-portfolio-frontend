import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const api = axios.create({ baseURL: API_BASE, timeout: 15000 });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('shopflow_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('shopflow_token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);
export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getOne: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => api.put(`/products/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/products/${id}`),
};
export const CURRENCY_SYMBOLS = { USD:'$', JPY:'\u00a5', CNY:'\u00a5', EUR:'\u20ac', GBP:'\u00a3', PKR:'Rs' };
export const formatPrice = (price, currencyCode = 'USD') => {
  const symbol = CURRENCY_SYMBOLS[currencyCode] || '$';
  if (['JPY','CNY','PKR'].includes(currencyCode)) return `${symbol} ${Math.round(price).toLocaleString()}`;
  return `${symbol}${Number(price).toFixed(2)}`;
};
export const getImageUrl = (image) => {
  if (!image) return null;
  if (image.startsWith('http')) return image;
  return `${process.env.REACT_APP_SERVER_URL || 'http://localhost:5000'}${image}`;
};
export default api;
