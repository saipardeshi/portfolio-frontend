// =============================================
// EXPERIENCE SECTION COMPONENT
// Timeline layout for work experiences
// =============================================
import React from 'react';
import { BsBriefcaseFill, BsCalendar3 } from 'react-icons/bs';

const Experience = ({ experiences }) => {
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