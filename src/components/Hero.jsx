import React, { useEffect, useState } from 'react';

const EXAM_DATE = new Date('2026-05-09T10:00:00+05:30');

const TRUST_ITEMS = [
  { icon: '🛡️',  title: 'Safe & Secure',     sub: 'Environment' },
  { icon: '👩‍🏫', title: 'Experienced',       sub: 'Teachers' },
  { icon: '🏆',  title: 'Fair & Transparent', sub: 'Evaluation' },
];

const FEATURE_CARDS = [
  { icon: '🎓', label: 'Classes',          value: 'L.K.G to Class 7' },
  { icon: '💰', label: 'Registration Fee', value: '₹100 Only' },
  { icon: '🏆', label: 'Win Up to',        value: '50% Scholarship' },
];

function diff(to) {
  const ms = Math.max(0, to.getTime() - Date.now());
  const days    = Math.floor(ms / 86_400_000);
  const hours   = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

export default function Hero() {
  const [t, setT] = useState(diff(EXAM_DATE));

  useEffect(() => {
    const id = setInterval(() => setT(diff(EXAM_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  const goRegister = () =>
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="hero" style={styles.hero}>
      <div style={styles.bgBlobA} />
      <div style={styles.bgBlobB} />

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hero-desktop hero-grid" style={styles.grid}>
        <div style={styles.left}>
          <img
            src="/img_src/CMG-LOGO-FINAL-png.png"
            alt="Cambridge Montessori Global School"
            className="hero-logo"
            style={styles.logo}
          />

          <h1 className="hero-title" style={styles.title}>
            Unlock Your Child's<br />
            <span style={styles.titleAccent}>BRIGHT FUTURE</span>
          </h1>

          <div className="hero-badge" style={styles.badge}>
            SCHOLARSHIP EXAM 2026
          </div>

          <p className="hero-sub" style={styles.sub}>
            For L.K.G to Class 7<br />
            <span style={styles.subMuted}>Conducted offline at Cambridge Montessori Global School</span>
          </p>

          <div className="hero-trust" style={styles.trustRow}>
            {TRUST_ITEMS.map((it) => (
              <div key={it.title} style={styles.trustItem}>
                <span style={styles.trustIcon}>{it.icon}</span>
                <span style={styles.trustText}>
                  <span style={styles.trustTitle}>{it.title}</span>
                  <span style={styles.trustSub}>{it.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-card" style={styles.card}>
          <div style={styles.cardTopLabel}>REGISTRATION FEE</div>
          <div style={styles.cardAmount}>
            <span style={styles.rupee}>₹</span>
            <span style={styles.amountNum}>100</span>
            <span style={styles.only}>Only</span>
          </div>

          <div style={styles.limitedBar}>HURRY! LIMITED SEATS</div>

          <div className="hero-countdown" style={styles.countdown}>
            <Segment value={t.days} label="Days" />
            <Segment value={t.hours} label="Hours" />
            <Segment value={t.minutes} label="Minutes" />
            <Segment value={t.seconds} label="Seconds" />
          </div>

          <button
            className="hero-register-btn"
            style={styles.registerBtn}
            onClick={goRegister}
          >
            REGISTER NOW
          </button>

          <div style={styles.cardFoot}>
            Register online or at school · Seats fill fast
          </div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="hero-mobile" style={styles.mobileWrap}>
        {/* Navy hero banner */}
        <div style={styles.mBanner}>
          <div style={styles.mBannerGlowA} />
          <div style={styles.mBannerGlowB} />
          <div style={styles.mBannerText}>
            <div style={styles.mSmallLine}>Unlock Your Child's</div>
            <div style={styles.mBigLine}>BRIGHT FUTURE</div>
            <div style={styles.mSubLine}>Scholarship Exam 2026</div>
            <div style={styles.mOfflinePill}>Offline Exam at School Campus</div>
          </div>
          <img
            src="/img_src/hero1.png"
            alt="Happy students in uniform"
            style={styles.mBannerArt}
          />
        </div>

        {/* Feature pill cards */}
        <div style={styles.mFeatureRow}>
          {FEATURE_CARDS.map((f) => (
            <div key={f.label} style={styles.mFeatureCard}>
              <div style={styles.mFeatureIcon}>{f.icon}</div>
              <div style={styles.mFeatureLabel}>{f.label}</div>
              <div style={styles.mFeatureValue}>{f.value}</div>
            </div>
          ))}
        </div>

        {/* Countdown card */}
        <div style={styles.mCountdownCard}>
          <div style={styles.mCountdownTitle}>REGISTRATION CLOSING SOON</div>
          <div style={styles.mCountdownGrid}>
            <MSeg value={t.days} label="Days" />
            <MSeg value={t.hours} label="Hours" />
            <MSeg value={t.minutes} label="Minutes" />
            <MSeg value={t.seconds} label="Seconds" />
          </div>
        </div>

        {/* Full-width register button */}
        <button
          style={styles.mRegisterBtn}
          onClick={goRegister}
        >
          REGISTER NOW
          <span style={styles.mRegisterArrow}>›</span>
        </button>
      </div>
    </section>
  );
}

function Segment({ value, label }) {
  const v = String(value).padStart(2, '0');
  return (
    <div style={styles.seg}>
      <div style={styles.segVal}>{v}</div>
      <div style={styles.segLabel}>{label}</div>
    </div>
  );
}

function MSeg({ value, label }) {
  const v = String(value).padStart(2, '0');
  return (
    <div style={styles.mSeg}>
      <div style={styles.mSegVal}>{v}</div>
      <div style={styles.mSegLabel}>{label}</div>
    </div>
  );
}

const styles = {
  hero: {
    position: 'relative',
    background: 'linear-gradient(180deg, #f0f4ff 0%, #ffffff 70%)',
    padding: '3rem 1.5rem 4rem',
    overflow: 'hidden',
  },
  bgBlobA: {
    position: 'absolute',
    top: -120, left: -120,
    width: 320, height: 320,
    background: 'radial-gradient(circle, rgba(30,58,138,0.10) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgBlobB: {
    position: 'absolute',
    bottom: -140, right: -140,
    width: 380, height: 380,
    background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },

  /* Desktop */
  grid: {
    position: 'relative',
    maxWidth: 1200,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1.25fr 1fr',
    gap: '2.5rem',
    alignItems: 'center',
  },
  left: { textAlign: 'left' },
  logo: {
    height: 90,
    objectFit: 'contain',
    display: 'block',
    marginBottom: '1.25rem',
    filter: 'drop-shadow(0 6px 20px rgba(15,23,42,0.12))',
  },
  title: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(2rem, 5.2vw, 4rem)',
    lineHeight: 1.05,
    color: 'var(--ink)',
    letterSpacing: '-0.5px',
    marginBottom: '1rem',
  },
  titleAccent: { color: 'var(--brand-blue)' },
  badge: {
    display: 'inline-block',
    background: 'var(--brand-red)',
    color: 'white',
    padding: '0.55rem 1.4rem',
    borderRadius: 8,
    fontWeight: 700,
    fontSize: '0.95rem',
    letterSpacing: '1.2px',
    marginBottom: '1.25rem',
    boxShadow: '0 8px 20px rgba(220,38,38,0.25)',
  },
  sub: {
    fontSize: 'clamp(1rem, 2vw, 1.35rem)',
    fontWeight: 600,
    color: 'var(--ink-soft)',
    lineHeight: 1.45,
    marginBottom: '1.75rem',
  },
  subMuted: { fontWeight: 500, fontSize: '0.95rem', color: 'var(--muted)' },
  trustRow: { display: 'flex', flexWrap: 'wrap', gap: '1.25rem' },
  trustItem: { display: 'flex', alignItems: 'center', gap: '0.6rem' },
  trustIcon: {
    width: 40, height: 40,
    borderRadius: 10,
    background: 'var(--brand-blue-soft)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
  },
  trustText: { display: 'flex', flexDirection: 'column', lineHeight: 1.15 },
  trustTitle: { fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)' },
  trustSub:   { fontSize: '0.78rem', fontWeight: 500, color: 'var(--muted)' },

  card: {
    background: 'white',
    border: '2px dashed rgba(30,58,138,0.25)',
    borderRadius: 20,
    padding: '1.75rem 1.5rem',
    boxShadow: '0 20px 60px rgba(15,23,42,0.08)',
    textAlign: 'center',
  },
  cardTopLabel: {
    fontWeight: 600,
    fontSize: '0.82rem',
    letterSpacing: '2.5px',
    color: 'var(--brand-red)',
    marginBottom: '0.25rem',
  },
  cardAmount: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: '0.15rem',
    color: 'var(--ink)',
    marginBottom: '0.9rem',
  },
  rupee:     { fontSize: '2rem', fontWeight: 700 },
  amountNum: { fontSize: '3.2rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-1px' },
  only:      { fontSize: '1.25rem', fontWeight: 600, marginLeft: '0.35rem', color: 'var(--muted)' },
  limitedBar: {
    background: 'var(--brand-blue)',
    color: 'white',
    borderRadius: 999,
    fontWeight: 700,
    fontSize: '0.85rem',
    letterSpacing: '1.5px',
    padding: '0.5rem 0.75rem',
    marginBottom: '1.1rem',
  },
  countdown: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0.5rem',
    marginBottom: '1.2rem',
  },
  seg: {
    background: 'var(--bg-soft)',
    border: '1px solid var(--line)',
    borderRadius: 12,
    padding: '0.7rem 0.3rem 0.5rem',
  },
  segVal: { fontSize: '1.7rem', fontWeight: 800, color: 'var(--ink)', lineHeight: 1 },
  segLabel: { fontSize: '0.72rem', fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.5px', marginTop: 4 },
  registerBtn: {
    width: '100%',
    background: 'var(--brand-red)',
    color: 'white',
    border: 'none',
    borderRadius: 12,
    padding: '0.95rem 1rem',
    fontWeight: 700,
    fontSize: '1.1rem',
    letterSpacing: '1px',
    cursor: 'pointer',
    boxShadow: '0 10px 26px rgba(220,38,38,0.35)',
  },
  cardFoot: { fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.8rem' },

  /* ── Mobile layout ── */
  mobileWrap: {
    display: 'none',
    flexDirection: 'column',
    gap: '0.9rem',
    position: 'relative',
  },
  mBanner: {
    position: 'relative',
    background: 'linear-gradient(135deg, #0f2557 0%, #1e3a8a 60%, #1d4ed8 100%)',
    borderRadius: 18,
    padding: '1.25rem 1.1rem',
    minHeight: 180,
    overflow: 'hidden',
    color: 'white',
    boxShadow: '0 16px 40px rgba(15,37,87,0.35)',
  },
  mBannerGlowA: {
    position: 'absolute',
    top: -40, right: -40,
    width: 160, height: 160,
    background: 'radial-gradient(circle, rgba(251,191,36,0.25) 0%, transparent 70%)',
  },
  mBannerGlowB: {
    position: 'absolute',
    bottom: -40, left: -40,
    width: 180, height: 180,
    background: 'radial-gradient(circle, rgba(220,38,38,0.18) 0%, transparent 70%)',
  },
  mBannerText: {
    position: 'relative',
    paddingRight: 150,
    zIndex: 2,
  },
  mSmallLine: {
    fontSize: '0.82rem',
    fontWeight: 500,
    opacity: 0.85,
    marginBottom: 2,
  },
  mBigLine: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    fontSize: '1.55rem',
    lineHeight: 1.05,
    letterSpacing: '-0.5px',
    color: 'var(--gold)',
    marginBottom: 4,
  },
  mSubLine: {
    fontSize: '0.82rem',
    fontWeight: 500,
    opacity: 0.9,
    marginBottom: 8,
  },
  mOfflinePill: {
    display: 'inline-block',
    background: 'var(--brand-red)',
    color: 'white',
    fontSize: '0.7rem',
    fontWeight: 700,
    padding: '0.4rem 0.85rem',
    borderRadius: 999,
    letterSpacing: '0.3px',
    whiteSpace: 'nowrap',
    boxShadow: '0 6px 14px rgba(220,38,38,0.35)',
  },
  mBannerArt: {
    position: 'absolute',
    right: -53,
    bottom: -39,
    width: 360,
    height: '120%',
    objectFit: 'contain',
    objectPosition: 'right bottom',
    pointerEvents: 'none',
    filter: 'drop-shadow(0 10px 22px rgba(0,0,0,0.32))',
  },
  mFeatureRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '0.5rem',
  },
  mFeatureCard: {
    background: 'white',
    border: '1px solid var(--line)',
    borderRadius: 14,
    padding: '0.75rem 0.5rem',
    textAlign: 'center',
    boxShadow: '0 6px 18px rgba(15,23,42,0.06)',
  },
  mFeatureIcon: { fontSize: '1.3rem', marginBottom: 2 },
  mFeatureLabel: { fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 600, marginBottom: 2 },
  mFeatureValue: { fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 },

  mCountdownCard: {
    background: 'white',
    border: '1px solid var(--line)',
    borderRadius: 14,
    padding: '0.9rem 0.75rem',
    boxShadow: '0 6px 18px rgba(15,23,42,0.06)',
  },
  mCountdownTitle: {
    textAlign: 'center',
    fontSize: '0.72rem',
    fontWeight: 800,
    letterSpacing: '2px',
    color: 'var(--brand-blue)',
    marginBottom: '0.6rem',
  },
  mCountdownGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0.4rem',
  },
  mSeg: {
    background: 'var(--bg-soft)',
    borderRadius: 10,
    padding: '0.55rem 0.2rem 0.4rem',
    textAlign: 'center',
  },
  mSegVal: {
    fontSize: '1.3rem',
    fontWeight: 800,
    color: 'var(--ink)',
    lineHeight: 1,
    letterSpacing: '-0.5px',
  },
  mSegLabel: {
    fontSize: '0.65rem',
    fontWeight: 600,
    color: 'var(--muted)',
    marginTop: 4,
  },

  mRegisterBtn: {
    width: '100%',
    background: 'var(--brand-red)',
    color: 'white',
    border: 'none',
    borderRadius: 14,
    padding: '0.95rem 1rem',
    fontWeight: 800,
    fontSize: '1rem',
    letterSpacing: '1.2px',
    cursor: 'pointer',
    boxShadow: '0 12px 26px rgba(220,38,38,0.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  mRegisterArrow: {
    fontSize: '1.4rem',
    fontWeight: 800,
    lineHeight: 1,
  },
};
