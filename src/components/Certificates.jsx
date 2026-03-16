// =============================================
// CERTIFICATES SECTION COMPONENT
// =============================================
import React from 'react';

const Certificates = ({ certificates }) => {
  if (!certificates || certificates.length === 0) return null;

  return (
    <section id="certificates" className="section" style={{ background: 'rgba(124, 58, 237, 0.03)' }}>
      <div className="container">
        <div className="section-divider"></div>
        <h2 className="section-title">My <span>Certificates</span></h2>
        <p className="section-subtitle">Certifications and achievements</p>

        <div className="certs__grid">
          {certificates.map((cert, index) => (
            <div key={index} className="card">
              {/* Certificate badge icon */}
              <div style={{
                width: '48px', height: '48px',
                background: 'linear-gradient(135deg, var(--purple-bright), var(--accent-pink))',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem', marginBottom: '16px'
              }}>
                🏆
              </div>

              {/* Title */}
              <h3 className="cert-card__title">{cert.title}</h3>

              {/* Issuer */}
              <p className="cert-card__issuer">{cert.issuer}</p>

              {/* Date */}
              {cert.date && <p className="cert-card__date">📅 {cert.date}</p>}

              {/* Credential link */}
              {cert.credentialUrl && cert.credentialUrl !== '#' && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-card__link"
                >
                  {/* External link icon */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  View Credential
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;