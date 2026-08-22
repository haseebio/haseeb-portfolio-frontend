// src/hooks/useReveal.js
import { useEffect, useRef } from 'react';

// Attach ref to any element with className="reveal" — adds "is-visible" once it's
// close to entering the viewport, then stops observing (no ongoing scroll cost).
//
// rootMargin triggers the reveal ~120px before the element is actually on screen,
// so nothing looks like a blank gap while scrolling toward it.
//
// The failsafe timeout guarantees content is never stuck invisible — if for any
// reason the observer doesn't fire (ref not attached in time, browser quirk, etc.)
// the element still becomes visible after 900ms.
export function useReveal(options = { threshold: 0.1, rootMargin: '0px 0px -120px 0px' }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        observer.unobserve(node);
      }
    }, options);

    observer.observe(node);

    const failsafe = window.setTimeout(() => {
      node.classList.add('is-visible');
    }, 900);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
