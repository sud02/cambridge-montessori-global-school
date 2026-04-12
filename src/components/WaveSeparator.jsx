import React from 'react';

export default function WaveSeparator() {
  return (
    <div style={{ width: '100%', overflow: 'hidden', lineHeight: 0, marginTop: -2 }}>
      <svg viewBox="0 0 1200 80" preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 80 }}>
        <path
          d="M0,40 C300,80 600,0 900,40 C1050,60 1150,30 1200,40 L1200,80 L0,80 Z"
          fill="var(--soft-white)"
        />
      </svg>
    </div>
  );
}
