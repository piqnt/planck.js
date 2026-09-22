#version 300 es
precision highp float;

in vec2 f_position;
in float f_length;
in float f_radius;
in float f_thickness;
in vec4 f_color;
in vec4 f_fillColor;

out vec4 fragColor;

#include "./blendColors.glsl"

void main() {
  float radius = f_radius;

  vec4 borderColor = f_color;
  vec4 fillColor = f_fillColor;

  vec2 v1 = vec2(-0.5 * f_length, 0.0);
  vec2 v2 = vec2(0.5 * f_length, 0.0);

  // distance to line segment
  vec2 e = v2 - v1;
  vec2 w = f_position - v1;
  float we = dot(w, e);
  vec2 b = w - e * clamp(we / dot(e, e), 0.0, 1.0);
  float dw = length(b);

  // SDF union of capsule and line segment
  float d = min(dw, abs(dw - radius));

  vec4 back = vec4(fillColor.rgb, fillColor.a * smoothstep(radius + f_thickness, radius, dw));
  vec4 front = vec4(borderColor.rgb, smoothstep(f_thickness, 0.0, d));

  fragColor = blend_colors(front, back);
}
