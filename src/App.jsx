// src/App.jsx
import { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SocialSidebar from './components/SocialSidebar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import { useTheme } from './hooks/useTheme';
import { useJsonLd } from './hooks/useJsonLd';
import { profile } from './data/portfolio';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  // Site-wide Person + WebSite structured data — helps Google and AI answer
  // engines understand who you are, independent of whatever page loaded first.
  // Uses id='ld-json-site' specifically so it never collides with the
  // per-blog-post BlogPosting/FAQPage schema, which uses the default id.
  //
  // Per-page <title> and meta description are now handled by each page's own
  // useSEO() call instead of one generic value here — this used to set the
  // same title/description on every route, which is a real duplicate-meta
  // SEO problem. index.html's own <meta name="description"> tag (outside
  // src/) should still be updated manually — that one matters most for the
  // very first crawl before JS runs.
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
        </Routes>
      </main>
      <Footer />
    </>
  );
}