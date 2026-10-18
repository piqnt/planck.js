import React, { useEffect } from "react";
import { effect } from "@preact/signals-core";

import { runtime } from "planck/testbed";
import { OutlineComponent, OUTLINE_WIDTH } from "./Outline";

interface OutlineFrameProps {
  /** space left above for a toolbar, in px */
  top?: number;
}

/**
 * The outline beside the testbed: the testbed's container makes room for it while it shows.
 * Shared by planck's own shell (shell/testbedShell) and a host's (planck/testbed-shell).
 */
export const OutlineFrame: React.FC<OutlineFrameProps> = ({ top = 0 }) => {
  useEffect(() => {
    return effect(() => {
      if (!runtime?.value) return;
      const el = runtime?.value.context.containerElement?.value;
      if (!el) return;
      const showOutline = runtime.value.context.showOutline?.value;
      el.style.top = top + "px";
      el.style.right = showOutline ? OUTLINE_WIDTH + "px" : "0px";
    });
  }, [top]);

  return <OutlineComponent top={top} />;
};
