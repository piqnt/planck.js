/*
 * Planck.js
 *
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** @hidden */
export interface DataDriverListener<D, R> {
  enter: (d: D) => R | null;
  exit: (d: D, ref: R) => void;
  update: (d: D, ref: R) => void;
}

/**
 * @experimental @hidden
 *
 * DataDriver is used it to create, update and destroy physics entities based on game objects.
 */
export class DataDriver<D extends object, R> {
  /** @internal */ private _refMap: Record<string, R> = {};
  /** @internal */ private _listener: DataDriverListener<D, R>;
  /** @internal */ private _key: (d: D) => string;

  constructor(key: (d: D) => string, listener: DataDriverListener<D, R>) {
    this._key = key;
    this._listener = listener;
  }

  /** @internal */ private _map: Record<string, D> = {};

  // just for reuse
  /** @internal */ private _xmap: Record<string, D> = {};
  /** @internal */ private _data: D[] = [];
  /** @internal */ private _entered: D[] = [];
  /** @internal */ private _exited: D[] = [];

  update(data: (D | null)[]) {
    // todo: use diff-match-patch instead of map?
    if (!Array.isArray(data)) throw "Invalid data: " + data;

    this._entered.length = 0;
    this._exited.length = 0;
    this._data.length = data.length;

    for (let i = 0; i < data.length; i++) {
      if (typeof data[i] !== "object" || data[i] === null) continue;
      const d = data[i];
      const id = this._key(d);
      if (!this._map[id]) {
        this._entered.push(d);
      } else {
        delete this._map[id];
      }
      this._data[i] = d;
      this._xmap[id] = d;
    }

    for (const id in this._map) {
      this._exited.push(this._map[id]);
      delete this._map[id];
    }

    const temp = this._map;
    this._map = this._xmap;
    this._xmap = temp;

    for (let i = 0; i < this._exited.length; i++) {
      const d = this._exited[i];
      const key = this._key(d);
      const ref = this._refMap[key];
      this._listener.exit(d, ref);
      delete this._refMap[key];
    }

    for (let i = 0; i < this._entered.length; i++) {
      const d = this._entered[i];
      const key = this._key(d);
      const ref = this._listener.enter(d);
      if (ref) {
        this._refMap[key] = ref;
      }
    }

    for (let i = 0; i < this._data.length; i++) {
      if (typeof data[i] !== "object" || data[i] === null) continue;
      const d = this._data[i];
      const key = this._key(d);
      const ref = this._refMap[key];
      this._listener.update(d, ref);
    }

    this._entered.length = 0;
    this._exited.length = 0;
    this._data.length = 0;
  }

  ref(d: D): R {
    return this._refMap[this._key(d)];
  }
}
