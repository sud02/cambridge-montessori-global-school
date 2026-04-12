import React, { useEffect, useRef, useState } from 'react';

const PHOTOS = ['Activity Photo 1', 'Activity Photo 2', 'Activity Photo 3', 'Activity Photo 4'];

function GalleryItem({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="reveal"
      style={{
        ...styles.placeholder,
        borderColor: hovered ? 'var(--sky-blue)' : '#ccc',
        background: hovered
          ? 'linear-gradient(135deg, var(--light-blue), #e3f2fd)'
          : 'linear-gradient(135deg, #f0f0f0, #e0e0e0)',
        color: hovered ? 'var(--sky-blue)' : '#aaa',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={styles.inner}>
        <span style={{ fontSize: '2rem' }}>🖼️</span>
        {label}
      </span>
    </div>
  );
}

export default function Gallery() {
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
    <section ref={sectionRef} className="gallery-section" style={styles.section}>
      <div className="reveal" style={styles.header}>
        <span className="section-tag" style={styles.tag}>📸 Glimpses</span>
        <h2 className="section-title" style={styles.title}>Moments of Joy!</h2>
      </div>
      <div style={styles.grid}>
        {PHOTOS.map((label) => <GalleryItem key={label} label={label} />)}
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '4rem 2rem', background: 'var(--soft-white)' },
  header: { textAlign: 'center', marginBottom: '3rem' },
  tag: {
    display: 'inline-block',
    background: 'var(--mint)',
    color: 'var(--grass-green)',
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
    fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
    fontWeight: 800,
    color: 'var(--dark-brown)',
    display: 'block',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.5rem',
    maxWidth: 1100,
    margin: '0 auto',
  },
  placeholder: {
    height: 200,
    borderRadius: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px dashed',
    fontWeight: 600,
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
};
