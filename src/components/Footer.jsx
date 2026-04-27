import React from 'react';

const QUICK_LINKS = [
  { label: 'Home',           id: 'home' },
  { label: 'About',          id: 'about' },
  { label: 'Exam Details',   id: 'exam-details' },
  { label: 'Syllabus',       id: 'syllabus' },
  { label: 'Register',       id: 'register' },
];

export default function Footer() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {/* Location / Visit Our School */}
      <section id="contact" className="section visit-section" style={styles.visitSection}>
        <div style={styles.visitHeader}>
          <span className="section-tag" style={styles.tag}>📍 Visit Our School</span>
          <h2 className="section-title" style={styles.visitTitle}>Come see us in person</h2>
          <p style={styles.visitSub}>Cambridge Montessori Global School · V.V Mahal Road, Tirupati</p>
        </div>

        <div className="visit-grid" style={styles.visitGrid}>
          <div style={styles.mapCard}>
            <iframe
              title="Cambridge Montessori Global School Map"
              src="https://maps.app.goo.gl/1inRL6MUBc9bkg3j7"
              width="100%"
              height="320"
              style={{ border: 0, display: 'block', borderRadius: 16 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div style={styles.contactCard}>
            <h3 style={styles.contactTitle}>Contact Us</h3>
            <ContactRow icon="📍" title="Address" value="V.V Mahal Road, Tirupati" />
            <ContactRow icon="📞" title="Phone"   value="+91 9109 92 9109" href="tel:+919109929109" />
            <ContactRow icon="💬" title="WhatsApp" value="+91 9109 92 9109" href="https://wa.me/919109929109" />
            <ContactRow icon="✉️" title="Email"   value="cmgstpty@gmail.com" href="mailto:cmgstpty@gmail.com" />
            <ContactRow icon="🌐" title="Website" value="www.cmgschool.in"  href="https://www.cmgschool.in" />
            <a
              href="https://maps.app.goo.gl/1inRL6MUBc9bkg3j7"
              target="_blank"
              rel="noreferrer"
              style={styles.directionsBtn}
            >
              Get Directions →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div className="footer-inner" style={styles.footerInner}>
          <div>
            <div style={styles.brandRow}>
              <img
                src="/img_src/CMG-LOGO-FINAL-png.png"
                alt="Cambridge Montessori Global School"
                style={styles.footerLogo}
              />
              <div>
                <div style={styles.footerBrand}>CAMBRIDGE MONTESSORI</div>
                <div style={styles.footerBrandSub}>GLOBAL SCHOOL</div>
              </div>
            </div>
            <p style={styles.footerTag}>
              Nurturing young minds with care, quality education and strong values.
            </p>
          </div>

          <div>
            <div style={styles.colTitle}>Quick Links</div>
            {QUICK_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} style={styles.colLink}>
                {l.label}
              </button>
            ))}
          </div>

          <div>
            <div style={styles.colTitle}>Get in Touch</div>
            <div style={styles.colLine}>📍 V.V Mahal Road, Tirupati</div>
            <div style={styles.colLine}>📞 +91 9109 92 9109</div>
            <div style={styles.colLine}>✉️ cmgstpty@gmail.com</div>
            <div style={styles.colLine}>🌐 www.cmgschool.in</div>
          </div>
        </div>

        <div style={styles.copyBar}>
          © {new Date().getFullYear()} Cambridge Montessori Global School. All Rights Reserved.
          <div style={styles.conditions}>*Conditions apply</div>
        </div>
      </footer>
    </>
  );
}

function ContactRow({ icon, title, value, href }) {
  const content = (
    <div style={styles.contactRow}>
      <div style={styles.contactIcon}>{icon}</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={styles.contactLabel}>{title}</span>
        <span style={styles.contactValue}>{value}</span>
      </div>
    </div>
  );
  return href ? <a href={href} style={{ textDecoration: 'none', color: 'inherit' }}>{content}</a> : content;
}

const styles = {
  visitSection: {
    padding: '4.5rem 1.5rem',
    background: 'var(--bg)',
  },
  visitHeader: {
    textAlign: 'center',
    maxWidth: 720,
    margin: '0 auto 2.5rem',
  },
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
  visitTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 'clamp(1.75rem, 4vw, 2.6rem)',
    fontWeight: 800,
    color: 'var(--ink)',
    marginBottom: '0.5rem',
    letterSpacing: '-0.5px',
  },
  visitSub: { color: 'var(--muted)', fontSize: '1rem' },
  visitGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    maxWidth: 1180,
    margin: '0 auto',
  },
  mapCard: {
    borderRadius: 18,
    overflow: 'hidden',
    border: '1px solid var(--line)',
    boxShadow: '0 10px 30px rgba(15,23,42,0.06)',
    background: 'var(--bg-soft)',
  },
  contactCard: {
    background: 'white',
    borderRadius: 18,
    padding: '1.75rem',
    border: '1px solid var(--line)',
    boxShadow: '0 10px 30px rgba(15,23,42,0.06)',
  },
  contactTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '1.2rem',
    color: 'var(--ink)',
    marginBottom: '1rem',
  },
  contactRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '0.65rem 0',
    borderBottom: '1px solid var(--line)',
  },
  contactIcon: {
    width: 38, height: 38,
    borderRadius: 10,
    background: 'var(--brand-blue-soft)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.05rem',
    flexShrink: 0,
  },
  contactLabel: { fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', letterSpacing: '1.2px' },
  contactValue: { fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink)' },
  directionsBtn: {
    display: 'inline-block',
    marginTop: '1rem',
    background: 'var(--brand-blue)',
    color: 'white',
    padding: '0.75rem 1.25rem',
    borderRadius: 10,
    fontWeight: 700,
    fontSize: '0.95rem',
    letterSpacing: '0.3px',
  },

  footer: {
    background: 'var(--brand-blue-dark)',
    color: '#e2e8f0',
    padding: '3rem 1.5rem 0',
  },
  footerInner: {
    maxWidth: 1180,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr 1fr',
    gap: '2rem',
  },
  brandRow: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' },
  footerLogo: {
    height: 48,
    objectFit: 'contain',
    background: 'white',
    borderRadius: 10,
    padding: 4,
  },
  footerBrand: { fontWeight: 800, fontSize: '0.95rem', color: 'white', letterSpacing: '0.5px' },
  footerBrandSub: { fontWeight: 600, fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '1.5px', marginTop: 2 },
  footerTag: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '0.9rem',
    lineHeight: 1.55,
    maxWidth: 340,
  },
  colTitle: {
    fontWeight: 700,
    color: 'white',
    fontSize: '0.95rem',
    marginBottom: '0.9rem',
    letterSpacing: '0.4px',
  },
  colLink: {
    display: 'block',
    background: 'transparent',
    border: 'none',
    color: 'rgba(255,255,255,0.75)',
    padding: '0.3rem 0',
    fontSize: '0.9rem',
    cursor: 'pointer',
    textAlign: 'left',
  },
  colLine: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: '0.9rem',
    padding: '0.3rem 0',
    lineHeight: 1.45,
  },
  copyBar: {
    maxWidth: 1180,
    margin: '2rem auto 0',
    borderTop: '1px solid rgba(255,255,255,0.12)',
    padding: '1.1rem 0 1.2rem',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.82rem',
  },
  conditions: {
    marginTop: '0.35rem',
    fontSize: '0.78rem',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.7)',
  },
};
