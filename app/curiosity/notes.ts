
// Real content should replace this. Keep a few deliberately throwaway
// scraps (like the notebook one below) mixed in with meaningful ones —
// that contrast is what makes the desk feel real rather than curated.
export type ScrapKind = 'question' | 'observation' | 'draft' | 'sticky' | 'polaroid' | 'note';

export interface Scrap {
  id: string; kind: ScrapKind; x: number; y: number; rotation: number; title?: string; body?: string; fullText?: string; imageUrl?: string; caption?: string; hasStain?: boolean; hasFoldedCorner?: boolean; backText?: string;
}

export const scraps: Scrap[] = [
  {
    id: 'q-unfinished-thought',
    kind: 'observation',
    x: -420,
    y: -160,
    rotation: -4,
    body: 'What happens to a thought\nyou never finish?',
  },
  {
    id: 'notebook',
    kind: 'sticky',
    x: 180,
    y: -230,
    rotation: 6,
    body: 'Bought a notebook today.',
  },
  {
    id: 'andromeda',
    kind: 'polaroid',
    x: 520,
    y: -90,
    rotation: -8,
    imageUrl: 'https://images.unsplash.com/photo-1658499416170-02fd4d7d439e?auto=format&fit=crop&w=1200&q=85',
    caption: '3:07 AM',
    backText: 'I think I photograph the moon whenever I need proof that I was awake for something beautiful.',
  },
  {
    id: 'ocean-poem',
    kind: 'draft',
    x: -720,
    y: 60,
    rotation: 4,
    body: 'A poem about the ocean\nthat never wanted to end.',
  },
  {
    id: 'dream-compression',
    kind: 'note',
    x: 60,
    y: 180,
    rotation: -2,
    body: 'Research idea:\ndo dreams compress\nlike memory does?',
    hasStain: true,
  },
  {
    id: 'moon-question',
    kind: 'sticky',
    x: -260,
    y: 250,
    rotation: -6,
    body: 'The moon looked closer\nlast night. Why?',
  },
  {
    id: 'nebula',
    kind: 'polaroid',
    x: 660,
    y: 220,
    rotation: 5,
    imageUrl: 'https://images.unsplash.com/photo-1733952721593-173367ef4558?auto=format&fit=crop&w=1200&q=85',
    caption: 'somewhere after midnight',
    backText: 'I don’t remember where this was. I remember wanting the night to last longer.',
    hasFoldedCorner: true,
  },
  {
    id: 'silence-pitch',
    kind: 'note',
    x: 920,
    y: -40,
    rotation: -5,
    body: 'Abandoned: an essay on\nwhy silence has a pitch.',
  },
  {
    id: 'grandmother-pause',
    kind: 'observation',
    x: -980,
    y: -60,
    rotation: 3,
    body: 'Observation:\nmy grandmother always\npaused before saying\nsomething true.',
  },
  {
    id: 'the-pen-that-refused',
    kind: 'draft',
    x: 1180,
    y: 140,
    rotation: -3,
    body: 'morbid is the pen that refused to bleed,\nwithered were the words that begged to be freed...',
    fullText:
      'morbid is the pen that refused to bleed,\nwithered were the words that begged to be freed,\nthey ran through the queer idleness of the streets,\nand lay static on the amber printed sheets\nit had been 19 tedious centuries of writing,\nmy hand had held the shield from resigning,\nbut as the leaves turned grey and the sky turned pale,\nmy fingertips slowly quivered to medusa\u2019s tale,\nthe book met its culmination 2 months back,\nand so as the ink slowly cried,\nthe soul that it entailed, slowly dried,\nthree years ago, i had to keep the book safe,\naway from the wounds of the wolves,\nhostility became the language that it had never seen\nit sealed itself in a jar of light,\nwhen my throat ached for foolish confessions,\ni would unseal the jar, and write another tale,\nsoon, it became a tragedy out of habit,\nTell me, when is a book ever born of need?\nIs it for the hand that writes,\nOr for the eyes that only wander past?\nThe question splits into two winding roads\nHow do I know which one to follow?\na piece of art, requires emotion,\nbut it is meant to be percieved, tis true,\nwhat if my emotions depend on that perception?\nwhat if my heart beats only when seen?\nHave I betrayed the art?\nOr has it betrayed me?\nis that a betrayal to art?\nor is it a betrayal to me?\n\nso a new body ascends into my chambers,\nthey plead with their fists,\nthey stand upright and with a heart open,\ni read the book aloud,\nthe fables of the gods,\nthe archers to my soul,\nnow they would know all,\nhoping that after they heard the book,\nsome sympathy would be sprinkled,\nsome crystals would be forgotten,\nand maybe the love for me\nwould woefully bleed,\nits such as a jar of light,\nbundling between the crests of the shore,\nthe hope that in entails,\nblinds the people that i show it to,\nthe book is safe within the jar,\nbut now the book holds a void,\nits scathed with heat, but it wishes to\nsleep in the cold, passed within the tides,\nits recagnizes that the time for it might have passed\nthe words recited under fury, should have been under guard\nthe book knows that it altered my soul,\nso deep were these cuts,\nso shameful were these words,\nbut now, having read the book aloud,\nto body one, body two, body so,\nmy mind holds the key to it,\nit knows every letter, every space,\nevery syllable held a word,\nso now, i sing it as a song,\nbecause somewhere in the deep end\nof my head, a comet strikes,\nit holds the notion,\nmaybe it won\u2019t be for who heard the book,\nit might just be aboiut the one who lived it,\nthe comet might herald destruction,\nbut it did herald a new beginning to\na new end, the story is composed in me,\nit became me so it no longer afects me,\nthus, the pen wither in a way different,\na way that is unknown to me,\na book that i know write,\nknowing the life i see,\nis theone distinct from the jar,\nhere, my ink hadn\u2019t bled for such a woefully long time,\nbut now i see clearly,\nthus i wish to write a book that is inherent to me,\nthis is the beginning of a story that no longer\nhouses stories that make my fingers bleed,\nit might be something anew,\ni wish my heart knew,\nbut all it feels, is what will be seen,\nand maybe this book, might be a beginning\nthat took me too long to see.',
  },
  {
    id: 'telephone',
    kind: 'sticky',
    x: -140,
    y: -420,
    rotation: 5,
    title: 'Everyday manton (Telephone)',
    body: 'i wont call because i know\nyou wont answer\nand you wont call because\nyou know i am dying to answer.',
  },
  {
    id: 'living-proof',
    kind: 'note',
    x: 420,
    y: 420,
    rotation: -4,
    body: 'living proof that i should be dead',
  },
  {
    id: 'earth-and-sun',
    kind: 'observation',
    x: -560,
    y: 480,
    rotation: 2,
    body: 'Earth and the Sun: could be a metaphor.\nThe Sun will collide into Earth eventually \u2014\nwe know that. Still, it can\u2019t help it.',
  },
  {
    id: 'leave-a-question', kind: 'question', x: 980, y: 460, rotation: -2,
    title: 'An empty page / yours', body: 'Leave something unfinished.'
  },
];
