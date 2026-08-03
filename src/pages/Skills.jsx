import React from 'react';
import SEOHead from '../components/SEOHead';
import { useReveal, useRevealGroup } from '../hooks/useReveal';
import { skills } from '../data/portfolio';
import './Skills.css';

const GROUPS = [
  { key: 'proficient', label: 'Proficient',        sub: 'Technologies I use every day',  dot: '#4F46E5' },
  { key: 'familiar',   label: 'Familiar',           sub: 'Tools I work with regularly',   dot: '#F97316' },
  { key: 'learning',   label: 'Currently Learning', sub: "What I'm building towards",     dot: '#10B981' },
];

function SkillGroup({ group }) {
  const ref = useRevealGroup();
  return (
    <div className="skills-group reveal-group" ref={ref}>
      <div className="skills-group__header reveal">
        <div className="skills-group__dot" style={{ background: group.dot, boxShadow: `0 0 0 4px ${group.dot}22` }} />
        <div>
          <h2>{group.label}</h2>
          <p>{group.sub}</p>
        </div>
        <span className="skills-group__count">{skills[group.key].length} skills</span>
      </div>
      <div className="skills-grid">
        {skills[group.key].map((s, i) => (
          <div key={s.name} className="skill-pill reveal" style={{ transitionDelay: `${i * 50}ms` }}>
            <div className="skill-pill__icon" style={{ background: s.bg, color: s.color }}>
              {s.icon}
            </div>
            <span className="skill-pill__name">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const headerRef = useReveal();

  return (
    <>
      <SEOHead
        title="Skills — Haseeb Portfolio | MERN Stack Developer Tech Stack"
        description="Explore the technical skills of Haseeb Portfolio — React.js, Node.js, Express.js, MongoDB, JWT, Socket.io, REST APIs and more. Full-stack JavaScript developer from Lahore, Pakistan."
        keywords="haseeb portfolio skills, MERN stack skills, React.js Node.js MongoDB developer, JavaScript developer skills Lahore"
        path="/skills"
      />

      <main className="page-wrap skills-page">
        <div className="container">
          <header className="page-header reveal" ref={headerRef}>
            <span className="sec-eyebrow">Tech Stack</span>
            <h1 className="sec-title">Languages <span>&amp; Tools</span></h1>
            <p className="sec-sub">
              Technologies I use daily, tools I'm growing with, and what I'm learning next.
              All self-taught, all battle-tested in real projects.
            </p>
          </header>

          <div className="skills-page__content">
            {GROUPS.map(g => <SkillGroup key={g.key} group={g} />)}
          </div>

          {/* 3D LEARNING BANNER */}
          <div className="skills-banner reveal">
            <div className="skills-banner__shapes" aria-hidden="true">
              <div className="skills-banner__cube" />
              <div className="skills-banner__sphere" />
              <div className="skills-banner__ring" />
            </div>
            <div className="skills-banner__content">
              <h2>Always Learning, Always Building</h2>
              <p>
                Every skill I list here was learned by building a real project with it.
                No tutorial hell — just production code and real problem solving.
              </p>
              <a href="https://github.com/haseebcodess" target="_blank" rel="noreferrer" className="btn-coral">
                See Projects on GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
