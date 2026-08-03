import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err, info) { console.error('ErrorBoundary:', err, info); }
  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text)', marginBottom: 12 }}>Something went wrong</h2>
        <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 24 }}>An unexpected error occurred. Please refresh the page.</p>
        <button className="btn-primary" onClick={() => window.location.reload()}>Refresh page</button>
      </div>
    );
  }
}
