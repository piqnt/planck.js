if (typeof DEBUG === 'undefined') var DEBUG = false;
if (typeof ASSERT === 'undefined') var ASSERT = false;

exports.toString = function(newline) {
  newline = typeof newline === 'string' ? newline : '\n';
  var string = "";
  for (var name in this) {
    if (typeof this[name] !== 'function' && typeof this[name] !== 'object') {
      string += name + ': ' + this[name] + newline;
    }
  }
  return string;
};