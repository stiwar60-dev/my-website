import { Scrap } from './types';

// Tune these in one place instead of hardcoding canvas/transform
// numbers wherever the desk is rendered.
const PADDING = 400; // breathing room beyond the outermost scrap
const MIN_WIDTH = 1600;
const MIN_HEIGHT = 900;
// Rough half-footprint of the largest scrap type (polaroids), so a
// scrap sitting near the edge doesn't get clipped by the canvas bound.
const ITEM_HALF_WIDTH = 140;
const ITEM_HALF_HEIGHT = 140;

export interface DeskBounds {
  width: number;
  height: number;
}

export function computeDeskBounds(scraps: Scrap[]): DeskBounds {
  if (scraps.length === 0) {
    return { width: MIN_WIDTH, height: MIN_HEIGHT };
  }
  const maxX = Math.max(...scraps.map((s) => Math.abs(s.x))) + ITEM_HALF_WIDTH;
  const maxY = Math.max(...scraps.map((s) => Math.abs(s.y))) + ITEM_HALF_HEIGHT;
  return {
    width: Math.max(MIN_WIDTH, maxX * 2 + PADDING),
    height: Math.max(MIN_HEIGHT, maxY * 2 + PADDING),
  };
}
