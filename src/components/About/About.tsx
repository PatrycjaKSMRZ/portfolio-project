import styles from './About.module.css';

const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <div className={styles.aboutContent}>
          <p className={styles.aboutText}>
            I'm a passionate web developer with over 3 years of experience creating 
            modern, responsive web applications. I specialize in frontend development 
            using cutting-edge technologies to deliver exceptional user experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;