import React, { FC, PropsWithChildren } from "react";
import { ScrollArea } from "@mantine/core";

const sectionStyle: React.CSSProperties = {
  margin: "8px 18px",
  flexBasis: "400px",
  flexGrow: 10,
  flexShrink: 10,
};

const dividerStyle: React.CSSProperties = {
  flexBasis: "1px",
  flexGrow: 0,
  flexShrink: 0,
  borderBottom: "1px solid #8883",
};

export const OutlineSection: FC<PropsWithChildren> = (props) => {
  return (
    <>
      <div style={dividerStyle} />
      <div style={sectionStyle}>
        <ScrollArea h="100%" styles={{ thumb: { background: "rgba(255,255,255,0.4)" } }}>
          {props.children}
        </ScrollArea>
      </div>
    </>
  );
};
