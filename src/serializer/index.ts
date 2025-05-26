import { World } from "../dynamics/World";
import { Body } from "../dynamics/Body";
import { Joint } from "../dynamics/Joint";
import { Fixture } from "../dynamics/Fixture";
import { Shape } from "../collision/Shape";
import { Vec2 } from "../common/Vec2";
import { Vec3 } from "../common/Vec3";
import { ChainShape } from "../collision/shape/ChainShape";
// import { BoxShape } from "../collision/shape/BoxShape";
import { EdgeShape } from "../collision/shape/EdgeShape";
import { PolygonShape } from "../collision/shape/PolygonShape";
import { CircleShape } from "../collision/shape/CircleShape";
import { DistanceJoint } from "../dynamics/joint/DistanceJoint";
import { FrictionJoint } from "../dynamics/joint/FrictionJoint";
import { GearJoint } from "../dynamics/joint/GearJoint";
import { MotorJoint } from "../dynamics/joint/MotorJoint";
import { MouseJoint } from "../dynamics/joint/MouseJoint";
import { PrismaticJoint } from "../dynamics/joint/PrismaticJoint";
import { PulleyJoint } from "../dynamics/joint/PulleyJoint";
import { RevoluteJoint } from "../dynamics/joint/RevoluteJoint";
import { RopeJoint } from "../dynamics/joint/RopeJoint";
import { WeldJoint } from "../dynamics/joint/WeldJoint";
import { WheelJoint } from "../dynamics/joint/WheelJoint";

let SID = 0;

// Classes to be serialized as reference objects
const SERIALIZE_REF_TYPES = {
  "World": World,
  "Body": Body,
  "Joint": Joint,
  "Fixture": Fixture,
  "Shape": Shape,
};

// For deserializing reference objects by reference type
const DESERIALIZE_BY_REF_TYPE = {
  "Vec2": Vec2,
  "Vec3": Vec3,
  "World": World,
  "Body": Body,
  "Joint": Joint,
  "Fixture": Fixture,
  "Shape": Shape,
};

// For deserializing data objects by type field
const DESERIALIZE_BY_TYPE_FIELD = {
  [Body.STATIC]: Body,
  [Body.DYNAMIC]: Body,
  [Body.KINEMATIC]: Body,
  [ChainShape.TYPE]: ChainShape,
  // [BoxShape.TYPE]: BoxShape,
  [PolygonShape.TYPE]: PolygonShape,
  [EdgeShape.TYPE]: EdgeShape,
  [CircleShape.TYPE]: CircleShape,
  [DistanceJoint.TYPE]: DistanceJoint,
  [FrictionJoint.TYPE]: FrictionJoint,
  [GearJoint.TYPE]: GearJoint,
  [MotorJoint.TYPE]: MotorJoint,
  [MouseJoint.TYPE]: MouseJoint,
  [PrismaticJoint.TYPE]: PrismaticJoint,
  [PulleyJoint.TYPE]: PulleyJoint,
  [RevoluteJoint.TYPE]: RevoluteJoint,
  [RopeJoint.TYPE]: RopeJoint,
  [WeldJoint.TYPE]: WeldJoint,
  [WheelJoint.TYPE]: WheelJoint,
};

// dummy types
type DataType = any;
type ObjectType = any;
type ClassName = any;

type SerializedType = object[];

type RefType = {
  refIndex: number;
  refType: string;
};

type SerializerOptions = {
  rootClass: ClassName;
  preSerialize?: (obj: ObjectType) => DataType;
  postSerialize?: (data: DataType, obj: any) => DataType;
  preDeserialize?: (data: DataType) => DataType;
  postDeserialize?: (obj: ObjectType, data: DataType) => ObjectType;
};

const DEFAULT_OPTIONS: SerializerOptions = {
  rootClass: World,
  preSerialize: function (obj) {
    return obj;
  },
  postSerialize: function (data, obj) {
    return data;
  },
  preDeserialize: function (data: DataType) {
    return data;
  },
  postDeserialize: function (obj, data) {
    return obj;
  },
};

type DeserializeChildCallback = (classHint: any, obj: any, context: any) => any;
type ClassDeserializerMethod = (data: any, context: any, deserialize: DeserializeChildCallback) => any;

export class Serializer<T> {
  private options: SerializerOptions;
  constructor(options: SerializerOptions) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
  }

  toJson = (root: T): SerializedType => {
    const preSerialize = this.options.preSerialize;
    const postSerialize = this.options.postSerialize;
    const json = [];

    // Breadth-first ref serialization queue
    const refQueue = [root];

    const refMemoById: Record<number, RefType> = {};

    function addToRefQueue(value: any, typeName: string) {
      value.__sid = value.__sid || ++SID;
      if (!refMemoById[value.__sid]) {
        refQueue.push(value);
        const index = json.length + refQueue.length;
        const ref = {
          refIndex: index,
          refType: typeName,
        };
        refMemoById[value.__sid] = ref;
      }
      return refMemoById[value.__sid];
    }

    function serializeWithHooks(obj: ObjectType) {
      obj = preSerialize(obj);
      let data = obj._serialize();
      data = postSerialize(data, obj);
      return data;
    }

    // traverse the object graph
    // ref objects are pushed into the queue
    // other objects are serialize in-place
    function traverse(value: any, noRefType = false) {
      if (typeof value !== "object" || value === null) {
        return value;
      }
      // object with _serialize function
      if (typeof value._serialize === "function") {
        if (!noRefType) {
          for (const typeName in SERIALIZE_REF_TYPES) {
            if (value instanceof SERIALIZE_REF_TYPES[typeName]) {
              return addToRefQueue(value, typeName);
            }
          }
        }
        // object with _serialize function
        value = serializeWithHooks(value);
      }
      // recursive for arrays any objects
      if (Array.isArray(value)) {
        const newValue = [];
        for (let key = 0; key < value.length; key++) {
          newValue[key] = traverse(value[key]);
        }
        value = newValue;
      } else {
        const newValue = {};
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
            newValue[key] = traverse(value[key]);
          }
        }
        value = newValue;
      }
      return value;
    }

    while (refQueue.length) {
      const obj = refQueue.shift();
      const str = traverse(obj, true);
      json.push(str);
    }

    return json;
  };

  fromJson = (json: SerializedType): T => {
    const preDeserialize = this.options.preDeserialize;
    const postDeserialize = this.options.postDeserialize;
    const rootClass = this.options.rootClass;

    const deserializedRefMemoByIndex: Record<number, any> = {};

    function deserializeWithHooks(classHint: ClassName, data: DataType, context: any): ObjectType {
      if (!classHint || !classHint._deserialize) {
        classHint = DESERIALIZE_BY_TYPE_FIELD[data.type];
      }
      const deserializer = classHint && classHint._deserialize;
      if (!deserializer) {
        return;
      }
      data = preDeserialize(data);
      const classDeserializeFn = classHint._deserialize as ClassDeserializerMethod;
      let obj = classDeserializeFn(data, context, deserializeChild);
      obj = postDeserialize(obj, data);
      return obj;
    }

    /**
     * Recursive callback function to  deserialize a child data object or reference object.
     *
     * @param classHint suggested class to deserialize obj to
     * @param dataOrRef data or reference object
     * @param context for example world when deserializing bodies and joints
     */
    function deserializeChild(classHint: ClassName, dataOrRef: DataType | RefType, context: any) {
      const isRefObject = dataOrRef.refIndex && dataOrRef.refType;
      if (!isRefObject) {
        return deserializeWithHooks(classHint, dataOrRef, context);
      }
      const ref = dataOrRef as RefType;
      if (DESERIALIZE_BY_REF_TYPE[ref.refType]) {
        classHint = DESERIALIZE_BY_REF_TYPE[ref.refType];
      }
      const refIndex = ref.refIndex;
      if (!deserializedRefMemoByIndex[refIndex]) {
        const data = json[refIndex];
        const obj = deserializeWithHooks(classHint, data, context);
        deserializedRefMemoByIndex[refIndex] = obj;
      }
      return deserializedRefMemoByIndex[refIndex];
    }

    const root = deserializeWithHooks(rootClass, json[0], null);

    return root;
  };

  static toJson: (root: World) => SerializedType;
  static fromJson: (json: SerializedType) => World;
}

const worldSerializer = new Serializer<World>({
  rootClass: World,
});

Serializer.fromJson = worldSerializer.fromJson;
Serializer.toJson = worldSerializer.toJson;
