#version 300 es
precision highp float;

in vec4 f_color;
out vec4 fragColor;

void main() {
  fragColor = f_color;
}
