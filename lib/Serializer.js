var World = require('./World');

exports.toJson = function(world) {
  return JSON.stringify(world._serialize(), function(key, value) {
    if (typeof value === 'object') {
      if (value !== null) {
        if (typeof value._serialize === 'function') {
          value = value._serialize();
        }
      }
    }
    return value;
  }, '  ');
};

exports.fromJson = function(string) {
  return World._deserialize(JSON.parse(string));
};
