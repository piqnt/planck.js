/*
* Copyright (c) 2014 Google, Inc.
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

import common from '../util/common';

const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

/**
 * A simple array-like container, similar to std::vector.
 * If we ever start using stl, we should replace this with std::vector.
 */
export default class b2GrowableBuffer<T> {

  data: T[] | null;
//  count: number;
//  capacity: number; // TODO kann weg

  constructor(rhs?: b2GrowableBuffer) {
    this.data = null;
//    this.count = 0;
//    this.capacity = 0;

    if(rhs) {
//      this.count = rhs.count;
//      this.capacity = rhs.capacity;
      if(rhs.data) {
        this.data = rhs.data.map(e => this.copy(e)); // TODO
      }
    }

    // #if defined(LIQUIDFUN_SIMD_NEON)
    // 	// b2ParticleAssembly.neon.s assumes these values are at fixed offsets.
    // 	// If this assert fails, be sure to update the assembly offsets!
    // 	// ldr r3, [r9, #0] @ r3 = out = contacts.data
    // 	// ldr r6, [r9, #8] @ r6 = contacts.capacity
    // 	b2Assert((intptr_t)&data - (intptr_t)(this) == 0
    // 		  && (intptr_t)&capacity - (intptr_t)(this) == 8);
    // #endif // defined(LIQUIDFUN_SIMD_NEON)
  }

  append(): T {
    const obj = this.create();
    this.data.push(obj);
    return obj;
  /*  if (this.count >= this.capacity)
    {
      Grow();
    }
    return data[count++];*/
  }

/*  reserve(newCapacity: number) {
    if (capacity >= newCapacity)
      return;

    // Reallocate and copy.
    T* newData = (T*) allocator->Allocate(sizeof(T) * newCapacity);
    if (data)
    {
      memcpy(newData, data, sizeof(T) * count);
      allocator->Free(data, sizeof(T) * capacity);
    }

    // Update pointer and capacity.
    capacity = newCapacity;
    data = newData;
  }*/

/*  void Grow()
  {
    // Double the capacity.
    int32 newCapacity = capacity ? 2 * capacity
              : b2_minParticleSystemBufferCapacity;
    b2Assert(newCapacity > capacity);
    Reserve(newCapacity);
  }*/

  free() {
//    if (this.data == null)
//      return;

    this.data = null;
//    capacity = 0;
    this.count = 0;
  }

/*  void Shorten(const T* newEnd)
  {
    b2Assert(newEnd >= data);
    count = (int32) (newEnd - data);
  }*/

/*  T& operator[](int i)
  {
    return data[i];
  }*/

/*  const T& operator[](int i) const
  {
    return data[i];
  }*/

/*  T* Data()
  {
    return data;
  }*/

  // TODO add to changelog (this method is new in JS)
  getData() {
    return this.data
  }

  begin() {
    return 0; // TODO pretty useless
  }

  end() {
    return this.data.length; // TODO soll glaub außerhalb des arrays sein
  }

  getCount() {
    return this.data.length;
  }

  setCount(newCount: number) {
    _ASSERT && common.assert(0 <= newCount && newCount <= this.data.length);
    this.data.length = newCount;
  }

  removeIf(pred: (e: T) => boolean) {
    this.data = this.data.filter(e => !pred(e)); // TODO so richtig oder verneinung weg
    return this.data.length;
  }

  // TODO
  template<class BinaryPredicate>
  T* Unique(BinaryPredicate pred)
  {
    T* newEnd = std::unique(data, data + count, pred);
    Shorten(newEnd);
    return newEnd;
  }
}
