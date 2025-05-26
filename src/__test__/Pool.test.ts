/* eslint-disable @typescript-eslint/no-unused-expressions */
import { describe, it, expect } from "vitest";

import { Pool } from "../util/Pool";

describe("Pool", function (): void {
  it("Pool", function (): void {
    interface Type {
      busy: boolean;
      disposed: boolean;
      created: boolean;
    }
    const pool = new Pool<Type>({
      create: function (): Type {
        return {
          created: true,
          busy: false,
          disposed: false,
        };
      },
      allocate: function (obj: Type): void {
        obj.busy = true;
      },
      release: function (obj: Type): void {
        obj.busy = false;
      },
      dispose: function (obj: Type): Type {
        obj.disposed = true;
        return;
      },
      max: 1,
    });

    const a = pool.allocate();
    const b = pool.allocate();

    expect(a.created).be.true;
    expect(a.busy).be.true;
    expect(a.disposed).be.false;

    pool.release(a);
    expect(a.busy).be.false;
    expect(a.disposed).be.false;

    pool.release(b);
    expect(b.disposed).be.true;
  });
});
