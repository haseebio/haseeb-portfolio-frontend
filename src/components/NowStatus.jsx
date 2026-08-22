// src/components/NowStatus.jsx
import { nowStatus } from '../data/portfolio';
import './NowStatus.css';

const ROWS = [
  { label: 'Currently learning', value: nowStatus.learning },
  { label: 'Currently building', value: nowStatus.building },
  { label: 'Currently exploring', value: nowStatus.exploring },
];

export default function NowStatus() {
  return (
    <div className="now-status">
      {ROWS.map((row) => (
        <div className="now-row" key={row.label}>
          <span className="now-label">{row.label}</span>
          <span className="now-value">{row.value}</span>
        </div>
      ))}
    </div>
  );
}
