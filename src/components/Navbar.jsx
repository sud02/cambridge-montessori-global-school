import React, { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleEnroll = () => {
    document.getElementById('enroll')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
      <img
        src="/img_src/CMG-LOGO-FINAL-png.png"
        alt="Cambridge Montessori Global School"
        style={styles.logo}
      />
      <button
        style={styles.btn}
        onClick={handleEnroll}
        onMouseEnter={e => {
          e.currentTarget.style.background = '#e85e28';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'var(--coral-orange)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Enroll Now ✨
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.6rem 2rem',
    background: 'rgba(255,255,255,0)',
    backdropFilter: 'blur(0px)',
    transition: 'all 0.35s ease',
  },
  navScrolled: {
    background: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(14px)',
    boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
  },
  logo: {
    height: 56,
    objectFit: 'contain',
    display: 'block',
  },
  btn: {
    background: 'var(--coral-orange)',
    color: 'white',
    border: 'none',
    borderRadius: 50,
    padding: '0.55rem 1.4rem',
    fontFamily: "'Fredoka', sans-serif",
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(255,107,53,0.35)',
    transition: 'all 0.25s ease',
  },
};
