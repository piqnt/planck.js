#version 300 es
precision highp float;

in vec2 f_position;
in float f_radius;
in float f_thickness;
in vec4 f_color;
in vec4 f_fillColor;

out vec4 fragColor;

#include "./blendColors.glsl"

void main() {
  float radius = f_radius;

  // distance to axis line segment (rotation tick mark)
  vec2 e = vec2(radius, 0.0);
  vec2 w = f_position;
  float we = dot(w, e);
  vec2 b = w - e * clamp(we / dot(e, e), 0.0, 1.0);
  float da = length(b);

  // distance to circle
  float dw = length(w);
  float dc = abs(dw - radius);

  // union of circle and axis
  float d = min(da, dc);

  vec4 borderColor = f_color;
  vec4 fillColor = f_fillColor;

  vec4 back = vec4(fillColor.rgb, fillColor.a * smoothstep(radius + f_thickness, radius, dw));
  vec4 front = vec4(borderColor.rgb, smoothstep(f_thickness, 0.0, d));

  fragColor = blend_colors(front, back);
}
