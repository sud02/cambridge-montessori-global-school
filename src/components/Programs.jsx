import React, { useEffect, useRef } from 'react';

const PRIMARY = [
  { img: '/img_src/kid2_no_bg.png', label: 'Class 1', color: '#bfdbfe', imgOriginY: '14%', imgPosY: '8%' },
  { img: '/img_src/kid3_no_bg.png', label: 'Class 2', color: '#bbf7d0', imgOriginY: '14%', imgPosY: '8%' },
  { img: '/img_src/kid1_no_bg.png', label: 'Class 3', color: '#fde68a', imgOriginY: '8%',  imgPosY: '4%' },
  { img: '/img_src/kid3_no_bg.png', label: 'Class 4', color: '#c7d2fe', imgOriginY: '14%', imgPosY: '8%' },
  { img: '/img_src/kid3_no_bg.png', label: 'Class 5', color: '#fbcfe8', imgOriginY: '14%', imgPosY: '8%' },
  { img: '/img_src/kid4_no_bg.png', label: 'Class 6', color: '#bbf7d0', imgOriginY: '14%', imgPosY: '8%' },
  { img: '/img_src/kid1_no_bg.png', label: 'Class 7', color: '#fde68a', imgOriginY: '8%',  imgPosY: '4%' },
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
          Scholarship exam open for Class 1 to Class 7 students.
        </p>
      </div>

      <div className="reveal classes-wrap" style={styles.wrap}>
        <Group heading="CLASSES" headingColor="var(--brand-blue)" items={PRIMARY} />
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
              {it.img
                ? <img
                    src={it.img}
                    alt={it.label}
                    style={{
                      ...styles.avatarImg,
                      objectPosition: `50% ${it.imgPosY ?? '12%'}`,
                      transformOrigin: `50% ${it.imgOriginY ?? '18%'}`,
                    }}
                  />
                : <span style={styles.avatarEmoji}>{it.emoji}</span>}
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
    width: 80,
    height: 80,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    border: '3px solid white',
    boxShadow: '0 6px 16px rgba(15,23,42,0.08)',
    overflow: 'hidden',
  },
  avatarEmoji: { fontSize: '2rem', lineHeight: 1, paddingBottom: 14 },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: '50% 12%',
    transform: 'scale(2.2)',
    transformOrigin: '50% 18%',
    display: 'block',
  },
  cardLabel: {
    fontWeight: 600,
    fontSize: '0.9rem',
    color: 'var(--ink)',
  },
};
