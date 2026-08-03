import React, { useEffect } from 'react';
const Modal = ({ isOpen, onClose, title, children, maxWidth=600 }) => {
  useEffect(() => { if (isOpen) document.body.style.overflow='hidden'; else document.body.style.overflow=''; return ()=>{document.body.style.overflow=''}; }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,zIndex:1000,background:'rgba(10,10,15,0.5)',backdropFilter:'blur(6px)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,overflowY:'auto'}}>
      <div onClick={e=>e.stopPropagation()} className="slide-up" style={{width:'100%',maxWidth,background:'#fff',borderRadius:20,padding:32,boxShadow:'0 25px 60px rgba(0,0,0,0.15)',maxHeight:'90vh',overflowY:'auto',border:'1px solid var(--border)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
          <h2 style={{fontSize:20,fontWeight:700,color:'var(--text)'}}>{title}</h2>
          <button onClick={onClose} style={{width:32,height:32,borderRadius:8,background:'var(--border2)',border:'none',color:'var(--text3)',cursor:'pointer',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};
export default Modal;
