import React from "react";

import { useMiddleware } from "../shell/useRuntime";
import { OutlineContext } from "./OutlineContext";

import { findBody, findFixture, findJoint } from "planck/testbed";

import { BodyView } from "./BodyView";
import { JointView } from "./JointView";
import { FixtureView } from "./FixtureView";
import { WorldEdit } from "./WorldView";

export const SelectionView: React.FC = () => {
  const { context } = useMiddleware<OutlineContext>();
  const world = context.world?.value;

  if (!world) return;

  const multiselect = context.multiselect?.value;

  if (multiselect?.selected.length > 0) {
    return multiselect.selected.map((selection) => {
      if (selection?.type === "fixture") {
        if (selection.up?.type === "body") {
          const fixture = findFixture(world, selection.key);
          const body = findBody(world, selection.up.key);
          return <BodyView body={body} fixture={fixture} />;
        } else {
          const fixture = findFixture(world, selection.key);
          return <FixtureView fixture={fixture} />;
        }
      }

      if (selection?.type === "body") {
        const body = findBody(world, selection.key);
        return <BodyView body={body} />;
      }

      if (selection?.type === "joint") {
        const joint = findJoint(world, selection.key);
        return <JointView joint={joint} />;
      }
    });
  }

  return <WorldEdit />;
};
