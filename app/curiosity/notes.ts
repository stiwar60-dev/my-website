export type ScrapKind =
  | 'question'
  | 'observation'
  | 'draft'
  | 'sticky'
  | 'polaroid'
  | 'note';

export interface Scrap {
  id: string;
  kind: ScrapKind;
  x: number;
  y: number;
  rotation: number;
  title?: string;
  body?: string;
  fullText?: string;
  imageUrl?: string;
  caption?: string;
  hasStain?: boolean;
  hasFoldedCorner?: boolean;
  backText?: string;
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
    imageUrl: '/curiosity/polaroids/andromeda.jpg',
    caption: 'Andromeda, 3am',
    backText: 'Couldn\'t sleep. Went out to the balcony instead.',
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
    imageUrl: '/curiosity/polaroids/nebula.jpg',
    caption: 'unnamed nebula',
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
    body:
      'morbid is the pen that refused to bleed,\n' +
      'withered were the words that begged to be freed...',
    fullText:
      'morbid is the pen that refused to bleed,\n' +
      'withered were the words that begged to be freed,\n' +
      'they ran through the queer idleness of the streets,\n' +
      'and lay static on the amber printed sheets\n' +
      'it had been 19 tedious centuries of writing,\n' +
      'my hand had held the shield from resigning,\n' +
      'but as the leaves turned grey and the sky turned pale,\n' +
      'my fingertips slowly quivered to medusa\'s tale,\n' +
      'the book met its culmination 2 months back,\n' +
      'and so as the ink slowly cried,\n' +
      'the soul that it entailed, slowly dried,\n' +
      'three years ago, i had to keep the book safe,\n' +
      'away from the wounds of the wolves,\n' +
      'hostility became the language that it had never seen\n' +
      'it sealed itself in a jar of light,\n' +
      'when my throat ached for foolish confessions,\n' +
      'i would unseal the jar, and write another tale,\n' +
      'soon, it became a tragedy out of habit,\n' +
      'Tell me, when is a book ever born of need?\n' +
      'Is it for the hand that writes,\n' +
      'Or for the eyes that only wander past?\n' +
      'The question splits into two winding roads\n' +
      'How do I know which one to follow?\n' +
      'a piece of art, requires emotion,\n' +
      'but it is meant to be percieved, tis true,\n' +
      'what if my emotions depend on that perception?\n' +
      'what if my heart beats only when seen?\n' +
      'Have I betrayed the art?\n' +
      'Or has it betrayed me?\n' +
      'is that a betrayal to art?\n' +
      'or is it a betrayal to me?\n\n' +
      'so a new body ascends into my chambers,\n' +
      'they plead with their fists,\n' +
      'they stand upright and with a heart open,\n' +
      'i read the book aloud,\n' +
      'the fables of the gods,\n' +
      'the archers to my soul,\n' +
      'now they would know all,\n' +
      'hoping that after they heard the book,\n' +
      'some sympathy would be sprinkled,\n' +
      'some crystals would be forgotten,\n' +
      'and maybe the love for me\n' +
      'would woefully bleed,\n' +
      'its such as a jar of light,\n' +
      'bundling between the crests of the shore,\n' +
      'the hope that in entails,\n' +
      'blinds the people that i show it to,\n' +
      'the book is safe within the jar,\n' +
      'but now the book holds a void,\n' +
      'its scathed with heat, but it wishes to\n' +
      'sleep in the cold, passed within the tides,\n' +
      'its recagnizes that the time for it might have passed\n' +
      'the words recited under fury, should have been under guard\n' +
      'the book knows that it altered my soul,\n' +
      'so deep were these cuts,\n' +
      'so shameful were these words,\n' +
      'but now, having read the book aloud,\n' +
      'to body one, body two, body so,\n' +
      'my mind holds the key to it,\n' +
      'it knows every letter, every space,\n' +
      'every syllable held a word,\n' +
      'so now, i sing it as a song,\n' +
      'because somewhere in the deep end\n' +
      'of my head, a comet strikes,\n' +
      'it holds the notion,\n' +
      'maybe it won\'t be for who heard the book,\n' +
      'it might just be aboiut the one who lived it,\n' +
      'the comet might herald destruction,\n' +
      'but it did herald a new beginning to\n' +
      'a new end, the story is composed in me,\n' +
      'it became me so it no longer afects me,\n' +
      'thus, the pen wither in a way different,\n' +
      'a way that is unknown to me,\n' +
      'a book that i know write,\n' +
      'knowing the life i see,\n' +
      'is theone distinct from the jar,\n' +
      'here, my ink hadn\'t bled for such a woefully long time,\n' +
      'but now i see clearly,\n' +
      'thus i wish to write a book that is inherent to me,\n' +
      'this is the beginning of a story that no longer\n' +
      'houses stories that make my fingers bleed,\n' +
      'it might be something anew,\n' +
      'i wish my heart knew,\n' +
      'but all it feels, is what will be seen,\n' +
      'and maybe this book, might be a beginning\n' +
      'that took me too long to see.',
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
    body:
      'Earth and the Sun: could be a metaphor.\n' +
      'The Sun will collide into Earth eventually —\n' +
      'we know that. Still, it can\'t help it.',
  },
  {
    id: 'leave-a-question',
    kind: 'question',
    x: 980,
    y: 460,
    rotation: -2,
    title: 'Leave a question',
    body: 'What question has stayed with you?',
  },
];
