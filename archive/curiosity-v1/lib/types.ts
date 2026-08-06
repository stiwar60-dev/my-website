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
  x: number; // offset from desk center, px
  y: number;
  rotation: number; // degrees
  title?: string;
  body?: string; // short preview shown on the desk; supports \n for line breaks
  fullText?: string; // complete piece, shown when focused (falls back to body)
  imageUrl?: string; // polaroid only
  caption?: string; // polaroid only
  hasStain?: boolean;
  hasFoldedCorner?: boolean;
  backText?: string; // shown when flipped; omit for a blank back
}
