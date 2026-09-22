#version 300 es
uniform mat4 projectionMatrix;
// world units to framebuffer pixels: gl_PointSize is in device pixels
uniform float pointScale;

layout(location = 0) in vec2 v_position;
layout(location = 1) in float v_size;
layout(location = 2) in vec4 v_color;

out vec4 f_color;

void main() {
  f_color = v_color;
  gl_Position = projectionMatrix * vec4(v_position, 0.0, 1.0);
  // never smaller than a pixel, so a zoomed-out cloud still shows
  gl_PointSize = max(v_size * pointScale, 1.0);
}
