// src/components/Typewriter.jsx
import { useEffect, useState } from 'react';
import './Typewriter.css';

export default function Typewriter({ text, speed = 55, onDone }) {
  const [display, setDisplay] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplay(text);
      setDone(true);
      if (onDone) onDone();
      return undefined;
    }

    let i = 0;
    setDisplay('');
    setDone(false);
    const interval = setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        if (onDone) onDone();
      }
    }, speed);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  return (
    <span className="typewriter">
      {display}
      <span className={`typewriter-cursor${done ? ' idle' : ''}`} aria-hidden="true" />
    </span>
  );
}