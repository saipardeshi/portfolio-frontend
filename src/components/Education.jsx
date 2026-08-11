// =============================================
// EDUCATION SECTION COMPONENT
// =============================================
import React from 'react';
import { BsCalendarEventFill, BsAwardFill } from 'react-icons/bs';
import Sk from '../components/Sk';

const Education = ({ educations, loading }) => {
  /* ---------- SKELETON ---------- */
  if (loading) return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-divider"></div>
        <Sk className="sk-line--xl skeleton-box" style={{ width: '200px', marginBottom: '10px' }} />
        <Sk className="sk-line sk-line--sm" style={{ width: '300px', marginBottom: '40px' }} />
        <div className="education__grid">
          {[1, 2].map(i => (
            <div key={i} className="card">
              <Sk className="sk-line sk-line--sm" style={{ width: '50%', marginBottom: '10px' }} />
              <Sk className="sk-line sk-line--lg" style={{ width: '75%', marginBottom: '10px' }} />
              <Sk className="sk-line" style={{ width: '55%', marginBottom: '16px' }} />
              <div style={{ display: 'flex', gap: '16px' }}>
                <Sk className="sk-pill skeleton-box" style={{ width: '110px' }} />
                <Sk className="sk-pill skeleton-box" style={{ width: '90px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  if (!educations || educations.length === 0) return null;


  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-divider"></div>
        <h2 className="section-title">My <span>Education</span></h2>
        <p className="section-subtitle">Academic background and qualifications</p>

        <div className="education__grid">
          {educations.map((edu, index) => (
            <div key={index} className="card" style={{ position: 'relative', overflow: 'hidden' }}>

              {/* Institution */}
              <p className="education__institution">{edu.institution}</p>

              {/* Degree */}
              <h3 className="education__degree">{edu.degree}</h3>

              {/* Field */}
              {edu.fieldOfStudy && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                  {edu.fieldOfStudy}
                </p>
              )}

              {/* Duration and Grade */}
              <div className="education__meta" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '12px', alignItems: 'center' }}>
                {edu.duration && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                    <BsCalendarEventFill size={13} style={{ color: 'var(--purple-glow)' }} /> {edu.duration}
                  </span>
                )}
                {edu.grade && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                    <BsAwardFill size={13} style={{ color: 'var(--purple-glow)' }} /> Grade: {edu.grade}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;