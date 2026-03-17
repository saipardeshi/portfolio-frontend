// =============================================
// CONTACT SECTION COMPONENT
// Left: contact info with social links
// Right: simple contact form (you can integrate emailjs)
// =============================================
import React, { useState } from 'react';

const Contact = ({ contact, hero }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  // Merge contact data from both contact and hero sections
  const email = contact?.email || hero?.email;
  const linkedin = contact?.linkedinUrl || hero?.linkedinUrl;
  const github = contact?.githubUrl || hero?.githubUrl;
  const location = contact?.location;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission - uses mailto as fallback
  // You can replace this with EmailJS or a backend endpoint
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
      window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
    }
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-divider"></div>
        <h2 className="section-title">Get In <span>Touch</span></h2>
        <p className="section-subtitle">Let's work together or just say hi!</p>

        <div className="contact__wrapper">
          {/* Left: Contact info */}
          <div>
            <h3 className="contact__heading">Let's build something great together</h3>
            <p className="contact__text">
              I'm currently open to new opportunities. Whether you have a project,
              a question, or just want to connect — my inbox is always open!
            </p>

            <div className="contact__links">
              {/* Email - opens mail client */}
              {email && (
                <a href={`mailto:${email}`} className="contact__link-item">
                  <div className="contact__link-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <div className="contact__link-label">Email Me</div>
                    <div className="contact__link-value">{email}</div>
                  </div>
                </a>
              )}

              {/* LinkedIn - opens in new tab */}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="contact__link-item">
                  <div className="contact__link-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                  </div>
                  <div>
                    <div className="contact__link-label">LinkedIn</div>
                    <div className="contact__link-value">Connect with me</div>
                  </div>
                </a>
              )}

              {/* GitHub - opens in new tab */}
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" className="contact__link-item">
                  <div className="contact__link-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                  </div>
                  <div>
                    <div className="contact__link-label">GitHub</div>
                    <div className="contact__link-value">View my code</div>
                  </div>
                </a>
              )}

              {/* Location (non-clickable) */}
              {location && (
                <div className="contact__link-item" style={{ cursor: 'default' }}>
                  <div className="contact__link-icon">📍</div>
                  <div>
                    <div className="contact__link-label">Location</div>
                    <div className="contact__link-value">{location}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Contact Form */}
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__form-group">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact__form-group">
              <label>Your Email</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact__form-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Hey, I'd love to connect..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
              {sent ? '✅ Message Sent!' : '🚀 Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;