import React, { useEffect, useRef } from 'react';

const BENEFITS = [
  { icon: '🏆', tier: 'Top Performers',  percent: '50%', sub: 'Scholarship',             accent: 'var(--gold)',       bg: '#fef9c3' },
  { icon: '🎖️', tier: 'Next Level',       percent: '30%', sub: 'Scholarship',             accent: 'var(--brand-blue)', bg: 'var(--brand-blue-soft)' },
  { icon: '📜', tier: 'All Participants', percent: '100%', sub: 'Participation Certificate', accent: 'var(--success)',    bg: 'var(--success-soft)' },
];

const STEPS = [
  { n: 1, icon: '📝', title: 'Register',        desc: 'Fill the form online or at school.' },
  { n: 2, icon: '🏫', title: 'Visit School',    desc: 'Arrive on exam day with hall ticket.' },
  { n: 3, icon: '✍️', title: 'Write Exam',      desc: 'Age-appropriate classroom exam.' },
  { n: 4, icon: '📊', title: 'Results',         desc: 'Evaluation by our teachers.' },
  { n: 5, icon: '🎉', title: 'Win Scholarship', desc: 'Build your child’s bright future.' },
];

export default function WhyUs() {
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
    <section ref={ref} id="about" className="section benefits-section" style={styles.section}>
      {/* Scholarship Benefits */}
      <div className="reveal" style={styles.header}>
        <span className="section-tag" style={styles.tag}>🏆 Scholarship Benefits</span>
        <h2 className="section-title" style={styles.title}>Win up to 50% Scholarship</h2>
        <p style={styles.subtitle}>Rewarding every student — top performers, next-level scorers, and every participant.</p>
      </div>

      <div className="benefits-grid" style={styles.benefitsGrid}>
        {BENEFITS.map((b) => (
          <div key={b.tier} className="reveal benefit-card" style={{ ...styles.benefitCard, background: b.bg }}>
            <div style={styles.benefitIcon}>{b.icon}</div>
            <div style={{ ...styles.benefitPercent, color: b.accent }}>{b.percent}</div>
            <div style={styles.benefitSub}>{b.sub}</div>
            <div style={styles.benefitTier}>{b.tier}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="reveal" style={{ ...styles.header, marginTop: '4.5rem' }}>
        <span className="section-tag" style={styles.tag}>🧭 How It Works</span>
        <h2 className="section-title" style={styles.title}>Simple 5-step flow</h2>
        <p style={styles.subtitle}>From registration to scholarship — we keep it stress-free for parents and children.</p>
      </div>

      <div className="steps-grid" style={styles.stepsGrid}>
        {STEPS.map((s) => (
          <div key={s.n} className="reveal step-card" style={styles.stepCard}>
            <div style={styles.stepNumber}>{String(s.n).padStart(2, '0')}</div>
            <div style={styles.stepIcon}>{s.icon}</div>
            <div style={styles.stepTitle}>{s.title}</div>
            <div style={styles.stepDesc}>{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '4.5rem 1.5rem', background: 'var(--bg-soft)' },
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
    letterSpacing: '-0.5px',
    marginBottom: '0.5rem',
  },
  subtitle: { color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.55 },

  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
    gap: '1.25rem',
    maxWidth: 1080,
    margin: '0 auto',
  },
  benefitCard: {
    borderRadius: 18,
    padding: '1.75rem 1.25rem',
    textAlign: 'center',
    border: '1px solid rgba(15,23,42,0.06)',
  },
  benefitIcon: { fontSize: '2.4rem', marginBottom: '0.5rem' },
  benefitPercent: { fontSize: '2.4rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-1px' },
  benefitSub: { fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink)', marginTop: '0.25rem' },
  benefitTier: { fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 600, marginTop: '0.6rem', letterSpacing: '0.4px' },

  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
    maxWidth: 1180,
    margin: '0 auto',
  },
  stepCard: {
    background: 'white',
    borderRadius: 16,
    padding: '1.5rem 1.25rem',
    border: '1px solid var(--line)',
    position: 'relative',
    boxShadow: '0 4px 14px rgba(15,23,42,0.04)',
  },
  stepNumber: {
    position: 'absolute',
    top: 12, right: 14,
    fontSize: '0.75rem',
    fontWeight: 800,
    color: 'var(--muted)',
    letterSpacing: '1.5px',
  },
  stepIcon: { fontSize: '2rem', marginBottom: '0.6rem' },
  stepTitle: { fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)', marginBottom: '0.25rem' },
  stepDesc:  { fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.5 },
};
