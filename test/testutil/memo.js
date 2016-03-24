module.exports = function(create) {
  var memo = {};
  function fn(key) {
    if (Array.isArray(key)) {
      return list(key);
    } else {
      return key in memo ? get(key) : neo(key);
    }
  }
  function neo(id) {
    return memo[id] = create(id);
  }
  function get(id) {
    return memo[id];
  }
  function list(ids) {
    if (Array.isArray(ids)) {
      return ids.map(function(id) {
        return memo[id];
      });
    }
  }
  return fn;
};
