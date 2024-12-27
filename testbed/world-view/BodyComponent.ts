import * as Stage from "stage-js";
import type { Body } from "../";
import { Memo } from "../Memo";

export class BodyComponent extends Stage.Sprite {
  body: Body;

  constructor(body: Body) {
    super();
    this.body = body;
    this.tick(this.handleTick, false);
  }

  __memo = Memo.init();

  handleTick = () => {
    if (!this.body) {
      return;
    }
    const p = this.body.getPosition();
    const x = p.x;
    const y = p.y;
    const a = this.body.getAngle();
    if (!this.__memo.update(x, y, a)) {
      return true;
    }
    this.offset(x, y);
    this.rotate(a);
  };
}
