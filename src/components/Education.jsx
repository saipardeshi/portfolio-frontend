// =============================================
// EDUCATION SECTION COMPONENT
// =============================================
import React from 'react';

const Education = ({ educations }) => {
  if (!educations || educations.length === 0) return null;

  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-divider"></div>
        <h2 className="section-title">My <span>Education</span></h2>
        <p className="section-subtitle">Academic background and qualifications</p>

        <div className="education__grid">
          {educations.map((edu, index) => (
            <div key={index} className="card">
              {/* Institution */}
              <p className="education__institution">🎓 {edu.institution}</p>

              {/* Degree */}
              <h3 className="education__degree">{edu.degree}</h3>

              {/* Field */}
              {edu.fieldOfStudy && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                  {edu.fieldOfStudy}
                </p>
              )}

              {/* Duration and Grade */}
              <div className="education__meta">
                {edu.duration && <span>📅 {edu.duration}</span>}
                {edu.grade && <span>⭐ {edu.grade}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;