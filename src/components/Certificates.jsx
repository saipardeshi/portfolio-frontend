// =============================================
// CERTIFICATES SECTION COMPONENT
// =============================================
import React from 'react';
import { BsPatchCheckFill, BsBuilding, BsCalendarEvent, BsBoxArrowUpRight } from 'react-icons/bs';

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
            <div key={index} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
              {/* Verified Certificate Icon Overlay */}
              <div style={{ position: 'absolute', right: '20px', top: '20px', fontSize: '1.6rem', color: 'var(--purple-glow)', opacity: 0.18 }}>
                <BsPatchCheckFill />
              </div>

              {/* Title */}
              <h3 className="cert-card__title">{cert.title}</h3>

              {/* Issuer */}
              <p className="cert-card__issuer" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BsBuilding style={{ fontSize: '0.85rem' }} /> {cert.issuer}
              </p>

              {/* Date */}
              {cert.date && (
                <p className="cert-card__date" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                  <BsCalendarEvent style={{ fontSize: '0.85rem' }} /> {cert.date}
                </p>
              )}

              {/* Credential link */}
              {cert.credentialUrl && cert.credentialUrl !== '#' && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-card__link"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px' }}
                >
                  <BsBoxArrowUpRight size={13} />
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