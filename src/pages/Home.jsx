import React from 'react';
import{Link}from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import TechTicker from '../components/TechTicker';
import FloatingShapes from '../components/FloatingShapes';
import{useReveal,useRevealGroup}from '../hooks/useReveal';
import{useCountUp}from '../hooks/useCountUp';
import{useCursorGlow}from '../hooks/useCursorGlow';
import{stats,skills,projects,proficiency}from '../data/portfolio';
import'./Home.css';

function StatCard({stat}){
  const{ref,display}=useCountUp(stat.num,1600,stat.suffix);
  const content=(<><span className="stat-card__num" style={{color:stat.color}}>{display}</span><span className="stat-card__label">{stat.label}</span></>);
  if(stat.link){
    return(<Link to={stat.link} className="stat-card stat-card--link reveal" ref={ref}>{content}</Link>);
  }
  return(<div className="stat-card reveal" ref={ref}>{content}</div>);
}

export default function Home(){
  useCursorGlow();
  const heroRef=useReveal('reveal',0.05);
  const statsGroup=useRevealGroup();
  const aboutRef=useReveal();
  const skillsRef=useReveal();
  const projRef=useRevealGroup();
  const ctaRef=useReveal();
  const featured=projects.filter(p=>p.featured).slice(0,3);

  return(<>
    <SEOHead
      title="Haseeb Portfolio — MERN Stack Developer | Muhammad Haseeb Ur Rehman Lahore"
      description="Haseeb Portfolio — Muhammad Haseeb Ur Rehman is a self-taught MERN Stack Developer from Lahore, Pakistan. Expert in React.js, Node.js, Express.js, MongoDB. View projects and hire."
      keywords="Haseeb Portfolio,haseeb portfolio,MERN Stack Developer,Muhammad Haseeb Ur Rehman,React Developer Lahore Pakistan,Node.js Developer,Full Stack Developer Pakistan"
      path="/"
    />
    <main className="home">
      <section className="hero">
        <FloatingShapes/>
        <div className="container hero__inner">
          <div className="hero__content reveal" ref={heroRef}>
            <div className="hero__eyebrow"><span className="hero__dot"/>Hello There! — Available for hire</div>
            <h1 className="hero__title">I'm <span className="gradient-text">Muhammad Haseeb,</span><br/>MERN Stack Developer<br/><span className="hero__location">Based in Lahore, PK.</span></h1>
            <p className="hero__desc">Self-taught full-stack developer building production-ready web applications with React.js, Node.js, Express.js and MongoDB. Real projects, real clients, real results.</p>
            <div className="hero__btns">
              <Link to="/projects" className="btn-primary">View My Projects <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg></Link>
              <Link to="/contact" className="btn-ghost">Hire Me</Link>
            </div>
            <div className="hero__tags">{['React.js','Node.js','MongoDB','Express.js','REST APIs'].map(t=>(<span key={t} className="hero__tag">{t}</span>))}</div>
          </div>
          <div className="hero__visual">
            <div className="hero__img-wrap">
              <div className="hero__img-ring hero__img-ring--outer"/>
              <div className="hero__img-ring hero__img-ring--inner"/>
              <div className="hero__img-circle">
                <img src="/profile.jpg" alt="Muhammad Haseeb Ur Rehman — MERN Stack Developer" onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex';}}/>
                <div className="hero__img-fallback">MH</div>
              </div>
              <div className="hero__badge hero__badge--tl"><span>⚡</span> Full Stack Dev</div>
              <div className="hero__badge hero__badge--br"><span>🚀</span> Open to Work</div>
            </div>
          </div>
        </div>
      </section>

      <TechTicker/>

      <section className="home-stats">
        <div className="container home-stats__grid reveal-group" ref={statsGroup}>
          {stats.map(s=>(<StatCard key={s.label} stat={s}/>))}
        </div>
      </section>

      <section className="home-about">
        <div className="container home-about__inner">
          <div className="home-about__visual reveal-left" ref={aboutRef}>
            <div className="about-card-3d">
              <div className="about-card-3d__face">
                <div className="about-card-3d__img">
                  <img src="/profile.jpg" alt="Haseeb — MERN Stack Developer" onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex';}}/>
                  <div className="about-card-3d__fallback">MH</div>
                </div>
              </div>
              <div className="about-floating-chips">
                {['React.js','Node.js','MongoDB','Express','JWT'].map((c,i)=>(<span key={c} className="about-chip" style={{animationDelay:`${i*0.4}s`}}>{c}</span>))}
              </div>
            </div>
          </div>
          <div className="home-about__text reveal-right">
            <span className="sec-eyebrow">About Me</span>
            <h2 className="sec-title">Who is <span>Haseeb?</span></h2>
            <p>CS student at University of the Punjab (2025–2029) who taught himself MERN stack development independently. I've shipped 9+ real projects, including a production e-commerce platform that's live right now.</p>
            <p>I believe in learning by building. Every line of code I write solves a real problem.</p>
            <div className="home-prof">
              {proficiency.map(p=>(<div key={p.label} className="home-prof__row">
                <div className="home-prof__label"><span>{p.label}</span><span>{p.pct}%</span></div>
                <div className="home-prof__track"><div className="home-prof__fill" style={{width:`${p.pct}%`,background:p.color}}/></div>
              </div>))}
            </div>
            <div className="home-about__btns">
              <Link to="/about" className="btn-primary">Read More →</Link>
              <a href="mailto:haseebur341@gmail.com" className="btn-outline">Get In Touch</a>
            </div>
          </div>
        </div>
      </section>

      <section className="home-skills">
        <div className="container">
          <div className="home-skills__header reveal" ref={skillsRef}>
            <div><span className="sec-eyebrow">Tech Stack</span><h2 className="sec-title">Tools I <span>Work With</span></h2></div>
            <Link to="/skills" className="btn-outline">View All Skills →</Link>
          </div>
          <div className="home-skills__grid">
            {skills.proficient.map((s,i)=>(<div key={s.name} className="skill-chip reveal" style={{transitionDelay:`${i*40}ms`}}>
              <span className="skill-chip__icon" style={{background:s.bg,color:s.color}}>{s.icon}</span>
              <span className="skill-chip__name">{s.name}</span>
            </div>))}
          </div>
        </div>
      </section>

      <section className="home-projects">
        <div className="container">
          <div className="home-projects__header reveal">
            <div><span className="sec-eyebrow">Projects</span><h2 className="sec-title">Things I've <span>Built</span></h2><p className="sec-sub">Real projects, live deployments — and many more on GitHub.</p></div>
            <Link to="/projects" className="btn-outline">View All Projects →</Link>
          </div>
          <div className="home-projects__grid reveal-group" ref={projRef}>
            {featured.map(p=>(<div key={p.id} className="home-proj-card reveal">
              <div className="home-proj-card__img">
                {p.images?.[0]?<img src={p.images[0].src} alt={p.title}/>:<div className="home-proj-card__ph"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg></div>}
                <div className="home-proj-card__overlay"><Link to="/projects" className="home-proj-card__btn">View Project →</Link></div>
              </div>
              <div className="home-proj-card__body">
                <span className="home-proj-card__eyebrow">{p.tagline}</span>
                <h3>{p.title}</h3>
                <div className="home-proj-card__stack">{p.stack.slice(0,4).map(t=>(<span key={t}>{t}</span>))}</div>
              </div>
            </div>))}
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="home-cta__shapes" aria-hidden="true"><div className="home-cta__orb home-cta__orb--1"/><div className="home-cta__orb home-cta__orb--2"/></div>
        <div className="container home-cta__inner reveal" ref={ctaRef}>
          <span className="sec-eyebrow" style={{color:'rgba(255,255,255,0.7)'}}>Contact</span>
          <h2 className="home-cta__title">Let's <span>Work</span><br/>Together.</h2>
          <p className="home-cta__sub">Open to internships, freelance projects, and full-time roles in Lahore. Let's build something great.</p>
          <div className="home-cta__btns">
            <Link to="/contact" className="btn-coral">Get In Touch <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg></Link>
            <a href="https://github.com/haseebio" target="_blank" rel="noreferrer" className="btn-ghost" style={{borderColor:'rgba(255,255,255,0.3)',color:'rgba(255,255,255,0.8)'}}>View GitHub ↗</a>
          </div>
        </div>
      </section>
    </main>
  </>);
}