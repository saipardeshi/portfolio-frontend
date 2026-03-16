// =============================================
// NAVBAR COMPONENT
// Fixed top navbar with smooth scroll to sections
// Shows all portfolio sections as nav links
// =============================================
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

// Navigation items - clicking scrolls to that section
const NAV_ITEMS = [
  { label: 'Home', href: 'home' },
  { label: 'About', href: 'about' },
  { label: 'Skills', href: 'skills' },
  { label: 'Experience', href: 'experience' },
  { label: 'Projects', href: 'projects' },
  { label: 'Education', href: 'education' },
  { label: 'Certificates', href: 'certificates' },
  { label: 'Contact', href: 'contact' },
];

const Navbar = ({ name }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Add shadow/glass effect when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Update active section based on scroll position
      const sections = NAV_ITEMS.map(item => item.href);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section by id
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  // Get initials for logo from name
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'P';

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar__inner">
          {/* Logo */}
          <a className="navbar__logo" onClick={() => scrollTo('home')} style={{ cursor: 'pointer' }}>
            <span>{initials}</span>{name ? `.dev` : 'Portfolio'}
          </a>

          {/* Desktop nav links */}
          <ul className="navbar__links">
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <a
                  className={activeSection === item.href ? 'active' : ''}
                  onClick={() => scrollTo(item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Admin panel link (subtle, only visible if you know it's there) */}
          <Link to="/admin/login" className="navbar__admin-btn">
            Admin
          </Link>

          {/* Mobile hamburger */}
          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`navbar__mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map(item => (
          <a key={item.href} onClick={() => scrollTo(item.href)}>
            {item.label}
          </a>
        ))}
        <Link to="/admin/login" style={{ color: 'var(--purple-light)' }}>
          🔐 Admin Panel
        </Link>
      </div>
    </>
  );
};

export default Navbar;