// tslint:disable:typedef
import World from '../dynamics/World';
import Body from '../dynamics/Body';
import Joint from '../dynamics/Joint';
import Fixture from '../dynamics/Fixture';
import Shape from '../collision/Shape';
import Vec2 from '../common/Vec2';
import Vec3 from '../common/Vec3';

let SID = 0;

function Serializer(opts?) {
  opts = opts || {};

  const rootClass = opts.rootClass || World;

  const preSerialize = opts.preSerialize || function(obj) { return obj; };
  const postSerialize = opts.postSerialize || function(data, obj) { return data; };

  const preDeserialize = opts.preDeserialize || function(data) { return data; };
  const postDeserialize = opts.postDeserialize || function(obj, data) { return obj; };

  // This is used to create ref objects during serialize
  const refTypes = {
    World,
    Body,
    Joint,
    Fixture,
    Shape,
  };

  // This is used by restore to deserialize objects and refs
  const restoreTypes = {
    Vec2,
    Vec3,
    ...refTypes
  };

  this.toJson = function(root) {
    const json = [];

    const queue = [root];
    const refMap = {};

    function storeRef(value, typeName) {
      value.__sid = value.__sid || ++SID;
      if (!refMap[value.__sid]) {
        queue.push(value);
        const index = json.length + queue.length;
        const ref = {
          refIndex: index,
          refType: typeName
        };
        refMap[value.__sid] = ref;
      }
      return refMap[value.__sid];
    }

    function serialize(obj) {
      obj = preSerialize(obj);
      let data = obj._serialize();
      data = postSerialize(data, obj);
      return data;
    }

    function toJson(value, top?) {
      if (typeof value !== 'object' || value === null) {
        return value;
      }
      if (typeof value._serialize === 'function') {
        if (value !== top) {
          // tslint:disable-next-line:no-for-in
          for (const typeName in refTypes) {
            if (value instanceof refTypes[typeName]) {
              return storeRef(value, typeName);
            }
          }
        }
        value = serialize(value);
      }
      if (Array.isArray(value)) {
        const newValue = [];
        for (let key = 0; key < value.length; key++) {
          newValue[key] = toJson(value[key]);
        }
        value = newValue;

      } else {
        const newValue = {};
        // tslint:disable-next-line:no-for-in
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
            newValue[key] = toJson(value[key]);
          }
        }
        value = newValue;
      }
      return value;
    }

    while (queue.length) {
      const obj = queue.shift();
      const str = toJson(obj, obj);
      json.push(str);
    }

    return json;
  };

  this.fromJson = function(json: object) {
    const refMap = {};

    function deserialize(cls, data, ctx) {
      data = preDeserialize(data);
      let obj = cls._deserialize(data, ctx, restoreRef);
      obj = postDeserialize(obj, data);
      return obj;
    }

    function restoreRef(cls, ref, ctx) {
      if (!ref.refIndex) {
        return cls && cls._deserialize && deserialize(cls, ref, ctx);
      }
      cls = restoreTypes[ref.refType] || cls;
      const index = ref.refIndex;
      if (!refMap[index]) {
        const data = json[index];
        const obj = deserialize(cls, data, ctx);
        refMap[index] = obj;
      }
      return refMap[index];
    }

    const root = rootClass._deserialize(json[0], null, restoreRef);

    return root;
  };
}

const serializer = new Serializer();

Serializer.toJson = serializer.toJson;
Serializer.fromJson = serializer.fromJson;

export default Serializer;
