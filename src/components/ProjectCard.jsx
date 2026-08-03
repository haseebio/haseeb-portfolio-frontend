import React, { useState, useEffect, useRef } from 'react';
import './ProjectCard.css';

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const LIIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
  </svg>
);
const ImgIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21,15 16,10 5,21"/>
  </svg>
);

const CAT_LABELS = { fullstack: 'Full Stack', frontend: 'Frontend', backend: 'Backend' };

export default function ProjectCard({ project, onOpen }) {
  const [slide, setSlide]     = useState(0);
  const timerRef              = useRef(null);
  const total                 = project.images?.length || 0;

  const next = () => setSlide(s => (s + 1) % Math.max(total, 1));
  const prev = () => setSlide(s => (s - 1 + Math.max(total, 1)) % Math.max(total, 1));

  useEffect(() => {
    if (total <= 1) return;
    timerRef.current = setInterval(next, 3000);
    return () => clearInterval(timerRef.current);
  }, [total]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 3000);
  };

  const handlePrev = (e) => { e.stopPropagation(); prev(); resetTimer(); };
  const handleNext = (e) => { e.stopPropagation(); next(); resetTimer(); };

  return (
    <article className="proj-card" onClick={() => onOpen(project)}>
      <div className="proj-card__carousel">
        <div className="proj-card__slides" style={{ transform: `translateX(-${slide * 100}%)` }}>
          {total > 0
            ? project.images.map((img, i) => (
                <div key={i} className="proj-card__slide">
                  <img src={img} alt={project.title} />
                </div>
              ))
            : (
              <div className="proj-card__slide proj-card__placeholder">
                <ImgIcon />
                <span>Add project screenshot</span>
              </div>
            )
          }
        </div>

        <span className="proj-card__cat">{CAT_LABELS[project.category]}</span>

        {total > 1 && (
          <>
            <button className="proj-card__arrow proj-card__arrow--l" onClick={handlePrev} aria-label="Previous">&#8592;</button>
            <button className="proj-card__arrow proj-card__arrow--r" onClick={handleNext} aria-label="Next">&#8594;</button>
          </>
        )}

        <div className="proj-card__overlay">
          <button className="proj-card__icon-btn" title="View details" onClick={e => { e.stopPropagation(); onOpen(project); }}>
            <SearchIcon />
          </button>
          {project.linkedin && (
            <button className="proj-card__icon-btn" title="LinkedIn post" onClick={e => { e.stopPropagation(); window.open(project.linkedin, '_blank'); }}>
              <LIIcon />
            </button>
          )}
        </div>
      </div>

      <div className="proj-card__body">
        <h3 className="proj-card__title">{project.title}</h3>
        <p className="proj-card__desc">{project.desc}</p>
        <div className="proj-card__stack">
          {project.stack.map(t => <span key={t} className="proj-card__tag">{t}</span>)}
        </div>
      </div>
    </article>
  );
}
