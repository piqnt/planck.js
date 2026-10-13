// a stylesheet imported as its text (Vite's `?inline`), for the shell to add to the page itself
declare module "*.css?inline" {
  const css: string;
  export default css;
}
