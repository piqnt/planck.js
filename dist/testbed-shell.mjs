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
import { signalsCore, runtime, getKey, isSelected, getLabel, findFixture, findBody, findJoint } from "planck/testbed";
var n, l$2, u$2, i$1, r$2, o$1, e$1, f$2, c$1, a$1, s$1, h$2, p$1, v$1, y$2, d$2 = {}, w$3 = [], _$2 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, g$3 = Array.isArray;
function m$2(n2, l2) {
  for (var u2 in l2) n2[u2] = l2[u2];
  return n2;
}
function b$2(n2) {
  n2 && n2.parentNode && n2.parentNode.removeChild(n2);
}
function k$2(l2, u2, t2) {
  var i2, r2, o2, e2 = {};
  for (o2 in u2) "key" == o2 ? i2 = u2[o2] : "ref" == o2 ? r2 = u2[o2] : e2[o2] = u2[o2];
  if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (o2 in l2.defaultProps) void 0 === e2[o2] && (e2[o2] = l2.defaultProps[o2]);
  return x$3(l2, e2, i2, r2, null);
}
function x$3(n2, t2, i2, r2, o2) {
  var e2 = { type: n2, props: t2, key: i2, ref: r2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o2 ? ++u$2 : o2, __i: -1, __u: 0 };
  return null == o2 && null != l$2.vnode && l$2.vnode(e2), e2;
}
function M$1() {
  return { current: null };
}
function S$1(n2) {
  return n2.children;
}
function C$3(n2, l2) {
  this.props = n2, this.context = l2;
}
function $$2(n2, l2) {
  if (null == l2) return n2.__ ? $$2(n2.__, n2.__i + 1) : null;
  for (var u2; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) return u2.__e;
  return "function" == typeof n2.type ? $$2(n2) : null;
}
function I$1(n2) {
  if (n2.__P && n2.__d) {
    var u2 = n2.__v, t2 = u2.__e, i2 = [], r2 = [], o2 = m$2({}, u2);
    o2.__v = u2.__v + 1, l$2.vnode && l$2.vnode(o2), q$2(n2.__P, o2, u2, n2.__n, n2.__P.namespaceURI, 32 & u2.__u ? [t2] : null, i2, null == t2 ? $$2(u2) : t2, !!(32 & u2.__u), r2), o2.__v = u2.__v, o2.__.__k[o2.__i] = o2, D$2(i2, o2, r2), u2.__e = u2.__ = null, o2.__e != t2 && P$3(o2);
  }
}
function P$3(n2) {
  if (null != (n2 = n2.__) && null != n2.__c) return n2.__e = n2.__c.base = null, n2.__k.some(function(l2) {
    if (null != l2 && null != l2.__e) return n2.__e = n2.__c.base = l2.__e;
  }), P$3(n2);
}
function A$2(n2) {
  (!n2.__d && (n2.__d = true) && i$1.push(n2) && !H$1.__r++ || r$2 != l$2.debounceRendering) && ((r$2 = l$2.debounceRendering) || o$1)(H$1);
}
function H$1() {
  try {
    for (var n2, l2 = 1; i$1.length; ) i$1.length > l2 && i$1.sort(e$1), n2 = i$1.shift(), l2 = i$1.length, I$1(n2);
  } finally {
    i$1.length = H$1.__r = 0;
  }
}
function L$1(n2, l2, u2, t2, i2, r2, o2, e2, f2, c2, a2) {
  var s2, h2, p2, v2, y2, _2, g2 = t2 && t2.__k || w$3, m2 = l2.length;
  for (f2 = T$2(u2, l2, g2, f2, m2), s2 = 0; s2 < m2; s2++) null != (p2 = u2.__k[s2]) && (h2 = -1 != p2.__i && g2[p2.__i] || d$2, p2.__i = s2, _2 = q$2(n2, p2, h2, i2, r2, o2, e2, f2, c2, a2), v2 = p2.__e, p2.ref && h2.ref != p2.ref && (h2.ref && J$1(h2.ref, null, p2), a2.push(p2.ref, p2.__c || v2, p2)), null == y2 && null != v2 && (y2 = v2), 4 & p2.__u ? (f2 = j$3(p2, f2, n2), h2.__e && (h2.__e = null)) : "function" == typeof p2.type && void 0 !== _2 ? f2 = _2 : v2 && (f2 = v2.nextSibling), p2.__u &= -7);
  return u2.__e = y2, f2;
}
function T$2(n2, l2, u2, t2, i2) {
  var r2, o2, e2, f2, c2, a2 = u2.length, s2 = a2, h2 = 0;
  for (n2.__k = new Array(i2), r2 = 0; r2 < i2; r2++) null != (o2 = l2[r2]) && "boolean" != typeof o2 && "function" != typeof o2 ? ("string" == typeof o2 || "number" == typeof o2 || "bigint" == typeof o2 || o2.constructor == String ? o2 = n2.__k[r2] = x$3(null, o2, null, null, null) : g$3(o2) ? o2 = n2.__k[r2] = x$3(S$1, { children: o2 }, null, null, null) : void 0 === o2.constructor && o2.__b > 0 ? o2 = n2.__k[r2] = x$3(o2.type, o2.props, o2.key, o2.ref ? o2.ref : null, o2.__v) : n2.__k[r2] = o2, f2 = r2 + h2, o2.__ = n2, o2.__b = n2.__b + 1, e2 = null, -1 != (c2 = o2.__i = O$1(o2, u2, f2, s2)) && (s2--, (e2 = u2[c2]) && (e2.__u |= 2)), null == e2 || null == e2.__v ? (-1 == c2 && (i2 > a2 ? h2-- : i2 < a2 && h2++), "function" != typeof o2.type && (o2.__u |= 4)) : c2 != f2 && (c2 == f2 - 1 ? h2-- : c2 == f2 + 1 ? h2++ : (c2 > f2 ? h2-- : h2++, o2.__u |= 4))) : n2.__k[r2] = null;
  if (s2) for (r2 = 0; r2 < a2; r2++) null != (e2 = u2[r2]) && 0 == (2 & e2.__u) && (e2.__e == t2 && (t2 = $$2(e2)), K$1(e2, e2));
  return t2;
}
function j$3(n2, l2, u2) {
  var t2, i2;
  if ("function" == typeof n2.type) {
    for (t2 = n2.__k, i2 = 0; t2 && i2 < t2.length; i2++) t2[i2] && (t2[i2].__ = n2, l2 = j$3(t2[i2], l2, u2));
    return l2;
  }
  n2.__e != l2 && (l2 && n2.type && !l2.parentNode && (l2 = $$2(n2)), l2 = u2.insertBefore(n2.__e, l2 || null));
  do {
    l2 = l2 && l2.nextSibling;
  } while (null != l2 && 8 == l2.nodeType);
  return l2;
}
function F$2(n2, l2) {
  return l2 = l2 || [], null == n2 || "boolean" == typeof n2 || (g$3(n2) ? n2.some(function(n3) {
    F$2(n3, l2);
  }) : l2.push(n2)), l2;
}
function O$1(n2, l2, u2, t2) {
  var i2, r2, o2, e2 = n2.key, f2 = n2.type, c2 = l2[u2], a2 = null != c2 && 0 == (2 & c2.__u);
  if (null === c2 && null == e2 || a2 && e2 == c2.key && f2 == c2.type) return u2;
  if (t2 > (a2 ? 1 : 0)) {
    for (i2 = u2 - 1, r2 = u2 + 1; i2 >= 0 || r2 < l2.length; ) if (null != (c2 = l2[o2 = i2 >= 0 ? i2-- : r2++]) && 0 == (2 & c2.__u) && e2 == c2.key && f2 == c2.type) return o2;
  }
  return -1;
}
function z$2(n2, l2, u2) {
  "-" == l2[0] ? n2.setProperty(l2, null == u2 ? "" : u2) : n2[l2] = null == u2 ? "" : "number" != typeof u2 || _$2.test(l2) ? u2 : u2 + "px";
}
function N$2(n2, l2, u2, t2, i2) {
  var r2, o2;
  n: if ("style" == l2) if ("string" == typeof u2) n2.style.cssText = u2;
  else {
    if ("string" == typeof t2 && (n2.style.cssText = t2 = ""), t2) for (l2 in t2) u2 && l2 in u2 || z$2(n2.style, l2, "");
    if (u2) for (l2 in u2) t2 && u2[l2] == t2[l2] || z$2(n2.style, l2, u2[l2]);
  }
  else if ("o" == l2[0] && "n" == l2[1]) r2 = l2 != (l2 = l2.replace(s$1, "$1")), o2 = l2.toLowerCase(), l2 = o2 in n2 || "onFocusOut" == l2 || "onFocusIn" == l2 ? o2.slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + r2] = u2, u2 ? t2 ? u2[a$1] = t2[a$1] : (u2[a$1] = h$2, n2.addEventListener(l2, r2 ? v$1 : p$1, r2)) : n2.removeEventListener(l2, r2 ? v$1 : p$1, r2);
  else {
    if ("http://www.w3.org/2000/svg" == i2) l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if ("width" != l2 && "height" != l2 && "href" != l2 && "list" != l2 && "form" != l2 && "tabIndex" != l2 && "download" != l2 && "rowSpan" != l2 && "colSpan" != l2 && "role" != l2 && "popover" != l2 && l2 in n2) try {
      n2[l2] = null == u2 ? "" : u2;
      break n;
    } catch (n3) {
    }
    "function" == typeof u2 || (null == u2 || false === u2 && "-" != l2[4] ? n2.removeAttribute(l2) : n2.setAttribute(l2, "popover" == l2 && 1 == u2 ? "" : u2));
  }
}
function V$1(n2) {
  return function(u2) {
    if (this.l) {
      var t2 = this.l[u2.type + n2];
      if (null == u2[c$1]) u2[c$1] = h$2++;
      else if (u2[c$1] < t2[a$1]) return;
      return t2(l$2.event ? l$2.event(u2) : u2);
    }
  };
}
function q$2(n2, u2, t2, i2, r2, o2, e2, f2, c2, a2) {
  var s2, h2, p2, v2, y2, d2, _2, k2, x2, M2, I2, P2, A2, H2, T2, j2, F2 = u2.type;
  if (void 0 !== u2.constructor) return null;
  128 & t2.__u && (c2 = !!(32 & t2.__u), o2 = [f2 = u2.__e = t2.__e]), (s2 = l$2.__b) && s2(u2);
  n: if ("function" == typeof F2) {
    h2 = e2.length;
    try {
      if (x2 = u2.props, M2 = F2.prototype && F2.prototype.render, I2 = (s2 = F2.contextType) && i2[s2.__c], P2 = s2 ? I2 ? I2.props.value : s2.__ : i2, t2.__c ? k2 = (p2 = u2.__c = t2.__c).__ = p2.__E : (M2 ? u2.__c = p2 = new F2(x2, P2) : (u2.__c = p2 = new C$3(x2, P2), p2.constructor = F2, p2.render = Q$1), I2 && I2.sub(p2), p2.state || (p2.state = {}), p2.__n = i2, v2 = p2.__d = true, p2.__h = [], p2._sb = []), M2 && null == p2.__s && (p2.__s = p2.state), M2 && null != F2.getDerivedStateFromProps && (p2.__s == p2.state && (p2.__s = m$2({}, p2.__s)), m$2(p2.__s, F2.getDerivedStateFromProps(x2, p2.__s))), y2 = p2.props, d2 = p2.state, p2.__v = u2, v2) M2 && null == F2.getDerivedStateFromProps && null != p2.componentWillMount && p2.componentWillMount(), M2 && null != p2.componentDidMount && p2.__h.push(p2.componentDidMount);
      else {
        if (M2 && null == F2.getDerivedStateFromProps && x2 !== y2 && null != p2.componentWillReceiveProps && p2.componentWillReceiveProps(x2, P2), u2.__v == t2.__v || !p2.__e && null != p2.shouldComponentUpdate && false === p2.shouldComponentUpdate(x2, p2.__s, P2)) {
          u2.__v != t2.__v && (p2.props = x2, p2.state = p2.__s, p2.__d = false), u2.__e = t2.__e, u2.__k = t2.__k, u2.__k.some(function(n3) {
            n3 && (n3.__ = u2);
          }), w$3.push.apply(p2.__h, p2._sb), p2._sb = [], p2.__h.length && e2.push(p2), f2 = $$2(t2);
          break n;
        }
        null != p2.componentWillUpdate && p2.componentWillUpdate(x2, p2.__s, P2), M2 && null != p2.componentDidUpdate && p2.__h.push(function() {
          p2.componentDidUpdate(y2, d2, _2);
        });
      }
      if (p2.context = P2, p2.props = x2, p2.__P = n2, p2.__e = false, A2 = l$2.__r, H2 = 0, M2) p2.state = p2.__s, p2.__d = false, A2 && A2(u2), s2 = p2.render(p2.props, p2.state, p2.context), w$3.push.apply(p2.__h, p2._sb), p2._sb = [];
      else do {
        p2.__d = false, A2 && A2(u2), s2 = p2.render(p2.props, p2.state, p2.context), p2.state = p2.__s;
      } while (p2.__d && ++H2 < 25);
      p2.state = p2.__s, null != p2.getChildContext && (i2 = m$2(m$2({}, i2), p2.getChildContext())), M2 && !v2 && null != p2.getSnapshotBeforeUpdate && (_2 = p2.getSnapshotBeforeUpdate(y2, d2)), T2 = null != s2 && s2.type === S$1 && null == s2.key ? E$1(s2.props.children) : s2, f2 = L$1(n2, g$3(T2) ? T2 : [T2], u2, t2, i2, r2, o2, e2, f2, c2, a2), p2.base = u2.__e, u2.__u &= -161, p2.__h.length && e2.push(p2), k2 && (p2.__E = p2.__ = null);
    } catch (n3) {
      if (e2.length = h2, u2.__v = null, c2 || null != o2) {
        if (n3.then) {
          for (u2.__u |= c2 ? 160 : 128; f2 && 8 == f2.nodeType && f2.nextSibling; ) f2 = f2.nextSibling;
          null != o2 && (o2[o2.indexOf(f2)] = null), u2.__e = f2;
        } else if (null != o2) for (j2 = o2.length; j2--; ) b$2(o2[j2]);
      } else u2.__e = t2.__e;
      null == u2.__k && (u2.__k = t2.__k || []), n3.then || B$2(u2), l$2.__e(n3, u2, t2);
    }
  } else null == o2 && u2.__v == t2.__v ? (u2.__k = t2.__k, u2.__e = t2.__e) : f2 = u2.__e = G$1(t2.__e, u2, t2, i2, r2, o2, e2, c2, a2);
  return (s2 = l$2.diffed) && s2(u2), 128 & u2.__u ? void 0 : f2;
}
function B$2(n2) {
  n2 && (n2.__c && (n2.__c.__e = true), n2.__k && n2.__k.some(B$2));
}
function D$2(n2, u2, t2) {
  for (var i2 = 0; i2 < t2.length; i2++) J$1(t2[i2], t2[++i2], t2[++i2]);
  l$2.__c && l$2.__c(u2, n2), n2.some(function(u3) {
    try {
      n2 = u3.__h, u3.__h = [], n2.some(function(n3) {
        n3.call(u3);
      });
    } catch (n3) {
      l$2.__e(n3, u3.__v);
    }
  });
}
function E$1(n2) {
  return "object" != typeof n2 || null == n2 || n2.__b > 0 ? n2 : g$3(n2) ? n2.map(E$1) : void 0 !== n2.constructor ? null : m$2({}, n2);
}
function G$1(u2, t2, i2, r2, o2, e2, f2, c2, a2) {
  var s2, h2, p2, v2, y2, w2, _2, m2 = i2.props || d$2, k2 = t2.props, x2 = t2.type;
  if ("svg" == x2 ? o2 = "http://www.w3.org/2000/svg" : "math" == x2 ? o2 = "http://www.w3.org/1998/Math/MathML" : o2 || (o2 = "http://www.w3.org/1999/xhtml"), null != e2) {
    for (s2 = 0; s2 < e2.length; s2++) if ((y2 = e2[s2]) && "setAttribute" in y2 == !!x2 && (x2 ? y2.localName == x2 : 3 == y2.nodeType)) {
      u2 = y2, e2[s2] = null;
      break;
    }
  }
  if (null == u2) {
    if (null == x2) return document.createTextNode(k2);
    u2 = document.createElementNS(o2, x2, k2.is && k2), c2 && (l$2.__m && l$2.__m(t2, e2), c2 = false), e2 = null;
  }
  if (null == x2) m2 === k2 || c2 && u2.data == k2 || (u2.data = k2);
  else {
    if (e2 = "textarea" == x2 && null != k2.defaultValue ? null : e2 && n.call(u2.childNodes), !c2 && null != e2) for (m2 = {}, s2 = 0; s2 < u2.attributes.length; s2++) m2[(y2 = u2.attributes[s2]).name] = y2.value;
    for (s2 in m2) y2 = m2[s2], "dangerouslySetInnerHTML" == s2 ? p2 = y2 : "children" == s2 || s2 in k2 || "value" == s2 && "defaultValue" in k2 || "checked" == s2 && "defaultChecked" in k2 || N$2(u2, s2, null, y2, o2);
    for (s2 in k2) y2 = k2[s2], "children" == s2 ? v2 = y2 : "dangerouslySetInnerHTML" == s2 ? h2 = y2 : "value" == s2 ? w2 = y2 : "checked" == s2 ? _2 = y2 : c2 && "function" != typeof y2 || m2[s2] === y2 || N$2(u2, s2, y2, m2[s2], o2);
    if (h2) c2 || p2 && (h2.__html == p2.__html || h2.__html == u2.innerHTML) || (u2.innerHTML = h2.__html), t2.__k = [];
    else if (p2 && (u2.innerHTML = ""), L$1("template" == t2.type ? u2.content : u2, g$3(v2) ? v2 : [v2], t2, i2, r2, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o2, e2, f2, e2 ? e2[0] : i2.__k && $$2(i2, 0), c2, a2), null != e2) for (s2 = e2.length; s2--; ) b$2(e2[s2]);
    c2 && "textarea" != x2 || (s2 = "value", "progress" == x2 && null == w2 ? u2.removeAttribute("value") : null != w2 && (w2 !== u2[s2] || "progress" == x2 && !w2 || "option" == x2 && w2 != m2[s2]) && N$2(u2, s2, w2, m2[s2], o2), s2 = "checked", null != _2 && _2 != u2[s2] && N$2(u2, s2, _2, m2[s2], o2));
  }
  return u2;
}
function J$1(n2, u2, t2) {
  try {
    if ("function" == typeof n2) {
      var i2 = "function" == typeof n2.__u;
      i2 && n2.__u(), i2 && null == u2 || (n2.__u = n2(u2));
    } else n2.current = u2;
  } catch (n3) {
    l$2.__e(n3, t2);
  }
}
function K$1(n2, u2, t2) {
  var i2, r2;
  if (l$2.unmount && l$2.unmount(n2), (i2 = n2.ref) && (i2.current && i2.current != n2.__e || J$1(i2, null, u2)), null != (i2 = n2.__c)) {
    if (i2.componentWillUnmount) try {
      i2.componentWillUnmount();
    } catch (n3) {
      l$2.__e(n3, u2);
    }
    i2.base = i2.__P = i2.__n = null;
  }
  if (i2 = n2.__k) for (r2 = 0; r2 < i2.length; r2++) i2[r2] && K$1(i2[r2], u2, t2 || "function" != typeof n2.type);
  t2 || b$2(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
}
function Q$1(n2, l2, u2) {
  return this.constructor(n2, u2);
}
function R$1(u2, t2, i2) {
  var r2, o2, e2, f2;
  t2 == document && (t2 = document.documentElement), l$2.__ && l$2.__(u2, t2), o2 = (r2 = "function" == typeof i2) ? null : i2 && i2.__k || t2.__k, e2 = [], f2 = [], q$2(t2, u2 = (!r2 && i2 || t2).__k = k$2(S$1, null, [u2]), o2 || d$2, d$2, t2.namespaceURI, !r2 && i2 ? [i2] : o2 ? null : t2.firstChild ? n.call(t2.childNodes) : null, e2, !r2 && i2 ? i2 : o2 ? o2.__e : t2.firstChild, r2, f2), D$2(e2, u2, f2), u2.props.children = null;
}
function U$1(n2, l2) {
  R$1(n2, l2, U$1);
}
function W$1(l2, u2, t2) {
  var i2, r2, o2, e2, f2 = m$2({}, l2.props);
  for (o2 in l2.type && l2.type.defaultProps && (e2 = l2.type.defaultProps), u2) "key" == o2 ? i2 = u2[o2] : "ref" == o2 ? r2 = u2[o2] : f2[o2] = void 0 === u2[o2] && null != e2 ? e2[o2] : u2[o2];
  return arguments.length > 2 && (f2.children = arguments.length > 3 ? n.call(arguments, 2) : t2), x$3(l2.type, f2, i2 || l2.key, r2 || l2.ref, null);
}
function X$1(n2) {
  function l2(n3) {
    var u2, t2;
    return this.getChildContext || (u2 = /* @__PURE__ */ new Set(), (t2 = {})[l2.__c] = this, this.getChildContext = function() {
      return t2;
    }, this.componentWillUnmount = function() {
      u2 = null;
    }, this.shouldComponentUpdate = function(n4) {
      this.props.value != n4.value && u2.forEach(function(n5) {
        n5.__e = true, A$2(n5);
      });
    }, this.sub = function(n4) {
      u2.add(n4);
      var l3 = n4.componentWillUnmount;
      n4.componentWillUnmount = function() {
        u2 && u2.delete(n4), l3 && l3.call(n4);
      };
    }), n3.children;
  }
  return l2.__c = "__cC" + y$2++, l2.__ = n2, l2.Provider = l2.__l = (l2.Consumer = function(n3, l3) {
    return n3.children(l3);
  }).contextType = l2, l2;
}
n = w$3.slice, l$2 = { __e: function(n2, l2, u2, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, u$2 = 0, C$3.prototype.setState = function(n2, l2) {
  var u2;
  u2 = null != this.__s && this.__s != this.state ? this.__s : this.__s = m$2({}, this.state), "function" == typeof n2 && (n2 = n2(m$2({}, u2), this.props)), n2 && m$2(u2, n2), null != n2 && this.__v && (l2 && this._sb.push(l2), A$2(this));
}, C$3.prototype.forceUpdate = function(n2) {
  this.__v && (this.__e = true, n2 && this.__h.push(n2), A$2(this));
}, C$3.prototype.render = S$1, i$1 = [], o$1 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$1 = function(n2, l2) {
  return n2.__v.__b - l2.__v.__b;
}, H$1.__r = 0, f$2 = Math.random().toString(8), c$1 = "__d" + f$2, a$1 = "__a" + f$2, s$1 = /(PointerCapture)$|Capture$/i, h$2 = 0, p$1 = V$1(false), v$1 = V$1(true), y$2 = 0;
var t, r$1, u$1, i, o = 0, f$1 = [], c = l$2, e = c.__b, a = c.__r, v = c.diffed, l$1 = c.__c, m$1 = c.unmount, p = c.__;
function s(n2, t2) {
  c.__h && c.__h(r$1, n2, o || t2), o = 0;
  var u2 = r$1.__H || (r$1.__H = { __: [], __h: [] });
  return n2 >= u2.__.length && u2.__.push({}), u2.__[n2];
}
function d$1(n2) {
  return o = 1, y$1(D$1, n2);
}
function y$1(n2, u2, i2) {
  var o2 = s(t++, 2);
  if (o2.t = n2, !o2.__c && (o2.__ = [i2 ? i2(u2) : D$1(void 0, u2), function(n3) {
    var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n3);
    t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
  }], o2.__c = r$1, !r$1.__f)) {
    var f2 = function(n3, t2, r2) {
      if (!o2.__c.__H) return true;
      var u3 = false, i3 = o2.__c.props !== n3;
      if (o2.__c.__H.__.some(function(n4) {
        if (n4.__N) {
          u3 = true;
          var t3 = n4.__[0];
          n4.__ = n4.__N, n4.__N = void 0, t3 !== n4.__[0] && (i3 = true);
        }
      }), c2) {
        var f3 = c2.call(this, n3, t2, r2);
        return u3 ? f3 || i3 : f3;
      }
      return !u3 || i3;
    };
    r$1.__f = true;
    var c2 = r$1.shouldComponentUpdate, e2 = r$1.componentWillUpdate;
    r$1.componentWillUpdate = function(n3, t2, r2) {
      if (this.__e) {
        var u3 = c2;
        c2 = void 0, f2(n3, t2, r2), c2 = u3;
      }
      e2 && e2.call(this, n3, t2, r2);
    }, r$1.shouldComponentUpdate = f2;
  }
  return o2.__N || o2.__;
}
function h$1(n2, u2) {
  var i2 = s(t++, 3);
  !c.__s && C$2(i2.__H, u2) && (i2.__ = n2, i2.u = u2, r$1.__H.__h.push(i2));
}
function _$1(n2, u2) {
  var i2 = s(t++, 4);
  !c.__s && C$2(i2.__H, u2) && (i2.__ = n2, i2.u = u2, r$1.__h.push(i2));
}
function A$1(n2) {
  return o = 5, T$1(function() {
    return { current: n2 };
  }, []);
}
function F$1(n2, t2, r2) {
  o = 6, _$1(function() {
    if ("function" == typeof n2) {
      var r3 = n2(t2());
      return function() {
        n2(null), r3 && "function" == typeof r3 && r3();
      };
    }
    if (n2) return n2.current = t2(), function() {
      return n2.current = null;
    };
  }, null == r2 ? r2 : r2.concat(n2));
}
function T$1(n2, r2) {
  var u2 = s(t++, 7);
  return C$2(u2.__H, r2) && (u2.__ = n2(), u2.__H = r2, u2.__h = n2), u2.__;
}
function q$1(n2, t2) {
  return o = 8, T$1(function() {
    return n2;
  }, t2);
}
function x$2(n2) {
  var u2 = r$1.context[n2.__c], i2 = s(t++, 9);
  return i2.c = n2, u2 ? (null == i2.__ && (i2.__ = true, u2.sub(r$1)), u2.props.value) : n2.__;
}
function P$2(n2, t2) {
  c.useDebugValue && c.useDebugValue(t2 ? t2(n2) : n2);
}
function b$1(n2) {
  var u2 = s(t++, 10), i2 = d$1();
  return u2.__ = n2, r$1.componentDidCatch || (r$1.componentDidCatch = function(n3, t2) {
    u2.__ && u2.__(n3, t2), i2[1](n3);
  }), [i2[0], function() {
    i2[1](void 0);
  }];
}
function g$2() {
  var n2 = s(t++, 11);
  if (!n2.__) {
    for (var u2 = r$1.__v; null !== u2 && !u2.__m && null !== u2.__; ) u2 = u2.__;
    var i2 = u2.__m || (u2.__m = [0, 0]);
    n2.__ = "P" + i2[0] + "-" + i2[1]++;
  }
  return n2.__;
}
function j$2() {
  for (var n2; n2 = f$1.shift(); ) {
    var t2 = n2.__H;
    if (n2.__P && t2) try {
      t2.__h.some(z$1), t2.__h.some(B$1), t2.__h = [];
    } catch (r2) {
      t2.__h = [], c.__e(r2, n2.__v);
    }
  }
}
c.__b = function(n2) {
  r$1 = null, e && e(n2);
}, c.__ = function(n2, t2) {
  n2 && t2.__k && t2.__k.__m && (n2.__m = t2.__k.__m), p && p(n2, t2);
}, c.__r = function(n2) {
  a && a(n2), t = 0;
  var i2 = (r$1 = n2.__c).__H;
  i2 && (u$1 === r$1 ? (i2.__h = [], r$1.__h = [], i2.__.some(function(n3) {
    n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
  })) : (i2.__h.some(z$1), i2.__h.some(B$1), i2.__h = [], t = 0)), u$1 = r$1;
}, c.diffed = function(n2) {
  v && v(n2);
  var t2 = n2.__c;
  t2 && t2.__H && (t2.__H.__h.length && (1 !== f$1.push(t2) && i === c.requestAnimationFrame || ((i = c.requestAnimationFrame) || w$2)(j$2)), t2.__H.__.some(function(n3) {
    n3.u && (n3.__H = n3.u, n3.u = void 0);
  })), u$1 = r$1 = null;
}, c.__c = function(n2, t2) {
  t2.some(function(n3) {
    try {
      n3.__h.some(z$1), n3.__h = n3.__h.filter(function(n4) {
        return !n4.__ || B$1(n4);
      });
    } catch (r2) {
      t2.some(function(n4) {
        n4.__h && (n4.__h = []);
      }), t2 = [], c.__e(r2, n3.__v);
    }
  }), l$1 && l$1(n2, t2);
}, c.unmount = function(n2) {
  m$1 && m$1(n2);
  var t2, r2 = n2.__c;
  r2 && r2.__H && (r2.__H.__.some(function(n3) {
    try {
      z$1(n3);
    } catch (n4) {
      t2 = n4;
    }
  }), r2.__H = void 0, t2 && c.__e(t2, r2.__v));
};
var k$1 = "function" == typeof requestAnimationFrame;
function w$2(n2) {
  var t2, r2 = function() {
    clearTimeout(u2), k$1 && cancelAnimationFrame(t2), setTimeout(n2);
  }, u2 = setTimeout(r2, 35);
  k$1 && (t2 = requestAnimationFrame(r2));
}
function z$1(n2) {
  var t2 = r$1, u2 = n2.__c;
  "function" == typeof u2 && (n2.__c = void 0, u2()), r$1 = t2;
}
function B$1(n2) {
  var t2 = r$1;
  n2.__c = n2.__(), r$1 = t2;
}
function C$2(n2, t2) {
  return !n2 || n2.length !== t2.length || t2.some(function(t3, r2) {
    return t3 !== n2[r2];
  });
}
function D$1(n2, t2) {
  return "function" == typeof t2 ? t2(n2) : t2;
}
function g$1(n2, t2) {
  for (var e2 in t2) n2[e2] = t2[e2];
  return n2;
}
function E(n2, t2) {
  for (var e2 in n2) if ("__source" !== e2 && !(e2 in t2)) return true;
  for (var r2 in t2) if ("__source" !== r2 && n2[r2] !== t2[r2]) return true;
  return false;
}
function C$1(n2, t2) {
  var e2 = t2(), r2 = d$1({ t: { __: e2, u: t2 } }), u2 = r2[0].t, o2 = r2[1];
  return _$1(function() {
    u2.__ = e2, u2.u = t2, R(u2) && o2({ t: u2 });
  }, [n2, e2, t2]), h$1(function() {
    return R(u2) && o2({ t: u2 }), n2(function() {
      R(u2) && o2({ t: u2 });
    });
  }, [n2]), e2;
}
function R(n2) {
  try {
    return !((t2 = n2.__) === (e2 = n2.u()) && (0 !== t2 || 1 / t2 == 1 / e2) || t2 != t2 && e2 != e2);
  } catch (n3) {
    return true;
  }
  var t2, e2;
}
function x$1(n2) {
  n2();
}
function w$1(n2) {
  return n2;
}
function k() {
  return [false, x$1];
}
var I = _$1;
function M(n2, t2) {
  this.props = n2, this.context = t2;
}
function N$1(n2, e2) {
  function r2(n3) {
    var t2 = this.props.ref;
    return t2 != n3.ref && t2 && ("function" == typeof t2 ? t2(null) : t2.current = null), e2 ? !e2(this.props, n3) || t2 != n3.ref : E(this.props, n3);
  }
  function u2(e3) {
    return this.shouldComponentUpdate = r2, k$2(n2, e3);
  }
  return u2.displayName = "Memo(" + (n2.displayName || n2.name) + ")", u2.__f = u2.prototype.isReactComponent = true, u2.type = n2, u2;
}
(M.prototype = new C$3()).isPureReactComponent = true, M.prototype.shouldComponentUpdate = function(n2, t2) {
  return E(this.props, n2) || E(this.state, t2);
};
var T = l$2.__b;
l$2.__b = function(n2) {
  n2.type && n2.type.__f && n2.ref && (n2.props.ref = n2.ref, n2.ref = null), T && T(n2);
};
var A = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function D(n2) {
  function t2(t3) {
    var e2 = g$1({}, t3);
    return delete e2.ref, n2(e2, t3.ref || null);
  }
  return t2.$$typeof = A, t2.render = n2, t2.prototype.isReactComponent = t2.__f = true, t2.displayName = "ForwardRef(" + (n2.displayName || n2.name) + ")", t2;
}
var F = function(n2, t2) {
  return null == n2 ? null : F$2(F$2(n2).map(t2));
}, L = { map: F, forEach: F, count: function(n2) {
  return n2 ? F$2(n2).length : 0;
}, only: function(n2) {
  var t2 = F$2(n2);
  if (1 !== t2.length) throw "Children.only";
  return t2[0];
}, toArray: F$2 }, O = l$2.__e;
l$2.__e = function(n2, t2, e2, r2) {
  if (n2.then) {
    for (var u2, o2 = t2; o2 = o2.__; ) if ((u2 = o2.__c) && u2.__c) return null == t2.__e && (t2.__e = e2.__e, t2.__k = e2.__k || []), u2.__c(n2, t2);
  }
  O(n2, t2, e2, r2);
};
var U = l$2.unmount;
function V(n2, t2, e2) {
  return n2 && (n2.__c && n2.__c.__H && (n2.__c.__H.__.forEach(function(n3) {
    "function" == typeof n3.__c && n3.__c();
  }), n2.__c.__H = null), null != (n2 = g$1({}, n2)).__c && (n2.__c.__P === e2 && (n2.__c.__P = t2), n2.__c.__e = true, n2.__c = null), n2.__k = n2.__k && n2.__k.map(function(n3) {
    return V(n3, t2, e2);
  })), n2;
}
function W(n2, t2, e2) {
  return n2 && e2 && (n2.__v = null, n2.__k = n2.__k && n2.__k.map(function(n3) {
    return W(n3, t2, e2);
  }), n2.__c && n2.__c.__P === t2 && (n2.__e && e2.appendChild(n2.__e), n2.__c.__e = true, n2.__c.__P = e2)), n2;
}
function P$1() {
  this.__u = 0, this.o = null, this.__b = null;
}
function j$1(n2) {
  var t2 = n2.__ && n2.__.__c;
  return t2 && t2.__a && t2.__a(n2);
}
function z(n2) {
  var e2, r2, u2, o2 = null;
  function i2(i3) {
    if (e2 || (e2 = n2()).then(function(n3) {
      n3 && (o2 = n3.default || n3), u2 = true;
    }, function(n3) {
      r2 = n3, u2 = true;
    }), r2) throw r2;
    if (!u2) throw e2;
    return o2 ? k$2(o2, i3) : null;
  }
  return i2.displayName = "Lazy", i2.__f = true, i2;
}
function B() {
  this.i = null, this.l = null;
}
l$2.unmount = function(n2) {
  var t2 = n2.__c;
  t2 && (t2.__z = true), t2 && t2.__R && t2.__R(), t2 && 32 & n2.__u && (n2.type = null), U && U(n2);
}, (P$1.prototype = new C$3()).__c = function(n2, t2) {
  var e2 = t2.__c, r2 = this;
  null == r2.o && (r2.o = []), r2.o.push(e2);
  var u2 = j$1(r2.__v), o2 = false, i2 = function() {
    o2 || r2.__z || (o2 = true, e2.__R = null, u2 ? u2(f2) : f2());
  };
  e2.__R = i2;
  var l2 = e2.__P;
  e2.__P = null;
  var f2 = function() {
    if (!--r2.__u) {
      if (r2.state.__a) {
        var n3 = r2.state.__a;
        r2.__v.__k[0] = W(n3, n3.__c.__P, n3.__c.__O);
      }
      var t3;
      for (r2.setState({ __a: r2.__b = null }); t3 = r2.o.pop(); ) t3.__P = l2, t3.forceUpdate();
    }
  };
  r2.__u++ || 32 & t2.__u || r2.setState({ __a: r2.__b = r2.__v.__k[0] }), n2.then(i2, i2);
}, P$1.prototype.componentWillUnmount = function() {
  this.o = [];
}, P$1.prototype.render = function(n2, e2) {
  if (this.__b) {
    if (this.__v.__k) {
      var r2 = document.createElement("div"), o2 = this.__v.__k[0].__c;
      this.__v.__k[0] = V(this.__b, r2, o2.__O = o2.__P);
    }
    this.__b = null;
  }
  var i2 = e2.__a && k$2(S$1, null, n2.fallback);
  return i2 && (i2.__u &= -33), [k$2(S$1, null, e2.__a ? null : n2.children), i2];
};
var H = function(n2, t2, e2) {
  if (++e2[1] === e2[0] && n2.l.delete(t2), n2.props.revealOrder && ("t" !== n2.props.revealOrder[0] || !n2.l.size)) for (e2 = n2.i; e2; ) {
    for (; e2.length > 3; ) e2.pop()();
    if (e2[1] < e2[0]) break;
    n2.i = e2 = e2[2];
  }
};
function Z(n2) {
  return this.getChildContext = function() {
    return n2.context;
  }, n2.children;
}
function Y(n2) {
  var e2 = this, r2 = n2.h;
  if (e2.componentWillUnmount = function() {
    R$1(null, e2.v), e2.v = null, e2.h = null;
  }, e2.h && e2.h !== r2 && e2.componentWillUnmount(), !e2.v) {
    for (var u2 = e2.__v; null !== u2 && !u2.__m && null !== u2.__; ) u2 = u2.__;
    e2.h = r2, e2.v = { nodeType: 1, parentNode: r2, childNodes: [], __k: { __m: u2.__m }, contains: function() {
      return true;
    }, namespaceURI: r2.namespaceURI, insertBefore: function(n3, t2) {
      this.childNodes.push(n3), e2.h.insertBefore(n3, t2);
    }, removeChild: function(n3) {
      this.childNodes.splice(this.childNodes.indexOf(n3) >>> 1, 1), e2.h.removeChild(n3);
    } };
  }
  R$1(k$2(Z, { context: e2.context }, n2.__v), e2.v);
}
function $$1(n2, e2) {
  var r2 = k$2(Y, { __v: n2, h: e2 });
  return r2.containerInfo = e2, r2;
}
(B.prototype = new C$3()).__a = function(n2) {
  var t2 = this, e2 = j$1(t2.__v), r2 = t2.l.get(n2);
  return r2[0]++, function(u2) {
    var o2 = function() {
      t2.props.revealOrder ? (r2.push(u2), H(t2, n2, r2)) : u2();
    };
    e2 ? e2(o2) : o2();
  };
}, B.prototype.render = function(n2) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t2 = F$2(n2.children);
  n2.revealOrder && "b" === n2.revealOrder[0] && t2.reverse();
  for (var e2 = t2.length; e2--; ) this.l.set(t2[e2], this.i = [1, 0, this.i]);
  return n2.children;
}, B.prototype.componentDidUpdate = B.prototype.componentDidMount = function() {
  var n2 = this;
  this.l.forEach(function(t2, e2) {
    H(n2, e2, t2);
  });
};
var q = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, G = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, J = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, K = /[A-Z0-9]/g, Q = "undefined" != typeof document, X = function(n2) {
  return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n2);
};
function nn(n2, t2, e2) {
  return null == t2.__k && (t2.textContent = ""), R$1(n2, t2), "function" == typeof e2 && e2(), n2 ? n2.__c : null;
}
function tn(n2, t2, e2) {
  return U$1(n2, t2), "function" == typeof e2 && e2(), n2 ? n2.__c : null;
}
C$3.prototype.isReactComponent = true, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t2) {
  Object.defineProperty(C$3.prototype, t2, { configurable: true, get: function() {
    return this["UNSAFE_" + t2];
  }, set: function(n2) {
    Object.defineProperty(this, t2, { configurable: true, writable: true, value: n2 });
  } });
});
var en = l$2.event;
l$2.event = function(n2) {
  return en && (n2 = en(n2)), n2.persist = function() {
  }, n2.isPropagationStopped = function() {
    return this.cancelBubble;
  }, n2.isDefaultPrevented = function() {
    return this.defaultPrevented;
  }, n2.nativeEvent = n2;
};
var rn, un = { configurable: true, get: function() {
  return this.class;
} }, on = l$2.vnode;
l$2.vnode = function(n2) {
  "string" == typeof n2.type && (function(n3) {
    var t2 = n3.props, e2 = n3.type, u2 = {}, o2 = -1 == e2.indexOf("-");
    for (var i2 in t2) {
      var l2 = t2[i2];
      if (!("value" === i2 && "defaultValue" in t2 && null == l2 || Q && "children" === i2 && "noscript" === e2 || "class" === i2 || "className" === i2)) {
        var f2 = i2.toLowerCase();
        "defaultValue" === i2 && "value" in t2 && null == t2.value ? i2 = "value" : "download" === i2 && true === l2 ? l2 = "" : "translate" === f2 && "no" === l2 ? l2 = false : "o" === f2[0] && "n" === f2[1] ? "ondoubleclick" === f2 ? i2 = "ondblclick" : "onchange" !== f2 || "input" !== e2 && "textarea" !== e2 || X(t2.type) ? "onfocus" === f2 ? i2 = "onfocusin" : "onblur" === f2 ? i2 = "onfocusout" : J.test(i2) && (i2 = f2) : f2 = i2 = "oninput" : o2 && G.test(i2) ? i2 = i2.replace(K, "-$&").toLowerCase() : null === l2 && (l2 = void 0), "oninput" === f2 && u2[i2 = f2] && (i2 = "oninputCapture"), u2[i2] = l2;
      }
    }
    "select" == e2 && (u2.multiple && Array.isArray(u2.value) && (u2.value = F$2(t2.children).forEach(function(n4) {
      n4.props.selected = -1 != u2.value.indexOf(n4.props.value);
    })), null != u2.defaultValue && (u2.value = F$2(t2.children).forEach(function(n4) {
      n4.props.selected = u2.multiple ? -1 != u2.defaultValue.indexOf(n4.props.value) : u2.defaultValue == n4.props.value;
    }))), t2.class && !t2.className ? (u2.class = t2.class, Object.defineProperty(u2, "className", un)) : t2.className && (u2.class = u2.className = t2.className), n3.props = u2;
  })(n2), n2.$$typeof = q, on && on(n2);
};
var ln = l$2.__r;
l$2.__r = function(n2) {
  ln && ln(n2), rn = n2.__c;
};
var fn = l$2.diffed;
l$2.diffed = function(n2) {
  fn && fn(n2);
  var t2 = n2.props, e2 = n2.__e;
  null != e2 && "textarea" === n2.type && "value" in t2 && t2.value !== e2.value && (e2.value = null == t2.value ? "" : t2.value), rn = null;
};
var an = { ReactCurrentDispatcher: { current: { readContext: function(n2) {
  return rn.__n[n2.__c].props.value;
}, useCallback: q$1, useContext: x$2, useDebugValue: P$2, useDeferredValue: w$1, useEffect: h$1, useId: g$2, useImperativeHandle: F$1, useInsertionEffect: I, useLayoutEffect: _$1, useMemo: T$1, useReducer: y$1, useRef: A$1, useState: d$1, useSyncExternalStore: C$1, useTransition: k } } }, cn = "18.3.1";
function sn(n2) {
  return k$2.bind(null, n2);
}
function hn(n2) {
  return !!n2 && n2.$$typeof === q;
}
function vn(n2) {
  return hn(n2) && n2.type === S$1;
}
function dn(n2) {
  return !!n2 && "string" == typeof n2.displayName && 0 == n2.displayName.indexOf("Memo(");
}
function mn(n2) {
  return hn(n2) ? W$1.apply(null, arguments) : n2;
}
function pn(n2) {
  return !!n2.__k && (R$1(null, n2), true);
}
function yn(n2) {
  return n2 && (n2.base || 1 === n2.nodeType && n2) || null;
}
var _n = function(n2, t2) {
  return n2(t2);
}, bn = function(n2, t2) {
  var r2, u2 = l$2.debounceRendering;
  l$2.debounceRendering = function(n3) {
    r2 = n3;
  };
  try {
    var o2 = n2(t2);
    return r2 && r2(), o2;
  } finally {
    l$2.debounceRendering = u2;
  }
}, Sn = hn, gn = { useState: d$1, useId: g$2, useReducer: y$1, useEffect: h$1, useLayoutEffect: _$1, useInsertionEffect: I, useTransition: k, useDeferredValue: w$1, useSyncExternalStore: C$1, startTransition: x$1, useRef: A$1, useImperativeHandle: F$1, useMemo: T$1, useCallback: q$1, useContext: x$2, useDebugValue: P$2, version: "18.3.1", Children: L, render: nn, hydrate: tn, unmountComponentAtNode: pn, createPortal: $$1, createElement: k$2, createContext: X$1, createFactory: sn, cloneElement: mn, createRef: M$1, Fragment: S$1, isValidElement: hn, isElement: Sn, isFragment: vn, isMemo: dn, findDOMNode: yn, Component: C$3, PureComponent: M, memo: N$1, forwardRef: D, flushSync: bn, unstable_batchedUpdates: _n, StrictMode: S$1, Suspense: P$1, SuspenseList: B, lazy: z, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: an };
const compat_module = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Children: L,
  Component: C$3,
  Fragment: S$1,
  PureComponent: M,
  StrictMode: S$1,
  Suspense: P$1,
  SuspenseList: B,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: an,
  cloneElement: mn,
  createContext: X$1,
  createElement: k$2,
  createFactory: sn,
  createPortal: $$1,
  createRef: M$1,
  default: gn,
  findDOMNode: yn,
  flushSync: bn,
  forwardRef: D,
  hydrate: tn,
  isElement: Sn,
  isFragment: vn,
  isMemo: dn,
  isValidElement: hn,
  lazy: z,
  memo: N$1,
  render: nn,
  startTransition: x$1,
  unmountComponentAtNode: pn,
  unstable_batchedUpdates: _n,
  useCallback: q$1,
  useContext: x$2,
  useDebugValue: P$2,
  useDeferredValue: w$1,
  useEffect: h$1,
  useErrorBoundary: b$1,
  useId: g$2,
  useImperativeHandle: F$1,
  useInsertionEffect: I,
  useLayoutEffect: _$1,
  useMemo: T$1,
  useReducer: y$1,
  useRef: A$1,
  useState: d$1,
  useSyncExternalStore: C$1,
  useTransition: k,
  version: cn
}, Symbol.toStringTag, { value: "Module" }));
function createRoot(container) {
  return {
    // eslint-disable-next-line
    render: function(children) {
      nn(children, container);
    },
    // eslint-disable-next-line
    unmount: function() {
      pn(container);
    }
  };
}
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = gn.createContext && /* @__PURE__ */ gn.createContext(DefaultContext);
var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(e2, t2) {
  if (null == e2) return {};
  var o2, r2, i2 = _objectWithoutPropertiesLoose(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < n2.length; r2++) o2 = n2[r2], -1 === t2.indexOf(o2) && {}.propertyIsEnumerable.call(e2, o2) && (i2[o2] = e2[o2]);
  }
  return i2;
}
function _objectWithoutPropertiesLoose(r2, e2) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e2.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var t2 = arguments[e2];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends.apply(null, arguments);
}
function ownKeys(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys(Object(t2), true).forEach(function(r3) {
      _defineProperty(e2, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e2;
}
function _defineProperty(e2, r2, t2) {
  return (r2 = _toPropertyKey(r2)) in e2 ? Object.defineProperty(e2, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e2[r2] = t2, e2;
}
function _toPropertyKey(t2) {
  var i2 = _toPrimitive(t2, "string");
  return "symbol" == typeof i2 ? i2 : i2 + "";
}
function _toPrimitive(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i2 = e2.call(t2, r2);
    if ("object" != typeof i2) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function Tree2Element(tree) {
  return tree && tree.map((node, i2) => /* @__PURE__ */ gn.createElement(node.tag, _objectSpread({
    key: i2
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return (props) => /* @__PURE__ */ gn.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = (conf) => {
    var attr = props.attr, size = props.size, title = props.title, svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /* @__PURE__ */ gn.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /* @__PURE__ */ gn.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? /* @__PURE__ */ gn.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}
function keys(object) {
  return Object.keys(object);
}
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
function deepMerge(target, source) {
  const result = { ...target };
  const _source = source;
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(_source[key])) {
        if (!(key in target)) {
          result[key] = _source[key];
        } else {
          result[key] = deepMerge(result[key], _source[key]);
        }
      } else {
        result[key] = _source[key];
      }
    });
  }
  return result;
}
function camelToKebabCase(value) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}
function getTransformedScaledValue(value) {
  if (typeof value !== "string" || !value.includes("var(--mantine-scale)")) {
    return value;
  }
  return value.match(/^calc\((.*?)\)$/)?.[1].split("*")[0].trim();
}
function px(value) {
  const transformedValue = getTransformedScaledValue(value);
  if (typeof transformedValue === "number") {
    return transformedValue;
  }
  if (typeof transformedValue === "string") {
    if (transformedValue.includes("calc") || transformedValue.includes("var")) {
      return transformedValue;
    }
    if (transformedValue.includes("px")) {
      return Number(transformedValue.replace("px", ""));
    }
    if (transformedValue.includes("rem")) {
      return Number(transformedValue.replace("rem", "")) * 16;
    }
    if (transformedValue.includes("em")) {
      return Number(transformedValue.replace("em", "")) * 16;
    }
    return Number(transformedValue);
  }
  return NaN;
}
function scaleRem(remValue) {
  if (remValue === "0rem") {
    return "0rem";
  }
  return `calc(${remValue} * var(--mantine-scale))`;
}
function createConverter(units, { shouldScale = false } = {}) {
  function converter(value) {
    if (value === 0 || value === "0") {
      return `0${units}`;
    }
    if (typeof value === "number") {
      const val = `${value / 16}${units}`;
      return shouldScale ? scaleRem(val) : val;
    }
    if (typeof value === "string") {
      if (value === "") {
        return value;
      }
      if (value.startsWith("calc(") || value.startsWith("clamp(") || value.includes("rgba(")) {
        return value;
      }
      if (value.includes(",")) {
        return value.split(",").map((val) => converter(val)).join(",");
      }
      if (value.includes(" ")) {
        return value.split(" ").map((val) => converter(val)).join(" ");
      }
      const replaced = value.replace("px", "");
      if (!Number.isNaN(Number(replaced))) {
        const val = `${Number(replaced) / 16}${units}`;
        return shouldScale ? scaleRem(val) : val;
      }
    }
    return value;
  }
  return converter;
}
const rem = createConverter("rem", { shouldScale: true });
const em = createConverter("em");
function filterProps(props) {
  return Object.keys(props).reduce((acc, key) => {
    if (props[key] !== void 0) {
      acc[key] = props[key];
    }
    return acc;
  }, {});
}
function isNumberLike(value) {
  if (typeof value === "number") {
    return true;
  }
  if (typeof value === "string") {
    if (value.startsWith("calc(") || value.startsWith("var(") || value.includes(" ") && value.trim() !== "") {
      return true;
    }
    const cssUnitsRegex = /^[+-]?[0-9]+(\.[0-9]+)?(px|em|rem|ex|ch|lh|rlh|vw|vh|vmin|vmax|vb|vi|svw|svh|lvw|lvh|dvw|dvh|cm|mm|in|pt|pc|q|cqw|cqh|cqi|cqb|cqmin|cqmax|%)?$/;
    const values2 = value.trim().split(/\s+/);
    return values2.every((val) => cssUnitsRegex.test(val));
  }
  return false;
}
var f = 0;
function u(e2, t2, n2, o2, i2, u2) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f, __i: -1, __u: 0, __source: i2, __self: u2 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l$2.vnode && l$2.vnode(l2), l2;
}
function createSafeContext(errorMessage) {
  const Context = X$1(null);
  const useSafeContext = () => {
    const ctx = x$2(Context);
    if (ctx === null) {
      throw new Error(errorMessage);
    }
    return ctx;
  };
  const Provider = ({ children, value }) => /* @__PURE__ */ u(Context.Provider, { value, children });
  return [Provider, useSafeContext];
}
function getSafeId(uid, errorMessage) {
  return (value) => {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new Error(errorMessage);
    }
    return `${uid}-${value}`;
  };
}
function findElementAncestor(element, selector) {
  let _element = element;
  while ((_element = _element.parentElement) && !_element.matches(selector)) {
  }
  return _element;
}
function getPreviousIndex(current, elements, loop) {
  for (let i2 = current - 1; i2 >= 0; i2 -= 1) {
    if (!elements[i2].disabled) {
      return i2;
    }
  }
  if (loop) {
    for (let i2 = elements.length - 1; i2 > -1; i2 -= 1) {
      if (!elements[i2].disabled) {
        return i2;
      }
    }
  }
  return current;
}
function getNextIndex(current, elements, loop) {
  for (let i2 = current + 1; i2 < elements.length; i2 += 1) {
    if (!elements[i2].disabled) {
      return i2;
    }
  }
  if (loop) {
    for (let i2 = 0; i2 < elements.length; i2 += 1) {
      if (!elements[i2].disabled) {
        return i2;
      }
    }
  }
  return current;
}
function onSameLevel(target, sibling, parentSelector) {
  return findElementAncestor(target, parentSelector) === findElementAncestor(sibling, parentSelector);
}
function createScopedKeydownHandler({
  parentSelector,
  siblingSelector,
  onKeyDown,
  loop = true,
  activateOnFocus = false,
  dir = "rtl",
  orientation
}) {
  return (event) => {
    onKeyDown?.(event);
    const elements = Array.from(
      findElementAncestor(event.currentTarget, parentSelector)?.querySelectorAll(
        siblingSelector
      ) || []
    ).filter((node) => onSameLevel(event.currentTarget, node, parentSelector));
    const current = elements.findIndex((el) => event.currentTarget === el);
    const _nextIndex = getNextIndex(current, elements, loop);
    const _previousIndex = getPreviousIndex(current, elements, loop);
    const nextIndex = dir === "rtl" ? _previousIndex : _nextIndex;
    const previousIndex = dir === "rtl" ? _nextIndex : _previousIndex;
    switch (event.key) {
      case "ArrowRight": {
        if (orientation === "horizontal") {
          event.stopPropagation();
          event.preventDefault();
          elements[nextIndex].focus();
          activateOnFocus && elements[nextIndex].click();
        }
        break;
      }
      case "ArrowLeft": {
        if (orientation === "horizontal") {
          event.stopPropagation();
          event.preventDefault();
          elements[previousIndex].focus();
          activateOnFocus && elements[previousIndex].click();
        }
        break;
      }
      case "ArrowUp": {
        if (orientation === "vertical") {
          event.stopPropagation();
          event.preventDefault();
          elements[_previousIndex].focus();
          activateOnFocus && elements[_previousIndex].click();
        }
        break;
      }
      case "ArrowDown": {
        if (orientation === "vertical") {
          event.stopPropagation();
          event.preventDefault();
          elements[_nextIndex].focus();
          activateOnFocus && elements[_nextIndex].click();
        }
        break;
      }
      case "Home": {
        event.stopPropagation();
        event.preventDefault();
        !elements[0].disabled && elements[0].focus();
        break;
      }
      case "End": {
        event.stopPropagation();
        event.preventDefault();
        const last = elements.length - 1;
        !elements[last].disabled && elements[last].focus();
        break;
      }
    }
  };
}
const elevations = {
  app: 100,
  modal: 200,
  popover: 300,
  overlay: 400,
  max: 9999
};
function getDefaultZIndex(level) {
  return elevations[level];
}
function getSize(size, prefix = "size", convertToRem = true) {
  if (size === void 0) {
    return void 0;
  }
  return isNumberLike(size) ? convertToRem ? rem(size) : size : `var(--${prefix}-${size})`;
}
function getSpacing(size) {
  return getSize(size, "mantine-spacing");
}
function getRadius(size) {
  if (size === void 0) {
    return "var(--mantine-radius-default)";
  }
  return getSize(size, "mantine-radius");
}
function getFontSize(size) {
  return getSize(size, "mantine-font-size");
}
function getLineHeight(size) {
  return getSize(size, "mantine-line-height", false);
}
function randomId(prefix = "mantine-") {
  return `${prefix}${Math.random().toString(36).slice(2, 11)}`;
}
function useCallbackRef(callback) {
  const callbackRef = A$1(callback);
  h$1(() => {
    callbackRef.current = callback;
  });
  return T$1(() => ((...args) => callbackRef.current?.(...args)), []);
}
function useDebouncedCallback(callback, options) {
  const { delay, flushOnUnmount, leading } = typeof options === "number" ? { delay: options, flushOnUnmount: false, leading: false } : options;
  const handleCallback = useCallbackRef(callback);
  const debounceTimerRef = A$1(0);
  const lastCallback = T$1(() => {
    const currentCallback = Object.assign(
      (...args) => {
        window.clearTimeout(debounceTimerRef.current);
        const isFirstCall = currentCallback._isFirstCall;
        currentCallback._isFirstCall = false;
        function clearTimeoutAndLeadingRef() {
          window.clearTimeout(debounceTimerRef.current);
          debounceTimerRef.current = 0;
          currentCallback._isFirstCall = true;
        }
        if (leading && isFirstCall) {
          handleCallback(...args);
          const resetLeadingState = () => {
            clearTimeoutAndLeadingRef();
          };
          const flush2 = () => {
            if (debounceTimerRef.current !== 0) {
              clearTimeoutAndLeadingRef();
              handleCallback(...args);
            }
          };
          const cancel2 = () => {
            clearTimeoutAndLeadingRef();
          };
          currentCallback.flush = flush2;
          currentCallback.cancel = cancel2;
          debounceTimerRef.current = window.setTimeout(resetLeadingState, delay);
          return;
        }
        if (leading && !isFirstCall) {
          const flush2 = () => {
            if (debounceTimerRef.current !== 0) {
              clearTimeoutAndLeadingRef();
              handleCallback(...args);
            }
          };
          const cancel2 = () => {
            clearTimeoutAndLeadingRef();
          };
          currentCallback.flush = flush2;
          currentCallback.cancel = cancel2;
          const resetLeadingState = () => {
            clearTimeoutAndLeadingRef();
          };
          debounceTimerRef.current = window.setTimeout(resetLeadingState, delay);
          return;
        }
        const flush = () => {
          if (debounceTimerRef.current !== 0) {
            clearTimeoutAndLeadingRef();
            handleCallback(...args);
          }
        };
        const cancel = () => {
          clearTimeoutAndLeadingRef();
        };
        currentCallback.flush = flush;
        currentCallback.cancel = cancel;
        debounceTimerRef.current = window.setTimeout(flush, delay);
      },
      {
        flush: () => {
        },
        cancel: () => {
        },
        _isFirstCall: true
      }
    );
    return currentCallback;
  }, [handleCallback, delay, leading]);
  h$1(
    () => () => {
      if (flushOnUnmount) {
        lastCallback.flush();
      } else {
        lastCallback.cancel();
      }
    },
    [lastCallback, flushOnUnmount]
  );
  return lastCallback;
}
const useIsomorphicEffect = typeof document !== "undefined" ? _$1 : h$1;
const __useId = gn["useId".toString()] || (() => void 0);
function useReactId() {
  const id = __useId();
  return id ? `mantine-${id.replace(/:/g, "")}` : "";
}
function useId(staticId) {
  const reactId = useReactId();
  const [uuid, setUuid] = d$1(reactId);
  useIsomorphicEffect(() => {
    setUuid(randomId());
  }, []);
  if (typeof staticId === "string") {
    return staticId;
  }
  if (typeof window === "undefined") {
    return reactId;
  }
  return uuid;
}
function assignRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (typeof ref === "object" && ref !== null && "current" in ref) {
    ref.current = value;
  }
}
function mergeRefs(...refs) {
  const cleanupMap = /* @__PURE__ */ new Map();
  return (node) => {
    refs.forEach((ref) => {
      const cleanup = assignRef(ref, node);
      if (cleanup) {
        cleanupMap.set(ref, cleanup);
      }
    });
    if (cleanupMap.size > 0) {
      return () => {
        refs.forEach((ref) => {
          const cleanup = cleanupMap.get(ref);
          if (cleanup && typeof cleanup === "function") {
            cleanup();
          } else {
            assignRef(ref, null);
          }
        });
        cleanupMap.clear();
      };
    }
  };
}
function useMergedRef(...refs) {
  return q$1(mergeRefs(...refs), refs);
}
function useUncontrolled({
  value,
  defaultValue,
  finalValue,
  onChange = () => {
  }
}) {
  const [uncontrolledValue, setUncontrolledValue] = d$1(
    defaultValue !== void 0 ? defaultValue : finalValue
  );
  const handleUncontrolledChange = (val, ...payload) => {
    setUncontrolledValue(val);
    onChange?.(val, ...payload);
  };
  if (value !== void 0) {
    return [value, onChange, true];
  }
  return [uncontrolledValue, handleUncontrolledChange, false];
}
function createVarsResolver(resolver) {
  return resolver;
}
function r(e2) {
  var t2, f2, n2 = "";
  if ("string" == typeof e2 || "number" == typeof e2) n2 += e2;
  else if ("object" == typeof e2) if (Array.isArray(e2)) {
    var o2 = e2.length;
    for (t2 = 0; t2 < o2; t2++) e2[t2] && (f2 = r(e2[t2])) && (n2 && (n2 += " "), n2 += f2);
  } else for (f2 in e2) e2[f2] && (n2 && (n2 += " "), n2 += f2);
  return n2;
}
function clsx() {
  for (var e2, t2, f2 = 0, n2 = "", o2 = arguments.length; f2 < o2; f2++) (e2 = arguments[f2]) && (t2 = r(e2)) && (n2 && (n2 += " "), n2 += t2);
  return n2;
}
const EMPTY_CLASS_NAMES = {};
function mergeClassNames(objects) {
  const merged = {};
  objects.forEach((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (merged[key]) {
        merged[key] = clsx(merged[key], value);
      } else {
        merged[key] = value;
      }
    });
  });
  return merged;
}
function resolveClassNames({ theme: theme2, classNames, props, stylesCtx }) {
  const arrayClassNames = Array.isArray(classNames) ? classNames : [classNames];
  const resolvedClassNames = arrayClassNames.map(
    (item) => typeof item === "function" ? item(theme2, props, stylesCtx) : item || EMPTY_CLASS_NAMES
  );
  return mergeClassNames(resolvedClassNames);
}
function resolveStyles({ theme: theme2, styles, props, stylesCtx }) {
  const arrayStyles = Array.isArray(styles) ? styles : [styles];
  return arrayStyles.reduce((acc, style) => {
    if (typeof style === "function") {
      return { ...acc, ...style(theme2, props, stylesCtx) };
    }
    return { ...acc, ...style };
  }, {});
}
const MantineContext = X$1(null);
function useMantineContext() {
  const ctx = x$2(MantineContext);
  if (!ctx) {
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  }
  return ctx;
}
function useMantineCssVariablesResolver() {
  return useMantineContext().cssVariablesResolver;
}
function useMantineClassNamesPrefix() {
  return useMantineContext().classNamesPrefix;
}
function useMantineStyleNonce() {
  return useMantineContext().getStyleNonce;
}
function useMantineWithStaticClasses() {
  return useMantineContext().withStaticClasses;
}
function useMantineIsHeadless() {
  return useMantineContext().headless;
}
function useMantineSxTransform() {
  return useMantineContext().stylesTransform?.sx;
}
function useMantineStylesTransform() {
  return useMantineContext().stylesTransform?.styles;
}
function useMantineEnv() {
  return useMantineContext().env || "default";
}
function isHexColor(hex) {
  const HEX_REGEXP = /^#?([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i;
  return HEX_REGEXP.test(hex);
}
function hexToRgba(color) {
  let hexString = color.replace("#", "");
  if (hexString.length === 3) {
    const shorthandHex = hexString.split("");
    hexString = [
      shorthandHex[0],
      shorthandHex[0],
      shorthandHex[1],
      shorthandHex[1],
      shorthandHex[2],
      shorthandHex[2]
    ].join("");
  }
  if (hexString.length === 8) {
    const alpha2 = parseInt(hexString.slice(6, 8), 16) / 255;
    return {
      r: parseInt(hexString.slice(0, 2), 16),
      g: parseInt(hexString.slice(2, 4), 16),
      b: parseInt(hexString.slice(4, 6), 16),
      a: alpha2
    };
  }
  const parsed = parseInt(hexString, 16);
  const r2 = parsed >> 16 & 255;
  const g2 = parsed >> 8 & 255;
  const b2 = parsed & 255;
  return {
    r: r2,
    g: g2,
    b: b2,
    a: 1
  };
}
function rgbStringToRgba(color) {
  const [r2, g2, b2, a2] = color.replace(/[^0-9,./]/g, "").split(/[/,]/).map(Number);
  return { r: r2, g: g2, b: b2, a: a2 === void 0 ? 1 : a2 };
}
function hslStringToRgba(hslaString) {
  const hslaRegex = /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i;
  const matches = hslaString.match(hslaRegex);
  if (!matches) {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  }
  const h2 = parseInt(matches[1], 10);
  const s2 = parseInt(matches[2], 10) / 100;
  const l2 = parseInt(matches[3], 10) / 100;
  const a2 = matches[5] ? parseFloat(matches[5]) : void 0;
  const chroma = (1 - Math.abs(2 * l2 - 1)) * s2;
  const huePrime = h2 / 60;
  const x2 = chroma * (1 - Math.abs(huePrime % 2 - 1));
  const m2 = l2 - chroma / 2;
  let r2;
  let g2;
  let b2;
  if (huePrime >= 0 && huePrime < 1) {
    r2 = chroma;
    g2 = x2;
    b2 = 0;
  } else if (huePrime >= 1 && huePrime < 2) {
    r2 = x2;
    g2 = chroma;
    b2 = 0;
  } else if (huePrime >= 2 && huePrime < 3) {
    r2 = 0;
    g2 = chroma;
    b2 = x2;
  } else if (huePrime >= 3 && huePrime < 4) {
    r2 = 0;
    g2 = x2;
    b2 = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    r2 = x2;
    g2 = 0;
    b2 = chroma;
  } else {
    r2 = chroma;
    g2 = 0;
    b2 = x2;
  }
  return {
    r: Math.round((r2 + m2) * 255),
    g: Math.round((g2 + m2) * 255),
    b: Math.round((b2 + m2) * 255),
    a: a2 || 1
  };
}
function toRgba(color) {
  if (isHexColor(color)) {
    return hexToRgba(color);
  }
  if (color.startsWith("rgb")) {
    return rgbStringToRgba(color);
  }
  if (color.startsWith("hsl")) {
    return hslStringToRgba(color);
  }
  return {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}
function darken(color, alpha2) {
  if (color.startsWith("var(")) {
    return `color-mix(in srgb, ${color}, black ${alpha2 * 100}%)`;
  }
  const { r: r2, g: g2, b: b2, a: a2 } = toRgba(color);
  const f2 = 1 - alpha2;
  const dark = (input) => Math.round(input * f2);
  return `rgba(${dark(r2)}, ${dark(g2)}, ${dark(b2)}, ${a2})`;
}
function getPrimaryShade(theme2, colorScheme) {
  if (typeof theme2.primaryShade === "number") {
    return theme2.primaryShade;
  }
  if (colorScheme === "dark") {
    return theme2.primaryShade.dark;
  }
  return theme2.primaryShade.light;
}
function gammaCorrect(c2) {
  return c2 <= 0.03928 ? c2 / 12.92 : ((c2 + 0.055) / 1.055) ** 2.4;
}
function getLightnessFromOklch(oklchColor) {
  const match = oklchColor.match(/oklch\((.*?)%\s/);
  return match ? parseFloat(match[1]) : null;
}
function luminance(color) {
  if (color.startsWith("oklch(")) {
    return (getLightnessFromOklch(color) || 0) / 100;
  }
  const { r: r2, g: g2, b: b2 } = toRgba(color);
  const sR = r2 / 255;
  const sG = g2 / 255;
  const sB = b2 / 255;
  const rLinear = gammaCorrect(sR);
  const gLinear = gammaCorrect(sG);
  const bLinear = gammaCorrect(sB);
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}
function isLightColor(color, luminanceThreshold = 0.179) {
  if (color.startsWith("var(")) {
    return false;
  }
  return luminance(color) > luminanceThreshold;
}
function parseThemeColor({
  color,
  theme: theme2,
  colorScheme
}) {
  if (typeof color !== "string") {
    throw new Error(
      `[@mantine/core] Failed to parse color. Expected color to be a string, instead got ${typeof color}`
    );
  }
  if (color === "bright") {
    return {
      color,
      value: colorScheme === "dark" ? theme2.white : theme2.black,
      shade: void 0,
      isThemeColor: false,
      isLight: isLightColor(
        colorScheme === "dark" ? theme2.white : theme2.black,
        theme2.luminanceThreshold
      ),
      variable: "--mantine-color-bright"
    };
  }
  if (color === "dimmed") {
    return {
      color,
      value: colorScheme === "dark" ? theme2.colors.dark[2] : theme2.colors.gray[7],
      shade: void 0,
      isThemeColor: false,
      isLight: isLightColor(
        colorScheme === "dark" ? theme2.colors.dark[2] : theme2.colors.gray[6],
        theme2.luminanceThreshold
      ),
      variable: "--mantine-color-dimmed"
    };
  }
  if (color === "white" || color === "black") {
    return {
      color,
      value: color === "white" ? theme2.white : theme2.black,
      shade: void 0,
      isThemeColor: false,
      isLight: isLightColor(
        color === "white" ? theme2.white : theme2.black,
        theme2.luminanceThreshold
      ),
      variable: `--mantine-color-${color}`
    };
  }
  const [_color, shade] = color.split(".");
  const colorShade = shade ? Number(shade) : void 0;
  const isThemeColor = _color in theme2.colors;
  if (isThemeColor) {
    const colorValue = colorShade !== void 0 ? theme2.colors[_color][colorShade] : theme2.colors[_color][getPrimaryShade(theme2, colorScheme || "light")];
    return {
      color: _color,
      value: colorValue,
      shade: colorShade,
      isThemeColor,
      isLight: isLightColor(colorValue, theme2.luminanceThreshold),
      variable: shade ? `--mantine-color-${_color}-${colorShade}` : `--mantine-color-${_color}-filled`
    };
  }
  return {
    color,
    value: color,
    isThemeColor,
    isLight: isLightColor(color, theme2.luminanceThreshold),
    shade: colorShade,
    variable: void 0
  };
}
function getThemeColor(color, theme2) {
  const parsed = parseThemeColor({ color: color || theme2.primaryColor, theme: theme2 });
  return parsed.variable ? `var(${parsed.variable})` : color;
}
function getGradient(gradient, theme2) {
  const merged = {
    from: gradient?.from || theme2.defaultGradient.from,
    to: gradient?.to || theme2.defaultGradient.to,
    deg: gradient?.deg ?? theme2.defaultGradient.deg ?? 0
  };
  const fromColor = getThemeColor(merged.from, theme2);
  const toColor = getThemeColor(merged.to, theme2);
  return `linear-gradient(${merged.deg}deg, ${fromColor} 0%, ${toColor} 100%)`;
}
function rgba(color, alpha2) {
  if (typeof color !== "string" || alpha2 > 1 || alpha2 < 0) {
    return "rgba(0, 0, 0, 1)";
  }
  if (color.startsWith("var(")) {
    const mixPercentage = (1 - alpha2) * 100;
    return `color-mix(in srgb, ${color}, transparent ${mixPercentage}%)`;
  }
  if (color.startsWith("oklch")) {
    if (color.includes("/")) {
      return color.replace(/\/\s*[\d.]+\s*\)/, `/ ${alpha2})`);
    }
    return color.replace(")", ` / ${alpha2})`);
  }
  const { r: r2, g: g2, b: b2 } = toRgba(color);
  return `rgba(${r2}, ${g2}, ${b2}, ${alpha2})`;
}
const alpha = rgba;
const defaultVariantColorsResolver = ({
  color,
  theme: theme2,
  variant,
  gradient,
  autoContrast
}) => {
  const parsed = parseThemeColor({ color, theme: theme2 });
  const _autoContrast = typeof autoContrast === "boolean" ? autoContrast : theme2.autoContrast;
  if (variant === "none") {
    return {
      background: "transparent",
      hover: "transparent",
      color: "inherit",
      border: "none"
    };
  }
  if (variant === "filled") {
    const textColor = _autoContrast ? parsed.isLight ? "var(--mantine-color-black)" : "var(--mantine-color-white)" : "var(--mantine-color-white)";
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: `var(--mantine-color-${color}-filled)`,
          hover: `var(--mantine-color-${color}-filled-hover)`,
          color: textColor,
          border: `${rem(1)} solid transparent`
        };
      }
      return {
        background: `var(--mantine-color-${parsed.color}-${parsed.shade})`,
        hover: `var(--mantine-color-${parsed.color}-${parsed.shade === 9 ? 8 : parsed.shade + 1})`,
        color: textColor,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: color,
      hover: darken(color, 0.1),
      color: textColor,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "light") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: `var(--mantine-color-${color}-light)`,
          hover: `var(--mantine-color-${color}-light-hover)`,
          color: `var(--mantine-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`
        };
      }
      const parsedColor = theme2.colors[parsed.color][parsed.shade];
      return {
        background: rgba(parsedColor, 0.1),
        hover: rgba(parsedColor, 0.12),
        color: `var(--mantine-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: rgba(color, 0.1),
      hover: rgba(color, 0.12),
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "outline") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "transparent",
          hover: `var(--mantine-color-${color}-outline-hover)`,
          color: `var(--mantine-color-${color}-outline)`,
          border: `${rem(1)} solid var(--mantine-color-${color}-outline)`
        };
      }
      return {
        background: "transparent",
        hover: rgba(theme2.colors[parsed.color][parsed.shade], 0.05),
        color: `var(--mantine-color-${parsed.color}-${parsed.shade})`,
        border: `${rem(1)} solid var(--mantine-color-${parsed.color}-${parsed.shade})`
      };
    }
    return {
      background: "transparent",
      hover: rgba(color, 0.05),
      color,
      border: `${rem(1)} solid ${color}`
    };
  }
  if (variant === "subtle") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "transparent",
          hover: `var(--mantine-color-${color}-light-hover)`,
          color: `var(--mantine-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`
        };
      }
      const parsedColor = theme2.colors[parsed.color][parsed.shade];
      return {
        background: "transparent",
        hover: rgba(parsedColor, 0.12),
        color: `var(--mantine-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: "transparent",
      hover: rgba(color, 0.12),
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "transparent") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "transparent",
          hover: "transparent",
          color: `var(--mantine-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`
        };
      }
      return {
        background: "transparent",
        hover: "transparent",
        color: `var(--mantine-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: "transparent",
      hover: "transparent",
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "white") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "var(--mantine-color-white)",
          hover: darken(theme2.white, 0.01),
          color: `var(--mantine-color-${color}-filled)`,
          border: `${rem(1)} solid transparent`
        };
      }
      return {
        background: "var(--mantine-color-white)",
        hover: darken(theme2.white, 0.01),
        color: `var(--mantine-color-${parsed.color}-${parsed.shade})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: "var(--mantine-color-white)",
      hover: darken(theme2.white, 0.01),
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "gradient") {
    return {
      background: getGradient(gradient, theme2),
      hover: getGradient(gradient, theme2),
      color: "var(--mantine-color-white)",
      border: "none"
    };
  }
  if (variant === "default") {
    return {
      background: "var(--mantine-color-default)",
      hover: "var(--mantine-color-default-hover)",
      color: "var(--mantine-color-default-color)",
      border: `${rem(1)} solid var(--mantine-color-default-border)`
    };
  }
  return {};
};
const DEFAULT_COLORS = {
  dark: [
    "#C9C9C9",
    "#b8b8b8",
    "#828282",
    "#696969",
    "#424242",
    "#3b3b3b",
    "#2e2e2e",
    "#242424",
    "#1f1f1f",
    "#141414"
  ],
  gray: [
    "#f8f9fa",
    "#f1f3f5",
    "#e9ecef",
    "#dee2e6",
    "#ced4da",
    "#adb5bd",
    "#868e96",
    "#495057",
    "#343a40",
    "#212529"
  ],
  red: [
    "#fff5f5",
    "#ffe3e3",
    "#ffc9c9",
    "#ffa8a8",
    "#ff8787",
    "#ff6b6b",
    "#fa5252",
    "#f03e3e",
    "#e03131",
    "#c92a2a"
  ],
  pink: [
    "#fff0f6",
    "#ffdeeb",
    "#fcc2d7",
    "#faa2c1",
    "#f783ac",
    "#f06595",
    "#e64980",
    "#d6336c",
    "#c2255c",
    "#a61e4d"
  ],
  grape: [
    "#f8f0fc",
    "#f3d9fa",
    "#eebefa",
    "#e599f7",
    "#da77f2",
    "#cc5de8",
    "#be4bdb",
    "#ae3ec9",
    "#9c36b5",
    "#862e9c"
  ],
  violet: [
    "#f3f0ff",
    "#e5dbff",
    "#d0bfff",
    "#b197fc",
    "#9775fa",
    "#845ef7",
    "#7950f2",
    "#7048e8",
    "#6741d9",
    "#5f3dc4"
  ],
  indigo: [
    "#edf2ff",
    "#dbe4ff",
    "#bac8ff",
    "#91a7ff",
    "#748ffc",
    "#5c7cfa",
    "#4c6ef5",
    "#4263eb",
    "#3b5bdb",
    "#364fc7"
  ],
  blue: [
    "#e7f5ff",
    "#d0ebff",
    "#a5d8ff",
    "#74c0fc",
    "#4dabf7",
    "#339af0",
    "#228be6",
    "#1c7ed6",
    "#1971c2",
    "#1864ab"
  ],
  cyan: [
    "#e3fafc",
    "#c5f6fa",
    "#99e9f2",
    "#66d9e8",
    "#3bc9db",
    "#22b8cf",
    "#15aabf",
    "#1098ad",
    "#0c8599",
    "#0b7285"
  ],
  teal: [
    "#e6fcf5",
    "#c3fae8",
    "#96f2d7",
    "#63e6be",
    "#38d9a9",
    "#20c997",
    "#12b886",
    "#0ca678",
    "#099268",
    "#087f5b"
  ],
  green: [
    "#ebfbee",
    "#d3f9d8",
    "#b2f2bb",
    "#8ce99a",
    "#69db7c",
    "#51cf66",
    "#40c057",
    "#37b24d",
    "#2f9e44",
    "#2b8a3e"
  ],
  lime: [
    "#f4fce3",
    "#e9fac8",
    "#d8f5a2",
    "#c0eb75",
    "#a9e34b",
    "#94d82d",
    "#82c91e",
    "#74b816",
    "#66a80f",
    "#5c940d"
  ],
  yellow: [
    "#fff9db",
    "#fff3bf",
    "#ffec99",
    "#ffe066",
    "#ffd43b",
    "#fcc419",
    "#fab005",
    "#f59f00",
    "#f08c00",
    "#e67700"
  ],
  orange: [
    "#fff4e6",
    "#ffe8cc",
    "#ffd8a8",
    "#ffc078",
    "#ffa94d",
    "#ff922b",
    "#fd7e14",
    "#f76707",
    "#e8590c",
    "#d9480f"
  ]
};
const DEFAULT_FONT_FAMILY = "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji";
const DEFAULT_THEME = {
  scale: 1,
  fontSmoothing: true,
  focusRing: "auto",
  white: "#fff",
  black: "#000",
  colors: DEFAULT_COLORS,
  primaryShade: { light: 6, dark: 8 },
  primaryColor: "blue",
  variantColorResolver: defaultVariantColorsResolver,
  autoContrast: false,
  luminanceThreshold: 0.3,
  fontFamily: DEFAULT_FONT_FAMILY,
  fontFamilyMonospace: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
  respectReducedMotion: false,
  cursorType: "default",
  defaultGradient: { from: "blue", to: "cyan", deg: 45 },
  defaultRadius: "sm",
  activeClassName: "mantine-active",
  focusClassName: "",
  headings: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontWeight: "700",
    textWrap: "wrap",
    sizes: {
      h1: { fontSize: rem(34), lineHeight: "1.3" },
      h2: { fontSize: rem(26), lineHeight: "1.35" },
      h3: { fontSize: rem(22), lineHeight: "1.4" },
      h4: { fontSize: rem(18), lineHeight: "1.45" },
      h5: { fontSize: rem(16), lineHeight: "1.5" },
      h6: { fontSize: rem(14), lineHeight: "1.5" }
    }
  },
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20)
  },
  lineHeights: {
    xs: "1.4",
    sm: "1.45",
    md: "1.55",
    lg: "1.6",
    xl: "1.65"
  },
  radius: {
    xs: rem(2),
    sm: rem(4),
    md: rem(8),
    lg: rem(16),
    xl: rem(32)
  },
  spacing: {
    xs: rem(10),
    sm: rem(12),
    md: rem(16),
    lg: rem(20),
    xl: rem(32)
  },
  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em"
  },
  shadows: {
    xs: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), 0 ${rem(1)} ${rem(2)} rgba(0, 0, 0, 0.1)`,
    sm: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(10)} ${rem(
      15
    )} ${rem(-5)}, rgba(0, 0, 0, 0.04) 0 ${rem(7)} ${rem(7)} ${rem(-5)}`,
    md: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(20)} ${rem(
      25
    )} ${rem(-5)}, rgba(0, 0, 0, 0.04) 0 ${rem(10)} ${rem(10)} ${rem(-5)}`,
    lg: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(28)} ${rem(
      23
    )} ${rem(-7)}, rgba(0, 0, 0, 0.04) 0 ${rem(12)} ${rem(12)} ${rem(-7)}`,
    xl: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(36)} ${rem(
      28
    )} ${rem(-7)}, rgba(0, 0, 0, 0.04) 0 ${rem(17)} ${rem(17)} ${rem(-7)}`
  },
  other: {},
  components: {}
};
function isMantineColorScheme(value) {
  return value === "auto" || value === "dark" || value === "light";
}
function localStorageColorSchemeManager({
  key = "mantine-color-scheme-value"
} = {}) {
  let handleStorageEvent;
  return {
    get: (defaultValue) => {
      if (typeof window === "undefined") {
        return defaultValue;
      }
      try {
        const storedColorScheme = window.localStorage.getItem(key);
        return isMantineColorScheme(storedColorScheme) ? storedColorScheme : defaultValue;
      } catch {
        return defaultValue;
      }
    },
    set: (value) => {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        console.warn(
          "[@mantine/core] Local storage color scheme manager was unable to save color scheme.",
          error
        );
      }
    },
    subscribe: (onUpdate) => {
      handleStorageEvent = (event) => {
        if (event.storageArea === window.localStorage && event.key === key) {
          isMantineColorScheme(event.newValue) && onUpdate(event.newValue);
        }
      };
      window.addEventListener("storage", handleStorageEvent);
    },
    unsubscribe: () => {
      window.removeEventListener("storage", handleStorageEvent);
    },
    clear: () => {
      window.localStorage.removeItem(key);
    }
  };
}
const INVALID_PRIMARY_COLOR_ERROR = "[@mantine/core] MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more – https://mantine.dev/theming/colors/#primary-color";
const INVALID_PRIMARY_SHADE_ERROR = "[@mantine/core] MantineProvider: Invalid theme.primaryShade, it accepts only 0-9 integers or an object { light: 0-9, dark: 0-9 }";
function isValidPrimaryShade(shade) {
  if (shade < 0 || shade > 9) {
    return false;
  }
  return parseInt(shade.toString(), 10) === shade;
}
function validateMantineTheme(theme2) {
  if (!(theme2.primaryColor in theme2.colors)) {
    throw new Error(INVALID_PRIMARY_COLOR_ERROR);
  }
  if (typeof theme2.primaryShade === "object") {
    if (!isValidPrimaryShade(theme2.primaryShade.dark) || !isValidPrimaryShade(theme2.primaryShade.light)) {
      throw new Error(INVALID_PRIMARY_SHADE_ERROR);
    }
  }
  if (typeof theme2.primaryShade === "number" && !isValidPrimaryShade(theme2.primaryShade)) {
    throw new Error(INVALID_PRIMARY_SHADE_ERROR);
  }
}
function mergeMantineTheme(currentTheme, themeOverride) {
  if (!themeOverride) {
    validateMantineTheme(currentTheme);
    return currentTheme;
  }
  const result = deepMerge(currentTheme, themeOverride);
  if (themeOverride.fontFamily && !themeOverride.headings?.fontFamily) {
    result.headings.fontFamily = themeOverride.fontFamily;
  }
  validateMantineTheme(result);
  return result;
}
const MantineThemeContext = X$1(null);
const useSafeMantineTheme = () => x$2(MantineThemeContext) || DEFAULT_THEME;
function useMantineTheme() {
  const ctx = x$2(MantineThemeContext);
  if (!ctx) {
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app"
    );
  }
  return ctx;
}
function MantineThemeProvider({
  theme: theme2,
  children,
  inherit = true
}) {
  const parentTheme = useSafeMantineTheme();
  const mergedTheme = T$1(
    () => mergeMantineTheme(inherit ? parentTheme : DEFAULT_THEME, theme2),
    [theme2, parentTheme, inherit]
  );
  return /* @__PURE__ */ u(MantineThemeContext.Provider, { value: mergedTheme, children });
}
MantineThemeProvider.displayName = "@mantine/core/MantineThemeProvider";
function MantineClasses() {
  const theme2 = useMantineTheme();
  const nonce = useMantineStyleNonce();
  const classes2 = keys(theme2.breakpoints).reduce((acc, breakpoint) => {
    const isPxBreakpoint = theme2.breakpoints[breakpoint].includes("px");
    const pxValue = px(theme2.breakpoints[breakpoint]);
    const maxWidthBreakpoint = isPxBreakpoint ? `${pxValue - 0.1}px` : em(pxValue - 0.1);
    const minWidthBreakpoint = isPxBreakpoint ? `${pxValue}px` : em(pxValue);
    return `${acc}@media (max-width: ${maxWidthBreakpoint}) {.mantine-visible-from-${breakpoint} {display: none !important;}}@media (min-width: ${minWidthBreakpoint}) {.mantine-hidden-from-${breakpoint} {display: none !important;}}`;
  }, "");
  return /* @__PURE__ */ u(
    "style",
    {
      "data-mantine-styles": "classes",
      nonce: nonce?.(),
      dangerouslySetInnerHTML: { __html: classes2 }
    }
  );
}
function cssVariablesObjectToString(variables2) {
  return Object.entries(variables2).map(([name, value]) => `${name}: ${value};`).join("");
}
function convertCssVariables(input, selectorOverride) {
  const selectors = selectorOverride ? [selectorOverride] : [":root", ":host"];
  const sharedVariables = cssVariablesObjectToString(input.variables);
  const shared = sharedVariables ? `${selectors.join(", ")}{${sharedVariables}}` : "";
  const dark = cssVariablesObjectToString(input.dark);
  const light = cssVariablesObjectToString(input.light);
  const selectorsWithScheme = (scheme) => selectors.map(
    (selector) => selector === ":host" ? `${selector}([data-mantine-color-scheme="${scheme}"])` : `${selector}[data-mantine-color-scheme="${scheme}"]`
  ).join(", ");
  const darkForced = dark ? `${selectorsWithScheme("dark")}{${dark}}` : "";
  const lightForced = light ? `${selectorsWithScheme("light")}{${light}}` : "";
  return `${shared}

${darkForced}

${lightForced}`;
}
function getContrastColor({ color, theme: theme2, autoContrast }) {
  const _autoContrast = typeof autoContrast === "boolean" ? autoContrast : theme2.autoContrast;
  if (!_autoContrast) {
    return "var(--mantine-color-white)";
  }
  const parsed = parseThemeColor({ color: color || theme2.primaryColor, theme: theme2 });
  return parsed.isLight ? "var(--mantine-color-black)" : "var(--mantine-color-white)";
}
function getPrimaryContrastColor(theme2, colorScheme) {
  return getContrastColor({
    color: theme2.colors[theme2.primaryColor][getPrimaryShade(theme2, colorScheme)],
    theme: theme2,
    autoContrast: null
  });
}
function getCSSColorVariables({
  theme: theme2,
  color,
  colorScheme,
  name = color,
  withColorValues = true
}) {
  if (!theme2.colors[color]) {
    return {};
  }
  if (colorScheme === "light") {
    const primaryShade2 = getPrimaryShade(theme2, "light");
    const dynamicVariables2 = {
      [`--mantine-color-${name}-text`]: `var(--mantine-color-${name}-filled)`,
      [`--mantine-color-${name}-filled`]: `var(--mantine-color-${name}-${primaryShade2})`,
      [`--mantine-color-${name}-filled-hover`]: `var(--mantine-color-${name}-${primaryShade2 === 9 ? 8 : primaryShade2 + 1})`,
      [`--mantine-color-${name}-light`]: alpha(theme2.colors[color][primaryShade2], 0.1),
      [`--mantine-color-${name}-light-hover`]: alpha(theme2.colors[color][primaryShade2], 0.12),
      [`--mantine-color-${name}-light-color`]: `var(--mantine-color-${name}-${primaryShade2})`,
      [`--mantine-color-${name}-outline`]: `var(--mantine-color-${name}-${primaryShade2})`,
      [`--mantine-color-${name}-outline-hover`]: alpha(theme2.colors[color][primaryShade2], 0.05)
    };
    if (!withColorValues) {
      return dynamicVariables2;
    }
    return {
      [`--mantine-color-${name}-0`]: theme2.colors[color][0],
      [`--mantine-color-${name}-1`]: theme2.colors[color][1],
      [`--mantine-color-${name}-2`]: theme2.colors[color][2],
      [`--mantine-color-${name}-3`]: theme2.colors[color][3],
      [`--mantine-color-${name}-4`]: theme2.colors[color][4],
      [`--mantine-color-${name}-5`]: theme2.colors[color][5],
      [`--mantine-color-${name}-6`]: theme2.colors[color][6],
      [`--mantine-color-${name}-7`]: theme2.colors[color][7],
      [`--mantine-color-${name}-8`]: theme2.colors[color][8],
      [`--mantine-color-${name}-9`]: theme2.colors[color][9],
      ...dynamicVariables2
    };
  }
  const primaryShade = getPrimaryShade(theme2, "dark");
  const dynamicVariables = {
    [`--mantine-color-${name}-text`]: `var(--mantine-color-${name}-4)`,
    [`--mantine-color-${name}-filled`]: `var(--mantine-color-${name}-${primaryShade})`,
    [`--mantine-color-${name}-filled-hover`]: `var(--mantine-color-${name}-${primaryShade === 9 ? 8 : primaryShade + 1})`,
    [`--mantine-color-${name}-light`]: alpha(
      theme2.colors[color][Math.max(0, primaryShade - 2)],
      0.15
    ),
    [`--mantine-color-${name}-light-hover`]: alpha(
      theme2.colors[color][Math.max(0, primaryShade - 2)],
      0.2
    ),
    [`--mantine-color-${name}-light-color`]: `var(--mantine-color-${name}-${Math.max(primaryShade - 5, 0)})`,
    [`--mantine-color-${name}-outline`]: `var(--mantine-color-${name}-${Math.max(primaryShade - 4, 0)})`,
    [`--mantine-color-${name}-outline-hover`]: alpha(
      theme2.colors[color][Math.max(primaryShade - 4, 0)],
      0.05
    )
  };
  if (!withColorValues) {
    return dynamicVariables;
  }
  return {
    [`--mantine-color-${name}-0`]: theme2.colors[color][0],
    [`--mantine-color-${name}-1`]: theme2.colors[color][1],
    [`--mantine-color-${name}-2`]: theme2.colors[color][2],
    [`--mantine-color-${name}-3`]: theme2.colors[color][3],
    [`--mantine-color-${name}-4`]: theme2.colors[color][4],
    [`--mantine-color-${name}-5`]: theme2.colors[color][5],
    [`--mantine-color-${name}-6`]: theme2.colors[color][6],
    [`--mantine-color-${name}-7`]: theme2.colors[color][7],
    [`--mantine-color-${name}-8`]: theme2.colors[color][8],
    [`--mantine-color-${name}-9`]: theme2.colors[color][9],
    ...dynamicVariables
  };
}
function isVirtualColor(value) {
  return !!value && typeof value === "object" && "mantine-virtual-color" in value;
}
function assignSizeVariables(variables2, sizes, name) {
  keys(sizes).forEach(
    (size) => Object.assign(variables2, { [`--mantine-${name}-${size}`]: sizes[size] })
  );
}
const defaultCssVariablesResolver = (theme2) => {
  const lightPrimaryShade = getPrimaryShade(theme2, "light");
  const defaultRadius = theme2.defaultRadius in theme2.radius ? theme2.radius[theme2.defaultRadius] : rem(theme2.defaultRadius);
  const result = {
    variables: {
      "--mantine-z-index-app": "100",
      "--mantine-z-index-modal": "200",
      "--mantine-z-index-popover": "300",
      "--mantine-z-index-overlay": "400",
      "--mantine-z-index-max": "9999",
      "--mantine-scale": theme2.scale.toString(),
      "--mantine-cursor-type": theme2.cursorType,
      "--mantine-webkit-font-smoothing": theme2.fontSmoothing ? "antialiased" : "unset",
      "--mantine-moz-font-smoothing": theme2.fontSmoothing ? "grayscale" : "unset",
      "--mantine-color-white": theme2.white,
      "--mantine-color-black": theme2.black,
      "--mantine-line-height": theme2.lineHeights.md,
      "--mantine-font-family": theme2.fontFamily,
      "--mantine-font-family-monospace": theme2.fontFamilyMonospace,
      "--mantine-font-family-headings": theme2.headings.fontFamily,
      "--mantine-heading-font-weight": theme2.headings.fontWeight,
      "--mantine-heading-text-wrap": theme2.headings.textWrap,
      "--mantine-radius-default": defaultRadius,
      // Primary colors
      "--mantine-primary-color-filled": `var(--mantine-color-${theme2.primaryColor}-filled)`,
      "--mantine-primary-color-filled-hover": `var(--mantine-color-${theme2.primaryColor}-filled-hover)`,
      "--mantine-primary-color-light": `var(--mantine-color-${theme2.primaryColor}-light)`,
      "--mantine-primary-color-light-hover": `var(--mantine-color-${theme2.primaryColor}-light-hover)`,
      "--mantine-primary-color-light-color": `var(--mantine-color-${theme2.primaryColor}-light-color)`
    },
    light: {
      "--mantine-color-scheme": "light",
      "--mantine-primary-color-contrast": getPrimaryContrastColor(theme2, "light"),
      "--mantine-color-bright": "var(--mantine-color-black)",
      "--mantine-color-text": theme2.black,
      "--mantine-color-body": theme2.white,
      "--mantine-color-error": "var(--mantine-color-red-6)",
      "--mantine-color-placeholder": "var(--mantine-color-gray-5)",
      "--mantine-color-anchor": `var(--mantine-color-${theme2.primaryColor}-${lightPrimaryShade})`,
      "--mantine-color-default": "var(--mantine-color-white)",
      "--mantine-color-default-hover": "var(--mantine-color-gray-0)",
      "--mantine-color-default-color": "var(--mantine-color-black)",
      "--mantine-color-default-border": "var(--mantine-color-gray-4)",
      "--mantine-color-dimmed": "var(--mantine-color-gray-6)",
      "--mantine-color-disabled": "var(--mantine-color-gray-2)",
      "--mantine-color-disabled-color": "var(--mantine-color-gray-5)",
      "--mantine-color-disabled-border": "var(--mantine-color-gray-3)"
    },
    dark: {
      "--mantine-color-scheme": "dark",
      "--mantine-primary-color-contrast": getPrimaryContrastColor(theme2, "dark"),
      "--mantine-color-bright": "var(--mantine-color-white)",
      "--mantine-color-text": "var(--mantine-color-dark-0)",
      "--mantine-color-body": "var(--mantine-color-dark-7)",
      "--mantine-color-error": "var(--mantine-color-red-8)",
      "--mantine-color-placeholder": "var(--mantine-color-dark-3)",
      "--mantine-color-anchor": `var(--mantine-color-${theme2.primaryColor}-4)`,
      "--mantine-color-default": "var(--mantine-color-dark-6)",
      "--mantine-color-default-hover": "var(--mantine-color-dark-5)",
      "--mantine-color-default-color": "var(--mantine-color-white)",
      "--mantine-color-default-border": "var(--mantine-color-dark-4)",
      "--mantine-color-dimmed": "var(--mantine-color-dark-2)",
      "--mantine-color-disabled": "var(--mantine-color-dark-6)",
      "--mantine-color-disabled-color": "var(--mantine-color-dark-3)",
      "--mantine-color-disabled-border": "var(--mantine-color-dark-4)"
    }
  };
  assignSizeVariables(result.variables, theme2.breakpoints, "breakpoint");
  assignSizeVariables(result.variables, theme2.spacing, "spacing");
  assignSizeVariables(result.variables, theme2.fontSizes, "font-size");
  assignSizeVariables(result.variables, theme2.lineHeights, "line-height");
  assignSizeVariables(result.variables, theme2.shadows, "shadow");
  assignSizeVariables(result.variables, theme2.radius, "radius");
  theme2.colors[theme2.primaryColor].forEach((_2, index) => {
    result.variables[`--mantine-primary-color-${index}`] = `var(--mantine-color-${theme2.primaryColor}-${index})`;
  });
  keys(theme2.colors).forEach((color) => {
    const value = theme2.colors[color];
    if (isVirtualColor(value)) {
      Object.assign(
        result.light,
        getCSSColorVariables({
          theme: theme2,
          name: value.name,
          color: value.light,
          colorScheme: "light",
          withColorValues: true
        })
      );
      Object.assign(
        result.dark,
        getCSSColorVariables({
          theme: theme2,
          name: value.name,
          color: value.dark,
          colorScheme: "dark",
          withColorValues: true
        })
      );
      return;
    }
    value.forEach((shade, index) => {
      result.variables[`--mantine-color-${color}-${index}`] = shade;
    });
    Object.assign(
      result.light,
      getCSSColorVariables({
        theme: theme2,
        color,
        colorScheme: "light",
        withColorValues: false
      })
    );
    Object.assign(
      result.dark,
      getCSSColorVariables({
        theme: theme2,
        color,
        colorScheme: "dark",
        withColorValues: false
      })
    );
  });
  const headings2 = theme2.headings.sizes;
  keys(headings2).forEach((heading) => {
    result.variables[`--mantine-${heading}-font-size`] = headings2[heading].fontSize;
    result.variables[`--mantine-${heading}-line-height`] = headings2[heading].lineHeight;
    result.variables[`--mantine-${heading}-font-weight`] = headings2[heading].fontWeight || theme2.headings.fontWeight;
  });
  return result;
};
function getMergedVariables({ theme: theme2, generator }) {
  const defaultResolver = defaultCssVariablesResolver(theme2);
  const providerGenerator = generator?.(theme2);
  return providerGenerator ? deepMerge(defaultResolver, providerGenerator) : defaultResolver;
}
const defaultCssVariables = defaultCssVariablesResolver(DEFAULT_THEME);
function removeDefaultVariables(input) {
  const cleaned = {
    variables: {},
    light: {},
    dark: {}
  };
  keys(input.variables).forEach((key) => {
    if (defaultCssVariables.variables[key] !== input.variables[key]) {
      cleaned.variables[key] = input.variables[key];
    }
  });
  keys(input.light).forEach((key) => {
    if (defaultCssVariables.light[key] !== input.light[key]) {
      cleaned.light[key] = input.light[key];
    }
  });
  keys(input.dark).forEach((key) => {
    if (defaultCssVariables.dark[key] !== input.dark[key]) {
      cleaned.dark[key] = input.dark[key];
    }
  });
  return cleaned;
}
function getColorSchemeCssVariables(selectorOverride) {
  return convertCssVariables(
    {
      variables: {},
      dark: { "--mantine-color-scheme": "dark" },
      light: { "--mantine-color-scheme": "light" }
    },
    selectorOverride
  );
}
function MantineCssVariables({
  cssVariablesSelector,
  deduplicateCssVariables
}) {
  const theme2 = useMantineTheme();
  const nonce = useMantineStyleNonce();
  const generator = useMantineCssVariablesResolver();
  const mergedVariables = getMergedVariables({ theme: theme2, generator });
  const shouldCleanVariables = (cssVariablesSelector === void 0 || cssVariablesSelector === ":root" || cssVariablesSelector === ":host") && deduplicateCssVariables;
  const cleanedVariables = shouldCleanVariables ? removeDefaultVariables(mergedVariables) : mergedVariables;
  const css = convertCssVariables(cleanedVariables, cssVariablesSelector);
  if (css) {
    return /* @__PURE__ */ u(
      "style",
      {
        "data-mantine-styles": true,
        nonce: nonce?.(),
        dangerouslySetInnerHTML: {
          __html: `${css}${shouldCleanVariables ? "" : getColorSchemeCssVariables(cssVariablesSelector)}`
        }
      }
    );
  }
  return null;
}
MantineCssVariables.displayName = "@mantine/CssVariables";
function setColorSchemeAttribute(colorScheme, getRootElement) {
  const hasDarkColorScheme = typeof window !== "undefined" && "matchMedia" in window && window.matchMedia("(prefers-color-scheme: dark)")?.matches;
  const computedColorScheme = colorScheme !== "auto" ? colorScheme : hasDarkColorScheme ? "dark" : "light";
  getRootElement()?.setAttribute("data-mantine-color-scheme", computedColorScheme);
}
function useProviderColorScheme({
  manager,
  defaultColorScheme,
  getRootElement,
  forceColorScheme
}) {
  const media = A$1(null);
  const [value, setValue] = d$1(() => manager.get(defaultColorScheme));
  const colorSchemeValue = forceColorScheme || value;
  const setColorScheme = q$1(
    (colorScheme) => {
      if (!forceColorScheme) {
        setColorSchemeAttribute(colorScheme, getRootElement);
        setValue(colorScheme);
        manager.set(colorScheme);
      }
    },
    [manager.set, colorSchemeValue, forceColorScheme]
  );
  const clearColorScheme = q$1(() => {
    setValue(defaultColorScheme);
    setColorSchemeAttribute(defaultColorScheme, getRootElement);
    manager.clear();
  }, [manager.clear, defaultColorScheme]);
  h$1(() => {
    manager.subscribe(setColorScheme);
    return manager.unsubscribe;
  }, [manager.subscribe, manager.unsubscribe]);
  useIsomorphicEffect(() => {
    setColorSchemeAttribute(manager.get(defaultColorScheme), getRootElement);
  }, []);
  h$1(() => {
    if (forceColorScheme) {
      setColorSchemeAttribute(forceColorScheme, getRootElement);
      return () => {
      };
    }
    if (forceColorScheme === void 0) {
      setColorSchemeAttribute(value, getRootElement);
    }
    if (typeof window !== "undefined" && "matchMedia" in window) {
      media.current = window.matchMedia("(prefers-color-scheme: dark)");
    }
    const listener = (event) => {
      if (value === "auto") {
        setColorSchemeAttribute(event.matches ? "dark" : "light", getRootElement);
      }
    };
    media.current?.addEventListener("change", listener);
    return () => media.current?.removeEventListener("change", listener);
  }, [value, forceColorScheme]);
  return { colorScheme: colorSchemeValue, setColorScheme, clearColorScheme };
}
function useRespectReduceMotion({
  respectReducedMotion,
  getRootElement
}) {
  useIsomorphicEffect(() => {
    if (respectReducedMotion) {
      getRootElement()?.setAttribute("data-respect-reduced-motion", "true");
    }
  }, [respectReducedMotion]);
}
function MantineProvider({
  theme: theme2,
  children,
  getStyleNonce,
  withStaticClasses = true,
  withGlobalClasses = true,
  deduplicateCssVariables = true,
  withCssVariables = true,
  cssVariablesSelector,
  classNamesPrefix = "mantine",
  colorSchemeManager = localStorageColorSchemeManager(),
  defaultColorScheme = "light",
  getRootElement = () => document.documentElement,
  cssVariablesResolver,
  forceColorScheme,
  stylesTransform,
  env
}) {
  const { colorScheme, setColorScheme, clearColorScheme } = useProviderColorScheme({
    defaultColorScheme,
    forceColorScheme,
    manager: colorSchemeManager,
    getRootElement
  });
  useRespectReduceMotion({
    respectReducedMotion: theme2?.respectReducedMotion || false,
    getRootElement
  });
  return /* @__PURE__ */ u(
    MantineContext.Provider,
    {
      value: {
        colorScheme,
        setColorScheme,
        clearColorScheme,
        getRootElement,
        classNamesPrefix,
        getStyleNonce,
        cssVariablesResolver,
        cssVariablesSelector: cssVariablesSelector ?? ":root",
        withStaticClasses,
        stylesTransform,
        env
      },
      children: /* @__PURE__ */ u(MantineThemeProvider, { theme: theme2, children: [
        withCssVariables && /* @__PURE__ */ u(
          MantineCssVariables,
          {
            cssVariablesSelector,
            deduplicateCssVariables
          }
        ),
        withGlobalClasses && /* @__PURE__ */ u(MantineClasses, {}),
        children
      ] })
    }
  );
}
MantineProvider.displayName = "@mantine/core/MantineProvider";
const FOCUS_CLASS_NAMES = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never"
};
function getGlobalClassNames({ theme: theme2, options, unstyled }) {
  return clsx(
    options?.focusable && !unstyled && (theme2.focusClassName || FOCUS_CLASS_NAMES[theme2.focusRing]),
    options?.active && !unstyled && theme2.activeClassName
  );
}
function getOptionsClassNames({
  selector,
  stylesCtx,
  options,
  props,
  theme: theme2
}) {
  return resolveClassNames({
    theme: theme2,
    classNames: options?.classNames,
    props: options?.props || props,
    stylesCtx
  })[selector];
}
function getResolvedClassNames({
  selector,
  stylesCtx,
  theme: theme2,
  classNames,
  props
}) {
  return resolveClassNames({ theme: theme2, classNames, props, stylesCtx })[selector];
}
function getRootClassName({ rootSelector, selector, className }) {
  return rootSelector === selector ? className : void 0;
}
function getSelectorClassName({ selector, classes: classes2, unstyled }) {
  return unstyled ? void 0 : classes2[selector];
}
function getStaticClassNames({
  themeName,
  classNamesPrefix,
  selector,
  withStaticClass
}) {
  if (withStaticClass === false) {
    return [];
  }
  return themeName.map((n2) => `${classNamesPrefix}-${n2}-${selector}`);
}
function getThemeClassNames({
  themeName,
  theme: theme2,
  selector,
  props,
  stylesCtx
}) {
  return themeName.map(
    (n2) => resolveClassNames({
      theme: theme2,
      classNames: theme2.components[n2]?.classNames,
      props,
      stylesCtx
    })?.[selector]
  );
}
function getVariantClassName({
  options,
  classes: classes2,
  selector,
  unstyled
}) {
  return options?.variant && !unstyled ? classes2[`${selector}--${options.variant}`] : void 0;
}
function getClassName({
  theme: theme2,
  options,
  themeName,
  selector,
  classNamesPrefix,
  classNames,
  classes: classes2,
  unstyled,
  className,
  rootSelector,
  props,
  stylesCtx,
  withStaticClasses,
  headless,
  transformedStyles
}) {
  return clsx(
    getGlobalClassNames({ theme: theme2, options, unstyled: unstyled || headless }),
    getThemeClassNames({ theme: theme2, themeName, selector, props, stylesCtx }),
    getVariantClassName({ options, classes: classes2, selector, unstyled }),
    getResolvedClassNames({ selector, stylesCtx, theme: theme2, classNames, props }),
    getResolvedClassNames({ selector, stylesCtx, theme: theme2, classNames: transformedStyles, props }),
    getOptionsClassNames({ selector, stylesCtx, options, props, theme: theme2 }),
    getRootClassName({ rootSelector, selector, className }),
    getSelectorClassName({ selector, classes: classes2, unstyled: unstyled || headless }),
    withStaticClasses && !headless && getStaticClassNames({
      themeName,
      classNamesPrefix,
      selector,
      withStaticClass: options?.withStaticClass
    }),
    options?.className
  );
}
function getThemeStyles({
  theme: theme2,
  themeName,
  props,
  stylesCtx,
  selector
}) {
  return themeName.map(
    (n2) => resolveStyles({
      theme: theme2,
      styles: theme2.components[n2]?.styles,
      props,
      stylesCtx
    })[selector]
  ).reduce((acc, val) => ({ ...acc, ...val }), {});
}
function resolveStyle({ style, theme: theme2 }) {
  if (Array.isArray(style)) {
    return [...style].reduce(
      (acc, item) => ({ ...acc, ...resolveStyle({ style: item, theme: theme2 }) }),
      {}
    );
  }
  if (typeof style === "function") {
    return style(theme2);
  }
  if (style == null) {
    return {};
  }
  return style;
}
function mergeVars(vars) {
  return vars.reduce((acc, current) => {
    if (current) {
      Object.keys(current).forEach((key) => {
        acc[key] = { ...acc[key], ...filterProps(current[key]) };
      });
    }
    return acc;
  }, {});
}
function resolveVars({
  vars,
  varsResolver: varsResolver2,
  theme: theme2,
  props,
  stylesCtx,
  selector,
  themeName,
  headless
}) {
  return mergeVars([
    headless ? {} : varsResolver2?.(theme2, props, stylesCtx),
    ...themeName.map((name) => theme2.components?.[name]?.vars?.(theme2, props, stylesCtx)),
    vars?.(theme2, props, stylesCtx)
  ])?.[selector];
}
function getStyle({
  theme: theme2,
  themeName,
  selector,
  options,
  props,
  stylesCtx,
  rootSelector,
  styles,
  style,
  vars,
  varsResolver: varsResolver2,
  headless,
  withStylesTransform
}) {
  return {
    ...!withStylesTransform && getThemeStyles({ theme: theme2, themeName, props, stylesCtx, selector }),
    ...!withStylesTransform && resolveStyles({ theme: theme2, styles, props, stylesCtx })[selector],
    ...!withStylesTransform && resolveStyles({ theme: theme2, styles: options?.styles, props: options?.props || props, stylesCtx })[selector],
    ...resolveVars({ theme: theme2, props, stylesCtx, vars, varsResolver: varsResolver2, selector, themeName, headless }),
    ...rootSelector === selector ? resolveStyle({ style, theme: theme2 }) : null,
    ...resolveStyle({ style: options?.style, theme: theme2 })
  };
}
function useStylesTransform({ props, stylesCtx, themeName }) {
  const theme2 = useMantineTheme();
  const stylesTransform = useMantineStylesTransform()?.();
  const getTransformedStyles = (styles) => {
    if (!stylesTransform) {
      return [];
    }
    const transformedStyles = styles.map(
      (style) => stylesTransform(style, { props, theme: theme2, ctx: stylesCtx })
    );
    return [
      ...transformedStyles,
      ...themeName.map(
        (n2) => stylesTransform(theme2.components[n2]?.styles, { props, theme: theme2, ctx: stylesCtx })
      )
    ].filter(Boolean);
  };
  return {
    getTransformedStyles,
    withStylesTransform: !!stylesTransform
  };
}
function useStyles({
  name,
  classes: classes2,
  props,
  stylesCtx,
  className,
  style,
  rootSelector = "root",
  unstyled,
  classNames,
  styles,
  vars,
  varsResolver: varsResolver2,
  attributes
}) {
  const theme2 = useMantineTheme();
  const classNamesPrefix = useMantineClassNamesPrefix();
  const withStaticClasses = useMantineWithStaticClasses();
  const headless = useMantineIsHeadless();
  const themeName = (Array.isArray(name) ? name : [name]).filter((n2) => n2);
  const { withStylesTransform, getTransformedStyles } = useStylesTransform({
    props,
    stylesCtx,
    themeName
  });
  return (selector, options) => ({
    className: getClassName({
      theme: theme2,
      options,
      themeName,
      selector,
      classNamesPrefix,
      classNames,
      classes: classes2,
      unstyled,
      className,
      rootSelector,
      props,
      stylesCtx,
      withStaticClasses,
      headless,
      transformedStyles: getTransformedStyles([options?.styles, styles])
    }),
    style: getStyle({
      theme: theme2,
      themeName,
      selector,
      options,
      props,
      stylesCtx,
      rootSelector,
      styles,
      style,
      vars,
      varsResolver: varsResolver2,
      headless,
      withStylesTransform
    }),
    ...attributes?.[selector]
  });
}
function getAutoContrastValue(autoContrast, theme2) {
  return typeof autoContrast === "boolean" ? autoContrast : theme2.autoContrast;
}
function useProps(component, defaultProps2, props) {
  const theme2 = useMantineTheme();
  const contextPropsPayload = theme2.components[component]?.defaultProps;
  const contextProps = typeof contextPropsPayload === "function" ? contextPropsPayload(theme2) : contextPropsPayload;
  return { ...defaultProps2, ...contextProps, ...filterProps(props) };
}
function createTheme(theme2) {
  return theme2;
}
function cssObjectToString(css) {
  return keys(css).reduce(
    (acc, rule) => css[rule] !== void 0 ? `${acc}${camelToKebabCase(rule)}:${css[rule]};` : acc,
    ""
  ).trim();
}
function stylesToString({ selector, styles, media, container }) {
  const baseStyles = styles ? cssObjectToString(styles) : "";
  const mediaQueryStyles = !Array.isArray(media) ? [] : media.map((item) => `@media${item.query}{${selector}{${cssObjectToString(item.styles)}}}`);
  const containerStyles = !Array.isArray(container) ? [] : container.map(
    (item) => `@container ${item.query}{${selector}{${cssObjectToString(item.styles)}}}`
  );
  return `${baseStyles ? `${selector}{${baseStyles}}` : ""}${mediaQueryStyles.join("")}${containerStyles.join("")}`.trim();
}
function InlineStyles(props) {
  const nonce = useMantineStyleNonce();
  return /* @__PURE__ */ u(
    "style",
    {
      "data-mantine-styles": "inline",
      nonce: nonce?.(),
      dangerouslySetInnerHTML: { __html: stylesToString(props) }
    }
  );
}
function extractStyleProps(others) {
  const {
    m: m2,
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
    me,
    ms,
    p: p2,
    px: px2,
    py,
    pt,
    pb,
    pl,
    pr,
    pe,
    ps,
    bd,
    bdrs,
    bg,
    c: c2,
    opacity,
    ff,
    fz,
    fw,
    lts,
    ta,
    lh,
    fs,
    tt,
    td,
    w: w2,
    miw,
    maw,
    h: h2,
    mih,
    mah,
    bgsz,
    bgp,
    bgr,
    bga,
    pos,
    top,
    left,
    bottom,
    right,
    inset,
    display,
    flex,
    hiddenFrom,
    visibleFrom,
    lightHidden,
    darkHidden,
    sx,
    ...rest
  } = others;
  const styleProps = filterProps({
    m: m2,
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
    me,
    ms,
    p: p2,
    px: px2,
    py,
    pt,
    pb,
    pl,
    pr,
    pe,
    ps,
    bd,
    bg,
    c: c2,
    opacity,
    ff,
    fz,
    fw,
    lts,
    ta,
    lh,
    fs,
    tt,
    td,
    w: w2,
    miw,
    maw,
    h: h2,
    mih,
    mah,
    bgsz,
    bgp,
    bgr,
    bga,
    pos,
    top,
    left,
    bottom,
    right,
    inset,
    display,
    flex,
    bdrs,
    hiddenFrom,
    visibleFrom,
    lightHidden,
    darkHidden,
    sx
  });
  return { styleProps, rest };
}
const STYlE_PROPS_DATA = {
  m: { type: "spacing", property: "margin" },
  mt: { type: "spacing", property: "marginTop" },
  mb: { type: "spacing", property: "marginBottom" },
  ml: { type: "spacing", property: "marginLeft" },
  mr: { type: "spacing", property: "marginRight" },
  ms: { type: "spacing", property: "marginInlineStart" },
  me: { type: "spacing", property: "marginInlineEnd" },
  mx: { type: "spacing", property: "marginInline" },
  my: { type: "spacing", property: "marginBlock" },
  p: { type: "spacing", property: "padding" },
  pt: { type: "spacing", property: "paddingTop" },
  pb: { type: "spacing", property: "paddingBottom" },
  pl: { type: "spacing", property: "paddingLeft" },
  pr: { type: "spacing", property: "paddingRight" },
  ps: { type: "spacing", property: "paddingInlineStart" },
  pe: { type: "spacing", property: "paddingInlineEnd" },
  px: { type: "spacing", property: "paddingInline" },
  py: { type: "spacing", property: "paddingBlock" },
  bd: { type: "border", property: "border" },
  bdrs: { type: "radius", property: "borderRadius" },
  bg: { type: "color", property: "background" },
  c: { type: "textColor", property: "color" },
  opacity: { type: "identity", property: "opacity" },
  ff: { type: "fontFamily", property: "fontFamily" },
  fz: { type: "fontSize", property: "fontSize" },
  fw: { type: "identity", property: "fontWeight" },
  lts: { type: "size", property: "letterSpacing" },
  ta: { type: "identity", property: "textAlign" },
  lh: { type: "lineHeight", property: "lineHeight" },
  fs: { type: "identity", property: "fontStyle" },
  tt: { type: "identity", property: "textTransform" },
  td: { type: "identity", property: "textDecoration" },
  w: { type: "spacing", property: "width" },
  miw: { type: "spacing", property: "minWidth" },
  maw: { type: "spacing", property: "maxWidth" },
  h: { type: "spacing", property: "height" },
  mih: { type: "spacing", property: "minHeight" },
  mah: { type: "spacing", property: "maxHeight" },
  bgsz: { type: "size", property: "backgroundSize" },
  bgp: { type: "identity", property: "backgroundPosition" },
  bgr: { type: "identity", property: "backgroundRepeat" },
  bga: { type: "identity", property: "backgroundAttachment" },
  pos: { type: "identity", property: "position" },
  top: { type: "size", property: "top" },
  left: { type: "size", property: "left" },
  bottom: { type: "size", property: "bottom" },
  right: { type: "size", property: "right" },
  inset: { type: "size", property: "inset" },
  display: { type: "identity", property: "display" },
  flex: { type: "identity", property: "flex" }
};
function colorResolver(color, theme2) {
  const parsedColor = parseThemeColor({ color, theme: theme2 });
  if (parsedColor.color === "dimmed") {
    return "var(--mantine-color-dimmed)";
  }
  if (parsedColor.color === "bright") {
    return "var(--mantine-color-bright)";
  }
  return parsedColor.variable ? `var(${parsedColor.variable})` : parsedColor.color;
}
function textColorResolver(color, theme2) {
  const parsedColor = parseThemeColor({ color, theme: theme2 });
  if (parsedColor.isThemeColor && parsedColor.shade === void 0) {
    return `var(--mantine-color-${parsedColor.color}-text)`;
  }
  return colorResolver(color, theme2);
}
function borderResolver(value, theme2) {
  if (typeof value === "number") {
    return rem(value);
  }
  if (typeof value === "string") {
    const [size, style, ...colorTuple] = value.split(" ").filter((val) => val.trim() !== "");
    let result = `${rem(size)}`;
    style && (result += ` ${style}`);
    colorTuple.length > 0 && (result += ` ${colorResolver(colorTuple.join(" "), theme2)}`);
    return result.trim();
  }
  return value;
}
const values = {
  text: "var(--mantine-font-family)",
  mono: "var(--mantine-font-family-monospace)",
  monospace: "var(--mantine-font-family-monospace)",
  heading: "var(--mantine-font-family-headings)",
  headings: "var(--mantine-font-family-headings)"
};
function fontFamilyResolver(fontFamily) {
  if (typeof fontFamily === "string" && fontFamily in values) {
    return values[fontFamily];
  }
  return fontFamily;
}
const headings$1 = ["h1", "h2", "h3", "h4", "h5", "h6"];
function fontSizeResolver(value, theme2) {
  if (typeof value === "string" && value in theme2.fontSizes) {
    return `var(--mantine-font-size-${value})`;
  }
  if (typeof value === "string" && headings$1.includes(value)) {
    return `var(--mantine-${value}-font-size)`;
  }
  if (typeof value === "number") {
    return rem(value);
  }
  if (typeof value === "string") {
    return rem(value);
  }
  return value;
}
function identityResolver(value) {
  return value;
}
const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
function lineHeightResolver(value, theme2) {
  if (typeof value === "string" && value in theme2.lineHeights) {
    return `var(--mantine-line-height-${value})`;
  }
  if (typeof value === "string" && headings.includes(value)) {
    return `var(--mantine-${value}-line-height)`;
  }
  return value;
}
function radiusResolver(value, theme2) {
  if (typeof value === "string" && value in theme2.radius) {
    return `var(--mantine-radius-${value})`;
  }
  if (typeof value === "number") {
    return rem(value);
  }
  if (typeof value === "string") {
    return rem(value);
  }
  return value;
}
function sizeResolver(value) {
  if (typeof value === "number") {
    return rem(value);
  }
  return value;
}
function spacingResolver(value, theme2) {
  if (typeof value === "number") {
    return rem(value);
  }
  if (typeof value === "string") {
    const mod = value.replace("-", "");
    if (!(mod in theme2.spacing)) {
      return rem(value);
    }
    const variable = `--mantine-spacing-${mod}`;
    return value.startsWith("-") ? `calc(var(${variable}) * -1)` : `var(${variable})`;
  }
  return value;
}
const resolvers = {
  color: colorResolver,
  textColor: textColorResolver,
  fontSize: fontSizeResolver,
  spacing: spacingResolver,
  radius: radiusResolver,
  identity: identityResolver,
  size: sizeResolver,
  lineHeight: lineHeightResolver,
  fontFamily: fontFamilyResolver,
  border: borderResolver
};
function replaceMediaQuery(query) {
  return query.replace("(min-width: ", "").replace("em)", "");
}
function sortMediaQueries({
  media,
  ...props
}) {
  const breakpoints = Object.keys(media);
  const sortedMedia = breakpoints.sort((a2, b2) => Number(replaceMediaQuery(a2)) - Number(replaceMediaQuery(b2))).map((query) => ({ query, styles: media[query] }));
  return { ...props, media: sortedMedia };
}
function hasResponsiveStyles(styleProp) {
  if (typeof styleProp !== "object" || styleProp === null) {
    return false;
  }
  const breakpoints = Object.keys(styleProp);
  if (breakpoints.length === 1 && breakpoints[0] === "base") {
    return false;
  }
  return true;
}
function getBaseValue(value) {
  if (typeof value === "object" && value !== null) {
    if ("base" in value) {
      return value.base;
    }
    return void 0;
  }
  return value;
}
function getBreakpointKeys(value) {
  if (typeof value === "object" && value !== null) {
    return keys(value).filter((key) => key !== "base");
  }
  return [];
}
function getBreakpointValue(value, breakpoint) {
  if (typeof value === "object" && value !== null && breakpoint in value) {
    return value[breakpoint];
  }
  return value;
}
function parseStyleProps({
  styleProps,
  data,
  theme: theme2
}) {
  return sortMediaQueries(
    keys(styleProps).reduce(
      (acc, styleProp) => {
        if (styleProp === "hiddenFrom" || styleProp === "visibleFrom" || styleProp === "sx") {
          return acc;
        }
        const propertyData = data[styleProp];
        const properties = Array.isArray(propertyData.property) ? propertyData.property : [propertyData.property];
        const baseValue = getBaseValue(styleProps[styleProp]);
        if (!hasResponsiveStyles(styleProps[styleProp])) {
          properties.forEach((property) => {
            acc.inlineStyles[property] = resolvers[propertyData.type](baseValue, theme2);
          });
          return acc;
        }
        acc.hasResponsiveStyles = true;
        const breakpoints = getBreakpointKeys(styleProps[styleProp]);
        properties.forEach((property) => {
          if (baseValue != null) {
            acc.styles[property] = resolvers[propertyData.type](baseValue, theme2);
          }
          breakpoints.forEach((breakpoint) => {
            const bp = `(min-width: ${theme2.breakpoints[breakpoint]})`;
            acc.media[bp] = {
              ...acc.media[bp],
              [property]: resolvers[propertyData.type](
                getBreakpointValue(styleProps[styleProp], breakpoint),
                theme2
              )
            };
          });
        });
        return acc;
      },
      {
        hasResponsiveStyles: false,
        styles: {},
        inlineStyles: {},
        media: {}
      }
    )
  );
}
function useRandomClassName() {
  const id = g$2().replace(/[:«»]/g, "");
  return `__m__-${id}`;
}
function createPolymorphicComponent(component) {
  return component;
}
function transformModKey(key) {
  return key.startsWith("data-") ? key : `data-${key}`;
}
function getMod(props) {
  return Object.keys(props).reduce((acc, key) => {
    const value = props[key];
    if (value === void 0 || value === "" || value === false || value === null) {
      return acc;
    }
    acc[transformModKey(key)] = props[key];
    return acc;
  }, {});
}
function getBoxMod(mod) {
  if (!mod) {
    return null;
  }
  if (typeof mod === "string") {
    return { [transformModKey(mod)]: true };
  }
  if (Array.isArray(mod)) {
    return [...mod].reduce(
      (acc, value) => ({ ...acc, ...getBoxMod(value) }),
      {}
    );
  }
  return getMod(mod);
}
function mergeStyles(styles, theme2) {
  if (Array.isArray(styles)) {
    return [...styles].reduce(
      (acc, item) => ({ ...acc, ...mergeStyles(item, theme2) }),
      {}
    );
  }
  if (typeof styles === "function") {
    return styles(theme2);
  }
  if (styles == null) {
    return {};
  }
  return styles;
}
function getBoxStyle({
  theme: theme2,
  style,
  vars,
  styleProps
}) {
  const _style = mergeStyles(style, theme2);
  const _vars = mergeStyles(vars, theme2);
  return { ..._style, ..._vars, ...styleProps };
}
const _Box = D(
  ({
    component,
    style,
    __vars,
    className,
    variant,
    mod,
    size,
    hiddenFrom,
    visibleFrom,
    lightHidden,
    darkHidden,
    renderRoot,
    __size,
    ...others
  }, ref) => {
    const theme2 = useMantineTheme();
    const Element = component || "div";
    const { styleProps, rest } = extractStyleProps(others);
    const useSxTransform = useMantineSxTransform();
    const transformedSx = useSxTransform?.()?.(styleProps.sx);
    const responsiveClassName = useRandomClassName();
    const parsedStyleProps = parseStyleProps({
      styleProps,
      theme: theme2,
      data: STYlE_PROPS_DATA
    });
    const props = {
      ref,
      style: getBoxStyle({
        theme: theme2,
        style,
        vars: __vars,
        styleProps: parsedStyleProps.inlineStyles
      }),
      className: clsx(className, transformedSx, {
        [responsiveClassName]: parsedStyleProps.hasResponsiveStyles,
        "mantine-light-hidden": lightHidden,
        "mantine-dark-hidden": darkHidden,
        [`mantine-hidden-from-${hiddenFrom}`]: hiddenFrom,
        [`mantine-visible-from-${visibleFrom}`]: visibleFrom
      }),
      "data-variant": variant,
      "data-size": isNumberLike(size) ? void 0 : size || void 0,
      size: __size,
      ...getBoxMod(mod),
      ...rest
    };
    return /* @__PURE__ */ u(S$1, { children: [
      parsedStyleProps.hasResponsiveStyles && /* @__PURE__ */ u(
        InlineStyles,
        {
          selector: `.${responsiveClassName}`,
          styles: parsedStyleProps.styles,
          media: parsedStyleProps.media
        }
      ),
      typeof renderRoot === "function" ? renderRoot(props) : /* @__PURE__ */ u(Element, { ...props })
    ] });
  }
);
_Box.displayName = "@mantine/core/Box";
const Box = createPolymorphicComponent(_Box);
function identity(value) {
  return value;
}
function factory(ui) {
  const Component = D(ui);
  Component.extend = identity;
  Component.withProps = (fixedProps) => {
    const Extended = D((props, ref) => /* @__PURE__ */ u(Component, { ...fixedProps, ...props, ref }));
    Extended.extend = Component.extend;
    Extended.displayName = `WithProps(${Component.displayName})`;
    return Extended;
  };
  return Component;
}
function polymorphicFactory(ui) {
  const Component = D(ui);
  Component.withProps = (fixedProps) => {
    const Extended = D((props, ref) => /* @__PURE__ */ u(Component, { ...fixedProps, ...props, ref }));
    Extended.extend = Component.extend;
    Extended.displayName = `WithProps(${Component.displayName})`;
    return Extended;
  };
  Component.extend = identity;
  return Component;
}
const DirectionContext = X$1({
  dir: "ltr",
  toggleDirection: () => {
  },
  setDirection: () => {
  }
});
function useDirection() {
  return x$2(DirectionContext);
}
function useMergeRefs(refs) {
  const cleanupRef = A$1(void 0);
  const refEffect = q$1((instance) => {
    const cleanups = refs.map((ref) => {
      if (ref == null) {
        return;
      }
      if (typeof ref === "function") {
        const refCallback = ref;
        const refCleanup = refCallback(instance);
        return typeof refCleanup === "function" ? refCleanup : () => {
          refCallback(null);
        };
      }
      ref.current = instance;
      return () => {
        ref.current = null;
      };
    });
    return () => {
      cleanups.forEach((refCleanup) => refCleanup == null ? void 0 : refCleanup());
    };
  }, refs);
  return T$1(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (value) => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = void 0;
      }
      if (value != null) {
        cleanupRef.current = refEffect(value);
      }
    };
  }, refs);
}
var classes$5 = { "root": "m_d57069b5", "content": "m_b1336c6", "viewport": "m_c0783ff9", "viewportInner": "m_f8f631dd", "scrollbar": "m_c44ba933", "thumb": "m_d8b5e363", "corner": "m_21657268" };
const [ScrollAreaProvider, useScrollAreaContext] = createSafeContext(
  "ScrollArea.Root component was not found in tree"
);
function useResizeObserver(element, onResize) {
  const handleResize = useCallbackRef(onResize);
  useIsomorphicEffect(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
    return void 0;
  }, [element, handleResize]);
}
const Corner = D((props, ref) => {
  const { style, ...others } = props;
  const ctx = useScrollAreaContext();
  const [width, setWidth] = d$1(0);
  const [height, setHeight] = d$1(0);
  const hasSize = Boolean(width && height);
  useResizeObserver(ctx.scrollbarX, () => {
    const h2 = ctx.scrollbarX?.offsetHeight || 0;
    ctx.onCornerHeightChange(h2);
    setHeight(h2);
  });
  useResizeObserver(ctx.scrollbarY, () => {
    const w2 = ctx.scrollbarY?.offsetWidth || 0;
    ctx.onCornerWidthChange(w2);
    setWidth(w2);
  });
  return hasSize ? /* @__PURE__ */ u("div", { ...others, ref, style: { ...style, width, height } }) : null;
});
const ScrollAreaCorner = D((props, ref) => {
  const ctx = useScrollAreaContext();
  const hasBothScrollbarsVisible = Boolean(ctx.scrollbarX && ctx.scrollbarY);
  const hasCorner = ctx.type !== "scroll" && hasBothScrollbarsVisible;
  return hasCorner ? /* @__PURE__ */ u(Corner, { ...props, ref }) : null;
});
const defaultProps$7 = {
  scrollHideDelay: 1e3,
  type: "hover"
};
const ScrollAreaRoot = D((_props, ref) => {
  const { type, scrollHideDelay, scrollbars, getStyles, ...others } = useProps(
    "ScrollAreaRoot",
    defaultProps$7,
    _props
  );
  const [scrollArea2, setScrollArea] = d$1(null);
  const [viewport, setViewport] = d$1(null);
  const [content, setContent] = d$1(null);
  const [scrollbarX, setScrollbarX] = d$1(null);
  const [scrollbarY, setScrollbarY] = d$1(null);
  const [cornerWidth, setCornerWidth] = d$1(0);
  const [cornerHeight, setCornerHeight] = d$1(0);
  const [scrollbarXEnabled, setScrollbarXEnabled] = d$1(false);
  const [scrollbarYEnabled, setScrollbarYEnabled] = d$1(false);
  const rootRef = useMergedRef(ref, (node) => setScrollArea(node));
  return /* @__PURE__ */ u(
    ScrollAreaProvider,
    {
      value: {
        type,
        scrollHideDelay,
        scrollArea: scrollArea2,
        viewport,
        onViewportChange: setViewport,
        content,
        onContentChange: setContent,
        scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight,
        getStyles
      },
      children: /* @__PURE__ */ u(
        Box,
        {
          ...others,
          ref: rootRef,
          __vars: {
            "--sa-corner-width": scrollbars !== "xy" ? "0px" : `${cornerWidth}px`,
            "--sa-corner-height": scrollbars !== "xy" ? "0px" : `${cornerHeight}px`
          }
        }
      )
    }
  );
});
ScrollAreaRoot.displayName = "@mantine/core/ScrollAreaRoot";
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return Number.isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) {
      return output[0];
    }
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function clamp(value, [min, max]) {
  return Math.min(max, Math.max(min, value));
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset;
  const minPointerPos = sizes.scrollbar.paddingStart + offset;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
function toInt(value) {
  return value ? parseInt(value, 10) : 0;
}
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return (event) => {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      ourEventHandler?.(event);
    }
  };
}
const [ScrollbarProvider, useScrollbarContext] = createSafeContext(
  "ScrollAreaScrollbar was not found in tree"
);
const Scrollbar = D((props, forwardedRef) => {
  const {
    sizes,
    hasThumb,
    onThumbChange,
    onThumbPointerUp,
    onThumbPointerDown,
    onThumbPositionChange,
    onDragScroll,
    onWheelScroll,
    onResize,
    ...scrollbarProps
  } = props;
  const context = useScrollAreaContext();
  const [scrollbar, setScrollbar] = d$1(null);
  const composeRefs = useMergedRef(forwardedRef, (node) => setScrollbar(node));
  const rectRef = A$1(null);
  const prevWebkitUserSelectRef = A$1("");
  const { viewport } = context;
  const maxScrollPos = sizes.content - sizes.viewport;
  const handleWheelScroll = useCallbackRef(onWheelScroll);
  const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
  const handleResize = useDebouncedCallback(onResize, 10);
  const handleDragScroll = (event) => {
    if (rectRef.current) {
      const x2 = event.clientX - rectRef.current.left;
      const y2 = event.clientY - rectRef.current.top;
      onDragScroll({ x: x2, y: y2 });
    }
  };
  h$1(() => {
    const handleWheel = (event) => {
      const element = event.target;
      const isScrollbarWheel = scrollbar?.contains(element);
      if (isScrollbarWheel) {
        handleWheelScroll(event, maxScrollPos);
      }
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel, { passive: false });
  }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);
  h$1(handleThumbPositionChange, [sizes, handleThumbPositionChange]);
  useResizeObserver(scrollbar, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ u(
    ScrollbarProvider,
    {
      value: {
        scrollbar,
        hasThumb,
        onThumbChange: useCallbackRef(onThumbChange),
        onThumbPointerUp: useCallbackRef(onThumbPointerUp),
        onThumbPositionChange: handleThumbPositionChange,
        onThumbPointerDown: useCallbackRef(onThumbPointerDown)
      },
      children: /* @__PURE__ */ u(
        "div",
        {
          ...scrollbarProps,
          ref: composeRefs,
          "data-mantine-scrollbar": true,
          style: { position: "absolute", ...scrollbarProps.style },
          onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
            event.preventDefault();
            const mainPointer = 0;
            if (event.button === mainPointer) {
              const element = event.target;
              element.setPointerCapture(event.pointerId);
              rectRef.current = scrollbar.getBoundingClientRect();
              prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
              document.body.style.webkitUserSelect = "none";
              handleDragScroll(event);
            }
          }),
          onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
          onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
            const element = event.target;
            if (element.hasPointerCapture(event.pointerId)) {
              event.preventDefault();
              element.releasePointerCapture(event.pointerId);
            }
          }),
          onLostPointerCapture: () => {
            document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
            rectRef.current = null;
          }
        }
      )
    }
  );
});
const ScrollAreaScrollbarX = D(
  (props, forwardedRef) => {
    const { sizes, onSizesChange, style, ...others } = props;
    const ctx = useScrollAreaContext();
    const [computedStyle, setComputedStyle] = d$1();
    const ref = A$1(null);
    const composeRefs = useMergedRef(forwardedRef, ref, ctx.onScrollbarXChange);
    h$1(() => {
      if (ref.current) {
        setComputedStyle(getComputedStyle(ref.current));
      }
    }, [ref]);
    return /* @__PURE__ */ u(
      Scrollbar,
      {
        "data-orientation": "horizontal",
        ...others,
        ref: composeRefs,
        sizes,
        style: {
          ...style,
          ["--sa-thumb-width"]: `${getThumbSize(sizes)}px`
        },
        onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
        onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
        onWheelScroll: (event, maxScrollPos) => {
          if (ctx.viewport) {
            const scrollPos = ctx.viewport.scrollLeft + event.deltaX;
            props.onWheelScroll(scrollPos);
            if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
              event.preventDefault();
            }
          }
        },
        onResize: () => {
          if (ref.current && ctx.viewport && computedStyle) {
            onSizesChange({
              content: ctx.viewport.scrollWidth,
              viewport: ctx.viewport.offsetWidth,
              scrollbar: {
                size: ref.current.clientWidth,
                paddingStart: toInt(computedStyle.paddingLeft),
                paddingEnd: toInt(computedStyle.paddingRight)
              }
            });
          }
        }
      }
    );
  }
);
ScrollAreaScrollbarX.displayName = "@mantine/core/ScrollAreaScrollbarX";
const ScrollAreaScrollbarY = D(
  (props, forwardedRef) => {
    const { sizes, onSizesChange, style, ...others } = props;
    const context = useScrollAreaContext();
    const [computedStyle, setComputedStyle] = d$1();
    const ref = A$1(null);
    const composeRefs = useMergedRef(forwardedRef, ref, context.onScrollbarYChange);
    h$1(() => {
      if (ref.current) {
        setComputedStyle(window.getComputedStyle(ref.current));
      }
    }, []);
    return /* @__PURE__ */ u(
      Scrollbar,
      {
        ...others,
        "data-orientation": "vertical",
        ref: composeRefs,
        sizes,
        style: {
          ["--sa-thumb-height"]: `${getThumbSize(sizes)}px`,
          ...style
        },
        onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
        onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
        onWheelScroll: (event, maxScrollPos) => {
          if (context.viewport) {
            const scrollPos = context.viewport.scrollTop + event.deltaY;
            props.onWheelScroll(scrollPos);
            if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
              event.preventDefault();
            }
          }
        },
        onResize: () => {
          if (ref.current && context.viewport && computedStyle) {
            onSizesChange({
              content: context.viewport.scrollHeight,
              viewport: context.viewport.offsetHeight,
              scrollbar: {
                size: ref.current.clientHeight,
                paddingStart: toInt(computedStyle.paddingTop),
                paddingEnd: toInt(computedStyle.paddingBottom)
              }
            });
          }
        }
      }
    );
  }
);
ScrollAreaScrollbarY.displayName = "@mantine/core/ScrollAreaScrollbarY";
const ScrollAreaScrollbarVisible = D((props, forwardedRef) => {
  const { orientation = "vertical", ...scrollbarProps } = props;
  const { dir } = useDirection();
  const context = useScrollAreaContext();
  const thumbRef = A$1(null);
  const pointerOffsetRef = A$1(0);
  const [sizes, setSizes] = d$1({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  });
  const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
  const commonProps = {
    ...scrollbarProps,
    sizes,
    onSizesChange: setSizes,
    hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
    onThumbChange: (thumb) => {
      thumbRef.current = thumb;
    },
    onThumbPointerUp: () => {
      pointerOffsetRef.current = 0;
    },
    onThumbPointerDown: (pointerPos) => {
      pointerOffsetRef.current = pointerPos;
    }
  };
  const getScrollPosition = (pointerPos, direction) => getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, direction);
  if (orientation === "horizontal") {
    return /* @__PURE__ */ u(
      ScrollAreaScrollbarX,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollLeft;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes, dir);
            thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) {
            context.viewport.scrollLeft = scrollPos;
          }
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) {
            context.viewport.scrollLeft = getScrollPosition(pointerPos, dir);
          }
        }
      }
    );
  }
  if (orientation === "vertical") {
    return /* @__PURE__ */ u(
      ScrollAreaScrollbarY,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollTop;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes);
            if (sizes.scrollbar.size === 0) {
              thumbRef.current.style.setProperty("--thumb-opacity", "0");
            } else {
              thumbRef.current.style.setProperty("--thumb-opacity", "1");
            }
            thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) {
            context.viewport.scrollTop = scrollPos;
          }
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) {
            context.viewport.scrollTop = getScrollPosition(pointerPos);
          }
        }
      }
    );
  }
  return null;
});
ScrollAreaScrollbarVisible.displayName = "@mantine/core/ScrollAreaScrollbarVisible";
const ScrollAreaScrollbarAuto = D(
  (props, ref) => {
    const context = useScrollAreaContext();
    const { forceMount, ...scrollbarProps } = props;
    const [visible, setVisible] = d$1(false);
    const isHorizontal = props.orientation === "horizontal";
    const handleResize = useDebouncedCallback(() => {
      if (context.viewport) {
        const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
        const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
        setVisible(isHorizontal ? isOverflowX : isOverflowY);
      }
    }, 10);
    useResizeObserver(context.viewport, handleResize);
    useResizeObserver(context.content, handleResize);
    if (forceMount || visible) {
      return /* @__PURE__ */ u(
        ScrollAreaScrollbarVisible,
        {
          "data-state": visible ? "visible" : "hidden",
          ...scrollbarProps,
          ref
        }
      );
    }
    return null;
  }
);
ScrollAreaScrollbarAuto.displayName = "@mantine/core/ScrollAreaScrollbarAuto";
const ScrollAreaScrollbarHover = D(
  (props, ref) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext();
    const [visible, setVisible] = d$1(false);
    h$1(() => {
      const { scrollArea: scrollArea2 } = context;
      let hideTimer = 0;
      if (scrollArea2) {
        const handlePointerEnter = () => {
          window.clearTimeout(hideTimer);
          setVisible(true);
        };
        const handlePointerLeave = () => {
          hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
        };
        scrollArea2.addEventListener("pointerenter", handlePointerEnter);
        scrollArea2.addEventListener("pointerleave", handlePointerLeave);
        return () => {
          window.clearTimeout(hideTimer);
          scrollArea2.removeEventListener("pointerenter", handlePointerEnter);
          scrollArea2.removeEventListener("pointerleave", handlePointerLeave);
        };
      }
      return void 0;
    }, [context.scrollArea, context.scrollHideDelay]);
    if (forceMount || visible) {
      return /* @__PURE__ */ u(
        ScrollAreaScrollbarAuto,
        {
          "data-state": visible ? "visible" : "hidden",
          ...scrollbarProps,
          ref
        }
      );
    }
    return null;
  }
);
ScrollAreaScrollbarHover.displayName = "@mantine/core/ScrollAreaScrollbarHover";
const ScrollAreaScrollbarScroll = D(
  (props, red) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext();
    const isHorizontal = props.orientation === "horizontal";
    const [state, setState] = d$1("hidden");
    const debounceScrollEnd = useDebouncedCallback(() => setState("idle"), 100);
    h$1(() => {
      if (state === "idle") {
        const hideTimer = window.setTimeout(() => setState("hidden"), context.scrollHideDelay);
        return () => window.clearTimeout(hideTimer);
      }
      return void 0;
    }, [state, context.scrollHideDelay]);
    h$1(() => {
      const { viewport } = context;
      const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
      if (viewport) {
        let prevScrollPos = viewport[scrollDirection];
        const handleScroll = () => {
          const scrollPos = viewport[scrollDirection];
          const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
          if (hasScrollInDirectionChanged) {
            setState("scrolling");
            debounceScrollEnd();
          }
          prevScrollPos = scrollPos;
        };
        viewport.addEventListener("scroll", handleScroll);
        return () => viewport.removeEventListener("scroll", handleScroll);
      }
      return void 0;
    }, [context.viewport, isHorizontal, debounceScrollEnd]);
    if (forceMount || state !== "hidden") {
      return /* @__PURE__ */ u(
        ScrollAreaScrollbarVisible,
        {
          "data-state": state === "hidden" ? "hidden" : "visible",
          ...scrollbarProps,
          ref: red,
          onPointerEnter: composeEventHandlers(props.onPointerEnter, () => setState("interacting")),
          onPointerLeave: composeEventHandlers(props.onPointerLeave, () => setState("idle"))
        }
      );
    }
    return null;
  }
);
const ScrollAreaScrollbar = D(
  (props, forwardedRef) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext();
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
    const isHorizontal = props.orientation === "horizontal";
    h$1(() => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
      return () => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
      };
    }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);
    return context.type === "hover" ? /* @__PURE__ */ u(ScrollAreaScrollbarHover, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "scroll" ? /* @__PURE__ */ u(ScrollAreaScrollbarScroll, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "auto" ? /* @__PURE__ */ u(ScrollAreaScrollbarAuto, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "always" ? /* @__PURE__ */ u(ScrollAreaScrollbarVisible, { ...scrollbarProps, ref: forwardedRef }) : null;
  }
);
ScrollAreaScrollbar.displayName = "@mantine/core/ScrollAreaScrollbar";
function addUnlinkedScrollListener(node, handler = () => {
}) {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll) {
      handler();
    }
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
}
const Thumb = D((props, forwardedRef) => {
  const { style, ...others } = props;
  const scrollAreaContext = useScrollAreaContext();
  const scrollbarContext = useScrollbarContext();
  const { onThumbPositionChange } = scrollbarContext;
  const composedRef = useMergedRef(forwardedRef, (node) => scrollbarContext.onThumbChange(node));
  const removeUnlinkedScrollListenerRef = A$1(void 0);
  const debounceScrollEnd = useDebouncedCallback(() => {
    if (removeUnlinkedScrollListenerRef.current) {
      removeUnlinkedScrollListenerRef.current();
      removeUnlinkedScrollListenerRef.current = void 0;
    }
  }, 100);
  h$1(() => {
    const { viewport } = scrollAreaContext;
    if (viewport) {
      const handleScroll = () => {
        debounceScrollEnd();
        if (!removeUnlinkedScrollListenerRef.current) {
          const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
          removeUnlinkedScrollListenerRef.current = listener;
          onThumbPositionChange();
        }
      };
      onThumbPositionChange();
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
    return void 0;
  }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);
  return /* @__PURE__ */ u(
    "div",
    {
      "data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
      ...others,
      ref: composedRef,
      style: {
        width: "var(--sa-thumb-width)",
        height: "var(--sa-thumb-height)",
        ...style
      },
      onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
        const thumb = event.target;
        const thumbRect = thumb.getBoundingClientRect();
        const x2 = event.clientX - thumbRect.left;
        const y2 = event.clientY - thumbRect.top;
        scrollbarContext.onThumbPointerDown({ x: x2, y: y2 });
      }),
      onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
    }
  );
});
Thumb.displayName = "@mantine/core/ScrollAreaThumb";
const ScrollAreaThumb = D(
  (props, forwardedRef) => {
    const { forceMount, ...thumbProps } = props;
    const scrollbarContext = useScrollbarContext();
    if (forceMount || scrollbarContext.hasThumb) {
      return /* @__PURE__ */ u(Thumb, { ref: forwardedRef, ...thumbProps });
    }
    return null;
  }
);
ScrollAreaThumb.displayName = "@mantine/core/ScrollAreaThumb";
const ScrollAreaViewport = D(
  ({ children, style, onWheel, ...others }, ref) => {
    const ctx = useScrollAreaContext();
    const rootRef = useMergedRef(ref, ctx.onViewportChange);
    const handleWheel = (event) => {
      onWheel?.(event);
      if (ctx.scrollbarXEnabled && ctx.viewport && event.shiftKey) {
        const { scrollTop, scrollHeight, clientHeight, scrollWidth, clientWidth } = ctx.viewport;
        const isAtTop = scrollTop < 1;
        const isAtBottom = scrollTop >= scrollHeight - clientHeight - 1;
        const canScrollHorizontally = scrollWidth > clientWidth;
        if (canScrollHorizontally && (isAtTop || isAtBottom)) {
          event.stopPropagation();
        }
      }
    };
    return /* @__PURE__ */ u(
      Box,
      {
        ...others,
        ref: rootRef,
        onWheel: handleWheel,
        style: {
          overflowX: ctx.scrollbarXEnabled ? "scroll" : "hidden",
          overflowY: ctx.scrollbarYEnabled ? "scroll" : "hidden",
          ...style
        },
        children: /* @__PURE__ */ u("div", { ...ctx.getStyles("content"), ref: ctx.onContentChange, children })
      }
    );
  }
);
ScrollAreaViewport.displayName = "@mantine/core/ScrollAreaViewport";
const defaultProps$6 = {
  scrollHideDelay: 1e3,
  type: "hover",
  scrollbars: "xy"
};
const varsResolver$4 = createVarsResolver(
  (_2, { scrollbarSize, overscrollBehavior, scrollbars }) => {
    let overrideOverscrollBehavior = overscrollBehavior;
    if (overscrollBehavior && scrollbars) {
      if (scrollbars === "x") {
        overrideOverscrollBehavior = `${overscrollBehavior} auto`;
      } else if (scrollbars === "y") {
        overrideOverscrollBehavior = `auto ${overscrollBehavior}`;
      }
    }
    return {
      root: {
        "--scrollarea-scrollbar-size": rem(scrollbarSize),
        "--scrollarea-over-scroll-behavior": overrideOverscrollBehavior
      }
    };
  }
);
const ScrollArea = factory((_props, ref) => {
  const props = useProps("ScrollArea", defaultProps$6, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    scrollbarSize,
    vars,
    type,
    scrollHideDelay,
    viewportProps,
    viewportRef,
    onScrollPositionChange,
    children,
    offsetScrollbars,
    scrollbars,
    onBottomReached,
    onTopReached,
    overscrollBehavior,
    attributes,
    ...others
  } = props;
  const [scrollbarHovered, setScrollbarHovered] = d$1(false);
  const [verticalThumbVisible, setVerticalThumbVisible] = d$1(false);
  const [horizontalThumbVisible, setHorizontalThumbVisible] = d$1(false);
  const getStyles = useStyles({
    name: "ScrollArea",
    props,
    classes: classes$5,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$4
  });
  const localViewportRef = A$1(null);
  const combinedViewportRef = useMergeRefs([viewportRef, localViewportRef]);
  h$1(() => {
    if (!localViewportRef.current) {
      return;
    }
    if (offsetScrollbars !== "present") {
      return;
    }
    const element = localViewportRef.current;
    const observer = new ResizeObserver(() => {
      const { scrollHeight, clientHeight, scrollWidth, clientWidth } = element;
      setVerticalThumbVisible(scrollHeight > clientHeight);
      setHorizontalThumbVisible(scrollWidth > clientWidth);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [localViewportRef, offsetScrollbars]);
  return /* @__PURE__ */ u(
    ScrollAreaRoot,
    {
      getStyles,
      type: type === "never" ? "always" : type,
      scrollHideDelay,
      ref,
      scrollbars,
      ...getStyles("root"),
      ...others,
      children: [
        /* @__PURE__ */ u(
          ScrollAreaViewport,
          {
            ...viewportProps,
            ...getStyles("viewport", { style: viewportProps?.style }),
            ref: combinedViewportRef,
            "data-offset-scrollbars": offsetScrollbars === true ? "xy" : offsetScrollbars || void 0,
            "data-scrollbars": scrollbars || void 0,
            "data-horizontal-hidden": offsetScrollbars === "present" && !horizontalThumbVisible ? "true" : void 0,
            "data-vertical-hidden": offsetScrollbars === "present" && !verticalThumbVisible ? "true" : void 0,
            onScroll: (e2) => {
              viewportProps?.onScroll?.(e2);
              onScrollPositionChange?.({ x: e2.currentTarget.scrollLeft, y: e2.currentTarget.scrollTop });
              const { scrollTop, scrollHeight, clientHeight } = e2.currentTarget;
              if (scrollTop - (scrollHeight - clientHeight) >= -0.8) {
                onBottomReached?.();
              }
              if (scrollTop === 0) {
                onTopReached?.();
              }
            },
            children
          }
        ),
        (scrollbars === "xy" || scrollbars === "x") && /* @__PURE__ */ u(
          ScrollAreaScrollbar,
          {
            ...getStyles("scrollbar"),
            orientation: "horizontal",
            "data-hidden": type === "never" || offsetScrollbars === "present" && !horizontalThumbVisible ? true : void 0,
            forceMount: true,
            onMouseEnter: () => setScrollbarHovered(true),
            onMouseLeave: () => setScrollbarHovered(false),
            children: /* @__PURE__ */ u(ScrollAreaThumb, { ...getStyles("thumb") })
          }
        ),
        (scrollbars === "xy" || scrollbars === "y") && /* @__PURE__ */ u(
          ScrollAreaScrollbar,
          {
            ...getStyles("scrollbar"),
            orientation: "vertical",
            "data-hidden": type === "never" || offsetScrollbars === "present" && !verticalThumbVisible ? true : void 0,
            forceMount: true,
            onMouseEnter: () => setScrollbarHovered(true),
            onMouseLeave: () => setScrollbarHovered(false),
            children: /* @__PURE__ */ u(ScrollAreaThumb, { ...getStyles("thumb") })
          }
        ),
        /* @__PURE__ */ u(
          ScrollAreaCorner,
          {
            ...getStyles("corner"),
            "data-hovered": scrollbarHovered || void 0,
            "data-hidden": type === "never" || void 0
          }
        )
      ]
    }
  );
});
ScrollArea.displayName = "@mantine/core/ScrollArea";
const ScrollAreaAutosize = factory((props, ref) => {
  const {
    children,
    classNames,
    styles,
    scrollbarSize,
    scrollHideDelay,
    type,
    dir,
    offsetScrollbars,
    overscrollBehavior,
    viewportRef,
    onScrollPositionChange,
    unstyled,
    variant,
    viewportProps,
    scrollbars,
    style,
    vars,
    onBottomReached,
    onTopReached,
    onOverflowChange,
    ...others
  } = useProps("ScrollAreaAutosize", defaultProps$6, props);
  const viewportObserverRef = A$1(null);
  const combinedViewportRef = useMergeRefs([viewportRef, viewportObserverRef]);
  const [overflowing, setOverflowing] = d$1(false);
  const didMount = A$1(false);
  h$1(() => {
    if (!onOverflowChange) {
      return;
    }
    const el = viewportObserverRef.current;
    if (!el) {
      return;
    }
    const update = () => {
      const isOverflowing = el.scrollHeight > el.clientHeight;
      if (isOverflowing !== overflowing) {
        if (didMount.current) {
          onOverflowChange?.(isOverflowing);
        } else {
          didMount.current = true;
          if (isOverflowing) {
            onOverflowChange?.(true);
          }
        }
        setOverflowing(isOverflowing);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [onOverflowChange, overflowing]);
  return /* @__PURE__ */ u(Box, { ...others, ref, style: [{ display: "flex", overflow: "hidden" }, style], children: /* @__PURE__ */ u(
    Box,
    {
      style: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflow: "hidden",
        ...scrollbars === "y" && { minWidth: 0 },
        ...scrollbars === "x" && { minHeight: 0 },
        ...scrollbars === "xy" && { minWidth: 0, minHeight: 0 },
        ...scrollbars === false && { minWidth: 0, minHeight: 0 }
      },
      children: /* @__PURE__ */ u(
        ScrollArea,
        {
          classNames,
          styles,
          scrollHideDelay,
          scrollbarSize,
          type,
          dir,
          offsetScrollbars,
          overscrollBehavior,
          viewportRef: combinedViewportRef,
          onScrollPositionChange,
          unstyled,
          variant,
          viewportProps,
          vars,
          scrollbars,
          onBottomReached,
          onTopReached,
          "data-autosize": "true",
          children
        }
      )
    }
  ) });
});
ScrollArea.classes = classes$5;
ScrollAreaAutosize.displayName = "@mantine/core/ScrollAreaAutosize";
ScrollAreaAutosize.classes = classes$5;
ScrollArea.Autosize = ScrollAreaAutosize;
var classes$4 = { "root": "m_87cf2631" };
const defaultProps$5 = {
  __staticSelector: "UnstyledButton"
};
const UnstyledButton = polymorphicFactory(
  (_props, ref) => {
    const props = useProps("UnstyledButton", defaultProps$5, _props);
    const {
      className,
      component = "button",
      __staticSelector,
      unstyled,
      classNames,
      styles,
      style,
      attributes,
      ...others
    } = props;
    const getStyles = useStyles({
      name: __staticSelector,
      props,
      classes: classes$4,
      className,
      style,
      classNames,
      styles,
      unstyled,
      attributes
    });
    return /* @__PURE__ */ u(
      Box,
      {
        ...getStyles("root", { focusable: true }),
        component,
        ref,
        type: component === "button" ? "button" : void 0,
        ...others
      }
    );
  }
);
UnstyledButton.classes = classes$4;
UnstyledButton.displayName = "@mantine/core/UnstyledButton";
function createPortalNode(props) {
  const node = document.createElement("div");
  node.setAttribute("data-portal", "true");
  typeof props.className === "string" && node.classList.add(...props.className.split(" ").filter(Boolean));
  typeof props.style === "object" && Object.assign(node.style, props.style);
  typeof props.id === "string" && node.setAttribute("id", props.id);
  return node;
}
function getTargetNode({ target, reuseTargetNode, ...others }) {
  if (target) {
    if (typeof target === "string") {
      return document.querySelector(target) || createPortalNode(others);
    }
    return target;
  }
  if (reuseTargetNode) {
    const existingNode = document.querySelector("[data-mantine-shared-portal-node]");
    if (existingNode) {
      return existingNode;
    }
    const node = createPortalNode(others);
    node.setAttribute("data-mantine-shared-portal-node", "true");
    document.body.appendChild(node);
    return node;
  }
  return createPortalNode(others);
}
const defaultProps$4 = {
  reuseTargetNode: true
};
const Portal = factory((props, ref) => {
  const { children, target, reuseTargetNode, ...others } = useProps("Portal", defaultProps$4, props);
  const [mounted, setMounted] = d$1(false);
  const nodeRef = A$1(null);
  useIsomorphicEffect(() => {
    setMounted(true);
    nodeRef.current = getTargetNode({ target, reuseTargetNode, ...others });
    assignRef(ref, nodeRef.current);
    if (!target && !reuseTargetNode && nodeRef.current) {
      document.body.appendChild(nodeRef.current);
    }
    return () => {
      if (!target && !reuseTargetNode && nodeRef.current) {
        document.body.removeChild(nodeRef.current);
      }
    };
  }, [target]);
  if (!mounted || !nodeRef.current) {
    return null;
  }
  return $$1(/* @__PURE__ */ u(S$1, { children }), nodeRef.current);
});
Portal.displayName = "@mantine/core/Portal";
const OptionalPortal = factory(
  ({ withinPortal = true, children, ...others }, ref) => {
    const env = useMantineEnv();
    if (env === "test" || !withinPortal) {
      return /* @__PURE__ */ u(S$1, { children });
    }
    return /* @__PURE__ */ u(Portal, { ref, ...others, children });
  }
);
OptionalPortal.displayName = "@mantine/core/OptionalPortal";
function filterFalsyChildren(children) {
  return L.toArray(children).filter(Boolean);
}
var classes$3 = { "root": "m_4081bf90" };
const defaultProps$3 = {
  preventGrowOverflow: true,
  gap: "md",
  align: "center",
  justify: "flex-start",
  wrap: "wrap"
};
const varsResolver$3 = createVarsResolver(
  (_2, { grow, preventGrowOverflow, gap, align, justify, wrap }, { childWidth }) => ({
    root: {
      "--group-child-width": grow && preventGrowOverflow ? childWidth : void 0,
      "--group-gap": getSpacing(gap),
      "--group-align": align,
      "--group-justify": justify,
      "--group-wrap": wrap
    }
  })
);
const Group = factory((_props, ref) => {
  const props = useProps("Group", defaultProps$3, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    children,
    gap,
    align,
    justify,
    wrap,
    grow,
    preventGrowOverflow,
    vars,
    variant,
    __size,
    mod,
    attributes,
    ...others
  } = props;
  const filteredChildren = filterFalsyChildren(children);
  const childrenCount = filteredChildren.length;
  const resolvedGap = getSpacing(gap ?? "md");
  const childWidth = `calc(${100 / childrenCount}% - (${resolvedGap} - ${resolvedGap} / ${childrenCount}))`;
  const stylesCtx = { childWidth };
  const getStyles = useStyles({
    name: "Group",
    props,
    stylesCtx,
    className,
    style,
    classes: classes$3,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$3
  });
  return /* @__PURE__ */ u(
    Box,
    {
      ...getStyles("root"),
      ref,
      variant,
      mod: [{ grow }, mod],
      size: __size,
      ...others,
      children: filteredChildren
    }
  );
});
Group.classes = classes$3;
Group.displayName = "@mantine/core/Group";
var classes$2 = { "root": "m_7f854edf" };
const defaultProps$2 = {
  position: { bottom: 0, right: 0 },
  zIndex: getDefaultZIndex("modal"),
  withinPortal: true
};
const varsResolver$2 = createVarsResolver((_2, { zIndex, position }) => ({
  root: {
    "--affix-z-index": zIndex?.toString(),
    "--affix-top": getSpacing(position?.top),
    "--affix-left": getSpacing(position?.left),
    "--affix-bottom": getSpacing(position?.bottom),
    "--affix-right": getSpacing(position?.right)
  }
}));
const Affix = factory((_props, ref) => {
  const props = useProps("Affix", defaultProps$2, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    portalProps,
    zIndex,
    withinPortal,
    position,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Affix",
    classes: classes$2,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$2
  });
  return /* @__PURE__ */ u(OptionalPortal, { ...portalProps, withinPortal, children: /* @__PURE__ */ u(Box, { ref, ...getStyles("root"), ...others }) });
});
Affix.classes = classes$2;
Affix.displayName = "@mantine/core/Affix";
var classes$1 = { "root": "m_b6d8b162" };
function getTextTruncate(truncate) {
  if (truncate === "start") {
    return "start";
  }
  if (truncate === "end" || truncate) {
    return "end";
  }
  return void 0;
}
const defaultProps$1 = {
  inherit: false
};
const varsResolver$1 = createVarsResolver(
  // Will be removed in 9.0
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  (theme2, { variant, lineClamp, gradient, size, color }) => ({
    root: {
      "--text-fz": getFontSize(size),
      "--text-lh": getLineHeight(size),
      "--text-gradient": variant === "gradient" ? getGradient(gradient, theme2) : void 0,
      "--text-line-clamp": typeof lineClamp === "number" ? lineClamp.toString() : void 0,
      "--text-color": color ? getThemeColor(color, theme2) : void 0
    }
  })
);
const Text = polymorphicFactory((_props, ref) => {
  const props = useProps("Text", defaultProps$1, _props);
  const {
    lineClamp,
    truncate,
    inline,
    inherit,
    gradient,
    span,
    __staticSelector,
    vars,
    className,
    style,
    classNames,
    styles,
    unstyled,
    variant,
    mod,
    size,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: ["Text", __staticSelector],
    props,
    classes: classes$1,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$1
  });
  return /* @__PURE__ */ u(
    Box,
    {
      ...getStyles("root", { focusable: true }),
      ref,
      component: span ? "span" : "p",
      variant,
      mod: [
        {
          "data-truncate": getTextTruncate(truncate),
          "data-line-clamp": typeof lineClamp === "number",
          "data-inline": inline,
          "data-inherit": inherit
        },
        mod
      ],
      size,
      ...others
    }
  );
});
Text.classes = classes$1;
Text.displayName = "@mantine/core/Text";
const [TabsProvider, useTabsContext] = createSafeContext(
  "Tabs component was not found in the tree"
);
var classes = { "root": "m_89d60db1", "list--default": "m_576c9d4", "list": "m_89d33d6d", "tab": "m_4ec4dce6", "panel": "m_b0c91715", "tabSection": "m_fc420b1f", "tabLabel": "m_42bbd1ae", "tab--default": "m_539e827b", "list--outline": "m_6772fbd5", "tab--outline": "m_b59ab47c", "tab--pills": "m_c3381914" };
const TabsList = factory((_props, ref) => {
  const props = useProps("TabsList", null, _props);
  const { children, className, grow, justify, classNames, styles, style, mod, ...others } = props;
  const ctx = useTabsContext();
  return /* @__PURE__ */ u(
    Box,
    {
      ...others,
      ...ctx.getStyles("list", {
        className,
        style,
        classNames,
        styles,
        props,
        variant: ctx.variant
      }),
      ref,
      role: "tablist",
      variant: ctx.variant,
      mod: [
        {
          grow,
          orientation: ctx.orientation,
          placement: ctx.orientation === "vertical" && ctx.placement,
          inverted: ctx.inverted
        },
        mod
      ],
      "aria-orientation": ctx.orientation,
      __vars: { "--tabs-justify": justify },
      children
    }
  );
});
TabsList.classes = classes;
TabsList.displayName = "@mantine/core/TabsList";
const TabsPanel = factory((_props, ref) => {
  const props = useProps("TabsPanel", null, _props);
  const { children, className, value, classNames, styles, style, mod, keepMounted, ...others } = props;
  const ctx = useTabsContext();
  const active = ctx.value === value;
  const content = ctx.keepMounted || keepMounted ? children : active ? children : null;
  return /* @__PURE__ */ u(
    Box,
    {
      ...ctx.getStyles("panel", {
        className,
        classNames,
        styles,
        style: [style, !active ? { display: "none" } : void 0],
        props
      }),
      ref,
      mod: [{ orientation: ctx.orientation }, mod],
      role: "tabpanel",
      id: ctx.getPanelId(value),
      "aria-labelledby": ctx.getTabId(value),
      ...others,
      children: content
    }
  );
});
TabsPanel.classes = classes;
TabsPanel.displayName = "@mantine/core/TabsPanel";
const TabsTab = factory((_props, ref) => {
  const props = useProps("TabsTab", null, _props);
  const {
    className,
    children,
    rightSection,
    leftSection,
    value,
    onClick,
    onKeyDown,
    disabled,
    color,
    style,
    classNames,
    styles,
    vars,
    mod,
    tabIndex,
    ...others
  } = props;
  const theme2 = useMantineTheme();
  const { dir } = useDirection();
  const ctx = useTabsContext();
  const active = value === ctx.value;
  const activateTab = (event) => {
    ctx.onChange(ctx.allowTabDeactivation ? value === ctx.value ? null : value : value);
    onClick?.(event);
  };
  const stylesApiProps = { classNames, styles, props };
  return /* @__PURE__ */ u(
    UnstyledButton,
    {
      ...ctx.getStyles("tab", { className, style, variant: ctx.variant, ...stylesApiProps }),
      disabled,
      unstyled: ctx.unstyled,
      variant: ctx.variant,
      mod: [
        {
          active,
          disabled,
          orientation: ctx.orientation,
          inverted: ctx.inverted,
          placement: ctx.orientation === "vertical" && ctx.placement
        },
        mod
      ],
      ref,
      role: "tab",
      id: ctx.getTabId(value),
      "aria-selected": active,
      tabIndex: tabIndex !== void 0 ? tabIndex : active || ctx.value === null ? 0 : -1,
      "aria-controls": ctx.getPanelId(value),
      onClick: activateTab,
      __vars: { "--tabs-color": color ? getThemeColor(color, theme2) : void 0 },
      onKeyDown: createScopedKeydownHandler({
        siblingSelector: '[role="tab"]',
        parentSelector: '[role="tablist"]',
        activateOnFocus: ctx.activateTabWithKeyboard,
        loop: ctx.loop,
        orientation: ctx.orientation || "horizontal",
        dir,
        onKeyDown
      }),
      ...others,
      children: [
        leftSection && /* @__PURE__ */ u("span", { ...ctx.getStyles("tabSection", stylesApiProps), "data-position": "left", children: leftSection }),
        children && /* @__PURE__ */ u("span", { ...ctx.getStyles("tabLabel", stylesApiProps), children }),
        rightSection && /* @__PURE__ */ u("span", { ...ctx.getStyles("tabSection", stylesApiProps), "data-position": "right", children: rightSection })
      ]
    }
  );
});
TabsTab.classes = classes;
TabsTab.displayName = "@mantine/core/TabsTab";
const VALUE_ERROR = "Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value";
const defaultProps = {
  keepMounted: true,
  orientation: "horizontal",
  loop: true,
  activateTabWithKeyboard: true,
  variant: "default",
  placement: "left"
};
const varsResolver = createVarsResolver((theme2, { radius, color, autoContrast }) => ({
  root: {
    "--tabs-radius": getRadius(radius),
    "--tabs-color": getThemeColor(color, theme2),
    "--tabs-text-color": getAutoContrastValue(autoContrast, theme2) ? getContrastColor({ color, theme: theme2, autoContrast }) : void 0
  }
}));
const Tabs = factory((_props, ref) => {
  const props = useProps("Tabs", defaultProps, _props);
  const {
    defaultValue,
    value,
    onChange,
    orientation,
    children,
    loop,
    id,
    activateTabWithKeyboard,
    allowTabDeactivation,
    variant,
    color,
    radius,
    inverted,
    placement,
    keepMounted,
    classNames,
    styles,
    unstyled,
    className,
    style,
    vars,
    autoContrast,
    mod,
    attributes,
    ...others
  } = props;
  const uid = useId(id);
  const [currentTab, setCurrentTab] = useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange
  });
  const getStyles = useStyles({
    name: "Tabs",
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver
  });
  return /* @__PURE__ */ u(
    TabsProvider,
    {
      value: {
        placement,
        value: currentTab,
        orientation,
        id: uid,
        loop,
        activateTabWithKeyboard,
        getTabId: getSafeId(`${uid}-tab`, VALUE_ERROR),
        getPanelId: getSafeId(`${uid}-panel`, VALUE_ERROR),
        onChange: setCurrentTab,
        allowTabDeactivation,
        variant,
        color,
        radius,
        inverted,
        keepMounted,
        unstyled,
        getStyles
      },
      children: /* @__PURE__ */ u(
        Box,
        {
          ref,
          id: uid,
          variant,
          mod: [
            {
              orientation,
              inverted: orientation === "horizontal" && inverted,
              placement: orientation === "vertical" && placement
            },
            mod
          ],
          ...getStyles("root"),
          ...others,
          children
        }
      )
    }
  );
});
Tabs.classes = classes;
Tabs.displayName = "@mantine/core/Tabs";
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;
Tabs.List = TabsList;
const baseline = ":root,\n:host {\n  color-scheme: var(--mantine-color-scheme);\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\ninput,\nbutton,\ntextarea,\nselect {\n  font: inherit;\n}\n\nbutton,\nselect {\n  text-transform: none;\n}\n\nbody,\n:host {\n  margin: 0;\n  font-family: var(--mantine-font-family);\n  font-size: var(--mantine-font-size-md);\n  line-height: var(--mantine-line-height);\n  background-color: var(--mantine-color-body);\n  color: var(--mantine-color-text);\n\n  -webkit-font-smoothing: var(--mantine-webkit-font-smoothing);\n  -moz-osx-font-smoothing: var(--mantine-moz-font-smoothing);\n}\n\n@media screen and (max-device-width: 31.25em) {\n\nbody,\n:host {\n    -webkit-text-size-adjust: 100%\n}\n  }\n";
const variables = "/* This file is automatically generated, do not modify it directly. */\n:root,\n:host {\n  --mantine-z-index-app: 100;\n  --mantine-z-index-modal: 200;\n  --mantine-z-index-popover: 300;\n  --mantine-z-index-overlay: 400;\n  --mantine-z-index-max: 9999;\n  --mantine-scale: 1;\n  --mantine-cursor-type: default;\n  --mantine-webkit-font-smoothing: antialiased;\n  --mantine-moz-font-smoothing: grayscale;\n  --mantine-color-white: #fff;\n  --mantine-color-black: #000;\n  --mantine-line-height: 1.55;\n  --mantine-font-family:\n    -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif,\n    Apple Color Emoji, Segoe UI Emoji;\n  --mantine-font-family-monospace:\n    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;\n  --mantine-font-family-headings:\n    -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif,\n    Apple Color Emoji, Segoe UI Emoji;\n  --mantine-heading-font-weight: 700;\n  --mantine-heading-text-wrap: wrap;\n  --mantine-radius-default: calc(0.25rem * var(--mantine-scale));\n  --mantine-primary-color-filled: var(--mantine-color-blue-filled);\n  --mantine-primary-color-filled-hover: var(--mantine-color-blue-filled-hover);\n  --mantine-primary-color-light: var(--mantine-color-blue-light);\n  --mantine-primary-color-light-hover: var(--mantine-color-blue-light-hover);\n  --mantine-primary-color-light-color: var(--mantine-color-blue-light-color);\n  --mantine-breakpoint-xs: 36em;\n  --mantine-breakpoint-sm: 48em;\n  --mantine-breakpoint-md: 62em;\n  --mantine-breakpoint-lg: 75em;\n  --mantine-breakpoint-xl: 88em;\n  --mantine-spacing-xs: calc(0.625rem * var(--mantine-scale));\n  --mantine-spacing-sm: calc(0.75rem * var(--mantine-scale));\n  --mantine-spacing-md: calc(1rem * var(--mantine-scale));\n  --mantine-spacing-lg: calc(1.25rem * var(--mantine-scale));\n  --mantine-spacing-xl: calc(2rem * var(--mantine-scale));\n  --mantine-font-size-xs: calc(0.75rem * var(--mantine-scale));\n  --mantine-font-size-sm: calc(0.875rem * var(--mantine-scale));\n  --mantine-font-size-md: calc(1rem * var(--mantine-scale));\n  --mantine-font-size-lg: calc(1.125rem * var(--mantine-scale));\n  --mantine-font-size-xl: calc(1.25rem * var(--mantine-scale));\n  --mantine-line-height-xs: 1.4;\n  --mantine-line-height-sm: 1.45;\n  --mantine-line-height-md: 1.55;\n  --mantine-line-height-lg: 1.6;\n  --mantine-line-height-xl: 1.65;\n  --mantine-shadow-xs:\n    0 calc(0.0625rem * var(--mantine-scale)) calc(0.1875rem * var(--mantine-scale))\n      rgba(0, 0, 0, 0.05),\n    0 calc(0.0625rem * var(--mantine-scale)) calc(0.125rem * var(--mantine-scale))\n      rgba(0, 0, 0, 0.1);\n  --mantine-shadow-sm:\n    0 calc(0.0625rem * var(--mantine-scale)) calc(0.1875rem * var(--mantine-scale))\n      rgba(0, 0, 0, 0.05),\n    rgba(0, 0, 0, 0.05) 0 calc(0.625rem * var(--mantine-scale))\n      calc(0.9375rem * var(--mantine-scale)) calc(-0.3125rem * var(--mantine-scale)),\n    rgba(0, 0, 0, 0.04) 0 calc(0.4375rem * var(--mantine-scale))\n      calc(0.4375rem * var(--mantine-scale)) calc(-0.3125rem * var(--mantine-scale));\n  --mantine-shadow-md:\n    0 calc(0.0625rem * var(--mantine-scale)) calc(0.1875rem * var(--mantine-scale))\n      rgba(0, 0, 0, 0.05),\n    rgba(0, 0, 0, 0.05) 0 calc(1.25rem * var(--mantine-scale))\n      calc(1.5625rem * var(--mantine-scale)) calc(-0.3125rem * var(--mantine-scale)),\n    rgba(0, 0, 0, 0.04) 0 calc(0.625rem * var(--mantine-scale))\n      calc(0.625rem * var(--mantine-scale)) calc(-0.3125rem * var(--mantine-scale));\n  --mantine-shadow-lg:\n    0 calc(0.0625rem * var(--mantine-scale)) calc(0.1875rem * var(--mantine-scale))\n      rgba(0, 0, 0, 0.05),\n    rgba(0, 0, 0, 0.05) 0 calc(1.75rem * var(--mantine-scale))\n      calc(1.4375rem * var(--mantine-scale)) calc(-0.4375rem * var(--mantine-scale)),\n    rgba(0, 0, 0, 0.04) 0 calc(0.75rem * var(--mantine-scale)) calc(0.75rem * var(--mantine-scale))\n      calc(-0.4375rem * var(--mantine-scale));\n  --mantine-shadow-xl:\n    0 calc(0.0625rem * var(--mantine-scale)) calc(0.1875rem * var(--mantine-scale))\n      rgba(0, 0, 0, 0.05),\n    rgba(0, 0, 0, 0.05) 0 calc(2.25rem * var(--mantine-scale)) calc(1.75rem * var(--mantine-scale))\n      calc(-0.4375rem * var(--mantine-scale)),\n    rgba(0, 0, 0, 0.04) 0 calc(1.0625rem * var(--mantine-scale))\n      calc(1.0625rem * var(--mantine-scale)) calc(-0.4375rem * var(--mantine-scale));\n  --mantine-radius-xs: calc(0.125rem * var(--mantine-scale));\n  --mantine-radius-sm: calc(0.25rem * var(--mantine-scale));\n  --mantine-radius-md: calc(0.5rem * var(--mantine-scale));\n  --mantine-radius-lg: calc(1rem * var(--mantine-scale));\n  --mantine-radius-xl: calc(2rem * var(--mantine-scale));\n  --mantine-primary-color-0: var(--mantine-color-blue-0);\n  --mantine-primary-color-1: var(--mantine-color-blue-1);\n  --mantine-primary-color-2: var(--mantine-color-blue-2);\n  --mantine-primary-color-3: var(--mantine-color-blue-3);\n  --mantine-primary-color-4: var(--mantine-color-blue-4);\n  --mantine-primary-color-5: var(--mantine-color-blue-5);\n  --mantine-primary-color-6: var(--mantine-color-blue-6);\n  --mantine-primary-color-7: var(--mantine-color-blue-7);\n  --mantine-primary-color-8: var(--mantine-color-blue-8);\n  --mantine-primary-color-9: var(--mantine-color-blue-9);\n  --mantine-color-dark-0: #c9c9c9;\n  --mantine-color-dark-1: #b8b8b8;\n  --mantine-color-dark-2: #828282;\n  --mantine-color-dark-3: #696969;\n  --mantine-color-dark-4: #424242;\n  --mantine-color-dark-5: #3b3b3b;\n  --mantine-color-dark-6: #2e2e2e;\n  --mantine-color-dark-7: #242424;\n  --mantine-color-dark-8: #1f1f1f;\n  --mantine-color-dark-9: #141414;\n  --mantine-color-gray-0: #f8f9fa;\n  --mantine-color-gray-1: #f1f3f5;\n  --mantine-color-gray-2: #e9ecef;\n  --mantine-color-gray-3: #dee2e6;\n  --mantine-color-gray-4: #ced4da;\n  --mantine-color-gray-5: #adb5bd;\n  --mantine-color-gray-6: #868e96;\n  --mantine-color-gray-7: #495057;\n  --mantine-color-gray-8: #343a40;\n  --mantine-color-gray-9: #212529;\n  --mantine-color-red-0: #fff5f5;\n  --mantine-color-red-1: #ffe3e3;\n  --mantine-color-red-2: #ffc9c9;\n  --mantine-color-red-3: #ffa8a8;\n  --mantine-color-red-4: #ff8787;\n  --mantine-color-red-5: #ff6b6b;\n  --mantine-color-red-6: #fa5252;\n  --mantine-color-red-7: #f03e3e;\n  --mantine-color-red-8: #e03131;\n  --mantine-color-red-9: #c92a2a;\n  --mantine-color-pink-0: #fff0f6;\n  --mantine-color-pink-1: #ffdeeb;\n  --mantine-color-pink-2: #fcc2d7;\n  --mantine-color-pink-3: #faa2c1;\n  --mantine-color-pink-4: #f783ac;\n  --mantine-color-pink-5: #f06595;\n  --mantine-color-pink-6: #e64980;\n  --mantine-color-pink-7: #d6336c;\n  --mantine-color-pink-8: #c2255c;\n  --mantine-color-pink-9: #a61e4d;\n  --mantine-color-grape-0: #f8f0fc;\n  --mantine-color-grape-1: #f3d9fa;\n  --mantine-color-grape-2: #eebefa;\n  --mantine-color-grape-3: #e599f7;\n  --mantine-color-grape-4: #da77f2;\n  --mantine-color-grape-5: #cc5de8;\n  --mantine-color-grape-6: #be4bdb;\n  --mantine-color-grape-7: #ae3ec9;\n  --mantine-color-grape-8: #9c36b5;\n  --mantine-color-grape-9: #862e9c;\n  --mantine-color-violet-0: #f3f0ff;\n  --mantine-color-violet-1: #e5dbff;\n  --mantine-color-violet-2: #d0bfff;\n  --mantine-color-violet-3: #b197fc;\n  --mantine-color-violet-4: #9775fa;\n  --mantine-color-violet-5: #845ef7;\n  --mantine-color-violet-6: #7950f2;\n  --mantine-color-violet-7: #7048e8;\n  --mantine-color-violet-8: #6741d9;\n  --mantine-color-violet-9: #5f3dc4;\n  --mantine-color-indigo-0: #edf2ff;\n  --mantine-color-indigo-1: #dbe4ff;\n  --mantine-color-indigo-2: #bac8ff;\n  --mantine-color-indigo-3: #91a7ff;\n  --mantine-color-indigo-4: #748ffc;\n  --mantine-color-indigo-5: #5c7cfa;\n  --mantine-color-indigo-6: #4c6ef5;\n  --mantine-color-indigo-7: #4263eb;\n  --mantine-color-indigo-8: #3b5bdb;\n  --mantine-color-indigo-9: #364fc7;\n  --mantine-color-blue-0: #e7f5ff;\n  --mantine-color-blue-1: #d0ebff;\n  --mantine-color-blue-2: #a5d8ff;\n  --mantine-color-blue-3: #74c0fc;\n  --mantine-color-blue-4: #4dabf7;\n  --mantine-color-blue-5: #339af0;\n  --mantine-color-blue-6: #228be6;\n  --mantine-color-blue-7: #1c7ed6;\n  --mantine-color-blue-8: #1971c2;\n  --mantine-color-blue-9: #1864ab;\n  --mantine-color-cyan-0: #e3fafc;\n  --mantine-color-cyan-1: #c5f6fa;\n  --mantine-color-cyan-2: #99e9f2;\n  --mantine-color-cyan-3: #66d9e8;\n  --mantine-color-cyan-4: #3bc9db;\n  --mantine-color-cyan-5: #22b8cf;\n  --mantine-color-cyan-6: #15aabf;\n  --mantine-color-cyan-7: #1098ad;\n  --mantine-color-cyan-8: #0c8599;\n  --mantine-color-cyan-9: #0b7285;\n  --mantine-color-teal-0: #e6fcf5;\n  --mantine-color-teal-1: #c3fae8;\n  --mantine-color-teal-2: #96f2d7;\n  --mantine-color-teal-3: #63e6be;\n  --mantine-color-teal-4: #38d9a9;\n  --mantine-color-teal-5: #20c997;\n  --mantine-color-teal-6: #12b886;\n  --mantine-color-teal-7: #0ca678;\n  --mantine-color-teal-8: #099268;\n  --mantine-color-teal-9: #087f5b;\n  --mantine-color-green-0: #ebfbee;\n  --mantine-color-green-1: #d3f9d8;\n  --mantine-color-green-2: #b2f2bb;\n  --mantine-color-green-3: #8ce99a;\n  --mantine-color-green-4: #69db7c;\n  --mantine-color-green-5: #51cf66;\n  --mantine-color-green-6: #40c057;\n  --mantine-color-green-7: #37b24d;\n  --mantine-color-green-8: #2f9e44;\n  --mantine-color-green-9: #2b8a3e;\n  --mantine-color-lime-0: #f4fce3;\n  --mantine-color-lime-1: #e9fac8;\n  --mantine-color-lime-2: #d8f5a2;\n  --mantine-color-lime-3: #c0eb75;\n  --mantine-color-lime-4: #a9e34b;\n  --mantine-color-lime-5: #94d82d;\n  --mantine-color-lime-6: #82c91e;\n  --mantine-color-lime-7: #74b816;\n  --mantine-color-lime-8: #66a80f;\n  --mantine-color-lime-9: #5c940d;\n  --mantine-color-yellow-0: #fff9db;\n  --mantine-color-yellow-1: #fff3bf;\n  --mantine-color-yellow-2: #ffec99;\n  --mantine-color-yellow-3: #ffe066;\n  --mantine-color-yellow-4: #ffd43b;\n  --mantine-color-yellow-5: #fcc419;\n  --mantine-color-yellow-6: #fab005;\n  --mantine-color-yellow-7: #f59f00;\n  --mantine-color-yellow-8: #f08c00;\n  --mantine-color-yellow-9: #e67700;\n  --mantine-color-orange-0: #fff4e6;\n  --mantine-color-orange-1: #ffe8cc;\n  --mantine-color-orange-2: #ffd8a8;\n  --mantine-color-orange-3: #ffc078;\n  --mantine-color-orange-4: #ffa94d;\n  --mantine-color-orange-5: #ff922b;\n  --mantine-color-orange-6: #fd7e14;\n  --mantine-color-orange-7: #f76707;\n  --mantine-color-orange-8: #e8590c;\n  --mantine-color-orange-9: #d9480f;\n  --mantine-h1-font-size: calc(2.125rem * var(--mantine-scale));\n  --mantine-h1-line-height: 1.3;\n  --mantine-h1-font-weight: 700;\n  --mantine-h2-font-size: calc(1.625rem * var(--mantine-scale));\n  --mantine-h2-line-height: 1.35;\n  --mantine-h2-font-weight: 700;\n  --mantine-h3-font-size: calc(1.375rem * var(--mantine-scale));\n  --mantine-h3-line-height: 1.4;\n  --mantine-h3-font-weight: 700;\n  --mantine-h4-font-size: calc(1.125rem * var(--mantine-scale));\n  --mantine-h4-line-height: 1.45;\n  --mantine-h4-font-weight: 700;\n  --mantine-h5-font-size: calc(1rem * var(--mantine-scale));\n  --mantine-h5-line-height: 1.5;\n  --mantine-h5-font-weight: 700;\n  --mantine-h6-font-size: calc(0.875rem * var(--mantine-scale));\n  --mantine-h6-line-height: 1.5;\n  --mantine-h6-font-weight: 700;\n}\n\n:root[data-mantine-color-scheme='dark'],\n:host([data-mantine-color-scheme='dark']) {\n  --mantine-color-scheme: dark;\n  --mantine-primary-color-contrast: var(--mantine-color-white);\n  --mantine-color-bright: var(--mantine-color-white);\n  --mantine-color-text: var(--mantine-color-dark-0);\n  --mantine-color-body: var(--mantine-color-dark-7);\n  --mantine-color-error: var(--mantine-color-red-8);\n  --mantine-color-placeholder: var(--mantine-color-dark-3);\n  --mantine-color-anchor: var(--mantine-color-blue-4);\n  --mantine-color-default: var(--mantine-color-dark-6);\n  --mantine-color-default-hover: var(--mantine-color-dark-5);\n  --mantine-color-default-color: var(--mantine-color-white);\n  --mantine-color-default-border: var(--mantine-color-dark-4);\n  --mantine-color-dimmed: var(--mantine-color-dark-2);\n  --mantine-color-disabled: var(--mantine-color-dark-6);\n  --mantine-color-disabled-color: var(--mantine-color-dark-3);\n  --mantine-color-disabled-border: var(--mantine-color-dark-4);\n  --mantine-color-dark-text: var(--mantine-color-dark-4);\n  --mantine-color-dark-filled: var(--mantine-color-dark-8);\n  --mantine-color-dark-filled-hover: var(--mantine-color-dark-9);\n  --mantine-color-dark-light: rgba(46, 46, 46, 0.15);\n  --mantine-color-dark-light-hover: rgba(46, 46, 46, 0.2);\n  --mantine-color-dark-light-color: var(--mantine-color-dark-3);\n  --mantine-color-dark-outline: var(--mantine-color-dark-4);\n  --mantine-color-dark-outline-hover: rgba(66, 66, 66, 0.05);\n  --mantine-color-gray-text: var(--mantine-color-gray-4);\n  --mantine-color-gray-filled: var(--mantine-color-gray-8);\n  --mantine-color-gray-filled-hover: var(--mantine-color-gray-9);\n  --mantine-color-gray-light: rgba(134, 142, 150, 0.15);\n  --mantine-color-gray-light-hover: rgba(134, 142, 150, 0.2);\n  --mantine-color-gray-light-color: var(--mantine-color-gray-3);\n  --mantine-color-gray-outline: var(--mantine-color-gray-4);\n  --mantine-color-gray-outline-hover: rgba(206, 212, 218, 0.05);\n  --mantine-color-red-text: var(--mantine-color-red-4);\n  --mantine-color-red-filled: var(--mantine-color-red-8);\n  --mantine-color-red-filled-hover: var(--mantine-color-red-9);\n  --mantine-color-red-light: rgba(250, 82, 82, 0.15);\n  --mantine-color-red-light-hover: rgba(250, 82, 82, 0.2);\n  --mantine-color-red-light-color: var(--mantine-color-red-3);\n  --mantine-color-red-outline: var(--mantine-color-red-4);\n  --mantine-color-red-outline-hover: rgba(255, 135, 135, 0.05);\n  --mantine-color-pink-text: var(--mantine-color-pink-4);\n  --mantine-color-pink-filled: var(--mantine-color-pink-8);\n  --mantine-color-pink-filled-hover: var(--mantine-color-pink-9);\n  --mantine-color-pink-light: rgba(230, 73, 128, 0.15);\n  --mantine-color-pink-light-hover: rgba(230, 73, 128, 0.2);\n  --mantine-color-pink-light-color: var(--mantine-color-pink-3);\n  --mantine-color-pink-outline: var(--mantine-color-pink-4);\n  --mantine-color-pink-outline-hover: rgba(247, 131, 172, 0.05);\n  --mantine-color-grape-text: var(--mantine-color-grape-4);\n  --mantine-color-grape-filled: var(--mantine-color-grape-8);\n  --mantine-color-grape-filled-hover: var(--mantine-color-grape-9);\n  --mantine-color-grape-light: rgba(190, 75, 219, 0.15);\n  --mantine-color-grape-light-hover: rgba(190, 75, 219, 0.2);\n  --mantine-color-grape-light-color: var(--mantine-color-grape-3);\n  --mantine-color-grape-outline: var(--mantine-color-grape-4);\n  --mantine-color-grape-outline-hover: rgba(218, 119, 242, 0.05);\n  --mantine-color-violet-text: var(--mantine-color-violet-4);\n  --mantine-color-violet-filled: var(--mantine-color-violet-8);\n  --mantine-color-violet-filled-hover: var(--mantine-color-violet-9);\n  --mantine-color-violet-light: rgba(121, 80, 242, 0.15);\n  --mantine-color-violet-light-hover: rgba(121, 80, 242, 0.2);\n  --mantine-color-violet-light-color: var(--mantine-color-violet-3);\n  --mantine-color-violet-outline: var(--mantine-color-violet-4);\n  --mantine-color-violet-outline-hover: rgba(151, 117, 250, 0.05);\n  --mantine-color-indigo-text: var(--mantine-color-indigo-4);\n  --mantine-color-indigo-filled: var(--mantine-color-indigo-8);\n  --mantine-color-indigo-filled-hover: var(--mantine-color-indigo-9);\n  --mantine-color-indigo-light: rgba(76, 110, 245, 0.15);\n  --mantine-color-indigo-light-hover: rgba(76, 110, 245, 0.2);\n  --mantine-color-indigo-light-color: var(--mantine-color-indigo-3);\n  --mantine-color-indigo-outline: var(--mantine-color-indigo-4);\n  --mantine-color-indigo-outline-hover: rgba(116, 143, 252, 0.05);\n  --mantine-color-blue-text: var(--mantine-color-blue-4);\n  --mantine-color-blue-filled: var(--mantine-color-blue-8);\n  --mantine-color-blue-filled-hover: var(--mantine-color-blue-9);\n  --mantine-color-blue-light: rgba(34, 139, 230, 0.15);\n  --mantine-color-blue-light-hover: rgba(34, 139, 230, 0.2);\n  --mantine-color-blue-light-color: var(--mantine-color-blue-3);\n  --mantine-color-blue-outline: var(--mantine-color-blue-4);\n  --mantine-color-blue-outline-hover: rgba(77, 171, 247, 0.05);\n  --mantine-color-cyan-text: var(--mantine-color-cyan-4);\n  --mantine-color-cyan-filled: var(--mantine-color-cyan-8);\n  --mantine-color-cyan-filled-hover: var(--mantine-color-cyan-9);\n  --mantine-color-cyan-light: rgba(21, 170, 191, 0.15);\n  --mantine-color-cyan-light-hover: rgba(21, 170, 191, 0.2);\n  --mantine-color-cyan-light-color: var(--mantine-color-cyan-3);\n  --mantine-color-cyan-outline: var(--mantine-color-cyan-4);\n  --mantine-color-cyan-outline-hover: rgba(59, 201, 219, 0.05);\n  --mantine-color-teal-text: var(--mantine-color-teal-4);\n  --mantine-color-teal-filled: var(--mantine-color-teal-8);\n  --mantine-color-teal-filled-hover: var(--mantine-color-teal-9);\n  --mantine-color-teal-light: rgba(18, 184, 134, 0.15);\n  --mantine-color-teal-light-hover: rgba(18, 184, 134, 0.2);\n  --mantine-color-teal-light-color: var(--mantine-color-teal-3);\n  --mantine-color-teal-outline: var(--mantine-color-teal-4);\n  --mantine-color-teal-outline-hover: rgba(56, 217, 169, 0.05);\n  --mantine-color-green-text: var(--mantine-color-green-4);\n  --mantine-color-green-filled: var(--mantine-color-green-8);\n  --mantine-color-green-filled-hover: var(--mantine-color-green-9);\n  --mantine-color-green-light: rgba(64, 192, 87, 0.15);\n  --mantine-color-green-light-hover: rgba(64, 192, 87, 0.2);\n  --mantine-color-green-light-color: var(--mantine-color-green-3);\n  --mantine-color-green-outline: var(--mantine-color-green-4);\n  --mantine-color-green-outline-hover: rgba(105, 219, 124, 0.05);\n  --mantine-color-lime-text: var(--mantine-color-lime-4);\n  --mantine-color-lime-filled: var(--mantine-color-lime-8);\n  --mantine-color-lime-filled-hover: var(--mantine-color-lime-9);\n  --mantine-color-lime-light: rgba(130, 201, 30, 0.15);\n  --mantine-color-lime-light-hover: rgba(130, 201, 30, 0.2);\n  --mantine-color-lime-light-color: var(--mantine-color-lime-3);\n  --mantine-color-lime-outline: var(--mantine-color-lime-4);\n  --mantine-color-lime-outline-hover: rgba(169, 227, 75, 0.05);\n  --mantine-color-yellow-text: var(--mantine-color-yellow-4);\n  --mantine-color-yellow-filled: var(--mantine-color-yellow-8);\n  --mantine-color-yellow-filled-hover: var(--mantine-color-yellow-9);\n  --mantine-color-yellow-light: rgba(250, 176, 5, 0.15);\n  --mantine-color-yellow-light-hover: rgba(250, 176, 5, 0.2);\n  --mantine-color-yellow-light-color: var(--mantine-color-yellow-3);\n  --mantine-color-yellow-outline: var(--mantine-color-yellow-4);\n  --mantine-color-yellow-outline-hover: rgba(255, 212, 59, 0.05);\n  --mantine-color-orange-text: var(--mantine-color-orange-4);\n  --mantine-color-orange-filled: var(--mantine-color-orange-8);\n  --mantine-color-orange-filled-hover: var(--mantine-color-orange-9);\n  --mantine-color-orange-light: rgba(253, 126, 20, 0.15);\n  --mantine-color-orange-light-hover: rgba(253, 126, 20, 0.2);\n  --mantine-color-orange-light-color: var(--mantine-color-orange-3);\n  --mantine-color-orange-outline: var(--mantine-color-orange-4);\n  --mantine-color-orange-outline-hover: rgba(255, 169, 77, 0.05);\n}\n\n:root[data-mantine-color-scheme='light'],\n:host([data-mantine-color-scheme='light']) {\n  --mantine-color-scheme: light;\n  --mantine-primary-color-contrast: var(--mantine-color-white);\n  --mantine-color-bright: var(--mantine-color-black);\n  --mantine-color-text: #000;\n  --mantine-color-body: #fff;\n  --mantine-color-error: var(--mantine-color-red-6);\n  --mantine-color-placeholder: var(--mantine-color-gray-5);\n  --mantine-color-anchor: var(--mantine-color-blue-6);\n  --mantine-color-default: var(--mantine-color-white);\n  --mantine-color-default-hover: var(--mantine-color-gray-0);\n  --mantine-color-default-color: var(--mantine-color-black);\n  --mantine-color-default-border: var(--mantine-color-gray-4);\n  --mantine-color-dimmed: var(--mantine-color-gray-6);\n  --mantine-color-disabled: var(--mantine-color-gray-2);\n  --mantine-color-disabled-color: var(--mantine-color-gray-5);\n  --mantine-color-disabled-border: var(--mantine-color-gray-3);\n  --mantine-color-dark-text: var(--mantine-color-dark-filled);\n  --mantine-color-dark-filled: var(--mantine-color-dark-6);\n  --mantine-color-dark-filled-hover: var(--mantine-color-dark-7);\n  --mantine-color-dark-light: rgba(46, 46, 46, 0.1);\n  --mantine-color-dark-light-hover: rgba(46, 46, 46, 0.12);\n  --mantine-color-dark-light-color: var(--mantine-color-dark-6);\n  --mantine-color-dark-outline: var(--mantine-color-dark-6);\n  --mantine-color-dark-outline-hover: rgba(46, 46, 46, 0.05);\n  --mantine-color-gray-text: var(--mantine-color-gray-filled);\n  --mantine-color-gray-filled: var(--mantine-color-gray-6);\n  --mantine-color-gray-filled-hover: var(--mantine-color-gray-7);\n  --mantine-color-gray-light: rgba(134, 142, 150, 0.1);\n  --mantine-color-gray-light-hover: rgba(134, 142, 150, 0.12);\n  --mantine-color-gray-light-color: var(--mantine-color-gray-6);\n  --mantine-color-gray-outline: var(--mantine-color-gray-6);\n  --mantine-color-gray-outline-hover: rgba(134, 142, 150, 0.05);\n  --mantine-color-red-text: var(--mantine-color-red-filled);\n  --mantine-color-red-filled: var(--mantine-color-red-6);\n  --mantine-color-red-filled-hover: var(--mantine-color-red-7);\n  --mantine-color-red-light: rgba(250, 82, 82, 0.1);\n  --mantine-color-red-light-hover: rgba(250, 82, 82, 0.12);\n  --mantine-color-red-light-color: var(--mantine-color-red-6);\n  --mantine-color-red-outline: var(--mantine-color-red-6);\n  --mantine-color-red-outline-hover: rgba(250, 82, 82, 0.05);\n  --mantine-color-pink-text: var(--mantine-color-pink-filled);\n  --mantine-color-pink-filled: var(--mantine-color-pink-6);\n  --mantine-color-pink-filled-hover: var(--mantine-color-pink-7);\n  --mantine-color-pink-light: rgba(230, 73, 128, 0.1);\n  --mantine-color-pink-light-hover: rgba(230, 73, 128, 0.12);\n  --mantine-color-pink-light-color: var(--mantine-color-pink-6);\n  --mantine-color-pink-outline: var(--mantine-color-pink-6);\n  --mantine-color-pink-outline-hover: rgba(230, 73, 128, 0.05);\n  --mantine-color-grape-text: var(--mantine-color-grape-filled);\n  --mantine-color-grape-filled: var(--mantine-color-grape-6);\n  --mantine-color-grape-filled-hover: var(--mantine-color-grape-7);\n  --mantine-color-grape-light: rgba(190, 75, 219, 0.1);\n  --mantine-color-grape-light-hover: rgba(190, 75, 219, 0.12);\n  --mantine-color-grape-light-color: var(--mantine-color-grape-6);\n  --mantine-color-grape-outline: var(--mantine-color-grape-6);\n  --mantine-color-grape-outline-hover: rgba(190, 75, 219, 0.05);\n  --mantine-color-violet-text: var(--mantine-color-violet-filled);\n  --mantine-color-violet-filled: var(--mantine-color-violet-6);\n  --mantine-color-violet-filled-hover: var(--mantine-color-violet-7);\n  --mantine-color-violet-light: rgba(121, 80, 242, 0.1);\n  --mantine-color-violet-light-hover: rgba(121, 80, 242, 0.12);\n  --mantine-color-violet-light-color: var(--mantine-color-violet-6);\n  --mantine-color-violet-outline: var(--mantine-color-violet-6);\n  --mantine-color-violet-outline-hover: rgba(121, 80, 242, 0.05);\n  --mantine-color-indigo-text: var(--mantine-color-indigo-filled);\n  --mantine-color-indigo-filled: var(--mantine-color-indigo-6);\n  --mantine-color-indigo-filled-hover: var(--mantine-color-indigo-7);\n  --mantine-color-indigo-light: rgba(76, 110, 245, 0.1);\n  --mantine-color-indigo-light-hover: rgba(76, 110, 245, 0.12);\n  --mantine-color-indigo-light-color: var(--mantine-color-indigo-6);\n  --mantine-color-indigo-outline: var(--mantine-color-indigo-6);\n  --mantine-color-indigo-outline-hover: rgba(76, 110, 245, 0.05);\n  --mantine-color-blue-text: var(--mantine-color-blue-filled);\n  --mantine-color-blue-filled: var(--mantine-color-blue-6);\n  --mantine-color-blue-filled-hover: var(--mantine-color-blue-7);\n  --mantine-color-blue-light: rgba(34, 139, 230, 0.1);\n  --mantine-color-blue-light-hover: rgba(34, 139, 230, 0.12);\n  --mantine-color-blue-light-color: var(--mantine-color-blue-6);\n  --mantine-color-blue-outline: var(--mantine-color-blue-6);\n  --mantine-color-blue-outline-hover: rgba(34, 139, 230, 0.05);\n  --mantine-color-cyan-text: var(--mantine-color-cyan-filled);\n  --mantine-color-cyan-filled: var(--mantine-color-cyan-6);\n  --mantine-color-cyan-filled-hover: var(--mantine-color-cyan-7);\n  --mantine-color-cyan-light: rgba(21, 170, 191, 0.1);\n  --mantine-color-cyan-light-hover: rgba(21, 170, 191, 0.12);\n  --mantine-color-cyan-light-color: var(--mantine-color-cyan-6);\n  --mantine-color-cyan-outline: var(--mantine-color-cyan-6);\n  --mantine-color-cyan-outline-hover: rgba(21, 170, 191, 0.05);\n  --mantine-color-teal-text: var(--mantine-color-teal-filled);\n  --mantine-color-teal-filled: var(--mantine-color-teal-6);\n  --mantine-color-teal-filled-hover: var(--mantine-color-teal-7);\n  --mantine-color-teal-light: rgba(18, 184, 134, 0.1);\n  --mantine-color-teal-light-hover: rgba(18, 184, 134, 0.12);\n  --mantine-color-teal-light-color: var(--mantine-color-teal-6);\n  --mantine-color-teal-outline: var(--mantine-color-teal-6);\n  --mantine-color-teal-outline-hover: rgba(18, 184, 134, 0.05);\n  --mantine-color-green-text: var(--mantine-color-green-filled);\n  --mantine-color-green-filled: var(--mantine-color-green-6);\n  --mantine-color-green-filled-hover: var(--mantine-color-green-7);\n  --mantine-color-green-light: rgba(64, 192, 87, 0.1);\n  --mantine-color-green-light-hover: rgba(64, 192, 87, 0.12);\n  --mantine-color-green-light-color: var(--mantine-color-green-6);\n  --mantine-color-green-outline: var(--mantine-color-green-6);\n  --mantine-color-green-outline-hover: rgba(64, 192, 87, 0.05);\n  --mantine-color-lime-text: var(--mantine-color-lime-filled);\n  --mantine-color-lime-filled: var(--mantine-color-lime-6);\n  --mantine-color-lime-filled-hover: var(--mantine-color-lime-7);\n  --mantine-color-lime-light: rgba(130, 201, 30, 0.1);\n  --mantine-color-lime-light-hover: rgba(130, 201, 30, 0.12);\n  --mantine-color-lime-light-color: var(--mantine-color-lime-6);\n  --mantine-color-lime-outline: var(--mantine-color-lime-6);\n  --mantine-color-lime-outline-hover: rgba(130, 201, 30, 0.05);\n  --mantine-color-yellow-text: var(--mantine-color-yellow-filled);\n  --mantine-color-yellow-filled: var(--mantine-color-yellow-6);\n  --mantine-color-yellow-filled-hover: var(--mantine-color-yellow-7);\n  --mantine-color-yellow-light: rgba(250, 176, 5, 0.1);\n  --mantine-color-yellow-light-hover: rgba(250, 176, 5, 0.12);\n  --mantine-color-yellow-light-color: var(--mantine-color-yellow-6);\n  --mantine-color-yellow-outline: var(--mantine-color-yellow-6);\n  --mantine-color-yellow-outline-hover: rgba(250, 176, 5, 0.05);\n  --mantine-color-orange-text: var(--mantine-color-orange-filled);\n  --mantine-color-orange-filled: var(--mantine-color-orange-6);\n  --mantine-color-orange-filled-hover: var(--mantine-color-orange-7);\n  --mantine-color-orange-light: rgba(253, 126, 20, 0.1);\n  --mantine-color-orange-light-hover: rgba(253, 126, 20, 0.12);\n  --mantine-color-orange-light-color: var(--mantine-color-orange-6);\n  --mantine-color-orange-outline: var(--mantine-color-orange-6);\n  --mantine-color-orange-outline-hover: rgba(253, 126, 20, 0.05);\n}\n";
const global = `@media (prefers-reduced-motion: reduce) {
    [data-respect-reduced-motion] [data-reduce-motion] {
      transition: none;
      animation: none;
    }
  }

[data-mantine-color-scheme='light'] .mantine-light-hidden {
    display: none;
}

[data-mantine-color-scheme='dark'] .mantine-dark-hidden {
    display: none;
}

.mantine-focus-auto:focus-visible {
    outline: 2px solid var(--mantine-primary-color-filled);
    outline-offset: 2px;
  }

.mantine-focus-always:focus {
    outline: 2px solid var(--mantine-primary-color-filled);
    outline-offset: 2px;
  }

.mantine-focus-never:focus {
    outline: none;
  }

.mantine-active:active {
    transform: translateY(calc(0.0625rem * var(--mantine-scale)));
  }

fieldset:disabled .mantine-active:active {
    transform: none;
  }

:where([dir="rtl"]) .mantine-rotate-rtl {
    transform: rotate(180deg);
}
`;
const affix = ".m_7f854edf {\n  position: fixed;\n  z-index: var(--affix-z-index);\n  inset-inline-start: var(--affix-left);\n  inset-inline-end: var(--affix-right);\n  top: var(--affix-top);\n  bottom: var(--affix-bottom);\n}\n";
const group = ".m_4081bf90 {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: var(--group-wrap, wrap);\n  justify-content: var(--group-justify, flex-start);\n  align-items: var(--group-align, center);\n  gap: var(--group-gap, var(--mantine-spacing-md));\n}\n\n  .m_4081bf90:where([data-grow]) > * {\n      flex-grow: 1;\n      max-width: var(--group-child-width);\n    }\n";
const scrollArea = ".m_d57069b5 {\n  --scrollarea-scrollbar-size: 12px;\n\n  position: relative;\n  overflow: hidden;\n}\n\n  .m_d57069b5:where([data-autosize]) .m_b1336c6 {\n    min-width: min-content;\n  }\n\n.m_c0783ff9 {\n  scrollbar-width: none;\n  overscroll-behavior: var(--scrollarea-over-scroll-behavior);\n  -ms-overflow-style: none;\n  -webkit-overflow-scrolling: touch;\n  width: 100%;\n  height: 100%;\n}\n\n.m_c0783ff9::-webkit-scrollbar {\n    display: none;\n  }\n\n.m_c0783ff9:where([data-scrollbars='xy'], [data-scrollbars='y']):where(\n      [data-offset-scrollbars='xy'],\n      [data-offset-scrollbars='y'],\n      [data-offset-scrollbars='present']\n    ):where([data-vertical-hidden]) {\n        padding-inline-end: 0;\n        padding-inline-start: 0;\n      }\n\n.m_c0783ff9:where([data-scrollbars='xy'], [data-scrollbars='y']):where(\n      [data-offset-scrollbars='xy'],\n      [data-offset-scrollbars='y'],\n      [data-offset-scrollbars='present']\n    ):not([data-vertical-hidden]) {\n        padding-inline-end: var(--scrollarea-scrollbar-size);\n        padding-inline-start: unset;\n      }\n\n.m_c0783ff9:where([data-scrollbars='xy'], [data-scrollbars='x']):where(\n      [data-offset-scrollbars='xy'],\n      [data-offset-scrollbars='x'],\n      [data-offset-scrollbars='present']\n    ):where([data-horizontal-hidden]) {\n        padding-bottom: 0;\n      }\n\n.m_c0783ff9:where([data-scrollbars='xy'], [data-scrollbars='x']):where(\n      [data-offset-scrollbars='xy'],\n      [data-offset-scrollbars='x'],\n      [data-offset-scrollbars='present']\n    ):not([data-horizontal-hidden]) {\n        padding-bottom: var(--scrollarea-scrollbar-size);\n      }\n\n.m_f8f631dd {\n  min-width: 100%;\n  display: table;\n}\n\n.m_c44ba933 {\n  user-select: none;\n  touch-action: none;\n  box-sizing: border-box;\n  transition:\n    background-color 150ms ease,\n    opacity 150ms ease;\n\n  padding: calc(var(--scrollarea-scrollbar-size) / 5);\n  display: flex;\n  background-color: transparent;\n  flex-direction: row;\n}\n\n@media (hover: hover) {\n    :where([data-mantine-color-scheme='light']) .m_c44ba933:hover {\n      background-color: var(--mantine-color-gray-0);\n  }\n\n      :where([data-mantine-color-scheme='light']) .m_c44ba933:hover > .m_d8b5e363 {\n        background-color: rgba(0, 0, 0, 0.5);\n      }\n\n    :where([data-mantine-color-scheme='dark']) .m_c44ba933:hover {\n      background-color: var(--mantine-color-dark-8);\n  }\n\n      :where([data-mantine-color-scheme='dark']) .m_c44ba933:hover > .m_d8b5e363 {\n        background-color: rgba(255, 255, 255, 0.5);\n      }\n}\n\n@media (hover: none) {\n    :where([data-mantine-color-scheme='light']) .m_c44ba933:active {\n      background-color: var(--mantine-color-gray-0);\n  }\n\n      :where([data-mantine-color-scheme='light']) .m_c44ba933:active > .m_d8b5e363 {\n        background-color: rgba(0, 0, 0, 0.5);\n      }\n\n    :where([data-mantine-color-scheme='dark']) .m_c44ba933:active {\n      background-color: var(--mantine-color-dark-8);\n  }\n\n      :where([data-mantine-color-scheme='dark']) .m_c44ba933:active > .m_d8b5e363 {\n        background-color: rgba(255, 255, 255, 0.5);\n      }\n}\n\n.m_c44ba933:where([data-hidden], [data-state='hidden']) {\n    display: none;\n  }\n\n.m_c44ba933:where([data-orientation='vertical']) {\n    width: var(--scrollarea-scrollbar-size);\n    top: 0;\n    bottom: var(--sa-corner-width);\n    inset-inline-end: 0;\n  }\n\n.m_c44ba933:where([data-orientation='horizontal']) {\n    height: var(--scrollarea-scrollbar-size);\n    flex-direction: column;\n    bottom: 0;\n    inset-inline-start: 0;\n    inset-inline-end: var(--sa-corner-width);\n  }\n\n.m_d8b5e363 {\n  flex: 1;\n  border-radius: var(--scrollarea-scrollbar-size);\n  position: relative;\n  transition: background-color 150ms ease;\n  overflow: hidden;\n  opacity: var(--thumb-opacity);\n}\n\n.m_d8b5e363::before {\n    content: '';\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 100%;\n    height: 100%;\n    min-width: 44px;\n    min-height: 44px;\n  }\n\n:where([data-mantine-color-scheme='light']) .m_d8b5e363 {\n    background-color: rgba(0, 0, 0, 0.4);\n}\n\n:where([data-mantine-color-scheme='dark']) .m_d8b5e363 {\n    background-color: rgba(255, 255, 255, 0.4);\n}\n\n.m_21657268 {\n  position: absolute;\n  opacity: 0;\n  transition: opacity 150ms ease;\n  display: block;\n  inset-inline-end: 0;\n  bottom: 0;\n}\n\n:where([data-mantine-color-scheme='light']) .m_21657268 {\n    background-color: var(--mantine-color-gray-0);\n}\n\n:where([data-mantine-color-scheme='dark']) .m_21657268 {\n    background-color: var(--mantine-color-dark-8);\n}\n\n.m_21657268:where([data-hovered]) {\n    opacity: 1;\n  }\n\n.m_21657268:where([data-hidden]) {\n    display: none;\n  }\n\n.m_b1336c6 {\n  min-width: 100%;\n}\n";
const tabs = `[data-mantine-color-scheme='light'] .m_89d60db1 {
    --tab-border-color: var(--mantine-color-gray-3);
}
  [data-mantine-color-scheme='dark'] .m_89d60db1 {
    --tab-border-color: var(--mantine-color-dark-4);
}
  .m_89d60db1 {

  display: var(--tabs-display);
  flex-direction: var(--tabs-flex-direction);

  --tabs-list-direction: row;
  --tabs-panel-grow: unset;
  --tabs-display: block;
  --tabs-flex-direction: row;
  --tabs-list-border-width: 0;
  --tabs-list-border-size: 0 0 var(--tabs-list-border-width) 0;
  --tabs-list-gap: unset;

  --tabs-list-line-bottom: 0;
  --tabs-list-line-top: unset;
  --tabs-list-line-start: 0;
  --tabs-list-line-end: 0;

  --tab-radius: var(--tabs-radius) var(--tabs-radius) 0 0;
  --tab-border-width: 0 0 var(--tabs-list-border-width) 0;
}

  .m_89d60db1[data-inverted] {
    --tabs-list-line-bottom: unset;
    --tabs-list-line-top: 0;
    --tab-radius: 0 0 var(--tabs-radius) var(--tabs-radius);
    --tab-border-width: var(--tabs-list-border-width) 0 0 0;
  }

  .m_89d60db1[data-inverted] .m_576c9d4::before {
      top: 0;
      bottom: unset;
    }

  .m_89d60db1[data-orientation='vertical'] {
    --tabs-list-line-start: unset;
    --tabs-list-line-end: 0;
    --tabs-list-line-top: 0;
    --tabs-list-line-bottom: 0;
    --tabs-list-border-size: 0 var(--tabs-list-border-width) 0 0;
    --tab-border-width: 0 var(--tabs-list-border-width) 0 0;
    --tab-radius: var(--tabs-radius) 0 0 var(--tabs-radius);
    --tabs-list-direction: column;
    --tabs-panel-grow: 1;
    --tabs-display: flex;
  }

  [dir="rtl"] .m_89d60db1[data-orientation='vertical'] {
      --tabs-list-border-size: 0 0 0 var(--tabs-list-border-width);
      --tab-border-width: 0 0 0 var(--tabs-list-border-width);
      --tab-radius: 0 var(--tabs-radius) var(--tabs-radius) 0;
}

  .m_89d60db1[data-orientation='vertical'][data-placement='right'] {
      --tabs-flex-direction: row-reverse;
      --tabs-list-line-start: 0;
      --tabs-list-line-end: unset;
      --tabs-list-border-size: 0 0 0 var(--tabs-list-border-width);
      --tab-border-width: 0 0 0 var(--tabs-list-border-width);
      --tab-radius: 0 var(--tabs-radius) var(--tabs-radius) 0;
    }

  [dir="rtl"] .m_89d60db1[data-orientation='vertical'][data-placement='right'] {
        --tabs-list-border-size: 0 var(--tabs-list-border-width) 0 0;
        --tab-border-width: 0 var(--tabs-list-border-width) 0 0;
        --tab-radius: var(--tabs-radius) 0 0 var(--tabs-radius);
}

  .m_89d60db1[data-variant='default'] {
    --tabs-list-border-width: 2px;
  }

  [data-mantine-color-scheme='light'] .m_89d60db1[data-variant='default'] {
      --tab-hover-color: var(--mantine-color-gray-0);
}

  [data-mantine-color-scheme='dark'] .m_89d60db1[data-variant='default'] {
      --tab-hover-color: var(--mantine-color-dark-6);
}

  .m_89d60db1[data-variant='outline'] {
    --tabs-list-border-width: 1px;
  }

  .m_89d60db1[data-variant='pills'] {
    --tabs-list-gap: calc(var(--mantine-spacing-sm) / 2);
  }

  [data-mantine-color-scheme='light'] .m_89d60db1[data-variant='pills'] {
      --tab-hover-color: var(--mantine-color-gray-0);
}

  [data-mantine-color-scheme='dark'] .m_89d60db1[data-variant='pills'] {
      --tab-hover-color: var(--mantine-color-dark-6);
}

.m_89d33d6d {
  display: flex;
  flex-wrap: wrap;
  justify-content: var(--tabs-justify, flex-start);
  flex-direction: var(--tabs-list-direction);
  gap: var(--tabs-list-gap);
}

.m_89d33d6d:where([data-grow]) .m_4ec4dce6 {
    flex: 1;
  }

.m_b0c91715 {
  flex-grow: var(--tabs-panel-grow);
}

.m_4ec4dce6 {
  position: relative;
  padding: var(--mantine-spacing-xs) var(--mantine-spacing-md);
  font-size: var(--mantine-font-size-sm);
  white-space: nowrap;
  z-index: 0;
  display: flex;
  align-items: center;
  line-height: 1;
  user-select: none;
}

.m_4ec4dce6:where(:disabled, [data-disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }

.m_4ec4dce6:focus {
    z-index: 1;
  }

.m_fc420b1f {
  display: flex;
  align-items: center;
  justify-content: center;
}

.m_fc420b1f:where([data-position='left']:not(:only-child)) {
    margin-inline-end: var(--mantine-spacing-xs);
  }

.m_fc420b1f:where([data-position='right']:not(:only-child)) {
    margin-inline-start: var(--mantine-spacing-xs);
  }

.m_42bbd1ae {
  flex: 1;
  text-align: center;
}

/*************************************** default variant ***************************************/
.m_576c9d4 {
  position: relative;
}
.m_576c9d4::before {
    content: '';
    position: absolute;
    border: 1px solid var(--tab-border-color);
    bottom: var(--tabs-list-line-bottom);
    inset-inline-start: var(--tabs-list-line-start);
    inset-inline-end: var(--tabs-list-line-end);
    top: var(--tabs-list-line-top);
  }

.m_539e827b {
  border-radius: var(--tab-radius);
  border-width: var(--tab-border-width);
  border-style: solid;
  border-color: transparent;
  background-color: transparent;
}

.m_539e827b:where([data-active]) {
    border-color: var(--tabs-color);
  }

@media (hover: hover) {
    .m_539e827b:hover {
    background-color: var(--tab-hover-color);
    }

    .m_539e827b:hover:where(:not([data-active])) {
      border-color: var(--tab-border-color);
    }
}

@media (hover: none) {
    .m_539e827b:active {
    background-color: var(--tab-hover-color);
    }

    .m_539e827b:active:where(:not([data-active])) {
      border-color: var(--tab-border-color);
    }
}

@media (hover: hover) {
    .m_539e827b:disabled:hover, .m_539e827b[data-disabled]:hover {
      background-color: transparent;
    }
}

@media (hover: none) {
    .m_539e827b:disabled:active, .m_539e827b[data-disabled]:active {
      background-color: transparent;
    }
}

/*************************************** outline variant ***************************************/
.m_6772fbd5 {
  position: relative;
}
.m_6772fbd5::before {
    content: '';
    position: absolute;
    border-color: var(--tab-border-color);
    border-width: var(--tabs-list-border-size);
    border-style: solid;
    bottom: var(--tabs-list-line-bottom);
    inset-inline-start: var(--tabs-list-line-start);
    inset-inline-end: var(--tabs-list-line-end);
    top: var(--tabs-list-line-top);
  }

.m_b59ab47c {
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;
  border-top-color: var(--tab-border-top-color);
  border-bottom-color: var(--tab-border-bottom-color);
  border-radius: var(--tab-radius);
  position: relative;

  --tab-border-bottom-color: transparent;
  --tab-border-top-color: transparent;
  --tab-border-inline-end-color: transparent;
  --tab-border-inline-start-color: transparent;
}

.m_b59ab47c:where([data-active])::before {
      content: '';
      position: absolute;
      background-color: var(--tab-border-color);
      bottom: var(--tab-before-bottom, calc(-0.0625rem * var(--mantine-scale)));
      left: var(--tab-before-left, calc(-0.0625rem * var(--mantine-scale)));
      right: var(--tab-before-right, auto);
      top: var(--tab-before-top, auto);
      width: 1px;
      height: 1px;
    }

.m_b59ab47c:where([data-active])::after {
      content: '';
      position: absolute;
      background-color: var(--tab-border-color);
      bottom: var(--tab-after-bottom, calc(-0.0625rem * var(--mantine-scale)));
      right: var(--tab-after-right, calc(-0.0625rem * var(--mantine-scale)));
      left: var(--tab-after-left, auto);
      top: var(--tab-after-top, auto);
      width: 1px;
      height: 1px;
    }

.m_b59ab47c:where([data-active]) {

    border-top-color: var(--tab-border-top-color);
    border-bottom-color: var(--tab-border-bottom-color);
    border-inline-start-color: var(--tab-border-inline-start-color);
    border-inline-end-color: var(--tab-border-inline-end-color);

    --tab-border-top-color: var(--tab-border-color);
    --tab-border-inline-start-color: var(--tab-border-color);
    --tab-border-inline-end-color: var(--tab-border-color);
    --tab-border-bottom-color: var(--mantine-color-body);
}

.m_b59ab47c:where([data-active])[data-inverted] {
      --tab-border-bottom-color: var(--tab-border-color);
      --tab-border-top-color: var(--mantine-color-body);

      --tab-before-bottom: auto;
      --tab-before-top: -1px;
      --tab-after-bottom: auto;
      --tab-after-top: -1px;
    }

.m_b59ab47c:where([data-active])[data-orientation='vertical'][data-placement='left'] {
        --tab-border-inline-end-color: var(--mantine-color-body);
        --tab-border-inline-start-color: var(--tab-border-color);
        --tab-border-bottom-color: var(--tab-border-color);

        --tab-before-right: -1px;
        --tab-before-left: auto;
        --tab-before-bottom: auto;
        --tab-before-top: -1px;
        --tab-after-left: auto;
        --tab-after-right: -1px;
      }

[dir="rtl"] .m_b59ab47c:where([data-active])[data-orientation='vertical'][data-placement='left'] {
          --tab-before-right: auto;
          --tab-before-left: -1px;
          --tab-after-left: -1px;
          --tab-after-right: auto;
}

.m_b59ab47c:where([data-active])[data-orientation='vertical'][data-placement='right'] {
        --tab-border-inline-start-color: var(--mantine-color-body);
        --tab-border-inline-end-color: var(--tab-border-color);
        --tab-border-bottom-color: var(--tab-border-color);

        --tab-before-left: -1px;
        --tab-before-right: auto;
        --tab-before-bottom: auto;
        --tab-before-top: -1px;
        --tab-after-right: auto;
        --tab-after-left: -1px;
      }

[dir="rtl"] .m_b59ab47c:where([data-active])[data-orientation='vertical'][data-placement='right'] {
          --tab-before-left: auto;
          --tab-before-right: -1px;
          --tab-after-right: -1px;
          --tab-after-left: auto;
}

/*************************************** pills variant ***************************************/
.m_c3381914 {
  border-radius: var(--tabs-radius);
  background-color: var(--tab-bg);
  color: var(--tab-color);

  --tab-bg: transparent;
  --tab-color: inherit;
}
@media (hover: hover) {
    .m_c3381914:not([data-disabled]):hover {
      --tab-bg: var(--tab-hover-color);
    }
}
@media (hover: none) {
    .m_c3381914:not([data-disabled]):active {
      --tab-bg: var(--tab-hover-color);
    }
}
.m_c3381914[data-active][data-active] {
    --tab-bg: var(--tabs-color);
    --tab-color: var(--tabs-text-color, var(--mantine-color-white));
  }
@media (hover: hover) {
    .m_c3381914[data-active][data-active]:hover {
      --tab-bg: var(--tabs-color);
    }
}
@media (hover: none) {
    .m_c3381914[data-active][data-active]:active {
      --tab-bg: var(--tabs-color);
    }
}
`;
const text = `.m_b6d8b162 {
  -webkit-tap-highlight-color: transparent;
  text-decoration: none;
  font-size: var(--text-fz, var(--mantine-font-size-md));
  line-height: var(--text-lh, var(--mantine-line-height-md));
  font-weight: normal;
  margin: 0;
  padding: 0;
  color: var(--text-color);
}

  .m_b6d8b162:where([data-truncate]) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .m_b6d8b162:where([data-truncate='start']) {
    direction: rtl;
    text-align: right;
  }

  :where([dir="rtl"]) .m_b6d8b162:where([data-truncate='start']) {
      direction: ltr;
      text-align: left;
}

  .m_b6d8b162:where([data-variant='gradient']) {
    background-image: var(--text-gradient);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .m_b6d8b162:where([data-line-clamp]) {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: var(--text-line-clamp);
    -webkit-box-orient: vertical;
  }

  .m_b6d8b162:where([data-inherit]) {
    line-height: inherit;
    font-weight: inherit;
    font-size: inherit;
  }

  .m_b6d8b162:where([data-inline]) {
    line-height: 1;
  }
`;
const unstyledButton = '.m_87cf2631 {\n  background-color: transparent;\n  cursor: pointer;\n  border: 0;\n  padding: 0;\n  appearance: none;\n  font-size: var(--mantine-font-size-md);\n  text-align: left;\n  text-decoration: none;\n  color: inherit;\n  touch-action: manipulation;\n  -webkit-tap-highlight-color: transparent;\n}\n\n  :where([dir="rtl"]) .m_87cf2631 {\n    text-align: right;\n}\n';
const theme = createTheme({
  primaryColor: "gray",
  components: {
    Button: {
      vars: (theme2, props) => {
        if (props.variant === "toolbar") {
          return {
            root: {
              "--button-height": "var(--button-height-compact-sm)",
              "--button-padding-x": "var(--button-padding-x-compact-sm)",
              "--button-fz": "var(--mantine-font-size-sm)",
              "--button-bg": "var(--mantine-color-default)",
              "--button-hover": "var(--mantine-color-default-hover)",
              "--button-color": "var(--mantine-color-default-color)",
              "--button-bd": "calc(0.0625rem * var(--mantine-scale)) solid var(--mantine-color-default-border)",
              fontWeight: "400"
            }
          };
        }
        return {};
      }
    }
  }
});
const { Computed, Effect, Signal, action, batch, computed, createModel, effect, signal, untracked } = signalsCore;
function getAugmentedNamespace(n2) {
  if (Object.prototype.hasOwnProperty.call(n2, "__esModule")) return n2;
  var f2 = n2.default;
  if (typeof f2 == "function") {
    var a2 = function a3() {
      if (this instanceof a3) {
        return Reflect.construct(f2, arguments, this.constructor);
      }
      return f2.apply(this, arguments);
    };
    a2.prototype = f2.prototype;
  } else a2 = {};
  Object.defineProperty(a2, "__esModule", { value: true });
  Object.keys(n2).forEach(function(k2) {
    var d2 = Object.getOwnPropertyDescriptor(n2, k2);
    Object.defineProperty(a2, k2, d2.get ? d2 : {
      enumerable: true,
      get: function() {
        return n2[k2];
      }
    });
  });
  return a2;
}
var shim = { exports: {} };
var useSyncExternalStoreShim_production = {};
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(compat_module);
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredUseSyncExternalStoreShim_production;
function requireUseSyncExternalStoreShim_production() {
  if (hasRequiredUseSyncExternalStoreShim_production) return useSyncExternalStoreShim_production;
  hasRequiredUseSyncExternalStoreShim_production = 1;
  var React = require$$0;
  function is(x2, y2) {
    return x2 === y2 && (0 !== x2 || 1 / x2 === 1 / y2) || x2 !== x2 && y2 !== y2;
  }
  var objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue;
  function useSyncExternalStore$2(subscribe, getSnapshot) {
    var value = getSnapshot(), _useState = useState({ inst: { value, getSnapshot } }), inst = _useState[0].inst, forceUpdate = _useState[1];
    useLayoutEffect(
      function() {
        inst.value = value;
        inst.getSnapshot = getSnapshot;
        checkIfSnapshotChanged(inst) && forceUpdate({ inst });
      },
      [subscribe, value, getSnapshot]
    );
    useEffect(
      function() {
        checkIfSnapshotChanged(inst) && forceUpdate({ inst });
        return subscribe(function() {
          checkIfSnapshotChanged(inst) && forceUpdate({ inst });
        });
      },
      [subscribe]
    );
    useDebugValue(value);
    return value;
  }
  function checkIfSnapshotChanged(inst) {
    var latestGetSnapshot = inst.getSnapshot;
    inst = inst.value;
    try {
      var nextValue = latestGetSnapshot();
      return !objectIs(inst, nextValue);
    } catch (error) {
      return true;
    }
  }
  function useSyncExternalStore$1(subscribe, getSnapshot) {
    return getSnapshot();
  }
  var shim2 = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
  useSyncExternalStoreShim_production.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim2;
  return useSyncExternalStoreShim_production;
}
var hasRequiredShim;
function requireShim() {
  if (hasRequiredShim) return shim.exports;
  hasRequiredShim = 1;
  {
    shim.exports = requireUseSyncExternalStoreShim_production();
  }
  return shim.exports;
}
var shimExports = requireShim();
var l = cn.split(".").map(Number)[0], d = Symbol.for(l >= 19 ? "react.transitional.element" : "react.element"), m = "undefined" != typeof window && !!window.__PREACT_SIGNALS_DEVTOOLS__;
var b, y = Symbol.dispose || Symbol.for("Symbol.dispose");
function g(n2, t2) {
  var r2 = t2.effect.S();
  b = t2;
  return h.bind(t2, n2, r2);
}
function h(n2, t2) {
  t2();
  b = n2;
}
var w, _, S = function() {
}, x = ((w = { u: 0, effect: { s: void 0, c: function() {
}, S: function() {
  return S;
}, d: function() {
} }, subscribe: function() {
  return S;
}, getSnapshot: function() {
  return 0;
}, S: function() {
}, f: function() {
} })[y] = function() {
}, w), j = Promise.prototype.then.bind(Promise.resolve());
function P() {
  if (!_) _ = j($);
}
function $() {
  var n2;
  _ = void 0;
  null == (n2 = b) || n2.f();
}
function C(n2, t2) {
  P();
  var r2 = A$1();
  if (null == r2.current) if ("undefined" == typeof window) r2.current = x;
  else r2.current = (function(n3, t3) {
    var r3, i3, u2, o2, f2 = 0, c2 = effect(function() {
      i3 = this;
    }, { name: "Component" });
    i3.c = function() {
      f2 = f2 + 1 | 0;
      if (m) {
        var n4;
        null == (n4 = i3.y) || n4.call(i3);
      }
      if (o2) o2();
    };
    return (r3 = { u: n3, effect: i3, subscribe: function(n4) {
      o2 = n4;
      return function() {
        f2 = f2 + 1 | 0;
        o2 = void 0;
        c2();
      };
    }, getSnapshot: function() {
      return f2;
    }, S: function() {
      if (null != b) {
        var n4 = b.u, t4 = this.u;
        if (0 == n4 && 0 == t4 || 0 == n4 && 1 == t4) {
          b.f();
          u2 = g(void 0, this);
        } else if (1 == n4 && 0 == t4 || 2 == n4 && 0 == t4) ;
        else u2 = g(b, this);
      } else u2 = g(void 0, this);
    }, f: function() {
      var n4 = u2;
      u2 = void 0;
      null == n4 || n4();
    } })[y] = function() {
      this.f();
    }, r3;
  })(n2);
  var i2 = r2.current;
  shimExports.useSyncExternalStore(i2.subscribe, i2.getSnapshot, i2.getSnapshot);
  i2.S();
  return i2;
}
Object.defineProperties(Signal.prototype, { $$typeof: { configurable: true, value: d }, type: { configurable: true, value: function(n2) {
  var t2 = n2.data, r2 = C(1);
  try {
    return t2.value;
  } finally {
    r2.f();
  }
} }, props: { configurable: true, get: function() {
  var n2 = this;
  return { data: { get value() {
    return n2.value;
  } } };
} }, ref: { configurable: true, value: null } });
function N(n2, t2) {
  return C(n2);
}
function tracked(render) {
  return function Tracked(props) {
    const store = N(1);
    try {
      return render(props);
    } finally {
      store.f();
    }
  };
}
function useMiddleware() {
  const ref = runtime.value;
  return ref ? { context: ref.context, emit: ref.emit } : { context: null, emit: () => {
  } };
}
const sectionStyle = {
  margin: "8px 18px",
  flexBasis: "400px",
  flexGrow: 10,
  flexShrink: 10
};
const dividerStyle = {
  flexBasis: "1px",
  flexGrow: 0,
  flexShrink: 0,
  borderBottom: "1px solid #8883"
};
const OutlineSection = (props) => {
  return /* @__PURE__ */ gn.createElement(gn.Fragment, null, /* @__PURE__ */ gn.createElement("div", { style: dividerStyle }), /* @__PURE__ */ gn.createElement("div", { style: sectionStyle }, /* @__PURE__ */ gn.createElement(ScrollArea, { h: "100%", styles: { thumb: { background: "rgba(255,255,255,0.4)" } } }, props.children)));
};
function isValidNumber(n2) {
  return typeof n2 === "number" && isFinite(n2) && !isNaN(n2);
}
class WatchValue extends gn.Component {
  constructor() {
    super(...arguments);
    this.state = {};
    this.setter = (v2) => {
      this.props.setValue?.(v2);
    };
    this.getter = () => {
      if (this.props.getValue) {
        return this.props.getValue?.();
      }
    };
    this.stopEdit = () => {
      this.setState({ editing: false });
      this.commitEdit();
    };
    this.updateEdit = (e2) => {
      if (e2.key === "Escape") {
        this.el.textContent = this.state.originalValue;
        this.el.blur();
        return;
      }
      if (e2.key === "Enter") {
        this.el.blur();
        return;
      }
    };
    this.commitEdit = () => {
      if (!this.setter)
        return;
      if (this.el.textContent === this.lastEditValue)
        return;
      this.lastEditValue = this.el.textContent;
      const value = this.parse(this.el.textContent);
      if (typeof value === "undefined")
        return;
      if (value === null && !this.props.allowNull)
        return;
      this.setter(value);
    };
    this.startEdit = () => {
      this.lastEditValue = this.el.textContent;
      this.setState({ editing: true, originalValue: this.el.textContent });
    };
    this.frame = 0;
    this.tick = () => {
      if (!this.el) {
        return;
      }
      const every = this.props.every ?? 1;
      if (!this.state.editing && this.frame % every === 0) {
        const value = this.stringify(this.getter());
        if (this.el.textContent !== value)
          this.el.textContent = value;
      }
      this.frame++;
      window.requestAnimationFrame(this.tick);
    };
    this.setRef = (ref) => {
      this.el = ref;
    };
  }
  componentDidMount() {
    this.tick();
  }
  componentWillUnmount() {
  }
  render() {
    const editable = this.props.editable && !!this.setter;
    return /* @__PURE__ */ gn.createElement("span", { onFocus: this.startEdit, onBlur: this.stopEdit, onKeyUp: this.updateEdit, onKeyDown: this.updateEdit, onKeyPress: this.updateEdit, onClick: this.startEdit, contentEditable: editable, style: editable ? editStyle : viewStyle, ref: this.setRef });
  }
}
class WatchText extends WatchValue {
  constructor() {
    super(...arguments);
    this.parse = (v2) => v2;
    this.stringify = (v2) => v2;
  }
}
class WatchInteger extends WatchValue {
  constructor() {
    super(...arguments);
    this.parse = (v2) => {
      const n2 = parseInt(v2);
      return isValidNumber(n2) ? n2 : null;
    };
    this.stringify = (num) => {
      if (typeof num === "number") {
        return num.toFixed(0);
      } else {
        return num || "";
      }
    };
  }
}
class WatchNumber extends WatchValue {
  constructor() {
    super(...arguments);
    this.parse = (v2) => {
      const n2 = parseFloat(v2);
      return isValidNumber(n2) ? n2 : null;
    };
    this.stringify = (num) => {
      if (typeof num === "number") {
        return String(num);
      } else {
        return num || "";
      }
    };
  }
}
class WatchBoolean extends WatchValue {
  constructor() {
    super(...arguments);
    this.parse = (v2) => {
      if (/(true|false|t|f|1|0)/.test(v2)) {
        return v2 === "true" || v2 === "t" || v2 === "1";
      }
    };
    this.stringify = (v2) => {
      return v2 + "";
    };
  }
}
class WatchVec2 extends WatchValue {
  constructor() {
    super(...arguments);
    this.parse = (v2) => {
      if (!v2)
        return null;
      const xy = v2.split(",");
      if (xy.length !== 2)
        return;
      const x2 = parseFloat(xy[0]);
      const y2 = parseFloat(xy[1]);
      if (isValidNumber(x2) && isValidNumber(y2)) {
        return { x: x2, y: y2 };
      }
      return null;
    };
    this.stringify = (v2) => {
      if (typeof v2 === "undefined" || v2 === null) {
        return "";
      } else if (typeof v2 === "object") {
        const x2 = typeof v2.x === "number" ? v2.x.toFixed(1) : v2.x || "";
        const y2 = typeof v2.y === "number" ? v2.y.toFixed(1) : v2.y || "";
        return x2 + ", " + y2;
      } else if (typeof v2 === "string") {
        return v2;
      } else {
        return String(v2);
      }
    };
  }
}
const viewStyle = {
  whiteSpace: "nowrap"
};
const editStyle = {
  ...viewStyle,
  display: "inline-block",
  width: "100%",
  borderBottom: "1px solid rgba(255, 255, 255, 0.3)"
};
function FiChevronRight(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "polyline", "attr": { "points": "9 18 15 12 9 6" }, "child": [] }] })(props);
}
function FiChevronDown(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "polyline", "attr": { "points": "6 9 12 15 18 9" }, "child": [] }] })(props);
}
const SubtreeContext = gn.createContext({});
const subtreeStyle = {
  position: "relative",
  color: "#aaa"
};
const Subtree = (props) => {
  const [openState, setOpenState] = gn.useState(props.open ?? false);
  const controlled = typeof props.onToggle === "function";
  const open = controlled ? !!props.open : openState;
  const setOpen = controlled ? props.onToggle : setOpenState;
  const context = gn.useMemo(() => {
    return { open, setOpen, rowHeight: props.rowHeight };
  }, [open, setOpen, props.rowHeight]);
  return /* @__PURE__ */ gn.createElement(SubtreeContext.Provider, { value: context }, /* @__PURE__ */ gn.createElement("div", { style: subtreeStyle }, props.children));
};
const headerIconStyle = {
  fontSize: "0.8em",
  marginLeft: "-2px",
  marginRight: "5px"
};
const subtreeBranchStyle = {
  display: "inline-block",
  position: "absolute",
  left: "-0.9em",
  top: "-0.1em",
  width: "0.5em",
  height: "1em",
  borderBottom: "1px solid #aaa"
};
const SubtreeHeader = (props) => {
  const subtree = gn.useContext(SubtreeContext);
  const onClick = gn.useCallback(() => {
    subtree.setOpen(!subtree.open);
    props.onClick?.();
  }, [subtree.open, subtree.setOpen, props.onClick]);
  const rowStyle = subtree.rowHeight ? { height: subtree.rowHeight, lineHeight: subtree.rowHeight + "px", whiteSpace: "nowrap", overflow: "hidden" } : void 0;
  return /* @__PURE__ */ gn.createElement("div", { style: rowStyle }, /* @__PURE__ */ gn.createElement("span", { style: subtreeBranchStyle }, " "), subtree.open ? /* @__PURE__ */ gn.createElement(FiChevronDown, { style: headerIconStyle }) : /* @__PURE__ */ gn.createElement(FiChevronRight, { style: headerIconStyle }), /* @__PURE__ */ gn.createElement("a", { onClick }, props.children));
};
const subtreeBodyStyle = {
  borderLeft: "1px solid #aaa",
  paddingLeft: "0.9em",
  marginBottom: "1em"
};
const SubtreeBody = (props) => {
  const subtree = gn.useContext(SubtreeContext);
  if (!subtree.open)
    return null;
  const style = subtree.rowHeight ? { ...subtreeBodyStyle, marginBottom: 0 } : subtreeBodyStyle;
  return /* @__PURE__ */ gn.createElement("div", { style }, props.children);
};
const pairStyle = {
  display: "flex",
  flexDirection: "row"
};
const Pair = (props) => {
  return /* @__PURE__ */ gn.createElement("div", { style: pairStyle }, props.children);
};
const keyStyle = {
  overflow: "hidden",
  flexGrow: 1,
  flexShrink: 1,
  paddingRight: "5px",
  textOverflow: "ellipsis"
};
const PairKey = (props) => {
  return /* @__PURE__ */ gn.createElement("div", { style: keyStyle }, props.children);
};
const valueStyle = {
  width: "95px",
  flexGrow: 0,
  flexShrink: 0
};
const PairValue = (props) => {
  return /* @__PURE__ */ gn.createElement("div", { style: valueStyle }, props.children);
};
class LiveBodyComponent extends gn.PureComponent {
  constructor() {
    super(...arguments);
    this.handleClick = () => {
      const { emit, body } = this.props;
      emit("select-body", { body: getKey(body) });
    };
  }
  render() {
    const { body, selected, selectable, variant, every } = this.props;
    if (!body) {
      return null;
    }
    const label = getLabel(body);
    let showType;
    let showPosition;
    if (variant === "short") {
      showType = false;
      showPosition = !label;
    } else {
      showType = true;
      showPosition = true;
    }
    let className = "";
    className += selected ? "selected-item " : "";
    className += selectable ? "clickable " : "";
    return /* @__PURE__ */ gn.createElement("span", { className, onClick: selectable ? this.handleClick : null }, label ? "body#" + label : showType && body.getType(), " ", showPosition && /* @__PURE__ */ gn.createElement(WatchVec2, { getValue: () => body.getPosition(), every }));
  }
}
const LiveBody = tracked((props) => {
  const { context, emit } = useMiddleware();
  const bodyKey = getKey(props.body);
  const selected = isSelected(context.multiselect?.value, bodyKey);
  return /* @__PURE__ */ gn.createElement(LiveBodyComponent, { body: props.body, selectable: props.selectable, variant: props.variant, every: props.every, emit, selected });
});
class LiveFixtureComponent extends gn.PureComponent {
  constructor() {
    super(...arguments);
    this.handleClick = () => {
      const { emit, fixture } = this.props;
      emit("select-fixture", {
        fixture: getKey(fixture),
        body: getKey(fixture.getBody())
      });
    };
  }
  render() {
    const { fixture, selected, selectable } = this.props;
    if (!fixture) {
      return null;
    }
    const label = getLabel(fixture);
    let className = "";
    className += selected ? "selected-item " : "";
    className += selectable ? "clickable " : "";
    return /* @__PURE__ */ gn.createElement("span", { className, onClick: selectable ? this.handleClick : null }, label ? "fixture#" + label : fixture.getType() ?? "");
  }
}
const LiveFixture = tracked((props) => {
  const { context, emit } = useMiddleware();
  const fixtureKey = getKey(props.fixture);
  const selected = isSelected(context.multiselect?.value, fixtureKey);
  return /* @__PURE__ */ gn.createElement(LiveFixtureComponent, { fixture: props.fixture, selectable: props.selectable, emit, selected });
});
const FixtureView = ({ fixture }) => {
  if (!fixture)
    return null;
  return /* @__PURE__ */ gn.createElement(Subtree, { open: true }, /* @__PURE__ */ gn.createElement(SubtreeHeader, null, /* @__PURE__ */ gn.createElement(LiveFixture, { fixture })), /* @__PURE__ */ gn.createElement(SubtreeBody, null, /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "label"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchText, { editable: true, getValue: () => getLabel(fixture) }))), /* @__PURE__ */ gn.createElement(ShapeView, { fixture }), /* @__PURE__ */ gn.createElement(MaterialView, { fixture }), /* @__PURE__ */ gn.createElement(FilterView, { fixture })));
};
const MaterialView = tracked(({ fixture }) => {
  const { context } = useMiddleware();
  const editable = context.editable.value;
  if (!fixture)
    return null;
  return /* @__PURE__ */ gn.createElement(Subtree, { open: true }, /* @__PURE__ */ gn.createElement(SubtreeHeader, null, "material"), /* @__PURE__ */ gn.createElement(SubtreeBody, null, /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "density"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => fixture.getDensity() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "friction"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => fixture.getFriction() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "restitution"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => fixture.getRestitution() })))));
});
const FilterView = tracked(({ fixture }) => {
  const { context } = useMiddleware();
  const editable = context.editable.value;
  if (!fixture)
    return null;
  return /* @__PURE__ */ gn.createElement(Subtree, null, /* @__PURE__ */ gn.createElement(SubtreeHeader, null, "filter"), /* @__PURE__ */ gn.createElement(SubtreeBody, null, /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "group index"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchInteger, { editable, getValue: () => fixture.getFilterGroupIndex() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "category bits"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchInteger, { editable, getValue: () => fixture.getFilterCategoryBits() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "mask bits"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchInteger, { editable, getValue: () => fixture.getFilterMaskBits() })))));
});
const ShapeView = ({ fixture }) => {
  const shape = fixture.getShape();
  let comp;
  if (shape.getType() === "circle") {
    comp = /* @__PURE__ */ gn.createElement(CircleView, { fixture });
  } else if (shape.getType() === "edge") {
    comp = /* @__PURE__ */ gn.createElement(EdgeView, { fixture });
  } else if (shape.getType() === "chain") {
    comp = /* @__PURE__ */ gn.createElement(ChainView, { fixture });
  } else if (shape.getType() === "polygon") {
    comp = /* @__PURE__ */ gn.createElement(PolygonView, { fixture });
  }
  return comp;
};
const CircleView = tracked(({ fixture }) => {
  const { context } = useMiddleware();
  const editable = context.editable.value;
  const shape = fixture.getShape();
  if (shape.getType() !== "circle")
    return;
  return /* @__PURE__ */ gn.createElement(gn.Fragment, null, /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "center"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchVec2, { editable, getValue: () => shape.m_p }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "radius"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => shape.m_radius }))));
});
const EdgeView = tracked(({ fixture }) => {
  const { context } = useMiddleware();
  const editable = context.editable.value;
  const shape = fixture.getShape();
  if (shape.getType() !== "edge")
    return;
  return /* @__PURE__ */ gn.createElement(gn.Fragment, null, /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "vertex1"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchVec2, { editable, getValue: () => shape.m_vertex1 }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "vertex2"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchVec2, { editable, getValue: () => shape.m_vertex2 }))));
});
const ChainView = tracked(({ fixture }) => {
  const { context } = useMiddleware();
  const editable = context.editable.value;
  const shape = fixture.getShape();
  if (shape.getType() !== "chain")
    return;
  return /* @__PURE__ */ gn.createElement(Subtree, { open: true }, /* @__PURE__ */ gn.createElement(SubtreeHeader, null, "vertices"), /* @__PURE__ */ gn.createElement(SubtreeBody, null, shape.m_vertices?.map((v2, i2) => /* @__PURE__ */ gn.createElement(Pair, { key: i2 }, /* @__PURE__ */ gn.createElement(PairKey, null, "[", i2, "]"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchVec2, { editable, getValue: () => v2 }))))));
});
const PolygonView = tracked(({ fixture }) => {
  const { context } = useMiddleware();
  const editable = context.editable.value;
  const shape = fixture.getShape();
  if (shape.getType() !== "polygon")
    return;
  return /* @__PURE__ */ gn.createElement(Subtree, { open: true }, /* @__PURE__ */ gn.createElement(SubtreeHeader, null, "vertices"), /* @__PURE__ */ gn.createElement(SubtreeBody, null, shape.m_vertices?.map((v2, i2) => /* @__PURE__ */ gn.createElement(Pair, { key: i2 }, /* @__PURE__ */ gn.createElement(PairKey, null, "[", i2, "]"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchVec2, { editable, getValue: () => v2 }))))));
});
function VirtualList(props) {
  const { items, rowHeight, visibleRows, rowsOf, keyOf, renderItem } = props;
  const overscan = props.overscan ?? 3;
  const [scrollTop, setScrollTop] = gn.useState(0);
  const handleScroll = gn.useCallback((ev) => {
    setScrollTop(ev.currentTarget.scrollTop);
  }, []);
  const firstRow = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const lastRow = Math.floor(scrollTop / rowHeight) + visibleRows + overscan;
  let row = 0;
  let start = -1;
  let end = items.length;
  let rowsBefore = 0;
  let rowsAfter = 0;
  for (let i2 = 0; i2 < items.length; i2++) {
    const rows = rowsOf(items[i2], i2);
    if (start < 0 && row + rows > firstRow) {
      start = i2;
      rowsBefore = row;
    }
    if (start >= 0 && row > lastRow) {
      end = i2;
      rowsAfter = totalRows(items, rowsOf) - row;
      break;
    }
    row += rows;
  }
  if (start < 0)
    start = items.length;
  const boxStyle = {
    height: rowHeight * visibleRows,
    overflowY: "auto",
    overflowX: "hidden"
  };
  return /* @__PURE__ */ gn.createElement("div", { style: boxStyle, onScroll: handleScroll }, /* @__PURE__ */ gn.createElement("div", { style: { height: rowsBefore * rowHeight } }), items.slice(start, end).map((item, i2) => /* @__PURE__ */ gn.createElement(gn.Fragment, { key: keyOf(item, start + i2) }, renderItem(item, start + i2))), /* @__PURE__ */ gn.createElement("div", { style: { height: rowsAfter * rowHeight } }));
}
const totalRows = (items, rowsOf) => {
  let rows = 0;
  for (let i2 = 0; i2 < items.length; i2++)
    rows += rowsOf(items[i2], i2);
  return rows;
};
class LiveJointComponent extends gn.PureComponent {
  constructor() {
    super(...arguments);
    this.handleClick = () => {
      const { emit, joint } = this.props;
      emit("select-joint", { joint: getKey(joint) });
    };
  }
  render() {
    const { joint, selected, selectable } = this.props;
    if (!joint) {
      return null;
    }
    const label = getLabel(joint);
    let className = "";
    className += selected ? "selected-item " : "";
    className += selectable ? "clickable " : "";
    return /* @__PURE__ */ gn.createElement("span", { className, onClick: selectable ? this.handleClick : null }, label ? "joint#" + label : joint.getType() ?? "");
  }
}
const LiveJoint = tracked((props) => {
  const { context, emit } = useMiddleware();
  const jointKey = getKey(props.joint);
  const selected = isSelected(context.multiselect?.value, jointKey);
  return /* @__PURE__ */ gn.createElement(LiveJointComponent, { joint: props.joint, selectable: props.selectable, emit, selected });
});
const ROW_HEIGHT = 24;
const VISIBLE_ROWS = 10;
const LIST_EVERY = 10;
const WorldSubtree = tracked(() => {
  const { context, emit } = useMiddleware();
  const world = context.world.value;
  const [, setReload] = gn.useState(0);
  const [expanded, setExpanded] = gn.useState(() => /* @__PURE__ */ new Set());
  const toggleBody = gn.useCallback((key, open) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (open)
        next.add(key);
      else
        next.delete(key);
      return next;
    });
  }, []);
  gn.useEffect(() => {
    if (!world)
      return;
    const reload = () => setReload((n2) => n2 + 1);
    world.on("add-body", reload);
    world.on("remove-body", reload);
    world.on("add-fixture", reload);
    world.on("remove-fixture", reload);
    world.on("add-joint", reload);
    world.on("remove-joint", reload);
    reload();
    return () => {
      world.off("add-body", reload);
      world.off("remove-body", reload);
      world.off("add-fixture", reload);
      world.off("remove-fixture", reload);
      world.off("add-joint", reload);
      world.off("remove-joint", reload);
    };
  }, [world]);
  if (!world)
    return null;
  const bodies = bodyArray(world);
  const joints = jointArray(world);
  return /* @__PURE__ */ gn.createElement(Tabs, { defaultValue: "bodies" }, /* @__PURE__ */ gn.createElement(Tabs.List, null, /* @__PURE__ */ gn.createElement(Tabs.Tab, { value: "bodies" }, /* @__PURE__ */ gn.createElement(Text, { size: "xs" }, "Bodies")), /* @__PURE__ */ gn.createElement(Tabs.Tab, { value: "joints" }, /* @__PURE__ */ gn.createElement(Text, { size: "xs" }, "Joints"))), /* @__PURE__ */ gn.createElement(Tabs.Panel, { value: "bodies" }, /* @__PURE__ */ gn.createElement(Subtree, { open: true }, /* @__PURE__ */ gn.createElement(SubtreeHeader, null, "bodies ", bodies.length), /* @__PURE__ */ gn.createElement(SubtreeBody, null, /* @__PURE__ */ gn.createElement(VirtualList, { items: bodies, rowHeight: ROW_HEIGHT, visibleRows: VISIBLE_ROWS, keyOf: (body) => getKey(body), rowsOf: (body) => 1 + (expanded.has(getKey(body)) ? fixtureCount(body) : 0), renderItem: (body) => {
    const key = getKey(body);
    return /* @__PURE__ */ gn.createElement(Subtree, { open: expanded.has(key), onToggle: (open) => toggleBody(key, open), rowHeight: ROW_HEIGHT }, /* @__PURE__ */ gn.createElement(SubtreeHeader, { onClick: () => emit("select-body", { body: key }) }, /* @__PURE__ */ gn.createElement(LiveBody, { body, every: LIST_EVERY })), /* @__PURE__ */ gn.createElement(SubtreeBody, null, fixtureArray(body).map((fixture) => /* @__PURE__ */ gn.createElement(Subtree, { key: getKey(fixture), rowHeight: ROW_HEIGHT }, /* @__PURE__ */ gn.createElement(SubtreeHeader, { onClick: () => emit("select-fixture", {
      fixture: getKey(fixture),
      body: key
    }) }, /* @__PURE__ */ gn.createElement(LiveFixture, { fixture }))))));
  } })))), /* @__PURE__ */ gn.createElement(Tabs.Panel, { value: "joints" }, /* @__PURE__ */ gn.createElement(Subtree, { open: true }, /* @__PURE__ */ gn.createElement(SubtreeHeader, null, "joints ", joints.length), /* @__PURE__ */ gn.createElement(SubtreeBody, null, /* @__PURE__ */ gn.createElement(VirtualList, { items: joints, rowHeight: ROW_HEIGHT, visibleRows: VISIBLE_ROWS, keyOf: (joint) => getKey(joint), rowsOf: () => 1, renderItem: (joint) => /* @__PURE__ */ gn.createElement(Subtree, { rowHeight: ROW_HEIGHT }, /* @__PURE__ */ gn.createElement(SubtreeHeader, { onClick: () => emit("select-joint", { joint: getKey(joint) }) }, /* @__PURE__ */ gn.createElement(LiveJoint, { joint }))) })))));
});
const WorldEdit = tracked(() => {
  const { context } = useMiddleware();
  const editable = context.editable.value;
  const world = context.world.value;
  if (!world)
    return null;
  return /* @__PURE__ */ gn.createElement(gn.Fragment, null, /* @__PURE__ */ gn.createElement(Subtree, { open: true }, /* @__PURE__ */ gn.createElement(SubtreeHeader, null, "world"), /* @__PURE__ */ gn.createElement(SubtreeBody, null, /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "gravity"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchVec2, { editable, getValue: () => world.getGravity() }))))));
});
function bodyArray(world) {
  const list = [];
  for (let body = world.getBodyList(); body; body = body.getNext()) {
    list.push(body);
  }
  return list;
}
function fixtureCount(body) {
  let count = 0;
  for (let fix = body.getFixtureList(); fix; fix = fix.getNext())
    count++;
  return count;
}
function fixtureArray(body) {
  const list = [];
  for (let fix = body.getFixtureList(); fix; fix = fix.getNext()) {
    list.push(fix);
  }
  return list;
}
function jointArray(world) {
  const list = [];
  for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
    list.push(joint);
  }
  return list;
}
const BodyView = tracked(({ body }) => {
  const { context } = useMiddleware();
  const editable = context.editable.value;
  if (!body)
    return null;
  return /* @__PURE__ */ gn.createElement(Subtree, { open: true }, /* @__PURE__ */ gn.createElement(SubtreeHeader, null, /* @__PURE__ */ gn.createElement(LiveBody, { body })), /* @__PURE__ */ gn.createElement(SubtreeBody, null, /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "label"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchText, { editable, getValue: () => getLabel(body) }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "type"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchText, { editable, getValue: () => body.getType() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "bullet"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchBoolean, { editable, getValue: () => body.isBullet() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "position"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchVec2, { editable, getValue: () => body.getPosition() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "angle"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => body.getAngle() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "linearVelocity"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchVec2, { editable, getValue: () => body.getLinearVelocity() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "angularVelocity"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => body.getAngularVelocity() }))), fixtureArray(body).map((fix) => /* @__PURE__ */ gn.createElement(FixtureView, { fixture: fix, key: getKey(fix) }))));
});
const JointView = tracked(({ joint }) => {
  const { context, emit } = useMiddleware();
  const editable = context.editable.value;
  if (!joint)
    return null;
  const type = joint.getType();
  return /* @__PURE__ */ gn.createElement(Subtree, { open: true }, /* @__PURE__ */ gn.createElement(SubtreeHeader, { onClick: () => emit("select-joint", { joint: getKey(joint) }) }, /* @__PURE__ */ gn.createElement(LiveJoint, { joint })), /* @__PURE__ */ gn.createElement(SubtreeBody, null, /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "type"), /* @__PURE__ */ gn.createElement(PairValue, null, type)), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "collideConnected"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchBoolean, { editable, getValue: () => joint.getCollideConnected() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "label"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchText, { editable, getValue: () => getLabel(joint) }))), type === "distance-joint" && /* @__PURE__ */ gn.createElement(EditDistanceJoint, { editable, joint }), type === "rope-joint" && /* @__PURE__ */ gn.createElement(EditRopeJoint, { editable, joint }), type === "friction-joint" && /* @__PURE__ */ gn.createElement(EditFrictionJoint, { editable, joint }), type === "prismatic-joint" && /* @__PURE__ */ gn.createElement(EditPrismaticJoint, { editable, joint }), type === "revolute-joint" && /* @__PURE__ */ gn.createElement(EditRevoluteJoint, { editable, joint }), type === "weld-joint" && /* @__PURE__ */ gn.createElement(EditWeldJoint, { editable, joint }), type === "wheel-joint" && /* @__PURE__ */ gn.createElement(EditWheelJoint, { editable, joint }), type === "motor-joint" && /* @__PURE__ */ gn.createElement(EditMotorJoint, { editable, joint }), type === "pulley-joint" && /* @__PURE__ */ gn.createElement(EditPulleyJoint, { editable, joint })));
});
const EditBodies = tracked(({ joint, noAnchors }) => {
  const { context } = useMiddleware();
  const editable = context.editable.value;
  return /* @__PURE__ */ gn.createElement(gn.Fragment, null, /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "bodyA"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(LiveBody, { variant: "short", body: joint.getBodyA(), selectable: false }))), !noAnchors && /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "localAnchorA"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchVec2, { editable, getValue: () => joint.getAnchorA() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "bodyB"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(LiveBody, { variant: "short", body: joint.getBodyB(), selectable: false }))), !noAnchors && /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "localAnchorB"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchVec2, { editable, getValue: () => joint.getAnchorA() }))));
});
const EditDistanceJoint = ({ editable, joint }) => {
  return /* @__PURE__ */ gn.createElement(gn.Fragment, null, /* @__PURE__ */ gn.createElement(EditBodies, { joint }), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "length"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, allowNull: true, getValue: () => joint.getLength() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "frequencyHz"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getFrequency() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "dampingRatio"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getDampingRatio() }))));
};
const EditRopeJoint = ({ editable, joint }) => {
  return /* @__PURE__ */ gn.createElement(gn.Fragment, null, /* @__PURE__ */ gn.createElement(EditBodies, { joint }), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "maxLength"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getMaxLength() }))));
};
const EditFrictionJoint = ({ editable, joint }) => {
  return /* @__PURE__ */ gn.createElement(gn.Fragment, null, /* @__PURE__ */ gn.createElement(EditBodies, { joint }), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "maxForce"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getMaxForce() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "maxTorque"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getMaxTorque() }))));
};
const EditPrismaticJoint = ({ editable, joint }) => {
  return /* @__PURE__ */ gn.createElement(gn.Fragment, null, /* @__PURE__ */ gn.createElement(EditBodies, { joint }), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "localAxisA"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchVec2, { editable, getValue: () => joint.getLocalAxisA() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "enableLimit"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchBoolean, { editable, getValue: () => joint.isLimitEnabled() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "lowerTranslation"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getLowerLimit() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "upperTranslation"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getUpperLimit() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "enableMotor"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchBoolean, { editable, getValue: () => joint.isLimitEnabled() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "maxMotorForce"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getMaxMotorForce() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "motorSpeed"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getMotorSpeed() }))));
};
const EditRevoluteJoint = ({ editable, joint }) => {
  return /* @__PURE__ */ gn.createElement(gn.Fragment, null, /* @__PURE__ */ gn.createElement(EditBodies, { joint }), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "enableLimit"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchBoolean, { editable, getValue: () => joint.isLimitEnabled() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "lowerAngle"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getLowerLimit() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "upperAngle"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getUpperLimit() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "enableMotor"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchBoolean, { editable, getValue: () => joint.isMotorEnabled() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "maxMotorTorque"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getMaxMotorTorque() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "motorSpeed"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getMotorSpeed() }))));
};
const EditWeldJoint = ({ editable, joint }) => {
  return /* @__PURE__ */ gn.createElement(gn.Fragment, null, /* @__PURE__ */ gn.createElement(EditBodies, { joint }), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "referenceAngle"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getReferenceAngle() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "frequencyHz"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getFrequency() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "dampingRatio"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getDampingRatio() }))));
};
const EditWheelJoint = ({ editable, joint }) => {
  return /* @__PURE__ */ gn.createElement(gn.Fragment, null, /* @__PURE__ */ gn.createElement(EditBodies, { joint }), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "localAxisA"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchVec2, { editable, getValue: () => joint.getLocalAxisA() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "springFrequencyHz"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getSpringFrequencyHz() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "springDampingRatio"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getSpringDampingRatio() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "enableMotor"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchBoolean, { editable, getValue: () => joint.isMotorEnabled() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "maxMotorTorque"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getMaxMotorTorque() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "motorSpeed"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getMotorSpeed() }))));
};
const EditMotorJoint = ({ editable, joint }) => {
  return /* @__PURE__ */ gn.createElement(gn.Fragment, null, /* @__PURE__ */ gn.createElement(EditBodies, { joint, noAnchors: true }), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "linearOffset"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchVec2, { editable, getValue: () => joint.getLinearOffset() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "angularOffset"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getAngularOffset() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "maxForce"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getMaxForce() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "maxTorque"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getMaxForce() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "correctionFactor"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getCorrectionFactor() }))));
};
const EditPulleyJoint = ({ editable, joint }) => {
  return /* @__PURE__ */ gn.createElement(gn.Fragment, null, /* @__PURE__ */ gn.createElement(EditBodies, { joint }), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "groundAnchorA"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchVec2, { editable, getValue: () => joint.getGroundAnchorA() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "groundAnchorB"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchVec2, { editable, getValue: () => joint.getGroundAnchorB() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "lengthA"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, allowNull: true, getValue: () => joint.getLengthA() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "lengthB"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, allowNull: true, getValue: () => joint.getLengthB() }))), /* @__PURE__ */ gn.createElement(Pair, null, /* @__PURE__ */ gn.createElement(PairKey, null, "ratio"), /* @__PURE__ */ gn.createElement(PairValue, null, /* @__PURE__ */ gn.createElement(WatchNumber, { editable, getValue: () => joint.getRatio() }))));
};
const SelectionView = tracked(() => {
  const { context } = useMiddleware();
  const world = context.world?.value;
  if (!world)
    return;
  const multiselect = context.multiselect?.value;
  if (multiselect?.selected.length > 0) {
    return multiselect.selected.map((selection) => {
      if (selection?.type === "fixture") {
        if (selection.up?.type === "body") {
          const fixture = findFixture(world, selection.key);
          const body = findBody(world, selection.up.key);
          return /* @__PURE__ */ gn.createElement(BodyView, { body, fixture });
        } else {
          const fixture = findFixture(world, selection.key);
          return /* @__PURE__ */ gn.createElement(FixtureView, { fixture });
        }
      }
      if (selection?.type === "body") {
        const body = findBody(world, selection.key);
        return /* @__PURE__ */ gn.createElement(BodyView, { body });
      }
      if (selection?.type === "joint") {
        const joint = findJoint(world, selection.key);
        return /* @__PURE__ */ gn.createElement(JointView, { joint });
      }
    });
  }
  return /* @__PURE__ */ gn.createElement(WorldEdit, null);
});
const LiveOutlinePanel = tracked(() => {
  const { context } = useMiddleware();
  if (context.activity?.value !== "mode:play")
    return;
  return /* @__PURE__ */ gn.createElement(gn.Fragment, null, /* @__PURE__ */ gn.createElement(Group, { justify: "end", gap: 8, m: 8 }), /* @__PURE__ */ gn.createElement(OutlineSection, null, /* @__PURE__ */ gn.createElement(SelectionView, null)), /* @__PURE__ */ gn.createElement(OutlineSection, null, /* @__PURE__ */ gn.createElement(WorldSubtree, null)));
});
const OUTLINE_WIDTH = 290;
const affixStyle = {
  width: OUTLINE_WIDTH,
  overflowY: "auto",
  background: "#1e1e1e",
  borderLeft: "1px solid #333"
};
const affixPosition = {
  right: 0,
  top: 0,
  bottom: 0
};
const panelStyle = {
  fontSize: "0.9em",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "12px"
};
const OutlineComponent = tracked((props) => {
  const context = runtime.value?.context;
  if (!context?.showOutline?.value)
    return null;
  return /* @__PURE__ */ gn.createElement(Affix, { position: affixPosition, style: { ...affixStyle, paddingTop: (props.top ?? 0) + "px" } }, /* @__PURE__ */ gn.createElement("div", { style: panelStyle }, /* @__PURE__ */ gn.createElement(LiveOutlinePanel, null)));
});
const OutlineFrame = ({ top = 0 }) => {
  h$1(() => {
    return effect(() => {
      if (!runtime?.value)
        return;
      const el = runtime?.value.context.containerElement?.value;
      if (!el)
        return;
      const showOutline = runtime.value.context.showOutline?.value;
      el.style.top = top + "px";
      el.style.right = showOutline ? OUTLINE_WIDTH + "px" : "0px";
    });
  }, [top]);
  return /* @__PURE__ */ gn.createElement(OutlineComponent, { top });
};
const STYLE_ID = "planck-testbed-shell-styles";
const STYLES = [baseline, variables, global, unstyledButton, affix, group, scrollArea, tabs, text].join("\n");
let root;
function addStyles() {
  if (document.getElementById(STYLE_ID))
    return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = STYLES;
  document.head.appendChild(style);
}
function renderShell(id) {
  const container = document.getElementById(id);
  if (!container) {
    console.log("Element not found: ", id);
    return;
  }
  if (root)
    return;
  addStyles();
  root = createRoot(container);
  root.render(/* @__PURE__ */ gn.createElement(IconContext.Provider, { value: { className: "svg-icon" } }, /* @__PURE__ */ gn.createElement(MantineProvider, { theme, defaultColorScheme: "dark" }, /* @__PURE__ */ gn.createElement(OutlineFrame, null))));
}
export {
  renderShell
};
