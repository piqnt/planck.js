export const now = function(): number {
  return Date.now();
};

export const diff = function(time: number): number {
  return Date.now() - time;
};

export default {
  now,
  diff,
};
