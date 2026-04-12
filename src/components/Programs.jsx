import React, { useEffect, useRef } from 'react';

const PROGRAMS = [
  { emoji: '🧠', name: 'Abacus / Brain Development', desc: 'Sharpen math skills and boost mental agility through fun abacus training!', color: 'var(--purple-pop)' },
  { emoji: '🗣️', name: 'Public Speaking',            desc: 'Build confidence and communication skills to speak boldly on any stage!',   color: 'var(--coral-orange)' },
  { emoji: '🧘', name: 'Yoga & Meditation',          desc: 'Find inner calm, flexibility, and focus through mindful movement.',          color: 'var(--grass-green)' },
  { emoji: '⚽', name: 'Indoor & Outdoor Games',     desc: 'Teamwork, sportsmanship, and loads of energy-burning fun!',                  color: 'var(--sky-blue)' },
  { emoji: '🎶', name: 'Music',                       desc: 'Discover rhythm, melody, and the joy of creating your own tunes!',           color: 'var(--bubblegum-pink)' },
  { emoji: '💃', name: 'Dance',                       desc: 'Express yourself through movement with exciting dance styles!',               color: 'var(--sun-yellow)' },
  { emoji: '📚', name: 'Storytelling & Reading',     desc: 'Ignite imagination and build reading confidence through storytelling!',      color: 'var(--coral-orange)' },
];

function ProgramCard({ program, index }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className="program-card reveal"
      style={{
        ...styles.card,
        borderColor: hovered ? program.color : 'transparent',
        transform: hovered ? 'translateY(-8px) rotate(-1deg)' : 'translateY(0) rotate(0)',
        boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.12)' : '0 4px 20px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ ...styles.topBorder, background: program.color }} />
      <div style={styles.imgPlaceholder}>
        <span style={styles.imgPlaceholderText}>📷 Add Image</span>
      </div>
      <span className="program-emoji" style={{
        ...styles.emoji,
        animation: `bounce 2s ease infinite ${index * 0.3}s`,
      }}>
        {program.emoji}
      </span>
      <h3 className="program-name" style={styles.name}>{program.name}</h3>
      <p className="program-desc" style={styles.desc}>{program.desc}</p>
    </div>
  );
}

export default function Programs() {
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
    <section ref={sectionRef} className="programs-section" style={styles.section}>
      <div className="reveal" style={styles.header}>
        <span className="section-tag" style={styles.tag}>🎯 Programs Offered</span>
        <h2 className="section-title" style={styles.title}>Choose Your Adventure!</h2>
      </div>
      <div style={styles.grid}>
        {PROGRAMS.map((p, i) => <ProgramCard key={p.name} program={p} index={i} />)}
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '4rem 2rem',
    background: 'var(--soft-white)',
    position: 'relative',
  },
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1.5rem',
    maxWidth: 1200,
    margin: '0 auto',
  },
  card: {
    background: 'white',
    borderRadius: 24,
    padding: '2rem',
    textAlign: 'center',
    border: '3px solid transparent',
    transition: 'all 0.4s cubic-bezier(0.68,-0.55,0.27,1.55)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  },
  topBorder: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 6,
    borderRadius: '24px 24px 0 0',
  },
  imgPlaceholder: {
    width: '100%',
    height: 130,
    background: 'linear-gradient(135deg, #f5f5f5, #e8e8e8)',
    borderRadius: 16,
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed #ddd',
  },
  imgPlaceholderText: { color: '#bbb', fontSize: '0.85rem', fontWeight: 600 },
  emoji: { fontSize: '3.5rem', marginBottom: '0.8rem', display: 'block' },
  name: {
    fontFamily: "'Fredoka', sans-serif",
    fontSize: '1.2rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
    color: 'var(--dark-brown)',
  },
  desc: { fontSize: '0.9rem', color: '#8D6E63', lineHeight: 1.5 },
};
