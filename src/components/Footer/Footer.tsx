import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.footerText}>
          © {new Date().getFullYear()} Patrycja Kuśmierz. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;