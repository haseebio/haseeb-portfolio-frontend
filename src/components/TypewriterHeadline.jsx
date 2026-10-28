// src/components/TypewriterHeadline.jsx
import { useEffect, useState } from 'react';
import './Typewriter.css';

export default function TypewriterHeadline({ segments, speed = 42, start = true }) {
  const full = segments.map((s) => s.text).join('');
  const [len, setLen] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setLen(full.length);
      setDone(true);
      return undefined;
    }

    let i = 0;
    setLen(0);
    setDone(false);
    const interval = setInterval(() => {
      i += 1;
      setLen(i);
      if (i >= full.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full, speed, start]);

  let consumed = 0;
  const rendered = segments.map((seg, idx) => {
    const start = consumed;
    consumed += seg.text.length;
    const visible = Math.max(0, Math.min(seg.text.length, len - start));
    const shown = seg.text.slice(0, visible);
    return seg.accent ? <em key={idx}>{shown}</em> : <span key={idx}>{shown}</span>;
  });

  return (
    <>
      {rendered}
      <span className={`typewriter-cursor${done ? ' idle' : ''}`} aria-hidden="true" />
    </>
  );
}