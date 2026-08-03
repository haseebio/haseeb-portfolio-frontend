import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

export default function NotFound() {
  return (
    <>
      <SEOHead
        title="404 — Page Not Found | Haseeb Portfolio"
        description="This page doesn't exist. Go back to Haseeb Portfolio — MERN Stack Developer from Lahore, Pakistan."
        path="/404"
      />
      <main style={{
        paddingTop: 'calc(var(--nav-h) + 80px)', paddingBottom: 100,
        textAlign: 'center', fontFamily: 'var(--font-body)',
        minHeight: '80vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(5rem,15vw,10rem)',
          fontWeight: 800, color: 'var(--bg3)', lineHeight: 1, marginBottom: 24,
          letterSpacing: '-0.04em',
        }}>404</div>
        <span className="sec-eyebrow" style={{ display: 'inline-block', marginBottom: 12 }}>Not Found</span>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,4vw,2.4rem)',
          fontWeight: 800, color: 'var(--text)', marginBottom: 14, letterSpacing: '-0.03em',
        }}>
          This page doesn't exist.
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text2)', marginBottom: 36, maxWidth: 380, lineHeight: 1.7 }}>
          The URL you visited isn't here. Let's get you back to something real.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" className="btn-primary">← Back to Home</Link>
          <Link to="/projects" className="btn-outline">View Projects</Link>
        </div>
      </main>
    </>
  );
}
