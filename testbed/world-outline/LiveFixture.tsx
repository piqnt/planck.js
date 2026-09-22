import React from "react";

import { useMiddleware, EmitFunction } from "../shell/useRuntime";
import { OutlineContext } from "./OutlineContext";

import { getLabel } from "planck/testbed";
import { getKey, isSelected } from "planck/testbed";
import { Fixture } from "planck";

interface LiveFixtureComponentProps {
  emit: EmitFunction;
  fixture: Fixture;
  selected: boolean;
  selectable?: boolean;
}

class LiveFixtureComponent extends React.PureComponent<LiveFixtureComponentProps> {
  handleClick = () => {
    const { emit, fixture } = this.props;
    emit("select-fixture", {
      fixture: getKey(fixture),
      body: getKey(fixture.getBody()),
    });
  };

  render() {
    const { fixture, selected, selectable } = this.props;
    if (!fixture) {
      return null;
    }
    const label = getLabel(fixture);
    let className = "";
    className += selected ? "selected-item " : "";
    className += selectable ? "clickable " : "";
    return (
      <span className={className} onClick={selectable ? this.handleClick : null}>
        {label ? "fixture#" + label : (fixture.getType() ?? "")}
      </span>
    );
  }
}

interface LiveFixtureProps {
  fixture: Fixture;
  selectable?: boolean;
}

export const LiveFixture = (props: LiveFixtureProps) => {
  const { context, emit } = useMiddleware<OutlineContext>();
  const fixtureKey = getKey(props.fixture);
  const selected = isSelected(context.multiselect?.value, fixtureKey);

  return <LiveFixtureComponent fixture={props.fixture} selectable={props.selectable} emit={emit} selected={selected} />;
};
