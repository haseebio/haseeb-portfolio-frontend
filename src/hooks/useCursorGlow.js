import { useEffect } from 'react';
export function useCursorGlow(){
  useEffect(()=>{
    const glow=document.createElement('div'); glow.className='cursor-glow';
    document.body.appendChild(glow);
    const move=(e)=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';};
    window.addEventListener('mousemove',move);
    return()=>{window.removeEventListener('mousemove',move);document.body.removeChild(glow);};
  },[]);
}
