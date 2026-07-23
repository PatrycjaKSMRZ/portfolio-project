import { useEffect, useRef, useCallback } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './styles/index.css';

function App() {
  // ✅ Poprawiony typ: Element | null
  const sectionCache = useRef(new Map<string, Element | null>());
  const isMounted = useRef(true);

  const handleSmoothScroll = useCallback((e: MouseEvent) => {
    if (!isMounted.current) return;

    const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
    if (!anchor) return;

    e.preventDefault();
    const href = anchor.getAttribute('href');
    if (!href) return;

    // ✅ Teraz typ jest zgodny: Element | null | undefined
    let target = sectionCache.current.get(href);
    
    if (!target) {
      target = document.querySelector(href); // ✅ Może być null, ale typ na to pozwala
      
      if (target) {
        sectionCache.current.set(href, target);
      } else {
        console.warn(`Section "${href}" not found in DOM`);
        return;
      }
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    target.scrollIntoView({
      behavior: prefersReducedMotion.matches ? 'instant' : 'smooth',
      block: 'start',
    });

    if (window.history?.pushState) {
      window.history.pushState(null, '', href);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    document.addEventListener('click', handleSmoothScroll);

    return () => {
      isMounted.current = false;
      document.removeEventListener('click', handleSmoothScroll);
      sectionCache.current.clear();
    };
  }, [handleSmoothScroll]);

  return (
    <div className="app">
      <Header />
      <main>
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </div>
  );
}

export default App;