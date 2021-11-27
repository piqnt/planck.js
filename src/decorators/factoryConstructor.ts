/**
 * Adds a factory constructor by transforming a class
 * ```
 * class A {
 *   constructor(param: number) {
 *     // ...
 *   }
 * }
 * ```
 * into
 * ```
 * class A {
 *   constructor(param: number) {
 *     if(!(this instaceof A)) {
 *       return new A(param);
 *     }
 *     // ...
 *   }
 * }
 * ```
 * **Note**: Only supported when `target` is ES5 or lower.
 */
export default function factoryConstructor(target: Function) { }
