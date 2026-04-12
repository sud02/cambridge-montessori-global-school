import React, { useEffect, useRef } from 'react';

const CARDS = [
  { emoji: '🏫', title: 'Safe Campus',     desc: 'Conducted within school premises for a secure environment.', bg: '#FFF3E0' },
  { emoji: '👩‍🏫', title: 'Expert Trainers', desc: 'Learn from experienced and passionate instructors.',          bg: '#E8F5E9' },
  { emoji: '🎉', title: 'Fun Learning',    desc: 'Activities designed to be engaging and joyful for kids.',    bg: '#E3F2FD' },
  { emoji: '🌟', title: 'Build Confidence',desc: 'Help your child discover talents and grow self-esteem.',      bg: '#F3E5F5' },
];

export default function WhyUs() {
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
        <span style={styles.tag}>💡 Why Join Us?</span>
        <h2 style={styles.title}>Why Kids Love Our Camp!</h2>
      </div>
      <div style={styles.grid}>
        {CARDS.map((card) => (
          <WhyCard key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}

function WhyCard({ card }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className="reveal"
      style={{
        ...styles.card,
        background: card.bg,
        transform: hovered ? 'scale(1.03)' : 'scale(1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={styles.icon}>{card.emoji}</span>
      <h3 style={styles.name}>{card.title}</h3>
      <p style={styles.desc}>{card.desc}</p>
    </div>
  );
}

const styles = {
  section: { padding: '4rem 2rem', background: 'white' },
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
    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
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
  card: {
    textAlign: 'center',
    padding: '2rem 1.5rem',
    borderRadius: 24,
    transition: 'transform 0.3s ease',
    cursor: 'default',
  },
  icon: { fontSize: '2.5rem', marginBottom: '0.8rem', display: 'block' },
  name: {
    fontFamily: "'Fredoka', sans-serif",
    fontWeight: 600,
    fontSize: '1.1rem',
    marginBottom: '0.4rem',
    color: 'var(--dark-brown)',
  },
  desc: { fontSize: '0.9rem', color: '#8D6E63', lineHeight: 1.5 },
};
