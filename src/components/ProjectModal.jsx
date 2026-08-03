import React, { useEffect, useState, useRef } from 'react';
import './ProjectModal.css';

const GH = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>;

const CAT_LABELS = { fullstack: 'Full Stack', frontend: 'Frontend', backend: 'Backend' };

export default function ProjectModal({ project, onClose }) {
  const [slide, setSlide] = useState(0);
  const timerRef = useRef(null);
  const total = project.images?.length || 0;

  const next = () => setSlide(s => (s + 1) % Math.max(total, 1));
  const prev = () => setSlide(s => (s - 1 + Math.max(total, 1)) % Math.max(total, 1));

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 3500);
  };

  const handlePrev = (e) => { e.stopPropagation(); prev(); resetTimer(); };
  const handleNext = (e) => { e.stopPropagation(); next(); resetTimer(); };

  useEffect(() => {
    if (total > 1) {
      timerRef.current = setInterval(next, 3500);
    }
    return () => clearInterval(timerRef.current);
  }, [total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && total > 1) { next(); resetTimer(); }
      if (e.key === 'ArrowLeft'  && total > 1) { prev(); resetTimer(); }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, total]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }} role="dialog" aria-modal="true">
      <div className="modal-box">

        <div className="modal-img">
          <div className="modal-carousel">
            <div className="modal-slides" style={{ transform: `translateX(-${slide * 100}%)` }}>
              {total > 0
                ? project.images.map((img, i) => (
                    <div key={i} className="modal-slide">
                      <img src={img} alt={`${project.title} screenshot ${i + 1}`} />
                    </div>
                  ))
                : (
                  <div className="modal-slide modal-img-placeholder">
                    <span>{project.title} — screenshot</span>
                  </div>
                )
              }
            </div>

            {total > 1 && (
              <>
                <button className="modal-arrow modal-arrow--l" onClick={handlePrev} aria-label="Previous image">&#8592;</button>
                <button className="modal-arrow modal-arrow--r" onClick={handleNext} aria-label="Next image">&#8594;</button>
                <div className="modal-dots">
                  {project.images.map((_, i) => (
                    <button
                      key={i}
                      className={`modal-dot${i === slide ? ' active' : ''}`}
                      onClick={e => { e.stopPropagation(); setSlide(i); resetTimer(); }}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
                <span className="modal-counter">{slide + 1} / {total}</span>
              </>
            )}
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-top">
            <span className="modal-cat">{CAT_LABELS[project.category]}</span>
            <button className="modal-close" onClick={onClose} aria-label="Close">&#x2715;</button>
          </div>
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-desc">{project.desc}</p>
          <div className="modal-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="modal-link">
                <GH /> GitHub
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="modal-link modal-link--accent">
                Live demo ↗
              </a>
            )}
            {project.linkedin && (
              <a href={project.linkedin} target="_blank" rel="noreferrer" className="modal-link">
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
