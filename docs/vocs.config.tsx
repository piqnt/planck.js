import { defineConfig } from "vocs";

export default defineConfig({
  title: "Planck.js",
  rootDir: ".",
  basePath: "/planck.js/docs/",
  baseUrl: "/planck.js/docs/",
  topNav: [ 
    { text: "API Reference", link: "/api/"},
    { text: "Playground", link: "https://piqnt.com/"},
    { text: "GitHub", link: "https://github.com/piqnt/planck.js/"},
    { text: "Discord", link: "https://discord.gg/znjh6J7"},
  ],
  sidebar: [
    { link: "/", text: "Introduction" },
    {
      text: "Get Started",
      collapsed: true,
      items: [
        { link: "/run-your-code", text: "Run Your Code" },
        { link: "/hello-world", text: "Hello World" },
        { link: "/core-concepts", text: "Core Concepts" },
        { link: "/install", text: "Install" },
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

    { link: "/limitations", text: "Limitations" },
    { link: "/api/", text: "API Reference" },
    { link: "/references-resources", text: "References & Resources" },
    { link: "/credits", text: "Credits & License" },
  ],
  head: () => <script src="/plank.js/docs/messenger.js" />,
})
