import * as Stage from "stage-js";
import type { Joint } from "../";

import { Memo } from "../Memo";

import { ComputedStyle } from "./ComputedStyle";

const math_atan2 = Math.atan2;
const math_sqrt = Math.sqrt;
const math_min = Math.min;

export class JointComponent extends Stage.Node {
  style: ComputedStyle;
  joint: Joint;
  memo = Memo.init();

  constructor(joint: Joint, style: ComputedStyle) {
    super();

    this.style = style;
    this.joint = joint;

    let offsetX = 0;
    let offsetY = 0;
    let offsetA = 0;
    const offsetMemo = Memo.init();

    const texture = Stage.canvas();
    texture.setMemoizer(() => {
      const v1 = joint.getAnchorA();
      const v2 = joint.getAnchorB();
      const token = v1.x + "." + v1.y + "." + v2.x + "." + v2.y;
      return token;
    });

    texture.setDrawer(function () {
      const lineWidth = style.lineWidth;
      const stroke = style.stroke;
      const fill = style.fill;

      const ctx = this.getContext();
      const ratio = this.getDevicePixelRatio();
      const lw = lineWidth / ratio;

      const v1 = joint.getAnchorA();
      const v2 = joint.getAnchorB();

      const dx = v2.x - v1.x;
      const dy = v2.y - v1.y;

      const length = math_sqrt(dx * dx + dy * dy);

      this.setSize(length + lw, lw, ratio);
      this.setPadding(-lw / 2);

      const minX = math_min(v1.x, v2.x);
      const minY = math_min(v1.y, v2.y);

      offsetX = minX;
      offsetY = minY;
      offsetA = math_atan2(dy, dx);

      ctx.scale(ratio, ratio);
      ctx.beginPath();
      ctx.moveTo(lw / 2, lw / 2);
      ctx.lineTo(lw / 2 + length, lw / 2);

      ctx.lineCap = "round";
      ctx.lineWidth = lw;
      ctx.strokeStyle = stroke ?? "";
      ctx.stroke();
    });

    const sprite = Stage.sprite(texture);
    sprite.tick(() => {
      if (offsetMemo.update(offsetX, offsetY, offsetA)) {
        sprite.offset(offsetX, offsetY);
        sprite.rotate(offsetA);
      }
    });
    this.append(sprite);
  }
}
