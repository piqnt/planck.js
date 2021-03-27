export const now = function() {
  return Date.now();
};

export const diff = function(time) {
  return Date.now() - time;
};

export default {
  now,
  diff,
};
