/**
 * Renders the outline into the element, once: a later call keeps the first. It shows while the
 * testbed's `showOutline` is on, and the testbed's container leaves room for it.
 *
 * The outline brings its own UI library and stylesheet; the host provides the element and the
 * same planck/testbed its code mounted.
 */
declare function renderOutline(id: string): void;

export { renderOutline };
