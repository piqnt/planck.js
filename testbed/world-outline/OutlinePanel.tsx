import React from "react";
import { Group } from "@mantine/core";

import { useMiddleware } from "../shell/useRuntime";
import { OutlineSection } from "../shell/OutlineStyle";

import { OutlineContext } from "./OutlineContext";
import { SelectionView } from "./SelectionView";
import { WorldSubtree } from "./WorldView";

export const LiveOutlinePanel = () => {
  const { context } = useMiddleware<OutlineContext>();
  if (context.activity?.value !== "mode:play") return;
  return (
    <>
      <Group justify="end" gap={8} m={8}></Group>
      <OutlineSection>
        <SelectionView />
      </OutlineSection>
      <OutlineSection>
        <WorldSubtree />
      </OutlineSection>
    </>
  );
};
