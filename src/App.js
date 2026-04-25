import React, { useState } from 'react';
import './styles/animations.css';
import './styles/responsive.css';

import Confetti        from './components/Confetti';
import SplashScreen    from './components/SplashScreen';
import Navbar          from './components/Navbar';
import Marquee         from './components/Marquee';
import Hero            from './components/Hero';
import Programs        from './components/Programs';        // Classes Eligible
import CampDetails     from './components/CampDetails';     // Exam Details
import Gallery         from './components/Gallery';         // Syllabus
import WhyUs           from './components/WhyUs';           // Scholarship Benefits + How It Works
import EnrollForm      from './components/EnrollForm';      // Registration Form
import Footer          from './components/Footer';

export default function App() {
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const fireConfetti = () => setConfettiTrigger((t) => t + 1);

  return (
    <>
      <SplashScreen />
      <Confetti trigger={confettiTrigger} />
      <Navbar />
      <Marquee />
      <Hero />
      <Programs />
      <CampDetails />
      <Gallery />
      <WhyUs />
      <EnrollForm onSubmitSuccess={fireConfetti} />
      <Footer />
    </>
  );
}
