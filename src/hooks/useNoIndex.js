import { useEffect } from 'react';

export function useNoIndex() {
  useEffect(() => {
    let tag = document.querySelector('meta[name="robots"]');
    const existed = Boolean(tag);
    const previousContent = tag ? tag.getAttribute('content') : null;

    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'robots');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', 'noindex');

    return () => {
      if (!existed) tag.remove();
      else tag.setAttribute('content', previousContent);
    };
  }, []);
}