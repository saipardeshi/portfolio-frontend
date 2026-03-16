
// =============================================
// HERO SECTION COMPONENT
// Shows: name, tagline, intro, social links, photo
// =============================================
import React from 'react';
import AnimatedBackground from "../components/AnimatedBackground";

const Hero = ({ hero }) => {
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
            <p className="hero__greeting">👋 Hello, I'm</p>

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
                📬 Contact Me
              </button>

              <button
                className="btn-outline"
                onClick={() =>
                  document
                    .getElementById('projects')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                🚀 View Projects
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                </a>
              )}

              {hero.email && (
                <a
                  href={`mailto:${hero.email}`}
                  className="hero__social-link"
                  title="Send Email"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
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

