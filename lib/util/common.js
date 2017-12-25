if (typeof DEBUG === 'undefined') var DEBUG = false;
if (typeof ASSERT === 'undefined') var ASSERT = false;

exports.debug = function() {
  if (!DEBUG) return;
  console.log.apply(console, arguments);
};

exports.assert = function(statement, err, log) {
  if (!ASSERT) return;
  if (statement) return;
  log && console.log(log);
  throw new Error(err);
};