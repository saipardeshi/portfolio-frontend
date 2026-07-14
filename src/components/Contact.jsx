// =============================================
// CONTACT SECTION COMPONENT
// Left: contact info with social links
// Right: simple contact form (you can integrate emailjs)
// =============================================
import React, { useState } from 'react';
import {
  BsEnvelopeAtFill,
  BsLinkedin,
  BsGithub,
  BsGeoAltFill,
  BsSendFill,
  BsCheckCircleFill
} from 'react-icons/bs';

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
                    <BsEnvelopeAtFill />
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
                    <BsLinkedin />
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
                    <BsGithub />
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
                  <div className="contact__link-icon">
                    <BsGeoAltFill />
                  </div>
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

            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              {sent ? (
                <>
                  <BsCheckCircleFill /> Message Sent!
                </>
              ) : (
                <>
                  <BsSendFill /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;