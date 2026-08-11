// =============================================
// EXPERIENCE SECTION COMPONENT
// Timeline layout for work experiences
// =============================================
import React from 'react';
import { BsBriefcaseFill, BsCalendar3 } from 'react-icons/bs';
import Sk from '../components/Sk';

const Experience = ({ experiences, loading }) => {
  /* ---------- SKELETON ---------- */
  if (loading) return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-divider"></div>
        <Sk className="sk-line--xl skeleton-box" style={{ width: '220px', marginBottom: '10px' }} />
        <Sk className="sk-line sk-line--sm" style={{ width: '260px', marginBottom: '40px' }} />
        <div className="experience__timeline" style={{ maxWidth: '700px' }}>
          {[1, 2].map(i => (
            <div key={i} className="experience__item">
              <div className="experience__icon-container">
                <Sk className="sk-circle skeleton-box" style={{ width: '20px', height: '20px' }} />
              </div>
              <Sk className="sk-line sk-line--lg" style={{ width: '55%', marginBottom: '10px' }} />
              <Sk className="sk-line" style={{ width: '40%', marginBottom: '8px' }} />
              <Sk className="sk-line sk-line--sm" style={{ width: '30%', marginBottom: '12px' }} />
              <Sk className="sk-line" style={{ width: '90%', marginBottom: '6px' }} />
              <Sk className="sk-line" style={{ width: '80%', marginBottom: '14px' }} />
              <div className="sk-tags">
                {[60,75,55,80].map((w,j) => <Sk key={j} className="sk-pill skeleton-box" style={{ width: `${w}px` }} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  if (!experiences || experiences.length === 0) return null;


  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-divider"></div>
        <h2 className="section-title">Work <span>Experience</span></h2>
        <p className="section-subtitle">My professional journey so far</p>

        {/* Timeline */}
        <div className="experience__timeline" style={{ maxWidth: '700px' }}>
          {experiences.map((exp, index) => (
            <div key={index} className="experience__item">
              {/* Timeline Icon Node */}
              <div className="experience__icon-container">
                <BsBriefcaseFill />
              </div>

              {/* Company name */}
              <h3 className="experience__company">{exp.company}</h3>

              {/* Role */}
              <p className="experience__role">{exp.role}</p>

              {/* Duration */}
              <p className="experience__duration" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <BsCalendar3 style={{ color: 'var(--purple-glow)' }} /> {exp.duration}
              </p>

              {/* Description */}
              {exp.description && (
                <p className="experience__description">{exp.description}</p>
              )}

              {/* Tech stack tags */}
              {exp.techStack && exp.techStack.length > 0 && (
                <div className="experience__tags">
                  {exp.techStack.map((tech, i) => (
                    <span key={i} className="tag">{tech}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;