// src/components/BuildPipeline.jsx
import { pipelineStages } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import './BuildPipeline.css';

function Stage({ stage, isLast, index }) {
  const ref = useReveal();
  return (
    <div
      className="pipeline-stage reveal"
      ref={ref}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="pipeline-marker">
        <span className="pipeline-icon-wrap">{stage.icon}</span>
        {!isLast && <span className="pipeline-line" aria-hidden="true" />}
      </div>
      <div className="pipeline-content">
        <span className="pipeline-title">
          <span className="pipeline-num">{stage.num}</span>
          {stage.label}
        </span>
        <p>{stage.desc}</p>
      </div>
    </div>
  );
}

export default function BuildPipeline() {
  return (
    <div className="system">
      <div className="system-label">// how an idea becomes a product</div>
      <div className="pipeline-vertical">
        {pipelineStages.map((stage, i) => (
          <Stage
            key={stage.key}
            stage={stage}
            index={i}
            isLast={i === pipelineStages.length - 1}
          />
        ))}
      </div>
      <p className="system-note">
        This isn&apos;t decoration — it&apos;s roughly how <strong>TicketHandler</strong> and{' '}
        <strong>StackRadar</strong> actually got built.
      </p>
    </div>
  );
}