import React, { useEffect, useRef, useState } from 'react';

const PROGRAMS = [
  { value: 'abacus',       label: '🧠 Abacus / Brain Dev' },
  { value: 'speaking',     label: '🗣️ Public Speaking' },
  { value: 'yoga',         label: '🧘 Yoga & Meditation' },
  { value: 'games',        label: '⚽ Indoor & Outdoor Games' },
  { value: 'music',        label: '🎶 Music' },
  { value: 'dance',        label: '💃 Dance' },
  { value: 'storytelling', label: '📚 Storytelling & Reading' },
];

const INITIAL_FORM = {
  childName: '',
  parentName: '',
  age: '',
  mobile: '',
  programs: [],
  hasSiblings: null,   // null | 'yes' | 'no'
  siblingName: '',
  siblingAge: '',
};

export default function EnrollForm({ onSubmitSuccess }) {
  const sectionRef = useRef(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ── Handlers ───────────────────────────────────────────────────────
  const handleInput = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const toggleProgram = (value) => {
    setForm((f) => ({
      ...f,
      programs: f.programs.includes(value)
        ? f.programs.filter((v) => v !== value)
        : [...f.programs, value],
    }));
  };

  const selectSibling = (choice) =>
    setForm((f) => ({
      ...f,
      hasSiblings: choice,
      siblingName: choice === 'no' ? '' : f.siblingName,
      siblingAge:  choice === 'no' ? '' : f.siblingAge,
    }));

  // ── Validation ─────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.childName.trim())    e.childName  = 'Child\'s name is required';
    if (!form.parentName.trim())   e.parentName = 'Parent\'s name is required';
    if (!form.age)                 e.age        = 'Age is required';
    if (!form.mobile.trim())       e.mobile     = 'Mobile number is required';
    if (form.programs.length === 0) e.programs  = 'Please select at least one program';
    if (form.hasSiblings === null) e.hasSiblings = 'Please select an option';
    return e;
  };

  // ── Submit ─────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    // ── FORM SUBMISSION PLACEHOLDER ────────────────────────────────
    // TODO: Replace with actual API call, e.g.:
    //   const response = await fetch('/api/enroll', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(form),
    //   });
    //   const data = await response.json();
    console.log('Form submission payload:', form);

    setSubmitted(true);
    onSubmitSuccess();

    setTimeout(() => {
      setSubmitted(false);
      setForm(INITIAL_FORM);
    }, 3000);
  };

  // ── Focus / blur for input glow ────────────────────────────────────
  const [focused, setFocused] = useState('');

  const inputStyle = (name) => ({
    ...styles.input,
    borderColor: errors[name] ? '#e53935' : focused === name ? 'var(--sky-blue)' : '#E8E0D8',
    boxShadow: focused === name ? '0 0 0 4px rgba(110,198,255,0.2)' : 'none',
    background: focused === name ? 'white' : '#FAFAFA',
  });

  return (
    <section ref={sectionRef} id="enroll" style={styles.section}>
      <div className="reveal" style={styles.container}>
        {/* Decorative circle */}
        <div style={styles.decorCircle} />

        <div style={styles.formHeader}>
          <h2 style={styles.formTitle}>📝 Enroll Your Child</h2>
          <p style={styles.formSubtitle}>Fill in the details below to confirm registration</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Child Name */}
          <FormGroup label="Child's Name" required error={errors.childName}>
            <input
              type="text"
              placeholder="Enter child's full name"
              value={form.childName}
              onChange={handleInput('childName')}
              onFocus={() => setFocused('childName')}
              onBlur={() => setFocused('')}
              style={inputStyle('childName')}
            />
          </FormGroup>

          {/* Parent Name */}
          <FormGroup label="Parent's Name" required error={errors.parentName}>
            <input
              type="text"
              placeholder="Enter parent/guardian name"
              value={form.parentName}
              onChange={handleInput('parentName')}
              onFocus={() => setFocused('parentName')}
              onBlur={() => setFocused('')}
              style={inputStyle('parentName')}
            />
          </FormGroup>

          {/* Age */}
          <FormGroup label="Age of the Child" required error={errors.age}>
            <input
              type="number"
              placeholder="e.g. 8"
              min={3}
              max={18}
              value={form.age}
              onChange={handleInput('age')}
              onFocus={() => setFocused('age')}
              onBlur={() => setFocused('')}
              style={inputStyle('age')}
            />
          </FormGroup>

          {/* Mobile */}
          <FormGroup label="Mobile No" required error={errors.mobile}>
            <input
              type="tel"
              placeholder="Enter mobile number"
              value={form.mobile}
              onChange={handleInput('mobile')}
              onFocus={() => setFocused('mobile')}
              onBlur={() => setFocused('')}
              style={inputStyle('mobile')}
            />
          </FormGroup>

          {/* Programs */}
          <FormGroup label="Programs Interested 🎯" required error={errors.programs}>
            <div style={styles.checkboxGrid}>
              {PROGRAMS.map((p) => {
                const checked = form.programs.includes(p.value);
                return (
                  <div
                    key={p.value}
                    onClick={() => toggleProgram(p.value)}
                    style={{
                      ...styles.checkItem,
                      borderColor: checked ? 'var(--grass-green)' : '#E8E0D8',
                      background: checked ? '#E8F5E9' : '#FAFAFA',
                    }}
                  >
                    <div style={{
                      ...styles.customCheck,
                      background: checked ? 'var(--grass-green)' : 'white',
                      borderColor: checked ? 'var(--grass-green)' : '#ccc',
                    }}>
                      {checked && <span style={styles.checkMark}>✓</span>}
                    </div>
                    <span style={styles.checkLabel}>{p.label}</span>
                  </div>
                );
              })}
            </div>
          </FormGroup>

          {/* Siblings */}
          <FormGroup label="Siblings" required error={errors.hasSiblings}>
            <div style={styles.radioGroup}>
              {['yes', 'no'].map((val) => {
                const selected = form.hasSiblings === val;
                return (
                  <div
                    key={val}
                    onClick={() => selectSibling(val)}
                    style={{
                      ...styles.radioItem,
                      borderColor: selected ? 'var(--purple-pop)' : '#E8E0D8',
                      background: selected ? '#F3E5F5' : '#FAFAFA',
                    }}
                  >
                    <div style={{
                      ...styles.customRadio,
                      borderColor: selected ? 'var(--purple-pop)' : '#ccc',
                    }}>
                      {selected && <div style={styles.radioDot} />}
                    </div>
                    <span style={styles.radioLabel}>{val === 'yes' ? 'Yes' : 'No'}</span>
                  </div>
                );
              })}
            </div>

            {/* Sibling conditional fields */}
            {form.hasSiblings === 'yes' && (
              <div style={styles.siblingBox}>
                <div style={styles.siblingGrid}>
                  <div>
                    <label style={styles.subLabel}>Sibling's Name</label>
                    <input
                      type="text"
                      placeholder="Sibling's name"
                      value={form.siblingName}
                      onChange={handleInput('siblingName')}
                      onFocus={() => setFocused('siblingName')}
                      onBlur={() => setFocused('')}
                      style={inputStyle('siblingName')}
                    />
                  </div>
                  <div>
                    <label style={styles.subLabel}>Sibling's Age</label>
                    <input
                      type="number"
                      placeholder="Age"
                      min={1}
                      max={18}
                      value={form.siblingAge}
                      onChange={handleInput('siblingAge')}
                      onFocus={() => setFocused('siblingAge')}
                      onBlur={() => setFocused('')}
                      style={inputStyle('siblingAge')}
                    />
                  </div>
                </div>
              </div>
            )}
          </FormGroup>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitted}
            style={{
              ...styles.submitBtn,
              background: submitted
                ? 'linear-gradient(135deg, #4CAF50, #66BB6A)'
                : 'linear-gradient(135deg, var(--coral-orange), #FF8A50)',
              cursor: submitted ? 'default' : 'pointer',
            }}
            onMouseEnter={e => {
              if (!submitted) {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 10px 35px rgba(255,107,53,0.45)';
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(255,107,53,0.3)';
            }}
          >
            {submitted ? '✅ Registered Successfully!' : '🚀 Register Now!'}
          </button>
        </form>
      </div>
    </section>
  );
}

function FormGroup({ label, required, error, children }) {
  return (
    <div style={styles.formGroup}>
      <label style={styles.label}>
        {label}
        {required && <span style={{ color: 'var(--coral-orange)', marginLeft: 2 }}>*</span>}
      </label>
      {children}
      {error && <p style={styles.errorText}>{error}</p>}
    </div>
  );
}

const styles = {
  section: {
    padding: '4rem 2rem 5rem',
    background: 'linear-gradient(180deg, var(--light-blue) 0%, var(--cream) 100%)',
    position: 'relative',
  },
  container: {
    maxWidth: 720,
    margin: '0 auto',
    background: 'white',
    borderRadius: 32,
    padding: '3rem',
    boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
    position: 'relative',
    overflow: 'hidden',
  },
  decorCircle: {
    position: 'absolute',
    top: -60, right: -60,
    width: 150, height: 150,
    background: 'var(--sun-yellow)',
    borderRadius: '50%',
    opacity: 0.15,
    pointerEvents: 'none',
  },
  formHeader: {
    textAlign: 'center',
    marginBottom: '2.5rem',
    position: 'relative',
    zIndex: 1,
  },
  formTitle: {
    fontFamily: "'Baloo 2', cursive",
    fontSize: '2rem',
    fontWeight: 800,
    color: 'var(--dark-brown)',
    marginBottom: '0.5rem',
  },
  formSubtitle: { color: '#8D6E63', fontSize: '1rem' },
  formGroup: { marginBottom: '1.5rem', position: 'relative', zIndex: 1 },
  label: {
    display: 'block',
    fontFamily: "'Fredoka', sans-serif",
    fontWeight: 600,
    fontSize: '1rem',
    color: 'var(--dark-brown)',
    marginBottom: '0.5rem',
  },
  subLabel: {
    display: 'block',
    fontFamily: "'Fredoka', sans-serif",
    fontWeight: 600,
    fontSize: '0.9rem',
    color: 'var(--dark-brown)',
    marginBottom: '0.4rem',
  },
  input: {
    width: '100%',
    padding: '0.9rem 1.2rem',
    border: '2.5px solid #E8E0D8',
    borderRadius: 16,
    fontFamily: "'Quicksand', sans-serif",
    fontSize: '1rem',
    fontWeight: 500,
    outline: 'none',
    color: 'var(--dark-brown)',
    transition: 'all 0.3s ease',
  },
  checkboxGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '0.75rem',
  },
  checkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.8rem 1rem',
    border: '2.5px solid',
    borderRadius: 16,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    userSelect: 'none',
  },
  customCheck: {
    width: 22, height: 22,
    border: '2.5px solid',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.3s ease',
  },
  checkMark: { color: 'white', fontWeight: 700, fontSize: '0.85rem' },
  checkLabel: { fontWeight: 500, fontSize: '0.95rem', color: 'var(--dark-brown)' },
  radioGroup: { display: 'flex', gap: '1rem' },
  radioItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    padding: '0.7rem 1.5rem',
    border: '2.5px solid',
    borderRadius: 16,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    userSelect: 'none',
  },
  customRadio: {
    width: 20, height: 20,
    border: '2.5px solid',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  radioDot: {
    width: 10, height: 10,
    background: 'var(--purple-pop)',
    borderRadius: '50%',
  },
  radioLabel: { fontWeight: 500, fontSize: '1rem', color: 'var(--dark-brown)' },
  siblingBox: {
    marginTop: '1rem',
    padding: '1.5rem',
    background: '#FFF8E1',
    borderRadius: 16,
    border: '2px dashed var(--sun-yellow)',
  },
  siblingGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  submitBtn: {
    width: '100%',
    padding: '1.1rem',
    color: 'white',
    border: 'none',
    borderRadius: 20,
    fontFamily: "'Fredoka', sans-serif",
    fontSize: '1.2rem',
    fontWeight: 700,
    boxShadow: '0 6px 25px rgba(255,107,53,0.3)',
    marginTop: '1rem',
    transition: 'all 0.3s ease',
    position: 'relative',
    zIndex: 1,
  },
  errorText: {
    color: '#e53935',
    fontSize: '0.82rem',
    marginTop: '0.3rem',
    fontWeight: 600,
  },
};
