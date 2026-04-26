import React, { useEffect, useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';

const CLASSES = [
  'L.K.G', 'U.K.G',
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
];

// Google Apps Script Web App endpoint that appends each submission to a Google Sheet.
// Replace with your deployed URL — see scripts/google-apps-script.gs for the script
// to paste into Extensions → Apps Script and deploy as a Web App (Anyone access).
const SHEETS_ENDPOINT = process.env.REACT_APP_SHEETS_ENDPOINT || '';

const INITIAL_FORM = {
  studentName: '',
  parentName: '',
  studentClass: '',
  mobile: '',
  email: '',
  previousSchool: '',
  paymentProof: null,
  agreed: false,
};

const MAX_PROOF_SIZE = 5 * 1024 * 1024; // 5MB
const PROOF_UPLOAD_ROUTE = '/api/upload-proof';

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

  const [sending, setSending] = useState(false);

  // Enquiry button is enabled once the same fields the form requires (minus the
  // optional ones — email, previous school, proof, terms) are validly filled in.
  const enquiryReady = Boolean(
    form.studentName.trim() &&
    form.parentName.trim() &&
    form.studentClass &&
    /^[6-9]\d{9}$/.test(form.mobile.trim())
  );

  const handleEnquire = () => {
    if (!enquiryReady) return;
    const lines = [
      'Hi, I would like to enquire about the Scholarship Exam 2026.',
      '',
      `*Student Name:* ${form.studentName}`,
      `*Parent Name:* ${form.parentName}`,
      `*Class:* ${form.studentClass}`,
      `*Mobile:* ${form.mobile}`,
    ];
    if (form.email)          lines.push(`*Email:* ${form.email}`);
    if (form.previousSchool) lines.push(`*Previous School:* ${form.previousSchool}`);
    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/919109929109?text=${text}`, '_blank', 'noopener');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    setSending(true);

    // Step 1 — Upload proof to Vercel Blob (if attached). Errors here are fatal.
    let proofUrl = '';
    let proofName = '';
    if (form.paymentProof) {
      try {
        const safeName = `proofs/${Date.now()}-${form.paymentProof.name.replace(/[^\w.-]+/g, '_')}`;
        console.log('[CMG] Uploading proof to Blob…', safeName, form.paymentProof);
        const blob = await upload(safeName, form.paymentProof, {
          access: 'public',
          handleUploadUrl: PROOF_UPLOAD_ROUTE,
          contentType: form.paymentProof.type || undefined,
        });
        proofUrl  = blob.url;
        proofName = form.paymentProof.name;
        console.log('[CMG] Blob upload OK:', proofUrl);
      } catch (err) {
        console.error('[CMG] Blob upload FAILED:', err);
        setErrors((er) => ({ ...er, _submit: 'Could not upload proof screenshot. Please try again or skip the proof.' }));
        setSending(false);
        return;
      }
    }

    // Step 2 — POST text fields + URL to Apps Script. Failure here is non-fatal:
    // we still flag the form as submitted (the row may have been written; mode:no-cors
    // hides the response). User keeps a confirmation; we log for diagnosis.
    const payload = new URLSearchParams();
    payload.set('submittedAt',      new Date().toISOString());
    payload.set('studentName',      form.studentName);
    payload.set('parentName',       form.parentName);
    payload.set('class',            form.studentClass);
    payload.set('mobile',           form.mobile);
    payload.set('email',            form.email || '');
    payload.set('previousSchool',   form.previousSchool || '');
    payload.set('paymentProofName', proofName);
    payload.set('paymentProofUrl',  proofUrl);

    console.log('[CMG] Submitting to Sheets:', Object.fromEntries(payload), 'endpoint:', SHEETS_ENDPOINT || '(unset)');

    if (SHEETS_ENDPOINT) {
      try {
        const resp = await fetch(SHEETS_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: payload.toString(),
        });
        console.log('[CMG] Sheets POST returned (opaque ok):', resp.type, resp.status);
      } catch (err) {
        console.error('[CMG] Sheets POST FAILED:', err);
      }
    } else {
      console.warn('[CMG] SHEETS_ENDPOINT not set — skipping POST.');
    }

    setSubmitted(true);
    onSubmitSuccess?.();
    setTimeout(() => { setSubmitted(false); setForm(INITIAL_FORM); }, 3500);
    setSending(false);
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
          <h2 className="section-title" style={styles.title}>Register for Scholarship Exam</h2>
          <p style={styles.subtitle}>
            Fill in the details below to register your child.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="register-form" style={styles.form}>
          <Field label="Student Name" Icon={IconUser} required error={errors.studentName}>
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

          <Field label="Parent Name" Icon={IconUser} required error={errors.parentName}>
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

          <Field label="Class" Icon={IconBriefcase} required error={errors.studentClass}>
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

          <Field label="Mobile Number" Icon={IconPhone} required error={errors.mobile}>
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

          <Field label="Email ID" Icon={IconMail} error={errors.email}>
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

          <Field label={<>Previous School<span style={styles.optional}> (Optional)</span></>} Icon={IconSchool}>
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

          <Field
            label={<>Payment Proof<span style={styles.optional}> (Optional)</span></>}
            Icon={IconUpload}
            error={errors.paymentProof}
          >
            <ProofUploader
              file={form.paymentProof}
              onPick={(file) => {
                if (file && file.size > MAX_PROOF_SIZE) {
                  setErrors((er) => ({ ...er, paymentProof: 'File too large (max 5MB)' }));
                  return;
                }
                setErrors((er) => { const { paymentProof, ...rest } = er; return rest; });
                setForm((f) => ({ ...f, paymentProof: file }));
              }}
            />
          </Field>

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
            disabled={submitted || sending}
            className="submit-btn"
            style={{
              ...styles.submitBtn,
              background: submitted ? 'var(--success)' : 'var(--brand-blue)',
              cursor: (submitted || sending) ? 'default' : 'pointer',
              opacity: sending && !submitted ? 0.85 : 1,
            }}
          >
            {submitted
              ? '✅ Submitted Successfully!'
              : sending ? 'Sending…' : 'Submit & Register'}
          </button>
          {errors._submit && <p style={{ ...styles.errorText, textAlign: 'center', marginTop: '0.6rem' }}>{errors._submit}</p>}

          <p style={styles.smallNote}>
            After successful registration, you'll receive a confirmation on WhatsApp / SMS.
          </p>

          <div style={styles.enquireDivider}>
            <span style={styles.enquireDividerLine} />
            <span style={styles.enquireDividerText}>have questions?</span>
            <span style={styles.enquireDividerLine} />
          </div>

          <button
            type="button"
            disabled={!enquiryReady}
            onClick={handleEnquire}
            title={enquiryReady ? '' : 'Fill student name, parent name, class and mobile to enquire'}
            style={{
              ...styles.enquireBtn,
              background: enquiryReady ? '#25D366' : '#cbd5e1',
              cursor: enquiryReady ? 'pointer' : 'not-allowed',
              boxShadow: enquiryReady ? '0 10px 24px rgba(37,211,102,0.28)' : 'none',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.52 3.48A11.93 11.93 0 0 0 12.06 0C5.5 0 .17 5.33.17 11.89c0 2.09.55 4.14 1.6 5.94L0 24l6.31-1.65a11.86 11.86 0 0 0 5.74 1.46h.01c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.17-3.43-8.44ZM12.07 21.5h-.01a9.5 9.5 0 0 1-4.84-1.32l-.35-.21-3.74.98 1-3.65-.23-.37a9.49 9.49 0 1 1 17.66-4.94c0 5.24-4.27 9.51-9.49 9.51Zm5.49-7.13c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.36.22-.66.07-.3-.15-1.27-.47-2.41-1.49-.89-.79-1.5-1.77-1.67-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.36.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.68-1.63-.93-2.24-.25-.59-.5-.51-.68-.52l-.58-.01c-.2 0-.53.07-.8.38-.27.3-1.06 1.04-1.06 2.53s1.08 2.94 1.23 3.14c.15.2 2.13 3.25 5.16 4.55.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35Z" />
            </svg>
            {enquiryReady ? 'Enquire on WhatsApp' : 'Fill the form to enquire'}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, Icon, required, error, children }) {
  return (
    <div className="form-field" style={styles.field}>
      <label className="form-label" style={styles.fieldLabel}>
        {Icon && <Icon />}
        <span style={styles.fieldLabelText}>
          {label}
          {required && <span style={styles.req}>*</span>}
        </span>
      </label>
      <div className="form-control" style={styles.control}>
        {children}
        {error && <p style={styles.errorText}>{error}</p>}
      </div>
    </div>
  );
}

const iconProps = {
  width: 20, height: 20, viewBox: '0 0 24 24',
  fill: 'none', stroke: 'currentColor', strokeWidth: 1.8,
  strokeLinecap: 'round', strokeLinejoin: 'round',
  style: { flexShrink: 0, color: 'var(--ink)' },
};

function IconUser() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  );
}
function IconBriefcase() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg {...iconProps}>
      <path d="M22 16.92V21a1 1 0 0 1-1.1 1 19 19 0 0 1-8.3-3 19 19 0 0 1-6-6 19 19 0 0 1-3-8.3A1 1 0 0 1 4.6 3h4a1 1 0 0 1 1 .75l1 4a1 1 0 0 1-.27.95L8.3 10.7a16 16 0 0 0 5 5l2-2a1 1 0 0 1 .95-.27l4 1a1 1 0 0 1 .75 1Z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
function IconSchool() {
  return (
    <svg {...iconProps}>
      <path d="M3 21V10l9-6 9 6v11" />
      <path d="M9 21v-7h6v7" />
      <path d="M3 21h18" />
    </svg>
  );
}
function IconUpload() {
  return (
    <svg {...iconProps}>
      <path d="M21 15v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" />
      <path d="M17 8 12 3 7 8" />
      <path d="M12 3v13" />
    </svg>
  );
}

function ProofUploader({ file, onPick }) {
  const inputRef = React.useRef(null);
  const [preview, setPreview] = React.useState(null);

  React.useEffect(() => {
    if (!file || !file.type?.startsWith('image/')) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const click = () => inputRef.current?.click();
  const pick = (e) => onPick(e.target.files?.[0] ?? null);
  const clear = (e) => {
    e.stopPropagation();
    onPick(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={pick}
        style={{ display: 'none' }}
      />

      {file ? (
        <div style={styles.proofCard}>
          {preview
            ? <img src={preview} alt="Payment proof preview" style={styles.proofThumb} />
            : <div style={styles.proofThumbFallback}><IconUpload /></div>}
          <div style={styles.proofMeta}>
            <div style={styles.proofName}>{file.name}</div>
            <div style={styles.proofSize}>{(file.size / 1024).toFixed(0)} KB</div>
          </div>
          <button type="button" onClick={click} style={styles.proofChange}>Change</button>
          <button type="button" onClick={clear} aria-label="Remove" style={styles.proofRemove}>×</button>
        </div>
      ) : (
        <button
          type="button"
          onClick={click}
          style={styles.proofPicker}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--brand-blue)'; e.currentTarget.style.background = 'var(--bg-blue-tint)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'white'; }}
        >
          <IconUpload />
          <span style={styles.proofPickerText}>
            <span style={styles.proofPickerTitle}>Click to upload screenshot</span>
            <span style={styles.proofPickerSub}>PNG / JPG up to 5MB</span>
          </span>
        </button>
      )}
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
  header: { textAlign: 'center', marginBottom: '1.75rem' },
  title: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 'clamp(1.6rem, 3.6vw, 2rem)',
    fontWeight: 800,
    color: 'var(--brand-blue)',
    marginBottom: '0.5rem',
    letterSpacing: '-0.3px',
  },
  subtitle: { color: 'var(--muted)', fontSize: '0.95rem' },
  form: {},
  field: {
    display: 'grid',
    gridTemplateColumns: '180px 1fr',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.65rem 0',
    borderBottom: '1px solid var(--line)',
  },
  fieldLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    fontSize: '0.95rem',
    fontWeight: 600,
    color: 'var(--ink)',
  },
  fieldLabelText: {
    display: 'inline-flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  control: { width: '100%' },
  optional: { color: 'var(--muted)', fontWeight: 500, marginLeft: 4 },
  req: { color: 'var(--brand-red)', marginLeft: 2 },

  /* Proof uploader */
  proofPicker: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.85rem 1rem',
    background: 'white',
    border: '1.5px dashed var(--line)',
    borderRadius: 10,
    cursor: 'pointer',
    color: 'var(--ink-soft)',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    textAlign: 'left',
  },
  proofPickerText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    minWidth: 0,
  },
  proofPickerTitle: {
    fontSize: '0.92rem',
    fontWeight: 600,
    color: 'var(--ink)',
  },
  proofPickerSub: {
    fontSize: '0.78rem',
    color: 'var(--muted)',
  },
  proofCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.6rem 0.7rem',
    background: 'var(--bg-blue-tint)',
    border: '1px solid rgba(30,58,138,0.18)',
    borderRadius: 10,
  },
  proofThumb: {
    width: 44, height: 44,
    borderRadius: 8,
    objectFit: 'cover',
    flexShrink: 0,
    background: 'white',
    border: '1px solid var(--line)',
  },
  proofThumbFallback: {
    width: 44, height: 44,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
    border: '1px solid var(--line)',
    color: 'var(--brand-blue)',
    flexShrink: 0,
  },
  proofMeta: { flex: 1, minWidth: 0 },
  proofName: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--ink)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  proofSize: {
    fontSize: '0.75rem',
    color: 'var(--muted)',
  },
  proofChange: {
    background: 'transparent',
    border: '1px solid var(--brand-blue)',
    color: 'var(--brand-blue)',
    borderRadius: 8,
    padding: '0.35rem 0.7rem',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    flexShrink: 0,
  },
  proofRemove: {
    background: 'transparent',
    border: 'none',
    color: 'var(--muted)',
    fontSize: '1.5rem',
    lineHeight: 1,
    cursor: 'pointer',
    padding: '0 4px',
    flexShrink: 0,
  },
  input: {
    width: '100%',
    padding: '0.7rem 1rem',
    border: '1px solid var(--line)',
    borderRadius: 10,
    fontFamily: "'Poppins', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 500,
    outline: 'none',
    color: 'var(--ink)',
    background: 'white',
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
