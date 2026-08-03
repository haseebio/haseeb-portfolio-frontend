import React from 'react';
import { techTicker } from '../data/portfolio';
import './TechTicker.css';
export default function TechTicker(){
  return(<div className="ticker"><div className="ticker__track">{techTicker.map((t,i)=>(<span key={i} className="ticker__item"><span className="ticker__dot"/>{t}</span>))}</div></div>);
}
