export class Memo {
  static init() {
    return new Memo();
  }

  private memory: any = [];

  /** Returns true if args are updated. */
  update(...args: any[]) {
    let equal = this.memory.length === args.length;
    for (let i = 0; i < args.length; i++) {
      equal = equal && this.memory[i] === args[i];
      this.memory[i] = args[i];
    }
    this.memory.length = args.length;
    return !equal;
  }

  clear() {
    this.memory.length = 0;
  }
}
