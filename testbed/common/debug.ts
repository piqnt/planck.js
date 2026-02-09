import { minimatch } from "minimatch";

function isEnabled(type: string, namespace: string) {
  let exclude: string;
  let include: string;
  let pattern: string;

  try {
    exclude = localStorage.getItem(type + "_exclude");
    include = localStorage.getItem(type + "_include");
    pattern = localStorage.getItem(type);
  } catch (e) {
    // no operation
  }

  try {
    exclude = exclude || sessionStorage.getItem(type + "_exclude");
    include = include || sessionStorage.getItem(type + "_include");
    pattern = pattern || sessionStorage.getItem(type);
  } catch (e) {
    // no operation
  }

  try {
    if (pattern && minimatch(namespace, pattern)) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }

  try {
    if (exclude && namespace.match(exclude)) {
      return false;
    }
  } catch (e) {
    console.log(e);
  }

  try {
    if (include && namespace.match(include)) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }

  return false;
}

/** @internal */
export function debug(namespace: string, filter?: (...any) => boolean) {
  const isDebug = isEnabled("debug", namespace);
  const isTrace = isEnabled("trace", namespace);

  if (!isDebug) {
    return () => {
      // no operation
    };
  }

  return (...args) => {
    if (filter && !filter(...args)) {
      return;
    }
    console.log(namespace, ...args);
    if (isTrace) console.trace();
  };
}

/** @internal */
export function watch<T extends object>(namespace: string, target: T): T {
  const isWatch = isEnabled("watch", namespace);
  const isTrace = isEnabled("trace", namespace);

  if (!isWatch) {
    return target;
  }

  return new Proxy(target, {
    set(obj, prop, value, receiver) {
      console.debug(namespace, ".", prop.toString(), obj[prop], "↬", value);
      if (isTrace) console.trace();
      return Reflect.set(obj, prop, value, receiver);
    },
  });
}
