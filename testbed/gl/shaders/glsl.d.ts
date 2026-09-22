// Ambient module declarations for shader files loaded as strings by vite-plugin-glsl
// (see vite.config.mts). Declared locally instead of via `"types": ["vite-plugin-glsl/ext"]`
// in tsconfig.json, since that array doesn't resolve the package's conditional "./ext" export
// reliably across TypeScript's module-resolution settings.

declare module "*.vert" {
  const shader: string;
  export default shader;
}

declare module "*.frag" {
  const shader: string;
  export default shader;
}

declare module "*.glsl" {
  const shader: string;
  export default shader;
}
