import React, { useEffect, useRef } from 'react';

const PRE_PRIMARY = [
  { emoji: '👧', label: 'L.K.G', color: '#fde68a' },
  { emoji: '🧒', label: 'U.K.G', color: '#fecaca' },
];

const PRIMARY = [
  { emoji: '👦', label: 'Class 1', color: '#bfdbfe' },
  { emoji: '👧', label: 'Class 2', color: '#bbf7d0' },
  { emoji: '🧒', label: 'Class 3', color: '#fde68a' },
  { emoji: '👦', label: 'Class 4', color: '#c7d2fe' },
  { emoji: '👧', label: 'Class 5', color: '#fbcfe8' },
];

export default function Programs() {
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="classes" className="section classes-section" style={styles.section}>
      <div className="reveal" style={styles.header}>
        <span className="section-tag" style={styles.tag}>👶 Who Can Apply?</span>
        <h2 className="section-title" style={styles.title}>Classes Eligible</h2>
        <p style={styles.subtitle}>
          Scholarship exam open for pre-primary and primary students.
        </p>
      </div>

      <div className="reveal classes-wrap" style={styles.wrap}>
        <Group heading="PRE-PRIMARY" headingColor="var(--brand-red)" items={PRE_PRIMARY} />
        <div className="classes-divider" style={styles.divider} />
        <Group heading="PRIMARY" headingColor="var(--brand-blue)" items={PRIMARY} />
      </div>
    </section>
  );
}

function Group({ heading, headingColor, items }) {
  return (
    <div style={styles.group}>
      <div style={{ ...styles.groupHeading, color: headingColor, borderColor: headingColor }}>
        {heading}
      </div>
      <div className="class-grid" style={styles.grid}>
        {items.map((it) => (
          <div key={it.label} className="class-card" style={styles.card}>
            <div style={{ ...styles.avatar, background: it.color }}>
              <span style={styles.avatarEmoji}>{it.emoji}</span>
            </div>
            <div style={styles.cardLabel}>{it.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  section: {
    padding: '4.5rem 1.5rem',
    background: 'var(--bg)',
  },
  header: { textAlign: 'center', marginBottom: '2.5rem', maxWidth: 720, margin: '0 auto 2.5rem' },
  tag: {
    display: 'inline-block',
    background: 'var(--brand-blue-soft)',
    color: 'var(--brand-blue)',
    padding: '0.4rem 1rem',
    borderRadius: 999,
    fontWeight: 600,
    fontSize: '0.82rem',
    marginBottom: '0.75rem',
    letterSpacing: '0.5px',
  },
  title: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 'clamp(1.75rem, 4vw, 2.6rem)',
    fontWeight: 800,
    color: 'var(--ink)',
    letterSpacing: '-0.5px',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: 'var(--muted)',
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  wrap: {
    maxWidth: 1180,
    margin: '0 auto',
    background: 'white',
    border: '1px solid var(--line)',
    borderRadius: 20,
    padding: '2rem',
    display: 'grid',
    gridTemplateColumns: 'auto 1px 1fr',
    gap: '2rem',
    alignItems: 'center',
    boxShadow: '0 10px 30px rgba(15,23,42,0.04)',
  },
  group: { textAlign: 'center' },
  groupHeading: {
    display: 'inline-block',
    fontWeight: 800,
    letterSpacing: '2px',
    fontSize: '0.9rem',
    borderBottom: '3px solid',
    paddingBottom: '0.25rem',
    marginBottom: '1.25rem',
  },
  divider: {
    width: 1,
    alignSelf: 'stretch',
    background: 'var(--line)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
    gap: '1rem',
    justifyItems: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.4rem',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid white',
    boxShadow: '0 6px 16px rgba(15,23,42,0.08)',
  },
  avatarEmoji: { fontSize: '2rem', lineHeight: 1 },
  cardLabel: {
    fontWeight: 600,
    fontSize: '0.9rem',
    color: 'var(--ink)',
  },
};
