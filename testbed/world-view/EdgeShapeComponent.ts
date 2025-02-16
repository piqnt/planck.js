import * as Stage from "stage-js";
import type { EdgeShape } from "../";

import { ComputedStyle } from "./ComputedStyle";
import { Memo } from "../Memo";

const math_atan2 = Math.atan2;
const math_sqrt = Math.sqrt;
const math_min = Math.min;

export class EdgeShapeComponent extends Stage.Sprite {
  style: ComputedStyle;
  shape: EdgeShape;

  textureOffset = { x: 0, y: 0, a: 0 };

  constructor(shape: EdgeShape, style: ComputedStyle) {
    super();

    this.style = style;
    this.shape = shape;

    const textureOffset = this.textureOffset;

    const texture = Stage.canvas();
    texture.setMemoizer(() => {
      let key = "";

      const v1 = shape.m_vertex1;
      const v2 = shape.m_vertex2;
      key += v1?.x + "," + v1?.y + ";";
      key += v2?.x + "," + v2?.y + ";";

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

      const v1 = shape.m_vertex1;
      const v2 = shape.m_vertex2;

      const dx = v2.x - v1.x;
      const dy = v2.y - v1.y;

      const length = math_sqrt(dx * dx + dy * dy);

      this.setSize(length + lw, lw, ratio);
      this.setPadding(-lw / 2);

      const minX = math_min(v1.x, v2.x);
      const minY = math_min(v1.y, v2.y);

      textureOffset.x = minX;
      textureOffset.y = minY;
      textureOffset.a = math_atan2(dy, dx);

      ctx.scale(ratio, ratio);
      ctx.beginPath();
      ctx.moveTo(lw / 2, lw / 2);
      ctx.lineTo(lw / 2 + length, lw / 2);

      ctx.lineCap = "round";
      ctx.lineWidth = lw;
      ctx.strokeStyle = stroke ?? "";
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
