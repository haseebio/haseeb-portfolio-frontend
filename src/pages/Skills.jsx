// src/pages/Skills.jsx
import CapabilityMap from '../components/CapabilityMap';
import CoreCompetencies from '../components/CoreCompetencies';
import { useSEO } from '../hooks/useSEO';
import { pageMeta } from '../data/portfolio';
import './Skills.css';

export default function Skills() {
  useSEO(pageMeta.skills.title, pageMeta.skills.description);

  return (
    <>
      <header className="skills-hero">
        <div className="wrap">
          <div className="eyebrow">Stack</div>
          <h1>What I actually build with</h1>
          <p className="lead">
            Not a technology list. Pick a category to see what it's actually for and what I've
            used it on.
          </p>
        </div>
      </header>

      <section>
        <div className="wrap">
          <CapabilityMap />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Core competencies</div>
            <h2>What ties every project together</h2>
          </div>
          <CoreCompetencies />
        </div>
      </section>
    </>
  );
}