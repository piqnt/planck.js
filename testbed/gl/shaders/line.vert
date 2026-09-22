#version 300 es
uniform mat4 projectionMatrix;

layout(location = 0) in vec2 v_position;
layout(location = 1) in vec4 v_color;

out vec4 f_color;

void main() {
  f_color = v_color;
  gl_Position = projectionMatrix * vec4(v_position, 0.0, 1.0);
}
