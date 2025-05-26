/** @internal */
export const options = function <T>(input: T, defaults: object): T {
  if (input === null || typeof input === "undefined") {
    // tslint:disable-next-line:no-object-literal-type-assertion
    input = {} as T;
  }

  const output = { ...input };

  // tslint:disable-next-line:no-for-in
  for (const key in defaults) {
    if (defaults.hasOwnProperty(key) && typeof input[key] === "undefined") {
      output[key] = defaults[key];
    }
  }

  if (typeof Object.getOwnPropertySymbols === "function") {
    const symbols = Object.getOwnPropertySymbols(defaults);
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      if (defaults.propertyIsEnumerable(symbol) && typeof input[symbol] === "undefined") {
        output[symbol] = defaults[symbol];
      }
    }
  }

  return output;
};
