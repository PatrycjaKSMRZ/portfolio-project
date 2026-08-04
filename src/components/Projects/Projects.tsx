import styles from './Projects.module.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Modern E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React and Node.js',
      technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
      status: '🚧 In Development',  // Zmieniłem status
      github: 'https://github.com/yourusername/project1',
      demo: 'https://project1-demo.com',
      image: '/images/project1.jpg'  // Miejsce na obrazek
    },
    {
      id: 2,
      title: 'Weather Dashboard',
      description: 'Real-time weather monitoring dashboard with charts and forecasts',
      technologies: ['React', 'API', 'Chart.js'],
      status: '✅ Completed',
      github: 'https://github.com/yourusername/project2',
      demo: 'https://project2-demo.com',
      image: '/images/project2.jpg'
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'Personal portfolio built with React and TypeScript',
      technologies: ['React', 'TypeScript', 'CSS Modules'],
      status: '✅ Completed',
      github: 'https://github.com/yourusername/portfolio',
      demo: 'https://yourportfolio.com',
      image: '/images/project3.jpg'
    }
  ];

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>My Portfolio</h2>
        <p className={styles.sectionSubtitle}>
          A collection of my recent projects
        </p>
        
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              {/* Obrazek (jeśli jest) */}
              {project.image && (
                <div className={styles.projectImage}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className={styles.image}
                  />
                </div>
              )}
              
              <div className={styles.projectContent}>
                <div className={styles.projectHeader}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <span className={styles.projectStatus}>{project.status}</span>
                </div>
                
                <p className={styles.projectDescription}>{project.description}</p>
                
                <div className={styles.projectTechnologies}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
                
                <div className={styles.projectLinks}>
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.linkBtn}
                      aria-label="View source code"
                    >
                      <FaGithub /> Code
                    </a>
                  )}
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.linkBtn}
                      aria-label="View live demo"
                    >
                      <FaExternalLinkAlt /> Demo
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