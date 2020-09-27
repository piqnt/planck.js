var World = require('../World');
var Body = require('../Body');
var Joint = require('../Joint');
var Shape = require('../Shape');

var SID = 0;

function Serializer(opts) {
  opts = opts || {};

  var stringify = opts.stringify || JSON.stringify;
  var parse = opts.parse || JSON.parse;

  var rootClass = opts.rootClass || World;

  var preSerialize = opts.preSerialize || function (obj) { return obj; };
  var postSerialize = opts.postSerialize || function (data, obj) { return data; };

  var preDeserialize = opts.preDeserialize || function (data) { return data; };
  var postDeserialize = opts.postDeserialize || function (obj, data) { return obj; };

  var refTypes = {
    'World': World,
    'Body': Body,
    'Joint': Joint,
  };

  this.toJson = function (root) {
    var flat = [];
    var queue = [root];
    var refMap = {};

    function storeRef(value, typeName) {
      value.__sid = value.__sid || ++SID;
      if (!refMap[value.__sid]) {
        queue.push(value);
        var index = flat.length + queue.length;
        var ref = {
          refIndex: index,
          refType: typeName
        };
        refMap[value.__sid] = ref;
      }
      return refMap[value.__sid];
    }

    function serialize(obj) {
      obj = preSerialize(obj);
      var data = obj._serialize();
      data = postSerialize(data, obj);
      return data;
    }

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
          return serialize(value);
        }
        for (var typeName in refTypes) {
          if (value instanceof refTypes[typeName]) {
            return storeRef(value, typeName);
          }
        }
        return serialize(value);
      }, '  ');
      flat.push(str);
    }

    var result = '[' + flat.join(',') + ']';
    return result;
  };

  this.fromJson = function (string) {
    var flat = parse(string);
    var refMap = {};

    function deserialize(cls, data, ctx) {
      data = preDeserialize(data);
      var obj = cls._deserialize(data, ctx, restoreRef);
      obj = postDeserialize(obj, data);
      return obj;
    }

    function restoreRef(cls, ref, ctx) {
      if (!ref.refIndex) {
        return cls && cls._deserialize && deserialize(cls, ref, ctx);
      }
      cls = refTypes[ref.refType] || cls;
      var index = ref.refIndex;
      if (!refMap[index]) {
        var data = flat[index];
        var obj = deserialize(cls, data, ctx);
        refMap[index] = obj;
      }
      return refMap[index];
    }

    var root = rootClass._deserialize(flat[0], null, restoreRef);

    return root;
  }
}

module.exports = Serializer;

var serializer = new Serializer();
module.exports.toJson = serializer.toJson;
module.exports.fromJson = serializer.fromJson;
