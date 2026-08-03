import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './utils/ScrollToTop';
import './styles/globals.css';

const Home     = lazy(() => import('./pages/Home'));
const About    = lazy(() => import('./pages/About'));
const Skills   = lazy(() => import('./pages/Skills'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact  = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - var(--nav-h))' }}>
      <div style={{ width: 32, height: 32, border: '2.5px solid var(--bg3)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <ScrollToTop />
          <Navbar />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"         element={<Home />}     />
              <Route path="/about"    element={<About />}    />
              <Route path="/skills"   element={<Skills />}   />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact"  element={<Contact />}  />
              <Route path="*"         element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
}
