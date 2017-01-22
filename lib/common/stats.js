exports.toString = function(delimiter) {
  delimiter = typeof delimiter === 'string' ? delimiter : '\n';
  var string = "";
  for (var name in stats) {
    string += name + ': ' + stats[name] + delimiter;
  }
  return string;
};