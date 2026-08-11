// =============================================
// HERO SECTION COMPONENT
// Shows: name, tagline, intro, social links, photo
// =============================================
import React from 'react';
import { BsLinkedin, BsGithub, BsEnvelopeFill } from 'react-icons/bs';
import AnimatedBackground from "../components/AnimatedBackground";
import Sk from '../components/Sk';

const Hero = ({ hero, loading }) => {
  /* ---------- SKELETON ---------- */
  if (loading) return (
    <section id="home" className="hero section">
      <AnimatedBackground />
      <div className="container">
        <div className="hero__grid">
          <div className="hero__text">
            <Sk className="sk-line sk-line--sm" style={{ width: '120px', marginBottom: '16px' }} />
            <Sk className="sk-line--title skeleton-box" style={{ width: '70%', marginBottom: '18px' }} />
            <Sk className="sk-line sk-line--lg" style={{ width: '55%', marginBottom: '12px' }} />
            <Sk className="sk-line" style={{ width: '85%', marginBottom: '6px' }} />
            <Sk className="sk-line" style={{ width: '75%', marginBottom: '28px' }} />
            <div style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
              <Sk className="sk-pill skeleton-box" style={{ width: '130px' }} />
              <Sk className="sk-pill skeleton-box" style={{ width: '130px' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[1,2,3].map(i => <Sk key={i} className="sk-circle skeleton-box" style={{ width: '40px', height: '40px' }} />)}
            </div>
          </div>
          <div className="hero__photo-wrapper">
            <Sk className="sk-circle skeleton-box" style={{ width: '260px', height: '260px' }} />
          </div>
        </div>
      </div>
    </section>
  );

  if (!hero) return null;


  // Get initials for placeholder when no photo
  const initials = hero.name
    ? hero.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'YN';

  // Default image path (place image in public/profile.png)
  const profileImage = hero.profilePhotoUrl || "/profile.png";

  return (
    <section id="home" className="hero section">

      {/* 3D animated background */}
      <AnimatedBackground />

      <div className="container">
        <div className="hero__grid">

          {/* Left: Text content */}
          <div className="hero__text">
            <p className="hero__greeting"> Hello, I'm</p>

            <h1 className="hero__name">{hero.name || 'Your Name'}</h1>

            <p className="hero__tagline">
              {hero.tagline || 'Full Stack Developer'}
            </p>

            <p className="hero__intro">
              {hero.shortIntro || 'Welcome to my portfolio.'}
            </p>

            {/* CTA buttons */}
            <div className="hero__buttons">

              <button
                className="btn-primary"
                onClick={() =>
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Contact Me
              </button>

              <button
                className="btn-outline"
                onClick={() =>
                  document
                    .getElementById('projects')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                 View Projects
              </button>

            </div>

            {/* Social links */}
            <div className="hero__socials">

              {hero.linkedinUrl && (
                <a
                  href={hero.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero__social-link"
                  title="LinkedIn"
                >
                  <BsLinkedin size={18} />
                </a>
              )}

              {hero.githubUrl && (
                <a
                  href={hero.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero__social-link"
                  title="GitHub"
                >
                  <BsGithub size={18} />
                </a>
              )}

              {hero.email && (
                <a
                  href={`mailto:${hero.email}`}
                  className="hero__social-link"
                  title="Send Email"
                >
                  <BsEnvelopeFill size={18} />
                </a>
              )}

            </div>
          </div>

          {/* Right: Profile photo with animated ring */}
          <div className="hero__photo-wrapper">

            <div className="hero__orbit">
              <div className="hero__orbit-dot"></div>
            </div>

            <div className="hero__photo-ring">

              <img
                src={ "/new.jpeg"}
                alt={hero.name}
                className="hero__photo"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML =
                    `<div class="hero__photo-placeholder">${initials}</div>`;
                }}
              />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

