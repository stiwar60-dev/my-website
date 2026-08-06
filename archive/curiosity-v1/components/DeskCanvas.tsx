'use client';

import { useMemo, useRef, useState } from 'react';
import { scraps } from '../lib/data';
import { computeDeskBounds } from '../lib/deskBounds';
import { Scrap as ScrapData } from '../lib/types';
import Scrap from './Scrap';
import QuestionCard from './QuestionCard';

interface DeskCanvasProps {
  scrapsIn: boolean; // set true once entrance stagger has started
}

export default function DeskCanvas({ scrapsIn }: DeskCanvasProps) {
  const worldRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const bounds = useMemo(() => computeDeskBounds(scraps), []);
  const halfWidth = bounds.width / 2;
  const halfHeight = bounds.height / 2;

  const dragState = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    offX: 0,
    offY: 0,
    curX: 0,
    curY: 0,
    dragged: false,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [focused, setFocused] = useState<ScrapData | null>(null);

  const applyTransform = () => {
    if (!canvasRef.current) return;
    const { curX, curY } = dragState.current;
    canvasRef.current.style.transform = `translate(calc(-${halfWidth}px + ${curX}px), calc(-${halfHeight}px + ${curY}px))`;
  };

  const onMouseDown = (e: React.MouseEvent) => {
    dragState.current.isDown = true;
    dragState.current.dragged = false;
    dragState.current.startX = e.clientX;
    dragState.current.startY = e.clientY;
    setIsDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const d = dragState.current;
    if (!d.isDown) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (Math.abs(dx) + Math.abs(dy) > 4) d.dragged = true;
    d.curX = d.offX + dx;
    d.curY = d.offY + dy;
    applyTransform();
  };

  const endDrag = () => {
    const d = dragState.current;
    if (!d.isDown) return;
    d.isDown = false;
    d.offX = d.curX;
    d.offY = d.curY;
    setIsDragging(false);
    // small delay so the click handler on a scrap can check "did we just drag"
    setTimeout(() => {
      d.dragged = false;
    }, 0);
  };

  return (
    <>
      <div
        ref={worldRef}
        className={`curiosity-world ${isDragging ? 'is-dragging' : ''}`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
      >
        <div
          ref={canvasRef}
          className="curiosity-canvas"
          style={{ width: bounds.width, height: bounds.height }}
        >
          {scraps.map((s) => (
            <Scrap
              key={s.id}
              scrap={s}
              isIn={scrapsIn}
              suppressClick={dragState.current.dragged}
              onOpen={setFocused}
            />
          ))}
          <QuestionCard
            x={-60}
            y={-40}
            rotation={-3}
            onSubmit={(q) => {
              // Wire this up to your storage of choice (e.g. a database
              // row, or a simple KV store) to let questions persist and
              // surface anonymously for future visitors.
              console.log('question left behind:', q);
            }}
          />
        </div>
      </div>

      <div
        className={`curiosity-focus-dim ${focused ? 'is-on' : ''}`}
        onClick={() => setFocused(null)}
      />
      <div className={`curiosity-focus-item ${focused ? 'is-on' : ''}`}>
        {focused && <FocusedScrap scrap={focused} />}
      </div>
    </>
  );
}

function FocusedScrap({ scrap }: { scrap: ScrapData }) {
  // Reuse the same paper/sticky/polaroid visual language — the scale
  // and open gesture (flip / unfold / peel / flatten) are applied by
  // .curiosity-focus-item[data-kind] in curiosity.css, keyed off the
  // data-kind attribute Scrap sets on its root element.
  return (
    <Scrap
      scrap={scrap}
      isIn={true}
      isFocused={true}
      suppressClick={true}
      onOpen={() => {}}
    />
  );
}
