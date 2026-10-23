import { defineConfig } from "vitepress";
import glsl from "vite-plugin-glsl";

import path from "path";

import { EXAMPLE_DIR } from "../../scripts/examples-list.mjs";
import { serveExamplePages } from "../../scripts/examples-html.mjs";
import { ROOT, sourceAlias, sourceDefine, SITE_BASE } from "../../scripts/vite-shared.mjs";

const BASE = `${SITE_BASE}docs/`;

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Planck.js",
  description: "2D Physics Engine for JavaScript",
  srcDir: "./pages",
  base: BASE,
  outDir: "../site/docs",

  // dark by default, as the testbed pages are; the toggle still works
  appearance: "dark",

  head: [
    // the site's own analytics.js, which does nothing until piqnt rewrites the path to its own
    ["script", { async: "", src: `${SITE_BASE}analytics.js` }],
  ],

  // planck from source, so a docs page can import and run it — and so this server can serve the
  // examples in development (examples-dev.ts).
  vite: {
    // the examples, served from this server too (docs:dev is the whole site). The page asks for
    // its script root-relative, because transformIndexHtml would add the docs' base to a relative
    // one; the examples and planck's source are above docs/, hence `allow`.
    plugins: [
      glsl(),
      serveExamplePages({
        prefix: SITE_BASE,
        src: `/@fs${path.join(EXAMPLE_DIR, "index.ts")}`,
        allow: [ROOT],
      }),
    ],
    resolve: { alias: sourceAlias },
    // the examples it serves are at the site's root, as in production
    define: sourceDefine(SITE_BASE.replace(/\/$/, "")),
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
    },
    nav: [
      { text: "Examples", link: "/examples" },
      { text: "API Reference", link: "/api/" },
      { text: "GitHub", link: "https://github.com/piqnt/planck.js/" },
      { text: "Discord", link: "https://discord.gg/znjh6J7" },
    ],
    sidebar: [
      { link: "/", text: "Introduction" },
      {
        text: "Get Started",
        collapsed: true,
        items: [
          { link: "/install", text: "Install" },
          { link: "/hello-world", text: "Hello World" },
          { link: "/core-concepts", text: "Core Concepts" },
        ],
      },

      {
        text: "API Conventions",
        collapsed: true,
        items: [
          { link: "/api-conventions/units", text: "Units" },
          { link: "/api-conventions/factories-and-definitions", text: "Factories and Definitions" },
          { link: "/api-conventions/implicit-destruction", text: "Implicit Destruction" },
          { link: "/api-conventions/user-data", text: "User Data" },
        ],
      },

      { link: "/world", text: "World" },
      { link: "/body", text: "Body" },
      { link: "/fixture", text: "Fixture" },

      {
        text: "Shape",
        collapsed: true,
        link: "/shape",
        items: [
          { link: "/shape", text: "Shape" },
          { link: "/shape/circle", text: "Circle" },
          { link: "/shape/polygon", text: "Polygon" },
          { link: "/shape/edge", text: "Edge" },
          { link: "/shape/chain", text: "Chain" },
        ],
      },

      {
        text: "Joint",
        collapsed: true,
        link: "/joint",
        items: [
          { link: "/joint", text: "Joint" },
          { link: "/joint/distance-joint", text: "Distance Joint" },
          { link: "/joint/friction-joint", text: "Friction Joint" },
          { link: "/joint/gear-joint", text: "Gear Joint" },
          { link: "/joint/motor-joint", text: "Motor Joint" },
          { link: "/joint/prismatic-joint", text: "Prismatic Joint" },
          { link: "/joint/pulley", text: "Pulley" },
          { link: "/joint/revolute-joint", text: "Revolute Joint" },
          { link: "/joint/rope-joint", text: "Rope Joint" },
          { link: "/joint/weld-joint", text: "Weld Joint" },
          { link: "/joint/wheel-joint", text: "Wheel Joint" },
          { link: "/joint/mouse-joint", text: "Mouse Joint" },
        ],
      },

      { link: "/contacts", text: "Contacts" },
      { link: "/collision", text: "Collision" },

      { link: "/world/simulation", text: "Simulation" },
      { link: "/rendering", text: "Rendering" },

      { link: "/testbed", text: "Testbed" },
      { link: "/examples", text: "Examples" },

      { link: "/limitations", text: "Limitations" },
      { link: "/api/", text: "API Reference" },
      { link: "/references-resources", text: "References & Resources" },
      { link: "/credits", text: "Credits & License" },
    ],
  },
});
