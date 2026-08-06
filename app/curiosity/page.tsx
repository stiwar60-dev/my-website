'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { scraps as seedScraps, type Scrap as ScrapData } from './notes';
import './curiosity.css';

type Phase = 'enter' | 'ready';

function renderLines(text?: string) {
  if (!text) return null;
  return text.split('\n').map((line, i) => (
    <span key={`${line}-${i}`}>
      {line}
      <br />
    </span>
  ));
}

export default function CuriosityPage() {
  const [phase, setPhase] = useState<Phase>('enter');
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [questionDraft, setQuestionDraft] = useState('');
  const [visitorScraps, setVisitorScraps] = useState<ScrapData[]>([]);
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [showDeskView, setShowDeskView] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase('ready'), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  const allScraps = useMemo(
    () => [...seedScraps, ...visitorScraps],
    [visitorScraps]
  );

  const focusedScrap = useMemo(
    () => allScraps.find((scrap) => scrap.id === focusedId) ?? null,
    [allScraps, focusedId]
  );

  const openScrap = (scrap: ScrapData) => {
    setFocusedId(scrap.id);
    setShowDeskView(false);
  };

  const closeFocus = () => {
    setFocusedId(null);
    setQuestionDraft('');
  };

  const toggleFlip = (id: string) => {
    setFlipped((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  const submitQuestion = () => {
    const value = questionDraft.trim();
    if (!value) return;

    const newScrap: ScrapData = {
      id: `visitor-${Date.now()}`,
      kind: 'sticky',
      title: 'Anonymous question',
      body: value,
      x: 0,
      y: 0,
      rotation: 0,
    };

    setVisitorScraps((current) => [newScrap, ...current]);
    setFocusedId(newScrap.id);
    setQuestionDraft('');
  };

  return (
    <main className={`curiosity-page phase-${phase}`}>
      {/* MAIN CENTERED VIEW */}
      <section className="curiosity-main">
        {/* HEADER */}
        <header className="curiosity-header">
          <h1 className="curiosity-title">Curiosity</h1>
          <p className="curiosity-subtitle">
            A collection of unfinished thoughts, abandoned research, and fragments of the creative mind.
          </p>
        </header>

        {/* CONTENT AREA */}
        <div className="curiosity-content">
          {focusedScrap ? (
            /* FOCUSED SCRAP VIEW */
            <div className="curiosity-reader">
              <button
                type="button"
                className="curiosity-reader-close"
                onClick={closeFocus}
                aria-label="Close"
              >
                ←
              </button>

              <div className="curiosity-reader-inner">
                <div className="curiosity-reader-meta">
                  {focusedScrap.kind === 'question' ? 'Leave a question' : focusedScrap.kind}
                </div>

                {focusedScrap.kind === 'question' ? (
                  <div className="curiosity-question-composer">
                    <h2 className="curiosity-reader-heading">What question has stayed with you?</h2>
                    <textarea
                      className="curiosity-question-input"
                      value={questionDraft}
                      onChange={(e) => setQuestionDraft(e.target.value)}
                      placeholder="Write one question, memory, or line..."
                      autoFocus
                    />
                    <div className="curiosity-reader-actions">
                      <button
                        type="button"
                        className="curiosity-reader-button primary"
                        onClick={submitQuestion}
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="curiosity-reader-button"
                        onClick={closeFocus}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : focusedScrap.kind === 'polaroid' ? (
                  <div className="curiosity-polaroid-view">
                    <div
                      className="polaroid-frame"
                      style={{
                        backgroundImage: focusedScrap.imageUrl
                          ? `url(${focusedScrap.imageUrl})`
                          : undefined,
                      }}
                    />
                    <p className="polaroid-caption">
                      {focusedScrap.caption || focusedScrap.title || 'Untitled'}
                    </p>
                    {focusedScrap.backText && (
                      <>
                        <button
                          type="button"
                          className="curiosity-reader-button primary"
                          onClick={() => toggleFlip(focusedScrap.id)}
                        >
                          {flipped[focusedScrap.id] ? 'Show front' : 'See back'}
                        </button>
                        {flipped[focusedScrap.id] && (
                          <p className="polaroid-back">{focusedScrap.backText}</p>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="curiosity-text-view">
                    {focusedScrap.title && (
                      <h2 className="curiosity-reader-heading">{focusedScrap.title}</h2>
                    )}
                    <p className="curiosity-reader-text">
                      {focusedScrap.fullText || focusedScrap.body || ''}
                    </p>
                    {focusedScrap.backText && (
                      <button
                        type="button"
                        className="curiosity-reader-button primary"
                        onClick={() => toggleFlip(focusedScrap.id)}
                      >
                        {flipped[focusedScrap.id] ? 'Show front' : 'See back'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : showDeskView ? (
            /* DESK VIEW */
            <div className="curiosity-desk-view">
              <button
                type="button"
                className="curiosity-desk-close"
                onClick={() => setShowDeskView(false)}
              >
                ← Back
              </button>
              <div className="curiosity-scraps-grid">
                {allScraps.map((scrap) => (
                  <button
                    key={scrap.id}
                    type="button"
                    className="curiosity-scrap-thumbnail"
                    onClick={() => openScrap(scrap)}
                  >
                    <span className="scrap-type">{scrap.kind}</span>
                    <span className="scrap-preview">
                      {scrap.title || scrap.body?.substring(0, 40) || 'Untitled'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* INTRO VIEW */
            <div className="curiosity-intro">
              <p className="curiosity-intro-text">
                This is where unfinished things live. Abandoned poems. Research that never became anything. Questions that stayed with me. Fragments of thoughts that refused to be forgotten.
              </p>

              <div className="curiosity-actions">
                <button
                  type="button"
                  className="curiosity-action-button primary"
                  onClick={() => setShowDeskView(true)}
                >
                  Open the desk
                </button>
                <button
                  type="button"
                  className="curiosity-action-button"
                  onClick={() => openScrap(allScraps.find(s => s.kind === 'question')!)}
                >
                  Leave a question
                </button>
              </div>

              <p className="curiosity-intro-footer">
                {allScraps.length} fragments collected
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
