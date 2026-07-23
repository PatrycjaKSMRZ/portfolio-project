import styles from './Skills.module.css';

const Skills = () => {
  const skills = ['React', 'Tailwind', 'Python', 'Vue'];

  return (
    <section className={styles.skills}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>My Skills</h2>
        <div className={styles.skillsGrid}>
          {skills.map((skill) => (
            <div key={skill} className={styles.skillCard}>
              <span className={styles.skillName}>{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;