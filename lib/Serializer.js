var World = require('./World');

exports.toJson = function(world, stringify) {
  stringify = stringify || JSON.stringify;
  var dump = world._serialize();
  var string = stringify(dump, function(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (typeof value._serialize === 'function') {
        value = value._serialize();
      }
    }
    return value;
  }, '  ');
  return string;
};

exports.fromJson = function(string, parse) {
  parse = parse || JSON.parse;
  var dump = parse(string);
  var world = World._deserialize(dump);
  return world;
};
