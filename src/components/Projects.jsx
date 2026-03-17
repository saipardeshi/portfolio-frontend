// =============================================
// PROJECTS SECTION COMPONENT
// Grid of project cards with links
// =============================================
import React from 'react';

const Projects = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  // Emoji icons for project cards when no image
  const projectEmojis = ['🚀', '⚡', '🛠️', '💻', '🎯', '🌐', '🔥', '🎨'];

  return (
    <section id="projects" className="section" style={{ background: 'rgba(124, 58, 237, 0.03)' }}>
      <div className="container">
        <div className="section-divider"></div>
        <h2 className="section-title">My <span>Projects</span></h2>
        <p className="section-subtitle">Things I've built and shipped</p>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">

              {/* Project image or emoji placeholder */}
              <div className="project-card__image">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} />
                ) : (
                  <span>{projectEmojis[index % projectEmojis.length]}</span>
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
                      {/* GitHub icon */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                      </svg>
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
                      {/* External link icon */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
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