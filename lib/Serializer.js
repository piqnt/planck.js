exports.toJson = function(world) {
  return JSON.stringify(world.dump(), function(key, value) {
    if (typeof value === 'object') {
      if (value !== null) {
        if (typeof value.dump === 'function') {
          value = value.dump();
        }
      }
    }
    return value;
  }, '  ');
};

exports.fromJson = function(string) {
  return World.load(JSON.parse(string));
};
