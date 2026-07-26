"use client";

// app/poetry/[slug]/page.tsx
// The full poem reading experience.
// Warm paper background, stanza-by-stanza reveal on scroll,
// elegant serif typography, gentle ambient motion.

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPoemBySlug, countLines, readingTime } from "../poems";
import "../poetry.css";

export default function PoemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const poem = getPoemBySlug(slug);

  const [visibleStanzas, setVisibleStanzas] = useState<Set<number>>(new Set());
  const stanzaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState(0);

  // Reveal stanzas as they scroll into view
  useEffect(() => {
    if (!poem) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setVisibleStanzas((prev) => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.15 }
    );
    stanzaRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [poem]);

  // Reading progress bar
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setProgress(total > 0 ? (doc.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!poem) {
    notFound();
  }

  return (
    <div className="poem-reader">
      {/* Reading progress */}
      <div className="reading-progress" style={{ width: `${progress}%` }} />

      {/* Ambient paper background */}
      <div className="reader-background" aria-hidden="true">
        <div className="reader-glow glow-a" />
        <div className="reader-glow glow-b" />
        <div className="reader-grain" />
      </div>

      {/* Top navigation */}
      <nav className="reader-nav">
        <Link href="/poetry" className="realm-back">
          ← All poems
        </Link>
      </nav>

      {/* Poem hero */}
      <header className="poem-hero">
        <div
          className="poem-hero-cover"
          style={{ background: poem.coverGradient }}
        >
          <span className="cover-emblem large">{poem.coverEmblem}</span>
        </div>
        <h1 className="poem-hero-title">{poem.title}</h1>
        <div className="poem-hero-meta">
          <span>{poem.date}</span>
          <span className="meta-dot">·</span>
          <span>{countLines(poem)} lines</span>
          <span className="meta-dot">·</span>
          <span>{readingTime(poem)} min read</span>
        </div>
        <div className="hero-rule" />
      </header>

      {/* The poem itself */}
      <article className="poem-article">
        {poem.stanzas.map((stanza, sIdx) => (
          <div
            key={sIdx}
            ref={(el) => {
              stanzaRefs.current[sIdx] = el;
            }}
            data-idx={sIdx}
            className={`poem-stanza ${visibleStanzas.has(sIdx) ? "inked" : ""}`}
          >
            {stanza.map((line, lIdx) => (
              <p
                key={lIdx}
                className="stanza-line"
                style={{ transitionDelay: `${lIdx * 0.06}s` }}
              >
                {line}
              </p>
            ))}
            {sIdx < poem.stanzas.length - 1 && (
              <div className="stanza-break">✦</div>
            )}
          </div>
        ))}
      </article>

      {/* End mark */}
      <footer className="poem-end">
        <div className="end-flourish">❦</div>
        <p className="end-note">
          Thank you for reading. If this stirred something, carry it with you.
        </p>
        <Link href="/poetry" className="end-back">
          Return to the collection
        </Link>
      </footer>
    </div>
  );
}
