if (typeof DEBUG === 'undefined') var DEBUG = false;
if (typeof ASSERT === 'undefined') var ASSERT = false;

module.exports.now = function() {
  return Date.now();
}

module.exports.diff = function(time) {
  return Date.now() - time;
}
