#version 300 es
uniform mat4 projectionMatrix;
uniform float pixelScale;

layout(location = 0) in vec2 v_localPosition;
layout(location = 1) in vec4 v_instanceTransform;
layout(location = 2) in float v_instanceRadius;
layout(location = 3) in float v_instanceLength;
layout(location = 4) in vec4 v_instanceColor;
layout(location = 5) in vec4 v_instanceFillColor;

out vec2 f_position;
out float f_length;
out float f_radius;
out float f_thickness;
out vec4 f_color;
out vec4 f_fillColor;

void main() {
  f_position = v_localPosition;
  f_color = v_instanceColor;
  f_fillColor = v_instanceFillColor;

  float radius = v_instanceRadius;
  float capsuleLength = v_instanceLength;
  float thicknessWorld = 3.0 / pixelScale;

  // scale quad large enough to hold the capsule AND the stroke's anti-aliasing margin beyond it
  // (see solidCircle.vert for why the margin matters: zero slack at the quad edge clips the ring)
  float scale = radius + 0.5 * capsuleLength + thicknessWorld;

  // quad range of [-1, 1] implies normalized radius and length
  f_length = capsuleLength / scale;
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
