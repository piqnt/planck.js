var _DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
var _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

module.exports.now = function() {
  return Date.now();
}

module.exports.diff = function(time) {
  return Date.now() - time;
}
