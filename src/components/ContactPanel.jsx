// src/components/ContactPanel.jsx
import { useState } from 'react';
import { profile } from '../data/portfolio';
import './ContactPanel.css';

export default function ContactPanel() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | error | success
  const [errors, setErrors] = useState({});

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.message.trim()) next.message = 'Message is required';
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus('error');
      return;
    }
    // No backend wired yet — mailto fallback keeps this honest about what exists.
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus('success');
  };

  return (
    <div className="contact-panel">
      <div className="contact-direct">
        <div className="contact-row">
          <span className="contact-row-label">Direct</span>
          <button type="button" className="contact-email" onClick={handleCopy}>
            {profile.email}
            <span className="copy-feedback">{copied ? 'Copied' : 'Click to copy'}</span>
          </button>
        </div>
        <div className="contact-row">
          <span className="contact-row-label">Phone</span>
          <span className="contact-plain">{profile.phone}</span>
        </div>
        <div className="contact-row">
          <span className="contact-row-label">Professional</span>
          <a className="contact-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
        </div>
        <div className="contact-row">
          <span className="contact-row-label">Code</span>
          <a className="contact-link" href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
        </div>

        <div className="elsewhere">
          <span className="contact-row-label">Elsewhere</span>
          <div className="elsewhere-grid">
            <a className="elsewhere-link" href={profile.twitter} target="_blank" rel="noopener noreferrer">X / Twitter</a>
            <a className="elsewhere-link" href={profile.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a className="elsewhere-link" href={profile.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="elsewhere-link" href={profile.threads} target="_blank" rel="noopener noreferrer">Threads</a>
            <span className="elsewhere-link elsewhere-handle">Discord: {profile.discord}</span>
            <span className="elsewhere-link elsewhere-handle">WeChat: {profile.wechat}</span>
          </div>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows="4"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message && <span className="field-error">{errors.message}</span>}
        </div>
        <button type="submit" className="btn btn-primary">
          Send →
        </button>
        {status === 'success' && <p className="form-status success">Opening your email client…</p>}
        {status === 'error' && <p className="form-status error">Fix the fields above and try again.</p>}
      </form>
    </div>
  );
}