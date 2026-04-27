import React from 'react';

const ITEMS = [
  '🎓 Scholarship Exam 2026',
  '👶 For L.K.G to Class 7',
  '🏫 Offline at School Campus',
  '🏆 Win up to 50% Scholarship',
  '💵 Registration Fee ₹100 Only',
  '⏰ Limited Seats — Register Now',
];

const allItems = [...ITEMS, ...ITEMS];

export default function Marquee() {
  return (
    <div className="cmg-marquee" style={styles.wrap}>
      <div style={styles.track}>
        {allItems.map((item, i) => (
          <span key={i} className="marquee-item" style={styles.item}>{item}</span>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    background: 'var(--brand-blue)',
    overflow: 'hidden',
    padding: '0.55rem 0',
    position: 'relative',
    zIndex: 50,
    marginTop: 72, /* leave room for fixed navbar; mobile override via .cmg-marquee rule */
  },
  track: {
    display: 'flex',
    animation: 'marquee 22s linear infinite',
    whiteSpace: 'nowrap',
  },
  item: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
    color: 'white',
    fontSize: '0.9rem',
    padding: '0 1.75rem',
    flexShrink: 0,
    letterSpacing: '0.2px',
  },
};
