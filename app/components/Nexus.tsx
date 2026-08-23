"use client";

import { useState } from "react";
import Link from "next/link";
import type { NexusStage } from "./Hero";

interface NexusProps {
  stage: NexusStage;
  onOrbClick: () => void;
}

const ORB_DATA = [
  {
    id: 0,
    title: "Science",
    subtitle: "01 // QUANTUM & FORM",
    posClass: "left",
    href: "/science",
    desc: "I have always been attached to Science. It's an offspring of curiosity, having the power to drive my mind down a crooked road to find an answer maybe not many know.",
  },
  {
    id: 1,
    title: "Poetry",
    subtitle: "02 // VERSE & ECHO",
    posClass: "center",
    href: "/poetry",
    desc: "Poetry's always been a tool for me. I use it as an axe in the woodshed, as a knife in my bed, and sometimes as a tear down my cheek.",
  },
  {
    id: 2,
    title: "Curiosity",
    subtitle: "03 // THE MEANING OF IT ALL",
    posClass: "right",
    href: "/curiosity",
    desc: "Isn't curiosity the meaning of it all? Why does one see what one sees? Why does one feel what one feels? It drives me to keep writing.",
  },
];

export default function Nexus({ stage, onOrbClick }: NexusProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Show reflection text during specific phases
  const showReflection = stage === "reflection" || stage === "budding" || stage === "separation";

  // Identity labels fade in only in the final 'divided' stage for a staggered reveal
  const showIdentity = stage === "divided";

  // Keep gooey container active through 'identity' phase to avoid abrupt pop
  const isDividing = stage === "budding" || stage === "separation" || stage === "identity" || stage === "divided";

  const handleOrbKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOrbClick();
    }
  };

  return (
    <div className="nexus-system">
      {/* SVG GOOEY FILTER DEFINITION */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="gooey-polished">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* MAIN ORB — Fades out as division begins */}
      {/* MAIN ORB — interactive invitation into the Nexus */}
<div
  className={`main-orb-wrapper ${stage}`}
  onClick={onOrbClick}
  onKeyDown={handleOrbKeyDown}
  role="button"
  tabIndex={stage === "idle" ? 0 : -1}
  aria-label="Enter the Nexus"
>
  <div className={`glass-orb ${stage}`}>
    {/* Invitation ripples */}
    <div className="orb-invitation-ring ring-one" />
    <div className="orb-invitation-ring ring-two" />

    {/* Existing orb details */}
    <div className="orb-highlight" />
    <div className="orb-core-light" />
  </div>

  {/* Appears only when the visitor hovers/focuses */}
  <div className="orb-enter-label">
    ENTER THE NEXUS
  </div>
</div>

      {/* SEAMLESS GOOEY DIVISION & DRIFT CONTAINER */}
      <div className={`gooey-division-wrap ${isDividing ? "active" : ""} ${stage}`}>
        {ORB_DATA.map((orb) => {
          const isHovered = hoveredId === orb.id;
          const isDimmed = hoveredId !== null && !isHovered;

          return (
            <Link
              key={orb.id}
              href={stage === "divided" ? orb.href : "#"}
              className={`seamless-orb-container ${orb.posClass} ${stage} ${isHovered ? "illuminated" : ""} ${isDimmed ? "dimmed" : ""}`}
              onMouseEnter={() => stage === "divided" ? setHoveredId(orb.id) : null}
              onMouseLeave={() => stage === "divided" ? setHoveredId(null) : null}
            >
              <div className="glass-orb sub-orb-glass">
                <div className="orb-highlight" />
                <span className="sub-orb-dot" />
              </div>

              {/* Labels fade in with a 'rising' effect */}
              <div className={`sub-orb-text ${showIdentity ? "visible" : ""}`}>
                <span className="orb-num">{String(orb.id + 1).padStart(2, "0")}</span>
                <span className="sub-orb-label">{orb.title}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* REFLECTION TEXT */}
      <div className={`reflection-quote-wrap ${showReflection ? "visible" : ""}`}>
        <p className="reflection-line-1">Humanity breathes within questions.</p>
        <p className="reflection-line-2">
          Without them, what are we if not souls learning to wonder?
        </p>
      </div>

      {/* ORBS FOCUS CARD */}
      {stage === "divided" && (
        <div className={`orb-focus-card ${hoveredId !== null ? "visible" : ""}`}>
          {hoveredId !== null && (
            <>
              <div className="card-subtitle">{ORB_DATA[hoveredId].subtitle}</div>
              <div className="card-title">{ORB_DATA[hoveredId].title}</div>
              <div className="card-body">{ORB_DATA[hoveredId].desc}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
