"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Poem } from "../../../lib/poetry";
import "../poetry.css";

function countLines(poem: Poem): number {
  return poem.stanzas.reduce(
    (sum, stanza) => sum + stanza.length,
    0
  );
}

function readingTime(poem: Poem): number {
  const words = poem.stanzas
    .flat()
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 150));
}

const yesStates = [
  {
    thought: "where was I?",
    cue: "remember",
  },
  {
    thought: "I thought it was a wound.",
    cue: "look again",
  },
  {
    thought: "I thought it was the air.",
    cue: "not quite",
  },
  {
    thought: "I thought it was writing.",
    cue: "",
  },
];

export default function PoemClient({
  poem,
}: {
  poem: Poem;
}) {
  const [progress, setProgress] = useState(0);
  const [yesStage, setYesStage] = useState(0);
  const [yesChanging, setYesChanging] = useState(false);
  const [grossConnected, setGrossConnected] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;

      setProgress(
        total > 0
          ? (doc.scrollTop / total) * 100
          : 0
      );
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const advanceYesState = () => {
    if (
      yesChanging ||
      yesStage >= yesStates.length - 1
    ) {
      return;
    }

    setYesChanging(true);

    window.setTimeout(() => {
      setYesStage((stage) =>
        Math.min(stage + 1, yesStates.length - 1)
      );
      setYesChanging(false);
    }, 260);
  };

  const toggleGrossConnection = () => {
    setGrossConnected((connected) => !connected);
  };

  const currentYesState = yesStates[yesStage];
  const yesComplete =
    yesStage === yesStates.length - 1;

  return (
    <div
      className={`poem-reader ${
        poem.slug === "gross"
          ? "poem-reader-gross"
          : ""
      }`}
    >
      <div
        className="reading-progress"
        style={{ width: `${progress}%` }}
      />

      <div
        className="reader-background"
        aria-hidden="true"
      >
        <div className="reader-glow glow-a" />
        <div className="reader-glow glow-b" />
        <div className="reader-grain" />
      </div>

      <nav className="reader-nav">
        <Link href="/poetry" className="realm-back">
          ← All poems
        </Link>

        <Link href="/?hub=1" className="realm-back">
          NEXUS
        </Link>
      </nav>

      <header
        className={`poem-hero ${
          poem.slug === "yes-however-no" && yesComplete
            ? "yes-hero-complete"
            : ""
        }`}
      >
        {poem.slug === "yes-however-no" ? (
          <div
            className={`yes-memory-ritual yes-memory-stage-${yesStage} ${
              yesChanging ? "yes-memory-is-changing" : ""
            }`}
          >
            <button
              type="button"
              className="yes-memory-window"
              onClick={advanceYesState}
              disabled={yesComplete || yesChanging}
              aria-label={
                yesComplete
                  ? "The memory is fully revealed"
                  : "Reveal more of the memory"
              }
            >
              <img
                className="yes-memory-image"
                src="/poetry/yes-however-no.jpeg"
                alt=""
              />

              <span
                className="yes-memory-wash"
                aria-hidden="true"
              />
              <span
                className="yes-memory-veil veil-one"
                aria-hidden="true"
              />
              <span
                className="yes-memory-veil veil-two"
                aria-hidden="true"
              />
              <span
                className="yes-memory-breath"
                aria-hidden="true"
              />
              <span
                className="yes-memory-ink ink-one"
                aria-hidden="true"
              />
              <span
                className="yes-memory-ink ink-two"
                aria-hidden="true"
              />
            </button>

            <div className="yes-memory-language">
              <p
                className="yes-memory-thought"
                aria-live="polite"
              >
                {currentYesState.thought}
              </p>

              {!yesComplete ? (
                <button
                  type="button"
                  className="yes-memory-cue"
                  onClick={advanceYesState}
                  disabled={yesChanging}
                  aria-label="Continue the narrator's thought"
                >
                  <span className="yes-memory-cue-line" />
                  <span>{currentYesState.cue}</span>
                  <span className="yes-memory-cue-arrow">
                    →
                  </span>
                </button>
              ) : (
                <p className="yes-memory-apology">
                  oh my apologies...
                </p>
              )}
            </div>
          </div>
        ) : poem.slug === "gross" ? (
          <div
            className={`gross-almost-touch ${
              grossConnected
                ? "gross-is-connected"
                : ""
            }`}
          >
            <div
              className="gross-photo-slip"
              aria-hidden="true"
            >
              <img
                src="/poetry/gross.jpeg"
                alt=""
              />

              <span className="gross-photo-note">
                don&apos;t look
              </span>
            </div>

            <button
              type="button"
              className="gross-touch-field"
              onClick={toggleGrossConnection}
              aria-label={
                grossConnected
                  ? "Let them pull apart"
                  : "Bring them together"
              }
            >
              <span
                className="gross-orbit gross-orbit-one"
                aria-hidden="true"
              />
              <span
                className="gross-orbit gross-orbit-two"
                aria-hidden="true"
              />

              <span
                className="gross-form gross-form-one"
                aria-hidden="true"
              >
                <span className="gross-form-glow" />
                <span className="gross-speck gross-speck-one" />
                <span className="gross-speck gross-speck-two" />
              </span>

              <span
                className="gross-form gross-form-two"
                aria-hidden="true"
              >
                <span className="gross-form-glow" />
                <span className="gross-speck gross-speck-three" />
                <span className="gross-speck gross-speck-four" />
              </span>

              <span
                className="gross-accidental-heart"
                aria-hidden="true"
              />
              <span
                className="gross-filament"
                aria-hidden="true"
              />
              <span
                className="gross-contact-pulse"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              className="gross-touch-cue"
              onClick={toggleGrossConnection}
              aria-label={
                grossConnected
                  ? "Let them pull apart"
                  : "Bring them together"
              }
            >
              <span className="gross-cue-arrow">
                →
              </span>
              <span>
                {grossConnected
                  ? "no, stop"
                  : "they keep finding each other"}
              </span>
            </button>

            <p
              className="gross-reaction"
              aria-live="polite"
            >
              {grossConnected
                ? "ugh. disgusting."
                : "don't encourage them."}
            </p>
          </div>
        ) : (
          <div
            className="poem-hero-cover"
            style={{
              background: poem.coverGradient,
            }}
          >
            <span className="cover-emblem large">
              {poem.coverEmblem}
            </span>
          </div>
        )}

        {poem.slug === "yes-however-no" ? (
          <h1
            className={`poem-hero-title yes-memory-title ${
              yesComplete
                ? "yes-memory-title-complete"
                : ""
            }`}
            aria-label="Yes, However, No"
          >
            <span
              className={`yes-title-word ${
                yesStage >= 1
                  ? "yes-title-word-visible"
                  : ""
              }`}
              aria-hidden={yesStage < 1}
            >
              Yes,
            </span>

            <span
              className={`yes-title-word ${
                yesStage >= 2
                  ? "yes-title-word-visible"
                  : ""
              }`}
              aria-hidden={yesStage < 2}
            >
              However,
            </span>

            <span
              className={`yes-title-word ${
                yesStage >= 3
                  ? "yes-title-word-visible"
                  : ""
              }`}
              aria-hidden={yesStage < 3}
            >
              No
            </span>
          </h1>
        ) : (
          <h1
            className={`poem-hero-title ${
              poem.slug === "gross"
                ? `gross-title ${
                    grossConnected
                      ? "gross-title-connected"
                      : ""
                  }`
                : ""
            }`}
          >
            {poem.title}
          </h1>
        )}

        <div className="poem-hero-meta">
          <span>{poem.date}</span>
          <span className="meta-dot">·</span>
          <span>{countLines(poem)} lines</span>
          <span className="meta-dot">·</span>
          <span>{readingTime(poem)} min read</span>
        </div>

        <div className="hero-rule" />
      </header>

      <article className="poem-article">
        {poem.stanzas.map((stanza, stanzaIndex) => (
          <div
            key={stanzaIndex}
            className="poem-stanza inked"
          >
            {stanza.map((line, lineIndex) => (
              <p
                key={lineIndex}
                className="stanza-line"
              >
                {line}
              </p>
            ))}

            {stanzaIndex < poem.stanzas.length - 1 && (
              <div className="stanza-break">
                ✦
              </div>
            )}
          </div>
        ))}
      </article>

      <footer className="poem-end">
        <div className="end-flourish">❦</div>

        <p className="end-note">
          Thank you for reading. If this stirred
          something, carry it with you.
        </p>

        <Link
          href="/poetry"
          className="end-back"
        >
          Return to the collection
        </Link>
      </footer>
    </div>
  );
}
