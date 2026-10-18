import { type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";

// one page renders one shell: the host's outline (planck/testbed-shell) or the examples site's
// whole shell, never both
let root: Root | undefined;

/**
 * Renders a shell into the element, once: a later call keeps the first — a page that renders it
 * before loading an example that renders it too. Each shell passes its own stylesheet, bundled
 * with it and added to the page under its own id.
 */
export function renderInto(id: string, styleId: string, styles: string, element: ReactNode) {
  const container = document.getElementById(id);
  if (!container) {
    console.log("Element not found: ", id);
    return;
  }
  if (root) return;

  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = styles;
    document.head.appendChild(style);
  }

  root = createRoot(container);
  root.render(element);
}
