'use client';

import { useEffect, useMemo, useState } from 'react';
import { scraps as seedScraps, type Scrap } from './notes';
import BookEntrance from './components/BookEntrance';
import ThoughtField from './components/ThoughtField';
import FragmentReader, { type ContributionType } from './components/FragmentReader';
import './curiosity.css';

const KEY = 'nexus-curiosity-fragments-v1';

type Saved = {
  id: string;
  type: ContributionType;
  text: string;
  createdAt: number;
};

const toScrap = (x: Saved): Scrap => ({
  id: x.id,
  kind: 'sticky',
  title:
    x.type === 'question'
      ? 'A question left behind'
      : x.type === 'beginning'
        ? 'A beginning left behind'
        : 'A thought left behind',
  body: x.text,
  x: 0,
  y: 0,
  rotation: 0,
});

export default function CuriosityPage() {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState<Scrap | null>(null);
  const [visitors, setVisitors] = useState<Scrap[]>([]);
  const [newId, setNewId] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 3900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);

      if (raw) {
        const parsed = JSON.parse(raw) as Saved[];

        if (Array.isArray(parsed)) {
          setVisitors(parsed.map(toScrap));
        }
      }
    } catch {
      // Curiosity still works if localStorage is unavailable.
    }
  }, []);

  const all = useMemo(
    () => [...seedScraps, ...visitors],
    [visitors]
  );

  const photoCount = all.filter(
    (scrap) => scrap.kind === 'polaroid'
  ).length;

  const questionCount = all.filter(
    (scrap) =>
      scrap.kind === 'question' ||
      scrap.title?.toLowerCase().includes('question')
  ).length;

  /*
    Reuse the archive's existing open-question fragment as the
    doorway into FragmentReader's contribution page. This means
    the side bookmark opens the exact same cream-page experience
    rather than creating a second form.
  */
  const contributionScrap = useMemo(
    () =>
      seedScraps.find((scrap) => scrap.kind === 'question') ??
      all.find((scrap) => scrap.kind === 'question') ??
      null,
    [all]
  );

  const contribute = (
    text: string,
    type: ContributionType
  ) => {
    const saved: Saved = {
      id: `visitor-${Date.now()}`,
      type,
      text,
      createdAt: Date.now(),
    };

    const scrap = toScrap(saved);

    setVisitors((current) => {
      const next = [...current, scrap];

      try {
        const rows: Saved[] = next.map((item) => ({
          id: item.id,
          type: item.title?.toLowerCase().includes('question')
            ? 'question'
            : item.title?.toLowerCase().includes('beginning')
              ? 'beginning'
              : 'thought',
          text: item.body || '',
          createdAt: Date.now(),
        }));

        localStorage.setItem(KEY, JSON.stringify(rows));
      } catch {
        // Submission still appears for this session.
      }

      return next;
    });

    setNewId(scrap.id);
    setFocus(null);

    window.setTimeout(() => setNewId(null), 2600);
  };

  return (
    <main
      className={`curiosity-page ${
        open ? 'archive-is-open' : ''
      }`}
    >
      <BookEntrance finished={open} />

      <header className="curiosity-topbar">
        <a href="/" className="curiosity-logo">
          NEXUS
        </a>

        <div className="curiosity-section-id">
          <span>03</span>
          <span>/</span>
          <strong>CURIOSITY</strong>
        </div>

        <span className="curiosity-status">
          UNFINISHED / ONGOING
        </span>
      </header>

      <ThoughtField
        scraps={all}
        onOpen={setFocus}
        newlyCreatedId={newId}
        fragmentCount={all.length}
        photoCount={photoCount}
        questionCount={questionCount}
      />

      {contributionScrap && (
        <button
          type="button"
          className="contribution-edge-tab"
          onClick={() => setFocus(contributionScrap)}
          aria-label="Leave a thought in the Unfinished Constellation"
        >
          LEAVE A THOUGHT
        </button>
      )}

      <FragmentReader
        scrap={focus}
        onClose={() => setFocus(null)}
        onContributionSubmit={contribute}
      />
    </main>
  );
}