import { useEffect } from 'react';
const BASE = 'Haseeb Shop';
const useSEO = ({ title, description, keywords }) => {
  useEffect(() => {
    document.title = title ? `${title} \u2014 ${BASE}` : BASE;
    const set = (sel, val) => { const t = document.querySelector(sel); if (t) t.setAttribute('content', val); };
    if (description) { set('meta[name="description"]', description); set('meta[property="og:description"]', description); }
    if (keywords) set('meta[name="keywords"]', keywords);
    set('meta[property="og:title"]', title ? `${title} \u2014 ${BASE}` : BASE);
    return () => { document.title = BASE; };
  }, [title, description, keywords]);
};
export default useSEO;
