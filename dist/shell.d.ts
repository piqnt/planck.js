interface ShellLayoutProps {
    /** the top bar; a page embedding the testbed may have its own */
    toolbar?: boolean;
}

/**
 * Renders the shell (toolbar and outline) into the element, once: a later call keeps the first —
 * a page that renders it before loading an example that renders it too.
 *
 * The shell is Mantine: the page loads `@mantine/core/styles.css` itself.
 */
declare function renderShell(id: string, props?: ShellLayoutProps): void;

export { renderShell };
