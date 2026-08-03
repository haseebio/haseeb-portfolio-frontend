import React from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { skills, projects } from '../data/portfolio';
import profileImg from '../assets/profile.webp';
import SEO from '../components/SEO';
import './Home.css';

function Section({ children, className = '' }) {
  const ref = useReveal();
  return <div className={`reveal ${className}`} ref={ref}>{children}</div>;
}

export default function Home() {
  const heroRef = useReveal(0.05);

  const featuredProjects = projects.filter(p => p.category === 'fullstack').slice(0, 3);
  const proficientSkills = skills.proficient.slice(0, 8);

  return (
    <main className="home">
      <SEO
        title="Muhammad Haseeb Ur Rehman | MERN Stack Developer Lahore"
        description="Self-taught MERN Stack Developer from Lahore, Pakistan. Building full-stack web apps with React, Node.js, Express and MongoDB. Available for freelance and internships."
        path="/"
        keywords="haseeb portfolio, portfolio, haseeb codess, haseeb codess portfolio, freelancer, MERN stack developer Lahore, full stack developer Lahore, freelance web developer"
      />

      {/* HERO */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content reveal" ref={heroRef}>
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              Available for hire · Lahore, Pakistan
            </div>
            <h1 className="hero__name">
              Muhammad<br />
              <span>Haseeb</span> Ur Rehman
            </h1>
            <p className="hero__role">// MERN Stack Developer</p>
            <p className="hero__desc">
              I build full-stack web applications that solve real problems — clean React
              frontends, robust Node.js backends, and real client projects shipped.
            </p>
            <div className="hero__btns">
              <Link to="/contact" className="btn-hero-primary">
                Contact me
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
              </Link>
              <Link to="/projects" className="btn-hero-secondary">View projects</Link>
            </div>
          </div>
          <div className="hero__image-wrap">
            <div className="hero__image-ring">
              <img
                src={profileImg}
                alt="Muhammad Haseeb Ur Rehman"
                className="hero__image"
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <div className="hero__image-fallback">MH</div>
            </div>
            <div className="hero__open-badge">
              <span className="hero__badge-dot" />
              Open to work
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <Section className="home__stats-wrap">
        <div className="container home__stats-inner">
          {[
            { num: '8+',   label: 'Projects built'   },
            { num: '3',    label: 'Live deployments' },
            { num: '1',    label: 'Client project'   },
            { num: 'Full', label: 'Stack capable'    },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <span className="stat-card__num">{s.num}</span>
              <span className="stat-card__label">{s.label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ABOUT PREVIEW */}
      <Section>
        <section className="home-section">
          <div className="container">
            <div className="home-about">
              <div className="home-about__text">
                <span className="sec-label">// about me</span>
                <h2 className="home-section__title">Who I am</h2>
                <p>
                  CS student at the University of the Punjab (2025–2029) who taught himself
                  MERN stack development independently. I shipped multiple live projects and
                  landed a real client website for Pluto Coffee &amp; Art in Lahore. I believe
                  in learning by building — every project I make solves a real problem.
                </p>
                <div className="home-about__facts">
                  {[
                    { label: 'Location', val: 'Lahore, Pakistan' },
                    { label: 'Degree',   val: 'BS Computer Science (2025–2029)' },
                    { label: 'Email',    val: 'haseebur341@gmail.com' },
                    { label: 'Status',   val: 'Available for hire', accent: true },
                  ].map(f => (
                    <div key={f.label} className="home-about__fact">
                      <span className="home-about__fact-label">{f.label}</span>
                      <span className={`home-about__fact-val${f.accent ? ' accent' : ''}`}>{f.val}</span>
                    </div>
                  ))}
                </div>
                <Link to="/about" className="btn-primary">Read more →</Link>
              </div>
              <div className="home-about__prof">
                <h3>Proficiency</h3>
                {[
                  { label: 'React.js',          pct: 82 },
                  { label: 'JavaScript ES6+',   pct: 80 },
                  { label: 'HTML5 / CSS3',      pct: 88 },
                  { label: 'Node.js / Express', pct: 68 },
                  { label: 'MongoDB',           pct: 62 },
                ].map(p => (
                  <div key={p.label} className="prof-row">
                    <div className="prof-row__top">
                      <span>{p.label}</span><span>{p.pct}%</span>
                    </div>
                    <div className="prof-row__track">
                      <div className="prof-row__fill" style={{ width: `${p.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Section>

      {/* SKILLS PREVIEW */}
      <Section>
        <section className="home-section home-section--alt">
          <div className="container">
            <span className="sec-label">// tech stack</span>
            <h2 className="home-section__title">Languages & Tools</h2>
            <p className="home-section__sub">A snapshot of what I work with daily.</p>
            <div className="home-skills">
              {proficientSkills.map(s => (
                <div key={s.name} className="home-skill-pill">
                  <span className="home-skill-pill__icon" style={{ background: s.iconBg, color: s.iconColor }}>{s.icon}</span>
                  <span>{s.name}</span>
                </div>
              ))}
            </div>
            <Link to="/skills" className="btn-outline home-section__cta">View all skills →</Link>
          </div>
        </section>
      </Section>

      {/* PROJECTS PREVIEW */}
      <Section>
        <section className="home-section">
          <div className="container">
            <span className="sec-label">// projects</span>
            <h2 className="home-section__title">Things I've built</h2>
            <p className="home-section__sub">Real projects, live deployments — and many more on GitHub.</p>
            <div className="home-projects">
              {featuredProjects.map(p => (
                <div key={p.id} className="home-proj-card">
                  <div className="home-proj-card__img">
                    <span className="home-proj-card__cat">{p.category === 'fullstack' ? 'Full Stack' : p.category}</span>
                    {p.images?.[0]
                      ? <img src={p.images[0]} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', display:'block' }} />
                      : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>
                    }
                  </div>
                  <div className="home-proj-card__body">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="home-proj-card__stack">
                      {p.stack.slice(0, 4).map(t => <span key={t}>{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="home-section__actions">
              <Link to="/projects" className="btn-primary">View all projects →</Link>
              <a href="https://github.com/haseebcodess" target="_blank" rel="noreferrer" className="btn-outline">GitHub ↗</a>
            </div>
          </div>
        </section>
      </Section>

      {/* CONTACT CTA */}
      <Section>
        <section className="home-cta">
          <div className="container home-cta__inner">
            <div>
              <span className="sec-label" style={{ color: '#7DD3FC' }}>// contact</span>
              <h2 className="home-cta__title">Let's work together</h2>
              <p className="home-cta__sub">Open to internships, freelance projects, and full-time roles in Lahore.</p>
            </div>
            <div className="home-cta__btns">
              <Link to="/contact" className="btn-hero-primary">Contact me →</Link>
              <a href="https://linkedin.com/in/muhammad-haseeb-ur-rehman" target="_blank" rel="noreferrer" className="btn-hero-secondary">LinkedIn ↗</a>
            </div>
          </div>
        </section>
      </Section>

    </main>
  );
}
