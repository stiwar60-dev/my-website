'use client';

import {
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';

import type { Scrap } from '../notes';

interface ThoughtFieldProps {
  scraps: Scrap[];
  onOpen: (scrap: Scrap) => void;
  newlyCreatedId: string | null;
  fragmentCount: number;
  photoCount: number;
  questionCount: number;
}

type Position = {
  x: number;
  y: number;
  depth: 'near' | 'middle' | 'far';
};

const POSITIONS: Position[] = [
  { x: 60, y: 20, depth: 'middle' },
  { x: 78, y: 29, depth: 'far' },
  { x: 88, y: 48, depth: 'near' },
  { x: 58, y: 53, depth: 'near' },
  { x: 72, y: 66, depth: 'middle' },
  { x: 43, y: 69, depth: 'far' },
  { x: 90, y: 77, depth: 'middle' },
  { x: 55, y: 82, depth: 'far' },
  { x: 30, y: 82, depth: 'middle' },
  { x: 48, y: 62, depth: 'near' },
  { x: 19, y: 66, depth: 'far' },
  { x: 22, y: 70, depth: 'middle' },
  { x: 68, y: 86, depth: 'near' },
  { x: 84, y: 88, depth: 'far' },
  { x: 95, y: 35, depth: 'middle' },

  /*
    Extra positions for visitor fragments.
  */
  { x: 81, y: 58, depth: 'near' },
  { x: 64, y: 73, depth: 'middle' },
  { x: 47, y: 34, depth: 'near' },
  { x: 92, y: 58, depth: 'far' },
  { x: 74, y: 42, depth: 'middle' },
];
const VISITOR_POSITIONS: Position[] = [
  { x: 76, y: 58, depth: 'near' },
  { x: 63, y: 76, depth: 'middle' },
  { x: 86, y: 68, depth: 'near' },
  { x: 54, y: 84, depth: 'middle' },
  { x: 71, y: 38, depth: 'far' },
  { x: 91, y: 54, depth: 'middle' },
  { x: 47, y: 62, depth: 'far' },
  { x: 81, y: 82, depth: 'near' },
];

const CONNECTIONS = [
  [0, 1],
  [0, 9],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 6],
  [4, 7],
  [3, 9],
  [9, 11],
  [9, 5],
  [5, 8],
  [8, 10],
  [5, 7],
  [7, 12],
  [12, 13],
  [13, 15],
  [15, 16],
  [16, 4],
];

function kindLabel(kind: Scrap['kind']) {
  switch (kind) {
    case 'draft':
      return 'ABANDONED DRAFT';

    case 'polaroid':
      return 'MEMORY';

    case 'observation':
      return 'OBSERVATION';

    case 'note':
      return 'FIELD NOTE';

    case 'sticky':
      return 'FRAGMENT';

    case 'question':
      return 'OPEN QUESTION';

    default:
      return 'FRAGMENT';
  }
}

function preview(scrap: Scrap) {
  return (
    scrap.title ||
    scrap.caption ||
    scrap.body ||
    'unfinished'
  );
}

function isTelephone(scrap: Scrap) {
  return scrap.id === 'telephone';
}

function isEarthSun(scrap: Scrap) {
  return scrap.id === 'earth-and-sun';
}

function isVisitorScrap(scrap: Scrap) {
  return scrap.id.startsWith('visitor-');
}

export default function ThoughtField({
  scraps,
  onOpen,
  newlyCreatedId,
  fragmentCount,
  photoCount,
  questionCount,
}: ThoughtFieldProps) {
  const fieldRef =
    useRef<HTMLDivElement | null>(null);

  const [hovered, setHovered] =
    useState<string | null>(null);

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (!fieldRef.current) return;

    const rect =
      fieldRef.current.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) /
        rect.width) *
      100;

    const y =
      ((event.clientY - rect.top) /
        rect.height) *
      100;

    fieldRef.current.style.setProperty(
      '--mouse-x',
      `${x}%`
    );

    fieldRef.current.style.setProperty(
      '--mouse-y',
      `${y}%`
    );
  };

  return (
    <section
      ref={fieldRef}
      className="thought-field"
      onPointerMove={handlePointerMove}
    >
      <div className="attention-light" />

      {/* GIANT BURIED WORDS */}
      <div className="ghost-writing ghost-one">
        WHY DO WE
        <br />
        NEED AN ANSWER?
      </div>

      <div className="ghost-writing ghost-two">
        MAYBE
      </div>

      <div className="ghost-writing ghost-three">
        NOT YET.
      </div>

      {/* HANDWRITTEN MARGINALIA */}
      <div className="field-marginalia marginalia-one">
        same question?
      </div>

      <div className="field-marginalia marginalia-two">
        → came back to this
      </div>

      <div className="field-marginalia marginalia-three">
        no conclusion.
      </div>

      {/* HEADING */}
      <div className="field-heading">
        <span className="field-code">
          ARCHIVE / 03 / UNRESOLVED
        </span>

        <h1>
          The Unfinished
          <em>Constellation.</em>
        </h1>

        <p>
          Things that never found their final form.
          Some became questions. Some became poems.
          Some simply stayed.
        </p>
      </div>

      {/* CONNECTIONS */}
      <svg
        className="thought-connections"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {CONNECTIONS.map(
          ([a, b], index) => {
            const start = POSITIONS[a];
            const end = POSITIONS[b];

            const scrapA = scraps[a];
            const scrapB = scraps[b];

            if (
              !start ||
              !end ||
              !scrapA ||
              !scrapB
            ) {
              return null;
            }

            const active =
              hovered === scrapA.id ||
              hovered === scrapB.id;

            return (
              <line
                key={`${a}-${b}-${index}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                className={
                  active
                    ? 'thought-line is-active'
                    : 'thought-line'
                }
              />
            );
          }
        )}
      </svg>

      {scraps.map((scrap, index) => {
        const visitor = isVisitorScrap(scrap);

const visitorIndex = visitor
  ? scraps
      .slice(0, index)
      .filter(isVisitorScrap)
      .length
  : -1;

const position = visitor
  ? VISITOR_POSITIONS[
      visitorIndex % VISITOR_POSITIONS.length
    ]
  : POSITIONS[
      index % POSITIONS.length
    ];

        const isPolaroid =
          scrap.kind === 'polaroid';

        const isFeature =
          scrap.kind === 'draft' &&
          Boolean(scrap.fullText);

        const isQuestion =
          scrap.kind === 'question';

        const telephone =
          isTelephone(scrap);

        const earthSun =
          isEarthSun(scrap);

        

        const justCreated =
          newlyCreatedId === scrap.id;

        const className = [
          'field-fragment',
          `depth-${position.depth}`,
          isPolaroid
            ? 'fragment-polaroid'
            : '',
          isFeature
            ? 'fragment-feature'
            : '',
          isQuestion
            ? 'fragment-question'
            : '',
          telephone
            ? 'fragment-telephone'
            : '',
          earthSun
            ? 'fragment-earth-sun'
            : '',
          visitor
            ? 'fragment-visitor'
            : '',
          justCreated
            ? 'is-newborn'
            : '',
          hovered === scrap.id
            ? 'is-hovered'
            : '',
        ]
          .filter(Boolean)
          .join(' ');

        const style = {
          left: `${position.x}%`,
          top: `${position.y}%`,
          '--fragment-delay': `${index * 90}ms`,
          '--fragment-rotation': `${scrap.rotation}deg`,
        } as CSSProperties;

        return (
          <button
            key={scrap.id}
            type="button"
            className={className}
            style={style}
            onMouseEnter={() =>
              setHovered(scrap.id)
            }
            onMouseLeave={() =>
              setHovered(null)
            }
            onFocus={() =>
              setHovered(scrap.id)
            }
            onBlur={() =>
              setHovered(null)
            }
            onClick={() =>
              onOpen(scrap)
            }
          >
            {/* POLAROID */}
            {isPolaroid ? (
              <span className="field-polaroid">
                <span
                  className="field-polaroid-image"
                  style={{
                    backgroundImage:
                      scrap.imageUrl
                        ? `url(${scrap.imageUrl})`
                        : undefined,
                  }}
                />

                <span className="field-polaroid-caption">
                  {scrap.caption ||
                    'untitled'}
                </span>
              </span>
            ) : telephone ? (
              /* TELEPHONE SCRAP */
              <span className="telephone-scrap">
                <span className="telephone-pin" />

                <span className="telephone-title">
                  TELEPHONE
                </span>

                <span className="telephone-copy">
                  i wont call because i know
                  <br />
                  you wont answer
                  <br />
                  and you wont call because
                  <br />
                  you know i am dying to answer.
                </span>
              </span>
            ) : earthSun ? (
              /* EARTH / SUN DIAGRAM */
              <span className="orbit-note">
                <span className="orbit-note-label">
                  EARTH / SUN
                </span>

                <span className="orbit-diagram">
                  <span className="diagram-sun">
                    ☼
                  </span>

                  <span className="diagram-line" />

                  <span className="diagram-earth">
                    ●
                  </span>
                </span>

                <span className="orbit-question">
                  inevitable?
                </span>
              </span>
            ) : isFeature ? (
              /* LARGE FEATURED DRAFT */
              <span className="feature-fragment">
                <span className="feature-number">
                  {String(
                    index + 1
                  ).padStart(2, '0')}
                </span>

                <span className="feature-kind">
                  {kindLabel(
                    scrap.kind
                  )}
                </span>

                <span className="feature-copy">
                  {preview(scrap)}
                </span>

                <span className="feature-open">
                  OPEN ↗
                </span>
              </span>
            ) : visitor ? (
              /* VISITOR'S GOLD NODE */
              <span className="visitor-fragment">
                <span className="visitor-star">
                  <span />
                </span>

                <span className="visitor-copy">
                  <small>
                    LEFT HERE / SOMEONE
                  </small>

                  {scrap.body}
                </span>
              </span>
            ) : (
              /* NORMAL CONSTELLATION NODE */
              <>
                <span className="fragment-node">
                  <span />
                </span>

                <span className="fragment-label">
                  <span className="fragment-meta">
                    {String(
                      index + 1
                    ).padStart(2, '0')}{' '}
                    /{' '}
                    {kindLabel(
                      scrap.kind
                    )}
                  </span>

                  <span className="fragment-copy">
                    {preview(scrap)}
                  </span>
                </span>
              </>
            )}
          </button>
        );
      })}

      {/* LIVE ARCHIVE COUNT */}
      <div className="archive-counter">
        <span>
          {fragmentCount} FRAGMENTS
        </span>

        <span>
          {photoCount} PHOTOGRAPHS
        </span>

        <span>
          {questionCount} UNANSWERED
        </span>
      </div>

      <div className="field-footer">
        <span>MOVE TO REVEAL</span>

        <span className="field-footer-line" />

        <span>CLICK TO ENTER</span>
      </div>
    </section>
  );
}