import * as Stage from "stage-js";
import type { ChainShape } from "../";

import { ComputedStyle } from "./ComputedStyle";
import { Memo } from "../Memo";

const math_max = Math.max;
const math_min = Math.min;

export class ChainShapeComponent extends Stage.Sprite {
  style: ComputedStyle;
  shape: ChainShape;

  textureOffset = { x: 0, y: 0, a: 0 };

  constructor(shape: ChainShape, style: ComputedStyle) {
    super();

    this.style = style;
    this.shape = shape;

    const textureOffset = this.textureOffset;

    const texture = Stage.canvas();
    texture.setMemoizer(() => {
      let key = "";

      const vertices = shape.m_vertices;
      for (let i = 0; i < vertices.length; ++i) {
        const v = vertices[i];
        key += v.x + "," + v.y + ";";
      }
      key += shape.isLoop() + ";";

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

      const vertices = shape.m_vertices;

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

      textureOffset.x = minX;
      textureOffset.y = minY;

      this.setSize(maxX - minX + lw, maxY - minY + lw, ratio);
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

      // last vertex of loop is the same as the first, don't need to close the path

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
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
