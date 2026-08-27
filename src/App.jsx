// src/App.jsx
import { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SocialSidebar from './components/SocialSidebar';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import { useTheme } from './hooks/useTheme';
import { useJsonLd } from './hooks/useJsonLd';
import { useNoIndex } from './hooks/useNoIndex';
import { profile } from './data/portfolio';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  const siteSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          name: profile.name,
          url: profile.siteUrl,
          jobTitle: profile.role,
          email: `mailto:${profile.email}`,
          sameAs: [profile.github, profile.linkedin, profile.twitter, profile.facebook, profile.instagram],
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Lahore',
            addressRegion: 'Punjab',
            addressCountry: 'PK',
          },
        },
        {
          '@type': 'WebSite',
          name: `${profile.name} — Portfolio`,
          url: profile.siteUrl,
        },
      ],
    }),
    []
  );

  useJsonLd(siteSchema, 'ld-json-site');

  return (
    <>
      <ScrollToTop />
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <SocialSidebar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

function NotFound() {
  useNoIndex();
  return (
    <section className="wrap" style={{ padding: '80px 0', textAlign: 'center' }}>
      <h1>404</h1>
      <p>That page doesn't exist.</p>
    </section>
  );
}