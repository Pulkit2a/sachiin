import React, { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div style={{ padding: '2rem', color: '#EF4444', fontFamily: 'sans-serif', backgroundColor: '#080E18', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Something went wrong</h1>
      <p style={{ color: '#94A3B8', marginTop: '0.5rem' }}>An error occurred while rendering the application:</p>
      <pre style={{ background: '#0D182A', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem', color: '#F5C542', overflowX: 'auto' }}>
        {error.toString()}
      </pre>
      <button
        onClick={() => window.location.reload()}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#F5C542', color: '#0D182A', fontWeight: 'bold', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}
      >
        Reload Page
      </button>
    </div>
  );
}

function SafeApp() {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      setError(event.error || new Error(event.message));
    };
    window.addEventListener('error', handleGlobalError);
    return () => window.removeEventListener('error', handleGlobalError);
  }, []);

  if (error) {
    return <ErrorFallback error={error} />;
  }

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SafeApp />
  </StrictMode>,
);
