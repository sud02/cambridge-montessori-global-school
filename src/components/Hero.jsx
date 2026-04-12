import React from 'react';

const STAT_PILLS = [
  { emoji: '📅', text: '10 Days' },
  { emoji: '⏰', text: '2.5–3 Hrs Daily' },
  { emoji: '📍', text: 'School Campus' },
];

const PHOTO_LABELS = ['Kid Photo 1', 'Kid Photo 2', 'Kid Photo 3'];

export default function Hero() {
  const handleEnroll = () => {
    document.getElementById('enroll')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" style={styles.hero}>
      {/* Shimmer overlay */}
      <div style={styles.shimmerOverlay} />

      {/* Clouds */}
      <div style={styles.cloudLayer}>
        <div style={{ ...styles.cloud, ...styles.cloud1 }}>
          <div style={{ ...styles.cloudBump, width: 50, height: 50, top: -25, left: 20 }} />
          <div style={{ ...styles.cloudBump, width: 70, height: 60, top: -30, left: 50 }} />
        </div>
        <div style={{ ...styles.cloud, ...styles.cloud2 }}>
          <div style={{ ...styles.cloudBump, width: 40, height: 40, top: -20, left: 15 }} />
          <div style={{ ...styles.cloudBump, width: 55, height: 45, top: -22, left: 40 }} />
        </div>
        <div style={{ ...styles.cloud, ...styles.cloud3 }}>
          <div style={{ ...styles.cloudBump, width: 45, height: 45, top: -22, left: 18 }} />
          <div style={{ ...styles.cloudBump, width: 60, height: 50, top: -25, left: 45 }} />
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <img
          src="/img_src/CMG-LOGO-FINAL-png.png"
          alt="Cambridge Montessori Global School"
          className="pop-in-0 hero-logo"
          style={styles.logoImg}
        />

        <div className="pop-in-0 hero-badge" style={styles.badge}>
          ☀️ SUMMER SKILL ENRICHMENT 2026
        </div>

        <h1 className="pop-in-1 hero-title" style={styles.title}>
          Give your child a summer full of{' '}
          <span style={styles.highlightWrap}>
            <span style={styles.highlightText}>Learning</span>
            <span style={styles.highlightBar} />
          </span>
          , Creativity &amp; Fun! 🌈
        </h1>

        <div className="pop-in-2 hero-emoji-row" style={styles.emojiRow}>
          🎨 🧠 💃 ⚽ 🎶 📚 🧘
        </div>

        <p className="pop-in-3 hero-subtitle" style={styles.subtitle}>
          Our Summer Camp is designed to enhance skills, build confidence, and create
          joyful memories through engaging activities.
        </p>

        <div className="pop-in-4 hero-pills-row" style={styles.pillsRow}>
          {STAT_PILLS.map((p) => (
            <div key={p.text} className="hero-stat-pill" style={styles.statPill}>
              {p.emoji} {p.text}
            </div>
          ))}
        </div>

        <button
          className="pop-in-5 hero-cta-btn"
          style={styles.ctaBtn}
          onClick={handleEnroll}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 10px 35px rgba(255,107,53,0.5)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 6px 25px rgba(255,107,53,0.4)';
          }}
        >
          Enroll Now ✨
        </button>

        <div className="pop-in-6 hero-images-row" style={styles.imagesRow}>
          {PHOTO_LABELS.map((label) => (
            <div key={label} className="hero-img-placeholder" style={styles.imgPlaceholder}>
              <span style={{ fontSize: '2rem' }}>👧</span>
              <span style={styles.imgLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  hero: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '3rem 2rem 2rem',
    background: 'linear-gradient(135deg, var(--sun-yellow) 0%, var(--peach) 30%, var(--sky-blue) 70%, var(--mint) 100%)',
    overflow: 'hidden',
  },
  shimmerOverlay: {
    position: 'absolute',
    top: '-50%', left: '-50%',
    width: '200%', height: '200%',
    background: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 0%, transparent 50%),
                 radial-gradient(circle at 70% 60%, rgba(255,217,61,0.2) 0%, transparent 40%)`,
    animation: 'heroShimmer 12s ease-in-out infinite',
    pointerEvents: 'none',
  },
  cloudLayer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  cloud: {
    position: 'absolute',
    background: 'rgba(255,255,255,0.7)',
    borderRadius: '50px',
    animation: 'cloudDrift linear infinite',
  },
  cloud1: { width: 120, height: 40, top: '10%', animationDuration: '25s', left: '-220px' },
  cloud2: { width: 90,  height: 30, top: '20%', animationDuration: '35s', animationDelay: '-10s', left: '-220px' },
  cloud3: { width: 100, height: 35, top: '8%',  animationDuration: '30s', animationDelay: '-20s', left: '-220px' },
  cloudBump: {
    position: 'absolute',
    background: 'rgba(255,255,255,0.7)',
    borderRadius: '50%',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 900,
    width: '100%',
  },
  logoImg: {
    height: 90,
    objectFit: 'contain',
    display: 'block',
    margin: '0 auto 1.5rem',
    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
  },
  badge: {
    display: 'inline-block',
    background: 'var(--coral-orange)',
    color: 'white',
    padding: '0.5rem 1.5rem',
    borderRadius: '50px',
    fontFamily: "'Fredoka', sans-serif",
    fontWeight: 600,
    fontSize: '0.95rem',
    letterSpacing: '1px',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 15px rgba(255,107,53,0.4)',
  },
  title: {
    fontFamily: "'Baloo 2', cursive",
    fontSize: 'clamp(1.75rem, 6vw, 4.5rem)',
    fontWeight: 800,
    lineHeight: 1.2,
    marginBottom: '1rem',
    color: 'var(--dark-brown)',
  },
  highlightWrap: {
    position: 'relative',
    display: 'inline-block',
  },
  highlightText: {
    color: 'var(--coral-orange)',
    position: 'relative',
    zIndex: 1,
  },
  highlightBar: {
    position: 'absolute',
    bottom: 2, left: 0, right: 0,
    height: 8,
    background: 'var(--sun-yellow)',
    borderRadius: 4,
    zIndex: 0,
    display: 'block',
  },
  emojiRow: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    letterSpacing: '0.25rem',
  },
  subtitle: {
    fontSize: 'clamp(0.95rem, 2.5vw, 1.3rem)',
    maxWidth: 650,
    margin: '0 auto 2rem',
    lineHeight: 1.7,
    fontWeight: 500,
    color: '#5D4037',
  },
  pillsRow: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '1.5rem',
  },
  statPill: {
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(10px)',
    padding: '0.6rem 1.5rem',
    borderRadius: '50px',
    fontWeight: 600,
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '2px solid rgba(255,255,255,0.5)',
  },
  ctaBtn: {
    display: 'inline-block',
    background: 'var(--coral-orange)',
    color: 'white',
    padding: '1rem 2.5rem',
    borderRadius: '60px',
    fontFamily: "'Fredoka', sans-serif",
    fontWeight: 700,
    fontSize: '1.3rem',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 6px 25px rgba(255,107,53,0.4)',
    transition: 'all 0.3s ease',
  },
  imagesRow: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
    marginTop: '2rem',
    flexWrap: 'wrap',
  },
  imgPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: '50%',
    border: '4px dashed rgba(255,255,255,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.3)',
    backdropFilter: 'blur(5px)',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  imgLabel: {
    color: 'rgba(62,39,35,0.6)',
    fontSize: '0.72rem',
    fontWeight: 600,
    textAlign: 'center',
    lineHeight: 1.3,
  },
};
