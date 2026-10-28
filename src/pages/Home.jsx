// src/pages/Home.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import BuildPipeline from '../components/BuildPipeline';
import CapabilityMap from '../components/CapabilityMap';
import CoreCompetencies from '../components/CoreCompetencies';
import ProjectShowcase from '../components/ProjectShowcase';
import Typewriter from '../components/Typewriter';
import TypewriterHeadline from '../components/TypewriterHeadline';
import { heroCopy, principles, featuredProjects, profile, pageMeta } from '../data/portfolio';
import { useSEO } from '../hooks/useSEO';
import './Home.css';

export default function Home() {
  const featured = featuredProjects[0];
  const [roleDone, setRoleDone] = useState(false);
  useSEO(pageMeta.home.title, pageMeta.home.description);

  return (
    <>
      <header className="hero hero-centered">
        <div className="wrap">
          <div className="hero-photo-ring">
            <img src="/haseebio.dev.jpeg" alt={profile.name} className="hero-photo" width="400" height="400" fetchpriority="high" />
          </div>

          <p className="hero-role">
            <Typewriter
              text="Full Stack + AI Engineer"
              onDone={() => setTimeout(() => setRoleDone(true), 300)}
            />
          </p>

          <h1 className="hero-headline-centered">
            <TypewriterHeadline
              start={roleDone}
              segments={[
                { text: `${heroCopy.headline[0]} `, accent: false },
                { text: heroCopy.headline[1], accent: true },
              ]}
            />
          </h1>

          <div className="cta-row cta-row-large hero-cta-centered">
            <Link to="/projects" className="btn btn-primary">
              Explore what I've built →
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Let's connect
            </Link>
          </div>
        </div>
      </header>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">How I build</div>
            <h2>From idea to shipped product</h2>
          </div>
          <BuildPipeline />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">What I actually work with</div>
            <h2>Not a logo wall. A capability map.</h2>
          </div>
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

      {/* THE ONLY SPECIAL PART — 4 principles, each its own full-page panel,
          sticky-stacked so each one rises over the previous as you scroll. */}
      <section className="principles-scroll">
        {principles.map((item, i) => (
          <div key={item.title} className={`principle-panel principle-panel-${i + 1}`}>
            <div className="wrap principle-panel-inner">
              <span className="principle-panel-num">0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">What I've actually built</div>
            <h2>One to start with.</h2>
          </div>
          <ProjectShowcase project={featured} />
          <Link to="/projects" className="btn btn-ghost" style={{ marginTop: 8 }}>
            See everything →
          </Link>
        </div>
      </section>

      <section className="closing-cta">
        <div className="wrap closing-cta-inner">
          <h2>Got something you want built?</h2>
          <p>I'm open to freelance work and internships — reach out and let's talk about it.</p>
          <Link to="/contact" className="btn btn-primary">
            Get in touch →
          </Link>
          <div className="cta-trust-row">
            <span className="cta-trust-pill">📍 Lahore, Pakistan</span>
            <span className="cta-trust-pill">⚡ Usually replies within a day</span>
            <span className="cta-trust-pill">💼 Freelance & internships</span>
          </div>
        </div>
      </section>
    </>
  );
}