import * as Stage from "stage-js";
import type { PulleyJoint } from "../";

import { Memo } from "../Memo";

import { ComputedStyle } from "./ComputedStyle";

const math_max = Math.max;
const math_min = Math.min;

export class PulleyJointComponent extends Stage.Node {
  style: ComputedStyle;
  joint: PulleyJoint;
  memo = Memo.init();

  constructor(joint: PulleyJoint, style: ComputedStyle) {
    super();

    this.style = style;
    this.joint = joint;

    const vertices = [];

    let offsetX = 0;
    let offsetY = 0;
    const offsetMemo = Memo.init();

    const texture = Stage.canvas();
    texture.setMemoizer(() => {
      const v1 = joint.getAnchorA();
      const v2 = joint.getGroundAnchorA();
      const v3 = joint.getGroundAnchorB();
      const v4 = joint.getAnchorB();
      const token = v1.x + "." + v1.y + "." + v2.x + "." + v2.y + "." + v3.x + "." + v3.y + "." + v4.x + "." + v4.y;
      return token;
    });
    texture.setDrawer(function () {
      const lineWidth = style.lineWidth;
      const stroke = style.stroke;
      const fill = style.fill;

      const ctx = this.getContext();
      const ratio = this.getDevicePixelRatio();
      const lw = lineWidth / ratio;

      vertices[0] = joint.getAnchorA();
      vertices[1] = joint.getGroundAnchorA();
      vertices[2] = joint.getGroundAnchorB();
      vertices[3] = joint.getAnchorB();

      if (!vertices.length) {
        return;
      }

      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (let i = 0; i < vertices.length; ++i) {
        const v = vertices[i];
        minX = math_min(minX, v.x);
        maxX = math_max(maxX, v.x);
        minY = math_min(minY, v.y);
        maxY = math_max(maxY, v.y);
      }

      const width = maxX - minX;
      const height = maxY - minY;

      offsetX = minX;
      offsetY = minY;

      this.setSize(width + lw, height + lw, ratio);
      this.setPadding(-lw / 2);

      ctx.scale(ratio, ratio);
      ctx.beginPath();
      for (let i = 0; i < vertices.length; ++i) {
        const v = vertices[i];
        const x = v.x - minX + lw / 2;
        const y = v.y - minY + lw / 2;
        if (i == 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineCap = "round";
      ctx.lineWidth = lw;
      ctx.strokeStyle = stroke ?? "";
      ctx.stroke();
    });

    const sprite = Stage.sprite(texture);
    sprite.tick(() => {
      if (offsetMemo.update(offsetX, offsetY)) {
        sprite.offset(offsetX, offsetY);
      }
    });
    this.append(sprite);
  }
}
