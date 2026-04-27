import React, { useEffect, useState } from 'react';

const DURATION = 5000;
const FADE_MS = 500;

export default function SplashScreen() {
  const [phase, setPhase] = useState(() => {
    if (typeof window === 'undefined') return 'hidden';
    return window.matchMedia('(max-width: 768px)').matches ? 'visible' : 'hidden';
  });

  useEffect(() => {
    if (phase === 'hidden') return;

    document.body.style.overflow = 'hidden';
    const t1 = setTimeout(() => setPhase('fading'), DURATION);
    const t2 = setTimeout(() => setPhase('hidden'), DURATION + FADE_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = '';
    };
  }, [phase]);

  if (phase === 'hidden') return null;

  return (
    <div
      style={{
        ...styles.wrap,
        opacity: phase === 'fading' ? 0 : 1,
        pointerEvents: phase === 'fading' ? 'none' : 'auto',
      }}
      aria-hidden={phase === 'fading'}
    >
      <div style={styles.topBanner}>Cambridge Montessori Global</div>

      <div style={styles.center}>
        <img
          src="/img_src/CMG-LOGO-FINAL-png.png"
          alt="Cambridge Montessori Global School"
          style={styles.logo}
        />
        <div style={styles.brandLines}>
          <div style={styles.brandTop}>CAMBRIDGE</div>
          <div style={styles.brandTop}>MONTESSORI</div>
          <div style={styles.brandBottom}>GLOBAL</div>
        </div>

        <div style={styles.subtitle}>Scholarship Exam 2026</div>

        <div style={styles.pill}>L.K.G TO CLASS 7</div>
      </div>

      <div style={styles.bottom}>
        <div style={styles.dots}>
          <span style={{ ...styles.dot, animationDelay: '0s' }} />
          <span style={{ ...styles.dot, animationDelay: '0.15s' }} />
          <span style={{ ...styles.dot, animationDelay: '0.3s' }} />
        </div>
        <div style={styles.tagline}>Nurturing Young Minds For A Bright Future</div>
      </div>

      {/* keyframes for the dot loader */}
      <style>{`
        @keyframes splashDot {
          0%, 80%, 100% { opacity: 0.25; transform: scale(0.85); }
          40%           { opacity: 1;    transform: scale(1.15); }
        }
        @keyframes splashRise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  wrap: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    background: 'linear-gradient(180deg, #ffffff 0%, #f0f4ff 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2rem 1.5rem',
    transition: `opacity ${FADE_MS}ms ease`,
  },
  topBanner: {
    fontSize: '0.78rem',
    fontWeight: 600,
    color: 'var(--muted)',
    letterSpacing: '0.5px',
    textAlign: 'center',
    padding: '0.5rem 1.25rem',
    border: '1px solid var(--line)',
    borderRadius: 999,
    background: 'white',
    animation: 'splashRise 0.5s ease both',
  },
  center: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: '0.5rem',
    width: '100%',
  },
  logo: {
    width: 200,
    height: 'auto',
    objectFit: 'contain',
    marginBottom: '0.5rem',
    filter: 'drop-shadow(0 12px 28px rgba(15,23,42,0.15))',
    animation: 'splashRise 0.6s ease both',
  },
  brandLines: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0,
    animation: 'splashRise 0.6s ease 0.15s both',
  },
  brandTop: {
    fontFamily: "'Poppins', serif",
    fontSize: '1.7rem',
    fontWeight: 800,
    color: 'var(--brand-blue-dark)',
    letterSpacing: '1px',
    lineHeight: 1.1,
  },
  brandBottom: {
    fontFamily: "'Poppins', serif",
    fontSize: '1.7rem',
    fontWeight: 800,
    color: 'var(--brand-blue-dark)',
    letterSpacing: '2px',
    lineHeight: 1.1,
  },
  subtitle: {
    marginTop: '1rem',
    fontSize: '1.05rem',
    fontWeight: 600,
    color: 'var(--ink-soft)',
    animation: 'splashRise 0.6s ease 0.3s both',
  },
  pill: {
    display: 'inline-block',
    background: 'var(--brand-blue)',
    color: 'white',
    fontWeight: 700,
    fontSize: '0.85rem',
    letterSpacing: '1.5px',
    padding: '0.55rem 1.25rem',
    borderRadius: 999,
    marginTop: '0.5rem',
    boxShadow: '0 10px 24px rgba(30,58,138,0.3)',
    animation: 'splashRise 0.6s ease 0.45s both',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
    paddingBottom: '0.5rem',
  },
  dots: {
    display: 'flex',
    gap: 6,
  },
  dot: {
    width: 8, height: 8,
    borderRadius: '50%',
    background: 'var(--brand-blue)',
    display: 'inline-block',
    animation: 'splashDot 1.2s ease-in-out infinite',
  },
  tagline: {
    fontSize: '0.82rem',
    color: 'var(--muted)',
    fontWeight: 500,
    textAlign: 'center',
  },
};
