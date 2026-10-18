import React from "react";
import shellStyles from "@mantine/core/styles.css?inline";

import { renderInto } from "./renderInto";
import { ShellLayout, type ShellLayoutProps } from "./ShellLayout";

const STYLE_ID = "planck-testbed-full-shell-styles";

/**
 * planck's own testbed shell: the toolbar, menus, playlist and outline, around an example.
 *
 * The examples site's, from source and not published — a host renders the published shell
 * instead (planck/testbed-shell, the outline alone). It adds Mantine's whole stylesheet.
 */
export function renderShell(id: string, props: ShellLayoutProps = {}) {
  renderInto(id, STYLE_ID, shellStyles, <ShellLayout {...props} />);
}
