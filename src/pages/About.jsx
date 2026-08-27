// src/pages/About.jsx
import Timeline from '../components/Timeline';
import NowStatus from '../components/NowStatus';
import { useReveal } from '../hooks/useReveal';
import { useSEO } from '../hooks/useSEO';
import { aboutFacts, pageMeta, profile } from '../data/portfolio';
import './About.css';

export default function About() {
  const splitRef = useReveal();
  const factsRef = useReveal();
  useSEO(pageMeta.about.title, pageMeta.about.description);

  return (
    <>
      <header className="about-hero">
        <div className="wrap about-hero-grid">
          <div className="about-hero-text">
            <div className="eyebrow">About</div>
            <h1>{profile.name}</h1>
            <p className="about-role-tagline">{profile.roleTagline}</p>
            <p className="about-bio-line">{profile.bio}</p>
            <div className="about-status-row">
              <span>📍 {profile.location.replace(', Punjab', '')}</span>
              {profile.availableForWork && (
                <span className="about-status-open">
                  <span className="about-status-dot" />
                  Open to opportunities
                </span>
              )}
            </div>
          </div>
          <div className="about-photo-ring">
            <img src="/haseebio.dev.png" alt={profile.name} className="about-photo" width="400" height="400" />
          </div>
        </div>
      </header>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">The story so far</div>
            <h2>How I got here</h2>
          </div>
          <Timeline />
        </div>
      </section>

      <section>
        <div className="wrap about-split reveal" ref={splitRef}>
          <div>
            <div className="section-head">
              <div className="eyebrow">Right now</div>
              <h2>What I'm focused on today</h2>
            </div>
            <NowStatus />
          </div>
          <div>
            <div className="section-head">
              <div className="eyebrow">The unglamorous part</div>
              <h2>What I actually care about</h2>
            </div>
            <div className="care-card">
              <p className="care-text">
                I care about the parts most beginner portfolios skip: rate limiting, budget caps
                on AI calls, parameterized queries, CI pipelines, cold-start handling on free-tier
                hosting. The stuff that decides whether something actually works when someone
                besides me uses it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap reveal" ref={factsRef}>
          <div className="section-head">
            <div className="eyebrow">At a glance</div>
            <h2>The short version</h2>
          </div>
          <div className="fact-list">
            {aboutFacts.map((fact) => (
              <div className="fact" key={fact.label}>
                <span>{fact.label}</span>
                <span>{fact.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}