// src/components/Nav.jsx
import { NavLink } from 'react-router-dom';
import './Nav.css';

export default function Nav({ theme, toggleTheme }) {
  return (
    <nav className="site-nav">
      <div className="wrap nav-inner">
        <NavLink to="/" className="logo" end>
          haseeb<span>.io</span>
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active' : '')}>
              Work
            </NavLink>
          </li>
          <li>
            <NavLink to="/skills" className={({ isActive }) => (isActive ? 'active' : '')}>
              Skills
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={({ isActive }) => (isActive ? 'active' : '')}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
              Contact
            </NavLink>
          </li>
        </ul>

        <button
          className="theme-btn"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}