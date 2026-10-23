import React, { PropsWithChildren } from "react";
import { CollapsedItemIcon, ExpandedItemIcon } from "./Icon";

// temporary components
// todo: replace them with mantine

interface SubtreeContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  rowHeight?: number;
}

// todo: use one context, keep open item keys in a set
export const SubtreeContext = React.createContext({} as SubtreeContextType);

interface SubtreeProps {
  /** open at first; or, with `onToggle`, open now (controlled) */
  open?: boolean;
  onToggle?: (open: boolean) => void;
  /** one line, for lists whose rows have a fixed height */
  rowHeight?: number;
}

const subtreeStyle: React.CSSProperties = {
  position: "relative",
  color: "#aaa",
};

export const Subtree: React.FC<SubtreeProps & PropsWithChildren> = (props) => {
  const [openState, setOpenState] = React.useState(props.open ?? false);
  const controlled = typeof props.onToggle === "function";
  const open = controlled ? !!props.open : openState;
  const setOpen = controlled ? props.onToggle : setOpenState;

  const context = React.useMemo(() => {
    return { open, setOpen, rowHeight: props.rowHeight };
  }, [open, setOpen, props.rowHeight]);

  return (
    <SubtreeContext.Provider value={context}>
      <div style={subtreeStyle}>{props.children}</div>
    </SubtreeContext.Provider>
  );
};

interface SubtreeHeaderProps {
  onClick?: () => void;
}

const headerIconStyle: React.CSSProperties = {
  fontSize: "0.8em",
  marginLeft: "-2px",
  marginRight: "5px",
};

const subtreeBranchStyle: React.CSSProperties = {
  display: "inline-block",
  position: "absolute",
  left: "-0.9em",
  top: "-0.1em",
  width: "0.5em",
  height: "1em",
  borderBottom: "1px solid #aaa",
};

export const SubtreeHeader: React.FC<SubtreeHeaderProps & PropsWithChildren> = (props) => {
  const subtree = React.useContext(SubtreeContext);

  const onClick = React.useCallback(() => {
    subtree.setOpen(!subtree.open);
    props.onClick?.();
  }, [subtree.open, subtree.setOpen, props.onClick]);

  const rowStyle: React.CSSProperties | undefined = subtree.rowHeight
    ? { height: subtree.rowHeight, lineHeight: subtree.rowHeight + "px", whiteSpace: "nowrap", overflow: "hidden" }
    : undefined;

  return (
    <div style={rowStyle}>
      <span style={subtreeBranchStyle}> </span>
      {subtree.open ? <ExpandedItemIcon style={headerIconStyle} /> : <CollapsedItemIcon style={headerIconStyle} />}
      <a onClick={onClick}>{props.children}</a>
    </div>
  );
};

const subtreeBodyStyle: React.CSSProperties = {
  borderLeft: "1px solid #aaa",
  paddingLeft: "0.9em",
  marginBottom: "1em",
};

export const SubtreeBody: React.FC<PropsWithChildren> = (props) => {
  const subtree = React.useContext(SubtreeContext);
  if (!subtree.open) return null;
  // in a fixed-height list the body adds whole rows, no margin
  const style = subtree.rowHeight ? { ...subtreeBodyStyle, marginBottom: 0 } : subtreeBodyStyle;
  return <div style={style}>{props.children}</div>;
};

const pairStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
};

export const Pair: React.FC<PropsWithChildren> = (props) => {
  return <div style={pairStyle}>{props.children}</div>;
};

const keyStyle: React.CSSProperties = {
  overflow: "hidden",
  flexGrow: 1,
  flexShrink: 1,
  paddingRight: "5px",
  textOverflow: "ellipsis",
};

export const PairKey: React.FC<PropsWithChildren> = (props) => {
  return <div style={keyStyle}>{props.children}</div>;
};

const valueStyle: React.CSSProperties = {
  width: "95px",
  flexGrow: 0,
  flexShrink: 0,
};

export const PairValue: React.FC<PropsWithChildren> = (props) => {
  return <div style={valueStyle}>{props.children}</div>;
};
