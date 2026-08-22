// src/components/RichText.jsx
import { Link } from 'react-router-dom';

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

export function parseRichText(text) {
  const parts = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  LINK_RE.lastIndex = 0;

  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    if (href.startsWith('/')) {
      parts.push(
        <Link key={key++} to={href} className="link-sweep">{label}</Link>
      );
    } else {
      parts.push(
        <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="link-sweep">
          {label}
        </a>
      );
    }
    lastIndex = LINK_RE.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

// Plain-text version for JSON-LD (structured data can't contain JSX/markup)
export function stripRichText(text) {
  return text.replace(LINK_RE, '$1');
}

export default function RichText({ text }) {
  return <>{parseRichText(text)}</>;
}