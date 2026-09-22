import { customAlphabet } from "nanoid";

export const generateKey = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 16);

export function getKey(this: unknown, obj: object): string | undefined {
  if (obj && typeof obj["__key"] === "string") {
    return obj["__key"];
  }
}

/**
 * If key is provided always assign it.
 * If key is not provided, and object doesn't have a key generate and assign new key.
 */
export function setKey(this: unknown, obj: object, key?: string): string | undefined {
  if (!obj) return;
  if (typeof key !== "undefined") {
    obj["__key"] = key;
  } else if (!obj["__key"]) {
    obj["__key"] = generateKey();
  }
  return obj["__key"];
}

/**
 * Recursively replace objects with their key.
 */
export function replaceKey(this: unknown, node: any) {
  if (typeof node !== "object" || node === null) {
    return node;
  }

  if (Array.isArray(node)) {
    const result: object[] = [];
    for (let key = 0; key < node.length; key++) {
      result[key] = replaceKey(node[key]);
    }
    return result;
  }

  const key = getKey(node);
  if (key) {
    return key;
  }

  const result = {};
  for (const key in node) {
    if (Object.prototype.hasOwnProperty.call(node, key)) {
      result[key] = replaceKey(node[key]);
    }
  }
  return result;
}
