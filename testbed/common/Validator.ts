export const isValidNumber = (value: number) => {
  return typeof value === "number" && !isNaN(value) && isFinite(value);
};

export const isValidVec2 = (vec: { x: number; y: number }) => {
  return vec && isValidNumber(vec.x) && isValidNumber(vec.y);
};
