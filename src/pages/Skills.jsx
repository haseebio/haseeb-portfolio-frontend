import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { skills } from '../data/portfolio';
import SEO from '../components/SEO';
import './Skills.css';

function SkillPill({ skill }) {
  return (
    <div className="skill-pill">
      <span className="skill-pill__icon" style={{ background: skill.iconBg, color: skill.iconColor }}>
        {skill.icon}
      </span>
      <span className="skill-pill__name">{skill.name}</span>
    </div>
  );
}

const GROUPS = [
  { key: 'proficient', label: 'Proficient — use daily', dotColor: '#1A56DB' },
  { key: 'familiar',   label: 'Familiar — growing',     dotColor: '#F59E0B' },
  { key: 'learning',   label: 'Currently learning',     dotColor: '#8B5CF6' },
];

function SkillGroup({ group }) {
  const ref = useReveal();
  return (
    <div className="skills__group reveal" ref={ref}>
      <div className="skills__group-header">
        <span className="skills__dot" style={{ background: group.dotColor, boxShadow: `0 0 0 3px ${group.dotColor}28` }} />
        <h2>{group.label}</h2>
        <span className="skills__count">{skills[group.key].length}</span>
      </div>
      <div className="skills__pills">
        {skills[group.key].map(s => <SkillPill key={s.name} skill={s} />)}
      </div>
    </div>
  );
}

export default function Skills() {
  const headerRef = useReveal();
  return (
    <main className="page-wrap">
      <SEO
        title="Skills | React, Node.js, MongoDB — Haseeb Developer"
        description="Technical skills of Muhammad Haseeb Ur Rehman — React.js, Node.js, Express.js, MongoDB, JavaScript, HTML5, CSS3, REST APIs, Git and more."
        path="/skills"
        keywords="haseeb portfolio, haseeb codess portfolio, freelancer developer skills, MERN stack skills, React developer skills, portfolio skills"
      />
      <div className="container">
        <header className="page-header reveal" ref={headerRef}>
          <span className="sec-label">// tech stack</span>
          <h1 className="sec-title">Languages & Tools</h1>
          <p className="sec-sub">Technologies I use daily, tools I'm growing with, and what's next.</p>
        </header>
        {GROUPS.map(g => <SkillGroup key={g.key} group={g} />)}
      </div>
    </main>
  );
}
