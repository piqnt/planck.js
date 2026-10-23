// Every example runs on example/index.html, loading example/index.ts, which reads the url. There
// is one page and one entry: the build copies the page it built once into a directory per example,
// and the dev servers serve the file itself. Each copy differs only in its <title>.
import fs from "fs";
import path from "path";

import { EXAMPLE_DIR, exampleNames } from "./examples-list.mjs";

const PAGE = path.join(EXAMPLE_DIR, "index.html");

/** That page, named for the example it will run. */
export const nameExamplePage = (html, name) =>
  html.replace(/<title>[^<]*<\/title>/, `<title>${name} &middot; Planck.js</title>`);

/**
 * Serves it in development, where the script is not where the built page has it.
 *
 * The docs server has to serve the examples itself: two Vite dev servers both claim /@vite/client
 * and /@fs, so a proxy cannot separate them.
 *
 * @param prefix the url the examples live under, with its trailing slash
 * @param src how the page reaches example/index.ts from there
 * @param allow directories the server may read, where src points outside its root
 */
export const serveExamplePages = ({ prefix, src, allow }) => ({
  name: "planck-example-pages",
  apply: "serve",
  ...(allow ? { config: () => ({ server: { fs: { allow } } }) } : {}),
  configureServer(server) {
    const names = new Set(exampleNames());
    // ahead of Vite's own, which answer a path outside the base with a 404
    server.middlewares.use(async (req, res, next) => {
      const [pathname = ""] = (req.url ?? "").split("?");
      if (!pathname.startsWith(prefix)) return next();
      const name = pathname.slice(prefix.length).replace(/\/$/, "");
      if (!names.has(name)) return next();
      const page = nameExamplePage(fs.readFileSync(PAGE, "utf8"), name).replace(/src="[^"]*index\.ts"/, `src="${src}"`);
      const html = await server.transformIndexHtml(pathname, page, req.originalUrl);
      res.setHeader("content-type", "text/html");
      res.end(html);
    });
  },
});

/** One built page per example, after the build has written the page once. */
export const copyExamplePages = (outDir, rootPage) => ({
  name: "planck-copy-example-pages",
  apply: "build",
  closeBundle() {
    const built = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
    for (const name of exampleNames()) {
      fs.mkdirSync(path.join(outDir, name), { recursive: true });
      fs.writeFileSync(path.join(outDir, name, "index.html"), nameExamplePage(built, name));
    }
    // the root is the site's front door, not an example
    fs.writeFileSync(path.join(outDir, "index.html"), rootPage);
  },
});
