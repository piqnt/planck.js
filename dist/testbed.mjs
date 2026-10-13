/**
 * Planck.js v1.5.1
 * @license The MIT license
 * @copyright Copyright (c) 2026 Erin Catto, Ali Shakiba
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { Transform, Rot, WorldManifold, MouseJoint, AABB, DistanceInput, CircleShape, SimplexCache, DistanceOutput, Distance, Vec2, Testbed } from "planck";
import { Testbed as Testbed2 } from "planck";
var i = Symbol.for("preact-signals");
function t() {
  if (!(v > 1)) {
    var i2, t2 = false;
    !(function() {
      var i3 = c;
      c = void 0;
      while (void 0 !== i3) {
        var t3 = i3.S;
        if (t3.v === i3.v) {
          for (var n3 = t3.t; void 0 !== n3; n3 = n3.x) if (n3.i === i3.i) n3.i = t3.i;
        }
        i3 = i3.o;
      }
    })();
    while (void 0 !== h) {
      var n2 = h;
      h = void 0;
      s++;
      while (void 0 !== n2) {
        var r2 = n2.u;
        n2.u = void 0;
        n2.f &= -3;
        if (!(8 & n2.f) && w(n2)) try {
          n2.c();
        } catch (n3) {
          if (!t2) {
            i2 = n3;
            t2 = true;
          }
        }
        n2 = r2;
      }
    }
    s = 0;
    v--;
    if (t2) throw i2;
  } else v--;
}
function n(i2) {
  if (v > 0) return i2();
  e = ++u;
  v++;
  try {
    return i2();
  } finally {
    t();
  }
}
var r, o = void 0;
function f(i2) {
  var t2 = o, n2 = r;
  o = void 0;
  r = void 0;
  try {
    return i2();
  } finally {
    o = t2;
    r = n2;
  }
}
var h = void 0, v = 0, s = 0, u = 0, e = 0, c = void 0, d = 0;
function a(i2) {
  if (void 0 !== o) {
    var t2 = i2.n;
    if (void 0 === t2 || t2.t !== o) {
      t2 = { i: 0, S: i2, p: o.s, n: void 0, t: o, e: void 0, x: void 0, r: t2 };
      if (void 0 !== o.s) o.s.n = t2;
      o.s = t2;
      i2.n = t2;
      if (32 & o.f) i2.S(t2);
      return t2;
    } else if (-1 === t2.i) {
      t2.i = 0;
      if (void 0 !== t2.n) {
        t2.n.p = t2.p;
        if (void 0 !== t2.p) t2.p.n = t2.n;
        t2.p = o.s;
        t2.n = void 0;
        o.s.n = t2;
        o.s = t2;
      }
      return t2;
    }
  }
}
function l(i2, t2) {
  this.v = i2;
  this.i = 0;
  this.n = void 0;
  this.t = void 0;
  this.l = 0;
  this.W = null == t2 ? void 0 : t2.watched;
  this.Z = null == t2 ? void 0 : t2.unwatched;
  this.name = null == t2 ? void 0 : t2.name;
}
l.prototype.brand = i;
l.prototype.h = function() {
  return true;
};
l.prototype.S = function(i2) {
  var t2 = this, n2 = this.t;
  if (n2 !== i2 && void 0 === i2.e) {
    i2.x = n2;
    this.t = i2;
    if (void 0 !== n2) n2.e = i2;
    else f(function() {
      var i3;
      null == (i3 = t2.W) || i3.call(t2);
    });
  }
};
l.prototype.U = function(i2) {
  var t2 = this;
  if (void 0 !== this.t) {
    var n2 = i2.e, r2 = i2.x;
    if (void 0 !== n2) {
      n2.x = r2;
      i2.e = void 0;
    }
    if (void 0 !== r2) {
      r2.e = n2;
      i2.x = void 0;
    }
    if (i2 === this.t) {
      this.t = r2;
      if (void 0 === r2) f(function() {
        var i3;
        null == (i3 = t2.Z) || i3.call(t2);
      });
    }
  }
};
l.prototype.subscribe = function(i2) {
  var t2 = this;
  return j(function() {
    var n2 = t2.value;
    f(function() {
      return i2(n2);
    });
  }, { name: "sub" });
};
l.prototype.valueOf = function() {
  return this.value;
};
l.prototype.toString = function() {
  return this.value + "";
};
l.prototype.toJSON = function() {
  return this.value;
};
l.prototype.peek = function() {
  var i2 = this;
  return f(function() {
    return i2.value;
  });
};
Object.defineProperty(l.prototype, "value", { get: function() {
  var i2 = a(this);
  if (void 0 !== i2) i2.i = this.i;
  return this.v;
}, set: function(i2) {
  if (i2 !== this.v) {
    if (s > 100) throw new Error("Cycle detected");
    !(function(i3) {
      if (0 !== v && 0 === s) {
        if (i3.l !== e) {
          i3.l = e;
          c = { S: i3, v: i3.v, i: i3.i, o: c };
        }
      }
    })(this);
    this.v = i2;
    this.i++;
    d++;
    v++;
    try {
      for (var n2 = this.t; void 0 !== n2; n2 = n2.x) n2.t.N();
    } finally {
      t();
    }
  }
} });
function y(i2, t2) {
  return new l(i2, t2);
}
function w(i2) {
  for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) if (t2.S.i !== t2.i || !t2.S.h() || t2.S.i !== t2.i) return true;
  return false;
}
function _(i2) {
  for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) {
    var n2 = t2.S.n;
    if (void 0 !== n2) t2.r = n2;
    t2.S.n = t2;
    t2.i = -1;
    if (void 0 === t2.n) {
      i2.s = t2;
      break;
    }
  }
}
function b(i2) {
  var t2 = i2.s, n2 = void 0;
  while (void 0 !== t2) {
    var r2 = t2.p;
    if (-1 === t2.i) {
      t2.S.U(t2);
      if (void 0 !== r2) r2.n = t2.n;
      if (void 0 !== t2.n) t2.n.p = r2;
    } else n2 = t2;
    t2.S.n = t2.r;
    if (void 0 !== t2.r) t2.r = void 0;
    t2 = r2;
  }
  i2.s = n2;
}
function p(i2, t2) {
  l.call(this, void 0, t2);
  this.x = i2;
  this.s = void 0;
  this.g = d - 1;
  this.f = 4;
}
p.prototype = new l();
p.prototype.h = function() {
  this.f &= -3;
  if (1 & this.f) return false;
  if (32 == (36 & this.f)) return true;
  this.f &= -5;
  if (this.g === d) return true;
  this.g = d;
  this.f |= 1;
  if (this.i > 0 && !w(this)) {
    this.f &= -2;
    return true;
  }
  var i2 = o;
  try {
    _(this);
    o = this;
    var t2 = this.x();
    if (16 & this.f || this.v !== t2 || 0 === this.i) {
      this.v = t2;
      this.f &= -17;
      this.i++;
    }
  } catch (i3) {
    this.v = i3;
    this.f |= 16;
    this.i++;
  }
  o = i2;
  b(this);
  this.f &= -2;
  return true;
};
p.prototype.S = function(i2) {
  if (void 0 === this.t) {
    this.f |= 36;
    for (var t2 = this.s; void 0 !== t2; t2 = t2.n) t2.S.S(t2);
  }
  l.prototype.S.call(this, i2);
};
p.prototype.U = function(i2) {
  if (void 0 !== this.t) {
    l.prototype.U.call(this, i2);
    if (void 0 === this.t) {
      this.f &= -33;
      for (var t2 = this.s; void 0 !== t2; t2 = t2.n) t2.S.U(t2);
    }
  }
};
p.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (var i2 = this.t; void 0 !== i2; i2 = i2.x) i2.t.N();
  }
};
Object.defineProperty(p.prototype, "value", { get: function() {
  if (1 & this.f) throw new Error("Cycle detected");
  var i2 = a(this);
  this.h();
  if (void 0 !== i2) i2.i = this.i;
  if (16 & this.f) throw this.v;
  return this.v;
} });
function g(i2, t2) {
  return new p(i2, t2);
}
function S(i2) {
  var n2 = i2.m;
  i2.m = void 0;
  if ("function" == typeof n2) {
    v++;
    var r2 = o;
    o = void 0;
    try {
      n2();
    } catch (t2) {
      i2.f &= -2;
      i2.f |= 8;
      m(i2);
      throw t2;
    } finally {
      o = r2;
      t();
    }
  }
}
function m(i2) {
  for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) t2.S.U(t2);
  i2.x = void 0;
  i2.s = void 0;
  S(i2);
}
function x(i2) {
  if (o !== this) throw new Error("Out-of-order effect");
  b(this);
  o = i2;
  this.f &= -2;
  if (8 & this.f) m(this);
  t();
}
function E(i2, t2) {
  this.x = i2;
  this.m = void 0;
  this.s = void 0;
  this.u = void 0;
  this.f = 32;
  this.name = null == t2 ? void 0 : t2.name;
  if (r) r.push(this);
}
E.prototype.c = function() {
  var i2 = this.S();
  try {
    if (8 & this.f) return;
    if (void 0 === this.x) return;
    var t2 = this.x();
    if ("function" == typeof t2) this.m = t2;
  } finally {
    i2();
  }
};
E.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1;
  this.f &= -9;
  S(this);
  _(this);
  v++;
  var i2 = o;
  o = this;
  return x.bind(this, i2);
};
E.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 2;
    this.u = h;
    h = this;
  }
};
E.prototype.d = function() {
  this.f |= 8;
  if (!(1 & this.f)) m(this);
};
E.prototype.dispose = function() {
  this.d();
};
function j(i2, t2) {
  var n2 = new E(i2, t2);
  try {
    n2.c();
  } catch (i3) {
    n2.d();
    throw i3;
  }
  var r2 = n2.d.bind(n2);
  r2[Symbol.dispose] = r2;
  return r2;
}
function C(i2) {
  return function() {
    var t2 = arguments, r2 = this;
    return n(function() {
      return f(function() {
        return i2.apply(r2, [].slice.call(t2));
      });
    });
  };
}
function O() {
  var i2 = r;
  r = [];
  return function() {
    var t2 = r;
    if (r && i2) i2 = i2.concat(r);
    r = i2;
    return t2;
  };
}
var k = function(i2) {
  for (var t2 in i2) {
    var n2 = i2[t2];
    if ("function" == typeof n2) i2[t2] = C(n2);
    else if ("object" == typeof n2 && null !== n2 && !("brand" in n2)) k(n2);
  }
};
function T(i2) {
  return function() {
    var t2, n2, o2 = O();
    try {
      n2 = i2.apply(void 0, [].slice.call(arguments));
    } catch (i3) {
      r = void 0;
      throw i3;
    } finally {
      t2 = o2();
    }
    k(n2);
    n2[Symbol.dispose] = C(function() {
      if (t2) for (var i3 = 0; i3 < t2.length; i3++) t2[i3].dispose();
      t2 = void 0;
    });
    return n2;
  };
}
const signalsCore_module = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Computed: p,
  Effect: E,
  Signal: l,
  action: C,
  batch: n,
  computed: g,
  createModel: T,
  effect: j,
  signal: y,
  untracked: f
}, Symbol.toStringTag, { value: "Module" }));
class ProviderCollection {
  constructor() {
    this.list = [];
  }
  register(provider) {
    this.list.push(provider);
  }
}
const playlist = [];
const currentPlay = y();
const toolbarTool = new ProviderCollection();
const runtime = y();
let random = (bytes) => crypto.getRandomValues(new Uint8Array(bytes));
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1;
  let step = -~(1.6 * mask * defaultSize / alphabet.length);
  return (size = defaultSize) => {
    let id = "";
    while (true) {
      let bytes = getRandom(step);
      let j2 = step | 0;
      while (j2--) {
        id += alphabet[bytes[j2] & mask] || "";
        if (id.length === size) return id;
      }
    }
  };
};
let customAlphabet = (alphabet, size = 21) => customRandom(alphabet, size, random);
const generateKey = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 16);
function getKey(obj) {
  if (obj && typeof obj["__key"] === "string") {
    return obj["__key"];
  }
}
function setKey(obj, key) {
  if (!obj)
    return;
  if (typeof key !== "undefined") {
    obj["__key"] = key;
  } else if (!obj["__key"]) {
    obj["__key"] = generateKey();
  }
  return obj["__key"];
}
function replaceKey(node) {
  if (typeof node !== "object" || node === null) {
    return node;
  }
  if (Array.isArray(node)) {
    const result2 = [];
    for (let key2 = 0; key2 < node.length; key2++) {
      result2[key2] = replaceKey(node[key2]);
    }
    return result2;
  }
  const key = getKey(node);
  if (key) {
    return key;
  }
  const result = {};
  for (const key2 in node) {
    if (Object.prototype.hasOwnProperty.call(node, key2)) {
      result[key2] = replaceKey(node[key2]);
    }
  }
  return result;
}
const getLabel = (obj) => {
  if (obj.lookupId) {
    return obj.lookupId;
  }
  if (obj.spaceName) {
    return obj.spaceName;
  }
  return null;
};
const setLabel = (obj, id) => {
  obj.lookupId = id;
};
const findOne = (world, query) => {
  if (query.indexOf("#")) {
    const [type, label] = query.split("#", 2);
    if (type === "body") {
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        if (getLabel(body) === label) {
          return body;
        }
      }
    } else if (type === "fixture") {
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
          if (getLabel(fixture) === label) {
            return fixture;
          }
        }
      }
    } else if (type === "joint") {
      for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
        if (getLabel(joint) === label) {
          return joint;
        }
      }
    }
  }
  return null;
};
const findAll = (world, query) => {
  const result = [];
  if (query.indexOf("#")) {
    const [type, label] = query.split("#", 2);
    if (type === "body") {
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        if (getLabel(body) === label) {
          result.push(body);
        }
      }
    } else if (type === "fixture") {
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
          if (getLabel(fixture) === label) {
            result.push(fixture);
          }
        }
      }
    } else if (type === "joint") {
      for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
        if (getLabel(joint) === label) {
          result.push(joint);
        }
      }
    }
  }
  return result;
};
function findBody(world, key) {
  if (!world)
    return void 0;
  for (let body = world.getBodyList(); body; body = body.getNext()) {
    if (getKey(body) === key)
      return body;
  }
}
function findFixture(world, key) {
  if (!world)
    return void 0;
  for (let body = world.getBodyList(); body; body = body.getNext()) {
    for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
      if (getKey(fixture) === key)
        return fixture;
    }
  }
}
function findJoint(world, key) {
  if (!world)
    return void 0;
  for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
    if (getKey(joint) === key)
      return joint;
  }
}
class Multiselect {
  constructor(selected = []) {
    this.selected = [];
    this.selected = selected;
  }
}
function isSelected(selection, key) {
  return !!selection?.selected.some((s2) => s2.key === key);
}
function setSelection(context, selection) {
  context.multiselect.value = new Multiselect(selection?.key ? [selection] : []);
}
function emptySelection(context) {
  setSelection(context, null);
}
function removeSelection(context, selection) {
  if (isSelected(context.multiselect.value, selection.key))
    emptySelection(context);
}
function selectBody(body) {
  return { type: "body", key: body };
}
function selectFixture(fixture, body) {
  return { type: "fixture", key: fixture, up: { type: "body", key: body } };
}
function selectJoint(joint) {
  return { type: "joint", key: joint };
}
/**
 * Polymatic v0.3.1
 * @copyright Copyright 2026 Ali Shakiba
 * @license Licensed under the MIT (https://github.com/piqnt/polymatic/blob/main/LICENSE.md)
 */
class EventType {
  static create(name) {
    return new EventType(name);
  }
  constructor(name) {
    this.name = name;
  }
}
const Failure = EventType.create("polymatic:failure");
const INSPECTOR_KEY = "__POLYMATIC_INSPECTOR__";
function inspector() {
  return globalThis[INSPECTOR_KEY];
}
let bubbling = false;
let handled = 0;
function next(children, i2, child) {
  if (children[i2] === child)
    return i2;
  const at = children.indexOf(child);
  return at >= 0 ? at : i2 - 1;
}
class Middleware {
  constructor() {
    this.__handlers = {};
    this.__children = [];
    this.__parent = null;
    this.__pendingActivate = false;
    this.__deactivated = false;
    this._swap = (children) => {
      const current = this.__children;
      const removed = [];
      const added = [];
      for (const child of children) {
        if (current.indexOf(child) === -1) {
          added.push(child);
        }
      }
      for (const child of current) {
        if (children.indexOf(child) === -1) {
          removed.push(child);
        }
      }
      this.__children.length = 0;
      this.__children.push(...children);
      for (const child of removed) {
        child.__deactivate();
        child.__detach();
      }
      if (this.activated) {
        for (const child of added) {
          child.__attach(this);
          child.__activate();
        }
      }
    };
  }
  get activated() {
    return this.__parent ? this.__parent.activated : false;
  }
  /**
   * Add a child middleware.
   *
   * The child's context type is what it needs, and this middleware's context type must provide
   * all of it: fields it declares with the same types. A middleware that uses children with
   * different needs declares all of them in its own context type.
   */
  use(middleware) {
    const index = this.__children.indexOf(middleware);
    if (index !== -1)
      return;
    if (this.activated) {
      middleware.__attach(this);
      middleware.__activate();
    }
    this.__children.push(middleware);
  }
  unuse(middleware) {
    const index = this.__children.indexOf(middleware);
    if (index !== -1) {
      this.__children.splice(index, 1);
      middleware === null || middleware === void 0 ? void 0 : middleware.__deactivate();
      middleware === null || middleware === void 0 ? void 0 : middleware.__detach();
    }
  }
  /**
   * Activation runs in two passes over the subtree: `__attach` links every middleware to its
   * parent, then `__activate` calls activate handlers, parents before children. So an activate
   * handler can rely on the whole subtree being attached. Deactivation mirrors it: `__deactivate`
   * calls deactivate handlers while the subtree is still attached, then `__detach` unlinks it.
   *
   * @internal @hidden
   */
  __attach(parent) {
    if (this.__parent) {
      return;
    }
    this.__parent = parent;
    this.__pendingActivate = true;
    this.__deactivated = false;
    for (let i2 = 0; i2 < this.__children.length; i2++) {
      this.__children[i2].__attach(this);
    }
  }
  /** @internal @hidden */
  __activate() {
    var _a, _b;
    if (!this.__pendingActivate) {
      return;
    }
    this.__pendingActivate = false;
    (_b = (_a = inspector()) === null || _a === void 0 ? void 0 : _a.activate) === null || _b === void 0 ? void 0 : _b.call(_a, this);
    this._handle("activate");
    for (let i2 = 0; i2 < this.__children.length; i2++) {
      const child = this.__children[i2];
      child.__activate();
      i2 = next(this.__children, i2, child);
    }
  }
  /** @internal @hidden */
  __deactivate() {
    var _a, _b;
    if (!this.__parent || this.__deactivated) {
      return;
    }
    this.__deactivated = true;
    if (!this.__pendingActivate) {
      (_b = (_a = inspector()) === null || _a === void 0 ? void 0 : _a.deactivate) === null || _b === void 0 ? void 0 : _b.call(_a, this);
      this._handle("deactivate");
    }
    for (let i2 = 0; i2 < this.__children.length; i2++) {
      const child = this.__children[i2];
      child.__deactivate();
      i2 = next(this.__children, i2, child);
    }
  }
  /** @internal @hidden */
  __detach() {
    if (!this.__parent) {
      return;
    }
    for (let i2 = 0; i2 < this.__children.length; i2++) {
      this.__children[i2].__detach();
    }
    this.__pendingActivate = false;
    this.__deactivated = false;
    this.__parent = null;
  }
  get context() {
    if (this.__parent) {
      return this.__parent.context;
    } else {
      return null;
    }
  }
  /** @hidden @deprecated Set context directly */
  setContext(setter) {
    if (this.__parent) {
      this.__parent.setContext(setter);
    } else {
      console.error("Middleware is not activated");
    }
  }
  /**
   * Add an event handler.
   *
   * If an event handler function returns true, it will stop propagation to any other middlewares.
   *
   * If it throws, or returns a promise that is rejected, the event is still delivered to the other
   * middlewares, and the error goes to `Failure` handlers up the parent chain.
   *
   * A middleware can have up to one handler for each event `type`.
   *
   * `type` is an event type, and the handler receives its payload type, or an event name.
   */
  on(type, handler) {
    const name = typeof type === "string" ? type : type.name;
    if (this.__handlers[name])
      throw Error(`Handler for ${name} already exists`);
    this.__handlers[name] = handler;
  }
  /**
   * This is used internally, calls event handler and passes down event to children.
   */
  _consume(type, ev) {
    const stop = this._handle(type, ev);
    if (stop)
      return true;
    for (let i2 = 0; i2 < this.__children.length; i2++) {
      const child = this.__children[i2];
      const stop2 = child._consume(type, ev);
      if (stop2)
        return true;
      i2 = next(this.__children, i2, child);
    }
    return false;
  }
  /**
   * This is used internally, calls event handler.
   */
  _handle(type, ev) {
    var _a;
    if (!this.activated)
      return;
    const handler = this.__handlers && this.__handlers[type];
    if (handler) {
      if (typeof handler === "function") {
        handled++;
        const inspect2 = inspector();
        const start = (inspect2 === null || inspect2 === void 0 ? void 0 : inspect2.handle) ? performance.now() : 0;
        let result;
        let failed = false;
        let error;
        try {
          result = handler.call(this, ev);
        } catch (e2) {
          failed = true;
          error = e2;
        }
        const stop = result === true;
        (_a = inspect2 === null || inspect2 === void 0 ? void 0 : inspect2.handle) === null || _a === void 0 ? void 0 : _a.call(inspect2, type, ev, this, performance.now() - start, stop);
        if (failed) {
          fail({ error, middleware: this, type, ev });
        } else if (result && typeof result.then === "function") {
          result.then(void 0, (e2) => fail({ error: e2, middleware: this, type, ev }));
        }
        return stop;
      }
    }
    return false;
  }
  /**
   * Send an event to all active middlewares.
   *
   * An event is first bubbled to the runtime through middleware parent chain.
   * Runtime queues events as microtask -- they are asynchronously but in the same animation frame.
   * Events are then recursively passed down to all active middlewares and their children.
   *
   * If an event handler returns true, delivering the event is stopped.
   *
   * `type` is an event type, and `ev` must be its payload type, or an event name.
   */
  emit(type, ...[ev]) {
    var _a, _b;
    if (!this.activated)
      return;
    const name = typeof type === "string" ? type : type.name;
    if (!bubbling)
      (_b = (_a = inspector()) === null || _a === void 0 ? void 0 : _a.emit) === null || _b === void 0 ? void 0 : _b.call(_a, name, ev, this);
    if (this.__parent) {
      const outer = bubbling;
      bubbling = true;
      try {
        this.__parent.emit(name, ev);
      } finally {
        bubbling = outer;
      }
    } else {
      console.error(Error("Not active!"));
    }
  }
  /** @hidden @deprecated */
  static activate(middleware, context) {
    return Runtime.activate(middleware, context);
  }
}
function fail(failure) {
  var _a, _b, _c;
  let stoppedBy = null;
  let m2 = failure.middleware.__parent;
  while (m2 && !stoppedBy) {
    const handler = m2.activated && ((_a = m2.__handlers) === null || _a === void 0 ? void 0 : _a[Failure.name]);
    if (typeof handler === "function") {
      try {
        if (handler.call(m2, failure) === true)
          stoppedBy = m2;
      } catch (e2) {
        report(e2);
      }
    }
    m2 = m2.__parent;
  }
  (_c = (_b = inspector()) === null || _b === void 0 ? void 0 : _b.failure) === null || _c === void 0 ? void 0 : _c.call(_b, failure, stoppedBy);
  if (!stoppedBy)
    report(failure.error);
}
function report(error) {
  const reportError = globalThis.reportError;
  if (typeof reportError === "function")
    reportError(error);
  else
    console.error(error);
}
class Runtime extends Middleware {
  constructor() {
    super(...arguments);
    this.displayName = "Runtime";
    this.__handlers = {};
    this.__children = [];
    this._activated = false;
    this.contextUpdateEmit = () => {
      this.emit("context-change");
    };
    this._microtask = Promise.resolve();
  }
  get activated() {
    return this._activated;
  }
  _activate(context) {
    var _a, _b;
    if (this._activated) {
      return;
    }
    this._context = context;
    this._activated = true;
    for (let i2 = 0; i2 < this.__children.length; i2++) {
      this.__children[i2].__attach(this);
    }
    (_b = (_a = inspector()) === null || _a === void 0 ? void 0 : _a.activate) === null || _b === void 0 ? void 0 : _b.call(_a, this);
    this._handle("activate");
    for (let i2 = 0; i2 < this.__children.length; i2++) {
      const child = this.__children[i2];
      child.__activate();
      i2 = next(this.__children, i2, child);
    }
  }
  _deactivate() {
    var _a, _b;
    if (!this._activated) {
      return;
    }
    (_b = (_a = inspector()) === null || _a === void 0 ? void 0 : _a.deactivate) === null || _b === void 0 ? void 0 : _b.call(_a, this);
    this._handle("deactivate");
    for (let i2 = 0; i2 < this.__children.length; i2++) {
      const child = this.__children[i2];
      child.__deactivate();
      i2 = next(this.__children, i2, child);
    }
    for (let i2 = 0; i2 < this.__children.length; i2++) {
      this.__children[i2].__detach();
    }
    this._activated = false;
  }
  get context() {
    return this._context;
  }
  setContext(setter) {
    if (typeof setter !== "function") {
      console.error("Setter is not a function: ", setter);
      return;
    }
    setter(this.context);
    clearTimeout(this.contextUpdateEmitTimeout);
    this.contextUpdateEmitTimeout = setTimeout(this.contextUpdateEmit);
  }
  emit(type, ...[ev]) {
    var _a, _b;
    const name = typeof type === "string" ? type : type.name;
    if (!bubbling)
      (_b = (_a = inspector()) === null || _a === void 0 ? void 0 : _a.emit) === null || _b === void 0 ? void 0 : _b.call(_a, name, ev, this);
    this._microtask.then(() => this.__dispatch(name, ev));
  }
  /** @internal @hidden delivers a queued event down the tree */
  __dispatch(name, ev) {
    var _a, _b;
    const inspect2 = inspector();
    if (!inspect2) {
      this._consume(name, ev);
      return;
    }
    (_a = inspect2.dispatch) === null || _a === void 0 ? void 0 : _a.call(inspect2, name, ev, this);
    const outer = handled;
    handled = 0;
    try {
      this._consume(name, ev);
    } finally {
      const count = handled;
      handled = outer;
      (_b = inspect2.dispatched) === null || _b === void 0 ? void 0 : _b.call(inspect2, name, ev, count);
    }
  }
  static activate(middleware, context) {
    const manager = new Runtime();
    manager.use(middleware);
    manager._activate(context);
  }
  static deactivate(middleware) {
    if ("_deactivate" in middleware && typeof middleware._deactivate === "function") {
      middleware._deactivate();
      return true;
    }
    const parent = middleware.__parent;
    if (parent && "_deactivate" in parent && typeof parent._deactivate === "function") {
      parent._deactivate();
      return true;
    }
    return false;
  }
}
class Memo {
  constructor() {
    this.memory = [];
  }
  static init(...args) {
    const memo = new Memo();
    if (args.length)
      memo.update(...args);
    return memo;
  }
  /**
   * Returns true if args are updated.
   */
  update(...args) {
    let equal = this.memory.length === args.length;
    for (let i2 = 0; i2 < args.length; i2++) {
      equal = equal && this.memory[i2] === args[i2];
      this.memory[i2] = args[i2];
    }
    this.memory.length = args.length;
    return !equal;
  }
  clear() {
    this.memory.length = 0;
  }
}
function makeMat2d() {
  return { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
}
function identityMat2d(out) {
  out.a = 1;
  out.b = 0;
  out.c = 0;
  out.d = 1;
  out.e = 0;
  out.f = 0;
}
function translateMat2d(m2, x2, y2) {
  m2.e += x2;
  m2.f += y2;
}
function scaleMat2d(m2, x2, y2) {
  m2.a *= x2;
  m2.c *= x2;
  m2.e *= x2;
  m2.b *= y2;
  m2.d *= y2;
  m2.f *= y2;
}
function mulMat2ds(out, A, B) {
  const a2 = A.a * B.a + A.c * B.b;
  const b2 = A.b * B.a + A.d * B.b;
  const c2 = A.a * B.c + A.c * B.d;
  const d2 = A.b * B.c + A.d * B.d;
  const e2 = A.a * B.e + A.c * B.f + A.e;
  const f2 = A.b * B.e + A.d * B.f + A.f;
  out.a = a2;
  out.b = b2;
  out.c = c2;
  out.d = d2;
  out.e = e2;
  out.f = f2;
}
function mulMat2dVec2(out, m2, v2) {
  const x2 = v2.x;
  const y2 = v2.y;
  out.x = m2.a * x2 + m2.c * y2 + m2.e;
  out.y = m2.b * x2 + m2.d * y2 + m2.f;
}
function invMat2dVec2(out, m2, v2) {
  const id = 1 / (m2.a * m2.d - m2.c * m2.b);
  const x2 = v2.x;
  const y2 = v2.y;
  out.x = m2.d * id * x2 - m2.c * id * y2 + (m2.f * m2.c - m2.e * m2.d) * id;
  out.y = m2.a * id * y2 - m2.b * id * x2 + (m2.e * m2.b - m2.f * m2.a) * id;
}
function mat2dToProjection(out, m2, screenWidth, screenHeight) {
  const sx = 2 / screenWidth;
  const sy = -2 / screenHeight;
  const a2 = sx * m2.a;
  const b2 = sy * m2.b;
  const c2 = sx * m2.c;
  const d2 = sy * m2.d;
  const tx = sx * m2.e - 1;
  const ty = sy * m2.f + 1;
  out.fill(0);
  out[0] = a2;
  out[1] = b2;
  out[4] = c2;
  out[5] = d2;
  out[10] = 1;
  out[12] = tx;
  out[13] = ty;
  out[15] = 1;
}
function initTestbedContext() {
  const ctx = {};
  ctx.activity = y("mode:play");
  ctx.activeTool = y(void 0);
  ctx.paused = y(false);
  ctx.editable = y(false);
  ctx.pointerCaptured = false;
  ctx.style = { background: "#111" };
  ctx.camera = {
    x: 0,
    y: 10,
    width: 80,
    height: 60
  };
  ctx.containerElement = y(void 0);
  ctx.canvasElement = y(void 0);
  ctx.gl = y(void 0);
  ctx.worldMatrix = makeMat2d();
  ctx.mouseForce = y(void 0);
  ctx.pixelPerUnit = 1;
  ctx.pointerRadius = 20;
  ctx.showOutline = y(true);
  ctx.showToolbar = y(true);
  ctx.zoomPan = y(true);
  ctx.autoPause = y(false);
  ctx.activeKeys = {};
  ctx.multiselect = y(new Multiselect([]));
  ctx.world = y();
  ctx.simulation = {
    speed: 1,
    hz: 60,
    velocityIterations: 8,
    positionIterations: 3
  };
  ctx.renderConfig = y({
    shapes: true,
    bounds: false,
    mass: false,
    bodyNames: false,
    joints: true,
    contact: false,
    contactNormals: false
  });
  ctx.textOverlay = y(void 0);
  return ctx;
}
class ToolSwitch extends Middleware {
  constructor(name, tool) {
    super();
    this.disposers = [];
    this.handleActivate = () => {
      this.disposers.push(j(() => {
        const activeTool = this.context.activeTool.value;
        const isMe = activeTool?.name === this.name;
        if (isMe && !this.tool.activated) {
          this.use(this.tool);
        } else if (!isMe && this.tool.activated) {
          this.unuse(this.tool);
        }
      }));
    };
    this.handleDeactivate = () => {
      this.disposers.forEach((d2) => d2());
      this.disposers = [];
      this.unuse(this.tool);
    };
    this.name = name;
    this.tool = tool;
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }
}
function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}
function compileProgram(gl, vertexSrc, fragmentSrc) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSrc);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link error: ${info}`);
  }
  return program;
}
function createUnitQuadBuffer(gl) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1,
    -1,
    1,
    -1,
    1,
    1,
    -1,
    -1,
    1,
    1,
    -1,
    1
  ]), gl.STATIC_DRAW);
  return buffer;
}
function createInstancedVAO(gl, quadBuffer, instanceBuffer, instanceAttribSizes) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const stride = instanceAttribSizes.reduce((sum, size) => sum + size, 0) * 4;
  gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
  let offset = 0;
  for (let i2 = 0; i2 < instanceAttribSizes.length; i2++) {
    const location = i2 + 1;
    const size = instanceAttribSizes[i2];
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, stride, offset);
    gl.vertexAttribDivisor(location, 1);
    offset += size * 4;
  }
  gl.bindVertexArray(null);
  return vao;
}
function createShapeProgram(gl, vertexSrc, fragmentSrc) {
  const program = compileProgram(gl, vertexSrc, fragmentSrc);
  return {
    program,
    uProjectionMatrix: gl.getUniformLocation(program, "projectionMatrix"),
    uPixelScale: gl.getUniformLocation(program, "pixelScale")
  };
}
function createPolygonProgram(gl, vertexSrc, fragmentSrc) {
  const program = compileProgram(gl, vertexSrc, fragmentSrc);
  return {
    program,
    uProjectionMatrix: gl.getUniformLocation(program, "projectionMatrix"),
    uPixelScale: gl.getUniformLocation(program, "pixelScale"),
    uVertexTex: gl.getUniformLocation(program, "uVertexTex"),
    uVertexTexWidth: gl.getUniformLocation(program, "uVertexTexWidth")
  };
}
function createDataTexture(gl) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_2D, null);
  return texture;
}
function createLineProgram(gl, vertexSrc, fragmentSrc) {
  const program = compileProgram(gl, vertexSrc, fragmentSrc);
  return {
    program,
    uProjectionMatrix: gl.getUniformLocation(program, "projectionMatrix")
  };
}
const colorCache = /* @__PURE__ */ new Map();
let colorCanvasCtx = null;
function parseColor(css) {
  const cached = colorCache.get(css);
  if (cached)
    return cached;
  if (!colorCanvasCtx) {
    colorCanvasCtx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    colorCanvasCtx.canvas.width = 1;
    colorCanvasCtx.canvas.height = 1;
  }
  colorCanvasCtx.clearRect(0, 0, 1, 1);
  colorCanvasCtx.fillStyle = css;
  colorCanvasCtx.fillRect(0, 0, 1, 1);
  const [r2, g2, b2, a2] = colorCanvasCtx.getImageData(0, 0, 1, 1).data;
  const parsed = [r2 / 255, g2 / 255, b2 / 255, a2 / 255];
  colorCache.set(css, parsed);
  return parsed;
}
var solidCircle_default$1 = "#version 300 es\nuniform mat4 projectionMatrix;\nuniform float pixelScale;\n\nlayout(location = 0) in vec2 v_localPosition;\nlayout(location = 1) in vec4 v_instanceTransform;\nlayout(location = 2) in float v_instanceRadius;\nlayout(location = 3) in vec4 v_instanceColor;\nlayout(location = 4) in vec4 v_instanceFillColor;\n\nout vec2 f_position;\nout float f_radius;\nout float f_thickness;\nout vec4 f_color;\nout vec4 f_fillColor;\n\nvoid main() {\n  f_color = v_instanceColor;\n  f_fillColor = v_instanceFillColor;\n  float radius = v_instanceRadius;\n  \n  float thicknessWorld = 3.0 / pixelScale;\n\n  \n  \n  \n  \n  \n  float scale = radius + thicknessWorld;\n\n  f_position = v_localPosition;\n  f_radius = radius / scale;\n  f_thickness = thicknessWorld / scale;\n\n  float x = v_instanceTransform.x;\n  float y = v_instanceTransform.y;\n  float c = v_instanceTransform.z;\n  float s = v_instanceTransform.w;\n  vec2 p = vec2(scale * v_localPosition.x, scale * v_localPosition.y);\n  p = vec2((c * p.x - s * p.y) + x, (s * p.x + c * p.y) + y);\n  gl_Position = projectionMatrix * vec4(p, 0.0, 1.0);\n}";
var solidCircle_default = "#version 300 es\nprecision highp float;\n\nin vec2 f_position;\nin float f_radius;\nin float f_thickness;\nin vec4 f_color;\nin vec4 f_fillColor;\n\nout vec4 fragColor;\n\nvec4 blend_colors(vec4 front, vec4 back) {\n  vec3 cSrc = front.rgb;\n  float alphaSrc = front.a;\n  vec3 cDst = back.rgb;\n  float alphaDst = back.a;\n  vec3 cOut = cSrc * alphaSrc + cDst * alphaDst * (1.0 - alphaSrc);\n  float alphaOut = alphaSrc + alphaDst * (1.0 - alphaSrc);\n  cOut = cOut / alphaOut;\n  return vec4(cOut, alphaOut);\n}\n\nvoid main() {\n  float radius = f_radius;\n\n  \n  vec2 e = vec2(radius, 0.0);\n  vec2 w = f_position;\n  float we = dot(w, e);\n  vec2 b = w - e * clamp(we / dot(e, e), 0.0, 1.0);\n  float da = length(b);\n\n  \n  float dw = length(w);\n  float dc = abs(dw - radius);\n\n  \n  float d = min(da, dc);\n\n  vec4 borderColor = f_color;\n  vec4 fillColor = f_fillColor;\n\n  vec4 back = vec4(fillColor.rgb, fillColor.a * smoothstep(radius + f_thickness, radius, dw));\n  vec4 front = vec4(borderColor.rgb, smoothstep(f_thickness, 0.0, d));\n\n  fragColor = blend_colors(front, back);\n}";
var solidCapsule_default$1 = "#version 300 es\nuniform mat4 projectionMatrix;\nuniform float pixelScale;\n\nlayout(location = 0) in vec2 v_localPosition;\nlayout(location = 1) in vec4 v_instanceTransform;\nlayout(location = 2) in float v_instanceRadius;\nlayout(location = 3) in float v_instanceLength;\nlayout(location = 4) in vec4 v_instanceColor;\nlayout(location = 5) in vec4 v_instanceFillColor;\n\nout vec2 f_position;\nout float f_length;\nout float f_radius;\nout float f_thickness;\nout vec4 f_color;\nout vec4 f_fillColor;\n\nvoid main() {\n  f_position = v_localPosition;\n  f_color = v_instanceColor;\n  f_fillColor = v_instanceFillColor;\n\n  float radius = v_instanceRadius;\n  float capsuleLength = v_instanceLength;\n  float thicknessWorld = 3.0 / pixelScale;\n\n  \n  \n  float scale = radius + 0.5 * capsuleLength + thicknessWorld;\n\n  \n  f_length = capsuleLength / scale;\n  f_radius = radius / scale;\n  f_thickness = thicknessWorld / scale;\n\n  float x = v_instanceTransform.x;\n  float y = v_instanceTransform.y;\n  float c = v_instanceTransform.z;\n  float s = v_instanceTransform.w;\n  vec2 p = vec2(scale * v_localPosition.x, scale * v_localPosition.y);\n  p = vec2((c * p.x - s * p.y) + x, (s * p.x + c * p.y) + y);\n  gl_Position = projectionMatrix * vec4(p, 0.0, 1.0);\n}";
var solidCapsule_default = "#version 300 es\nprecision highp float;\n\nin vec2 f_position;\nin float f_length;\nin float f_radius;\nin float f_thickness;\nin vec4 f_color;\nin vec4 f_fillColor;\n\nout vec4 fragColor;\n\nvec4 blend_colors(vec4 front, vec4 back) {\n  vec3 cSrc = front.rgb;\n  float alphaSrc = front.a;\n  vec3 cDst = back.rgb;\n  float alphaDst = back.a;\n  vec3 cOut = cSrc * alphaSrc + cDst * alphaDst * (1.0 - alphaSrc);\n  float alphaOut = alphaSrc + alphaDst * (1.0 - alphaSrc);\n  cOut = cOut / alphaOut;\n  return vec4(cOut, alphaOut);\n}\n\nvoid main() {\n  float radius = f_radius;\n\n  vec4 borderColor = f_color;\n  vec4 fillColor = f_fillColor;\n\n  vec2 v1 = vec2(-0.5 * f_length, 0.0);\n  vec2 v2 = vec2(0.5 * f_length, 0.0);\n\n  \n  vec2 e = v2 - v1;\n  vec2 w = f_position - v1;\n  float we = dot(w, e);\n  vec2 b = w - e * clamp(we / dot(e, e), 0.0, 1.0);\n  float dw = length(b);\n\n  \n  float d = min(dw, abs(dw - radius));\n\n  vec4 back = vec4(fillColor.rgb, fillColor.a * smoothstep(radius + f_thickness, radius, dw));\n  vec4 front = vec4(borderColor.rgb, smoothstep(f_thickness, 0.0, d));\n\n  fragColor = blend_colors(front, back);\n}";
var solidPolygon_default$1 = "#version 300 es\nuniform mat4 projectionMatrix;\nuniform float pixelScale;\n\nuniform sampler2D uVertexTex;\n\nuniform highp int uVertexTexWidth;\n\nlayout(location = 0) in vec2 v_localPosition;\nlayout(location = 1) in vec4 v_instanceTransform;\nlayout(location = 2) in float v_instanceVertexOffset;\nlayout(location = 3) in float v_instanceVertexCount;\nlayout(location = 4) in float v_instanceRadius;\nlayout(location = 5) in vec4 v_instanceColor;\nlayout(location = 6) in vec4 v_instanceFillColor;\n\nout vec2 f_position;\nflat out highp int f_vertexOffset;\nflat out highp int f_vertexCount;\nout vec2 f_center;\nout float f_invScale;\nout float f_radius;\nout float f_thickness;\nout vec4 f_color;\nout vec4 f_fillColor;\n\nvec2 fetchVertex(int index) {\n  return texelFetch(uVertexTex, ivec2(index % uVertexTexWidth, index / uVertexTexWidth), 0).rg;\n}\n\nvoid main() {\n  f_position = v_localPosition;\n  f_color = v_instanceColor;\n  f_fillColor = v_instanceFillColor;\n\n  int offset = int(v_instanceVertexOffset + 0.5);\n  int count = int(v_instanceVertexCount + 0.5);\n  f_vertexOffset = offset;\n  f_vertexCount = count;\n\n  \n  vec2 lower = fetchVertex(offset);\n  vec2 upper = lower;\n  for (int i = 1; i < count; ++i) {\n    vec2 v = fetchVertex(offset + i);\n    lower = min(lower, v);\n    upper = max(upper, v);\n  }\n\n  vec2 center = 0.5 * (lower + upper);\n  vec2 width = upper - lower;\n  float maxWidth = max(width.x, width.y);\n  float thicknessWorld = 3.0 / pixelScale;\n\n  \n  \n  float scale = v_instanceRadius + 0.5 * maxWidth + thicknessWorld;\n  float invScale = 1.0 / scale;\n\n  \n  \n  \n  f_center = center;\n  f_invScale = invScale;\n  f_radius = invScale * v_instanceRadius;\n  f_thickness = thicknessWorld * invScale;\n\n  \n  float x = v_instanceTransform.x;\n  float y = v_instanceTransform.y;\n  float c = v_instanceTransform.z;\n  float s = v_instanceTransform.w;\n  vec2 p = vec2(scale * v_localPosition.x, scale * v_localPosition.y) + center;\n  p = vec2((c * p.x - s * p.y) + x, (s * p.x + c * p.y) + y);\n  gl_Position = projectionMatrix * vec4(p, 0.0, 1.0);\n}";
var solidPolygon_default = "#version 300 es\nprecision highp float;\n\nuniform sampler2D uVertexTex;\n\nuniform highp int uVertexTexWidth;\n\nin vec2 f_position;\nflat in highp int f_vertexOffset;\nflat in highp int f_vertexCount;\nin vec2 f_center;\nin float f_invScale;\nin float f_radius;\nin float f_thickness;\nin vec4 f_color;\nin vec4 f_fillColor;\n\nout vec4 fragColor;\n\nvec4 blend_colors(vec4 front, vec4 back) {\n  vec3 cSrc = front.rgb;\n  float alphaSrc = front.a;\n  vec3 cDst = back.rgb;\n  float alphaDst = back.a;\n  vec3 cOut = cSrc * alphaSrc + cDst * alphaDst * (1.0 - alphaSrc);\n  float alphaOut = alphaSrc + alphaDst * (1.0 - alphaSrc);\n  cOut = cOut / alphaOut;\n  return vec4(cOut, alphaOut);\n}\n\nfloat cross2d(in vec2 v1, in vec2 v2) {\n  return v1.x * v2.y - v1.y * v2.x;\n}\n\nvec2 fetchVertex(in int index, in vec2 center, in float invScale) {\n  vec2 raw = texelFetch(uVertexTex, ivec2(index % uVertexTexWidth, index / uVertexTexWidth), 0).rg;\n  return invScale * (raw - center);\n}\n\nfloat sdConvexPolygon(in vec2 p, in int offset, in int count, in vec2 center, in float invScale) {\n  vec2 v0 = fetchVertex(offset, center, invScale);\n  float d = dot(p - v0, p - v0);\n\n  \n  float side = -1.0;\n  vec2 vj = fetchVertex(offset + count - 1, center, invScale);\n  for (int i = 0; i < count; ++i) {\n    vec2 vi = fetchVertex(offset + i, center, invScale);\n    vec2 e = vi - vj;\n    vec2 w = p - vj;\n    float we = dot(w, e);\n    vec2 b = w - e * clamp(we / dot(e, e), 0.0, 1.0);\n    float bb = dot(b, b);\n\n    if (bb < d) {\n      d = bb;\n    }\n\n    \n    \n    float s = cross2d(w, e);\n    if (s >= 0.0) {\n      side = 1.0;\n    }\n\n    vj = vi;\n  }\n\n  return side * sqrt(d);\n}\n\nvoid main() {\n  vec4 borderColor = f_color;\n  vec4 fillColor = f_fillColor;\n\n  float dw = sdConvexPolygon(f_position, f_vertexOffset, f_vertexCount, f_center, f_invScale);\n  float d = abs(dw - f_radius);\n\n  vec4 back = vec4(fillColor.rgb, fillColor.a * smoothstep(f_radius + f_thickness, f_radius, dw));\n  vec4 front = vec4(borderColor.rgb, smoothstep(f_thickness, 0.0, d));\n\n  fragColor = blend_colors(front, back);\n}";
var line_default$1 = "#version 300 es\nuniform mat4 projectionMatrix;\n\nlayout(location = 0) in vec2 v_position;\nlayout(location = 1) in vec4 v_color;\n\nout vec4 f_color;\n\nvoid main() {\n  f_color = v_color;\n  gl_Position = projectionMatrix * vec4(v_position, 0.0, 1.0);\n}";
var line_default = "#version 300 es\nprecision highp float;\n\nin vec4 f_color;\nout vec4 fragColor;\n\nvoid main() {\n  fragColor = f_color;\n}";
class GLLoader extends Middleware {
  constructor() {
    super();
    this.disposers = [];
    this.backgroundMemo = Memo.init();
    this.handleActivate = () => {
      this.disposers.push(j(() => {
        const containerElement = this.context.containerElement?.value;
        if (!containerElement)
          return;
        const canvas = document.createElement("canvas");
        canvas.tabIndex = 1;
        containerElement.appendChild(canvas);
        this.canvas = canvas;
        this.context.canvasElement.value = canvas;
        const gl = canvas.getContext("webgl2", {
          alpha: true,
          antialias: true,
          premultipliedAlpha: false
        });
        if (!gl) {
          throw new Error("WebGL2 is not supported by this browser");
        }
        this.resources = {
          gl,
          quadBuffer: createUnitQuadBuffer(gl),
          circleProgram: createShapeProgram(gl, solidCircle_default$1, solidCircle_default),
          capsuleProgram: createShapeProgram(gl, solidCapsule_default$1, solidCapsule_default),
          polygonProgram: createPolygonProgram(gl, solidPolygon_default$1, solidPolygon_default),
          lineProgram: createLineProgram(gl, line_default$1, line_default),
          projectionMatrix: new Float32Array(16),
          pixelScale: 1
        };
        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        this.resizeObserver = new ResizeObserver(this.handleResize);
        this.resizeObserver.observe(containerElement);
        this.handleResize();
        this.handleUpdateState();
        this.context.gl.value = this.resources;
        this.emit("stage-ready");
        return () => {
          this.resizeObserver.disconnect();
          this.resizeObserver = null;
          this.context.canvasElement.value = null;
          this.context.gl.value = null;
          gl.deleteProgram(this.resources.circleProgram.program);
          gl.deleteProgram(this.resources.capsuleProgram.program);
          gl.deleteProgram(this.resources.polygonProgram.program);
          gl.deleteProgram(this.resources.lineProgram.program);
          gl.deleteBuffer(this.resources.quadBuffer);
          this.resources = null;
          canvas.remove();
          this.canvas = null;
        };
      }));
    };
    this.handleDeactivate = () => {
      this.disposers.forEach((d2) => d2());
      this.disposers = [];
    };
    this.handleResize = () => {
      if (!this.canvas || !this.resources)
        return;
      const containerElement = this.context.containerElement.peek();
      const ratio = window.devicePixelRatio || 1;
      const pixelWidth = Math.max(1, Math.round(containerElement.clientWidth * ratio));
      const pixelHeight = Math.max(1, Math.round(containerElement.clientHeight * ratio));
      if (this.canvas.width !== pixelWidth || this.canvas.height !== pixelHeight) {
        this.canvas.width = pixelWidth;
        this.canvas.height = pixelHeight;
      }
      this.resources.gl.viewport(0, 0, pixelWidth, pixelHeight);
    };
    this.handleUpdateState = () => {
      if (!this.resources)
        return;
      const background = this.context.style.background;
      if (this.backgroundMemo.update(background)) {
        if (background)
          this.canvas.style.backgroundColor = background;
      }
    };
    this.handleFrameBefore = () => {
      this.handleUpdateState();
      if (!this.resources)
        return;
      const m2 = this.context.worldMatrix;
      this.context.pixelPerUnit = Math.max(m2.a, m2.d) || 1;
      this.context.pointerRadius = 20 / this.context.pixelPerUnit;
      this.resources.pixelScale = this.context.pixelPerUnit;
      const gl = this.resources.gl;
      gl.clear(gl.COLOR_BUFFER_BIT);
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on("frame-before", this.handleFrameBefore);
  }
}
class CameraTransform extends Middleware {
  constructor() {
    super();
    this.disposers = [];
    this.viewboxMemo = Memo.init();
    this.panZoom = makeMat2d();
    this.fitMatrix = makeMat2d();
    this.handleActivate = () => {
      this.disposers.push(j(() => {
        const canvas = this.context.canvasElement.value;
        const resources = this.context.gl.value;
        if (!canvas || !resources)
          return;
        this.canvas = canvas;
        this.resizeObserver = new ResizeObserver(this.rescale);
        this.resizeObserver.observe(canvas);
        this.rescale();
        return () => {
          this.resizeObserver.disconnect();
          this.resizeObserver = null;
          this.canvas = null;
        };
      }));
    };
    this.handleDeactivate = () => {
      this.disposers.forEach((d2) => d2());
      this.disposers = [];
    };
    this.handleFrameBefore = () => {
      const camera = this.context.camera;
      if (this.viewboxMemo.update(camera.x, camera.y, camera.width, camera.height)) {
        this.rescale();
      }
    };
    this.rescale = () => {
      if (!this.canvas)
        return;
      const camera = this.context.camera;
      const screenWidth = this.canvas.clientWidth;
      const screenHeight = this.canvas.clientHeight;
      const fitScale = Math.min(screenWidth / camera.width, screenHeight / camera.height) || 1;
      identityMat2d(this.fitMatrix);
      scaleMat2d(this.fitMatrix, fitScale, -fitScale);
      translateMat2d(this.fitMatrix, screenWidth / 2 - camera.x * fitScale, screenHeight / 2 + camera.y * fitScale);
      this.applyTransform();
    };
    this.applyTransform = () => {
      const resources = this.context.gl.peek();
      if (!this.canvas || !resources)
        return;
      mulMat2ds(this.context.worldMatrix, this.panZoom, this.fitMatrix);
      mat2dToProjection(resources.projectionMatrix, this.context.worldMatrix, this.canvas.clientWidth, this.canvas.clientHeight);
    };
    this.handleZoom = ({ center, zoom }) => {
      translateMat2d(this.panZoom, -center.x, -center.y);
      scaleMat2d(this.panZoom, zoom, zoom);
      translateMat2d(this.panZoom, center.x, center.y);
      this.applyTransform();
    };
    this.handlePan = ({ delta }) => {
      translateMat2d(this.panZoom, -delta.x, -delta.y);
      this.applyTransform();
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on("frame-before", this.handleFrameBefore);
    this.on("display-zoom", this.handleZoom);
    this.on("display-pan", this.handlePan);
  }
}
class AutoFocus extends Middleware {
  constructor() {
    super();
    this.disposers = [];
    this.pausedMemo = Memo.init();
    this.handleActivate = () => {
      this.disposers.push(j(() => {
        const canvas = this.context.canvasElement.value;
        if (!canvas)
          return;
        this.canvas = canvas;
        canvas.addEventListener("mousedown", this.focus);
        canvas.addEventListener("touchstart", this.focus);
        return () => {
          canvas.removeEventListener("mousedown", this.focus);
          canvas.removeEventListener("touchstart", this.focus);
          this.canvas = null;
        };
      }));
    };
    this.handleDeactivate = () => {
      this.disposers.forEach((d2) => d2());
      this.disposers = [];
    };
    this.handleFrameBefore = () => {
      const paused = this.context.paused.peek();
      if (this.pausedMemo.update(paused)) {
        if (!paused)
          this.focus();
      }
    };
    this.focus = () => {
      window.focus();
      document.activeElement?.blur?.();
      this.canvas?.focus();
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on("frame-before", this.handleFrameBefore);
  }
}
class ContainerLoader extends Middleware {
  constructor() {
    super();
    this.handleActivate = () => {
      if (document.readyState !== "loading") {
        this.handleDomReady();
      } else {
        document.addEventListener("DOMContentLoaded", this.handleDomReady);
      }
    };
    this.handleDomReady = () => {
      let containerElement = document.getElementById("space");
      if (!containerElement) {
        containerElement = document.createElement("div");
        containerElement.id = "space";
        Object.assign(containerElement.style, {
          position: "absolute",
          top: "0",
          left: "0",
          bottom: "0",
          right: "0",
          width: "100%",
          height: "100%"
        });
        document.body.insertBefore(containerElement, document.body.firstChild);
      }
      this.context.containerElement.value = containerElement;
    };
    this.on("activate", this.handleActivate);
  }
}
const MAX_ELAPSE = 1e3 / 30;
const DEFAULTS = {
  speed: 1,
  hz: 60,
  velocityIterations: 8,
  positionIterations: 3
};
class FrameLoop extends Middleware {
  constructor() {
    super();
    this.lastTime = 0;
    this.timeBuffer = 0;
    this.event = {
      dt: 0,
      now: 0
    };
    this.stepEvent = {
      timeStep: 0,
      velocityIterations: 0,
      positionIterations: 0
    };
    this.handleActivate = () => {
      this.lastTime = performance.now();
      this.requestFrame();
    };
    this.handleFrame = () => {
      if (!this.activated)
        return;
      const now = performance.now();
      const delta = Math.min(now - this.lastTime, MAX_ELAPSE);
      this.lastTime = now;
      this.event.now = now;
      this.event.dt = delta;
      this.emit("frame-before", this.event);
      if (this.context.world?.value && !this.context.paused?.value) {
        const config = this.context.simulation;
        const speed = config?.speed ?? DEFAULTS.speed;
        let hz = config?.hz ?? DEFAULTS.hz;
        if (Math.abs(hz) < 1) {
          hz = 1 / hz;
        }
        const timeStep = 1 / hz;
        this.stepEvent.timeStep = timeStep;
        this.stepEvent.velocityIterations = config?.velocityIterations ?? DEFAULTS.velocityIterations;
        this.stepEvent.positionIterations = config?.positionIterations ?? DEFAULTS.positionIterations;
        this.timeBuffer += delta * 1e-3 * speed;
        while (this.timeBuffer > timeStep) {
          this.timeBuffer -= timeStep;
          this.emit("step-before", this.stepEvent);
          this.emit("step-physics", this.stepEvent);
          this.emit("step-after", this.stepEvent);
        }
      }
      this.emit("frame-update", this.event);
      this.emit("frame-render", this.event);
      this.emit("frame-after", this.event);
      this.requestFrame();
    };
    this.requestFrame = () => {
      if (!this.activated)
        return;
      window.requestAnimationFrame(this.handleFrame);
    };
    this.on("activate", this.handleActivate);
  }
}
class PointerManager extends Middleware {
  constructor() {
    super();
    this.disposers = [];
    this.handleActivate = () => {
      this.disposers.push(j(() => {
        const canvas = this.context.canvasElement.value;
        if (!canvas)
          return;
        canvas.addEventListener("pointerdown", this.handlePointerDown);
        canvas.addEventListener("pointermove", this.handlePointerMove);
        canvas.addEventListener("pointerup", this.handlePointerUp);
        canvas.addEventListener("pointercancel", this.handlePointerCancel);
        return () => {
          canvas.removeEventListener("pointerdown", this.handlePointerDown);
          canvas.removeEventListener("pointermove", this.handlePointerMove);
          canvas.removeEventListener("pointerup", this.handlePointerUp);
          canvas.removeEventListener("pointercancel", this.handlePointerCancel);
        };
      }));
    };
    this.handleDeactivate = () => {
      this.disposers.forEach((d2) => d2());
      this.disposers = [];
    };
    this.handleCapturePointer = () => {
      this.context.pointerCaptured = true;
    };
    this.handleReleasePointer = () => {
      this.context.pointerCaptured = false;
    };
    this.pointerStart = { x: 0, y: 0 };
    this.pointerLast = { x: 0, y: 0 };
    this.pointerDragged = false;
    this.pointerDown = false;
    this.toWorldPoint = (raw) => {
      const canvas = this.context.canvasElement.value;
      const rect = canvas.getBoundingClientRect();
      const point = { x: raw.clientX - rect.left, y: raw.clientY - rect.top };
      invMat2dVec2(point, this.context.worldMatrix, point);
      return point;
    };
    this.handlePointerDown = (raw) => {
      const point = this.toWorldPoint(raw);
      this.emit("pointer-down", { point, raw });
      this.pointerStart.x = point.x;
      this.pointerStart.y = point.y;
      this.pointerLast.x = point.x;
      this.pointerLast.y = point.y;
      this.pointerDown = true;
      this.pointerDragged = false;
    };
    this.handlePointerMove = (raw) => {
      const point = this.toWorldPoint(raw);
      this.emit("pointer-move", { point, raw });
      if (!this.pointerDown)
        return;
      const move = {
        x: point.x - this.pointerStart.x,
        y: point.y - this.pointerStart.y
      };
      const delta = {
        x: point.x - this.pointerLast.x,
        y: point.y - this.pointerLast.y
      };
      if (this.pointerDragged) {
        this.pointerLast.x = point.x;
        this.pointerLast.y = point.y;
        this.emit("pointer-drag-move", {
          point,
          raw,
          delta,
          move
        });
      } else if (move.x !== 0 || move.y !== 0) {
        this.pointerDragged = true;
        this.emit("pointer-drag-start", { point, raw });
      }
    };
    this.handlePointerUp = (raw) => {
      const point = this.toWorldPoint(raw);
      this.emit("pointer-up", { point, raw });
      if (!this.pointerDown)
        return;
      this.pointerDown = false;
      const move = {
        x: point.x - this.pointerStart.x,
        y: point.y - this.pointerStart.y
      };
      const delta = {
        x: point.x - this.pointerLast.x,
        y: point.y - this.pointerLast.y
      };
      this.pointerLast.x = point.x;
      this.pointerLast.y = point.y;
      if (this.pointerDragged) {
        this.emit("pointer-drag-end", {
          point,
          raw,
          delta,
          move
        });
      } else {
        this.emit("pointer-click", { point, raw });
      }
      this.emit("release-pointer");
    };
    this.handlePointerCancel = (raw) => {
      this.emit("pointer-cancel", { raw });
      if (!this.pointerDown)
        return;
      this.pointerDown = false;
      if (this.pointerDragged) {
        this.emit("pointer-drag-cancel");
      }
      this.emit("release-pointer");
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on("capture-pointer", this.handleCapturePointer);
    this.on("release-pointer", this.handleReleasePointer);
  }
}
class KeyboardManager extends Middleware {
  constructor() {
    super();
    this.handleActivate = () => {
      window.addEventListener("keydown", this.handleKeydown);
      window.addEventListener("keyup", this.handleKeyup);
      window.addEventListener("keypress", this.handleKeypress);
    };
    this.handleDeactivate = () => {
      window.removeEventListener("keydown", this.handleKeydown);
      window.removeEventListener("keyup", this.handleKeyup);
      window.removeEventListener("keypress", this.handleKeypress);
    };
    this.downKeys = {};
    this.handleKeydown = (ev) => {
      this.downKeys[ev.keyCode] = true;
      this.updateActiveKeys(ev.keyCode, true);
      this.emit("keydown", ev);
    };
    this.handleKeyup = (ev) => {
      this.downKeys[ev.keyCode] = false;
      this.updateActiveKeys(ev.keyCode, false);
      this.emit("keyup", ev);
    };
    this.handleKeypress = (ev) => {
      this.emit("keypress", ev);
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }
  // `left`/`right`/`up`/`down` (arrows or WASD), `fire` (space or enter), and characters
  updateActiveKeys(keyCode, down) {
    const activeKeys = this.context.activeKeys;
    const downKeys = this.downKeys;
    const char = String.fromCharCode(keyCode);
    if (/[A-Z0-9]/.test(char)) {
      activeKeys[char] = down;
    }
    activeKeys.right = downKeys[39] || activeKeys["D"];
    activeKeys.left = downKeys[37] || activeKeys["A"];
    activeKeys.up = downKeys[38] || activeKeys["W"];
    activeKeys.down = downKeys[40] || activeKeys["S"];
    activeKeys.fire = downKeys[32] || downKeys[13];
  }
}
const IDLE_TIMEOUT = 15e3;
class AutoPause extends Middleware {
  constructor() {
    super();
    this.disposeEffect = null;
    this.handleActivate = () => {
      window.addEventListener("pointerdown", this.handleInteraction);
      window.addEventListener("pointermove", this.handleInteraction);
      window.addEventListener("keydown", this.handleInteraction);
      window.addEventListener("wheel", this.handleInteraction, { passive: true });
      window.addEventListener("touchstart", this.handleInteraction, { passive: true });
      this.disposeEffect = j(() => {
        if (this.context.autoPause?.value) {
          this.resetIdleTimeout();
        } else {
          clearTimeout(this.idleTimeout);
        }
      });
    };
    this.handleDeactivate = () => {
      window.removeEventListener("pointerdown", this.handleInteraction);
      window.removeEventListener("pointermove", this.handleInteraction);
      window.removeEventListener("keydown", this.handleInteraction);
      window.removeEventListener("wheel", this.handleInteraction);
      window.removeEventListener("touchstart", this.handleInteraction);
      this.disposeEffect?.();
      this.disposeEffect = null;
      clearTimeout(this.idleTimeout);
    };
    this.handleInteraction = () => {
      if (this.context.autoPause?.peek())
        this.resetIdleTimeout();
    };
    this.handleIdleTimeout = () => {
      if (!this.context.autoPause?.peek())
        return;
      this.context.paused.value = true;
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }
  resetIdleTimeout() {
    clearTimeout(this.idleTimeout);
    this.idleTimeout = setTimeout(this.handleIdleTimeout, IDLE_TIMEOUT);
  }
}
const noxf = { p: { x: 0, y: 0 }, q: { c: 1, s: 0 } };
const transformVec2 = (out, xf, v2) => {
  const x2 = xf.q.c * v2.x - xf.q.s * v2.y + xf.p.x;
  const y2 = xf.q.s * v2.x + xf.q.c * v2.y + xf.p.y;
  out.x = x2;
  out.y = y2;
};
const temp1 = { x: 0, y: 0 };
const temp2 = { x: 0, y: 0 };
const POLYGON_VERTEX_TEX_WIDTH = 1024;
const dimmedCache = /* @__PURE__ */ new Map();
function fillColorOf(color, fill) {
  if (fill)
    return parseColor(fill);
  let dimmed = dimmedCache.get(color);
  if (!dimmed) {
    const [r2, g2, b2, a2] = parseColor(color);
    dimmed = [0.6 * r2, 0.6 * g2, 0.6 * b2, 0.6 * a2];
    dimmedCache.set(color, dimmed);
  }
  return dimmed;
}
class GLDraw extends Middleware {
  constructor() {
    super();
    this.disposers = [];
    this.resources = null;
    this.circleVAO = null;
    this.circleBuffer = null;
    this.circleCapacity = 0;
    this.circleData = [];
    this.capsuleVAO = null;
    this.capsuleBuffer = null;
    this.capsuleCapacity = 0;
    this.capsuleData = [];
    this.polygonVAO = null;
    this.polygonBuffer = null;
    this.polygonCapacity = 0;
    this.polygonData = [];
    this.polygonVertexTexture = null;
    this.polygonVertexTexHeight = 0;
    this.polygonVertexData = [];
    this.handleActivate = () => {
      this.disposers.push(j(() => {
        const resources = this.context.gl.value;
        if (!resources)
          return;
        const gl = resources.gl;
        this.resources = resources;
        this.circleBuffer = gl.createBuffer();
        this.circleVAO = createInstancedVAO(gl, resources.quadBuffer, this.circleBuffer, [4, 1, 4, 4]);
        this.capsuleBuffer = gl.createBuffer();
        this.capsuleVAO = createInstancedVAO(gl, resources.quadBuffer, this.capsuleBuffer, [4, 1, 1, 4, 4]);
        this.polygonBuffer = gl.createBuffer();
        this.polygonVAO = createInstancedVAO(gl, resources.quadBuffer, this.polygonBuffer, [4, 1, 1, 1, 4, 4]);
        this.polygonVertexTexture = createDataTexture(gl);
        return () => {
          gl.deleteVertexArray(this.circleVAO);
          gl.deleteBuffer(this.circleBuffer);
          gl.deleteVertexArray(this.capsuleVAO);
          gl.deleteBuffer(this.capsuleBuffer);
          gl.deleteVertexArray(this.polygonVAO);
          gl.deleteBuffer(this.polygonBuffer);
          gl.deleteTexture(this.polygonVertexTexture);
          this.circleVAO = this.capsuleVAO = this.polygonVAO = null;
          this.circleBuffer = this.capsuleBuffer = this.polygonBuffer = null;
          this.circleCapacity = this.capsuleCapacity = this.polygonCapacity = 0;
          this.polygonVertexTexture = null;
          this.polygonVertexTexHeight = 0;
          this.resources = null;
        };
      }));
    };
    this.handleDeactivate = () => {
      this.disposers.forEach((d2) => d2());
      this.disposers = [];
    };
    this.handleFrameBefore = () => {
      this.circleData.length = 0;
      this.capsuleData.length = 0;
      this.polygonData.length = 0;
      this.polygonVertexData.length = 0;
    };
    this.handleFrameRender = () => {
      if (!this.resources)
        return;
      this.uploadAndDraw(this.resources.circleProgram, this.circleVAO, this.circleBuffer, this.circleData, 13, () => this.circleCapacity, (n2) => this.circleCapacity = n2);
      this.uploadAndDraw(this.resources.capsuleProgram, this.capsuleVAO, this.capsuleBuffer, this.capsuleData, 14, () => this.capsuleCapacity, (n2) => this.capsuleCapacity = n2);
      this.uploadPolygonVertexTexture();
      this.uploadAndDraw(this.resources.polygonProgram, this.polygonVAO, this.polygonBuffer, this.polygonData, 15, () => this.polygonCapacity, (n2) => this.polygonCapacity = n2, () => {
        const gl = this.resources.gl;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.polygonVertexTexture);
        gl.uniform1i(this.resources.polygonProgram.uVertexTex, 0);
        gl.uniform1i(this.resources.polygonProgram.uVertexTexWidth, POLYGON_VERTEX_TEX_WIDTH);
      });
    };
    this.drawCircle = (p2, r2, color, xf = noxf, fill) => {
      transformVec2(temp1, xf, p2);
      const [cr, cg, cb, ca] = parseColor(color);
      const [fr, fg, fb, fa] = fillColorOf(color, fill);
      this.circleData.push(temp1.x, temp1.y, xf.q.c, xf.q.s, r2, cr, cg, cb, ca, fr, fg, fb, fa);
    };
    this.drawPoint = this.drawCircle;
    this.drawScreenPoint = (p2, pixelSize, color, xf = noxf) => {
      const pixelScale = this.resources?.pixelScale || 1;
      this.drawCircle(p2, pixelSize / pixelScale, color, xf);
    };
    this.drawCapsule = (a2, b2, r2, color, xf = noxf, fill) => {
      this.pushCapsule(xf, a2, b2, r2, color, fill);
    };
    this.drawEdge = (a2, b2, color, xf = noxf) => {
      this.pushCapsule(xf, a2, b2, 0, color);
    };
    this.drawSegment = this.drawEdge;
    this.drawPolygon = (points, color, xf = noxf, fill) => {
      this.pushPolygon(xf, points, 0, color, fill);
    };
    this.drawRoundedPolygon = (points, count, r2, color, xf = noxf, fill) => {
      this.pushPolygon(xf, points.slice(0, count), r2, color, fill);
    };
    this.drawChain = (points, color, xf = noxf) => {
      for (let i2 = 0; i2 < points.length - 1; i2++) {
        this.pushCapsule(xf, points[i2], points[i2 + 1], 0, color);
      }
    };
    this.drawAABB = (aabb, color, xf = noxf) => {
      const { lowerBound: lo, upperBound: hi } = aabb;
      this.pushPolygon(xf, [lo, { x: hi.x, y: lo.y }, hi, { x: lo.x, y: hi.y }], 0, color);
    };
    this.drawHollowPolygon = (points, color, xf = noxf) => {
      let prev = points[points.length - 1];
      for (const p2 of points) {
        this.pushCapsule(xf, prev, p2, 0, color);
        prev = p2;
      }
    };
    this.drawHollowAABB = (aabb, color, xf = noxf) => {
      const { lowerBound: lo, upperBound: hi } = aabb;
      this.drawHollowPolygon([lo, { x: hi.x, y: lo.y }, hi, { x: lo.x, y: hi.y }], color, xf);
    };
    this.drawHollowCircle = (center, radius, color, xf = noxf, segments = 24) => {
      const points = [];
      for (let i2 = 0; i2 < segments; i2++) {
        const a2 = i2 / segments * Math.PI * 2;
        points.push({ x: center.x + radius * Math.cos(a2), y: center.y + radius * Math.sin(a2) });
      }
      this.drawHollowPolygon(points, color, xf);
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on("frame-before", this.handleFrameBefore);
    this.on("frame-render", this.handleFrameRender);
  }
  // Uploads this frame's flat vertex list into polygonVertexTexture, growing its height (in
  // POLYGON_VERTEX_TEX_WIDTH-wide rows) only when the existing allocation is too small - mirrors
  // uploadAndDraw's grow-only buffer capacity pattern below.
  uploadPolygonVertexTexture() {
    const vertexCount = this.polygonVertexData.length / 2;
    if (vertexCount === 0)
      return;
    const gl = this.resources.gl;
    const width = POLYGON_VERTEX_TEX_WIDTH;
    const height = Math.ceil(vertexCount / width);
    const rowData = new Float32Array(width * height * 2);
    rowData.set(this.polygonVertexData);
    gl.bindTexture(gl.TEXTURE_2D, this.polygonVertexTexture);
    if (height > this.polygonVertexTexHeight) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG32F, width, height, 0, gl.RG, gl.FLOAT, rowData);
      this.polygonVertexTexHeight = height;
    } else {
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, width, height, gl.RG, gl.FLOAT, rowData);
    }
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
  pushCapsule(xf, a2, b2, radius, color, fill) {
    const mx = (a2.x + b2.x) * 0.5;
    const my = (a2.y + b2.y) * 0.5;
    const dx = b2.x - a2.x;
    const dy = b2.y - a2.y;
    const length = Math.hypot(dx, dy);
    const lc = length > 0 ? dx / length : 1;
    const ls = length > 0 ? dy / length : 0;
    const bc = xf.q.c;
    const bs = xf.q.s;
    const worldC = bc * lc - bs * ls;
    const worldS = bs * lc + bc * ls;
    temp1.x = mx;
    temp1.y = my;
    transformVec2(temp2, xf, temp1);
    const [cr, cg, cb, ca] = parseColor(color);
    const [fr, fg, fb, fa] = fillColorOf(color, fill);
    this.capsuleData.push(temp2.x, temp2.y, worldC, worldS, radius, length, cr, cg, cb, ca, fr, fg, fb, fa);
  }
  pushPolygon(xf, points, radius, color, fill) {
    const offset = this.polygonVertexData.length / 2;
    for (let i2 = 0; i2 < points.length; i2++) {
      this.polygonVertexData.push(points[i2].x, points[i2].y);
    }
    const [cr, cg, cb, ca] = parseColor(color);
    const [fr, fg, fb, fa] = fillColorOf(color, fill);
    this.polygonData.push(xf.p.x, xf.p.y, xf.q.c, xf.q.s, offset, points.length, radius, cr, cg, cb, ca, fr, fg, fb, fa);
  }
  uploadAndDraw(shapeProgram, vao, buffer, data, floatsPerInstance, getCapacity, setCapacity, bindExtra) {
    const instanceCount = data.length / floatsPerInstance;
    if (instanceCount === 0)
      return;
    const gl = this.resources.gl;
    const array = new Float32Array(data);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    if (array.length > getCapacity()) {
      gl.bufferData(gl.ARRAY_BUFFER, array, gl.DYNAMIC_DRAW);
      setCapacity(array.length);
    } else {
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, array);
    }
    gl.useProgram(shapeProgram.program);
    gl.uniformMatrix4fv(shapeProgram.uProjectionMatrix, false, this.resources.projectionMatrix);
    gl.uniform1f(shapeProgram.uPixelScale, this.resources.pixelScale);
    bindExtra?.();
    gl.bindVertexArray(vao);
    gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, instanceCount);
    gl.bindVertexArray(null);
    gl.useProgram(null);
  }
}
class DrawWorld extends Middleware {
  constructor() {
    super();
    this.draw = new GLDraw();
    this.handleFrameRender = () => {
      const world = this.context.world.value;
      if (!world)
        return;
      if (!this.context.renderConfig.value.shapes)
        return;
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        this.drawBody(body);
      }
    };
    this.use(this.draw);
    this.on("frame-update", this.handleFrameRender);
  }
  drawBody(body) {
    const xf = body.getTransform();
    for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
      const styles = [getStyle(fixture.getShape()), getStyle(fixture), getStyle(body)];
      const color = styles.find((s2) => s2?.stroke)?.stroke ?? shapeColor(body, fixture);
      const fill = styles.find((s2) => s2?.fill)?.fill ?? DEFAULT_FILL;
      const type = fixture.getType();
      if (type === "circle") {
        const shape = fixture.getShape();
        this.draw.drawCircle(shape.m_p, shape.m_radius, color, xf, fill);
      } else if (type === "polygon") {
        const shape = fixture.getShape();
        this.draw.drawPolygon(shape.m_vertices.slice(0, shape.m_count), color, xf, fill);
      } else if (type === "edge") {
        const shape = fixture.getShape();
        this.draw.drawEdge(shape.m_vertex1, shape.m_vertex2, color, xf);
      } else if (type === "chain") {
        const shape = fixture.getShape();
        const vertices = shape.m_vertices;
        const count = shape.m_count;
        for (let i2 = 1; i2 < count; i2++) {
          this.draw.drawEdge(vertices[i2 - 1], vertices[i2], color, xf);
        }
        if (shape.isLoop() && count > 1) {
          this.draw.drawEdge(vertices[count - 1], vertices[0], color, xf);
        }
      }
    }
  }
}
const DEFAULT_FILL = "rgba(255,255,255,0.1)";
const hasStyle = (value) => typeof value === "object" && value !== null && ("stroke" in value || "fill" in value);
function getStyle(obj) {
  if (hasStyle(obj["render"]))
    return obj["render"];
  if (hasStyle(obj["style"]))
    return obj["style"];
}
function shapeColor(body, fixture) {
  if (fixture.isSensor()) {
    return "wheat";
  }
  if (body.isDynamic()) {
    return "rgba(255,255,255,0.9)";
  }
  if (body.isKinematic()) {
    return "rgba(255,255,255,0.8)";
  }
  return "rgba(255,255,255,0.7)";
}
class DrawBounds extends Middleware {
  constructor() {
    super();
    this.draw = new GLDraw();
    this.handleFrameRender = () => {
      const world = this.context.world.value;
      if (!world)
        return;
      if (!this.context.renderConfig.value.bounds)
        return;
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
          const children = fixture.getShape().getChildCount();
          for (let child = 0; child < children; child++) {
            this.draw.drawHollowAABB(fixture.getAABB(child), "gold");
          }
        }
      }
    };
    this.use(this.draw);
    this.on("frame-update", this.handleFrameRender);
  }
}
class TextOverlay extends Middleware {
  constructor() {
    super();
    this.disposers = [];
    this.canvas = null;
    this.resizeObserver = null;
    this.handleActivate = () => {
      this.disposers.push(j(() => {
        const containerElement = this.context.containerElement?.value;
        if (!containerElement)
          return;
        const canvas = document.createElement("canvas");
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.background = "transparent";
        canvas.style.pointerEvents = "none";
        containerElement.appendChild(canvas);
        this.canvas = canvas;
        this.context.textOverlay.value = canvas.getContext("2d");
        this.resizeObserver = new ResizeObserver(this.handleResize);
        this.resizeObserver.observe(containerElement);
        this.handleResize();
        return () => {
          this.resizeObserver.disconnect();
          this.resizeObserver = null;
          this.context.textOverlay.value = void 0;
          canvas.remove();
          this.canvas = null;
        };
      }));
    };
    this.handleDeactivate = () => {
      this.disposers.forEach((d2) => d2());
      this.disposers = [];
    };
    this.handleResize = () => {
      if (!this.canvas)
        return;
      const containerElement = this.context.containerElement.peek();
      const ratio = window.devicePixelRatio || 1;
      this.canvas.width = Math.max(1, Math.round(containerElement.clientWidth * ratio));
      this.canvas.height = Math.max(1, Math.round(containerElement.clientHeight * ratio));
    };
    this.handleFrameBefore = () => {
      const ctx = this.context.textOverlay.peek();
      if (!ctx)
        return;
      const ratio = window.devicePixelRatio || 1;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on("frame-before", this.handleFrameBefore);
  }
}
const screenPoint = { x: 0, y: 0 };
function drawWorldString(context, p2, text, color, align = "left") {
  const ctx = context.textOverlay.value;
  if (!ctx)
    return;
  mulMat2dVec2(screenPoint, context.worldMatrix, p2);
  ctx.font = "12px monospace";
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, screenPoint.x, screenPoint.y);
}
class DrawBodyInfo extends Middleware {
  constructor() {
    super();
    this.draw = new GLDraw();
    this.handleFrameRender = () => {
      const world = this.context.world.value;
      if (!world)
        return;
      const renderConfig = this.context.renderConfig.value;
      if (!renderConfig.bodyNames && !renderConfig.mass)
        return;
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        if (renderConfig.bodyNames) {
          const label = getLabel(body);
          if (label)
            this.drawBodyName(body, label);
        }
        if (renderConfig.mass && body.isDynamic()) {
          this.drawMass(body);
        }
      }
    };
    this.use(this.draw);
    this.on("frame-update", this.handleFrameRender);
  }
  drawBodyName(body, label) {
    const { c: c2, s: s2 } = body.getTransform().q;
    const center = body.getWorldCenter();
    const p2 = { x: center.x + c2 * 0.1 - s2 * 0.1, y: center.y + s2 * 0.1 + c2 * 0.1 };
    drawWorldString(this.context, p2, label, "blueviolet");
  }
  drawMass(body) {
    const { c: c2, s: s2 } = body.getTransform().q;
    const center = body.getWorldCenter();
    this.draw.drawEdge(center, { x: center.x + c2, y: center.y + s2 }, "red");
    this.draw.drawEdge(center, { x: center.x - s2, y: center.y + c2 }, "green");
    const p2 = { x: center.x + c2 * 0.1 - s2 * 0.1, y: center.y + s2 * 0.1 + c2 * 0.1 };
    drawWorldString(this.context, p2, `  ${body.getMass().toFixed(2)}`, "white");
  }
}
const DEFAULT_COLOR = "rgba(255,255,255,0.9)";
class DrawJoints extends Middleware {
  constructor() {
    super();
    this.draw = new GLDraw();
    this.handleFrameRender = () => {
      const world = this.context.world.value;
      if (!world)
        return;
      if (!this.context.renderConfig.value.joints)
        return;
      for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
        this.drawJoint(joint);
      }
    };
    this.use(this.draw);
    this.on("frame-update", this.handleFrameRender);
  }
  drawJoint(joint) {
    const color = getStyle(joint)?.stroke || DEFAULT_COLOR;
    const pA = joint.getAnchorA();
    const pB = joint.getAnchorB();
    switch (joint.getType()) {
      case "pulley-joint": {
        const pj = joint;
        const gA = pj.getGroundAnchorA();
        const gB = pj.getGroundAnchorB();
        this.draw.drawEdge(pA, gA, color);
        this.draw.drawEdge(gA, gB, color);
        this.draw.drawEdge(gB, pB, color);
        break;
      }
      case "prismatic-joint":
      case "wheel-joint": {
        const axis = joint.getLocalAxisA();
        const xfA = joint.getBodyA().getTransform();
        const end = Transform.mulVec2(xfA, {
          x: joint["m_localAnchorA"].x + axis.x,
          y: joint["m_localAnchorA"].y + axis.y
        });
        this.draw.drawEdge(pA, end, "gray");
        this.draw.drawEdge(pA, pB, color);
        break;
      }
      case "mouse-joint": {
        const target = joint.getTarget();
        this.draw.drawEdge(target, pB, color);
        this.draw.drawScreenPoint(target, 4, color);
        break;
      }
      case "revolute-joint": {
        this.draw.drawEdge(pA, pB, color);
        this.draw.drawScreenPoint(pB, 6, color);
        break;
      }
      default:
        this.draw.drawEdge(pA, pB, color);
        break;
    }
  }
}
const rotate = (q, v2) => Rot.mulVec2(q, v2);
const CONTACT_NORMAL_LENGTH = 0.3;
class DrawContacts extends Middleware {
  constructor() {
    super();
    this.draw = new GLDraw();
    this.manifold = new WorldManifold();
    this.handleFrameRender = () => {
      const world = this.context.world.value;
      if (!world)
        return;
      const renderConfig = this.context.renderConfig.value;
      if (!renderConfig.contact)
        return;
      for (let contact = world.getContactList(); contact; contact = contact.getNext()) {
        if (!contact.isTouching())
          continue;
        const manifold = contact.getWorldManifold(this.manifold);
        if (!manifold)
          continue;
        const normal = manifold.normal;
        for (let i2 = 0; i2 < manifold.pointCount; i2++) {
          const point = manifold.points[i2];
          this.draw.drawScreenPoint(point, 5, "blue");
          if (renderConfig.contactNormals) {
            const p2 = {
              x: point.x + normal.x * CONTACT_NORMAL_LENGTH,
              y: point.y + normal.y * CONTACT_NORMAL_LENGTH
            };
            this.draw.drawEdge(point, p2, "dimgray");
          }
        }
      }
    };
    this.use(this.draw);
    this.on("frame-update", this.handleFrameRender);
  }
}
class WorldStep extends Middleware {
  constructor() {
    super();
    this.handleStep = (ev) => {
      const world = this.context.world.value;
      if (!world)
        return;
      try {
        world.step(ev.timeStep, ev.velocityIterations, ev.positionIterations);
      } catch (error) {
        console.error(error);
        this.context.paused.value = true;
      }
    };
    this.on("step-physics", this.handleStep);
  }
}
class WorldKeys extends Middleware {
  constructor() {
    super();
    this.handleActivate = () => {
      this.dispose = j(() => {
        const world = this.context.world.value;
        if (!world)
          return;
        for (let body = world.getBodyList(); body; body = body.getNext()) {
          setKey(body);
          for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
            setKey(fixture);
          }
        }
        for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
          setKey(joint);
        }
        world.on("add-body", this.keyOne);
        world.on("add-fixture", this.keyOne);
        world.on("add-joint", this.keyOne);
        return () => {
          world.off("add-body", this.keyOne);
          world.off("add-fixture", this.keyOne);
          world.off("add-joint", this.keyOne);
        };
      });
    };
    this.handleDeactivate = () => {
      this.dispose?.();
      this.dispose = void 0;
    };
    this.keyOne = (obj) => {
      setKey(obj);
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }
}
const PULL_FORCE = 1e3;
class PullTool extends Middleware {
  constructor() {
    super();
    this.body = null;
    this.ground = null;
    this.joint = null;
    this.handleDeactivate = () => {
      this.destroyJoint();
      this.body = null;
    };
    this.handlePointerDown = (ev) => {
      const world = this.context.world.value;
      if (!world)
        return;
      if (this.context.mouseForce.value === 0)
        return;
      const match = this.context.worldQuery.testPoint(ev.point, (m2) => m2.worldBody.isDynamic());
      if (!match)
        return;
      const hit = match.worldBody;
      if (hit !== this.body) {
        this.destroyJoint();
      }
      this.body = hit;
      this.ground = world.createBody();
      this.joint = new MouseJoint({ maxForce: PULL_FORCE }, this.ground, this.body, ev.point);
      world.createJoint(this.joint);
      this.emit("capture-pointer");
    };
    this.handlePointerMove = (ev) => {
      if (!this.joint)
        return;
      this.joint.setTarget(ev.point);
    };
    this.handlePointerUp = () => {
      if (!this.joint)
        return;
      this.body = null;
      this.destroyJoint();
    };
    this.handlePointerCancel = () => {
      if (!this.joint)
        return;
      this.body = null;
      this.destroyJoint();
    };
    this.destroyJoint = () => {
      const world = this.context.world.value;
      if (world && this.joint)
        world.destroyJoint(this.joint);
      if (world && this.ground)
        world.destroyBody(this.ground);
      this.joint = null;
      this.ground = null;
    };
    this.on("deactivate", this.handleDeactivate);
    this.on("pointer-down", this.handlePointerDown);
    this.on("pointer-move", this.handlePointerMove);
    this.on("pointer-up", this.handlePointerUp);
    this.on("pointer-cancel", this.handlePointerCancel);
  }
}
toolbarTool.register({
  name: "pull",
  activate: (context) => {
    context.activity.value = "mode:play";
    context.paused.value = false;
    context.editable.value = false;
    context.activeTool.value = { name: "interact-pull" };
  }
});
class ImpulseTool extends Middleware {
  constructor() {
    super();
    this.body = null;
    this.pointer = { x: 0, y: 0 };
    this.draw = new GLDraw();
    this.handleDeactivate = () => {
      this.body = null;
    };
    this.handlePointerDown = (ev) => {
      if (this.body)
        return;
      const mouseForce = this.context.mouseForce.value;
      if (mouseForce === 0)
        return;
      const match = this.context.worldQuery.testPoint(ev.point, (m2) => m2.worldBody.isDynamic());
      if (!match)
        return;
      this.body = match.worldBody;
      this.pointer.x = ev.point.x;
      this.pointer.y = ev.point.y;
      this.emit("capture-pointer");
    };
    this.handlePointerMove = (ev) => {
      if (!this.body)
        return;
      this.pointer.x = ev.point.x;
      this.pointer.y = ev.point.y;
    };
    this.handlePointerUp = (ev) => {
      if (!this.body)
        return;
      let mouseForce = this.context.mouseForce.value;
      if (mouseForce === 0)
        return;
      if (typeof mouseForce !== "number") {
        mouseForce = -1e3;
      }
      const pos = this.body.getPosition();
      const force = {
        x: (ev.point.x - pos.x) * mouseForce,
        y: (ev.point.y - pos.y) * mouseForce
      };
      this.body.applyForceToCenter(force, true);
      this.body = null;
    };
    this.handlePointerCancel = () => {
      this.body = null;
    };
    this.handleFrameUpdate = () => {
      if (!this.body)
        return;
      const pos = this.body.getPosition();
      this.draw.drawSegment(pos, this.pointer, "rgba(255,255,255,0.5)");
    };
    this.use(this.draw);
    this.on("deactivate", this.handleDeactivate);
    this.on("pointer-down", this.handlePointerDown);
    this.on("pointer-move", this.handlePointerMove);
    this.on("pointer-up", this.handlePointerUp);
    this.on("pointer-cancel", this.handlePointerCancel);
    this.on("frame-update", this.handleFrameUpdate);
  }
}
toolbarTool.register({
  name: "impulse",
  activate: (context) => {
    context.activity.value = "mode:play";
    context.paused.value = false;
    context.editable.value = false;
    context.activeTool.value = { name: "interact-impulse" };
  }
});
class InspectTool extends Middleware {
  constructor() {
    super();
    this.handleClick = (ev) => {
      const match = this.context.worldQuery.testPoint(ev.point);
      const was = this.context.multiselect.value.selected[0];
      if (!match?.fixture) {
        setSelection(this.context, was?.up ?? null);
      } else if (was?.key === match.body || was?.key !== match.fixture && was?.up?.key === match.body) {
        setSelection(this.context, selectFixture(match.fixture, match.body));
      } else {
        setSelection(this.context, selectBody(match.body));
      }
    };
    this.on("pointer-click", this.handleClick);
  }
}
class SelectionManager extends Middleware {
  constructor() {
    super();
    this.selectBody = (select) => {
      if (!select?.body)
        return;
      setSelection(this.context, selectBody(select.body));
    };
    this.deselectBody = (select) => {
      if (!select?.body)
        return;
      removeSelection(this.context, selectBody(select.body));
    };
    this.selectFixture = (select) => {
      if (!select?.fixture)
        return;
      setSelection(this.context, selectFixture(select.fixture, select.body));
    };
    this.deselectFixture = (select) => {
      if (!select?.fixture)
        return;
      removeSelection(this.context, selectFixture(select.fixture, select.body));
    };
    this.selectJoint = (select) => {
      if (!select?.joint)
        return;
      setSelection(this.context, selectJoint(select.joint));
    };
    this.deselectJoint = (select) => {
      if (!select?.joint)
        return;
      removeSelection(this.context, selectJoint(select.joint));
    };
    this.deselectAll = () => {
      emptySelection(this.context);
    };
    this.on("select-body", this.selectBody);
    this.on("deselect-body", this.deselectBody);
    this.on("select-fixture", this.selectFixture);
    this.on("deselect-fixture", this.deselectFixture);
    this.on("select-joint", this.selectJoint);
    this.on("deselect-joint", this.deselectJoint);
    this.on("deselect-all", this.deselectAll);
  }
}
const DEFAULT_POINTER_RADIUS = 0.1;
class WorldQuery extends Middleware {
  constructor() {
    super();
    this.handleActivate = () => {
      this.context.worldQuery = this;
    };
    this.testPoint = (point, filter) => {
      const world = this.context.world.value;
      if (!world)
        return void 0;
      const radius = this.context.pointerRadius ?? DEFAULT_POINTER_RADIUS;
      let bestMatch;
      let bestDistance = radius;
      const aabb = new AABB(point, point).extend(radius);
      const distanceInput = new DistanceInput();
      distanceInput.useRadii = true;
      distanceInput.proxyB.set(new CircleShape(1e-5), 0);
      distanceInput.transformB.p.x = point.x;
      distanceInput.transformB.p.y = point.y;
      distanceInput.transformB.q.s = 0;
      distanceInput.transformB.q.c = 1;
      world.queryAABB(aabb, function(fixture) {
        const body = fixture.getBody();
        const match = {
          worldBody: body,
          worldFixture: fixture,
          body: getKey(body),
          fixture: getKey(fixture)
        };
        if (filter && !filter(match)) {
          return true;
        }
        if (fixture.testPoint(point)) {
          bestMatch = match;
          bestDistance = 0;
          return false;
        }
        for (let childIndex = fixture.getShape().getChildCount() - 1; childIndex >= 0; childIndex--) {
          distanceInput.proxyA.set(fixture.getShape(), childIndex);
          const xf = fixture.getBody().getTransform();
          distanceInput.transformA.p.x = xf.p.x;
          distanceInput.transformA.p.y = xf.p.y;
          distanceInput.transformA.q.s = xf.q.s;
          distanceInput.transformA.q.c = xf.q.c;
          const cache = new SimplexCache();
          const output = new DistanceOutput();
          Distance(output, cache, distanceInput);
          const distance2 = Vec2.distance(output.pointA, output.pointB);
          if (distance2 < bestDistance) {
            bestMatch = match;
            bestDistance = distance2;
          }
        }
        return true;
      });
      return bestMatch;
    };
    this.testBox = (start, end, filter) => {
      const world = this.context.world.value;
      if (!world)
        return [];
      const aabb = {
        lowerBound: { x: Math.min(start.x, end.x), y: Math.min(start.y, end.y) },
        upperBound: { x: Math.max(start.x, end.x), y: Math.max(start.y, end.y) }
      };
      const results = [];
      world.queryAABB(aabb, function(fixture) {
        const body = fixture.getBody();
        const match = {
          worldBody: body,
          worldFixture: fixture,
          body: getKey(body),
          fixture: getKey(fixture)
        };
        if (filter && !filter(match))
          return true;
        results.push(match);
        return true;
      });
      return results;
    };
    this.on("activate", this.handleActivate);
  }
}
class DefaultTool extends Middleware {
  constructor() {
    super();
    this.disposers = [];
    this.handleActivate = () => {
      this.disposers.push(j(() => {
        this.resetTool();
      }));
      this.disposers.push(this.context.activeTool.subscribe((activeTool) => {
        if (activeTool?.name === "default-tool") {
          this.resetTool();
        }
      }));
    };
    this.handleDeactivate = () => {
      this.disposers.forEach((d2) => d2());
      this.disposers = [];
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }
  resetTool() {
    const paused = this.context.paused.value;
    const mouseForce = this.context.mouseForce.value;
    let tool = { name: "inspect" };
    if (!paused) {
      if (mouseForce === void 0 || mouseForce === null) {
        tool = { name: "interact-pull" };
      } else if (mouseForce !== 0) {
        tool = { name: "interact-impulse" };
      }
    }
    this.context.activeTool.value = tool;
  }
}
class ConsoleManager extends Middleware {
  constructor() {
    super();
    this.handleActivate = () => {
      this.context.console = this;
      this.statusElement = document.getElementById("testbed-status");
      this.lastStatus = "";
      if (this.statusElement) {
        this.statusElement.innerText = this.lastStatus;
      } else {
        console.warn("Element with id='testbed-status' not found!");
      }
      this.infoElement = document.getElementById("testbed-info");
      this.lastInfo = "";
      if (this.infoElement) {
        this.infoElement.innerText = this.lastInfo;
      } else {
        console.warn("Element with id='testbed-info' not found!");
      }
    };
    this.handleDeactivate = () => {
      this.context.console = null;
    };
    this._statusText = "";
    this._statusMap = {};
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }
  info(text) {
    this.updateInfo(text);
  }
  status(a2, b2) {
    if (typeof b2 !== "undefined") {
      const key = a2;
      const value = b2;
      if (typeof value !== "function" && typeof value !== "object") {
        this._statusMap[key] = value;
      }
    } else if (a2 && typeof a2 === "object") {
      for (const key in a2) {
        const value = a2[key];
        if (typeof value !== "function" && typeof value !== "object") {
          this._statusMap[key] = value;
        }
      }
    } else if (typeof a2 === "string") {
      this._statusText = a2;
    }
    const newline = "\n";
    let text = this._statusText || "";
    for (const key in this._statusMap) {
      const value = this._statusMap[key];
      if (typeof value === "function")
        continue;
      text += (text && newline) + key + ": " + value;
    }
    this.updateStatus(text);
  }
  updateInfo(text) {
    if (this.lastInfo === text)
      return;
    this.lastInfo = text;
    if (this.infoElement) {
      this.infoElement.innerText = text;
    }
  }
  updateStatus(text) {
    if (this.lastStatus === text)
      return;
    this.lastStatus = text;
    if (this.statusElement) {
      this.statusElement.innerText = text;
    }
  }
}
class PlayButton extends Middleware {
  constructor() {
    super();
    this.button = null;
    this.disposeEffect = null;
    this.handleActivate = () => {
      if (document.readyState !== "loading") {
        this.handleDomReady();
      } else {
        document.addEventListener("DOMContentLoaded", this.handleDomReady);
      }
    };
    this.handleDomReady = () => {
      this.button = document.getElementById("testbed-play");
      if (!this.button)
        return;
      this.button.addEventListener("click", this.handleClick);
      this.disposeEffect = j(() => {
        const paused = this.context.paused.value;
        this.button.classList.toggle("pause", paused);
        this.button.classList.toggle("play", !paused);
      });
    };
    this.handleDeactivate = () => {
      document.removeEventListener("DOMContentLoaded", this.handleDomReady);
      this.button?.removeEventListener("click", this.handleClick);
      this.disposeEffect?.();
      this.button = null;
      this.disposeEffect = null;
    };
    this.handleClick = () => {
      this.context.paused.value = !this.context.paused.value;
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }
}
const PAN_THRESHOLD = 10;
const WHEEL_ZOOM = 0.05;
class ZoomPanProvider extends Middleware {
  constructor() {
    super();
    this.containerElement = null;
    this.disposers = [];
    this.pointers = /* @__PURE__ */ new Map();
    this.panFrom = null;
    this.panning = false;
    this.panBlocked = false;
    this.pinchDistance = 0;
    this.pinchCenter = null;
    this.handleActivate = () => {
      this.disposers.push(
        j(() => {
          const containerElement = this.context.containerElement?.value;
          if (!containerElement)
            return;
          this.containerElement = containerElement;
          containerElement.addEventListener("pointerdown", this.handlePointerDown);
          containerElement.addEventListener("wheel", this.handleWheel, { passive: false });
          return () => {
            containerElement.removeEventListener("pointerdown", this.handlePointerDown);
            containerElement.removeEventListener("wheel", this.handleWheel);
            this.endAll();
            this.containerElement = null;
          };
        }),
        // touches go to the testbed, not to scrolling or zooming the page, while it is on
        j(() => {
          const containerElement = this.context.containerElement?.value;
          if (!containerElement || !this.context.zoomPan?.value)
            return;
          const touchAction = containerElement.style.touchAction;
          containerElement.style.touchAction = "none";
          return () => {
            containerElement.style.touchAction = touchAction;
          };
        })
      );
    };
    this.handleDeactivate = () => {
      this.disposers.forEach((d2) => d2());
      this.disposers = [];
    };
    this.handleWheel = (ev) => {
      if (!this.enabled)
        return;
      ev.preventDefault();
      const delta = Math.max(-1, Math.min(1, -(ev.deltaX + ev.deltaY)));
      this.emit("display-zoom", { zoom: 1 + delta * WHEEL_ZOOM, center: this.toPoint(ev) });
    };
    this.handlePointerDown = (ev) => {
      if (!this.enabled || !this.containerElement)
        return;
      if (ev.pointerType === "mouse" && ev.button !== 0)
        return;
      if (this.pointers.size === 0) {
        window.addEventListener("pointermove", this.handlePointerMove);
        window.addEventListener("pointerup", this.handlePointerUp);
        window.addEventListener("pointercancel", this.handlePointerUp);
      }
      this.pointers.set(ev.pointerId, this.toPoint(ev));
      this.restart();
    };
    this.handlePointerMove = (ev) => {
      if (!this.pointers.has(ev.pointerId))
        return;
      const point = this.toPoint(ev);
      this.pointers.set(ev.pointerId, point);
      if (!this.enabled)
        return;
      if (this.pointers.size === 1) {
        this.movePan(point);
      } else if (this.pointers.size === 2) {
        this.movePinch();
      }
    };
    this.handlePointerUp = (ev) => {
      if (!this.pointers.delete(ev.pointerId))
        return;
      if (this.pointers.size === 0) {
        this.endAll();
      } else {
        this.restart();
      }
    };
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }
  get enabled() {
    return !!this.context.zoomPan?.value;
  }
  toPoint(ev) {
    const rect = this.containerElement.getBoundingClientRect();
    return { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
  }
  // a pointer came or went: the gesture starts over from where the pointers are now, so the
  // view does not jump
  restart() {
    const points = [...this.pointers.values()];
    if (points.length === 1) {
      if (!this.panning && !this.panFrom)
        this.panBlocked = this.context.pointerCaptured;
      this.panFrom = { ...points[0] };
      this.panning = this.panning && !this.panBlocked;
      this.pinchCenter = null;
    } else if (points.length === 2) {
      this.panFrom = null;
      this.pinchDistance = distance(points[0], points[1]);
      this.pinchCenter = midpoint(points[0], points[1]);
    }
  }
  movePan(point) {
    if (this.panBlocked || this.context.pointerCaptured || !this.panFrom)
      return;
    const dx = point.x - this.panFrom.x;
    const dy = point.y - this.panFrom.y;
    if (!this.panning && Math.hypot(dx, dy) < PAN_THRESHOLD)
      return;
    this.panning = true;
    this.emit("display-pan", { delta: { x: -dx, y: -dy } });
    this.panFrom = point;
  }
  movePinch() {
    const [a2, b2] = [...this.pointers.values()];
    const spread = distance(a2, b2);
    const center = midpoint(a2, b2);
    if (this.pinchCenter) {
      this.emit("display-pan", { delta: { x: this.pinchCenter.x - center.x, y: this.pinchCenter.y - center.y } });
    }
    if (this.pinchDistance > 0 && spread > 0) {
      this.emit("display-zoom", { zoom: spread / this.pinchDistance, center });
    }
    this.pinchDistance = spread;
    this.pinchCenter = center;
  }
  endAll() {
    this.pointers.clear();
    this.panFrom = null;
    this.panning = false;
    this.panBlocked = false;
    this.pinchCenter = null;
    window.removeEventListener("pointermove", this.handlePointerMove);
    window.removeEventListener("pointerup", this.handlePointerUp);
    window.removeEventListener("pointercancel", this.handlePointerUp);
  }
}
function distance(a2, b2) {
  return Math.hypot(a2.x - b2.x, a2.y - b2.y);
}
function midpoint(a2, b2) {
  return { x: (a2.x + b2.x) / 2, y: (a2.y + b2.y) / 2 };
}
class TestbedMain extends Middleware {
  constructor() {
    super();
    this.draw = new GLDraw();
    this.handleFrameUpdate = (ev) => {
      if (this.context.paused.value)
        return;
      if (!this.context.world.value)
        return;
      this.step?.(ev.dt, ev.now);
    };
    this.handleKeydown = (ev) => {
      this.keydown?.(ev.keyCode, String.fromCharCode(ev.keyCode));
    };
    this.handleKeyup = (ev) => {
      this.keyup?.(ev.keyCode, String.fromCharCode(ev.keyCode));
    };
    this.use(this.draw);
    this.use(new WorldQuery());
    this.use(new FrameLoop());
    this.use(new ContainerLoader());
    this.use(new WorldStep());
    this.use(new AutoPause());
    this.use(new ConsoleManager());
    this.use(new PlayButton());
    this.use(new KeyboardManager());
    this.use(new CameraTransform());
    this.use(new ZoomPanProvider());
    this.use(new GLLoader());
    this.use(new TextOverlay());
    this.use(new AutoFocus());
    this.use(new DrawWorld());
    this.use(new DrawBounds());
    this.use(new DrawBodyInfo());
    this.use(new DrawJoints());
    this.use(new DrawContacts());
    this.use(new WorldKeys());
    this.use(new SelectionManager());
    this.use(new PointerManager());
    this.use(new DefaultTool());
    this.use(new ToolSwitch("inspect", new InspectTool()));
    this.use(new ToolSwitch("interact-pull", new PullTool()));
    this.use(new ToolSwitch("interact-impulse", new ImpulseTool()));
    this.on("frame-update", this.handleFrameUpdate);
    this.on("keydown", this.handleKeydown);
    this.on("keyup", this.handleKeyup);
  }
  color(r2, g2, b2) {
    r2 = r2 * 256 | 0;
    g2 = g2 * 256 | 0;
    b2 = b2 * 256 | 0;
    return "rgb(" + r2 + ", " + g2 + ", " + b2 + ")";
  }
  findOne(query) {
    const world = this.context.world.value;
    return world ? findOne(world, query) : null;
  }
  findAll(query) {
    const world = this.context.world.value;
    return world ? findAll(world, query) : [];
  }
  // @on("tool-request")
  // handleToolRequest(config: ToolConfig) {
  //   this.context.activeTool.value = config;
  // }
  get width() {
    return this.context.camera.width;
  }
  set width(value) {
    this.context.camera.width = value;
  }
  get height() {
    return this.context.camera.height;
  }
  set height(value) {
    this.context.camera.height = value;
  }
  get x() {
    return this.context.camera.x;
  }
  set x(value) {
    this.context.camera.x = value;
  }
  // planck 1's testbed measured y downwards: `testbed.y = -20` centers the view on world y = 20
  get y() {
    return -this.context.camera.y;
  }
  set y(value) {
    this.context.camera.y = -value;
  }
  get background() {
    return this.context.style.background;
  }
  set background(value) {
    this.context.style.background = value;
  }
  get hz() {
    return this.context.simulation.hz;
  }
  set hz(value) {
    this.context.simulation.hz = value;
  }
  get speed() {
    return this.context.simulation.speed;
  }
  set speed(value) {
    this.context.simulation.speed = value;
  }
  get mouseForce() {
    return this.context.mouseForce.value;
  }
  set mouseForce(value) {
    this.context.mouseForce.value = value;
  }
  /** Zoom with the wheel or a pinch, pan by dragging empty space. */
  get zoomPan() {
    return this.context.zoomPan.value;
  }
  set zoomPan(value) {
    this.context.zoomPan.value = value;
  }
  /** Pause after 15 seconds without user input. Off by default. */
  get autoPause() {
    return this.context.autoPause.value;
  }
  set autoPause(value) {
    this.context.autoPause.value = value;
  }
  get activeKeys() {
    return this.context.activeKeys;
  }
  start(world) {
    if (world) {
      this.context.world.value = world;
    }
    this.resume();
  }
  // todo: how to add world to testbed api?
  // get/set world, or get/setWorld
  get world() {
    return this.context.world.value;
  }
  set world(world) {
    this.context.world.value = world;
  }
  /** A dot at p, 5 px in radius whatever the zoom; `r` is ignored, as in planck 1.5. */
  drawPoint(p2, r2, color) {
    this.draw.drawScreenPoint(p2, 5, color);
  }
  drawCircle(p2, r2, color) {
    this.draw.drawCircle(p2, r2, color);
  }
  drawCapsule(a2, b2, r2, color) {
    this.draw.drawCapsule(a2, b2, r2, color);
  }
  drawEdge(a2, b2, color) {
    this.draw.drawEdge(a2, b2, color);
  }
  drawSegment(a2, b2, color) {
    this.draw.drawEdge(a2, b2, color);
  }
  drawPolygon(points, color) {
    this.draw.drawPolygon(points, color);
  }
  drawChain(points, color) {
    this.draw.drawChain(points, color);
  }
  drawAABB(aabb, color) {
    this.draw.drawAABB(aabb, color);
  }
  /** @internal pass paused to WorldComponent */
  get paused() {
    return this.context.paused.value;
  }
  isPaused() {
    return this.context.paused.value;
  }
  pause() {
    this.context.paused.value = true;
  }
  resume() {
    this.context.paused.value = false;
  }
  info(text) {
    this.context.console?.info(text);
  }
  status(a2, b2) {
    this.context.console?.status(a2, b2);
  }
}
const mount = (options = {}) => {
  if (runtime.value)
    return runtime.value.middleware;
  const main = new TestbedMain();
  const context = initTestbedContext();
  context.zoomPan.value = options.zoomPan ?? true;
  context.autoPause.value = options.autoPause ?? false;
  if (options.background)
    context.style.background = options.background;
  runtime.value = {
    middleware: main,
    context,
    emit: main.emit.bind(main)
  };
  window["runtime"] = main;
  Runtime.activate(main, context);
  return main;
};
const mountTestbed = () => mount();
Testbed.mount = mountTestbed;
export {
  DrawBodyInfo,
  DrawBounds,
  DrawContacts,
  DrawJoints,
  DrawWorld,
  InspectTool,
  Multiselect,
  ProviderCollection,
  SelectionManager,
  Testbed2 as Testbed,
  TestbedMain,
  TextOverlay,
  WorldKeys,
  WorldQuery,
  WorldStep,
  currentPlay,
  drawWorldString,
  emptySelection,
  findAll,
  findBody,
  findFixture,
  findJoint,
  findOne,
  generateKey,
  getKey,
  getLabel,
  initTestbedContext,
  isSelected,
  mountTestbed,
  playlist,
  removeSelection,
  replaceKey,
  rotate,
  runtime,
  selectBody,
  selectFixture,
  selectJoint,
  setKey,
  setLabel,
  setSelection,
  signalsCore_module as signalsCore,
  toolbarTool
};
//# sourceMappingURL=testbed.mjs.map
