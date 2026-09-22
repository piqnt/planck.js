#version 300 es
uniform mat4 projectionMatrix;
uniform float pixelScale;

layout(location = 0) in vec2 v_localPosition;
layout(location = 1) in vec4 v_instanceTransform;
layout(location = 2) in float v_instanceRadius;
layout(location = 3) in vec4 v_instanceColor;
layout(location = 4) in vec4 v_instanceFillColor;

out vec2 f_position;
out float f_radius;
out float f_thickness;
out vec4 f_color;
out vec4 f_fillColor;

void main() {
  f_color = v_instanceColor;
  f_fillColor = v_instanceFillColor;
  float radius = v_instanceRadius;
  // 3 screen pixels of stroke, in world units
  float thicknessWorld = 3.0 / pixelScale;

  // The quad must reach radius + thicknessWorld, not just radius: the stroke's anti-aliasing
  // band extends slightly past the circle boundary (see the fragment shader's back/front
  // smoothstep upper bounds), and at the 4 axis-aligned directions the quad boundary sits
  // exactly at the circle radius with zero slack - without this margin, that band (and the
  // tick-mark's end cap, which sits at exactly radius along +X) gets clipped there.
  float scale = radius + thicknessWorld;

  f_position = v_localPosition;
  f_radius = radius / scale;
  f_thickness = thicknessWorld / scale;

  float x = v_instanceTransform.x;
  float y = v_instanceTransform.y;
  float c = v_instanceTransform.z;
  float s = v_instanceTransform.w;
  vec2 p = vec2(scale * v_localPosition.x, scale * v_localPosition.y);
  p = vec2((c * p.x - s * p.y) + x, (s * p.x + c * p.y) + y);
  gl_Position = projectionMatrix * vec4(p, 0.0, 1.0);
}
