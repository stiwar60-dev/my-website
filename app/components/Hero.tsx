"use client";

import { useEffect, useRef, useState } from "react";
import Nexus from "./Nexus";

export type NexusStage = "idle" | "focus" | "approach" | "bubble" | "reflection" | "budding" | "separation" | "identity" | "divided";

type CuriosityImage =
  | {
      id: number;
      type: "image";
      title: string;
      category: string;
      significance: string;
      articleUrl: string;
      url: string;
    }
  | {
      id: number;
      type: "poetry";
      title: string;
      category: string;
      significance: string;
      articleUrl: string;
      lines: string[];
    };

const curiosityImages: CuriosityImage[] = [
  {
    id: 1,
    type: "image",
    title: "M87* Event Horizon (2019)",
    category: "ASTROPHYSICS",
    significance:
      "First direct visual evidence of a supermassive black hole captured by the Event Horizon Telescope array.",
    articleUrl: "https://www.eso.org/public/images/eso1907a/",
    url: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    type: "image",
    title: "Galileo Lunar Sketches (1610)",
    category: "ASTRONOMY",
    significance:
      "Galileo's Sidereus Nuncius drawings—the moment humanity realized celestial bodies were physical, cratered worlds.",
    articleUrl: "https://www.bl.uk/collection-items/galileos-sidereus-nuncius",
    url: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    type: "poetry",
    title: "Eternal Existence Stanza",
    category: "SANIDHYA'S POETRY",
    significance:
      "Original handwritten reflection on completeness, mortality, and returning to the earth as flowers and bugs.",
    articleUrl: "#about",
    lines: [
      "I don't wish to end this poem.",
      "This feeling of completeness, and fulfillment.",
      "My heart vetoes to let go of it.",
      "I have packed it within my ribs.",
      "And they will leave once I depart from this earth.",
      "It will decompose into flowers and bugs.",
      "Let the sun take away my future ones.",
      "From the bugs, I will feed for days.",
      "From the flowers, I will slowly fade away.",
      "The eternal existence I will never go away.",
    ],
  },
  {
    id: 4,
    type: "image",
    title: "JWST First Deep Field (2022)",
    category: "COSMOLOGY",
    significance:
      "SMACS 0723—thousands of ancient galaxies captured in a patch of sky the size of a grain of sand held at arm's length.",
    articleUrl: "https://webbtelescope.org/contents/media/images/2022/035/01G7DCWB7137ESAGGD23G9G37B",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    type: "image",
    title: "Newton's Spectrum Prism (1704)",
    category: "OPTICS & PHYSICS",
    significance:
      "Isaac Newton's foundational prism experiment proving white light is composed of the full visible light spectrum.",
    articleUrl: "https://royalsociety.org/collections/",
    url: "https://images.unsplash.com/photo-1507499739999-097706ad8914?q=80&w=800&auto=format&fit=crop",
  },
];

const selectedProjects = [
  {
    id: "01",
    category: "SCIENCE & COMPUTATION",
    title: "Neural Entropy Simulations",
    description:
      "Interactive visual models exploring quantum chaos, fluid dynamics, and algorithmic representations of physical systems.",
    linkText: "Explore Research →",
  },
  {
    id: "02",
    category: "POETRY & WORDS",
    title: "The Woodshed Anthology",
    description:
      "A curated collection of quiet reflections, verse, and philosophical observations on the human experience.",
    linkText: "Read Poems →",
  },
  {
    id: "03",
    category: "CURIOSITY & LABS",
    title: "Cognitive Nexus Engine",
    description:
      "An experimental web interface mapping the intersections between logic, art, emotion, and curiosity.",
    linkText: "Launch Interactive →",
  },
];

export default function Hero() {
  const [stage, setStage] = useState<NexusStage>("idle");
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };
  }, []);

  const scheduleStage = (nextStage: NexusStage, delay: number) => {
    const timerId = window.setTimeout(() => {
      setStage(nextStage);
    }, delay);
    timersRef.current.push(timerId);
  };

  const handleOrbClick = () => {
    if (stage !== "idle") return;

    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];

    // Phase 1: Focus (800ms) — Text fades, orb becomes focal point
    setStage("focus");
    
    // Phase 2: Approach (1200ms total) — Orb drifts to center, grows 20-30%
    scheduleStage("approach", 800);
    
    // Phase 3: Bubble (1200ms total) — Orb becomes translucent bubble with glass effect
    scheduleStage("bubble", 1200);
    
    // Phase 4: Reflection (2000ms total) — Text fades in beneath orb
    scheduleStage("reflection", 2000);
    
    // Phase 5: Budding (3500ms total) — Bubble stretches, bulges emerge
    scheduleStage("budding", 3500);
    
    // Phase 6: Separation (5500ms total) — Three bubbles detach and drift apart
    scheduleStage("separation", 5500);
    
    // Phase 7: Identity (6500ms total) — Labels fade in, orbs settle
    scheduleStage("identity", 6500);
    
    // Final state: Divided (7000ms total)
    scheduleStage("divided", 7000);
  };

  const isFocusingOrLater = stage !== "idle";

  return (
    <main className="nexus-page-wrapper">
      <header className="site-header">
        <a href="#" className="site-logo">
          NEXUS
        </a>
        <nav className="site-nav">
          <a href="#about" className="nav-item">
            Mind Map
          </a>
          <a href="#work" className="nav-item">
            Archive
          </a>
          <a href="#contact" className="nav-item">
            Inquiries
          </a>
        </nav>
      </header>

      <section className={`nexus-hero ${stage}`}>
        <div className={`ambient-glow-layer ${stage}`} aria-hidden="true" />

        <div className={`nexus-name ${isFocusingOrLater ? "fade-out" : ""}`}>
          An Exploration of Science &amp; Sentiment
        </div>

        <div className={`intro-stack ${isFocusingOrLater ? "fade-out" : ""}`}>
          <p className="intro-line line-1">The universe is vast.</p>
          <p className="intro-line line-2">We built tools to measure it.</p>
          <p className="intro-line line-3">Yet the mind remains a mystery.</p>
          <p className="intro-line line-4">We wander between logic and wonder.</p>
        </div>

        <Nexus stage={stage} onOrbClick={handleOrbClick} />

        <div className={`curiosity-strip-container ${stage === "divided" ? "visible" : ""}`}>
          <p className="strip-caption">Milestones of Human &amp; Personal Curiosity</p>
          <div className="curiosity-grid">
            {curiosityImages.map((img) => (
              <div key={img.id} className="curiosity-card">
                {img.type === "poetry" ? (
                  <div className="poetry-stanza-preview">
                    {img.lines.map((line, lineIndex) => (
                      <p key={lineIndex} className="stanza-line">
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  <img src={img.url} alt={img.title} loading="lazy" decoding="async" />
                )}

                <div className="card-overlay-caption">
                  <span className="caption-tag">{img.category}</span>
                  <span className="caption-title">{img.title}</span>
                  <p className="caption-desc">{img.significance}</p>
                  <a
                    href={img.articleUrl}
                    target={img.articleUrl.startsWith("http") ? "_blank" : "_self"}
                    rel="noreferrer"
                    className="caption-link"
                  >
                    {img.type === "poetry" ? "Read Full Poem ↓" : "Read Historical Article ↗"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-hint">↓ Scroll to Explore</div>
      </section>

      <div className="section-divider" />

      <section id="about" className="content-section about-asymmetric">
        <div className="about-main-col">
          <div className="section-tag">01 // MIND MAP</div>
          <h2 className="section-title">About</h2>
          <p className="about-direct-text">
            This site is a biography of my mind, it's my nexus. It's a place where curiosity
            intersects merely everything I hold passion for. I hope you find some solace, some
            answers, and hopefully a companion.
          </p>

          <div className="about-inline-visual">
            <div className="poetry-screenshot-display">
              <p className="stanza-text">I don't wish to end this poem.</p>
              <p className="stanza-text">This feeling of completeness, and fulfillment.</p>
              <p className="stanza-text">My heart vetoes to let go of it.</p>
              <p className="stanza-text">I have packed it within my ribs.</p>
              <p className="stanza-text">And they will leave once I depart from this earth.</p>
              <p className="stanza-text">It will decompose into flowers and bugs.</p>
              <p className="stanza-text">Let the sun take away my future ones.</p>
              <p className="stanza-text">From the bugs, I will feed for days.</p>
              <p className="stanza-text">From the flowers, I will slowly fade away.</p>
              <p className="stanza-text">The eternal existence I will never go away.</p>
            </div>
            <span className="visual-caption">
              Fig. 1.1 — Manuscript draft screenshot from Sanidhya&apos;s personal archive.
            </span>
          </div>
        </div>

        <aside className="about-marginalia">
          <div className="margin-note-header">[ FIELD NOTES ]</div>
          <p className="margin-script-quote">
            "Observation is not passive. It alters the state of what is observed."
          </p>

          <div className="margin-math-rendered">
            <svg viewBox="0 0 280 40" className="math-svg" fill="none" stroke="currentColor">
              <text
                x="10"
                y="26"
                fill="rgba(138, 215, 255, 0.9)"
                fontSize="18"
                fontFamily="serif"
                fontStyle="italic"
              >
                ∮
              </text>
              <text x="22" y="32" fill="rgba(138, 215, 255, 0.7)" fontSize="10" fontFamily="sans-serif">
                C
              </text>
              <text x="35" y="26" fill="#ffffff" fontSize="16" fontFamily="serif" fontWeight="bold">
                E
              </text>
              <text x="50" y="26" fill="rgba(255,255,255,0.7)" fontSize="16" fontFamily="serif">
                ·
              </text>
              <text x="60" y="26" fill="#ffffff" fontSize="16" fontFamily="serif">
                d
              </text>
              <text x="70" y="26" fill="#ffffff" fontSize="16" fontFamily="serif" fontWeight="bold">
                l
              </text>
              <text x="88" y="26" fill="rgba(255,255,255,0.8)" fontSize="16" fontFamily="sans-serif">
                =
              </text>
              <text x="108" y="26" fill="rgba(255,255,255,0.8)" fontSize="18" fontFamily="sans-serif">
                −
              </text>

              <text x="130" y="16" fill="rgba(138, 215, 255, 0.9)" fontSize="13" fontFamily="serif">
                ∂Φ
              </text>
              <text x="152" y="18" fill="rgba(138, 215, 255, 0.7)" fontSize="9" fontFamily="sans-serif">
                B
              </text>
              <line x1="126" y1="21" x2="162" y2="21" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <text x="135" y="34" fill="rgba(138, 215, 255, 0.9)" fontSize="13" fontFamily="serif">
                ∂t
              </text>
            </svg>
          </div>

          <span className="margin-coordinates">RA 05h 40m / DEC -02°27&apos;</span>
        </aside>
      </section>

      <div className="section-divider" />

      <section id="work" className="content-section work-asymmetric">
        <div className="work-header-group">
          <div className="section-tag">02 // ARCHIVE</div>
          <h2 className="section-title">Selected Work</h2>
          <p className="section-subtitle">
            Projects, writing, and experiments born from the intersection of curiosity, science,
            and poetry.
          </p>
        </div>

        <div className="work-grid-asymmetric">
          {selectedProjects.map((project, idx) => (
            <div key={project.id} className={`work-card card-offset-${idx}`}>
              <div className="work-card-header">
                <span className="work-number">{project.id}</span>
                <span className="work-category">{project.category}</span>
              </div>
              <h3 className="work-card-title">{project.title}</h3>
              <p className="work-card-desc">{project.description}</p>
              <a href="#" className="work-card-link">
                {project.linkText}
              </a>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="contact" className="content-section contact-asymmetric">
        <div className="section-tag">03 // INQUIRIES</div>
        <h2 className="section-title">Contact</h2>
        <p className="section-subtitle">
          Open for collaborative research, dialogue, and creative ventures.
        </p>
        <div className="contact-actions">
          <a href="mailto:contact@example.com" className="contact-btn primary">
            Initiate Contact
          </a>
          <a href="#work" className="contact-btn secondary">
            Read Essay Index
          </a>
        </div>
      </section>
    </main>
  );
}
