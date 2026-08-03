import React,{useState,useEffect} from 'react';
import{NavLink,useLocation}from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import'./Navbar.css';
const LINKS=[{to:'/',label:'Home'},{to:'/about',label:'About'},{to:'/skills',label:'Skills'},{to:'/projects',label:'Projects'},{to:'/contact',label:'Contact'}];
export default function Navbar(){
  const[scrolled,setScrolled]=useState(false);
  const[open,setOpen]=useState(false);
  const location=useLocation();
  const{theme,toggleTheme}=useTheme();
  useEffect(()=>{setOpen(false);},[location]);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>30);window.addEventListener('scroll',fn);return()=>window.removeEventListener('scroll',fn);},[]);
  useEffect(()=>{document.body.style.overflow=open?'hidden':'';return()=>{document.body.style.overflow='';};},[open]);
  return(
    <header className={`nav${scrolled?' nav--scrolled':''}`}>
      <div className="container nav__inner">
        <NavLink to="/" className="nav__logo">haseeb<span className="nav__logo-accent">.</span>dev</NavLink>
        <nav className="nav__links">
          {LINKS.map(l=>(<NavLink key={l.to} to={l.to} end={l.to==='/'} className={({isActive})=>`nav__link${isActive?' active':''}`}>{l.label}</NavLink>))}
        </nav>
        <div className="nav__right">
          <button className="nav__theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme==='light'?(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            ):(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
          <a href="https://www.linkedin.com/in/haseebio" target="_blank" rel="noreferrer" className="nav__hire btn-coral">Hire Me ↗</a>
          <button className={`nav__burger${open?' open':''}`} onClick={()=>setOpen(o=>!o)} aria-label="Toggle menu"><span/><span/><span/></button>
        </div>
      </div>
      <div className={`nav__mobile${open?' open':''}`}>
        <nav>
          {LINKS.map(l=>(<NavLink key={l.to} to={l.to} end={l.to==='/'} className={({isActive})=>`nav__mobile-link${isActive?' active':''}`}>{l.label}</NavLink>))}
          <button className="nav__theme-toggle nav__theme-toggle--mobile" onClick={toggleTheme}>{theme==='light'?'Dark mode':'Light mode'}</button>
          <a href="https://www.linkedin.com/in/haseebio" target="_blank" rel="noreferrer" className="btn-coral nav__mobile-hire">Hire Me ↗</a>
        </nav>
      </div>
    </header>
  );
}