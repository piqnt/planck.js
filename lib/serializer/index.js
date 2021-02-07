var World = require('../World');
var Body = require('../Body');
var Joint = require('../Joint');
var Fixture = require('../Fixture');
var Shape = require('../Shape');
var Vec2 = require('../common/Vec2');
var Vec3 = require('../common/Vec3');

var SID = 0;

function Serializer(opts) {
  opts = opts || {};

  var rootClass = opts.rootClass || World;

  var preSerialize = opts.preSerialize || function (obj) { return obj; };
  var postSerialize = opts.postSerialize || function (data, obj) { return data; };

  var preDeserialize = opts.preDeserialize || function (data) { return data; };
  var postDeserialize = opts.postDeserialize || function (obj, data) { return obj; };

  // This is used to create ref objects during serialize
  var refTypes = {
    'World': World,
    'Body': Body,
    'Joint': Joint,
    'Fixture': Fixture,
    'Shape': Shape,
  };

  // This is used by restore to deserialize objects and refs
  var restoreTypes = Object.assign({
    'Vec2': Vec2,
    'Vec3': Vec3,
  }, refTypes);

  this.toJson = function (root) {
    var json = [];

    var queue = [root];
    var refMap = {};

    function storeRef(value, typeName) {
      value.__sid = value.__sid || ++SID;
      if (!refMap[value.__sid]) {
        queue.push(value);
        var index = json.length + queue.length;
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

    function toJson(value, top) {
      if (typeof value !== 'object' || value === null) {
        return value;
      }
      if (typeof value._serialize === 'function') {
        if (value !== top) {
          for (var typeName in refTypes) {
            if (value instanceof refTypes[typeName]) {
              return storeRef(value, typeName);
            }
          }
        }
        value = serialize(value);
      }
      if (Array.isArray(value)) {
        var newValue = [];
        for (var key = 0; key < value.length; key++) {
          newValue[key] = toJson(value[key]);
        }
        value = newValue;

      } else {
        var newValue = {};
        for (var key in value) {
          if (value.hasOwnProperty(key)) {
            newValue[key] = toJson(value[key]);
          }
        }
        value = newValue;
      }
      return value;
    }

    while (queue.length) {
      var obj = queue.shift();
      var str = toJson(obj, obj);
      json.push(str);
    }

    return json;
  };

  this.fromJson = function (json) {
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
      cls = restoreTypes[ref.refType] || cls;
      var index = ref.refIndex;
      if (!refMap[index]) {
        var data = json[index];
        var obj = deserialize(cls, data, ctx);
        refMap[index] = obj;
      }
      return refMap[index];
    }

    var root = rootClass._deserialize(json[0], null, restoreRef);

    return root;
  }
}

module.exports = Serializer;

var serializer = new Serializer();
module.exports.toJson = serializer.toJson;
module.exports.fromJson = serializer.fromJson;
