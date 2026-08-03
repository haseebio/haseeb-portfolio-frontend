import React, { useState, useMemo } from 'react';
import { useReveal } from '../hooks/useReveal';
import { projects } from '../data/portfolio';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import SEO from '../components/SEO';
import './Projects.css';

const CATS = [
  { key: 'fullstack', label: 'Full Stack' },
  { key: 'frontend',  label: 'Frontend'   },
  { key: 'backend',   label: 'Backend'    },
];
const PAGE_SIZE = 3;

export default function Projects() {
  const [cat,     setCat]     = useState('fullstack');
  const [shown,   setShown]   = useState(PAGE_SIZE);
  const [modal,   setModal]   = useState(null);
  const headerRef = useReveal();
  const gridRef   = useReveal(0.05);

  const filtered = useMemo(() => projects.filter(p => p.tags.includes(cat)), [cat]);
  const visible  = filtered.slice(0, shown);
  const hasMore  = shown < filtered.length;
  const hasLess  = shown > PAGE_SIZE;

  const switchCat = (key) => { setCat(key); setShown(PAGE_SIZE); };

  return (
    <main className="page-wrap">
      <div className="container">
        <SEO
          title="Projects | Full Stack, Frontend & Backend — Haseeb"
          description="Portfolio projects by Muhammad Haseeb Ur Rehman — Weather App, Chat App, CRUD App, Password Generator, RJ Cafe Website and more. Built with React, Node.js, MongoDB."
          path="/projects"
          keywords="haseeb portfolio, haseeb codess portfolio, haseeb codess projects, portfolio projects, freelancer developer, MERN stack projects, React projects Pakistan"
        />
        <header className="page-header reveal" ref={headerRef}>
          <span className="sec-label">// projects</span>
          <h1 className="sec-title">Things I've built</h1>
          <p className="sec-sub">Real projects, live deployments — and many more on GitHub.</p>
        </header>

        <div className="proj-tabs">
          {CATS.map(c => (
            <button
              key={c.key}
              className={`proj-tab${cat === c.key ? ' active' : ''}`}
              onClick={() => switchCat(c.key)}
            >
              {c.label}
              <span className="proj-tab__count">
                {projects.filter(p => p.tags.includes(c.key)).length}
              </span>
            </button>
          ))}
        </div>

        <div className="reveal" ref={gridRef}>
          <div className="proj-grid">
            {visible.map(p => (
              <ProjectCard key={p.id} project={p} onOpen={setModal} />
            ))}
          </div>

          {(hasMore || hasLess) && (
            <div className="proj-actions">
              {hasMore && (
                <button className="btn-show-more" onClick={() => setShown(s => Math.min(s + PAGE_SIZE, filtered.length))}>
                  Show more &#8964;
                  <span className="proj-actions__hint">{filtered.length - shown} more</span>
                </button>
              )}
              {hasLess && (
                <button className="btn-show-less" onClick={() => setShown(PAGE_SIZE)}>
                  Show less &#8963;
                </button>
              )}
            </div>
          )}

          {!hasMore && filtered.length > 0 && (
            <div className="proj-github-cta">
              <p>These are the highlights — many more on GitHub.</p>
              <a href="https://github.com/haseebcodess" target="_blank" rel="noreferrer" className="btn-outline">
                View all on GitHub →
              </a>
            </div>
          )}
        </div>
      </div>

      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </main>
  );
}
