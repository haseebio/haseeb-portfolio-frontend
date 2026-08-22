// src/components/ProjectShowcase.jsx
import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import './ProjectShowcase.css';

export default function ProjectShowcase({ project, index = 0 }) {
  const [expanded, setExpanded] = useState(false);
  const revealRef = useReveal();

  const toggle = () => setExpanded((v) => !v);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <article
      id={project.id}
      className="showcase reveal hover-lift"
      ref={revealRef}
      style={{ transitionDelay: `${Math.min(index, 4) * 90}ms` }}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={`${expanded ? 'Hide' : 'Show'} details for ${project.title}`}
    >
      <div className="showcase-head">
        <span className="showcase-num">{project.num}</span>
        <div className="showcase-titles">
          <h3>{project.title}</h3>
          <p className="showcase-tagline">{project.tagline}</p>
        </div>
        <span className={`showcase-status status-${project.status === 'Live' ? 'live' : 'progress'}`}>
          {project.status}
        </span>
        <span className={`chevron${expanded ? ' open' : ''}`} aria-hidden="true">⌄</span>
      </div>

      <div className="tag-row">
        {project.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className="showcase-hint">
        {expanded ? 'Hide the details' : 'How this was actually built'}
        <span className={`chevron-inline${expanded ? ' open' : ''}`} aria-hidden="true">⌄</span>
      </div>

      {expanded && (
        <div className="showcase-detail">
          <div className="detail-block">
            <span className="detail-label">The problem</span>
            <p>{project.problem}</p>
          </div>
          <div className="detail-block">
            <span className="detail-label">What I built</span>
            <p>{project.build}</p>
          </div>
          {project.challenge && (
            <div className="detail-block">
              <span className="detail-label">The hard part</span>
              <p>{project.challenge}</p>
            </div>
          )}
        </div>
      )}

      <div className="showcase-links">
        {project.liveUrl && (
          <a
            className="btn btn-primary"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Live site →
          </a>
        )}
        {project.repoUrl && (
          <a
            className="btn btn-ghost"
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Source
          </a>
        )}
        {!project.liveUrl && !project.repoUrl && (
          <span className="showcase-wip">Not public yet — ask me about it directly.</span>
        )}
      </div>
    </article>
  );
}