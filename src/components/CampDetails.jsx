import React, { useEffect, useRef } from 'react';

const ROWS = [
  {
    label: 'Mode',
    value: 'Offline',
    sub: 'At School Campus',
    Icon: IconBuilding,
  },
  {
    label: 'Exam Time',
    value: '10:00 AM',
    sub: 'Onwards',
    Icon: IconClock,
  },
  {
    label: 'Duration',
    value: 'LKG / UKG · 20–30 mins',
    sub: 'Class 1 to 7 · 30–45 mins',
    Icon: IconHourglass,
  },
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

      <div className="reveal exam-grid" style={styles.split}>
        {/* Left: Date */}
        <div style={styles.dateCard}>
          <div style={styles.dateRibbon}>EXAM DATE</div>
          <div style={styles.dateMonth}>MAY</div>
          <div style={styles.dateDay}>9</div>
          <div style={styles.dateMeta}>Saturday · 2026</div>
          <div style={styles.dateFoot}>
            <IconCalendar />
            <span>Mark your calendar</span>
          </div>
        </div>

        {/* Right: Rows */}
        <div style={styles.rows}>
          {ROWS.map((r, i) => (
            <div key={r.label} style={{
              ...styles.row,
              borderTop: i === 0 ? 'none' : '1px solid var(--line)',
            }}>
              <div style={styles.rowIcon}>
                <r.Icon />
              </div>
              <div style={styles.rowText}>
                <div style={styles.rowLabel}>{r.label}</div>
                <div style={styles.rowValue}>{r.value}</div>
                <div style={styles.rowSub}>{r.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Venue band */}
      <div className="reveal exam-venue" style={styles.venueCard}>
        <div style={styles.venuePin}><IconPin /></div>
        <div style={styles.venueText}>
          <div style={styles.venueLabel}>EXAM VENUE</div>
          <div style={styles.venueName}>Cambridge Montessori Global School</div>
          <div style={styles.venueAddr}>V.V Mahal Road, Tirupati</div>
        </div>
        <a
          href="https://maps.google.com/?q=V.V+Mahal+Road+Tirupati"
          target="_blank"
          rel="noreferrer"
          className="exam-venue-btn"
          style={styles.venueBtn}
        >
          Get Directions →
        </a>
      </div>
    </section>
  );
}

/* ─── Inline SVG icons ─── */
const ip = {
  width: 22, height: 22, viewBox: '0 0 24 24',
  fill: 'none', stroke: 'currentColor', strokeWidth: 1.8,
  strokeLinecap: 'round', strokeLinejoin: 'round',
};
function IconBuilding() {
  return (
    <svg {...ip}>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M9 8h.01M9 12h.01M9 16h.01M14 8h.01M14 12h.01M14 16h.01" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg {...ip}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
function IconHourglass() {
  return (
    <svg {...ip}>
      <path d="M6 3h12M6 21h12" />
      <path d="M6 3v3a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
      <path d="M6 21v-3a6 6 0 0 1 6-6 6 6 0 0 1 6 6v3" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg {...ip} width="24" height="24">
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
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

  split: {
    maxWidth: 1080,
    margin: '0 auto 1.25rem',
    display: 'grid',
    gridTemplateColumns: '320px 1fr',
    gap: '1.25rem',
    alignItems: 'stretch',
  },

  /* Date card */
  dateCard: {
    background: 'linear-gradient(160deg, var(--brand-blue) 0%, var(--brand-blue-dark) 100%)',
    color: 'white',
    borderRadius: 20,
    padding: '1.75rem 1.5rem',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 18px 40px rgba(30,58,138,0.25)',
  },
  dateRibbon: {
    position: 'absolute',
    top: 16, right: -34,
    background: 'var(--brand-red)',
    color: 'white',
    padding: '0.3rem 2.5rem',
    fontSize: '0.7rem',
    fontWeight: 800,
    letterSpacing: '2px',
    transform: 'rotate(35deg)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.18)',
  },
  dateMonth: {
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '6px',
    color: 'var(--gold)',
    marginBottom: '0.1rem',
  },
  dateDay: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '6rem',
    fontWeight: 800,
    lineHeight: 0.95,
    letterSpacing: '-3px',
    marginBottom: '0.25rem',
  },
  dateMeta: {
    fontSize: '0.95rem',
    fontWeight: 600,
    opacity: 0.92,
    marginBottom: '1.25rem',
    letterSpacing: '0.4px',
  },
  dateFoot: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 999,
    padding: '0.4rem 0.85rem',
    fontSize: '0.78rem',
    fontWeight: 600,
  },

  /* Rows */
  rows: {
    background: 'white',
    borderRadius: 20,
    padding: '0.5rem 1.5rem',
    border: '1px solid var(--line)',
    boxShadow: '0 8px 24px rgba(15,23,42,0.04)',
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 0',
    flex: 1,
  },
  rowIcon: {
    width: 48, height: 48,
    borderRadius: 12,
    background: 'var(--brand-blue-soft)',
    color: 'var(--brand-blue)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  rowText: { display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 },
  rowLabel: {
    fontSize: '0.72rem',
    fontWeight: 700,
    color: 'var(--brand-blue)',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
  },
  rowValue: { fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)' },
  rowSub:   { fontSize: '0.85rem', color: 'var(--muted)' },

  /* Venue */
  venueCard: {
    maxWidth: 1080,
    margin: '0 auto',
    background: 'white',
    border: '1px solid var(--line)',
    borderRadius: 20,
    padding: '1.25rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1.1rem',
    boxShadow: '0 10px 30px rgba(15,23,42,0.05)',
  },
  venuePin: {
    width: 56, height: 56,
    borderRadius: 14,
    background: 'var(--brand-red)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 6px 16px rgba(220,38,38,0.28)',
  },
  venueText: { flex: 1, minWidth: 0 },
  venueLabel: { fontSize: '0.72rem', fontWeight: 700, letterSpacing: '2px', color: 'var(--brand-red)' },
  venueName:  { fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginTop: 2 },
  venueAddr:  { fontSize: '0.9rem', color: 'var(--muted)', marginTop: 1 },
  venueBtn: {
    background: 'var(--brand-blue)',
    color: 'white',
    border: 'none',
    borderRadius: 10,
    padding: '0.7rem 1.1rem',
    fontWeight: 700,
    fontSize: '0.9rem',
    flexShrink: 0,
    boxShadow: '0 6px 18px rgba(30,58,138,0.22)',
  },
};
