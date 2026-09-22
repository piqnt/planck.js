// https://en.wikipedia.org/wiki/Alpha_compositing
vec4 blend_colors(vec4 front, vec4 back) {
  vec3 cSrc = front.rgb;
  float alphaSrc = front.a;
  vec3 cDst = back.rgb;
  float alphaDst = back.a;
  vec3 cOut = cSrc * alphaSrc + cDst * alphaDst * (1.0 - alphaSrc);
  float alphaOut = alphaSrc + alphaDst * (1.0 - alphaSrc);
  cOut = cOut / alphaOut;
  return vec4(cOut, alphaOut);
}
