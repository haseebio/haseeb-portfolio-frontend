// src/components/Timeline.jsx
import { aboutTimeline } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import './Timeline.css';

function TimelineItem({ item, isLast, index = 0 }) {
  const ref = useReveal();
  return (
    <div
      className="timeline-item reveal"
      ref={ref}
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      <div className="timeline-marker">
        <span className="timeline-dot" />
        {!isLast && <span className="timeline-line" />}
      </div>
      <div className="timeline-content">
        <span className="timeline-stage">{item.stage}</span>
        <p>{item.text}</p>
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <div className="timeline">
      {aboutTimeline.map((item, i) => (
        <TimelineItem key={item.stage} item={item} isLast={i === aboutTimeline.length - 1} index={i} />
      ))}
    </div>
  );
}
