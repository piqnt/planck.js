import React from "react";
import { createRoot, type Root } from "react-dom/client";

import { ShellLayout, type ShellLayoutProps } from "./ShellLayout";

let root: Root | undefined;

/**
 * Renders the shell (toolbar and outline) into the element, once: a later call keeps the first —
 * a page that renders it before loading an example that renders it too.
 */
export function renderShell(id: string, props: ShellLayoutProps = {}) {
  const container = document.getElementById(id);
  if (!container) {
    console.log("Element not found: ", id);
    return;
  }
  if (root) return;
  root = createRoot(container);
  root.render(<ShellLayout {...props} />);
}
