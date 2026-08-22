// src/hooks/useJsonLd.js
import { useEffect } from 'react';

export function useJsonLd(schema, id = 'ld-json-dynamic') {
  useEffect(() => {
    if (!schema) return undefined;
    let script = document.getElementById(id);
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, [schema, id]);
}