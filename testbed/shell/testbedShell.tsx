import React from "react";
import shellStyles from "@mantine/core/styles.css?inline";
import codeStyles from "@mantine/code-highlight/styles.css?inline";
import hljsTheme from "highlight.js/styles/atom-one-dark.css?inline";

import { renderInto } from "./renderInto";
import { ShellLayout, type ShellLayoutProps } from "./ShellLayout";

const STYLE_ID = "planck-testbed-full-shell-styles";

/**
 * planck's testbed shell: the toolbar, menus, playlist and outline, around an example.
 *
 * The examples site's, built from source and not published. It adds Mantine's whole stylesheet,
 * and the code highlighter's, which the code view needs.
 */
export function renderShell(id: string, props: ShellLayoutProps = {}) {
  renderInto(id, STYLE_ID, `${shellStyles}\n${codeStyles}\n${hljsTheme}`, <ShellLayout {...props} />);
}
