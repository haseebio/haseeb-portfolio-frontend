import { useEffect, useState } from 'react';
import './CookieConsent.css';

const STORAGE_KEY = 'cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    } else if (stored === 'accepted' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-label="Cookie consent">
      <p>This site uses Google Analytics to understand traffic. No personal data is sold or shared.</p>
      <div className="cookie-consent-actions">
        <button type="button" className="btn btn-ghost" onClick={handleDecline}>Decline</button>
        <button type="button" className="btn btn-primary" onClick={handleAccept}>Accept</button>
      </div>
    </div>
  );
}