import React, { useEffect, useRef, useState } from 'react';

const CLASSES = [
  'L.K.G', 'U.K.G',
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
];

const INITIAL_FORM = {
  studentName: '',
  parentName: '',
  studentClass: '',
  mobile: '',
  email: '',
  previousSchool: '',
  agreed: false,
};

export default function EnrollForm({ onSubmitSuccess }) {
  const sectionRef = useRef(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState('');

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleInput = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.studentName.trim())  e.studentName  = "Student's name is required";
    if (!form.parentName.trim())   e.parentName   = "Parent's name is required";
    if (!form.studentClass)        e.studentClass = 'Please select class';
    if (!form.mobile.trim())       e.mobile       = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) e.mobile = 'Enter a valid 10-digit mobile';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Enter a valid email';
    if (!form.agreed)              e.agreed       = 'Please agree to the terms';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    // TODO: Replace with real API call
    console.log('Registration payload:', form);

    setSubmitted(true);
    onSubmitSuccess?.();
    setTimeout(() => { setSubmitted(false); setForm(INITIAL_FORM); }, 3500);
  };

  const inputStyle = (name) => ({
    ...styles.input,
    borderColor: errors[name] ? '#dc2626' : focused === name ? 'var(--brand-blue)' : 'var(--line)',
    boxShadow: focused === name ? '0 0 0 4px rgba(30,58,138,0.10)' : 'none',
    background: 'white',
  });

  return (
    <section ref={sectionRef} id="register" className="section register-section" style={styles.section}>
      <div className="reveal register-wrap" style={styles.wrap}>
        <div style={styles.header}>
          <span className="section-tag" style={styles.tag}>📝 Register for Scholarship Exam</span>
          <h2 className="section-title" style={styles.title}>Register Your Child</h2>
          <p style={styles.subtitle}>
            Fill in the details to register for Scholarship Exam 2026.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="register-form" style={styles.form}>
          <div className="form-row" style={styles.row}>
            <Field label="Student Name" icon="👤" required error={errors.studentName}>
              <input
                type="text"
                placeholder="Enter student name"
                value={form.studentName}
                onChange={handleInput('studentName')}
                onFocus={() => setFocused('studentName')}
                onBlur={() => setFocused('')}
                className="form-input"
                style={inputStyle('studentName')}
              />
            </Field>

            <Field label="Parent Name" icon="👨‍👩‍👧" required error={errors.parentName}>
              <input
                type="text"
                placeholder="Enter parent name"
                value={form.parentName}
                onChange={handleInput('parentName')}
                onFocus={() => setFocused('parentName')}
                onBlur={() => setFocused('')}
                className="form-input"
                style={inputStyle('parentName')}
              />
            </Field>
          </div>

          <div className="form-row" style={styles.row}>
            <Field label="Class" icon="🏫" required error={errors.studentClass}>
              <select
                value={form.studentClass}
                onChange={handleInput('studentClass')}
                onFocus={() => setFocused('studentClass')}
                onBlur={() => setFocused('')}
                className="form-input"
                style={{ ...inputStyle('studentClass'), appearance: 'auto' }}
              >
                <option value="">Select Class</option>
                {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>

            <Field label="Mobile Number" icon="📱" required error={errors.mobile}>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="Enter mobile number"
                value={form.mobile}
                onChange={handleInput('mobile')}
                onFocus={() => setFocused('mobile')}
                onBlur={() => setFocused('')}
                className="form-input"
                style={inputStyle('mobile')}
              />
            </Field>
          </div>

          <div className="form-row" style={styles.row}>
            <Field label="Email ID" icon="✉️" error={errors.email}>
              <input
                type="email"
                placeholder="Enter email id"
                value={form.email}
                onChange={handleInput('email')}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
                className="form-input"
                style={inputStyle('email')}
              />
            </Field>

            <Field label="Previous School (Optional)" icon="🎒">
              <input
                type="text"
                placeholder="Enter school name"
                value={form.previousSchool}
                onChange={handleInput('previousSchool')}
                onFocus={() => setFocused('previousSchool')}
                onBlur={() => setFocused('')}
                className="form-input"
                style={inputStyle('previousSchool')}
              />
            </Field>
          </div>

          {/* Fee info card */}
          <div className="fee-card" style={styles.feeCard}>
            <div>
              <div style={styles.feeLabel}>Registration Fee</div>
              <div style={styles.feeAmount}>₹100 <span style={styles.feeOnly}>Only</span></div>
            </div>
            <div style={styles.qrSide}>
              <div style={styles.qrBox}>
                <img
                  src="/img_src/QR.png"
                  alt="Scan to pay registration fee"
                  style={styles.qrImg}
                />
              </div>
              <div style={styles.qrLabel}>Scan &amp; Pay (UPI)</div>
            </div>
          </div>

          <label style={{
            ...styles.agreeRow,
            borderColor: errors.agreed ? '#dc2626' : 'var(--line)',
          }}>
            <input
              type="checkbox"
              checked={form.agreed}
              onChange={(e) => setForm(f => ({ ...f, agreed: e.target.checked }))}
              style={styles.checkbox}
            />
            <span style={styles.agreeText}>
              I agree to the <a href="#terms" style={styles.link}>terms &amp; conditions</a>.
            </span>
          </label>
          {errors.agreed && <p style={styles.errorText}>{errors.agreed}</p>}

          <button
            type="submit"
            disabled={submitted}
            className="submit-btn"
            style={{
              ...styles.submitBtn,
              background: submitted ? 'var(--success)' : 'var(--brand-blue)',
              cursor: submitted ? 'default' : 'pointer',
            }}
          >
            {submitted ? '✅ Submitted Successfully!' : 'Submit & Register'}
          </button>

          <p style={styles.smallNote}>
            After successful registration, you'll receive a confirmation on WhatsApp / SMS.
          </p>

          <div style={styles.enquireDivider}>
            <span style={styles.enquireDividerLine} />
            <span style={styles.enquireDividerText}>have questions?</span>
            <span style={styles.enquireDividerLine} />
          </div>

          <a
            href="https://wa.me/919109929109?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20the%20Scholarship%20Exam%202026."
            target="_blank"
            rel="noreferrer"
            style={styles.enquireBtn}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.52 3.48A11.93 11.93 0 0 0 12.06 0C5.5 0 .17 5.33.17 11.89c0 2.09.55 4.14 1.6 5.94L0 24l6.31-1.65a11.86 11.86 0 0 0 5.74 1.46h.01c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.17-3.43-8.44ZM12.07 21.5h-.01a9.5 9.5 0 0 1-4.84-1.32l-.35-.21-3.74.98 1-3.65-.23-.37a9.49 9.49 0 1 1 17.66-4.94c0 5.24-4.27 9.51-9.49 9.51Zm5.49-7.13c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.36.22-.66.07-.3-.15-1.27-.47-2.41-1.49-.89-.79-1.5-1.77-1.67-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.36.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.68-1.63-.93-2.24-.25-.59-.5-.51-.68-.52l-.58-.01c-.2 0-.53.07-.8.38-.27.3-1.06 1.04-1.06 2.53s1.08 2.94 1.23 3.14c.15.2 2.13 3.25 5.16 4.55.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35Z" />
            </svg>
            Enquire on WhatsApp
          </a>
        </form>
      </div>
    </section>
  );
}

function Field({ label, icon, required, error, children }) {
  return (
    <div style={styles.field}>
      <label className="form-label" style={styles.fieldLabel}>
        <span style={styles.fieldIcon}>{icon}</span>
        {label}
        {required && <span style={styles.req}>*</span>}
      </label>
      {children}
      {error && <p style={styles.errorText}>{error}</p>}
    </div>
  );
}

const styles = {
  section: {
    padding: '4.5rem 1.5rem',
    background: 'var(--bg)',
    position: 'relative',
  },
  wrap: {
    maxWidth: 920,
    margin: '0 auto',
    background: 'white',
    border: '1px solid var(--line)',
    borderRadius: 22,
    padding: '2.5rem 2rem',
    boxShadow: '0 18px 50px rgba(15,23,42,0.06)',
  },
  header: { textAlign: 'center', marginBottom: '2rem' },
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
    fontSize: 'clamp(1.6rem, 4vw, 2.3rem)',
    fontWeight: 800,
    color: 'var(--ink)',
    marginBottom: '0.35rem',
    letterSpacing: '-0.5px',
  },
  subtitle: { color: 'var(--muted)', fontSize: '0.95rem' },
  form: {},
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1rem',
  },
  field: { display: 'flex', flexDirection: 'column' },
  fieldLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--ink-soft)',
    marginBottom: '0.4rem',
  },
  fieldIcon: {
    width: 24,
    textAlign: 'center',
    fontSize: '0.95rem',
  },
  req: { color: 'var(--brand-red)', marginLeft: 2 },
  input: {
    width: '100%',
    padding: '0.85rem 1rem',
    border: '1.5px solid var(--line)',
    borderRadius: 10,
    fontFamily: "'Poppins', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 500,
    outline: 'none',
    color: 'var(--ink)',
    transition: 'all 0.2s ease',
  },
  feeCard: {
    marginTop: '1.25rem',
    marginBottom: '1rem',
    padding: '1.25rem',
    background: 'var(--brand-blue-soft)',
    border: '1px solid rgba(30,58,138,0.15)',
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  feeLabel: {
    fontSize: '0.82rem',
    fontWeight: 700,
    color: 'var(--brand-blue)',
    letterSpacing: '1.5px',
  },
  feeAmount: {
    fontSize: '2rem',
    fontWeight: 800,
    color: 'var(--ink)',
    lineHeight: 1,
    marginTop: 4,
  },
  feeOnly: { fontSize: '0.95rem', fontWeight: 600, color: 'var(--muted)' },
  qrSide: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 },
  qrBox: {
    width: 96, height: 96,
    background: 'white',
    border: '1px solid var(--line)',
    borderRadius: 10,
    padding: 6,
    boxShadow: '0 4px 14px rgba(15,23,42,0.08)',
  },
  qrImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'block',
  },
  qrLabel: { fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 },

  agreeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    padding: '0.7rem 1rem',
    border: '1.5px solid var(--line)',
    borderRadius: 10,
    cursor: 'pointer',
    userSelect: 'none',
  },
  checkbox: { width: 16, height: 16, accentColor: 'var(--brand-blue)' },
  agreeText: { fontSize: '0.9rem', color: 'var(--ink-soft)' },
  link: { color: 'var(--brand-blue)', fontWeight: 600, textDecoration: 'underline' },

  submitBtn: {
    width: '100%',
    marginTop: '1rem',
    color: 'white',
    border: 'none',
    borderRadius: 12,
    padding: '1rem',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1.05rem',
    fontWeight: 700,
    letterSpacing: '0.3px',
    boxShadow: '0 10px 26px rgba(30,58,138,0.25)',
    transition: 'all 0.2s ease',
  },
  smallNote: {
    textAlign: 'center',
    fontSize: '0.82rem',
    color: 'var(--muted)',
    marginTop: '0.9rem',
  },
  enquireDivider: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    margin: '1.25rem 0 1rem',
    color: 'var(--muted)',
    fontSize: '0.78rem',
    fontWeight: 600,
    letterSpacing: '0.5px',
  },
  enquireDividerText: {
    flexShrink: 0,
    textTransform: 'uppercase',
  },
  enquireDividerLine: {
    flex: 1,
    height: 1,
    background: 'var(--line)',
  },
  enquireBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: '100%',
    background: '#25D366',
    color: 'white',
    border: 'none',
    borderRadius: 12,
    padding: '0.95rem 1rem',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.3px',
    cursor: 'pointer',
    boxShadow: '0 10px 24px rgba(37,211,102,0.28)',
    textDecoration: 'none',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  errorText: {
    color: '#dc2626',
    fontSize: '0.8rem',
    marginTop: '0.3rem',
    fontWeight: 600,
  },
};
