/** @hidden */
export const stats = {
  gjkCalls: 0,
  gjkIters: 0,
  gjkMaxIters: 0,

  toiTime: 0,
  toiMaxTime: 0,
  toiCalls: 0,
  toiIters: 0,
  toiMaxIters: 0,
  toiRootIters: 0,
  toiMaxRootIters: 0,

  toString(newline?: string): string {
    newline = typeof newline === "string" ? newline : "\n";
    let string = "";
    // tslint:disable-next-line:no-for-in
    for (const name in this) {
      if (typeof this[name] !== "function" && typeof this[name] !== "object") {
        string += name + ": " + this[name] + newline;
      }
    }
    return string;
  },
};
