export default {
  toString(newline) {
    newline = typeof newline === 'string' ? newline : '\n';
    let string = "";
    for (let name in this) {
      if (typeof this[name] !== 'function' && typeof this[name] !== 'object') {
        string += name + ': ' + this[name] + newline;
      }
    }
    return string;
  }
};
