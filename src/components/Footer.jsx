// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { profile } from '../data/portfolio';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon, FacebookIcon, MailIcon } from './Icons';
import './Footer.css';

const CONNECT_ICONS = [
  { href: (p) => p.facebook, Icon: FacebookIcon, label: 'Facebook' },
  { href: (p) => p.linkedin, Icon: LinkedinIcon, label: 'LinkedIn' },
  { href: (p) => p.twitter, Icon: TwitterIcon, label: 'X / Twitter' },
  { href: (p) => p.instagram, Icon: InstagramIcon, label: 'Instagram' },
  { href: (p) => p.github, Icon: GithubIcon, label: 'GitHub' },
  { href: (p) => `mailto:${p.email}`, Icon: MailIcon, label: 'Email' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div>
          <div className="footer-logo">
            haseeb<span>.io</span>
          </div>
          <p className="footer-tag">Full-stack developer, Lahore, PK.</p>
          {profile.availableForWork && (
            <div className="status-pill">
              <span className="status-dot" />
              Available for interesting work
            </div>
          )}
        </div>

        <nav className="footer-links" aria-label="Navigate">
          <Link to="/about" className="link-sweep">About</Link>
          <Link to="/projects" className="link-sweep">Work</Link>
          <Link to="/skills" className="link-sweep">Skills</Link>
          <Link to="/blog" className="link-sweep">Blog</Link>
          <Link to="/contact" className="link-sweep">Contact</Link>
        </nav>

        <div className="footer-connect" aria-label="Connect">
          <span className="footer-connect-label">Connect</span>
          <div className="icon-grid">
            {CONNECT_ICONS.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href(profile)}
                target={label === 'Email' ? undefined : '_blank'}
                rel={label === 'Email' ? undefined : 'noopener noreferrer'}
                aria-label={label}
                title={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span>© {year} {profile.name}</span>
        <span>Built with React + intent, not templates.</span>
      </div>
    </footer>
  );
}