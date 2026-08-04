import styles from './Skills.module.css';

const Skills = () => {
  const skillCategories = [
    {
      name: 'Frontend',
      skills: ['React', 'TypeScript', 'Tailwind', 'Vue']
    },
    {
      name: 'Backend',
      skills: ['Python', 'Node.js', 'Express']
    },
    {
      name: 'Database',
      skills: ['MongoDB', 'MySQL']
    },
    {
      name: 'Tools & Others',
      skills: ['Git', 'Docker', 'Figma']
    }
  ];

  return (
    <section className={styles.skills} id="skills">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>My Skills</h2>
        <p className={styles.sectionSubtitle}>
          Technologies I work with
        </p>
        
        <div className={styles.skillsGrid}>
          {skillCategories.map((category) => (
            <div key={category.name} className={styles.skillCategory}>
              <h3 className={styles.categoryTitle}>{category.name}</h3>
              <div className={styles.skillsList}>
                {category.skills.map((skill) => (
                  <span key={skill} className={styles.skillTag}>
                    {skill}
                  </span>
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