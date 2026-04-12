import React from 'react';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <img
        src="/img_src/CMG-LOGO-FINAL-png.png"
        alt="Cambridge Montessori Global School"
        style={styles.logo}
      />
      <p style={styles.main}>Summer Skill Enrichment 2026 &mdash; Making summers meaningful!</p>
      <p style={styles.sub}>
        📍 Conducted within School Campus &bull; 📞 Contact the school office for queries
      </p>
      <p style={styles.copy}>
        &copy; {new Date().getFullYear()} Cambridge Montessori Global School. All rights reserved.
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    background: 'var(--dark-brown)',
    color: '#D7CCC8',
    textAlign: 'center',
    padding: '2.5rem 2rem',
    fontSize: '0.95rem',
  },
  logo: {
    height: 64,
    objectFit: 'contain',
    marginBottom: '1.2rem',
    display: 'block',
    margin: '0 auto 1.2rem',
    filter: 'brightness(0) invert(1)',
    opacity: 0.85,
  },
  main: { marginBottom: '0.5rem' },
  sub: { fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.75rem' },
  copy: { fontSize: '0.78rem', opacity: 0.5 },
};
