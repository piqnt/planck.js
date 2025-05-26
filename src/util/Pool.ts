/*
 * Planck.js
 *
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** @internal */
export interface PoolOptions<T> {
  max?: number;
  create?: () => T;
  /** Called when an object is being re-allocated. */
  allocate?: (item: T) => void;
  /** Called when an object is returned to pool. */
  release?: (item: T) => void;
  /** Called when an object is returned to the pool but will be disposed from pool. */
  dispose?: (item: T) => T;
}

/** @internal */
export class Pool<T> {
  _list: T[] = [];
  _max: number = Infinity;

  _createFn: () => T;
  _hasCreateFn: boolean = false;
  _createCount: number = 0;

  _allocateFn: (item: T) => void;
  _hasAllocateFn: boolean = false;
  _allocateCount: number = 0;

  _releaseFn: (item: T) => void;
  _hasReleaseFn: boolean = false;
  _releaseCount: number = 0;

  _disposeFn: (item: T) => T;
  _hasDisposeFn: boolean = false;
  _disposeCount: number = 0;

  constructor(opts: PoolOptions<T>) {
    this._list = [];
    this._max = opts.max || this._max;

    this._createFn = opts.create;
    this._hasCreateFn = typeof this._createFn === "function";
    this._allocateFn = opts.allocate;
    this._hasAllocateFn = typeof this._allocateFn === "function";
    this._releaseFn = opts.release;
    this._hasReleaseFn = typeof this._releaseFn === "function";
    this._disposeFn = opts.dispose;
    this._hasDisposeFn = typeof this._disposeFn === "function";
  }

  max(n?: number): number | Pool<T> {
    if (typeof n === "number") {
      this._max = n;
      return this;
    }
    return this._max;
  }

  size(): number {
    return this._list.length;
  }

  allocate(): T {
    let item: T;
    if (this._list.length > 0) {
      item = this._list.shift();
    } else {
      this._createCount++;
      if (this._hasCreateFn) {
        item = this._createFn();
      } else {
        // tslint:disable-next-line:no-object-literal-type-assertion
        item = {} as T;
      }
    }
    this._allocateCount++;
    if (this._hasAllocateFn) {
      this._allocateFn(item);
    }
    return item;
  }

  release(item: T): void {
    if (this._list.length < this._max) {
      this._releaseCount++;
      if (this._hasReleaseFn) {
        this._releaseFn(item);
      }
      this._list.push(item);
    } else {
      this._disposeCount++;
      if (this._hasDisposeFn) {
        item = this._disposeFn(item);
      }
    }
  }

  toString(): string {
    return (
      " +" +
      this._createCount +
      " >" +
      this._allocateCount +
      " <" +
      this._releaseCount +
      " -" +
      this._disposeCount +
      " =" +
      this._list.length +
      "/" +
      this._max
    );
  }
}
