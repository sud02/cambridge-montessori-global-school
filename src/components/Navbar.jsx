import React, { useEffect, useState } from 'react';

const LINKS = [
  { label: 'Home',         id: 'home' },
  { label: 'About',        id: 'about' },
  { label: 'Classes',      id: 'classes' },
  { label: 'Exam Details', id: 'exam-details' },
  { label: 'Syllabus',     id: 'syllabus' },
  { label: 'Contact',      id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="cmg-nav" style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
      {/* DESKTOP layout */}
      <div className="cmg-nav-desktop" style={styles.desktopInner}>
        <button style={styles.brand} onClick={() => scrollTo('home')}>
          <img
            src="/img_src/CMG-LOGO-FINAL-png.png"
            alt="Cambridge Montessori Global School"
            style={styles.logo}
          />
          <span style={styles.brandText}>
            <span style={styles.brandName}>CAMBRIDGE MONTESSORI</span>
            <span style={styles.brandSub}>GLOBAL SCHOOL</span>
          </span>
        </button>

        <div style={styles.links}>
          {LINKS.map((l) => (
            <button key={l.id} style={styles.linkBtn} onClick={() => scrollTo(l.id)}>
              {l.label}
            </button>
          ))}
        </div>

        <button style={styles.cta} onClick={() => scrollTo('register')}>
          Register Now
        </button>
      </div>

      {/* MOBILE layout: burger · centered brand · bell */}
      <div className="cmg-nav-mobile" style={styles.mobileInner}>
        <button
          aria-label="Menu"
          style={styles.iconBtn}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span style={{ ...styles.burgerBar, transform: mobileOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
          <span style={{ ...styles.burgerBar, opacity: mobileOpen ? 0 : 1 }} />
          <span style={{ ...styles.burgerBar, transform: mobileOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
        </button>

        <button style={styles.mobileBrand} onClick={() => scrollTo('home')}>
          <img
            src="/img_src/CMG-LOGO-FINAL-png.png"
            alt="Cambridge Montessori Global School"
            style={styles.mobileLogo}
          />
          <span style={styles.mobileBrandText}>
            <span style={styles.mobileBrandName}>CAMBRIDGE MONTESSORI</span>
            <span style={styles.mobileBrandSub}>GLOBAL SCHOOL</span>
          </span>
        </button>

        <button aria-label="Notifications" style={styles.iconBtn} onClick={() => scrollTo('register')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          <span style={styles.bellDot} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className="cmg-nav-drawer"
        style={{
          ...styles.drawer,
          maxHeight: mobileOpen ? 500 : 0,
          borderTop: mobileOpen ? '1px solid var(--line)' : 'none',
        }}
      >
        {LINKS.map((l) => (
          <button key={l.id} style={styles.drawerLink} onClick={() => scrollTo(l.id)}>
            {l.label}
          </button>
        ))}
        <button style={styles.drawerCta} onClick={() => scrollTo('register')}>
          Register Now
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 100,
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(14px)',
    transition: 'box-shadow 0.3s ease, background 0.3s ease',
  },
  navScrolled: {
    background: 'rgba(255,255,255,0.98)',
    boxShadow: '0 2px 20px rgba(15,23,42,0.08)',
  },

  /* Desktop */
  desktopInner: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0.75rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
  logo: { height: 48, objectFit: 'contain', display: 'block' },
  brandText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    lineHeight: 1,
  },
  brandName: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    fontSize: '0.85rem',
    color: 'var(--brand-blue)',
    letterSpacing: '0.5px',
  },
  brandSub: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: '0.72rem',
    color: 'var(--muted)',
    letterSpacing: '1.5px',
    marginTop: 2,
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  linkBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--ink-soft)',
    fontWeight: 500,
    fontSize: '0.95rem',
    padding: '0.5rem 0.9rem',
    cursor: 'pointer',
    borderRadius: 8,
    transition: 'all 0.2s ease',
  },
  cta: {
    background: 'var(--brand-blue)',
    color: 'white',
    border: 'none',
    borderRadius: 10,
    padding: '0.65rem 1.3rem',
    fontWeight: 600,
    fontSize: '0.95rem',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(30,58,138,0.25)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },

  /* Mobile */
  mobileInner: {
    display: 'none',
    padding: '0.6rem 0.75rem',
    alignItems: 'center',
    gap: '0.5rem',
  },
  iconBtn: {
    width: 40, height: 40,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    color: 'var(--ink)',
    position: 'relative',
  },
  burgerBar: {
    width: 22,
    height: 2.5,
    background: 'var(--ink)',
    borderRadius: 2,
    transition: 'all 0.25s ease',
  },
  bellDot: {
    position: 'absolute',
    top: 8, right: 9,
    width: 8, height: 8,
    borderRadius: '50%',
    background: 'var(--brand-red)',
    border: '1.5px solid white',
  },
  mobileBrand: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    minWidth: 0,
  },
  mobileLogo: {
    height: 36,
    objectFit: 'contain',
  },
  mobileBrandText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    lineHeight: 1,
    minWidth: 0,
  },
  mobileBrandName: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    fontSize: '0.72rem',
    color: 'var(--brand-blue)',
    letterSpacing: '0.4px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 180,
  },
  mobileBrandSub: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: '0.62rem',
    color: 'var(--muted)',
    letterSpacing: '1.2px',
    marginTop: 1,
  },

  drawer: {
    overflow: 'hidden',
    transition: 'max-height 0.3s ease',
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  drawerLink: {
    background: 'transparent',
    border: 'none',
    textAlign: 'left',
    padding: '0.9rem 1.25rem',
    fontSize: '1rem',
    fontWeight: 500,
    color: 'var(--ink)',
    cursor: 'pointer',
    borderBottom: '1px solid var(--line)',
  },
  drawerCta: {
    margin: '0.9rem 1.25rem 1.1rem',
    background: 'var(--brand-red)',
    color: 'white',
    border: 'none',
    borderRadius: 10,
    padding: '0.85rem 1rem',
    fontWeight: 700,
    fontSize: '1rem',
    cursor: 'pointer',
  },
};
