import React,{useState,useEffect,useRef} from 'react';
import'./ProjectCard.css';
const CAT={fullstack:'Full Stack',frontend:'Frontend',backend:'Backend'};
export default function ProjectCard({project,onOpen,featured}){
  const[slide,setSlide]=useState(0);
  const timerRef=useRef(null);
  const total=project.images?.length||0;
  const next=()=>setSlide(s=>(s+1)%Math.max(total,1));
  const prev=()=>setSlide(s=>(s-1+Math.max(total,1))%Math.max(total,1));
  useEffect(()=>{if(total<=1)return;timerRef.current=setInterval(next,3000);return()=>clearInterval(timerRef.current);},[total]);
  const reset=()=>{clearInterval(timerRef.current);timerRef.current=setInterval(next,3000);};
  return(
    <article className={`pcard${featured?' pcard--featured':''}`} onClick={()=>onOpen(project)}>
      <div className="pcard__img">
        <div className="pcard__slides" style={{transform:`translateX(-${slide*100}%)`}}>
          {total>0?project.images.map((img,i)=>(<div key={i} className="pcard__slide"><img src={img.src} alt={img.label||project.title}/></div>)):(
            <div className="pcard__slide pcard__placeholder">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>
              <span>Add screenshot</span>
            </div>
          )}
        </div>
        <div className="pcard__badges">
          <span className="pcard__cat">{CAT[project.category]}</span>
          {project.featured&&<span className="pcard__feat">Featured</span>}
        </div>
        {total>1&&(<div className="pcard__arrows">
          <button className="pcard__arr" onClick={e=>{e.stopPropagation();prev();reset();}}>‹</button>
          <button className="pcard__arr" onClick={e=>{e.stopPropagation();next();reset();}}>›</button>
        </div>)}
        <div className="pcard__overlay">
          <button className="pcard__icon" onClick={e=>{e.stopPropagation();onOpen(project);}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          {project.linkedin&&(<button className="pcard__icon" onClick={e=>{e.stopPropagation();window.open(project.linkedin,'_blank');}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
          </button>)}
        </div>
      </div>
      <div className="pcard__body">
        <p className="pcard__tagline">{project.tagline}</p>
        <h3 className="pcard__title">{project.title}</h3>
        <p className="pcard__desc">{project.desc}</p>
        <div className="pcard__stack">
          {project.stack.slice(0,5).map(t=>(<span key={t} className="pcard__tag">{t}</span>))}
          {project.stack.length>5&&<span className="pcard__tag pcard__tag--more">+{project.stack.length-5}</span>}
        </div>
        <div className="pcard__links">
          {project.github&&(<a href={project.github} target="_blank" rel="noreferrer" className="pcard__link" onClick={e=>e.stopPropagation()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>GitHub
          </a>)}
          {project.demo&&(<a href={project.demo} target="_blank" rel="noreferrer" className="pcard__link pcard__link--accent" onClick={e=>e.stopPropagation()}>Live ↗</a>)}
        </div>
      </div>
    </article>
  );
}
