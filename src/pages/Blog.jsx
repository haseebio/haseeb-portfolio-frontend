// src/pages/Blog.jsx
import { profile } from '../data/portfolio';
import { useSEO } from '../hooks/useSEO';
import './Blog.css';

export default function Blog() {
  useSEO(`Writing — ${profile.name}`, profile.bio);

  return (
    <>
      <header className="blog-hero">
        <div className="wrap">
          <div className="eyebrow">Writing</div>
          <h1>Notes from actually building things</h1>
          <p className="lead">
            Case studies from real projects — what broke, what the hard part actually was,
            not the highlight-reel version.
          </p>
        </div>
      </header>

      <section>
        <div className="wrap">
          <p className="empty-state">Coming soon.</p>
        </div>
      </section>
    </>
  );
}