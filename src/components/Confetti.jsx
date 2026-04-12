import React, { useEffect, useRef } from 'react';

const COLORS = ['#FFD93D', '#FF6B35', '#6EC6FF', '#4CAF50', '#FF69B4', '#9C5FE0'];

export default function Confetti({ trigger }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Remove old pieces
    container.innerHTML = '';

    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
      piece.style.animationDelay = Math.random() * 2 + 's';
      piece.style.animationDuration = (3 + Math.random() * 3) + 's';
      const size = 6 + Math.random() * 8;
      piece.style.width = size + 'px';
      piece.style.height = size + 'px';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      container.appendChild(piece);
    }

    const timer = setTimeout(() => {
      if (container) container.innerHTML = '';
    }, 6000);

    return () => clearTimeout(timer);
  }, [trigger]);

  return <div className="confetti-container" ref={containerRef} />;
}
