import React, { useEffect, useRef } from 'react';

const DETAILS = [
  { icon: '📅', label: 'Duration',    value: '10 Days' },
  { icon: '⏰', label: 'Daily Hours', value: '2.5 – 3 Hours' },
  { icon: '📍', label: 'Location',    value: 'Within School Campus' },
];

export default function CampDetails() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={styles.section}>
      <div className="reveal" style={styles.header}>
        <span style={styles.tag}>📋 Quick Info</span>
        <h2 style={styles.title}>Camp Details</h2>
      </div>
      <div style={styles.grid}>
        {DETAILS.map((d) => (
          <DetailCard key={d.label} detail={d} />
        ))}
      </div>
    </section>
  );
}

function DetailCard({ detail }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className="reveal"
      style={{
        ...styles.card,
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={styles.icon}>{detail.icon}</span>
      <h3 style={styles.label}>{detail.label}</h3>
      <p style={styles.value}>{detail.value}</p>
    </div>
  );
}

const styles = {
  section: {
    padding: '4rem 2rem',
    background: 'linear-gradient(135deg, var(--sun-yellow) 0%, var(--peach) 100%)',
    position: 'relative',
  },
  header: { textAlign: 'center', marginBottom: '3rem' },
  tag: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.5)',
    color: 'var(--dark-brown)',
    padding: '0.4rem 1.2rem',
    borderRadius: '30px',
    fontFamily: "'Fredoka', sans-serif",
    fontWeight: 600,
    fontSize: '0.85rem',
    marginBottom: '1rem',
    letterSpacing: '0.5px',
  },
  title: {
    fontFamily: "'Baloo 2', cursive",
    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
    fontWeight: 800,
    color: 'var(--dark-brown)',
    display: 'block',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    maxWidth: 1000,
    margin: '0 auto',
  },
  card: {
    background: 'rgba(255,255,255,0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: 24,
    padding: '2rem',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    transition: 'transform 0.3s ease',
  },
  icon: { fontSize: '2.5rem', marginBottom: '0.8rem', display: 'block' },
  label: {
    fontFamily: "'Fredoka', sans-serif",
    fontWeight: 600,
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
    color: 'var(--dark-brown)',
  },
  value: { fontSize: '1rem', color: '#5D4037', fontWeight: 600 },
};
