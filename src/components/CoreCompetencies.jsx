// src/components/CoreCompetencies.jsx
import { Link } from 'react-router-dom';
import { coreCompetencies } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import './CoreCompetencies.css';

function CompetencyCard({ item, index }) {
  const ref = useReveal();
  return (
    <div
      className="competency-card reveal hover-lift"
      ref={ref}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
      <Link to={item.projectPath} className="competency-link">
        {item.projectLabel} →
      </Link>
    </div>
  );
}

export default function CoreCompetencies() {
  return (
    <div className="competency-grid">
      {coreCompetencies.map((item, i) => (
        <CompetencyCard key={item.key} item={item} index={i} />
      ))}
    </div>
  );
}