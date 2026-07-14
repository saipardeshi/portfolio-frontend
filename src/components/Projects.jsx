// =============================================
// PROJECTS SECTION COMPONENT
// Grid of project cards with links
// =============================================
import React from 'react';
import {
  BsGithub,
  BsBoxArrowUpRight,
  BsWindow,
  BsDatabaseFill,
  BsPhoneFill,
  BsGearFill,
  BsTerminalFill,
  BsCodeSlash
} from 'react-icons/bs';

const Projects = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  // Choose a relative Bootstrap Icon based on project tech stack keywords
  const getProjectIcon = (techStack = [], title = '') => {
    const text = (techStack.join(' ') + ' ' + title).toLowerCase();
    if (text.includes('react') || text.includes('vue') || text.includes('frontend') || text.includes('html') || text.includes('css') || text.includes('js') || text.includes('javascript')) {
      return <BsWindow />;
    }
    if (text.includes('database') || text.includes('sql') || text.includes('mongodb') || text.includes('postgres') || text.includes('mysql')) {
      return <BsDatabaseFill />;
    }
    if (text.includes('mobile') || text.includes('android') || text.includes('ios') || text.includes('flutter') || text.includes('react-native') || text.includes('kotlin')) {
      return <BsPhoneFill />;
    }
    if (text.includes('aws') || text.includes('cloud') || text.includes('docker') || text.includes('devops') || text.includes('kubernetes') || text.includes('cicd')) {
      return <BsGearFill />;
    }
    if (text.includes('backend') || text.includes('api') || text.includes('node') || text.includes('spring') || text.includes('express') || text.includes('java')) {
      return <BsTerminalFill />;
    }
    return <BsCodeSlash />;
  };

  return (
    <section id="projects" className="section" style={{ background: 'rgba(124, 58, 237, 0.03)' }}>
      <div className="container">
        <div className="section-divider"></div>
        <h2 className="section-title">My <span>Projects</span></h2>
        <p className="section-subtitle">Things I've built and shipped</p>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">

              {/* Project image or fallback icon */}
              <div className="project-card__image">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} />
                ) : (
                  <div style={{ color: 'var(--purple-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {getProjectIcon(project.techStack, project.title)}
                  </div>
                )}
              </div>

              <div className="project-card__body">
                {/* Title */}
                <h3 className="project-card__title">{project.title}</h3>

                {/* Description */}
                <p className="project-card__description">{project.description}</p>

                {/* Tech stack tags */}
                {project.techStack && project.techStack.length > 0 && (
                  <div className="project-card__tags">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="tag">{tech}</span>
                    ))}
                  </div>
                )}

                {/* Links: GitHub and Live */}
                <div className="project-card__links">
                  {project.githubLink && project.githubLink !== '#' && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card__link"
                    >
                      <BsGithub size={16} />
                      GitHub
                    </a>
                  )}

                  {project.liveLink && project.liveLink !== '#' && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card__link"
                    >
                      <BsBoxArrowUpRight size={15} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;