/*
 * Copyright (c) 2016-2018 Ali Shakiba http://shakiba.me/planck.js
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */

export default class Pool<T> {
  _list = [];
  _max = Infinity;

  _createFn: () => T;
  _outFn: (T) => void;
  _inFn: (T) => void;
  _discardFn: (T) => T;

  _createCount = 0;
  _outCount = 0;
  _inCount = 0;
  _discardCount = 0;

  constructor(opts) {
    this._list = [];
    this._max = opts.max || this._max;

    this._createFn = opts.create;
    this._outFn = opts.allocate;
    this._inFn = opts.release;
    this._discardFn = opts.discard;
  }

  max(n) {
    if (typeof n === 'number') {
      this._max = n;
      return this;
    }
    return this._max;
  }

  size() {
    return this._list.length;
  }

  allocate(): T {
    let item;
    if (this._list.length > 0) {
      item = this._list.shift();
    } else {
      this._createCount++;
      if (typeof this._createFn === 'function') {
        item = this._createFn();
      } else {
        item = {};
      }
    }
    this._outCount++;
    if (typeof this._outFn === 'function') {
      this._outFn(item);
    }
    return item;
  }

  release(item: T): void {
    if (this._list.length < this._max) {
      this._inCount++;
      if (typeof this._inFn === 'function') {
        this._inFn(item);
      }
      this._list.push(item);
    } else {
      this._discardCount++;
      if (typeof this._discardFn === 'function') {
        item = this._discardFn(item);
      }
    }
  }

  toString() {
    return " +" + this._createCount + " >" + this._outCount + " <" + this._inCount + " -"
      + this._discardCount + " =" + this._list.length + "/" + this._max;
  }
}
