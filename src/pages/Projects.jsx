import React, { useState, useMemo } from 'react';
import SEOHead from '../components/SEOHead';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { useReveal, useRevealGroup } from '../hooks/useReveal';
import { projects } from '../data/portfolio';
import './Projects.css';

const CATS = [
  { key: 'fullstack', label: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
  { key: 'frontend',  label: 'Frontend',   count: projects.filter(p => p.category === 'frontend').length  },
  { key: 'backend',   label: 'Backend',    count: projects.filter(p => p.category === 'backend').length   },
];
const PAGE = 3;

export default function Projects() {
  const [cat,   setCat]   = useState('fullstack');
  const [shown, setShown] = useState(PAGE);
  const [modal, setModal] = useState(null);

  const headerRef = useReveal();
  const gridRef   = useRevealGroup();

  const filtered = useMemo(() => projects.filter(p => p.category === cat), [cat]);
  const visible  = filtered.slice(0, shown);
  const hasMore  = shown < filtered.length;
  const hasLess  = shown > PAGE;

  const switchCat = (key) => { setCat(key); setShown(PAGE); };

  return (
    <>
      <SEOHead
        title="Projects — Haseeb Portfolio | MERN Stack Developer Projects"
        description="View all projects by Muhammad Haseeb Ur Rehman — Haseeb Shop e-commerce platform, Website Health Checker, Pluto Coffee, Real-Time Chat App and more. Full-stack developer from Lahore."
        keywords="haseeb portfolio projects, Haseeb Shop, MERN stack projects, React Node.js MongoDB projects, full stack developer projects Lahore Pakistan"
        path="/projects"
      />

      <main className="page-wrap projects-page">
        <div className="container">

          <header className="page-header reveal" ref={headerRef}>
            <span className="sec-eyebrow">Portfolio</span>
            <h1 className="sec-title">Things I've <span>Built</span></h1>
            <p className="sec-sub">
              Real projects, live deployments, and real clients.
              Everything here was built from scratch and is publicly available.
            </p>
          </header>

          {/* CATEGORY TABS */}
          <div className="proj-tabs">
            {CATS.map(c => (
              <button
                key={c.key}
                className={`proj-tab${cat === c.key ? ' active' : ''}`}
                onClick={() => switchCat(c.key)}
              >
                {c.label}
                <span className="proj-tab__count">{c.count}</span>
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="reveal-group" ref={gridRef}>
            <div className="proj-grid">
              {visible.map(p => (
                <div key={p.id} className="reveal">
                  <ProjectCard project={p} onOpen={setModal} featured={p.featured} />
                </div>
              ))}
            </div>

            {/* SHOW MORE / LESS */}
            {(hasMore || hasLess) && (
              <div className="proj-actions">
                {hasMore && (
                  <button
                    className="btn-primary"
                    onClick={() => setShown(s => Math.min(s + PAGE, filtered.length))}
                  >
                    Show More
                    <span className="proj-actions__hint">{filtered.length - shown} remaining</span>
                  </button>
                )}
                {hasLess && (
                  <button className="btn-outline" onClick={() => setShown(PAGE)}>
                    Show Less ↑
                  </button>
                )}
              </div>
            )}

            {!hasMore && filtered.length > 0 && (
              <div className="proj-github-cta">
                <div className="proj-github-cta__inner">
                  <div className="proj-github-cta__shapes" aria-hidden="true">
                    <div className="proj-github-cta__orb" />
                  </div>
                  <div className="proj-github-cta__content">
                    <h3>These are just the highlights.</h3>
                    <p>Many more experiments, utilities and learning projects live on GitHub.</p>
                    <a
                      href="https://github.com/haseebcodess"
                      target="_blank" rel="noreferrer"
                      className="btn-coral"
                    >
                      View All on GitHub ↗
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </>
  );
}
