DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

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