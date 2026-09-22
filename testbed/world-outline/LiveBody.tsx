import React from "react";

import { WatchVec2 } from "../shell/WatchValue";

import { useMiddleware, EmitFunction } from "../shell/useRuntime";
import { OutlineContext } from "./OutlineContext";

import { getLabel } from "planck/testbed";
import { getKey, isSelected } from "planck/testbed";
import { Body } from "planck";

interface LiveBodyProps {
  emit: EmitFunction;
  body: Body;
  selected: boolean;
  selectable?: boolean;
  variant?: "short";
  /** frames between updates of the position shown */
  every?: number;
}

class LiveBodyComponent extends React.PureComponent<LiveBodyProps> {
  handleClick = () => {
    const { emit, body } = this.props;
    emit("select-body", { body: getKey(body) });
  };

  render() {
    const { body, selected, selectable, variant, every } = this.props;
    if (!body) {
      return null;
    }
    const label = getLabel(body);

    let showType: boolean;
    let showPosition: boolean;

    if (variant === "short") {
      showType = false;
      showPosition = !label;
    } else {
      showType = true;
      showPosition = true;
    }

    let className = "";
    className += selected ? "selected-item " : "";
    className += selectable ? "clickable " : "";
    return (
      <span className={className} onClick={selectable ? this.handleClick : null}>
        {label ? "body#" + label : showType && body.getType()}{" "}
        {showPosition && <WatchVec2 getValue={() => body.getPosition()} every={every} />}
      </span>
    );
  }
}

interface LiveBodyComponentProps {
  body: Body;
  selectable?: boolean;
  variant?: "short";
  /** frames between updates of the position shown */
  every?: number;
}

export const LiveBody = (props: LiveBodyComponentProps) => {
  const { context, emit } = useMiddleware<OutlineContext>();
  const bodyKey = getKey(props.body);
  const selected = isSelected(context.multiselect?.value, bodyKey);

  return (
    <LiveBodyComponent
      body={props.body}
      selectable={props.selectable}
      variant={props.variant}
      every={props.every}
      emit={emit}
      selected={selected}
    />
  );
};
