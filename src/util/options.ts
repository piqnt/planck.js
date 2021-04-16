export default function(input, defaults) {
  if (input === null || typeof input === 'undefined') {
    input = {};
  }

  const output = {...input};

  // tslint:disable-next-line:no-for-in
  for (const key in defaults) {
    if (defaults.hasOwnProperty(key) && typeof input[key] === 'undefined') {
      output[key] = defaults[key];
    }
  }

  if (typeof Object.getOwnPropertySymbols === 'function') {
    const symbols = Object.getOwnPropertySymbols(defaults);
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      if (defaults.propertyIsEnumerable(symbol) && typeof input[symbol] === 'undefined') {
        output[symbol] = defaults[symbol];
      }
    }
  }

  return output;
}
