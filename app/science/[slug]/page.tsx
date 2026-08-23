"use client";

// app/science/[slug]/page.tsx
// The article reading experience — a quiet observatory.
// Deep-space background, prose typography, section-by-section reveal,
// reading progress bar.

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, readingTime } from "../articles";
import "../science.css";

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const article = getArticleBySlug(slug);

  const [visibleBlocks, setVisibleBlocks] = useState<Set<number>>(new Set());
  const blockRefs = useRef<(HTMLElement | null)[]>([]);
  const [progress, setProgress] = useState(0);

  // Reveal blocks as they scroll into view
  useEffect(() => {
    if (!article) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setVisibleBlocks((prev) => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.1 }
    );
    blockRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [article]);

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

  if (!article) {
    notFound();
  }

  return (
    <div className="article-reader">
      {/* Reading progress */}
      <div className="obs-progress" style={{ width: `${progress}%` }} />

      {/* Ambient background (calmer than the landing page) */}
      <div className="space-background dimmed" aria-hidden="true">
        <div className="nebula nebula-violet" />
        <div className="starfield stars-far" />
        <div className="starfield stars-mid" />
      </div>

      {/* Top navigation */}
      <nav className="reader-nav-sci">
  <Link href="/science" className="obs-back">
    ← The Singularity
  </Link>

  <Link href="/?hub=1" className="obs-back">
    NEXUS
  </Link>
</nav>

      {/* Article hero */}
      <header className="article-hero">
        <div
          className="article-hero-cover"
          style={{ background: article.coverGradient }}
        >
          <span className="article-emblem large">{article.coverEmblem}</span>
        </div>
        <span className="article-hero-topic">{article.topic}</span>
        <h1 className="article-hero-title">{article.title}</h1>
        <div className="article-hero-meta">
          <span>{article.date}</span>
          <span className="meta-dot">·</span>
          <span>{readingTime(article)} min read</span>
        </div>
        <div className="hero-rule-sci" />
      </header>

      {/* The article body */}
      <article className="article-body">
        {article.blocks.map((block, idx) => {
          const visible = visibleBlocks.has(idx);
          const common = {
            "data-idx": idx,
            ref: (el: HTMLElement | null) => {
              blockRefs.current[idx] = el;
            },
            className: `article-block ${visible ? "revealed" : ""}`,
          };

          if (block.type === "heading") {
            return (
              <h2 key={idx} {...common} className={`${common.className} block-heading`}>
                {block.text}
              </h2>
            );
          }
          if (block.type === "quote") {
            return (
              <blockquote
                key={idx}
                {...common}
                className={`${common.className} block-quote`}
              >
                {block.text}
              </blockquote>
            );
          }
          if (block.type === "image") {
            return (
              <figure
                key={idx}
                {...common}
                className={`${common.className} block-figure`}
              >
                <div className="figure-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.src}
                    alt={block.caption ?? article.title}
                    loading="lazy"
                  />
                </div>
                {block.caption && (
                  <figcaption className="figure-caption">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }
          return (
            <p key={idx} {...common} className={`${common.className} block-paragraph`}>
              {block.text}
            </p>
          );
        })}
      </article>

      {/* End of article */}
      <footer className="article-end">
        <div className="end-orbit">
          <span className="orbit-dot" />
        </div>
        <p className="end-note-sci">
          Keep looking up. The universe rewards the curious.
        </p>
        <Link href="/science" className="end-back-sci">
          Return to the Singularity
        </Link>
      </footer>
    </div>
  );
}
