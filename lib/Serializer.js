var World = require('./World');
const { parse, stringify } = require('flatted/cjs');

exports.toJson = function(world) {
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

exports.fromJson = function(string) {
  var dump = parse(string);
  var world = World._deserialize(dump);
  return world;
};
