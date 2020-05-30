var World = require('../World');
var Body = require('../Body');
var Joint = require('../Joint');
var Shape = require('../Shape');

var SID = 0;

var CLASSES = {
  'World': World,
  'Body': Body,
  'Joint': Joint,
};

function Document(world) {
  this.world = world;
}

Document.prototype._serialize = function() {
  return {
    world: this.world,
  };
};

Document._deserialize = function(data, context, restore) {
  if (!data) {
    return new Document();
  }
  var doc = new Document(restore(World, data.world));
  return doc;
};


exports.toJson = function(world, stringify) {
  stringify = stringify || JSON.stringify;
  var flat = [];
  var doc = new Document(world);
  var queue = [doc];
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
      if (typeof value !== 'object' || value === null) {
        return value;
      }
      if (typeof value._serialize !== 'function') {
        return value;
      }
      if (value === obj) {
        value = value._serialize();
      } else if (value instanceof Body) {
        value = store(value, 'Body');
      } else if (value instanceof Joint) {
        value = store(value, 'Joint');
      } else if (value instanceof World) {
        value = store(value, 'World');
      } else {
        value = value._serialize();
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
  var doc = Document._deserialize(dump[0], null, restore);
  return doc.world;
};
