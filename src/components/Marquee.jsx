import React from 'react';

const ITEMS = [
  '🌟 Limited Seats Available!',
  '📅 Summer 2026',
  '🎯 10 Days of Fun & Learning',
  '⏰ 2.5 – 3 Hours Daily',
  '📍 Within School Campus',
  '🌈 Enroll Now!',
];

const allItems = [...ITEMS, ...ITEMS]; // duplicate for seamless loop

export default function Marquee() {
  return (
    <div style={styles.wrap}>
      <div style={styles.track}>
        {allItems.map((item, i) => (
          <span key={i} style={styles.item}>{item}</span>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    background: 'var(--coral-orange)',
    overflow: 'hidden',
    padding: '0.8rem 0',
    position: 'relative',
    zIndex: 10,
  },
  track: {
    display: 'flex',
    animation: 'marquee 20s linear infinite',
    whiteSpace: 'nowrap',
  },
  item: {
    fontFamily: "'Fredoka', sans-serif",
    fontWeight: 600,
    color: 'white',
    fontSize: '1rem',
    padding: '0 2rem',
    flexShrink: 0,
  },
};
