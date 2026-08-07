import { useEffect, useState } from 'react';

// Returns normalized cursor offset from viewport center: -1 to 1 on each axis
export function useParallax() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return offset;
}