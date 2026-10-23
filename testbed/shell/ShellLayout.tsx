import React from "react";
import { IconContext } from "react-icons";
import { MantineProvider } from "@mantine/core";

import { CodeHighlightAdapterProvider } from "@mantine/code-highlight";

import { codeAdapter } from "./codeAdapter";
import { theme } from "./Theme";
import { ToolbarComponent } from "./Toolbar";
import { OutlineFrame } from "./OutlineFrame";

export interface ShellLayoutProps {
  /** the top bar; a page embedding the testbed may have its own */
  toolbar?: boolean;
}

export const TOOLBAR_HEIGHT = 46;

export const ShellLayout: React.FC<ShellLayoutProps> = (props) => {
  const toolbar = props.toolbar ?? true;
  return (
    <IconContext.Provider value={{ className: "svg-icon" }}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <CodeHighlightAdapterProvider adapter={codeAdapter}>
          {toolbar && <ToolbarComponent />}
          <OutlineFrame top={toolbar ? TOOLBAR_HEIGHT : 0} />
        </CodeHighlightAdapterProvider>
      </MantineProvider>
    </IconContext.Provider>
  );
};
