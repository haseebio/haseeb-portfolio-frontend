import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { education, proficiency } from '../data/portfolio';
import SEO from '../components/SEO';
import './About.css';

export default function About() {
  const r1 = useReveal(); const r2 = useReveal(); const r3 = useReveal();

  return (
    <main className="page-wrap">
      <SEO
        title="About | Muhammad Haseeb Ur Rehman"
        description="Learn about Muhammad Haseeb Ur Rehman — a self-taught MERN Stack Developer from Lahore, Pakistan studying CS at University of the Punjab."
        path="/about"
        keywords="about haseeb portfolio, haseeb portfolio, haseeb codess, haseeb codess portfolio, freelancer, self-taught MERN stack developer Lahore"
      />
      <div className="container">
        <header className="page-header reveal" ref={r1}>
          <span className="sec-label">// about me</span>
          <h1 className="sec-title">Who I am</h1>
          <p className="sec-sub">Background, education, and what drives me to build.</p>
        </header>

        <div className="about__grid reveal" ref={r2}>
          <div className="card about__story">
            <h2>My story</h2>
            <p>
              I'm a CS student at the University of the Punjab (2025–2029) who started
              coding because I wanted to build things — not just study theory. I taught
              myself MERN stack development independently, shipped multiple projects, and
              landed a real client website for Pluto Coffee &amp; Art in Lahore.
            </p>
            <p>
              I believe in learning by shipping. Every project I build solves a real problem.
              I'm actively seeking internship and entry-level roles in Lahore where I can
              contribute to a real product in a professional team.
            </p>
            <div className="about__info-grid">
              {[
                { label: 'Location', value: 'Lahore, Pakistan' },
                { label: 'Email',    value: 'haseebur341@gmail.com', link: 'mailto:haseebur341@gmail.com' },
                { label: 'Phone',    value: '0304-4170843' },
                { label: 'Status',   value: 'Available for hire', accent: true },
              ].map(i => (
                <div key={i.label} className="about__info-item">
                  <span className="about__info-label">{i.label}</span>
                  {i.link
                    ? <a href={i.link} className={`about__info-val${i.accent ? ' accent' : ''}`}>{i.value}</a>
                    : <span className={`about__info-val${i.accent ? ' accent' : ''}`}>{i.value}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          <div className="about__right">
            <div className="card about__edu">
              <h2>Education</h2>
              {education.map((e, i) => (
                <div key={i} className="edu-row">
                  <span className="edu-dot" />
                  <div>
                    <strong>{e.degree}</strong>
                    <span>{e.inst}</span>
                    <time>{e.year}</time>
                  </div>
                </div>
              ))}
            </div>

            <div className="card about__prof">
              <h2>Proficiency</h2>
              {proficiency.map(p => (
                <div key={p.label} className="prof-bar">
                  <div className="prof-bar__top">
                    <span>{p.label}</span>
                    <span>{p.pct}%</span>
                  </div>
                  <div className="prof-bar__track">
                    <div className="prof-bar__fill" style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="about__leadership reveal" ref={r3}>
          <h2>Leadership</h2>
          <div className="leadership__grid">
            {[
              { title: 'Event Coordinator', desc: 'Managed event data, prepared structured reports, and coordinated operations across teams — handling information organisation and ensuring smooth execution.' },
              { title: 'Class Representative', desc: 'Represented 25+ students as the primary liaison with faculty — communicated student concerns, coordinated schedules, and resolved academic issues throughout the semester.' },
            ].map(l => (
              <div key={l.title} className="card leadership__card">
                <h3>{l.title}</h3>
                <p>{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
