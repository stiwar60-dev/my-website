'use client';

import { useEffect, useRef, useState } from 'react';
import { useLampClick } from '../lib/useLampClick';

interface LampIntroProps {
  onComplete: () => void; // fires once the lamp is lit; page starts scrap stagger
}

export default function LampIntro({ onComplete }: LampIntroProps) {
  const [lampOn, setLampOn] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const playClick = useLampClick();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const introTimer = setTimeout(() => {
      playClick();
      setLampOn(true);

      // grow the glow's diameter directly (kept out of CSS transitions
      // so the timing here can stay in lockstep with the click + the
      // vignette fade, without fighting a separate transition duration)
      let r = 0;
      const grow = setInterval(() => {
        r += 14;
        if (glowRef.current) {
          glowRef.current.style.width = `${r}px`;
          glowRef.current.style.height = `${r}px`;
        }
        if (r >= 420) {
          clearInterval(grow);
          setTimeout(onComplete, 500);
        }
      }, 16);
    }, 900); // beat of black before the click

    return () => clearTimeout(introTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={`curiosity-vignette ${lampOn ? 'is-on' : ''}`} />
      <div ref={glowRef} className="curiosity-lamp-glow" />
    </>
  );
}
