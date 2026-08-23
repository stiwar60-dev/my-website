"use client";

// app/science/page.tsx
// The Science realm — an observatory in deep space.
// Entrance: a black hole gravitational lensing animation on canvas.
// Landing: a cinematic horizontal scroll experience with immersive article cards,
// parallax effects, and rich visual storytelling.

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ARTICLES, readingTime, type Article } from "./articles";
import "./science.css";

// ------------------------------------------------------------------
// BLACK HOLE LENSING ENTRANCE
// Phases: starfield forms (0-1.2s) -> black hole grows & lenses
// (1.2-4.2s) -> horizon swallows screen (4.2-5.2s) -> reveal page.
// ------------------------------------------------------------------
const ENTRANCE_TOTAL = 5600; // ms

interface Star {
  angle: number; // angle around center
  radius: number; // distance from center (fraction of max)
  size: number;
  brightness: number;
  twinkle: number;
}

function BlackHoleEntrance({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    // Build the star field
    const STAR_COUNT = 320;
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 0.05 + Math.random() * 0.95,
      size: 0.5 + Math.random() * 1.7,
      brightness: 0.3 + Math.random() * 0.7,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const start = performance.now();
    let raf = 0;

    const draw = (now: number) => {
      const t = now - start; // elapsed ms
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.hypot(cx, cy);

      // ---- timeline ----
      const fadeIn = Math.min(t / 1200, 1); // stars appear
      const lensT = Math.max(0, Math.min((t - 1200) / 3000, 1)); // lensing grows
      const swallowT = Math.max(0, Math.min((t - 4200) / 1000, 1)); // horizon expands

      // eased versions
      const easeLens = lensT * lensT * (3 - 2 * lensT); // smoothstep
      const easeSwallow = swallowT * swallowT * (3 - 2 * swallowT);

      // black hole radius (fraction of screen)
      const bhR = easeLens * 0.09 * maxR + easeSwallow * 1.15 * maxR;

      // ---- background ----
      ctx.fillStyle = "#050810";
      ctx.fillRect(0, 0, w, h);

      // faint nebula tint appears with the stars
      const nebulaAlpha = 0.35 * fadeIn * (1 - easeSwallow);
      const grad1 = ctx.createRadialGradient(w * 0.25, h * 0.3, 0, w * 0.25, h * 0.3, maxR * 0.7);
      grad1.addColorStop(0, `rgba(88, 60, 130, ${0.10 * nebulaAlpha * 3})`);
      grad1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      // ---- stars with gravitational lensing ----
      for (const s of stars) {
        const trueR = s.radius * maxR;

        // Lensing: light from stars near the hole is deflected outward
        // by ~ einsteinR^2 / r (point-mass lens approximation).
        const einsteinR = bhR * 2.6;
        let apparentR = trueR;
        if (easeLens > 0 && trueR > 0.01) {
          const deflect = (einsteinR * einsteinR) / (trueR + einsteinR * 0.3);
          apparentR = trueR + deflect * easeLens;
        }

        // stars swallowed by the horizon are gone
        if (apparentR < bhR * 1.02) continue;

        // tangential smearing near the Einstein ring (arcs)
        const proximity = Math.max(0, 1 - Math.abs(apparentR - einsteinR * 1.15) / (einsteinR + 1));
        const smear = 1 + proximity * 26 * easeLens;

        const x = cx + Math.cos(s.angle) * apparentR;
        const y = cy + Math.sin(s.angle) * apparentR;

        const tw = 0.75 + 0.25 * Math.sin(now * 0.002 + s.twinkle);
        const alpha = s.brightness * fadeIn * tw * (1 - easeSwallow);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(s.angle + Math.PI / 2); // smear tangentially
        ctx.scale(smear, 1);
        ctx.beginPath();
        ctx.arc(0, 0, s.size * dpr * 0.75, 0, Math.PI * 2);
        // stars blue-shift slightly as lensing intensifies (artistic touch)
        const blue = 220 + Math.floor(35 * proximity);
        ctx.fillStyle = `rgba(${235 - proximity * 60}, ${240 - proximity * 30}, ${blue}, ${alpha})`;
        ctx.fill();
        ctx.restore();
      }

      // ---- photon ring + accretion glow around the horizon ----
      if (easeLens > 0.15 && easeSwallow < 0.9) {
        const ringR = bhR * 1.35;
        const ringAlpha = Math.min(1, (easeLens - 0.15) * 2) * (1 - easeSwallow);
        const ringGrad = ctx.createRadialGradient(cx, cy, bhR, cx, cy, ringR * 1.9);
        ringGrad.addColorStop(0, `rgba(255, 214, 150, ${0.55 * ringAlpha})`);
        ringGrad.addColorStop(0.35, `rgba(255, 160, 90, ${0.22 * ringAlpha})`);
        ringGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = ringGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, ringR * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- the event horizon itself ----
      if (bhR > 0.5) {
        ctx.beginPath();
        ctx.arc(cx, cy, bhR, 0, Math.PI * 2);
        ctx.fillStyle = "#000000";
        ctx.fill();
      }

      if (t < ENTRANCE_TOTAL) {
        raf = requestAnimationFrame(draw);
      } else if (!doneRef.current) {
        doneRef.current = true;
        onDone();
      }
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [onDone]);

  return (
    <div className="bh-entrance">
      <canvas ref={canvasRef} className="bh-canvas" />
      <p className="bh-caption">
        mass bends light · light reveals mass
      </p>
    </div>
  );
}

// ------------------------------------------------------------------
// INTERACTIVE CONSTELLATION BACKGROUND
// A canvas of drifting stars. Near the cursor, stars connect with
// thin lines — you draw constellations just by moving.
// ------------------------------------------------------------------
interface DriftStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  brightness: number;
  twinkle: number;
}

function ConstellationField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    // Star density scales with viewport
    const COUNT = Math.min(160, Math.floor((window.innerWidth * window.innerHeight) / 12000));
    const stars: DriftStar[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.06 * dpr,
      vy: (Math.random() - 0.5) * 0.06 * dpr,
      size: (0.4 + Math.random() * 1.4) * dpr,
      brightness: 0.25 + Math.random() * 0.65,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const mouse = { x: -9999, y: -9999, active: false };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX * dpr;
      mouse.y = e.clientY * dpr;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    const LINK_RADIUS = 190 * dpr; // stars within this range of cursor may link
    const STAR_LINK = 130 * dpr; // max distance between two linked stars

    let raf = 0;
    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);

      // drift + twinkle
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x += w;
        if (s.x > w) s.x -= w;
        if (s.y < 0) s.y += h;
        if (s.y > h) s.y -= h;

        const tw = 0.7 + 0.3 * Math.sin(now * 0.0016 + s.twinkle);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 225, 255, ${s.brightness * tw})`;
        ctx.fill();
      }

      // constellation lines near the cursor
      if (mouse.active) {
        const near = stars.filter(
          (s) => Math.hypot(s.x - mouse.x, s.y - mouse.y) < LINK_RADIUS
        );
        for (let i = 0; i < near.length; i++) {
          for (let j = i + 1; j < near.length; j++) {
            const a = near[i];
            const b = near[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < STAR_LINK) {
              // lines fade with distance from cursor and between stars
              const midX = (a.x + b.x) / 2;
              const midY = (a.y + b.y) / 2;
              const cursorDist = Math.hypot(midX - mouse.x, midY - mouse.y);
              const alpha =
                0.28 *
                (1 - d / STAR_LINK) *
                (1 - cursorDist / LINK_RADIUS);
              if (alpha > 0.01) {
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(170, 200, 255, ${alpha})`;
                ctx.lineWidth = 0.6 * dpr;
                ctx.stroke();
              }
            }
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="constellation-canvas" aria-hidden="true" />;
}

// ------------------------------------------------------------------
// AMBIENT DEEP-SPACE BACKGROUND (nebulas + shooting stars stay in CSS)
// ------------------------------------------------------------------
function SpaceBackground() {
  return (
    <div className="space-background" aria-hidden="true">
      <div className="nebula nebula-violet" />
      <div className="nebula nebula-teal" />
      <div className="nebula nebula-gold" />
      <div className="starfield stars-far" />
      <span className="shooting-star ss-1" />
      <span className="shooting-star ss-2" />
    </div>
  );
}

// ------------------------------------------------------------------
// ANIMATED COVER SCENES — each article gets a living miniature
// ------------------------------------------------------------------
function CoverScene({ article }: { article: Article }) {
  if (article.slug === "superposition") {
    // An atom in superposition: nucleus + electrons on tilted orbits
    return (
      <div className="cover-scene scene-superposition" aria-hidden="true">
        <span className="sp-nucleus" />
        <span className="sp-orbit sp-orbit-1"><i className="sp-electron" /></span>
        <span className="sp-orbit sp-orbit-2"><i className="sp-electron" /></span>
        <span className="sp-orbit sp-orbit-3"><i className="sp-electron" /></span>
        <span className="sp-ghost" />
      </div>
    );
  }
  if (article.slug === "cosmic-microwave-background") {
    // The relic signal: a rippling waveform sweeping across the cover
    return (
      <div className="cover-scene scene-cmb" aria-hidden="true">
        <span className="cmb-ring cmb-ring-1" />
        <span className="cmb-ring cmb-ring-2" />
        <span className="cmb-ring cmb-ring-3" />
        <div className="cmb-wave">
          {Array.from({ length: 24 }, (_, i) => (
            <i key={i} style={{ animationDelay: `${i * 0.09}s` }} />
          ))}
        </div>
      </div>
    );
  }
  // string-theory (and default): vibrating strings
  return (
    <div className="cover-scene scene-strings" aria-hidden="true">
      <span className="string-line str-1" />
      <span className="string-line str-2" />
      <span className="string-line str-3" />
      <span className="string-line str-4" />
      <span className="string-node sn-1" />
      <span className="string-node sn-2" />
    </div>
  );
}

// ------------------------------------------------------------------
// ARTICLE CARD with 3D tilt + light sweep + parallax depth
// ------------------------------------------------------------------
function ArticleCard({ article, index }: { article: Article; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    el.style.setProperty("--tilt-x", `${(py - 0.5) * -5}deg`);
    el.style.setProperty("--tilt-y", `${(px - 0.5) * 7}deg`);
    el.style.setProperty("--sweep-x", `${px * 100}%`);
    el.style.setProperty("--sweep-y", `${py * 100}%`);
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerY = window.innerHeight / 2;
      const distFromCenter = rect.top - centerY;
      setParallaxOffset(distFromCenter * 0.08);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link
      ref={ref}
      href={`/science/${article.slug}`}
      className="article-card landscape"
      style={{
        transitionDelay: `${0.15 + index * 0.12}s`,
        transform: `translateY(${parallaxOffset}px)`,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span className="card-sweep" aria-hidden="true" />
      
      {/* Left side: Cover with animated scene */}
      <div className="article-cover landscape-cover" style={{ background: article.coverGradient }}>
        <CoverScene article={article} />
        <span className="article-emblem">{article.coverEmblem}</span>
      </div>

      {/* Right side: Content with enhanced typography */}
      <div className="article-info landscape-info">
        <div className="article-meta">
          <span>{article.date}</span>
          <span className="meta-dot">·</span>
          <span>{readingTime(article)} min read</span>
          <span className="meta-dot">·</span>
          <span className="article-topic">{article.topic}</span>
        </div>
        <h2 className="article-title">{article.title}</h2>
        <p className="article-excerpt">{article.excerpt}</p>
        <span className="article-read-more">
          Read the article <span className="read-arrow">→</span>
        </span>
      </div>

      {/* Accent bar */}
      <div className="card-accent-bar" aria-hidden="true" />
    </Link>
  );
}

// ------------------------------------------------------------------
// THE PAGE
// ------------------------------------------------------------------
export default function SciencePage() {
  const [entered, setEntered] = useState(false);
  const [landed, setLanded] = useState(false);

  const handleEntranceDone = () => {
    setEntered(true);
    setTimeout(() => setLanded(true), 80);
  };

  return (
    <div className={`science-realm ${landed ? "landed" : ""}`}>
      {!entered && <BlackHoleEntrance onDone={handleEntranceDone} />}

      <SpaceBackground />
      {entered && <ConstellationField />}

      {/* HEADER */}
      <header className="obs-header">
        <Link href="/?hub=1" className="obs-back">
  ← Nexus
</Link>
        <div className="obs-heading">
          {/* Rotating orbital diagram behind the heading */}
          <div className="hero-orbital" aria-hidden="true">
            <span className="ho-ring ho-ring-1" />
            <span className="ho-ring ho-ring-2" />
            <span className="ho-ring ho-ring-3" />
            <span className="ho-planet" />
          </div>
          <span className="obs-eyebrow">QUANTUM &amp; FORM</span>
          <h1 className="obs-title">Singularity</h1>
          <p className="obs-tagline">
            The micro world and the cosmos seem polarized, yet the most
            profound questions of humanity reside within their depths.
            To my longest companion...
          </p>
        </div>
      </header>

      {/* ARTICLE FEED — Landscape cards with parallax */}
      <main className="article-feed landscape-feed">
        {ARTICLES.map((article, i) => (
          <ArticleCard key={article.slug} article={article} index={i} />
        ))}
      </main>

      {/* FOOTER */}
      <footer className="obs-footer">
        <p>
          "Somewhere, something incredible is waiting to be known."
          <span className="footer-attr"> — Carl Sagan</span>
        </p>
      </footer>
    </div>
  );
}
