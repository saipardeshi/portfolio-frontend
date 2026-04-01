// =============================================
// PORTFOLIO PAGE
// Fetches data from backend and renders all sections
// =============================================
import React, { useEffect, useState } from 'react';
import { getPortfolio } from '../api/portfolioApi';

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

const Portfolio = ({ onReady }) => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);   // ⏳ track loading state
  const [error, setError] = useState(false);       // ❌ track error state

  // Fetch portfolio data from backend — supports retry on button click
  const fetchData = () => {
    setLoading(true);
    setError(false);

    getPortfolio()
      .then(res => setPortfolio(res.data))
      .catch(() => {
        // Backend unavailable after all retries — show error UI
        setError(true);
        setPortfolio({});
      })
      .finally(() => {
        setLoading(false);
        // Signal loader to complete once data is ready (or failed)
        onReady?.();
      });
  };

  // Fetch portfolio data from backend on mount
  useEffect(() => {
    fetchData();
  }, []);

  // ⏳ Show spinner while backend is waking up / loading
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: '#a855f7',
        gap: '16px',
        background: '#0a0a0a'
      }}>
        {/* Spinning loader ring */}
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #a855f7',
          borderTop: '4px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ fontSize: '1rem', opacity: 0.7 }}>
          Waking up server, please wait...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ❌ Show error message + retry button if all retries failed
  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: '#a855f7',
        gap: '16px',
        background: '#0a0a0a'
      }}>
        <p style={{ fontSize: '1.2rem' }}>⚠️ Failed to load portfolio</p>
        <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>
          The server may be starting up. Please try again.
        </p>
        {/* Retry button — re-triggers fetchData with fresh retries */}
        <button
          onClick={fetchData}
          style={{
            padding: '10px 24px',
            background: '#a855f7',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Background glow effects */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      {/* Navbar - passes name for logo */}
      <Navbar name={portfolio?.hero?.name} />

      {/* All portfolio sections */}
      <main>
        <Hero hero={portfolio?.hero} />
        <About about={portfolio?.about} hero={portfolio?.hero} />
        <Skills skills={portfolio?.skills} />
        <Experience experiences={portfolio?.experiences} />
        <Projects projects={portfolio?.projects} />
        <Education educations={portfolio?.educations} />
        <Certificates certificates={portfolio?.certificates} />
        <Contact contact={portfolio?.contact} hero={portfolio?.hero} />
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>
          Designed & Built by <span>{portfolio?.hero?.name || 'You'}</span> ·{' '}
          {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;