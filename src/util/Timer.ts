/** @internal */
export const now = function (): number {
  return Date.now();
};

/** @internal */
export const diff = function (time: number): number {
  return Date.now() - time;
};

/** @internal */
export default {
  now,
  diff,
};
