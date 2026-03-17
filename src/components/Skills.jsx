import React from 'react';

const Skills = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

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
    <section id="skills" className="section" style={{ background: 'rgba(124, 58, 237, 0.03)', position: 'relative', overflow: 'hidden' }}>

      {/* ---- ANIMATED ORBIT BACKGROUND ---- */}
<div style={{
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0.85,
  pointerEvents: 'none',
  zIndex: 0,
  overflow: 'hidden'
}}>
  <div style={{ position: 'relative', width: '500px', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

{/* Orbit 1 - HTML5 + CSS3 */}
<div style={{ position: 'absolute', width: '180px', height: '180px', borderRadius: '50%', border: '1.5px dashed #7F77DD', animation: 'spin 8s linear infinite' }}>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
    style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', width: '28px', height: '28px', opacity: 0.35 }} alt="html5" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
    style={{ position: 'absolute', bottom: '-16px', left: '50%', transform: 'translateX(-50%)', width: '28px', height: '28px', opacity: 0.35 }} alt="css3" />
</div>

{/* Orbit 2 - JavaScript + Tailwind */}
<div style={{ position: 'absolute', width: '290px', height: '290px', borderRadius: '50%', border: '1.5px dashed #A78BFA', animation: 'spin 14s linear infinite reverse' }}>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
    style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', width: '28px', height: '28px', opacity: 0.35 }} alt="javascript" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
    style={{ position: 'absolute', bottom: '-21px', left: '50%', transform: 'translateX(-50%)', width: '42px', height: '42px' }} alt="tailwind" />
</div>

{/* Orbit 3 - Java + Spring */}
<div style={{ position: 'absolute', width: '390px', height: '390px', borderRadius: '50%', border: '1.5px dashed #7C6FCD', animation: 'spin 20s linear infinite' }}>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
    style={{ position: 'absolute', top: '-21px', left: '50%', transform: 'translateX(-50%)', width: '42px', height: '42px' }} alt="java" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg"
    style={{ position: 'absolute', bottom: '-21px', left: '50%', transform: 'translateX(-50%)', width: '42px', height: '42px' }} alt="spring" />
</div>

{/* Orbit 4 - React + MongoDB */}
<div style={{ position: 'absolute', width: '490px', height: '490px', borderRadius: '50%', border: '1.5px dashed #4F3F8A', animation: 'spin 28s linear infinite reverse' }}>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    style={{ position: 'absolute', top: '-21px', left: '50%', transform: 'translateX(-50%)', width: '42px', height: '42px' }} alt="react" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
    style={{ position: 'absolute', bottom: '-21px', left: '50%', transform: 'translateX(-50%)', width: '42px', height: '42px' }} alt="mongodb" />
</div>
  </div>
</div>
{/* ---- END BACKGROUND ---- */}

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-divider"></div>
        <h2 className="section-title">Technical <span>Skills</span></h2>
        <p className="section-subtitle">Technologies and tools I work with</p>

        <div className="skills__grid">
          {skills.map((category, index) => (
            <div key={index} className="card">
              <h3 className="skills__category-title">
                {categoryIcons[category.category] || '🔧'} {category.category}
              </h3>
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