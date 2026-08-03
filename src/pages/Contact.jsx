import React, { useState } from 'react';
import axios from 'axios';
import SEOHead from '../components/SEOHead';
import { useReveal } from '../hooks/useReveal';
import './Contact.css';

const INIT = { name: '', email: '', subject: '', message: '' };

const SOCIAL = [
  { id: 'email',    label: 'Email',    val: 'haseebur341@gmail.com',             href: 'mailto:haseebur341@gmail.com',                         bg: '#FEF2F2', color: '#EA4335' },
  { id: 'linkedin', label: 'LinkedIn', val: 'muhammad-haseeb-ur-rehman',          href: 'https://linkedin.com/in/muhammad-haseeb-ur-rehman',    bg: '#EFF6FF', color: '#0A66C2' },
  { id: 'whatsapp', label: 'WhatsApp', val: '+92 304 4170843',                    href: 'https://wa.me/923044170843',                          bg: '#F0FDF4', color: '#25D366' },
  { id: 'github',   label: 'GitHub',   val: 'github.com/haseebcodess',            href: 'https://github.com/haseebcodess',                     bg: '#F8F8F8', color: '#24292F' },
];

const ICONS = {
  email:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  linkedin: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  whatsapp: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  github:   <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>,
};

function validate(f) {
  const e = {};
  if (!f.name.trim())                     e.name    = 'Name is required';
  if (!f.email.trim())                    e.email   = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(f.email)) e.email   = 'Enter a valid email address';
  if (!f.subject.trim())                  e.subject = 'Subject is required';
  if (f.message.trim().length < 20)       e.message = 'Message must be at least 20 characters';
  return e;
}

export default function Contact() {
  const [form,   setForm]   = useState(INIT);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [apiErr, setApiErr] = useState('');

  const heroRef  = useReveal();
  const formRef  = useReveal();
  const socialRef = useReveal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(ex => ({ ...ex, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading'); setApiErr('');
    try {
      await axios.post('/api/contact', form);
      setStatus('success'); setForm(INIT);
    } catch (err) {
      setStatus('error');
      setApiErr(err.response?.data?.message || 'Something went wrong. Please email me directly.');
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Haseeb — MERN Stack Developer for Hire | Lahore Pakistan"
        description="Contact Muhammad Haseeb Ur Rehman — MERN Stack Developer available for internships, freelance projects and full-time roles in Lahore, Pakistan. Get in touch today."
        keywords="contact haseeb portfolio, hire MERN stack developer Lahore, contact Muhammad Haseeb developer, freelance developer Pakistan"
        path="/contact"
      />

      <main className="contact-page">

        {/* HERO */}
        <div className="contact-hero">
          <div className="contact-hero__shapes" aria-hidden="true">
            <div className="contact-hero__orb-1" />
            <div className="contact-hero__orb-2" />
          </div>
          <div className="container contact-hero__inner reveal" ref={heroRef}>
            <span className="sec-eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Let's Talk</span>
            <h1 className="contact-hero__title">
              Got a project<br />in <span>mind?</span>
            </h1>
            <p className="contact-hero__sub">
              Open to internships, freelance projects, and full-time roles in Lahore.
              I respond within 24 hours.
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="container contact-content">
          <div className="contact-grid">

            {/* FORM */}
            <div className="card contact-form-card reveal" ref={formRef}>
              <h2>Send a Message</h2>

              {status === 'success' ? (
                <div className="contact-success">
                  <div className="contact-success__icon">✓</div>
                  <h3>Message sent!</h3>
                  <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                  <button className="btn-outline" onClick={() => setStatus('idle')}>Send another →</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className={`form-field${errors.name ? ' err' : ''}`}>
                      <label htmlFor="cf-name">Full name *</label>
                      <input id="cf-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Muhammad Haseeb" autoComplete="name" />
                      {errors.name && <span className="form-err">{errors.name}</span>}
                    </div>
                    <div className={`form-field${errors.email ? ' err' : ''}`}>
                      <label htmlFor="cf-email">Email address *</label>
                      <input id="cf-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" />
                      {errors.email && <span className="form-err">{errors.email}</span>}
                    </div>
                  </div>
                  <div className={`form-field${errors.subject ? ' err' : ''}`}>
                    <label htmlFor="cf-subject">Subject *</label>
                    <input id="cf-subject" name="subject" type="text" value={form.subject} onChange={handleChange} placeholder="Internship / Freelance / Collab" />
                    {errors.subject && <span className="form-err">{errors.subject}</span>}
                  </div>
                  <div className={`form-field${errors.message ? ' err' : ''}`}>
                    <label htmlFor="cf-message">Message * <span className="form-char">{form.message.length}/2000</span></label>
                    <textarea id="cf-message" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project or opportunity..." rows={6} maxLength={2000} />
                    {errors.message && <span className="form-err">{errors.message}</span>}
                  </div>
                  {status === 'error' && (
                    <div className="form-api-err">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      {apiErr}
                    </div>
                  )}
                  <button type="submit" className="btn-coral contact-submit" disabled={status === 'loading'}>
                    {status === 'loading'
                      ? <><span className="contact-spinner" />Sending...</>
                      : <>Send Message →</>
                    }
                  </button>
                </form>
              )}
            </div>

            {/* SOCIAL LINKS */}
            <div className="contact-right reveal" ref={socialRef}>
              <h2>Find Me On</h2>
              <div className="social-cards">
                {SOCIAL.map(s => (
                  <a
                    key={s.id}
                    href={s.href}
                    target={s.id !== 'email' ? '_blank' : undefined}
                    rel="noreferrer"
                    className="social-card"
                    style={{ '--sc': s.color }}
                  >
                    <div className="social-card__icon" style={{ background: s.bg, color: s.color }}>
                      {ICONS[s.id]}
                    </div>
                    <div className="social-card__text">
                      <strong>{s.label}</strong>
                      <span>{s.val}</span>
                    </div>
                    <svg className="social-card__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
                  </a>
                ))}
              </div>

              <div className="contact-info-card">
                <h3>Quick Info</h3>
                {[
                  { icon: '📍', label: 'Location',   val: 'Lahore, Pakistan'          },
                  { icon: '⏰', label: 'Response',   val: 'Within 24 hours'            },
                  { icon: '💼', label: 'Available',  val: 'Internship & Freelance'     },
                  { icon: '🌐', label: 'Languages',  val: 'English, Urdu'              },
                ].map(i => (
                  <div key={i.label} className="contact-info-row">
                    <span className="contact-info-icon">{i.icon}</span>
                    <div>
                      <span className="contact-info-label">{i.label}</span>
                      <span className="contact-info-val">{i.val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
