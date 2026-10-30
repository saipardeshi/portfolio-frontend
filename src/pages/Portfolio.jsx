// =============================================
// PORTFOLIO PAGE
// Fetches data from backend and renders all sections.
// Shows skeleton screens instantly; replaces with real
// content once the backend responds.
// =============================================
import React, { useEffect, useState } from 'react';
import { getPortfolio, getCachedPortfolio } from '../api/portfolioApi';
import fallbackPortfolio from '../data/fallbackPortfolio.json';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';

import '../styles/global.css';
import '../styles/Navbar.css';
import '../styles/Portfolio.css';
import '../styles/Skeleton.css';

const Portfolio = () => {
  // Instant load: retrieve cached portfolio from browser or bundled snapshot (0ms)
  const initialData = getCachedPortfolio() || fallbackPortfolio;
  const [portfolio, setPortfolio] = useState(initialData);
  // Only show skeletons if no initial or cached data is available
  const [loading, setLoading]     = useState(!initialData);
  const [error, setError]         = useState(false);

  const fetchData = (isManualRetry = false) => {
    // Only show skeleton spinners if there's completely no data or explicitly requested
    if (!portfolio || isManualRetry) {
      setLoading(true);
    }
    setError(false);

    getPortfolio()
      .then(res => {
        if (res?.data) {
          setPortfolio(res.data);
        }
      })
      .catch(() => {
        // Only show error toast if there's no data to display at all
        if (!portfolio) {
          setError(true);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div>
      {/* Background glow effects */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      {/* Navbar — renders immediately (no data needed for layout) */}
      <Navbar name={portfolio?.hero?.name} />

      <main>
        {/* Each section receives loading flag and renders its own skeleton */}
        <Hero         hero={portfolio?.hero}               loading={loading} />
        <About        about={portfolio?.about}             hero={portfolio?.hero} loading={loading} />
        <Skills       skills={portfolio?.skills}           loading={loading} />
        <Experience   experiences={portfolio?.experiences} loading={loading} />
        <Projects     projects={portfolio?.projects}       loading={loading} />
        <Education    educations={portfolio?.educations}   loading={loading} />
        <Certificates certificates={portfolio?.certificates} loading={loading} />
        <Contact      contact={portfolio?.contact}         hero={portfolio?.hero} loading={loading} />
      </main>

      {/* Error toast — shown at bottom if backend failed, user can retry */}
      {error && (
        <div style={{
          position: 'fixed', bottom: '24px', left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(20,10,40,0.95)', border: '1px solid #7c3aed',
          borderRadius: '12px', padding: '14px 24px',
          display: 'flex', alignItems: 'center', gap: '16px',
          zIndex: 9999, boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          color: '#fff', fontSize: '0.9rem',
        }}>
          <span>⚠️ Server is starting up…</span>
          <button
            onClick={() => fetchData(true)}
            style={{
              padding: '6px 16px', background: '#7c3aed', color: '#fff',
              border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem',
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Footer */}
      {!loading && (
        <footer className="footer">
          <p>
            Designed &amp; Built by <span>{portfolio?.hero?.name || 'You'}</span> ·{' '}
            {new Date().getFullYear()}
          </p>
        </footer>
      )}
    </div>
  );
};

export default Portfolio;