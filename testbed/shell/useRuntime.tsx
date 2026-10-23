import { runtime } from "planck/testbed";

export type EmitFunction = (event: string, payload?: unknown) => void;

/** the running testbed's context and emit, for the shell's components */
export function useMiddleware<T>(): { context: T | null; emit: EmitFunction } {
  const ref = runtime.value;
  return ref ? { context: ref.context as unknown as T, emit: ref.emit } : { context: null as T, emit: () => {} };
}
