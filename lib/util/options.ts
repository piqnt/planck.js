export default function(input, defaults) {
  if (input === null || typeof input === 'undefined') {
    input = {};
  }

  const output = Object.assign({}, input);

  for (var key in defaults) {
    if (defaults.hasOwnProperty(key) && typeof input[key] === 'undefined') {
      output[key] = defaults[key];
    }
  }

  if (typeof Object.getOwnPropertySymbols === 'function') {
    const symbols = Object.getOwnPropertySymbols(defaults);
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      if (defaults.propertyIsEnumerable(symbol) && typeof input[key] === 'undefined') {
        output[symbol] = defaults[symbol];
      }
    }
  }

  return output;
}
