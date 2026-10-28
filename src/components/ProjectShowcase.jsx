// src/components/ProjectShowcase.jsx
import { useReveal } from '../hooks/useReveal';
import './ProjectShowcase.css';

export default function ProjectShowcase({ project, index = 0, isOpen, onToggle }) {
  const revealRef = useReveal();
  const reversed = index % 2 === 1;

  const allTags = project.status
    ? [...project.tags, project.status]
    : project.tags;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <article
      id={project.id}
      className={`showcase reveal hover-lift${reversed ? ' showcase-reversed' : ''}`}
      ref={revealRef}
      style={{ transitionDelay: `${Math.min(index, 4) * 90}ms` }}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-label={`${isOpen ? 'Hide' : 'Show'} details for ${project.title}`}
    >
      {!isOpen && (
        <div className="showcase-top">
          <div className="showcase-preview">
            <div className="showcase-preview-toolbar">
              <span className="showcase-preview-dot" />
              <span className="showcase-preview-dot" />
              <span className="showcase-preview-dot" />
              <span className="showcase-preview-label">
                {project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, '') : `${project.id}.json`}
              </span>
            </div>
            <pre className="showcase-preview-code">
              {JSON.stringify(
                {
                  stack: project.tags,
                  status: project.status,
                  role: project.role,
                  ...(project.period ? { period: project.period } : {}),
                },
                null,
                2
              )}
            </pre>
          </div>

          <div className="showcase-content">
            <div className="tag-row">
              {allTags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            <h3>{project.title}</h3>
            <p className="showcase-tagline">{project.tagline}</p>

            <span className="showcase-hint">
              How this was actually built
              <span className="chevron-inline" aria-hidden="true">⌄</span>
            </span>

            <div className="showcase-links">
              {project.liveUrl ? (
                <a
                  className="btn btn-primary"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Live site
                </a>
              ) : null}

              {project.repoUrl ? (
                <a
                  className="btn btn-ghost"
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Source
                </a>
              ) : null}

              {!project.liveUrl && !project.repoUrl ? (
                <span className="showcase-wip">Not public yet — ask me about it directly.</span>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="showcase-detail">
          <div className="showcase-detail-head">
            <h3>{project.title}</h3>
            <span className="showcase-close-hint">Click anywhere to close ✕</span>
          </div>

          <div className="showcase-banner">
            <div className="showcase-banner-toolbar">
              <span className="showcase-banner-dot" />
              <span className="showcase-banner-dot" />
              <span className="showcase-banner-dot" />
              <span className="showcase-banner-label">{project.id}.json</span>
            </div>
            <pre className="showcase-banner-code">
              {JSON.stringify(
                {
                  stack: project.tags,
                  status: project.status,
                  role: project.role,
                  ...(project.period ? { period: project.period } : {}),
                },
                null,
                2
              )}
            </pre>
          </div>

          <div className="showcase-description">
            <div className="showcase-description-block">
              <span className="showcase-description-label">The problem</span>
              <p>{project.problem}</p>
            </div>
            <div className="showcase-description-block">
              <span className="showcase-description-label">What I built</span>
              <p>{project.build}</p>
            </div>
            {project.challenge ? (
              <div className="showcase-description-block">
                <span className="showcase-description-label">The hard part</span>
                <p>{project.challenge}</p>
              </div>
            ) : null}
          </div>

          <div className="showcase-links">
            {project.liveUrl ? (
              <a
                className="btn btn-primary"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                Live site
              </a>
            ) : null}

            {project.repoUrl ? (
              <a
                className="btn btn-ghost"
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                Source
              </a>
            ) : null}

            {!project.liveUrl && !project.repoUrl ? (
              <span className="showcase-wip">Not public yet — ask me about it directly.</span>
            ) : null}
          </div>
        </div>
      )}
    </article>
  );
}