var _DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
var _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

var propIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function(input, defaults) {
  if (input === null || typeof input === 'undefined') {
    input = {};
  }

  var output = Object.assign({}, input);

  for ( var key in defaults) {
    if (defaults.hasOwnProperty(key) && typeof input[key] === 'undefined') {
      output[key] = defaults[key];
    }
  }

  if (typeof Object.getOwnPropertySymbols === 'function') {
    var symbols = Object.getOwnPropertySymbols(defaults);
    for (var i = 0; i < symbols.length; i++) {
      var symbol = symbols[i];
      if (defaults.propertyIsEnumerable(symbol) && typeof input[key] === 'undefined') {
        output[symbol] = defaults[symbol];
      }
    }
  }

  return output;
};
