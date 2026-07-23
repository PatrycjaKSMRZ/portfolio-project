import { useState, useEffect, useCallback } from 'react';
import styles from './Header.module.css';

interface NavItem {
  label: string;
  href: string;
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Scroll handler z throttling
  useEffect(() => {
    let timeoutId: number;
    const handleScroll = () => {
      if (timeoutId) return;
      timeoutId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        timeoutId = 0;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Blokada scrolla
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeMenu]);

  const navItems: NavItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <a href="#home" className={styles.logo} aria-label="Home page">
            <span className={styles.logoText}>Adam</span>
          </a>

          <nav className={styles.desktopNav} aria-label="Main navigation">
            {navItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href} 
                className={styles.navLink}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button 
            className={styles.mobileMenuBtn}
            onClick={toggleMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ''}`} />
          </button>
        </div>

        <nav 
          id="mobile-nav"
          className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`}
          aria-hidden={!isMobileMenuOpen}
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className={styles.mobileNavLink}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;