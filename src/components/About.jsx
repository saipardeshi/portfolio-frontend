// =============================================
// ABOUT SECTION COMPONENT
// Shows: bio, location, resume link, stats cards
// =============================================
import React from 'react';

const About = ({ about, hero }) => {
  if (!about) return null;

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-divider"></div>
        <h2 className="section-title">About <span>Me</span></h2>
        <p className="section-subtitle">A little bit about who I am</p>

        <div className="about__grid">
          {/* Left: Bio and info */}
          <div>
            <p className="about__bio">{about.bio}</p>

            <ul className="about__info-list">
              {/* Location */}
              {about.location && (
                <li className="about__info-item">
                  <span className="about__info-icon">📍</span>
                  {about.location}
                </li>
              )}

              {/* Email */}
              {hero?.email && (
                <li className="about__info-item">
                  <span className="about__info-icon">✉️</span>
                  <a href={`mailto:${hero.email}`} style={{ color: 'var(--purple-light)', textDecoration: 'none' }}>
                    {hero.email}
                  </a>
                </li>
              )}

              {/* LinkedIn */}
              {hero?.linkedinUrl && (
                <li className="about__info-item">
                  <span className="about__info-icon">💼</span>
                  <a href={hero.linkedinUrl} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'var(--purple-light)', textDecoration: 'none' }}>
                    LinkedIn Profile
                  </a>
                </li>
              )}

              {/* GitHub */}
              {hero?.githubUrl && (
                <li className="about__info-item">
                  <span className="about__info-icon">🐙</span>
                  <a href={hero.githubUrl} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'var(--purple-light)', textDecoration: 'none' }}>
                    GitHub Profile
                  </a>
                </li>
              )}
            </ul>

            {/* Resume download button */}
            {about.resumeUrl && about.resumeUrl !== '#' && (
              <a href={about.resumeUrl} target="_blank" rel="noopener noreferrer"
                className="btn-primary" style={{ marginTop: '28px', display: 'inline-flex' }}>
                📄 Download Resume
              </a>
            )}
          </div>

  {/* CHANGED: values now come from about data instead of hardcoded */}
<div className="about__stats">
  <div className="about__stat-card">
    <span className="about__stat-number">{about.yearsExperience || '3+'}</span>
    <span className="about__stat-label">Years of Experience</span>
  </div>
  <div className="about__stat-card">
    <span className="about__stat-number">{about.projectsCompleted || '20+'}</span>
    <span className="about__stat-label">Projects Completed</span>
  </div>
  <div className="about__stat-card">
    <span className="about__stat-number">{about.technologiesCount || '10+'}</span>
    <span className="about__stat-label">Technologies</span>
  </div>
  <div className="about__stat-card">
    <span className="about__stat-number">{about.certificationsCount || '5+'}</span>
    <span className="about__stat-label">Certifications</span>
  </div>
</div>
        </div>
      </div>
    </section>
  );
};

export default About;