#version 300 es
precision highp float;

uniform sampler2D uVertexTex;
// highp - fragment shaders default int to mediump, so this must be explicit on both sides to
// avoid a precision-mismatch link error (see solidPolygon.vert)
uniform highp int uVertexTexWidth;

in vec2 f_position;
flat in highp int f_vertexOffset;
flat in highp int f_vertexCount;
in vec2 f_center;
in float f_invScale;
in float f_radius;
in float f_thickness;
in vec4 f_color;
in vec4 f_fillColor;

out vec4 fragColor;

#include "./blendColors.glsl"

float cross2d(in vec2 v1, in vec2 v2) {
  return v1.x * v2.y - v1.y * v2.x;
}

// Fetches vertex `index`, shifted/scaled into the same 2x2-quad space f_position is in (see
// solidPolygon.vert's f_center/f_invScale)
vec2 fetchVertex(in int index, in vec2 center, in float invScale) {
  vec2 raw = texelFetch(uVertexTex, ivec2(index % uVertexTexWidth, index / uVertexTexWidth), 0).rg;
  return invScale * (raw - center);
}

// Signed distance function for convex polygon. Vertices live in a shared data texture (indexed
// [offset, offset+count)) rather than a fixed-size array, so a polygon can have as many vertices
// as src/constants.ts's MAX_POLYGON_VERTICES allows (raised e.g. by setMaxPolygonVertices) instead
// of a hardcoded cap.
float sdConvexPolygon(in vec2 p, in int offset, in int count, in vec2 center, in float invScale) {
  vec2 v0 = fetchVertex(offset, center, invScale);
  float d = dot(p - v0, p - v0);

  // Consider query point inside to start
  float side = -1.0;
  vec2 vj = fetchVertex(offset + count - 1, center, invScale);
  for (int i = 0; i < count; ++i) {
    vec2 vi = fetchVertex(offset + i, center, invScale);
    vec2 e = vi - vj;
    vec2 w = p - vj;
    float we = dot(w, e);
    vec2 b = w - e * clamp(we / dot(e, e), 0.0, 1.0);
    float bb = dot(b, b);

    if (bb < d) {
      d = bb;
    }

    // If the query point is outside any edge then it is outside the entire polygon.
    // This depends on the CCW winding order of points.
    float s = cross2d(w, e);
    if (s >= 0.0) {
      side = 1.0;
    }

    vj = vi;
  }

  return side * sqrt(d);
}

void main() {
  vec4 borderColor = f_color;
  vec4 fillColor = f_fillColor;

  float dw = sdConvexPolygon(f_position, f_vertexOffset, f_vertexCount, f_center, f_invScale);
  float d = abs(dw - f_radius);

  vec4 back = vec4(fillColor.rgb, fillColor.a * smoothstep(f_radius + f_thickness, f_radius, dw));
  vec4 front = vec4(borderColor.rgb, smoothstep(f_thickness, 0.0, d));

  fragColor = blend_colors(front, back);
}
