import React, { useEffect } from "react";
import { effect } from "@preact/signals";
import { IconContext } from "react-icons";
import { MantineProvider } from "@mantine/core";

import { theme } from "./Theme";
import { ToolbarComponent } from "./Toolbar";
import { OutlineComponent } from "./Outline";
import { runtime } from "planck/testbed";

export interface ShellLayoutProps {
  /** the top bar; a page embedding the testbed may have its own */
  toolbar?: boolean;
}

export const TOOLBAR_HEIGHT = 46;

export const ShellLayout: React.FC<ShellLayoutProps> = (props) => {
  const toolbar = props.toolbar ?? true;
  useEffect(() => {
    return effect(() => {
      if (!runtime?.value) return;
      const el = runtime?.value.context.containerElement?.value;
      if (!el) return;
      const showOutline = runtime.value.context.showOutline?.value;
      el.style.top = toolbar ? TOOLBAR_HEIGHT + "px" : "0px";
      el.style.right = showOutline ? "290px" : "0px";
    });
  }, [toolbar]);

  return (
    <IconContext.Provider value={{ className: "svg-icon" }}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        {toolbar && <ToolbarComponent />}
        <OutlineComponent top={toolbar ? TOOLBAR_HEIGHT : 0} />
      </MantineProvider>
    </IconContext.Provider>
  );
};
