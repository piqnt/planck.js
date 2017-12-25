if (typeof DEBUG === 'undefined') var DEBUG = false;
if (typeof ASSERT === 'undefined') var ASSERT = false;

var propIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function(to, from) {
  if (to === null || typeof to === 'undefined') {
    to = {};
  }

  for ( var key in from) {
    if (from.hasOwnProperty(key) && typeof to[key] === 'undefined') {
      to[key] = from[key];
    }
  }

  if (typeof Object.getOwnPropertySymbols === 'function') {
    var symbols = Object.getOwnPropertySymbols(from);
    for (var i = 0; i < symbols.length; i++) {
      var symbol = symbols[i];
      if (from.propertyIsEnumerable(symbol) && typeof to[key] === 'undefined') {
        to[symbol] = from[symbol];
      }
    }
  }
  return to;
};
