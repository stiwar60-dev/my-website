'use client';

export default function BookEntrance({ finished }: { finished: boolean }) {
  return (
    <div className={`book-entrance ${finished ? 'is-finished' : ''}`} aria-hidden="true">
      <div className="book-void-glow" />
      <div className="opening-book">
        <div className="book-floor-shadow" />
        <div className="book-body">
          <div className="book-pages-under" />
          <div className="book-cover">
            <div className="book-cover-border" />
            <div className="book-cover-copy"><span>VOL. III</span><strong>UNFINISHED</strong><small>NEXUS / ARCHIVE</small></div>
          </div>
          <div className="book-spread">
            <div className="book-page book-page-left">
              <div className="page-running-head">FRAGMENTS / 01</div>
              <p className="book-opening-line">Some things were<br />never meant to<br />become finished.</p>
              <span className="book-pencil-note note-one">came back to this.</span><span className="book-pencil-note note-two">maybe →</span>
            </div>
            <div className="book-page book-page-right">
              <div className="page-running-head">FIELD NOTES</div>
              <div className="book-fragment fragment-a">What happens to a thought<br />you never finish?</div>
              <div className="book-fragment fragment-b">∴ question ≠ failure</div>
              <div className="book-fragment fragment-c">“the pen that refused<br />to bleed...”</div>
              <div className="book-crossout">FIND THE ANSWER</div>
            </div>
          </div>
        </div>
      </div>
      <div className="escaping-ink"><span className="escape-word escape-one">why</span><span className="escape-word escape-two">maybe</span><span className="escape-word escape-three">unfinished</span><span className="escape-mark escape-dot-one"/><span className="escape-mark escape-dot-two"/><span className="escape-mark escape-dot-three"/></div>
      <p className="book-entry-caption">NOT EVERYTHING ASKS TO BE COMPLETED</p>
    </div>
  );
}
