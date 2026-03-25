// =============================================
// ADMIN DASHBOARD PAGE
// Sidebar navigation to edit each portfolio section
// All changes saved to MongoDB via Spring Boot API
// =============================================
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getPortfolio,
  updateHero, updateAbout, updateSkills,
  updateExperiences, updateProjects, updateEducations,
  updateCertificates, updateContact
} from '../api/portfolioApi';
import '../styles/global.css';
import '../styles/Admin.css';

// =============================================
// SIDEBAR NAV ITEMS
// =============================================
const NAV_SECTIONS = [
  { id: 'hero',         label: 'Hero / Home',      icon: '🏠' },
  { id: 'about',        label: 'About Me',          icon: '👤' },
  { id: 'skills',       label: 'Technical Skills',  icon: '⚡' },
  { id: 'experiences',  label: 'Experience',        icon: '💼' },
  { id: 'projects',     label: 'Projects',          icon: '🚀' },
  { id: 'educations',   label: 'Education',         icon: '🎓' },
  { id: 'certificates', label: 'Certificates',      icon: '🏆' },
  { id: 'contact',      label: 'Contact Info',      icon: '📬' },
];

// =============================================
// TOAST NOTIFICATION COMPONENT
// =============================================
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`admin__toast ${type}`}>
      {type === 'success' ? '✅' : '❌'} {message}
    </div>
  );
};

// =============================================
// TAG INPUT COMPONENT (for skills, techStack)
// Type a skill and press Enter or comma to add
// =============================================
const TagInput = ({ tags = [], onChange, placeholder }) => {
  const [input, setInput] = useState('');

  const addTag = (val) => {
    const trimmed = val.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (i) => {
    onChange(tags.filter((_, idx) => idx !== i));
  };

  return (
    <div className="admin__tags-input">
      {tags.map((tag, i) => (
        <span key={i} className="admin__tag-item">
          {tag}
          <span className="admin__tag-remove" onClick={() => removeTag(i)}>×</span>
        </span>
      ))}
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addTag(input)}
        placeholder={tags.length === 0 ? placeholder || 'Type and press Enter...' : ''}
      />
    </div>
  );
};

// =============================================
// HERO SECTION EDITOR
// =============================================
const HeroEditor = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {});
  const [saving, setSaving] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    try { await onSave(form); } finally { setSaving(false); }
  };

  return (
    <div className="admin__form">
      <div className="admin__section-label">Hero / Home Section</div>

      <div className="admin__form-row">
        <div className="admin__field">
          <label>Full Name *</label>
          <input value={form.name || ''} onChange={e => set('name', e.target.value)} placeholder="Your Name" />
        </div>
        <div className="admin__field">
          <label>Tagline / Role *</label>
          <input value={form.tagline || ''} onChange={e => set('tagline', e.target.value)} placeholder="Full Stack Developer" />
        </div>
      </div>

      <div className="admin__field">
        <label>Short Intro (1-2 lines shown on homepage)</label>
        <textarea value={form.shortIntro || ''} onChange={e => set('shortIntro', e.target.value)} placeholder="A short intro about yourself..." />
      </div>

      <div className="admin__field">
        <label>Profile Photo URL</label>
        <input value={form.profilePhotoUrl || ''} onChange={e => set('profilePhotoUrl', e.target.value)} placeholder="https://yourphoto.com/photo.jpg" />
        <span className="admin__field-hint">Direct image URL (JPG, PNG, WebP). Or use a hosting service like imgbb.com</span>
      </div>

      <div className="admin__section-label" style={{ marginTop: '8px' }}>Social Links</div>

      <div className="admin__form-row">
        <div className="admin__field">
          <label>LinkedIn URL</label>
          <input value={form.linkedinUrl || ''} onChange={e => set('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/username" />
        </div>
        <div className="admin__field">
          <label>GitHub URL</label>
          <input value={form.githubUrl || ''} onChange={e => set('githubUrl', e.target.value)} placeholder="https://github.com/username" />
        </div>
      </div>

      <div className="admin__field">
        <label>Email Address</label>
        <input type="email" value={form.email || ''} onChange={e => set('email', e.target.value)} placeholder="yourname@email.com" />
      </div>

      <button className="admin__save-btn" onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : '💾 Save Changes'}
      </button>
    </div>
  );
};

// =============================================
// ABOUT SECTION EDITOR
// =============================================
const AboutEditor = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {});
  const [saving, setSaving] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    try { await onSave(form); } finally { setSaving(false); }
  };

  return (
    <div className="admin__form">
      <div className="admin__section-label">About Me Section</div>

      <div className="admin__field">
        <label>Bio / About Text *</label>
        <textarea
          style={{ minHeight: '160px' }}
          value={form.bio || ''}
          onChange={e => set('bio', e.target.value)}
          placeholder="Write a detailed about me description..."
        />
      </div>

<div className="admin__form-row">
        <div className="admin__field">
          <label>Location</label>
          <input value={form.location || ''} onChange={e => set('location', e.target.value)} placeholder="Pune, Maharashtra, India" />
        </div>
        <div className="admin__field">
          <label>Resume URL</label>
          <input value={form.resumeUrl || ''} onChange={e => set('resumeUrl', e.target.value)} placeholder="https://drive.google.com/..." />
        </div>
      </div>

      {/* ADDED: Stats section fields for admin panel editing */}
      <div className="admin__section-label" style={{ marginTop: '8px' }}>Stats Section</div>

      <div className="admin__form-row">
        <div className="admin__field">
          <label>of Experience</label>
          <input value={form.yearsExperience || ''} onChange={e => set('yearsExperience', e.target.value)} placeholder="3+" />
        </div>
        <div className="admin__field">
          <label>Projects Completed</label>
          <input value={form.projectsCompleted || ''} onChange={e => set('projectsCompleted', e.target.value)} placeholder="20+" />
        </div>
      </div>

      <div className="admin__form-row">
        <div className="admin__field">
          <label>Technologies Count</label>
          <input value={form.technologiesCount || ''} onChange={e => set('technologiesCount', e.target.value)} placeholder="10+" />
        </div>
        <div className="admin__field">
          <label>Certifications Count</label>
          <input value={form.certificationsCount || ''} onChange={e => set('certificationsCount', e.target.value)} placeholder="5+" />
        </div>
      </div>

      <button className="admin__save-btn" onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : '💾 Save Changes'}
      </button>
    </div>
  );
};

// =============================================
// SKILLS SECTION EDITOR
// =============================================
const SkillsEditor = ({ data, onSave }) => {
  const [categories, setCategories] = useState(data || []);
  const [saving, setSaving] = useState(false);

  const addCategory = () => {
    setCategories([...categories, { category: '', skills: [] }]);
  };

  const removeCategory = (i) => {
    setCategories(categories.filter((_, idx) => idx !== i));
  };

  const updateCategory = (i, key, val) => {
    const updated = [...categories];
    updated[i] = { ...updated[i], [key]: val };
    setCategories(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try { await onSave(categories); } finally { setSaving(false); }
  };

  return (
    <div className="admin__form">
      <div className="admin__section-label">Technical Skills</div>

      {categories.map((cat, i) => (
        <div key={i} className="admin__list-item">
          <div className="admin__list-item-header">
            <span className="admin__list-item-title">Category {i + 1}</span>
            <button className="admin__remove-btn" onClick={() => removeCategory(i)}>Remove</button>
          </div>

          <div className="admin__field">
            <label>Category Name</label>
            <input
              value={cat.category || ''}
              onChange={e => updateCategory(i, 'category', e.target.value)}
              placeholder="e.g., Frontend, Backend, DevOps"
            />
          </div>

          <div className="admin__field">
            <label>Skills (press Enter or comma to add)</label>
            <TagInput
              tags={cat.skills || []}
              onChange={val => updateCategory(i, 'skills', val)}
              placeholder="Type skill and press Enter..."
            />
          </div>
        </div>
      ))}

      <button className="admin__add-btn" onClick={addCategory}>+ Add Category</button>

      <button className="admin__save-btn" onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : '💾 Save Changes'}
      </button>
    </div>
  );
};

// =============================================
// EXPERIENCE SECTION EDITOR
// =============================================
const ExperienceEditor = ({ data, onSave }) => {
  const [items, setItems] = useState(data || []);
  const [saving, setSaving] = useState(false);

  const addItem = () => {
    setItems([...items, { company: '', role: '', duration: '', description: '', techStack: [] }]);
  };

  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));

  const update = (i, key, val) => {
    const updated = [...items];
    updated[i] = { ...updated[i], [key]: val };
    setItems(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try { await onSave(items); } finally { setSaving(false); }
  };

  return (
    <div className="admin__form">
      <div className="admin__section-label">Work Experience</div>

      {items.map((item, i) => (
        <div key={i} className="admin__list-item">
          <div className="admin__list-item-header">
            <span className="admin__list-item-title">{item.company || `Experience ${i + 1}`}</span>
            <button className="admin__remove-btn" onClick={() => removeItem(i)}>Remove</button>
          </div>

          <div className="admin__form-row">
            <div className="admin__field">
              <label>Company Name</label>
              <input value={item.company || ''} onChange={e => update(i, 'company', e.target.value)} placeholder="Google" />
            </div>
            <div className="admin__field">
              <label>Your Role</label>
              <input value={item.role || ''} onChange={e => update(i, 'role', e.target.value)} placeholder="Software Engineer" />
            </div>
          </div>

          <div className="admin__field">
            <label>Duration</label>
            <input value={item.duration || ''} onChange={e => update(i, 'duration', e.target.value)} placeholder="Jan 2022 - Present" />
          </div>

          <div className="admin__field">
            <label>Description</label>
            <textarea value={item.description || ''} onChange={e => update(i, 'description', e.target.value)} placeholder="What did you do there?" />
          </div>

          <div className="admin__field">
            <label>Tech Stack Used</label>
            <TagInput tags={item.techStack || []} onChange={val => update(i, 'techStack', val)} />
          </div>
        </div>
      ))}

      <button className="admin__add-btn" onClick={addItem}>+ Add Experience</button>

      <button className="admin__save-btn" onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : '💾 Save Changes'}
      </button>
    </div>
  );
};

// =============================================
// PROJECTS SECTION EDITOR
// =============================================
const ProjectsEditor = ({ data, onSave }) => {
  const [items, setItems] = useState(data || []);
  const [saving, setSaving] = useState(false);

  const addItem = () => {
    setItems([...items, { title: '', description: '', githubLink: '', liveLink: '', techStack: [], featured: false }]);
  };

  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));

  const update = (i, key, val) => {
    const updated = [...items];
    updated[i] = { ...updated[i], [key]: val };
    setItems(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try { await onSave(items); } finally { setSaving(false); }
  };

  return (
    <div className="admin__form">
      <div className="admin__section-label">Projects</div>

      {items.map((item, i) => (
        <div key={i} className="admin__list-item">
          <div className="admin__list-item-header">
            <span className="admin__list-item-title">{item.title || `Project ${i + 1}`}</span>
            <button className="admin__remove-btn" onClick={() => removeItem(i)}>Remove</button>
          </div>

          <div className="admin__form-row">
            <div className="admin__field">
              <label>Project Title</label>
              <input value={item.title || ''} onChange={e => update(i, 'title', e.target.value)} placeholder="My Awesome Project" />
            </div>
            <div className="admin__field">
              <label>Image URL (optional)</label>
              <input value={item.imageUrl || ''} onChange={e => update(i, 'imageUrl', e.target.value)} placeholder="https://..." />
            </div>
          </div>

          <div className="admin__field">
            <label>Description</label>
            <textarea value={item.description || ''} onChange={e => update(i, 'description', e.target.value)} placeholder="What does this project do?" />
          </div>

          <div className="admin__form-row">
            <div className="admin__field">
              <label>GitHub Link</label>
              <input value={item.githubLink || ''} onChange={e => update(i, 'githubLink', e.target.value)} placeholder="https://github.com/..." />
            </div>
            <div className="admin__field">
              <label>Live Demo Link</label>
              <input value={item.liveLink || ''} onChange={e => update(i, 'liveLink', e.target.value)} placeholder="https://myproject.com" />
            </div>
          </div>

          <div className="admin__field">
            <label>Tech Stack</label>
            <TagInput tags={item.techStack || []} onChange={val => update(i, 'techStack', val)} />
          </div>
        </div>
      ))}

      <button className="admin__add-btn" onClick={addItem}>+ Add Project</button>

      <button className="admin__save-btn" onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : '💾 Save Changes'}
      </button>
    </div>
  );
};

// =============================================
// EDUCATION SECTION EDITOR
// =============================================
const EducationEditor = ({ data, onSave }) => {
  const [items, setItems] = useState(data || []);
  const [saving, setSaving] = useState(false);

  const addItem = () => {
    setItems([...items, { institution: '', degree: '', fieldOfStudy: '', duration: '', grade: '' }]);
  };

  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));

  const update = (i, key, val) => {
    const updated = [...items];
    updated[i] = { ...updated[i], [key]: val };
    setItems(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try { await onSave(items); } finally { setSaving(false); }
  };

  return (
    <div className="admin__form">
      <div className="admin__section-label">Education</div>

      {items.map((item, i) => (
        <div key={i} className="admin__list-item">
          <div className="admin__list-item-header">
            <span className="admin__list-item-title">{item.institution || `Education ${i + 1}`}</span>
            <button className="admin__remove-btn" onClick={() => removeItem(i)}>Remove</button>
          </div>

          <div className="admin__form-row">
            <div className="admin__field">
              <label>Institution Name</label>
              <input value={item.institution || ''} onChange={e => update(i, 'institution', e.target.value)} placeholder="Your University" />
            </div>
            <div className="admin__field">
              <label>Degree</label>
              <input value={item.degree || ''} onChange={e => update(i, 'degree', e.target.value)} placeholder="B.E. / B.Tech / MCA" />
            </div>
          </div>

          <div className="admin__form-row">
            <div className="admin__field">
              <label>Field of Study</label>
              <input value={item.fieldOfStudy || ''} onChange={e => update(i, 'fieldOfStudy', e.target.value)} placeholder="Computer Engineering" />
            </div>
            <div className="admin__field">
              <label>Duration</label>
              <input value={item.duration || ''} onChange={e => update(i, 'duration', e.target.value)} placeholder="2018 - 2022" />
            </div>
          </div>

          <div className="admin__field">
            <label>Grade / CGPA / Percentage</label>
            <input value={item.grade || ''} onChange={e => update(i, 'grade', e.target.value)} placeholder="8.5 CGPA / 85%" />
          </div>
        </div>
      ))}

      <button className="admin__add-btn" onClick={addItem}>+ Add Education</button>

      <button className="admin__save-btn" onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : '💾 Save Changes'}
      </button>
    </div>
  );
};

// =============================================
// CERTIFICATES SECTION EDITOR
// =============================================
const CertificatesEditor = ({ data, onSave }) => {
  const [items, setItems] = useState(data || []);
  const [saving, setSaving] = useState(false);

  const addItem = () => {
    setItems([...items, { title: '', issuer: '', date: '', credentialUrl: '' }]);
  };

  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));

  const update = (i, key, val) => {
    const updated = [...items];
    updated[i] = { ...updated[i], [key]: val };
    setItems(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try { await onSave(items); } finally { setSaving(false); }
  };

  return (
    <div className="admin__form">
      <div className="admin__section-label">Certificates</div>

      {items.map((item, i) => (
        <div key={i} className="admin__list-item">
          <div className="admin__list-item-header">
            <span className="admin__list-item-title">{item.title || `Certificate ${i + 1}`}</span>
            <button className="admin__remove-btn" onClick={() => removeItem(i)}>Remove</button>
          </div>

          <div className="admin__form-row">
            <div className="admin__field">
              <label>Certificate Title</label>
              <input value={item.title || ''} onChange={e => update(i, 'title', e.target.value)} placeholder="AWS Certified Developer" />
            </div>
            <div className="admin__field">
              <label>Issuer</label>
              <input value={item.issuer || ''} onChange={e => update(i, 'issuer', e.target.value)} placeholder="Amazon Web Services" />
            </div>
          </div>

          <div className="admin__form-row">
            <div className="admin__field">
              <label>Issue Date</label>
              <input value={item.date || ''} onChange={e => update(i, 'date', e.target.value)} placeholder="2023" />
            </div>
            <div className="admin__field">
              <label>Credential URL</label>
              <input value={item.credentialUrl || ''} onChange={e => update(i, 'credentialUrl', e.target.value)} placeholder="https://credential.link" />
            </div>
          </div>
        </div>
      ))}

      <button className="admin__add-btn" onClick={addItem}>+ Add Certificate</button>

      <button className="admin__save-btn" onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : '💾 Save Changes'}
      </button>
    </div>
  );
};

// =============================================
// CONTACT SECTION EDITOR
// =============================================
const ContactEditor = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {});
  const [saving, setSaving] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    try { await onSave(form); } finally { setSaving(false); }
  };

  return (
    <div className="admin__form">
      <div className="admin__section-label">Contact Information</div>

      <div className="admin__form-row">
        <div className="admin__field">
          <label>Email</label>
          <input type="email" value={form.email || ''} onChange={e => set('email', e.target.value)} placeholder="yourname@email.com" />
        </div>
        <div className="admin__field">
          <label>Phone</label>
          <input value={form.phone || ''} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXXXXXXX" />
        </div>
      </div>

      <div className="admin__form-row">
        <div className="admin__field">
          <label>LinkedIn URL</label>
          <input value={form.linkedinUrl || ''} onChange={e => set('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/username" />
        </div>
        <div className="admin__field">
          <label>GitHub URL</label>
          <input value={form.githubUrl || ''} onChange={e => set('githubUrl', e.target.value)} placeholder="https://github.com/username" />
        </div>
      </div>

      <div className="admin__field">
        <label>Location</label>
        <input value={form.location || ''} onChange={e => set('location', e.target.value)} placeholder="Pune, Maharashtra, India" />
      </div>

      <button className="admin__save-btn" onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : '💾 Save Changes'}
      </button>
    </div>
  );
};

// =============================================
// MAIN ADMIN DASHBOARD
// =============================================
const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Load portfolio data on mount
  useEffect(() => {
    getPortfolio()
      .then(res => setPortfolio(res.data))
      .finally(() => setLoading(false));
  }, []);

  // Show success/error toast after save
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Generic save handler - updates portfolio state after saving
  const createSaveHandler = (updateFn, sectionKey) => async (data) => {
    try {
      const res = await updateFn(data);
      setPortfolio(res.data); // Update local state with response
      showToast(`${sectionKey} updated successfully!`);
    } catch (err) {
      showToast('Failed to save. Try again.', 'error');
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Render the active section editor
  const renderEditor = () => {
    if (loading || !portfolio) {
      return <div style={{ color: 'var(--text-muted)', padding: '40px' }}>Loading portfolio data...</div>;
    }

    switch (activeSection) {
      case 'hero':
        return <HeroEditor data={portfolio.hero} onSave={createSaveHandler(updateHero, 'Hero')} />;
      case 'about':
        return <AboutEditor data={portfolio.about} onSave={createSaveHandler(updateAbout, 'About')} />;
      case 'skills':
        return <SkillsEditor data={portfolio.skills} onSave={createSaveHandler(updateSkills, 'Skills')} />;
      case 'experiences':
        return <ExperienceEditor data={portfolio.experiences} onSave={createSaveHandler(updateExperiences, 'Experience')} />;
      case 'projects':
        return <ProjectsEditor data={portfolio.projects} onSave={createSaveHandler(updateProjects, 'Projects')} />;
      case 'educations':
        return <EducationEditor data={portfolio.educations} onSave={createSaveHandler(updateEducations, 'Education')} />;
      case 'certificates':
        return <CertificatesEditor data={portfolio.certificates} onSave={createSaveHandler(updateCertificates, 'Certificates')} />;
      case 'contact':
        return <ContactEditor data={portfolio.contact} onSave={createSaveHandler(updateContact, 'Contact')} />;
      default:
        return null;
    }
  };

  const activeNav = NAV_SECTIONS.find(n => n.id === activeSection);

  return (
    <div className="admin">
      {/* ---- SIDEBAR ---- */}
      <aside className="admin__sidebar">
        <div className="admin__sidebar-logo">
          <h2>⚙️ Admin Panel</h2>
          <p>Portfolio Manager</p>
        </div>

        <nav className="admin__nav">
          {NAV_SECTIONS.map(section => (
            <button
              key={section.id}
              className={`admin__nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="admin__nav-icon">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </nav>

        <div className="admin__sidebar-footer">
          <Link to="/" className="admin__view-site">🌐 View Site</Link>
          <button className="admin__logout" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </aside>

      {/* ---- MAIN CONTENT ---- */}
      <main className="admin__content">
        <div className="admin__header">
          <h1>{activeNav?.icon} {activeNav?.label}</h1>
          <p>Edit and save your portfolio content. Changes are reflected instantly on your site.</p>
        </div>

        {renderEditor()}
      </main>

      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;