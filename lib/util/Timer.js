module.exports.now = function() {
  return Date.now();
}

module.exports.diff = function(time) {
  return Date.now() - time;
}
