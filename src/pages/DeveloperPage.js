import React from 'react';
import useSEO from '../hooks/useSEO';

const PROFILES = [
  { label:'GitHub', icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', url:'https://github.com/haseebcodess', color:'#24292e', desc:'Open source projects & code' },
  { label:'LinkedIn', icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg', url:'https://www.linkedin.com/in/muhammad-haseeb-ur-rehman', color:'#0077b5', desc:'Professional network' },
  { label:'Portfolio', icon:null, emoji:'🌐', url:'https://haseeb-codess-portfolio.netlify.app/', color:'#2563ff', desc:'Projects & case studies' },
  { label:'Facebook', icon:null, emoji:'📘', url:'https://www.facebook.com/haseebcodes', color:'#1877f2', desc:'Connect on Facebook' },
  { label:'Twitter / X', icon:null, emoji:'🐦', url:'https://www.twitter.com/haseebcodesss', color:'#000', desc:'Thoughts & updates' },
];

const SKILLS = [
  { name:'React.js', level:90 }, { name:'Node.js', level:85 },
  { name:'Express.js', level:85 }, { name:'MongoDB', level:80 },
  { name:'JWT Auth', level:85 }, { name:'Cloudinary', level:75 },
  { name:'REST API', level:90 }, { name:'MVC Architecture', level:85 },
  { name:'Vercel / Render', level:80 }, { name:'Git & GitHub', level:85 },
];

const DeveloperPage = () => {
  useSEO({ title:'Developer', description:'Meet Muhammad Haseeb — the developer behind Haseeb Shop. Full-stack developer skilled in React, Node.js, MongoDB, and modern web technologies.', keywords:'haseeb developer, full stack developer, react developer, nodejs developer, mern stack' });

  return (
    <div style={{ background:'#f5f5fa', minHeight:'100vh' }}>

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#1a1a2e 0%,#16213e 55%,#0f3460 100%)', padding:'80px 32px 64px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(37,99,255,0.2),transparent)', top:'-120px', right:'-60px', pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none' }} />

        <div style={{ maxWidth:900, margin:'0 auto', position:'relative', zIndex:1, display:'grid', gridTemplateColumns:'auto 1fr', gap:48, alignItems:'center' }}>
          {/* Avatar */}
          <div style={{ position:'relative' }}>
            <div style={{ width:140, height:140, borderRadius:'50%', background:'linear-gradient(135deg,#2563ff,#7c3aed)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:52, fontWeight:900, color:'#fff', boxShadow:'0 0 0 4px rgba(37,99,255,0.3), 0 0 0 8px rgba(37,99,255,0.1), 0 20px 40px rgba(0,0,0,0.4)' }}>H</div>
            <div style={{ position:'absolute', bottom:6, right:6, width:24, height:24, borderRadius:'50%', background:'#22c55e', border:'3px solid #1a1a2e', boxShadow:'0 2px 6px rgba(0,0,0,0.3)' }}></div>
          </div>
          {/* Info */}
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'4px 12px', borderRadius:20, background:'rgba(37,99,255,0.2)', border:'1px solid rgba(37,99,255,0.35)', marginBottom:16 }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'#22c55e', display:'inline-block' }}></span>
              <span style={{ fontSize:11, color:'#93c5fd', fontWeight:600, letterSpacing:'0.07em' }}>AVAILABLE FOR WORK</span>
            </div>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:42, fontWeight:400, color:'#fff', lineHeight:1.15, marginBottom:10, letterSpacing:'-0.01em' }}>
              Muhammad<br /><span style={{ fontStyle:'italic', color:'#60a5fa' }}>Haseeb</span>
            </h1>
            <p style={{ fontSize:16, color:'rgba(255,255,255,0.55)', marginBottom:20 }}>Full-Stack Developer · MERN Stack · Open to Opportunities</p>
            <p style={{ fontSize:14, color:'rgba(255,255,255,0.45)', lineHeight:1.75, maxWidth:480 }}>
              I build production-ready web applications with clean architecture, real-world deployment, and modern UI/UX. Haseeb Shop is one of my flagship projects — a full-stack e-commerce platform built from scratch and deployed live.
            </p>
          </div>
        </div>
      </div>

      {/* Profile Links */}
      <div style={{ background:'#fff', borderBottom:'1px solid var(--border)', padding:'48px 32px' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <div style={{ marginBottom:28 }}>
            <div className="section-tag">Connect</div>
            <h2 style={{ fontSize:24, fontWeight:700, color:'var(--text)', letterSpacing:'-0.02em' }}>Find me online</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:14 }}>
            {PROFILES.map(p => (
              <a key={p.label} href={p.url} target="_blank" rel="noreferrer" style={{ textDecoration:'none' }}>
                <div className="card" style={{ padding:'20px 18px', display:'flex', flexDirection:'column', gap:12, cursor:'pointer', transition:'all 0.2s', borderTop:`3px solid ${p.color}` }}>
                  <div style={{ width:38, height:38, borderRadius:9, background:`${p.color}15`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {p.icon ? (
                      <img src={p.icon} alt={p.label} style={{ width:22, height:22, objectFit:'contain' }} />
                    ) : (
                      <span style={{ fontSize:20 }}>{p.emoji}</span>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color:'var(--text)', marginBottom:3 }}>{p.label}</div>
                    <div style={{ fontSize:11, color:'var(--text4)' }}>{p.desc}</div>
                  </div>
                  <div style={{ fontSize:12, color:p.color, fontWeight:600 }}>Visit →</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div style={{ padding:'48px 32px', background:'#f5f5fa' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <div style={{ marginBottom:28 }}>
            <div className="section-tag">Skills</div>
            <h2 style={{ fontSize:24, fontWeight:700, color:'var(--text)', letterSpacing:'-0.02em' }}>Technical expertise</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            {SKILLS.map(s => (
              <div key={s.name} style={{ background:'#fff', borderRadius:12, padding:'16px 18px', border:'1px solid var(--border)', boxShadow:'var(--shadow-xs)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                  <span style={{ fontSize:14, fontWeight:600, color:'var(--text)' }}>{s.name}</span>
                  <span style={{ fontSize:12, fontWeight:700, color:'var(--blue)' }}>{s.level}%</span>
                </div>
                <div style={{ height:6, background:'var(--border2)', borderRadius:4, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${s.level}%`, background:'linear-gradient(90deg,#2563ff,#7c3aed)', borderRadius:4, transition:'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Highlight */}
      <div style={{ padding:'48px 32px', background:'#fff', borderTop:'1px solid var(--border)' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <div style={{ marginBottom:28 }}>
            <div className="section-tag">Featured Project</div>
            <h2 style={{ fontSize:24, fontWeight:700, color:'var(--text)', letterSpacing:'-0.02em' }}>Haseeb Shop</h2>
          </div>
          <div style={{ background:'linear-gradient(135deg,#f0f4ff,#faf5ff)', border:'1px solid rgba(37,99,255,0.15)', borderRadius:16, padding:32, display:'grid', gridTemplateColumns:'1fr auto', gap:32, alignItems:'start' }}>
            <div>
              <p style={{ fontSize:15, color:'var(--text2)', lineHeight:1.75, marginBottom:20 }}>
                A production-grade full-stack e-commerce platform built with the MERN stack. Features role-based authentication, product CRUD with cloud image upload via Cloudinary, multi-currency support (USD, PKR, JPY, CNY, EUR, GBP), SEO optimization, and full deployment on Vercel and Render.
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:24 }}>
                {['React.js','Node.js','MongoDB','Express','JWT','Cloudinary','Vercel','Render'].map(t => (
                  <span key={t} style={{ padding:'4px 12px', borderRadius:20, background:'var(--blue-pale)', color:'var(--blue)', fontSize:12, fontWeight:600, border:'1px solid rgba(37,99,255,0.15)' }}>{t}</span>
                ))}
              </div>
              <div style={{ display:'flex', gap:12 }}>
                <a href="https://haseeb-shop.vercel.app" target="_blank" rel="noreferrer">
                  <button className="btn-primary" style={{ fontSize:13 }}>Live Demo →</button>
                </a>
                <a href="https://github.com/haseebcodess/Haseeb-shop" target="_blank" rel="noreferrer">
                  <button className="btn-ghost" style={{ fontSize:13 }}>GitHub Repo</button>
                </a>
              </div>
            </div>
            <div style={{ background:'#fff', borderRadius:12, padding:20, border:'1px solid var(--border)', minWidth:200, boxShadow:'var(--shadow-sm)' }}>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {[{l:'Live URL',v:'haseeb-shop.vercel.app'},{l:'Backend',v:'Render.com'},{l:'Database',v:'MongoDB Atlas'},{l:'Images',v:'Cloudinary CDN'},{l:'Auth',v:'JWT + bcrypt'},{l:'Status',v:'✅ Live'}].map(i => (
                  <div key={i.l} style={{ borderBottom:'1px solid var(--border2)', paddingBottom:10 }}>
                    <div style={{ fontSize:10, color:'var(--text4)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>{i.l}</div>
                    <div style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{i.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding:'48px 32px', background:'linear-gradient(135deg,#1a1a2e,#0f3460)' }}>
        <div style={{ maxWidth:600, margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:32, fontWeight:400, color:'#fff', marginBottom:12 }}>Let's work together</h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:14, marginBottom:28 }}>Looking for a passionate full-stack developer? Reach out through any of my profiles above.</p>
          <a href="https://haseeb-codess-portfolio.netlify.app/" target="_blank" rel="noreferrer">
            <button style={{ background:'#fff', color:'var(--blue)', border:'none', padding:'13px 32px', borderRadius:8, fontSize:15, fontWeight:700, cursor:'pointer', boxShadow:'0 4px 20px rgba(0,0,0,0.3)' }}>View Full Portfolio</button>
          </a>
        </div>
      </div>
    </div>
  );
};
export default DeveloperPage;
