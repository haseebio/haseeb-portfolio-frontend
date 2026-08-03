import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <main style={{ paddingTop: 'calc(var(--nav-h) + 80px)', paddingBottom: 80, textAlign: 'center', fontFamily: 'var(--font-body)' }}>
      <SEO
        title="404 | Page not found — Haseeb Portfolio"
        description="Page not found on Haseeb Codess portfolio. Return to the homepage to explore Muhammad Haseeb Ur Rehman's portfolio, skills, and contact details."
        path="/404"
        keywords="haseeb portfolio, portfolio, haseeb codess, freelancer, page not found"
      />
      <span className="sec-label" style={{ display: 'inline-block', marginBottom: 12 }}>404</span>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 14 }}>
        Page not found
      </h1>
      <p style={{ fontSize: 15, color: 'var(--text2)', marginBottom: 32 }}>That page doesn't exist.</p>
      <Link to="/" className="btn-primary">← Back home</Link>
    </main>
  );
}
