// src/pages/Projects.jsx
import { useState } from 'react';
import ProjectShowcase from '../components/ProjectShowcase';
import { useSEO } from '../hooks/useSEO';
import { featuredProjects, otherProjects, pageMeta } from '../data/portfolio';
import './Projects.css';

export default function Projects() {
  useSEO(pageMeta.projects.title, pageMeta.projects.description);
  const [openId, setOpenId] = useState(null);

  const toggleProject = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <>
      <header className="projects-hero">
        <div className="wrap">
          <div className="eyebrow">Work</div>
          <h1>Things I've built</h1>
          <p className="lead">
            Real projects, real backends — not mockups.
          </p>
        </div>
      </header>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Highlighted</div>
            <h2>The three I'd show first</h2>
          </div>
          {featuredProjects.map((project, i) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              index={i}
              isOpen={openId === project.id}
              onToggle={() => toggleProject(project.id)}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Also built</div>
            <h2>Smaller, still real</h2>
          </div>
          {otherProjects.map((project, i) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              index={i}
              isOpen={openId === project.id}
              onToggle={() => toggleProject(project.id)}
            />
          ))}
        </div>
      </section>
    </>
  );
}