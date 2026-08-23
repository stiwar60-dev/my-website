"use client";

// app/poetry/page.tsx
// The Poetry landing page — a warm, breathing sanctuary.
// Enhanced with themed hover-preview flashcards, scroll-reveal theatricality,
// and notebook-style margin identities.

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { POEMS, countLines, readingTime, type Poem } from "./poems";
import "./poetry.css";

// ------------------------------------------------------------------
// Famous verses shown as flashcards during the loading transition
// ------------------------------------------------------------------
const FLASHCARDS = [
  {
    verse: "Hope is the thing with feathers that perches in the soul,",
    poet: "Emily Dickinson",
  },
  {
    verse: "Two roads diverged in a wood, and I — I took the one less traveled by,",
    poet: "Robert Frost",
  },
  {
    verse: "You are not a drop in the ocean. You are the entire ocean in a drop.",
    poet: "Rumi",
  },
  {
    verse: "A thing of beauty is a joy for ever: its loveliness increases;",
    poet: "John Keats",
  },
];

const CARD_DURATION = 1600; // ms each flashcard stays on screen

// ------------------------------------------------------------------
// AI-GENERATED SUMMARIES
// ------------------------------------------------------------------
const POEM_SUMMARIES: Record<string, string> = {
  gross: "A vulnerability laid bare, where love defies the stars and finds a natural, albeit 'grossly' sweet, home in the heart of a friend. It explores the obscene beauty of being fully seen and chosen, even in one's most fragile states.",
};

// Roman numerals for the notebook identity
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

// ------------------------------------------------------------------
// THEMED HOVER PREVIEW COMPONENT
// ------------------------------------------------------------------
function PoemHoverPreview({ poem, active }: { poem: Poem; active: boolean }) {
  const isLovePoem = poem.slug === "gross";
  const summary = POEM_SUMMARIES[poem.slug] || poem.excerpt;
  
  return (
    <div className={`poem-hover-preview ${active ? "active" : ""} theme-${poem.slug}`}>
      <div className="preview-card-stack">
        <div className="preview-main-card">
          <div className="preview-content">
            <span className="preview-label">Summary</span>
            <p className="preview-text">{summary}</p>
            <div className="preview-footer">
              <span className="preview-emblem">{poem.coverEmblem}</span>
              <span className="preview-theme-tag">{isLovePoem ? "A Love Poem" : "Verse"}</span>
            </div>
          </div>
          {isLovePoem && (
            <>
              <span className="heart-dec dec-1">❤️</span>
              <span className="heart-dec dec-2">💖</span>
              <span className="heart-dec dec-3">💗</span>
            </>
          )}
        </div>
        <div className="preview-bg-card card-a" />
        <div className="preview-bg-card card-b" />
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// SCROLL REVEAL CARD COMPONENT
// ------------------------------------------------------------------
function ScrollRevealPoemCard({ poem, index, onHover }: { 
  poem: Poem; 
  index: number; 
  onHover: (slug: string | null) => void 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`poem-card-wrapper ${visible ? "revealed" : ""}`}
      onMouseEnter={() => onHover(poem.slug)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Notebook Margin Identity */}
      <div className="poem-margin-id">
        <span className="margin-numeral">{ROMAN[index] || index + 1}</span>
        <div className="margin-line" />
        <span className="margin-date">{poem.date}</span>
      </div>

      <Link
        href={`/poetry/${poem.slug}`}
        className="poem-blog-card"
      >
        <div className="card-cover" style={{ background: poem.coverGradient }}>
          <span className="cover-emblem">{poem.coverEmblem}</span>
          <div className="cover-sheen" />
        </div>
        <div className="card-info">
          <div className="card-meta">
            <span>{countLines(poem)} lines</span>
            <span className="meta-dot">·</span>
            <span>{readingTime(poem)} min read</span>
          </div>
          <h2 className="card-poem-title">{poem.title}</h2>
          <p className="card-excerpt">{poem.excerpt}</p>
          <span className="card-read-more">
            Read the poem <span className="read-arrow">→</span>
          </span>
        </div>
      </Link>
    </div>
  );
}

export default function PoetryPage() {
  const [cardIndex, setCardIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [landed, setLanded] = useState(false);
  const [hoveredPoem, setHoveredPoem] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (cardIndex < FLASHCARDS.length - 1) {
      const t = setTimeout(() => setCardIndex((i) => i + 1), CARD_DURATION);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setLanded(true), 100);
    }, CARD_DURATION);
    return () => clearTimeout(t);
  }, [cardIndex]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className={`poetry-realm ${landed ? "landed" : ""}`}
      onMouseMove={handleMouseMove}
    >
      {/* LOADING OVERLAY */}
      {loading && (
        <div className="verse-overlay" aria-hidden="true">
          <div className="verse-overlay-tint" />
          {FLASHCARDS.map((card, i) => (
            <div
              key={i}
              className={`verse-flashcard ${i === cardIndex ? "showing" : ""} ${
                i < cardIndex ? "gone" : ""
              }`}
            >
              <p className="flashcard-verse">“{card.verse}”</p>
              <span className="flashcard-poet">— {card.poet}</span>
            </div>
          ))}
          <div className="verse-overlay-progress">
            {FLASHCARDS.map((_, i) => (
              <span key={i} className={`progress-dot ${i <= cardIndex ? "lit" : ""}`} />
            ))}
          </div>
        </div>
      )}

      {/* LIVING BACKGROUND */}
      <div className="field-background" aria-hidden="true">
        <div className="field-light" />
        <svg className="field-layer layer-back" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path className="field-wave wave-1" d="M0,224 C240,180 480,260 720,224 C960,188 1200,250 1440,210 L1440,320 L0,320 Z" />
        </svg>
        <svg className="field-layer layer-mid" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path className="field-wave wave-2" d="M0,256 C280,220 520,290 760,254 C1000,218 1240,280 1440,244 L1440,320 L0,320 Z" />
        </svg>
        <svg className="field-layer layer-front" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path className="field-wave wave-3" d="M0,288 C320,260 560,310 800,284 C1040,258 1280,304 1440,278 L1440,320 L0,320 Z" />
        </svg>
        <div className="drift-seeds">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className={`seed seed-${(i % 7) + 1}`} />
          ))}
        </div>
      </div>

      {/* HEADER */}
      <header className="realm-header">
        <Link href="/?hub=1" className="realm-back">
  ← Nexus
</Link>
        <div className="realm-heading">
          <span className="realm-eyebrow">VERSE &amp; ECHO</span>
          <h1 className="realm-title">Poetry</h1>
          <p className="realm-tagline">
            An axe in the woodshed, a knife in my bed, and sometimes a tear
            down my cheek.
          </p>
        </div>
      </header>

      {/* POEM FEED */}
      <main className="poem-feed">
        {POEMS.map((poem, i) => (
          <ScrollRevealPoemCard 
            key={poem.slug} 
            poem={poem} 
            index={i} 
            onHover={setHoveredPoem} 
          />
        ))}

        {/* Placeholder */}
        <div className="poem-card-wrapper revealed placeholder-wrapper">
          <div className="poem-margin-id muted">
            <span className="margin-numeral">?</span>
            <div className="margin-line" />
          </div>
          <div className="poem-blog-card coming-soon" aria-hidden="true">
            <div className="card-cover soon-cover">
              <span className="cover-emblem">✧</span>
            </div>
            <div className="card-info">
              <div className="card-meta">
                <span>soon</span>
              </div>
              <h2 className="card-poem-title muted">Untitled, for now</h2>
              <p className="card-excerpt">
                The next poem is still gathering itself — somewhere between a
                thought and a feeling.
              </p>
            </div>
          </div>
        </div>

        {/* Themed Hover Preview Flashcard (Global) */}
        {POEMS.map(poem => (
          <PoemHoverPreview 
            key={poem.slug}
            poem={poem} 
            active={hoveredPoem === poem.slug} 
          />
        ))}
      </main>

      {/* FOOTER */}
      <footer className="realm-footer">
        <p>
          Every poem here began as a question that refused to leave.
        </p>
      </footer>
      
      {/* Floating Interactive Elements */}
      <div className="poetry-interactive-layer" aria-hidden="true">
        <div 
          className="cursor-glow" 
          style={{ 
            left: mousePos.x, 
            top: mousePos.y 
          }} 
        />
      </div>
    </div>
  );
}
