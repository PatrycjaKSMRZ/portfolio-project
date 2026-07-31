import { useState, useEffect } from 'react';
import styles from './Header.module.css';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(prev => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <a href="#home" className={styles.logo}>
            <span className={styles.logoText}>Adam</span>
          </a>

          <nav className={styles.desktopNav}>
            {navItems.map(({ label, href }) => (
              <a key={href} href={href} className={styles.navLink}>
                {label}
              </a>
            ))}
          </nav>

          <button 
            className={styles.mobileMenuBtn}
            onClick={toggleMenu}
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ''}`} />
          </button>
        </div>

        <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`}>
          {navItems.map(({ label, href }) => (
            <a 
              key={href} 
              href={href} 
              className={styles.mobileNavLink}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;