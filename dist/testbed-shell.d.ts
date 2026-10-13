/**
 * Renders the testbed's UI into the element, once: a later call keeps the first. Today it is the
 * outline, shown while the testbed's `showOutline` is on, with the testbed's container leaving room
 * for it.
 *
 * It brings its own UI library and stylesheet; the host provides the element and the same
 * planck/testbed its code mounted.
 */
declare function renderShell(id: string): void;

export { renderShell };
