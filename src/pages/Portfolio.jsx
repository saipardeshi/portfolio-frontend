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

  // Fetch portfolio data from backend on mount
  useEffect(() => {
    getPortfolio()
      .then(res => setPortfolio(res.data))
      .catch(() => {
        // Backend unavailable — render with empty data gracefully
        setPortfolio({});
      })
      .finally(() => {
        // Signal loader to complete once data is ready (or failed)
        onReady?.();
      });
  }, [onReady]);

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