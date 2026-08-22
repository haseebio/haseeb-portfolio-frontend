// src/components/CapabilityMap.jsx
import { capabilities } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import './CapabilityMap.css';

function CapabilityCard({ cap, index }) {
  const ref = useReveal();
  return (
    <div
      className="cap-card reveal hover-lift"
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="cap-icon">{cap.icon}</span>
      <h3>{cap.title}</h3>
      <p>{cap.desc}</p>
      <div className="cap-tags">
        {cap.tags.map((tag) => (
          <span className="cap-tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CapabilityMap() {
  return (
    <div className="cap-grid">
      {capabilities.map((cap, i) => (
        <CapabilityCard key={cap.key} cap={cap} index={i} />
      ))}
    </div>
  );
}