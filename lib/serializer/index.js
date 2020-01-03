var World = require('../World');
var Body = require('../Body');
var Joint = require('../Joint');
var Shape = require('../Shape');

var SID = 0;

var CLASSES = {
  'Body': Body,
  'Joint': Joint,
};

exports.toJson = function(world, stringify) {
  stringify = stringify || JSON.stringify;
  var flat = [];
  var queue = [world];
  var map = {};

  var store = function(value, cls) {
    value.__sid = value.__sid || ++SID;
    if (map[value.__sid]) {
      return map[value.__sid];
    }
    queue.push(value);
    var index = flat.length + queue.length;
    var ref = {
      'refIndex': index,
      'refType': cls
    };
    return map[value.__sid] = ref;
  };

  while (queue.length) {
    var obj = queue.shift();
    var str = stringify(obj, function(key, value) {
      if (typeof value === 'object' && value !== null) {
        if (typeof value._serialize === 'function') {
          if (value !== obj && value instanceof Body) {
            value = store(value, 'Body');
          } else if (value !== obj && value instanceof Joint) {
            value = store(value, 'Joint');
          } else {
            value = value._serialize();
          }
        }
      }
      return value;
    }, '  ');
    flat.push(str);
  }

  var result = '[' + flat.join(',') + ']';
  return result;
};

exports.fromJson = function(string, parse) {
  parse = parse || JSON.parse;
  var dump = parse(string);
  var map = {};
  function restore(cls, ref, ctx) {
    if (!ref.refIndex) {
      return cls && cls._deserialize && cls._deserialize(ref, ctx, restore);
    }
    var index = ref.refIndex;
    cls = CLASSES[ref.refType] || cls;
    if (map[index]) {
      return map[index];
    }
    var data = dump[index];
    return map[index] = cls._deserialize(data, ctx, restore);
  }
  var world = World._deserialize(dump[0], null, restore);
  return world;
};
