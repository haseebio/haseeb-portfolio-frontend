// src/pages/Contact.jsx
import { useState, useEffect } from 'react';
import ContactPanel from '../components/ContactPanel';
import { useSEO } from '../hooks/useSEO';
import { contactCopy, pageMeta } from '../data/portfolio';
import './Contact.css';

export default function Contact() {
  useSEO(pageMeta.contact.title, pageMeta.contact.description);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <header className="contact-hero">
        <div className="wrap contact-hero-inner">
          <div className="contact-hero-text">
            <div className="contact-hero-tag">// Contact</div>
            <h1>{contactCopy.headline}</h1>
            <p className="lead">{contactCopy.lead}</p>
          </div>
          <div className="wave-mascot">
            <svg className="wave-figure" viewBox="0 0 100 140" width="76" height="106" aria-hidden="true">
              <ellipse cx="50" cy="132" rx="26" ry="6" fill="rgba(32,21,16,0.15)" />
              <rect x="37" y="104" width="26" height="34" rx="10" fill="#201510" />
              <rect x="31" y="62" width="38" height="52" rx="18" fill="#201510" />
              <line x1="31" y1="76" x2="13" y2="92" stroke="#201510" strokeWidth="9" strokeLinecap="round" />
              <line
                x1="69"
                y1="76"
                x2="87"
                y2="60"
                stroke="#201510"
                strokeWidth="9"
                strokeLinecap="round"
                className="wave-arm"
              />
              <circle cx="50" cy="40" r="20" fill="#ffd9b8" />
            </svg>
            {showBubble && (
              <div className="wave-bubble">
                Hi, let's talk! 👋
                <span className="wave-bubble-tail" aria-hidden="true" />
              </div>
            )}
          </div>
        </div>
      </header>

      <section>
        <div className="wrap">
          <ContactPanel />
        </div>
      </section>
    </>
  );
}