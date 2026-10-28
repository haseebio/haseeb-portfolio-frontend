// src/components/SocialSidebar.jsx
import { profile } from '../data/portfolio';
import { GithubIcon, LinkedinIcon, FacebookIcon, InstagramIcon } from './Icons';
import './SocialSidebar.css';

const LINKS = [
  { href: (p) => p.github, Icon: GithubIcon, label: 'GitHub' },
  { href: (p) => p.linkedin, Icon: LinkedinIcon, label: 'LinkedIn' },
  { href: (p) => p.facebook, Icon: FacebookIcon, label: 'Facebook' },
  { href: (p) => p.instagram, Icon: InstagramIcon, label: 'Instagram' },
];

export default function SocialSidebar() {
  return (
    <div className="social-sidebar" aria-label="Social links">
      {LINKS.map(({ href, Icon, label }) => (
        <a
          key={label}
          href={href(profile)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}