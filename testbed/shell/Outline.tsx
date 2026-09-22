import React from "react";
import { Affix } from "@mantine/core";

import { runtime } from "planck/testbed";
import { LiveOutlinePanel } from "../world-outline/OutlinePanel";

const affixStyle: React.CSSProperties = {
  width: 290,
  overflowY: "auto",
  background: "#1e1e1e",
  borderLeft: "1px solid #333",
};

const affixPosition: React.CSSProperties = {
  right: 0,
  top: 0,
  bottom: 0,
};

const panelStyle: React.CSSProperties = {
  fontSize: "0.9em",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "12px",
};

interface OutlineComponentProps {
  /** space left for the toolbar above, in px */
  top?: number;
}

export const OutlineComponent: React.FC<OutlineComponentProps> = (props) => {
  const context = runtime.value?.context;
  if (!context?.showOutline?.value) return null;

  return (
    <Affix position={affixPosition} style={{ ...affixStyle, paddingTop: (props.top ?? 0) + "px" }}>
      <div style={panelStyle}>
        <LiveOutlinePanel />
      </div>
    </Affix>
  );
};
