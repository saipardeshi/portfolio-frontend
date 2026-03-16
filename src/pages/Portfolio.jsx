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

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch portfolio data from Spring Boot backend on mount
  useEffect(() => {
    getPortfolio()
      .then(res => setPortfolio(res.data))
      .catch(() => setError('Failed to load portfolio data.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px', height: '48px',
            border: '3px solid var(--border-color)',
            borderTopColor: 'var(--purple-glow)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-screen" style={{ color: '#fc8181', flexDirection: 'column', gap: '12px' }}>
        <span>⚠️ {error}</span>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Make sure your Spring Boot backend is running on port 8080
        </span>
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