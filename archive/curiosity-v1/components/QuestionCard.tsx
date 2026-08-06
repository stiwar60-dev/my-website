'use client';

import { useState } from 'react';

interface QuestionCardProps {
  x: number;
  y: number;
  rotation: number;
  onSubmit?: (question: string) => void; // wire this to your storage of choice
}

export default function QuestionCard({
  x,
  y,
  rotation,
  onSubmit,
}: QuestionCardProps) {
  const [value, setValue] = useState('');
  const [left, setLeft] = useState(false);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit?.(trimmed);
    setLeft(true);
  };

  return (
    <div
      className="curiosity-scrap is-in"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="curiosity-question-card">
        {left ? (
          <>Left behind. Thank you.</>
        ) : (
          <>
            Leave behind a question
            <br />
            that still follows you.
            <textarea
              rows={2}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button type="button" onClick={submit}>
              set it down
            </button>
          </>
        )}
      </div>
    </div>
  );
}
