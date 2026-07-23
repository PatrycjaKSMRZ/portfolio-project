import styles from './Projects.module.css';

const Projects = () => {
  const projects = [
    {
      title: 'Modern E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React and Node.js',
      technologies: ['React', 'Node.js', 'MongoDB', 'MySQL', 'Tailwind'],
      status: 'Build Complete'
    },
    {
      title: 'Weather Dashboard',
      description: 'Real-time weather monitoring dashboard with charts',
      technologies: ['React', 'API', 'Changelog'],
      status: 'Build Complete'
    },
    {
      title: 'Software Developer',
      description: 'Full Stack Developer',
      technologies: ['React', 'Node.js', 'MongoDB', 'MySQL', 'Tailwind'],
      status: 'Build Complete'
    }
  ];

  return (
    <section className={styles.projects}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>My Portfolio</h2>
        <p className={styles.sectionSubtitle}>A collection of my recent projects</p>
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <div key={index} className={styles.projectCard}>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;