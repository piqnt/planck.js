import { World } from "../";

export interface SerializerDef<T = World> {
  rootClass?: {
    new(...args: any[]): T,
  };

  preSerialize?: (obj: object | any[]) => any;
  postSerialize?: (data: any, obj: any) => any;

  preDeserialize?: (data: any) => any;
  postDeserialize?: (obj: any, data: any) => any;
}

export class Serializer<T> {
  constructor(opts?: SerializerDef<T>)

  toJson(root: T): any[]
  fromJson(json: any[]): T

  static toJson(root: World): any[]
  static fromJson(json: any[]): World
}