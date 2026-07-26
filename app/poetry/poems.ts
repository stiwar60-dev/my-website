// app/poetry/poems.ts
// Central data store for all published poems.
// To publish a new poem, add a new object to the POEMS array.

export interface Poem {
  slug: string; // used in the URL: /poetry/[slug]
  title: string;
  date: string;
  excerpt: string; // short preview shown on the card
  coverGradient: string; // CSS gradient used as cover art
  coverEmblem: string; // a single decorative character on the cover
  stanzas: string[][]; // array of stanzas, each stanza is an array of lines
}

export const POEMS: Poem[] = [
  {
    slug: "gross",
    title: "Gross",
    date: "2026",
    excerpt:
      "It's a bane, to be sliced open. It doesn't leave a wound nor a scar — a moment of empathy for one's vulnerability...",
    coverGradient:
      "linear-gradient(135deg, #f6e7d7 0%, #e8b4a0 45%, #c98a7d 100%)",
    coverEmblem: "❦",
    stanzas: [
      [
        "It's a bane, to be sliced open",
        "It doesn't leave a wound nor a scar,",
        "A moment of empathy for one's vulnerability",
        "which lays bare in the presence of others' eyes afar,",
        "As our skies turned from day to night,",
        "Don't ask how it happened, I won't explain the fall,",
        "The more I waited,",
        "The more I lost it all",
        "It's an abhorrent feeling, if you ask me;",
        "It's anti-gravity,",
        "It's physically gross,",
        "To slowly fall openly to you close,",
        "I shrug so often,",
        "at how you hold so much authority over me,",
        "It's so adorable that it turns obscene, almost grossly sweet",
      ],
      [
        "One day my eyes fell to the face of this girl,",
        "She didn't hold any unique love,",
        "She didn't hold her tongue much,",
        "But something my weary mind forgot",
        "was how hearts have waves that never stop,",
        "I closed my eyes, held her heart in hand,",
        "and we rode the seas of love across shifting sand,",
        "devoid of troughs, just endless flow,",
        "it was so warm it felt gross, it felt like glow",
        "However, the heart is a steep form of art,",
        "it beats, it hurts, it cures, but it falls apart,",
        "I wish to pose this question,",
        "How?",
        "You sliced me open, all for you,",
        "My highs, my bottoms, my in-between too,",
        "It was so visibly gross,",
        "But you chose,",
        "you chose to love me whole, not just parts exposed",
        "You saw the pain but you held me close",
        "It's the eighth wonder, I suppose,",
        "My life, so dumb and broke",
        "But you love me back,",
        "ugh, it's so adorable that it's gross",
      ],
      [
        "You talk ethereally of star signs,",
        "Cancer, Gemini, Taurus, Pisces,",
        "It's a lost cause if you ask me,",
        "It decrees that you and I can't blend in peace,",
        "A Pisces and a Gemini can't align, it's foreseen,",
        "An ambiguous fallacy, I'd agree if we weren't meant to meet",
        "Perhaps we only orbit each other",
        "under February skies,",
        "You laid your indifferences over mine,",
        "You move, I move, and somehow we align",
        "And it defies every cosmic design,",
        "it's physically gross, the way the zodiac bends",
        "just to accommodate a pair of best friends",
        "And that should feel wrong, like a sign to decline,",
        "but it doesn't, perhaps astrology is a dying art,",
        "Because whatever the stars might bleed,",
        "you will always be the sun to me,",
        "like something warm in my chest I can't unconfine,",
        "and I hate how natural it feels in my mind",
        "It's so gross…",
        "the way it still feels like mine",
      ],
      [
        "Our mouths were blurting texts the other day",
        "about how my willingness with ink",
        "that used to bleed now only leaks and sinks",
        "You possessed the mind of someone like Sherlock's trace,",
        "stabbing at the reason I write but don't feel in place",
        "and you said maybe I just don't harbor",
        "that kind of passion in the things I chase",
        "But then it hit me quietly, almost late,",
        "I've been writing sorrow like it was my state",
        "so long I forgot what actually made me create",
        "I was so deep in the sadness I mistook it for art,",
        "forgot the real pulse that used to start my heart",
        "It's you.",
        "It's so gross the way I feel it through,",
        "like something warm I can't undo,",
        "it rises in me, unasked, untrue,",
        "hair standing still, pulled straight to you",
        "This is me breaking the lock and key,",
        "not to escape, but finally to see,",
        "that I can write myself deeply again",
        "because you were never the end, just where I begin",
        "It's so gross… this undying link",
      ],
      [
        "Every day I worry that too much might transpire",
        "from notion into fire one day higher,",
        "What if I care too much, what if I cling too tight,",
        "but it don't matter when it feels this right,",
        "It's like what the leaves tell the tree:",
        "shed me if you must, I'll still be free,",
        "tied to the root, I'll always be",
        "what you can't undo inside of me",
        "it works like poetry,",
        "Because i know you too care for me",
        "i know your eyes perceive the hues just as me",
        "I know you hold the coffee cup just as me",
        "I love you just as you love me",
        "What is that saying again?",
        "Two positives repel?",
        "Eh, I always thought that was gross as well",
      ],
    ],
  },
];

// Helper: count total lines of a poem
export function countLines(poem: Poem): number {
  return poem.stanzas.reduce((sum, stanza) => sum + stanza.length, 0);
}

// Helper: estimate reading time (~150 words per minute for poetry, read slowly)
export function readingTime(poem: Poem): number {
  const words = poem.stanzas.flat().join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 150));
}

export function getPoemBySlug(slug: string): Poem | undefined {
  return POEMS.find((p) => p.slug === slug);
}
