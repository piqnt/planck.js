import React from "react";

import { useMiddleware, EmitFunction } from "../shell/useRuntime";
import { OutlineContext } from "./OutlineContext";

import { getLabel } from "planck/testbed";
import { getKey, isSelected } from "planck/testbed";
import { Joint } from "planck";

interface LiveJointComponentProps {
  emit: EmitFunction;
  joint: Joint;
  selected: boolean;
  selectable?: boolean;
}

class LiveJointComponent extends React.PureComponent<LiveJointComponentProps> {
  handleClick = () => {
    const { emit, joint } = this.props;
    emit("select-joint", { joint: getKey(joint) });
  };

  render() {
    const { joint, selected, selectable } = this.props;
    if (!joint) {
      return null;
    }
    const label = getLabel(joint);
    let className = "";
    className += selected ? "selected-item " : "";
    className += selectable ? "clickable " : "";
    return (
      <span className={className} onClick={selectable ? this.handleClick : null}>
        {label ? "joint#" + label : (joint.getType() ?? "")}
      </span>
    );
  }
}

interface LiveJointProps {
  joint: Joint;
  selectable?: boolean;
}

export const LiveJoint = (props: LiveJointProps) => {
  const { context, emit } = useMiddleware<OutlineContext>();
  const jointKey = getKey(props.joint);
  const selected = isSelected(context.multiselect?.value, jointKey);

  return <LiveJointComponent joint={props.joint} selectable={props.selectable} emit={emit} selected={selected} />;
};
