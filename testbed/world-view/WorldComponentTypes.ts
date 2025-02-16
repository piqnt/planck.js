import type { Fixture } from "../";

export type WorldEventHandler = <K extends keyof WorldEventMap>(type: K, ev?: WorldEventMap[K]) => void;

// todo: remove fixture from events

export interface WorldPointerDown {
  point: { x: number; y: number };
  fixture?: Fixture;
  background?: boolean;
}

export interface WorldDragStart {
  point: { x: number; y: number };
  fixture?: Fixture;
  background?: boolean;
}

export interface WorldPointerMove {
  point: { x: number; y: number };
}

export interface WorldDragMove {
  point: { x: number; y: number };
  delta: { x: number; y: number };
  move: { x: number; y: number };
}

export interface WorldPointerUp {
  point: { x: number; y: number };
}

export interface WorldClick {
  point: { x: number; y: number };
  fixture?: Fixture;
  background?: boolean;
}

export interface WorldDragEnd {
  point: { x: number; y: number };
}

export interface WorldEventMap {
  "world-pointer-down": WorldPointerDown;
  "world-drag-start": WorldDragStart;
  "world-pointer-move": WorldPointerMove;
  "world-drag-move": WorldDragMove;
  "world-pointer-up": WorldPointerUp;
  "world-click": WorldClick;
  "world-drag-end": WorldDragEnd;
  "world-drag-cancel": void;
  "world-pointer-cancel": void;
}
