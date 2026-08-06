'use client';

import { useState, type MouseEvent } from 'react';
import { Scrap as ScrapData } from '../lib/types';

interface ScrapProps {
  scrap: ScrapData;
  isIn: boolean;
  onOpen: (scrap: ScrapData) => void;
  suppressClick: boolean;
  isFocused?: boolean;
}

function ScrapFace({
  scrap,
  isFocused,
}: {
  scrap: ScrapData;
  isFocused?: boolean;
}) {
  const text =
    (isFocused ? scrap.fullText ?? scrap.body : scrap.body) ??
    scrap.caption ??
    scrap.title ??
    '';

  switch (scrap.kind) {
    case 'sticky':
      return <div className="curiosity-sticky">{renderLines(text)}</div>;

    case 'polaroid':
      return (
        <div className="curiosity-polaroid">
          <div
            className="frame"
            style={{
              backgroundImage: scrap.imageUrl
                ? `url(${scrap.imageUrl})`
                : undefined,
            }}
          />
          <div className="cap">{scrap.caption}</div>
          {scrap.hasFoldedCorner && (
            <div className="curiosity-folded-corner" />
          )}
        </div>
      );

    case 'draft':
    case 'observation':
      return (
        <div
          className={`curiosity-paper is-torn ${
            isFocused ? 'is-focused-scroll' : ''
          }`}
        >
          {renderLines(text)}
          {scrap.hasStain && (
            <div
              className="curiosity-stain"
              style={{ left: '60%', top: '30%' }}
            />
          )}
        </div>
      );

    case 'note':
      return (
        <div
          className={`curiosity-note ${
            isFocused ? 'is-focused-scroll' : ''
          }`}
        >
          {renderLines(text)}
          {scrap.hasStain && (
            <div
              className="curiosity-stain"
              style={{ left: '55%', top: '40%' }}
            />
          )}
        </div>
      );

    default:
      return <div className="curiosity-paper">{renderLines(text)}</div>;
  }
}

function renderLines(text?: string) {
  if (!text) return null;

  return text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));
}

export default function Scrap({
  scrap,
  isIn,
  onOpen,
  suppressClick,
  isFocused,
}: ScrapProps) {
  const [flipped, setFlipped] = useState(false);
  const canFlip = scrap.kind === 'polaroid' || scrap.kind === 'sticky';

  const hoverTransform = `translate(-50%, -50%) rotate(${scrap.rotation}deg) translateY(-6px)`;
  const restTransform = `translate(-50%, -50%) rotate(${scrap.rotation}deg)`;

  const handleClick = () => {
    if (suppressClick || isFocused) return;
    onOpen(scrap);
  };

  const handleDoubleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!canFlip) return;
    e.stopPropagation();
    setFlipped((f) => !f);
  };

  return (
    <div
      className={`curiosity-scrap ${isIn ? 'is-in' : ''}`}
      data-kind={scrap.kind}
      style={
        isFocused
          ? undefined
          : {
              left: `calc(50% + ${scrap.x}px)`,
              top: `calc(50% + ${scrap.y}px)`,
              transform: restTransform,
            }
      }
      onMouseEnter={(e) => {
        if (isFocused) return;
        (e.currentTarget as HTMLDivElement).style.transform = hoverTransform;
      }}
      onMouseLeave={(e) => {
        if (isFocused) return;
        (e.currentTarget as HTMLDivElement).style.transform = restTransform;
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {canFlip ? (
        <div className="curiosity-flip-outer">
          <div className={`curiosity-flip-inner ${flipped ? 'is-flipped' : ''}`}>
            <div className="curiosity-flip-front">
              <ScrapFace scrap={scrap} isFocused={isFocused} />
            </div>
            <div className="curiosity-flip-back">
              <div className="curiosity-note">
                {scrap.backText ? renderLines(scrap.backText) : null}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ScrapFace scrap={scrap} isFocused={isFocused} />
      )}
    </div>
  );
}