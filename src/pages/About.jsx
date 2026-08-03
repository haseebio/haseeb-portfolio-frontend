import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useReveal, useRevealGroup } from '../hooks/useReveal';
import { education, proficiency, stats } from '../data/portfolio';
import './About.css';

export default function About() {
  const headerRef    = useReveal();
  const storyRef     = useReveal();
  const eduRef       = useReveal();
  const profRef      = useReveal();
  const leaderGroup  = useRevealGroup();

  return (
    <>
      <SEOHead
        title="About Haseeb — MERN Stack Developer from Lahore Pakistan | Haseeb Portfolio"
        description="Learn about Muhammad Haseeb Ur Rehman — self-taught MERN Stack Developer from Lahore, Pakistan. CS student at University of the Punjab. Built 9+ real projects including live client work."
        keywords="about haseeb portfolio, Muhammad Haseeb Ur Rehman about, MERN Stack Developer Lahore, haseeb developer Pakistan"
        path="/about"
      />

      <main className="page-wrap about-page">
        <div className="container">

          {/* HEADER */}
          <header className="page-header reveal" ref={headerRef}>
            <span className="sec-eyebrow">About Me</span>
            <h1 className="sec-title">Who is <span>Haseeb?</span></h1>
            <p className="sec-sub">
              A self-taught MERN Stack Developer from Lahore, Pakistan — building real
              products since 2023.
            </p>
          </header>

          {/* STORY + INFO */}
          <div className="about-grid reveal" ref={storyRef}>
            <div className="card about-story">
              <h2>My Story</h2>
              <p>
                I'm a CS student at the University of the Punjab (2025–2029) who started coding
                because I wanted to build things — not just study theory. I taught myself MERN
                stack development independently, shipped 9+ real projects, and landed a live
                client website for Pluto Coffee &amp; Art in DHA Y-Block, Lahore.
              </p>
              <p>
                I believe in learning by shipping. Every project I build solves a real problem.
                Most recently I built Haseeb Shop — a production-ready full-stack e-commerce
                platform with JWT auth, role-based access, image uploads, and multi-currency
                support. Live on Vercel right now.
              </p>
              <p>
                I'm actively looking for internship and entry-level roles in Lahore where I can
                contribute to a real product in a professional team and keep growing fast.
              </p>

              <div className="about-info-grid">
                {[
                  { label: 'Name',     value: 'Muhammad Haseeb Ur Rehman' },
                  { label: 'Location', value: 'Lahore, Pakistan' },
                  { label: 'Email',    value: 'haseebur341@gmail.com', link: 'mailto:haseebur341@gmail.com' },
                  { label: 'Phone',    value: '0304-4170843', link: 'tel:03044170843' },
                  { label: 'Degree',   value: 'BS Computer Science (2025–2029)' },
                  { label: 'Status',   value: 'Available for hire', accent: true },
                ].map(i => (
                  <div key={i.label} className="about-info-item">
                    <span className="about-info-label">{i.label}</span>
                    {i.link
                      ? <a href={i.link} className={`about-info-val${i.accent ? ' accent' : ''}`}>{i.value}</a>
                      : <span className={`about-info-val${i.accent ? ' accent' : ''}`}>{i.value}</span>
                    }
                  </div>
                ))}
              </div>

              <div className="about-story-btns">
                <Link to="/contact" className="btn-primary">Let's Work Together →</Link>
                <a href="https://linkedin.com/in/muhammad-haseeb-ur-rehman" target="_blank" rel="noreferrer" className="btn-outline">LinkedIn ↗</a>
              </div>
            </div>

            <div className="about-right">
              {/* STATS */}
              <div className="about-stats">
                {stats.map(s => (
                  <div key={s.label} className="about-stat-card">
                    <span className="about-stat-num" style={{ color: s.color }}>{s.num}{s.suffix}</span>
                    <span className="about-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* PROFICIENCY */}
              <div className="card reveal" ref={profRef}>
                <h3>Proficiency</h3>
                <div className="prof-list">
                  {proficiency.map(p => (
                    <div key={p.label} className="prof-item">
                      <div className="prof-item__top">
                        <span>{p.label}</span><span>{p.pct}%</span>
                      </div>
                      <div className="prof-item__track">
                        <div className="prof-item__fill" style={{ width: `${p.pct}%`, background: p.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* EDUCATION */}
          <div className="about-edu-section reveal" ref={eduRef}>
            <span className="sec-eyebrow">Education</span>
            <h2 className="sec-title">Academic <span>Journey</span></h2>
            <div className="edu-timeline">
              {education.map((e, i) => (
                <div key={i} className="edu-item">
                  <div className="edu-item__dot">
                    <div className="edu-item__dot-inner" />
                  </div>
                  <div className="edu-item__content card">
                    <time className="edu-item__year">{e.year}</time>
                    <h3>{e.degree}</h3>
                    <p>{e.inst}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LEADERSHIP */}
          <div className="about-leadership reveal-group" ref={leaderGroup}>
            <span className="sec-eyebrow">Leadership</span>
            <h2 className="sec-title">Beyond <span>Code</span></h2>
            <div className="leadership-grid">
              {[
                {
                  icon: '🎯',
                  title: 'Event Coordinator',
                  desc: 'Managed event data, prepared structured reports, and coordinated operations across teams — handling information organisation and ensuring smooth execution of events.',
                },
                {
                  icon: '🎓',
                  title: 'Class Representative',
                  desc: 'Represented 25+ students as the primary liaison with faculty — communicated student concerns, coordinated schedules, and resolved academic issues throughout the semester.',
                },
              ].map(l => (
                <div key={l.title} className="card leadership-card reveal">
                  <span className="leadership-card__icon">{l.icon}</span>
                  <h3>{l.title}</h3>
                  <p>{l.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
