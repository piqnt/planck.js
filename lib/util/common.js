exports.debug = function() {
  // console.log.apply(console, arguments);
};

exports.assert = function(statement, err, log) {
  if (statement) return;
  log && console.log(log);
  throw new Error(err);
};