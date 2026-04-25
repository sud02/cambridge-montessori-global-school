import React, { useEffect, useRef } from 'react';

const DETAILS = [
  { icon: '🏫', label: 'Mode',     value: 'Offline',        sub: 'At School Campus' },
  { icon: '📅', label: 'Exam Date', value: '25 May 2026',   sub: 'Sunday' },
  { icon: '⏰', label: 'Exam Time', value: '10:00 AM',      sub: 'Onwards' },
  { icon: '⏱️', label: 'Duration', value: 'LKG / UKG',     sub: '20–30 mins · Class 1–5: 30–45 mins' },
];

export default function CampDetails() {
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
    <section ref={ref} id="exam-details" className="section exam-details-section" style={styles.section}>
      <div className="reveal" style={styles.header}>
        <span className="section-tag" style={styles.tag}>📋 Exam Details</span>
        <h2 className="section-title" style={styles.title}>Everything you need to know</h2>
        <p style={styles.subtitle}>
          Date, time, duration and venue for the scholarship exam.
        </p>
      </div>

      <div className="exam-grid" style={styles.grid}>
        {DETAILS.map((d) => (
          <div key={d.label} className="reveal exam-card" style={styles.card}>
            <div style={styles.iconWrap}><span style={styles.icon}>{d.icon}</span></div>
            <div style={styles.label}>{d.label}</div>
            <div style={styles.value}>{d.value}</div>
            <div style={styles.sub}>{d.sub}</div>
          </div>
        ))}
      </div>

      <div className="reveal" style={styles.venueCard}>
        <div style={styles.venuePin}>📍</div>
        <div>
          <div style={styles.venueLabel}>EXAM VENUE</div>
          <div style={styles.venueName}>Cambridge Montessori Global School</div>
          <div style={styles.venueAddr}>V.V Mahal Road, Tirupati</div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '4.5rem 1.5rem',
    background: 'var(--bg-soft)',
  },
  header: { textAlign: 'center', maxWidth: 720, margin: '0 auto 2.5rem' },
  tag: {
    display: 'inline-block',
    background: 'white',
    border: '1px solid var(--line)',
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
    marginBottom: '0.5rem',
    letterSpacing: '-0.5px',
  },
  subtitle: { color: 'var(--muted)', fontSize: '1rem' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.25rem',
    maxWidth: 1180,
    margin: '0 auto 1.5rem',
  },
  card: {
    background: 'white',
    borderRadius: 16,
    padding: '1.5rem 1.25rem',
    textAlign: 'center',
    border: '1px solid var(--line)',
    boxShadow: '0 4px 18px rgba(15,23,42,0.04)',
  },
  iconWrap: {
    width: 56, height: 56,
    borderRadius: 14,
    background: 'var(--brand-blue-soft)',
    margin: '0 auto 0.9rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: '1.7rem' },
  label: {
    fontSize: '0.78rem',
    fontWeight: 700,
    color: 'var(--brand-blue)',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginBottom: '0.35rem',
  },
  value: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'var(--ink)',
    marginBottom: '0.25rem',
  },
  sub: { fontSize: '0.85rem', color: 'var(--muted)' },

  venueCard: {
    maxWidth: 1180,
    margin: '0 auto',
    background: 'var(--brand-blue)',
    color: 'white',
    borderRadius: 16,
    padding: '1.5rem 1.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
    boxShadow: '0 14px 36px rgba(30,58,138,0.22)',
  },
  venuePin: {
    width: 52, height: 52,
    borderRadius: 12,
    background: 'rgba(255,255,255,0.18)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
    flexShrink: 0,
  },
  venueLabel: { fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', opacity: 0.85 },
  venueName:  { fontSize: '1.15rem', fontWeight: 700, marginTop: 2 },
  venueAddr:  { fontSize: '0.9rem', opacity: 0.85, marginTop: 2 },
};
