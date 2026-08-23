"use client";

import { useEffect, useRef, useState } from "react";
import Nexus from "./Nexus";

export type NexusStage =
  | "idle"
  | "focus"
  | "approach"
  | "bubble"
  | "reflection"
  | "budding"
  | "separation"
  | "identity"
  | "divided";

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
    articleUrl:
      "https://www.bl.uk/collection-items/galileos-sidereus-nuncius",
    url: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    type: "poetry",
    title: "Eternal Existence Stanza",
    category: "SANIDHYA'S POETRY",
    significance:
      "Original handwritten reflection on completeness, mortality, and returning to the earth as flowers and bugs.",
    articleUrl: "/poetry",
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
    articleUrl:
      "https://webbtelescope.org/contents/media/images/2022/035/01G7DCWB7137ESAGGD23G9G37B",
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
    category: "SCIENCE & COSMOS",
    title: "Quantum Superposition",
    description:
      "An exploration of one of quantum mechanics' strangest ideas: how possibility, observation, and physical reality collide at microscopic scales.",
    linkText: "Read Article →",
    href: "/science/superposition",
  },
  {
    id: "02",
    category: "POETRY & WORDS",
    title: "Gross",
    description:
      "A poem about vulnerability, affection, and the strange tenderness of being completely seen by another person.",
    linkText: "Read Poem →",
    href: "/poetry/gross",
  },
  {
    id: "03",
    category: "CURIOSITY & FRAGMENTS",
    title: "The Unfinished Constellation",
    description:
      "An archive of abandoned poems, research ideas, observations, photographs, and questions that never found their final form.",
    linkText: "Enter Archive →",
    href: "/curiosity",
  },
];

export default function Hero() {
  const [stage, setStage] = useState<NexusStage>("idle");
  const [ready, setReady] = useState(false);

  const timersRef = useRef<number[]>([]);

  /*
    ROUTING

    /        = true homepage
    /?hub=1 = Science / Poetry / Curiosity hub

    No localStorage is involved. The plain domain always means home.
  */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const wantsHub = params.get("hub") === "1";

    setStage(wantsHub ? "divided" : "idle");
    setReady(true);
  }, []);

  /*
    Clear any unfinished animation timers when this component unmounts.
  */
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) =>
        window.clearTimeout(timer)
      );

      timersRef.current = [];
    };
  }, []);

  const scheduleStage = (
    nextStage: NexusStage,
    delay: number
  ) => {
    const timerId = window.setTimeout(() => {
      setStage(nextStage);
    }, delay);

    timersRef.current.push(timerId);
  };

  /*
    Original Nexus entrance animation.
  */
  const handleOrbClick = () => {
    if (stage !== "idle") return;

    timersRef.current.forEach((timer) =>
      window.clearTimeout(timer)
    );

    timersRef.current = [];

    setStage("focus");

    scheduleStage("approach", 800);
    scheduleStage("bubble", 1200);
    scheduleStage("reflection", 2000);
    scheduleStage("budding", 3500);
    scheduleStage("separation", 5500);
    scheduleStage("identity", 6500);
    scheduleStage("divided", 7000);
  };

  /*
    Jump directly to the divided Nexus hub.

    Used by Mind Map while already on the homepage.
  */
  const openNexusHub = (
    event?: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (event) {
      event.preventDefault();
    }

    timersRef.current.forEach((timer) =>
      window.clearTimeout(timer)
    );

    timersRef.current = [];

    setStage("divided");

    /*
      Keep the browser URL synchronized with the visual state.
    */
    window.history.replaceState(
      null,
      "",
      "/?hub=1"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const isFocusingOrLater = stage !== "idle";

  /*
    Avoid flashing the homepage for a frame before we know
    whether the visitor requested / or /?hub=1.
  */
  if (!ready) {
    return (
      <main
        className="nexus-page-wrapper"
        style={{ minHeight: "100vh" }}
      />
    );
  }

  return (
    <main className="nexus-page-wrapper">
      {/* =====================================================
          SITE HEADER
          ===================================================== */}

      <header className="site-header">
        {/*
          NEXUS = the actual homepage.
          No ?home=1 and no hub behavior.
        */}
        <a
          href="/"
          className="site-logo"
        >
          NEXUS
        </a>

        <nav
          className="site-nav"
          aria-label="Primary navigation"
        >
          {/*
            MIND MAP = the three-world Nexus hub.
          */}
          <a
            href="/?hub=1"
            className="nav-item"
            onClick={openNexusHub}
          >
            Mind Map
          </a>

          <a
            href="#work"
            className="nav-item"
          >
            Archive
          </a>

          <a
            href="#contact"
            className="nav-item"
          >
            Inquiries
          </a>
        </nav>
      </header>

      {/* =====================================================
          NEXUS HERO
          ===================================================== */}

      <section
        id="nexus"
        className={`nexus-hero ${stage}`}
      >
        <div
          className={`ambient-glow-layer ${stage}`}
          aria-hidden="true"
        />

        <div
          className={`nexus-name ${
            isFocusingOrLater ? "fade-out" : ""
          }`}
        >
          An Exploration of Science &amp; Sentiment
        </div>

        <div
          className={`intro-stack ${
            isFocusingOrLater ? "fade-out" : ""
          }`}
        >
          <p className="intro-line line-1">
            The universe is vast.
          </p>

          <p className="intro-line line-2">
            We built tools to measure it.
          </p>

          <p className="intro-line line-3">
            Yet the mind remains a mystery.
          </p>

          <p className="intro-line line-4">
            We wander between logic and wonder.
          </p>
        </div>

        <Nexus
          stage={stage}
          onOrbClick={handleOrbClick}
        />

        {/* ===================================================
            HUMAN + PERSONAL CURIOSITY STRIP
            =================================================== */}

        <div
          className={`curiosity-strip-container ${
            stage === "divided" ? "visible" : ""
          }`}
        >
          <p className="strip-caption">
            Milestones of Human &amp; Personal Curiosity
          </p>

          <div className="curiosity-grid">
            {curiosityImages.map((img) => (
              <div
                key={img.id}
                className="curiosity-card"
              >
                {img.type === "poetry" ? (
                  <div className="poetry-stanza-preview">
                    {img.lines.map(
                      (line, lineIndex) => (
                        <p
                          key={lineIndex}
                          className="stanza-line"
                        >
                          {line}
                        </p>
                      )
                    )}
                  </div>
                ) : (
                  <img
                    src={img.url}
                    alt={img.title}
                    loading="lazy"
                    decoding="async"
                  />
                )}

                <div className="card-overlay-caption">
                  <span className="caption-tag">
                    {img.category}
                  </span>

                  <span className="caption-title">
                    {img.title}
                  </span>

                  <p className="caption-desc">
                    {img.significance}
                  </p>

                  <a
                    href={img.articleUrl}
                    target={
                      img.articleUrl.startsWith("http")
                        ? "_blank"
                        : "_self"
                    }
                    rel="noreferrer"
                    className="caption-link"
                  >
                    {img.type === "poetry"
                      ? "Visit Poetry →"
                      : "Read Historical Article ↗"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-hint">
          ↓ Scroll to Explore
        </div>
      </section>

      <div className="section-divider" />

      {/* =====================================================
          ABOUT
          ===================================================== */}

      <section
        id="about"
        className="content-section about-asymmetric"
      >
        <div className="about-main-col">
          <div className="section-tag">
            01 // MIND MAP
          </div>

          <h2 className="section-title">
            About
          </h2>

          <p className="about-direct-text">
            This site is a biography of my mind, it&apos;s
            my nexus. It&apos;s a place where curiosity
            intersects merely everything I hold passion
            for. I hope you find some solace, some
            answers, and hopefully a companion.
          </p>

          <div className="about-inline-visual">
            <div className="poetry-screenshot-display">
              <p className="stanza-text">
                I don&apos;t wish to end this poem.
              </p>

              <p className="stanza-text">
                This feeling of completeness, and
                fulfillment.
              </p>

              <p className="stanza-text">
                My heart vetoes to let go of it.
              </p>

              <p className="stanza-text">
                I have packed it within my ribs.
              </p>

              <p className="stanza-text">
                And they will leave once I depart from
                this earth.
              </p>

              <p className="stanza-text">
                It will decompose into flowers and bugs.
              </p>

              <p className="stanza-text">
                Let the sun take away my future ones.
              </p>

              <p className="stanza-text">
                From the bugs, I will feed for days.
              </p>

              <p className="stanza-text">
                From the flowers, I will slowly fade
                away.
              </p>

              <p className="stanza-text">
                The eternal existence I will never go
                away.
              </p>
            </div>

            <span className="visual-caption">
              Fig. 1.1 — Manuscript draft screenshot
              from Sanidhya&apos;s personal archive.
            </span>
          </div>
        </div>

        <aside className="about-marginalia">
          <div className="margin-note-header">
            [ FIELD NOTES ]
          </div>

          <p className="margin-script-quote">
            &quot;Observation is not passive. It alters
            the state of what is observed.&quot;
          </p>

          <div className="margin-math-rendered">
            <svg
              viewBox="0 0 280 40"
              className="math-svg"
              fill="none"
              stroke="currentColor"
            >
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

              <text
                x="22"
                y="32"
                fill="rgba(138, 215, 255, 0.7)"
                fontSize="10"
                fontFamily="sans-serif"
              >
                C
              </text>

              <text
                x="35"
                y="26"
                fill="#ffffff"
                fontSize="16"
                fontFamily="serif"
                fontWeight="bold"
              >
                E
              </text>

              <text
                x="50"
                y="26"
                fill="rgba(255,255,255,0.7)"
                fontSize="16"
                fontFamily="serif"
              >
                ·
              </text>

              <text
                x="60"
                y="26"
                fill="#ffffff"
                fontSize="16"
                fontFamily="serif"
              >
                d
              </text>

              <text
                x="70"
                y="26"
                fill="#ffffff"
                fontSize="16"
                fontFamily="serif"
                fontWeight="bold"
              >
                l
              </text>

              <text
                x="88"
                y="26"
                fill="rgba(255,255,255,0.8)"
                fontSize="16"
                fontFamily="sans-serif"
              >
                =
              </text>

              <text
                x="108"
                y="26"
                fill="rgba(255,255,255,0.8)"
                fontSize="18"
                fontFamily="sans-serif"
              >
                −
              </text>

              <text
                x="130"
                y="16"
                fill="rgba(138, 215, 255, 0.9)"
                fontSize="13"
                fontFamily="serif"
              >
                ∂Φ
              </text>

              <text
                x="152"
                y="18"
                fill="rgba(138, 215, 255, 0.7)"
                fontSize="9"
                fontFamily="sans-serif"
              >
                B
              </text>

              <line
                x1="126"
                y1="21"
                x2="162"
                y2="21"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1"
              />

              <text
                x="135"
                y="34"
                fill="rgba(138, 215, 255, 0.9)"
                fontSize="13"
                fontFamily="serif"
              >
                ∂t
              </text>
            </svg>
          </div>

          <span className="margin-coordinates">
            RA 05h 40m / DEC -02°27&apos;
          </span>
        </aside>
      </section>

      <div className="section-divider" />

      {/* =====================================================
          SELECTED WORK
          ===================================================== */}

      <section
        id="work"
        className="content-section work-asymmetric"
      >
        <div className="work-header-group">
          <div className="section-tag">
            02 // ARCHIVE
          </div>

          <h2 className="section-title">
            Selected Work
          </h2>

          <p className="section-subtitle">
            Three pieces from the worlds that make up
            this Nexus — science, poetry, and the things
            that remain unfinished.
          </p>
        </div>

        <div className="work-grid-asymmetric">
          {selectedProjects.map(
            (project, idx) => (
              <div
                key={project.id}
                className={`work-card card-offset-${idx}`}
              >
                <div className="work-card-header">
                  <span className="work-number">
                    {project.id}
                  </span>

                  <span className="work-category">
                    {project.category}
                  </span>
                </div>

                <h3 className="work-card-title">
                  {project.title}
                </h3>

                <p className="work-card-desc">
                  {project.description}
                </p>

                <a
                  href={project.href}
                  className="work-card-link"
                >
                  {project.linkText}
                </a>
              </div>
            )
          )}
        </div>
      </section>

      <div className="section-divider" />

      {/* =====================================================
          CONTACT
          ===================================================== */}

      <section
        id="contact"
        className="content-section contact-asymmetric"
      >
        <div className="section-tag">
          03 // INQUIRIES
        </div>

        <h2 className="section-title">
          Contact
        </h2>

        <p className="section-subtitle">
          Open for collaborative research, dialogue,
          creative ventures, or simply an interesting
          question.
        </p>

        <div className="contact-actions">
          <a
            href="mailto:stiwar60@asu.edu"
            className="contact-btn primary"
          >
            Initiate Contact
          </a>

          <a
            href="/science"
            className="contact-btn secondary"
          >
            Browse Science Writing
          </a>
        </div>
      </section>
    </main>
  );
}