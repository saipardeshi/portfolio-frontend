// =============================================
// ABOUT SECTION COMPONENT
// Shows: bio, location, resume link, stats cards
// =============================================
import React from 'react';
import {
  BsGeoAltFill,
  BsEnvelopeFill,
  BsLinkedin,
  BsGithub,
  BsFileEarmarkPdfFill,
} from 'react-icons/bs';
import Sk from '../components/Sk';

const About = ({ about, hero, loading }) => {
  /* ---------- SKELETON ---------- */
  if (loading) return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-divider"></div>
        <Sk className="sk-line--xl skeleton-box" style={{ width: '200px', marginBottom: '10px' }} />
        <Sk className="sk-line sk-line--sm" style={{ width: '260px', marginBottom: '40px' }} />
        <div className="about__grid">
          <div>
            {[100, 90, 95, 80, 70].map((w, i) => (
              <Sk key={i} className="sk-line" style={{ width: `${w}%`, marginBottom: '10px' }} />
            ))}
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Sk className="sk-circle skeleton-box" style={{ width: '20px', height: '20px', flexShrink: 0 }} />
                  <Sk className="sk-line" style={{ width: '60%', marginBottom: 0 }} />
                </div>
              ))}
            </div>
            <Sk className="sk-pill skeleton-box" style={{ width: '160px', marginTop: '28px' }} />
          </div>
          <div className="about__stats">
            {[1,2,3,4].map(i => (
              <div key={i} className="about__stat-card">
                <Sk className="skeleton-box" style={{ width: '60px', height: '40px', margin: '0 auto 8px', borderRadius: '6px' }} />
                <Sk className="sk-line sk-line--sm" style={{ width: '80%', margin: '0 auto' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

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
                  <span className="about__info-icon"><BsGeoAltFill /></span>
                  {about.location}
                </li>
              )}

              {/* Email */}
              {hero?.email && (
                <li className="about__info-item">
                  <span className="about__info-icon"><BsEnvelopeFill /></span>
                  <a href={`mailto:${hero.email}`} style={{ color: 'var(--purple-light)', textDecoration: 'none' }}>
                    {hero.email}
                  </a>
                </li>
              )}

              {/* LinkedIn */}
              {hero?.linkedinUrl && (
                <li className="about__info-item">
                  <span className="about__info-icon"><BsLinkedin /></span>
                  <a href={hero.linkedinUrl} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'var(--purple-light)', textDecoration: 'none' }}>
                    LinkedIn Profile
                  </a>
                </li>
              )}

              {/* GitHub */}
              {hero?.githubUrl && (
                <li className="about__info-item">
                  <span className="about__info-icon"><BsGithub /></span>
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
                className="btn-primary" style={{ marginTop: '28px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <BsFileEarmarkPdfFill /> Download Resume
              </a>
            )}
          </div>

          {/* Stats Cards */}
          <div className="about__stats">
            <div className="about__stat-card">
              <div style={{ fontSize: '1.8rem', color: 'var(--purple-light)', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                
              </div>
              <span className="about__stat-number">{about.yearsExperience || '3+'}</span>
              <span className="about__stat-label">of Experience</span>
            </div>
            <div className="about__stat-card">
              <div style={{ fontSize: '1.8rem', color: 'var(--purple-light)', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                
              </div>
              <span className="about__stat-number">{about.projectsCompleted || '20+'}</span>
              <span className="about__stat-label">Projects Completed</span>
            </div>
            <div className="about__stat-card">
              <div style={{ fontSize: '1.8rem', color: 'var(--purple-light)', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                
              </div>
              <span className="about__stat-number">{about.technologiesCount || '10+'}</span>
              <span className="about__stat-label">Technologies</span>
            </div>
            <div className="about__stat-card">
              <div style={{ fontSize: '1.8rem', color: 'var(--purple-light)', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                
              </div>
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