// =============================================
// SKILLS SECTION COMPONENT
// Shows skill categories with tag pills
// =============================================
import React from 'react';

const Skills = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  // Icons for different skill categories
  const categoryIcons = {
    'Frontend': '🎨',
    'Backend': '⚙️',
    'DevOps': '🚀',
    'DevOps & Tools': '🛠️',
    'Database': '🗄️',
    'Mobile': '📱',
    'Cloud': '☁️',
    'Testing': '🧪',
    'Other': '💡',
  };

  return (
    <section id="skills" className="section" style={{ background: 'rgba(124, 58, 237, 0.03)' }}>
      <div className="container">
        <div className="section-divider"></div>
        <h2 className="section-title">Technical <span>Skills</span></h2>
        <p className="section-subtitle">Technologies and tools I work with</p>

        <div className="skills__grid">
          {skills.map((category, index) => (
            <div key={index} className="card">
              {/* Category title with icon */}
              <h3 className="skills__category-title">
                {categoryIcons[category.category] || '🔧'} {category.category}
              </h3>

              {/* Skill tags */}
              <div className="skills__tags">
                {category.skills && category.skills.map((skill, i) => (
                  <span key={i} className="tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;