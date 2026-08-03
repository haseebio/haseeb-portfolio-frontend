import { useEffect, useRef } from 'react';
export function useReveal(cls='reveal',threshold=0.1){
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){el.classList.add('visible');obs.unobserve(el);}},{threshold});
    obs.observe(el); return()=>obs.disconnect();
  },[threshold]);
  return ref;
}
export function useRevealGroup(threshold=0.1){
  const ref=useRef(null);
  useEffect(()=>{
    const parent=ref.current; if(!parent) return;
    const children=parent.querySelectorAll('.reveal,.reveal-left,.reveal-right');
    const obs=new IntersectionObserver((entries)=>{
      entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),i*80);obs.unobserve(e.target);}});
    },{threshold});
    children.forEach(c=>obs.observe(c)); return()=>obs.disconnect();
  },[threshold]);
  return ref;
}
