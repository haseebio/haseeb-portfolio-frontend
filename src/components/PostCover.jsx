// src/components/PostCover.jsx
import './PostCover.css';

export default function PostCover({ label }) {
  return (
    <div className="post-cover" aria-hidden="true">
      <span className="post-cover-word">{label}</span>
    </div>
  );
}