'use client';

// Generates a tiny, dry mechanical "click" — like a pull-chain lamp
// switch — using the Web Audio API. Deliberately not a sample/loop,
// so there's nothing to license and nothing that can loop or drift.
export function useLampClick() {
  const play = () => {
    try {
      const ctx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const t0 = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(1800, t0);
      osc.frequency.exponentialRampToValueAtTime(600, t0 + 0.02);

      gain.gain.setValueAtTime(0.15, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.04);

      osc.connect(gain).connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.05);
    } catch {
      // Audio isn't critical to the experience — fail silently.
    }
  };

  return play;
}
