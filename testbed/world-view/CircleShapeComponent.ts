import * as Stage from "stage-js";
import type { CircleShape } from "../";

import { ComputedStyle } from "./ComputedStyle";
import { Memo } from "../Memo";

const math_PI = Math.PI;

export class CircleShapeComponent extends Stage.Sprite {
  style: ComputedStyle;
  shape: CircleShape;

  textureOffset = { x: 0, y: 0, a: 0 };

  constructor(shape: CircleShape, style: ComputedStyle) {
    super();

    this.style = style;
    this.shape = shape;

    const textureOffset = this.textureOffset;

    const texture = Stage.canvas();
    texture.setMemoizer(() => {
      let key = "";

      const v = shape.getCenter();
      key += v.x + "," + v.y + ";";
      key += shape.getRadius() + ";";

      key += style.lineWidth + ";";
      key += style.stroke + ";";
      key += style.fill + ";";

      return key;
    });
    texture.setDrawer(function () {
      const lineWidth = style.lineWidth;
      const stroke = style.stroke;
      const fill = style.fill;

      const ctx = this.getContext();
      const ratio = this.getDevicePixelRatio();
      const lw = lineWidth / ratio;

      const r = shape.m_radius;

      textureOffset.x = shape.m_p.x - r;
      textureOffset.y = shape.m_p.y - r;

      this.setSize(r * 2 + lw, r * 2 + lw, ratio);
      this.setPadding(-lw / 2);

      ctx.scale(ratio, ratio);
      ctx.arc(r + lw / 2, r + lw / 2, r, 0, 2 * math_PI);
      if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
      }
      ctx.lineTo(r + lw / 2, r + lw / 2);
      ctx.lineWidth = lw;
      ctx.strokeStyle = stroke ?? "";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    });

    this.texture(texture);

    this.tick(this.handleTick);
  }

  __memo = Memo.init();

  handleTick = () => {
    const x = this.textureOffset.x;
    const y = this.textureOffset.y;
    const a = this.textureOffset.a;
    if (!this.__memo.update(x, y, a)) {
      return true;
    }
    this.offset(x, y);
    this.rotate(a);
  };
}
