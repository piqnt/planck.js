/*
* Copyright (c) 2013 Google, Inc.
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

import { Vec2 } from '../common/Vec2';
import StackQueue from './StackQueue';


const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

interface Generator {
  center: Vec2;
	tag: number;
	necessary: boolean;
}

class VoronoiDiagramTask {
  m_x: number;
  m_y: number;
  m_i: number;
  m_generator: Generator | null;

  constructor();
  constructor(x: number, y: number, i: number, g: Generator);
  constructor(x = 0, y = 0, i = 0, g = null) {
    this.m_x = x;
    this.m_y = y;
    this.m_i = i;
    this.m_generator = g;
  }
}

export default class VoronoiDiagram {

  private m_generatorBuffer: Generator[];
  private m_generatorCapacity: number;
  private m_generatorCount: number;
  private m_countX: number;
  private m_countY: number;
  private m_diagram: Generator[] | null;

  constructor(generatorCapacity: number) {
    // TODO we don't have to allocate all generators
    this.m_generatorBuffer = Array(generatorCapacity)
    for(let i = 0; i < generatorCapacity; i++) {
      this.m_generatorBuffer[i] = {
        center: Vec2.zero(),
        tag: 0,
        necessary: false,
      };
    }
    this.m_generatorCapacity = generatorCapacity;
    this.m_generatorCount = 0;
    this.m_countX = 0;
    this.m_countY = 0;
    this.m_diagram = null;
  }

  /**
   * Add a generator.
   * @param center the position of the generator.
   * @param tag a tag used to identify the generator in callback functions.
   * @param necessary whether to callback for nodes associated with the generator.
   */
  addGenerator(center: Vec2, tag: number, necessary: boolean) {
    _ASSERT && console.assert(this.m_generatorCount < this.m_generatorCapacity);
    const g = this.m_generatorBuffer[this.m_generatorCount++];
    g.center = center;
    g.tag = tag;
    g.necessary = necessary;
  }
  
  /**
   * Generate the Voronoi diagram. It is rasterized with a given interval
	 * in the same range as the necessary generators exist.
   * @param radius the interval of the diagram.
   * @param margin margin for which the range of the diagram is extended.
   */
  generate(radius: number, margin: number) {
    _ASSERT && console.assert(this.m_diagram == null);
    const inverseRadius = 1 / radius;
    let lower = Vec2.neo(Infinity, Infinity);
    let upper = Vec2.neo(-Infinity, -Infinity);
    for (let k = 0; k < this.m_generatorCount; k++) {
      const g = this.m_generatorBuffer[k];
      if (g.necessary) {
        lower = Vec2.lower(lower, g.center);
        upper = Vec2.upper(upper, g.center);
      }
    }
    lower.x -= margin;
    lower.y -= margin;
    upper.x += margin;
    upper.y += margin;
    this.m_countX = 1 + (inverseRadius * (upper.x - lower.x) | 0);
    this.m_countY = 1 + (inverseRadius * (upper.y - lower.y) | 0);
    this.m_diagram = new Array(this.m_countX * this.m_countY).fill(null);
    for (let i = 0; i < this.m_countX * this.m_countY; i++) {
      this.m_diagram[i] = null;
    }
    // (4 * m_countX * m_countY) is the queue capacity that is experimentally
    // known to be necessary and sufficient for general particle distributions.
    const queue = new StackQueue<VoronoiDiagramTask>();
    for (let k = 0; k < this.m_generatorCount; k++) {
      const g = this.m_generatorBuffer[k];
      g.center.sub(lower).mul(inverseRadius);
      const x = g.center.x | 0;
      const y = g.center.y | 0;
      if (x >= 0 && y >= 0 && x < this.m_countX && y < this.m_countY) {
        queue.push(new VoronoiDiagramTask(x, y, x + y * this.m_countX, g));
      }
    }
    // fill diagram using manhattan distance
    while (!queue.empty()) {
      const x = queue.front().m_x;
      const y = queue.front().m_y;
      const i = queue.front().m_i;
      const g = queue.front().m_generator;
      queue.pop();
      if (!this.m_diagram[i]) {
        this.m_diagram[i] = g;
        if (x > 0) {
          queue.push(new VoronoiDiagramTask(x - 1, y, i - 1, g));
        }
        if (y > 0) {
          queue.push(new VoronoiDiagramTask(x, y - 1, i - this.m_countX, g));
        }
        if (x < this.m_countX - 1) {
          queue.push(new VoronoiDiagramTask(x + 1, y, i + 1, g));
        }
        if (y < this.m_countY - 1) {
          queue.push(new VoronoiDiagramTask(x, y + 1, i + this.m_countX, g));
        }
      }
    }
    // correct diagram to use euclidean metric
    for (let y = 0; y < this.m_countY; y++) {
      for (let x = 0; x < this.m_countX - 1; x++) {
        const i = x + y * this.m_countX;
        const a = this.m_diagram[i];
        const b = this.m_diagram[i + 1];
        if (a != b) {
          queue.push(new VoronoiDiagramTask(x, y, i, b));
          queue.push(new VoronoiDiagramTask(x + 1, y, i + 1, a));
        }
      }
    }
    for (let y = 0; y < this.m_countY - 1; y++) {
      for (let x = 0; x < this.m_countX; x++) {
        let i = x + y * this.m_countX;
        const a = this.m_diagram[i];
        const b = this.m_diagram[i + this.m_countX];
        if (a != b) {
          queue.push(new VoronoiDiagramTask(x, y, i, b));
          queue.push(new VoronoiDiagramTask(x, y + 1, i + this.m_countX, a));
        }
      }
    }
    while (!queue.empty()) {
      const task = queue.front();
      const x = task.m_x;
      const y = task.m_y;
      const i = task.m_i;
      const k = task.m_generator;
      queue.pop();
      const a = this.m_diagram[i];
      const b = k;
      if (a != b) {
        const ax = a.center.x - x;
        const ay = a.center.y - y;
        const bx = b.center.x - x;
        const by = b.center.y - y;
        const a2 = ax * ax + ay * ay;
        const b2 = bx * bx + by * by;
        if (a2 > b2) {
          this.m_diagram[i] = b;
          if (x > 0) {
            queue.push(new VoronoiDiagramTask(x - 1, y, i - 1, b));
          }
          if (y > 0) {
            queue.push(new VoronoiDiagramTask(x, y - 1, i - this.m_countX, b));
          }
          if (x < this.m_countX - 1) {
            queue.push(new VoronoiDiagramTask(x + 1, y, i + 1, b));
          }
          if (y < this.m_countY - 1) {
            queue.push(new VoronoiDiagramTask(x, y + 1, i + this.m_countX, b));
          }
        }
      }
    }
  }
  
  /**
   * Enumerate all nodes that contain at least one necessary generator.
   * @param callback a callback function object called for each node.
   */
  getNodes(callback: (a: number, b: number, c: number) => void) {
    for (let y = 0; y < this.m_countY - 1; y++) {
      for (let x = 0; x < this.m_countX - 1; x++) {
        let i = x + y * this.m_countX;
        const a = this.m_diagram[i];
        const b = this.m_diagram[i + 1];
        const c = this.m_diagram[i + this.m_countX];
        const d = this.m_diagram[i + 1 + this.m_countX];
        if (b != c) {
          if (a != b && a != c &&
            (a.necessary || b.necessary || c.necessary)) {
            callback(a.tag, b.tag, c.tag);
          }
          if (d != b && d != c &&
            (b.necessary || d.necessary || c.necessary)) {
            callback(b.tag, d.tag, c.tag);
          }
        }
      }
    }
  }

}
