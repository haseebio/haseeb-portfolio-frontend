import { useState, useEffect, useRef } from 'react';
export function useCountUp(target,duration=1800,suffix=''){
  const [value,setValue]=useState(0); const ref=useRef(null); const started=useRef(false);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!started.current){
        started.current=true; let start=0; const step=target/(duration/16);
        const timer=setInterval(()=>{start=Math.min(start+step,target);setValue(Math.floor(start));if(start>=target)clearInterval(timer);},16);
      }
    },{threshold:0.5});
    obs.observe(el); return()=>obs.disconnect();
  },[target,duration]);
  return {ref,display:value+suffix};
}
