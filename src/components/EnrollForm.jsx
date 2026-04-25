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
  qrSide: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 },
  qrBox: {
    width: 68, height: 68,
    background: 'white',
    border: '1px solid var(--line)',
    borderRadius: 8,
    padding: 4,
  },
  qrPattern: {
    width: '100%', height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: 1,
  },
  qrDot: { width: '100%', height: '100%', borderRadius: 1 },
  qrLabel: { fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600 },

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
  errorText: {
    color: '#dc2626',
    fontSize: '0.8rem',
    marginTop: '0.3rem',
    fontWeight: 600,
  },
};
