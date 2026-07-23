import styles from './Contact.module.css';

const Contact = () => {
  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Contact Me</h2>
        <div className={styles.contactContent}>
          <div className={styles.contactDivider} />  {/* Dodatkowy separator */}
          <p className={styles.contactText}>
            Have a project in mind? Let's work together!
          </p>
          <a href="mailto:adam@example.com" className={styles.contactEmail}>
            📧 adam@example.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;