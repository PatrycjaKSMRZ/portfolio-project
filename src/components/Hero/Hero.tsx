import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Hero.module.css';

interface HeroProps {
  name?: string;
  title?: string;
  description?: string;
  cvLink?: string;
  githubLink?: string;
  linkedinLink?: string;
  email?: string;
}

const ROLES = ['React Developer', 'React Native Developer', 'Frontend Engineer'];

// ✅ SVG jako stałe poza komponentem
const GITHUB_ICON = (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LINKEDIN_ICON = (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const EMAIL_ICON = (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
  </svg>
);

const Hero = ({ 
  name = "Patrycja Kuśmierz",
  title = "React / React Native Developer",
  description = "I create beautiful, responsive web experiences using modern technologies. Passionate about clean code and user-centered design.",
  cvLink = "#",
  githubLink = "#",
  linkedinLink = "#",
  email = "#"
}: HeroProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [hasAboutSection, setHasAboutSection] = useState(false); // ✅ State zamiast document
  const heroRef = useRef<HTMLElement>(null);
  
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ✅ Sprawdzenie sekcji po stronie klienta
  useEffect(() => {
    setHasAboutSection(!!document.getElementById('about'));
  }, []);

  // ✅ Lepszy timing animacji
  useEffect(() => {
    const currentRole = ROLES[loopNum % ROLES.length];
    const typingSpeed = isDeleting ? 30 : 100; // szybsze usuwanie
    const pauseDelay = 3000; // dłuższa pauza
    
    const handleTyping = () => {
      setDisplayText(prev => {
        if (isDeleting) {
          return prev.slice(0, -1);
        }
        return currentRole.slice(0, prev.length + 1);
      });
    };
    
    typingTimerRef.current = setTimeout(handleTyping, typingSpeed);
    
    if (!isDeleting && displayText === currentRole) {
      delayTimerRef.current = setTimeout(() => setIsDeleting(true), pauseDelay);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setLoopNum(prev => prev + 1);
    }
    
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    };
  }, [displayText, isDeleting, loopNum]);

  // ✅ Intersection Observer z cleanup
  useEffect(() => {
    const currentHero = heroRef.current;
    if (!currentHero) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = currentHero.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const scrollToNext = useCallback(() => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // ✅ Prosta obsługa błędów obrazka z inline SVG
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
        <rect width="400" height="400" fill="#f0f0f0"/>
        <text x="200" y="200" font-family="Arial" font-size="40" text-anchor="middle" fill="#999">
          ${name.split(' ').map(n => n[0]).join('')}
        </text>
      </svg>
    `)}`;
  };

  return (
    <section 
      ref={heroRef}
      className={styles.hero}
      id="home"
      aria-label="Hero section"
    >
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.greeting} data-animate="fade-up">
              <span className={styles.wave} aria-hidden="true">👋</span> Hello, I'm
            </div>
            
            <h1 className={styles.heroTitle} data-animate="fade-up">
              <span className={styles.highlight}>{name}</span>
            </h1>
            
            <div className={styles.roleContainer} data-animate="fade-up">
              <span className={styles.rolePrefix}>I'm a </span>
              <span className={styles.roleText}>
                {displayText || title}
                <span className={styles.cursor}>|</span>
              </span>
            </div>
            
            <p className={styles.heroDescription} data-animate="fade-up">
              {description}
            </p>
            
            <div className={styles.heroButtons} data-animate="fade-up">
              <a 
                href="#projects" 
                className={`${styles.btn} ${styles.btnPrimary}`}
                aria-label="View my projects"
              >
                View My Work
                <span className={styles.btnArrow} aria-hidden="true">→</span>
              </a>
              <a 
                href={cvLink} 
                className={`${styles.btn} ${styles.btnSecondary}`}
                download
                aria-label="Download CV (PDF)"
              >
                Download CV
                <span className={styles.btnIcon} aria-hidden="true">📄</span>
              </a>
            </div>
            
            <div className={styles.socialLinks} data-animate="fade-up">
              <a 
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className={styles.socialLink}
              >
                {GITHUB_ICON}
              </a>
              <a 
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className={styles.socialLink}
              >
                {LINKEDIN_ICON}
              </a>
              <a 
                href={`mailto:${email}`}
                aria-label="Send email"
                className={styles.socialLink}
              >
                {EMAIL_ICON}
              </a>
            </div>
          </div>
          
          <div className={styles.heroVisual} data-animate="fade-up">
            <div className={styles.imageWrapper}>
              <div className={styles.profileImage}>
                <img 
                  src="/profile.jpg" 
                  alt={`${name} - React Developer`}
                  className={styles.imagePlaceholder}
                  width={400}
                  height={400}
                  loading="lazy"
                  onError={handleImageError}
                />
              </div>
              <div className={styles.floatingBadge}>
                <span className={styles.badgeIcon} aria-hidden="true">⚡</span>
                <span className={styles.badgeText}>1+ Years Experience</span>
              </div>
              <div className={styles.floatingBadge2}>
                <span className={styles.badgeIcon} aria-hidden="true">🚀</span>
                <span className={styles.badgeText}>5+ Projects</span>
              </div>
            </div>
          </div>
        </div>
        
        {hasAboutSection && (
          <div className={styles.scrollIndicator}>
            <button 
              onClick={scrollToNext}
              className={styles.scrollButton}
              aria-label="Scroll down to about section"
              type="button"
            >
              <span className={styles.scrollMouse}>
                <span className={styles.scrollWheel}></span>
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;