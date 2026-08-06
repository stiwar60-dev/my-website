# Curiosity page — where this goes in MY-WEBSITE

## The only step
Drag the whole `curiosity` folder (this one, unzipped) into your
`app` folder in Finder/File Explorer — the same `app` folder that
already has `poetry` and `science` in it.

That's it. Nothing to merge, nothing else to move. When you're done,
VS Code's file list should show:

```
app/
  components/       (unchanged — Hero.tsx, Nexus.tsx)
  poetry/           (unchanged)
  science/          (unchanged)
  curiosity/        <- new
    page.tsx
    curiosity.css
    components/
      LampIntro.tsx
      DeskCanvas.tsx
      Scrap.tsx
      QuestionCard.tsx
    lib/
      types.ts
      data.ts
      deskBounds.ts
      useLampClick.ts
  favicon.ico
  globals.css
  layout.tsx
  page.tsx
```

## One manual edit: fonts
Open `app/layout.tsx` in VS Code and add these two lines near your
other imports at the top:

```tsx
import { Caveat, Courier_Prime } from 'next/font/google';
```

Then, still in `layout.tsx`, define the fonts (put this above your
`export default function RootLayout` line):

```tsx
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' });
const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-courier',
});
```

Finally, find your `<body ...>` tag in that same file and add the two
new class names to whatever's already in `className`, so it ends up
looking something like:

```tsx
<body className={`${yourExistingClasses} ${caveat.variable} ${courierPrime.variable}`}>
```

Save the file. Run your dev server as usual, then visit
`localhost:3000/curiosity`.

## Adding your own content
Open `curiosity/lib/data.ts` — every fragment on the desk is one entry
in that file. Send me new fragments any time and I'll add them here in
the right shape, or you can copy the pattern yourself once you see a
few examples.

## Known follow-ups (not urgent)
- Dragging the desk currently only works with a mouse — touch/mobile
  support isn't wired up yet.
- No `prefers-reduced-motion` handling yet for the intro sequence.
- Scraps aren't currently reachable by keyboard.

## Preview
`curiosity-preview.html` (sent earlier) is a standalone version of the
same experience with no project setup needed — open it directly in a
browser any time you want to feel the pacing again.
