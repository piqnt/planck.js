#version 300 es
precision highp float;

in vec4 f_color;
out vec4 fragColor;

void main() {
  // a round dot: fade the outer 10% of the point's square, discard past its circle
  float dist = length(gl_PointCoord - vec2(0.5)) * 2.0;
  float alpha = 1.0 - smoothstep(0.9, 1.0, dist);
  if (alpha <= 0.0) discard;
  fragColor = vec4(f_color.rgb, f_color.a * alpha);
}
