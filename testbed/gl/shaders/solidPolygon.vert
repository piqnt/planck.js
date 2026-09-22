#version 300 es
uniform mat4 projectionMatrix;
uniform float pixelScale;
// Polygon vertices, packed as vec2s indexed by ivec2(i % uVertexTexWidth, i / uVertexTexWidth) -
// see GLDraw.ts's polygonVertexData/pushPolygon and glUtil.ts's createDataTexture.
uniform sampler2D uVertexTex;
// highp - fragment shaders default int to mediump, so this must be explicit on both sides to
// avoid a precision-mismatch link error (see solidPolygon.frag)
uniform highp int uVertexTexWidth;

layout(location = 0) in vec2 v_localPosition;
layout(location = 1) in vec4 v_instanceTransform;
layout(location = 2) in float v_instanceVertexOffset;
layout(location = 3) in float v_instanceVertexCount;
layout(location = 4) in float v_instanceRadius;
layout(location = 5) in vec4 v_instanceColor;
layout(location = 6) in vec4 v_instanceFillColor;

out vec2 f_position;
flat out highp int f_vertexOffset;
flat out highp int f_vertexCount;
out vec2 f_center;
out float f_invScale;
out float f_radius;
out float f_thickness;
out vec4 f_color;
out vec4 f_fillColor;

vec2 fetchVertex(int index) {
  return texelFetch(uVertexTex, ivec2(index % uVertexTexWidth, index / uVertexTexWidth), 0).rg;
}

void main() {
  f_position = v_localPosition;
  f_color = v_instanceColor;
  f_fillColor = v_instanceFillColor;

  int offset = int(v_instanceVertexOffset + 0.5);
  int count = int(v_instanceVertexCount + 0.5);
  f_vertexOffset = offset;
  f_vertexCount = count;

  // Compute polygon AABB
  vec2 lower = fetchVertex(offset);
  vec2 upper = lower;
  for (int i = 1; i < count; ++i) {
    vec2 v = fetchVertex(offset + i);
    lower = min(lower, v);
    upper = max(upper, v);
  }

  vec2 center = 0.5 * (lower + upper);
  vec2 width = upper - lower;
  float maxWidth = max(width.x, width.y);
  float thicknessWorld = 3.0 / pixelScale;

  // + thicknessWorld: leaves room for the stroke's anti-aliasing margin beyond the polygon edge
  // (see solidCircle.vert for why zero slack at the quad boundary clips the outline there)
  float scale = v_instanceRadius + 0.5 * maxWidth + thicknessWorld;
  float invScale = 1.0 / scale;

  // f_center/f_invScale let the fragment shader re-derive each fetched vertex's shifted-and-scaled
  // (into the 2x2 quad) position itself, since the vertex count is unbounded and can't travel as a
  // fixed-size varying array (see solidPolygon.frag's sdConvexPolygon)
  f_center = center;
  f_invScale = invScale;
  f_radius = invScale * v_instanceRadius;
  f_thickness = thicknessWorld * invScale;

  // scale up and transform quad to fit polygon
  float x = v_instanceTransform.x;
  float y = v_instanceTransform.y;
  float c = v_instanceTransform.z;
  float s = v_instanceTransform.w;
  vec2 p = vec2(scale * v_localPosition.x, scale * v_localPosition.y) + center;
  p = vec2((c * p.x - s * p.y) + x, (s * p.x + c * p.y) + y);
  gl_Position = projectionMatrix * vec4(p, 0.0, 1.0);
}
