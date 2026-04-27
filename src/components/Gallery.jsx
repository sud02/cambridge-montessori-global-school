import React, { useEffect, useRef } from 'react';

const CLASS_1_7 = [
  'Mathematics',
  'English',
  'Logical Reasoning',
];

export default function Gallery() {
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
    <section ref={ref} id="syllabus" className="section syllabus-section" style={styles.section}>
      <div className="reveal" style={styles.header}>
        <span className="section-tag" style={styles.tag}>📚 Subjects & Syllabus</span>
        <h2 className="section-title" style={styles.title}>What will the exam cover?</h2>
        <p style={styles.subtitle}>
          Age-appropriate and stress-free assessments designed for young learners.
        </p>
      </div>

      <div className="syllabus-grid" style={styles.grid}>
        <Card
          title="Class 1 to 7"
          accent="var(--brand-blue)"
          items={CLASS_1_7}
          footer="Core fundamentals with reasoning to bring out the best in your child."
        />
      </div>
    </section>
  );
}

function Card({ title, accent, items, footer }) {
  return (
    <div className="reveal syllabus-card" style={styles.card}>
      <div style={{ ...styles.cardHeader, color: accent, borderBottomColor: accent }}>
        {title}
      </div>
      <ul style={styles.list}>
        {items.map((it) => (
          <li key={it} style={styles.item}>
            <span style={{ ...styles.dot, background: accent }} />
            {it}
          </li>
        ))}
      </ul>
      <div style={styles.footer}>{footer}</div>
    </div>
  );
}

const styles = {
  section: { padding: '4.5rem 1.5rem', background: 'var(--bg)' },
  header: { textAlign: 'center', maxWidth: 720, margin: '0 auto 2.5rem' },
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
  subtitle: { color: 'var(--muted)', fontSize: '1rem' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1.5rem',
    maxWidth: 1100,
    margin: '0 auto',
  },
  card: {
    background: 'white',
    border: '1px solid var(--line)',
    borderRadius: 20,
    overflow: 'hidden',
    paddingTop: '0.25rem',
    boxShadow: '0 10px 30px rgba(15,23,42,0.05)',
  },
  cardHeader: {
    padding: '1.1rem 1.5rem 0.75rem',
    fontWeight: 800,
    fontSize: '1rem',
    letterSpacing: '1.2px',
    textTransform: 'uppercase',
    borderBottom: '2px solid',
    margin: '0 1.5rem',
  },
  list: {
    listStyle: 'none',
    padding: '1.25rem 1.5rem 0.5rem',
    margin: 0,
  },
  item: {
    padding: '0.55rem 0',
    fontSize: '1rem',
    color: 'var(--ink-soft)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
  },
  dot: {
    width: 8, height: 8, borderRadius: '50%', display: 'inline-block',
  },
  footer: {
    padding: '0.9rem 1.5rem 1.25rem',
    fontSize: '0.85rem',
    color: 'var(--muted)',
    borderTop: '1px dashed var(--line)',
    marginTop: '0.5rem',
  },
};
