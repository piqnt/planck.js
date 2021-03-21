var _DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
var _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

export const now = function() {
  return Date.now();
};

export const diff = function(time) {
  return Date.now() - time;
};

export default {
  now,
  diff,
}
