import { Vec2Value } from "../";
import { isValidVec2 } from "./Validator";

export interface Viewbox {
  start: Vec2Value;
  end: Vec2Value;
}

export interface Camera {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const camera2viewbox = (camera: Camera) => {
  const x = camera.x;
  const y = camera.y;
  const width = camera.width;
  const height = camera.height;
  return {
    start: { x: x - width / 2, y: y - height / 2 },
    end: { x: x + width / 2, y: y + height / 2 },
  };
};

export const viewbox2camera = (camera: Camera, viewbox: Viewbox) => {
  if (!isValidViewbox(viewbox)) {
    console.log("Invalid viewbox!");
    return;
  }
  const end = viewbox.end;
  const start = viewbox.start;
  camera.x = (end.x + start.x) * 0.5;
  camera.y = (end.y + start.y) * 0.5;
  camera.width = Math.abs(end.x - start.x);
  camera.height = Math.abs(end.y - start.y);
};

export const isValidViewbox = (viewbox: Viewbox) => {
  return (
    viewbox &&
    isValidVec2(viewbox.end) &&
    isValidVec2(viewbox.start) &&
    viewbox.end.x > viewbox.start.x &&
    viewbox.end.y > viewbox.start.y
  );
};
