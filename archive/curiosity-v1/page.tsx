'use client';

import { useState } from 'react';
import Link from 'next/link';
import LampIntro from './components/LampIntro';
import DeskCanvas from './components/DeskCanvas';
import './curiosity.css';

export default function CuriosityPage() {
  const [lampComplete, setLampComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleLampComplete = () => {
    setLampComplete(true);
    setShowHint(true);
    setTimeout(() => setShowHint(false), 3500);
  };

  return (
    <div className="curiosity-stage">
      <Link
        href="/"
        className={`curiosity-back ${lampComplete ? 'is-visible' : ''}`}
      >
        &larr; the nexus
      </Link>

      <div className={`curiosity-hint ${showHint ? 'is-visible' : ''}`}>
        drag to look around
      </div>

      <DeskCanvas scrapsIn={lampComplete} />

      <LampIntro onComplete={handleLampComplete} />
    </div>
  );
}
