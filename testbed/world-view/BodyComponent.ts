import { Memo } from "polymatic";
import * as Stage from "stage-js";

import type { Body } from "../";

export class BodyComponent extends Stage.Sprite {
  body: Body;

  constructor(body: Body) {
    super();
    this.body = body;
    this.tick(this.handleTick, false);
  }

  memo = Memo.init(0, 0, 0);
  handleTick = () => {
    if (!this.body) {
      return;
    }
    const p = this.body.getPosition();
    const x = p.x;
    const y = p.y;
    const a = this.body.getAngle();
    if (!this.memo.update(x, y, a)) return true;
    this.offset(x, y);
    this.rotate(a);
  };
}
