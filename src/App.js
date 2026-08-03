import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Chatbot from './components/Chatbot';

const LandingPage      = lazy(() => import('./pages/LandingPage'));
const AuthPage         = lazy(() => import('./pages/AuthPage'));
const ProductsPage     = lazy(() => import('./pages/ProductsPage'));
const AddProductPage   = lazy(() => import('./pages/AddProductPage'));
const CartPage         = lazy(() => import('./pages/CartPage'));
const AdminDashboard   = lazy(() => import('./pages/AdminDashboard'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const DeveloperPage    = lazy(() => import('./pages/DeveloperPage'));

const Loader = () => (
  <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16, background:'#f5f5fa' }}>
    <div style={{ width:40, height:40, borderRadius:'50%', border:'3px solid rgba(37,99,255,0.15)', borderTopColor:'#2563ff', animation:'spin 0.7s linear infinite' }}></div>
    <span style={{ color:'var(--text3)', fontSize:14, fontWeight:500 }}>Loading Haseeb Shop...</span>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh' }}>
            <Navbar />
            <main style={{ flex:1 }}>
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/"                    element={<LandingPage />} />
                  <Route path="/auth"                element={<AuthPage />} />
                  <Route path="/developer"           element={<DeveloperPage />} />
                  <Route path="/products"            element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
                  <Route path="/products/:id"        element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>} />
                  <Route path="/cart"                element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                  <Route path="/admin"               element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/admin/add-product"   element={<ProtectedRoute adminOnly><AddProductPage /></ProtectedRoute>} />
                  <Route path="*"                    element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </main>
            <Chatbot />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
