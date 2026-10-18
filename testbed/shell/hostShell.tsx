// planck/testbed-shell, for hosts such as piqnt: the testbed's UI beside the testbed the page's
// code mounted. Today that is the outline alone — its world, bodies, joints and selection; the
// whole shell's toolbar, menus and playlist are this repo's examples site's and are not published.
import React from "react";
import { IconContext } from "react-icons";
import { MantineProvider } from "@mantine/core";

// Mantine's stylesheet as split per component: the base, and the components the outline uses
import baseline from "@mantine/core/styles/baseline.css?inline";
import variables from "@mantine/core/styles/default-css-variables.css?inline";
import global from "@mantine/core/styles/global.css?inline";
import affix from "@mantine/core/styles/Affix.css?inline";
import group from "@mantine/core/styles/Group.css?inline";
import scrollArea from "@mantine/core/styles/ScrollArea.css?inline";
import tabs from "@mantine/core/styles/Tabs.css?inline";
import text from "@mantine/core/styles/Text.css?inline";
import unstyledButton from "@mantine/core/styles/UnstyledButton.css?inline";

import { renderInto } from "./renderInto";
import { theme } from "./Theme";
import { OutlineFrame } from "./OutlineFrame";

const STYLE_ID = "planck-testbed-shell-styles";
// in Mantine's order: the base, then UnstyledButton before the components built on it (Tabs),
// which override its reset
const STYLES = [baseline, variables, global, unstyledButton, affix, group, scrollArea, tabs, text].join("\n");

/**
 * Renders the testbed's UI into a host's element, once: a later call keeps the first. Today it is the
 * outline, shown while the testbed's `showOutline` is on, with the testbed's container leaving room
 * for it.
 *
 * It brings its own UI library and stylesheet; the host provides the element and the same
 * planck/testbed its code mounted.
 */
export function renderShell(id: string) {
  renderInto(
    id,
    STYLE_ID,
    STYLES,
    <IconContext.Provider value={{ className: "svg-icon" }}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <OutlineFrame />
      </MantineProvider>
    </IconContext.Provider>,
  );
}
