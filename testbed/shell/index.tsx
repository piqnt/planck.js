import React from "react";
import { createRoot, type Root } from "react-dom/client";
import shellStyles from "@mantine/core/styles.css?inline";

import { ShellLayout, type ShellLayoutProps } from "./ShellLayout";

let root: Root | undefined;

const STYLE_ID = "planck-testbed-shell-styles";

/** the shell's stylesheet, bundled with it, added to the page once */
function addStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = shellStyles;
  document.head.appendChild(style);
}

/**
 * Renders the shell (toolbar and outline) into the element, once: a later call keeps the first —
 * a page that renders it before loading an example that renders it too.
 *
 * The examples site's, from source: not published (hosts take the outline alone, from
 * planck/testbed-outline). It adds Mantine's whole stylesheet to the page.
 */
export function renderShell(id: string, props: ShellLayoutProps = {}) {
  const container = document.getElementById(id);
  if (!container) {
    console.log("Element not found: ", id);
    return;
  }
  if (root) return;
  addStyles();
  root = createRoot(container);
  root.render(<ShellLayout {...props} />);
}
