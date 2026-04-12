import React, { useState } from 'react';
import './styles/animations.css';

import Confetti     from './components/Confetti';
import Marquee      from './components/Marquee';
import Hero         from './components/Hero';
import WaveSeparator from './components/WaveSeparator';
import Programs     from './components/Programs';
import WhyUs        from './components/WhyUs';
import Gallery      from './components/Gallery';
import CampDetails  from './components/CampDetails';
import EnrollForm   from './components/EnrollForm';
import Footer       from './components/Footer';

export default function App() {
  // Each time confettiTrigger changes, Confetti re-fires
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  const fireConfetti = () => setConfettiTrigger((t) => t + 1);

  return (
    <>
      {/* Floating background decorations */}
      <div className="float-decoration fd1">🎈</div>
      <div className="float-decoration fd2">⭐</div>
      <div className="float-decoration fd3">🦋</div>
      <div className="float-decoration fd4">🌻</div>
      <div className="float-decoration fd5">🎨</div>

      <Confetti trigger={confettiTrigger} />

      <Marquee />
      <Hero />
      <WaveSeparator />
      <Programs />
      <WhyUs />
      <Gallery />
      <CampDetails />
      <EnrollForm onSubmitSuccess={fireConfetti} />
      <Footer />
    </>
  );
}
