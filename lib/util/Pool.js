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

var _DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
var _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

module.exports = Pool;

function Pool(opts) {
  var _list = [];
  var _max = opts.max || Infinity;

  var _createFn = opts.create;
  var _outFn = opts.allocate;
  var _inFn = opts.release;
  var _discardFn = opts.discard;

  var _createCount = 0;
  var _outCount = 0;
  var _inCount = 0;
  var _discardCount = 0;

  this.max = function(n) {
    if (typeof n === 'number') {
      _max = n;
      return this;
    }
    return _max;
  };

  this.size = function() {
    return _list.length;
  };

  this.allocate = function() {
    var item;
    if (_list.length > 0) {
      item = _list.shift();
    } else {
      _createCount++;
      if (typeof _createFn === 'function') {
        item = _createFn();
      } else {
        item = {};
      }
    }
    _outCount++;
    if (typeof _outFn === 'function') {
      _outFn(item);
    }
    return item;
  };

  this.release = function(item) {
    if (_list.length < _max) {
      _inCount++;
      if (typeof _inFn === 'function') {
        _inFn(item);
      }
      _list.push(item);
    } else {
      _discardCount++;
      if (typeof _discardFn === 'function') {
        item = _discardFn(item);
      }
    }
  };

  this.toString = function() {
    return " +" + _createCount + " >" + _outCount + " <" + _inCount + " -"
        + _discardCount + " =" + _list.length + "/" + _max;
  };
}