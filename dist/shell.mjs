/**
 * Planck.js v1.5.1
 * @license The MIT license
 * @copyright Copyright (c) 2026 Erin Catto, Ali Shakiba
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { effect } from "@preact/signals-core";
import { IconContext } from "react-icons";
import { createTheme, Modal, Group, ScrollArea, Stack, NavLink, SimpleGrid, UnstyledButton, Text, Menu, Button, Checkbox, Slider, Affix, Tabs, MantineProvider } from "@mantine/core";
import { useSignals } from "@preact/signals-react/runtime";
import { useDisclosure } from "@mantine/hooks";
import { TbTools } from "react-icons/tb";
import { BiFolder } from "react-icons/bi";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { playlist, currentPlay, runtime, toolbarTool, getKey, isSelected, getLabel, findFixture, findBody, findJoint } from "planck/testbed";
import { MdOutlineVisibility, MdTune } from "react-icons/md";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
const theme = createTheme({
  primaryColor: "gray",
  components: {
    Button: {
      vars: (theme2, props) => {
        if (props.variant === "toolbar") {
          return {
            root: {
              "--button-height": "var(--button-height-compact-sm)",
              "--button-padding-x": "var(--button-padding-x-compact-sm)",
              "--button-fz": "var(--mantine-font-size-sm)",
              "--button-bg": "var(--mantine-color-default)",
              "--button-hover": "var(--mantine-color-default-hover)",
              "--button-color": "var(--mantine-color-default-color)",
              "--button-bd": "calc(0.0625rem * var(--mantine-scale)) solid var(--mantine-color-default-border)",
              fontWeight: "400"
            }
          };
        }
        return {};
      }
    }
  }
});
function tracked(render) {
  return function Tracked(props) {
    const store = useSignals(1);
    try {
      return render(props);
    } finally {
      store.f();
    }
  };
}
function buildPlaylistFolders(playlist2) {
  const folders = /* @__PURE__ */ new Map();
  for (const play of playlist2) {
    const [folderName, label] = play.key.split("/");
    if (!folders.has(folderName)) {
      folders.set(folderName, { label: folderName, files: [] });
    }
    folders.get(folderName).files.push({ label, play });
  }
  return Array.from(folders.values());
}
const PlaylistModal = tracked(({ opened, onClose }) => {
  const folders = React.useMemo(() => buildPlaylistFolders(playlist), []);
  const [activeFolder, setActiveFolder] = React.useState(() => folders[0]?.label);
  React.useEffect(() => {
    if (!opened)
      return;
    const folderName = currentPlay.value?.key.split("/")[0];
    if (folderName)
      setActiveFolder(folderName);
  }, [opened]);
  const handleSelect = React.useCallback((url) => {
    if (!url)
      return;
    onClose();
    window.location.href = url;
  }, [onClose]);
  const currentFolder = folders.find((folder) => folder.label === activeFolder) ?? folders[0];
  return /* @__PURE__ */ React.createElement(Modal, { opened, onClose, title: "Playlist", size: "xl" }, /* @__PURE__ */ React.createElement(Group, { align: "stretch", gap: 0, wrap: "nowrap" }, /* @__PURE__ */ React.createElement(ScrollArea, { flex: "0 0 160px", style: { borderRight: "1px solid var(--mantine-color-default-border)" } }, /* @__PURE__ */ React.createElement(Stack, { gap: 2 }, folders.map((folder) => /* @__PURE__ */ React.createElement(NavLink, { key: folder.label, label: folder.label, active: folder.label === currentFolder?.label, onClick: () => setActiveFolder(folder.label) })))), /* @__PURE__ */ React.createElement(ScrollArea, { flex: 1 }, /* @__PURE__ */ React.createElement(SimpleGrid, { cols: 3, spacing: "xs", p: "sm" }, currentFolder?.files.map((file) => /* @__PURE__ */ React.createElement(UnstyledButton, { key: file.play.key, onClick: () => handleSelect(file.play.url), bg: file.play.key === currentPlay.value?.key ? "var(--mantine-color-default-hover)" : void 0, p: "sm" }, /* @__PURE__ */ React.createElement(Text, { size: "sm", truncate: true }, file.label)))))));
});
const FLAGS = [
  { key: "shapes", label: "Shapes", group: "Rendering" },
  { key: "bounds", label: "Bounds", group: "Rendering" },
  { key: "mass", label: "Mass", group: "Rendering" },
  { key: "bodyNames", label: "Body Names", group: "Rendering" },
  { key: "joints", label: "Joints", group: "Joints" },
  { key: "contact", label: "Contact Points", group: "Contacts" },
  { key: "contactNormals", label: "Contact Normals", group: "Contacts" }
];
const RenderingMenu = tracked(() => {
  const context = runtime.value?.context;
  if (!context)
    return null;
  const renderConfig = context.renderConfig.value;
  const setRenderConfig = (patch) => {
    context.renderConfig.value = { ...renderConfig, ...patch };
  };
  let group = "";
  return /* @__PURE__ */ React.createElement(Menu, { position: "bottom-start", closeOnItemClick: false }, /* @__PURE__ */ React.createElement(Menu.Target, null, /* @__PURE__ */ React.createElement(Button, { title: "Rendering", variant: "toolbar" }, /* @__PURE__ */ React.createElement(MdOutlineVisibility, null))), /* @__PURE__ */ React.createElement(Menu.Dropdown, null, /* @__PURE__ */ React.createElement(Stack, { gap: "xs", p: "xs" }, FLAGS.map((flag) => {
    const heading = flag.group !== group ? flag.group : null;
    group = flag.group;
    return /* @__PURE__ */ React.createElement(React.Fragment, { key: flag.key }, heading && /* @__PURE__ */ React.createElement(Text, { size: "xs", fw: 600, mt: heading === "Rendering" ? 0 : "xs" }, heading), /* @__PURE__ */ React.createElement(Checkbox, { size: "xs", label: flag.label, checked: !!renderConfig[flag.key], onChange: (e) => setRenderConfig({ [flag.key]: e.currentTarget.checked }) }));
  }))));
});
function toHz(rawHz) {
  return Math.abs(rawHz) < 1 ? 1 / rawHz : rawHz;
}
function toNumber(value) {
  return typeof value === "number" ? value : parseFloat(value);
}
const SimulationMenu = tracked(() => {
  const context = runtime.value?.context;
  if (!context)
    return null;
  const handleSpeed = (value) => {
    const next = toNumber(value);
    if (Number.isFinite(next))
      context.simulation.speed = next;
  };
  const handleHz = (value) => {
    const next = toNumber(value);
    if (Number.isFinite(next))
      context.simulation.hz = next;
  };
  return /* @__PURE__ */ React.createElement(Menu, { position: "bottom-start", closeOnItemClick: false }, /* @__PURE__ */ React.createElement(Menu.Target, null, /* @__PURE__ */ React.createElement(Button, { title: "Simulation", variant: "toolbar" }, /* @__PURE__ */ React.createElement(MdTune, null))), /* @__PURE__ */ React.createElement(Menu.Dropdown, null, /* @__PURE__ */ React.createElement(Stack, { gap: "lg", p: "xs", pb: "lg", w: 240 }, /* @__PURE__ */ React.createElement(Stack, { gap: 4 }, /* @__PURE__ */ React.createElement(Text, { size: "xs", fw: 600 }, "Speed"), /* @__PURE__ */ React.createElement(Slider, { size: "sm", mb: "md", min: 0, max: 3, step: 0.1, label: (value) => value.toFixed(1), marks: [
    { value: 0, label: "0" },
    { value: 1, label: "1x" },
    { value: 2, label: "2x" },
    { value: 3, label: "3x" }
  ], defaultValue: context.simulation.speed, onChange: handleSpeed })), /* @__PURE__ */ React.createElement(Stack, { gap: 4, mt: "md" }, /* @__PURE__ */ React.createElement(Text, { size: "xs", fw: 600 }, "Hz"), /* @__PURE__ */ React.createElement(Slider, { size: "sm", mb: "md", min: 15, max: 240, step: 1, label: (value) => value.toFixed(0), marks: [
    { value: 30, label: "30" },
    { value: 60, label: "60" },
    { value: 120, label: "120" },
    { value: 240, label: "240" }
  ], defaultValue: toHz(context.simulation.hz), onChange: handleHz })))));
});
const affixStyle$1 = {
  borderBottom: "1px solid #333",
  height: "46px",
  background: "#222"
};
const affixPosition$1 = {
  top: 0,
  left: 0,
  right: 0
};
const ToolbarComponent = tracked(() => {
  const context = runtime.value?.context;
  const [playlistOpened, { open: openPlaylist, close: closePlaylist }] = useDisclosure(false);
  const handlePlay = React.useCallback(() => {
    if (!context)
      return;
    context.activity.value = "mode:play";
    context.paused.value = false;
    context.editable.value = false;
  }, [context]);
  const handlePause = React.useCallback(() => {
    if (!context)
      return;
    context.activity.value = "mode:play";
    context.paused.value = true;
    context.editable.value = false;
  }, [context]);
  return /* @__PURE__ */ React.createElement(Affix, { style: affixStyle$1, position: affixPosition$1, p: 10 }, /* @__PURE__ */ React.createElement(Group, { gap: 12 }, /* @__PURE__ */ React.createElement(Button, { title: "Playlist", variant: "toolbar", onClick: openPlaylist }, /* @__PURE__ */ React.createElement(BiFolder, null)), /* @__PURE__ */ React.createElement(PlaylistModal, { opened: playlistOpened, onClose: closePlaylist }), /* @__PURE__ */ React.createElement(Button, { onClick: handlePlay, variant: "toolbar", disabled: context?.activity?.value === "mode:play" && !context?.paused?.value }, /* @__PURE__ */ React.createElement(BsPlayFill, null)), /* @__PURE__ */ React.createElement(Button, { onClick: handlePause, variant: "toolbar", disabled: context?.activity?.value !== "mode:play" || context?.paused?.value }, /* @__PURE__ */ React.createElement(BsPauseFill, null)), /* @__PURE__ */ React.createElement(Menu, { position: "bottom-start" }, /* @__PURE__ */ React.createElement(Menu.Target, null, /* @__PURE__ */ React.createElement(Button, { title: "Tools", variant: "toolbar" }, /* @__PURE__ */ React.createElement(TbTools, null))), /* @__PURE__ */ React.createElement(Menu.Dropdown, null, toolbarTool.list.map((tool) => /* @__PURE__ */ React.createElement(Menu.Item, { key: tool.name, onClick: () => tool.activate(context) }, tool.name)))), /* @__PURE__ */ React.createElement(RenderingMenu, null), /* @__PURE__ */ React.createElement(SimulationMenu, null), /* @__PURE__ */ React.createElement("span", null, context?.activity?.value ?? "∅", " · ", context?.paused?.value ? "paused" : "running", " · ", context?.activeTool?.value?.name ?? "∅")));
});
function useMiddleware() {
  const ref = runtime.value;
  return ref ? { context: ref.context, emit: ref.emit } : { context: null, emit: () => {
  } };
}
const sectionStyle = {
  margin: "8px 18px",
  flexBasis: "400px",
  flexGrow: 10,
  flexShrink: 10
};
const dividerStyle = {
  flexBasis: "1px",
  flexGrow: 0,
  flexShrink: 0,
  borderBottom: "1px solid #8883"
};
const OutlineSection = (props) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: dividerStyle }), /* @__PURE__ */ React.createElement("div", { style: sectionStyle }, /* @__PURE__ */ React.createElement(ScrollArea, { h: "100%", styles: { thumb: { background: "rgba(255,255,255,0.4)" } } }, props.children)));
};
function isValidNumber(n) {
  return typeof n === "number" && isFinite(n) && !isNaN(n);
}
class WatchValue extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {};
    this.setter = (v) => {
      this.props.setValue?.(v);
    };
    this.getter = () => {
      if (this.props.getValue) {
        return this.props.getValue?.();
      }
    };
    this.stopEdit = () => {
      this.setState({ editing: false });
      this.commitEdit();
    };
    this.updateEdit = (e) => {
      if (e.key === "Escape") {
        this.el.textContent = this.state.originalValue;
        this.el.blur();
        return;
      }
      if (e.key === "Enter") {
        this.el.blur();
        return;
      }
    };
    this.commitEdit = () => {
      if (!this.setter)
        return;
      if (this.el.textContent === this.lastEditValue)
        return;
      this.lastEditValue = this.el.textContent;
      const value = this.parse(this.el.textContent);
      if (typeof value === "undefined")
        return;
      if (value === null && !this.props.allowNull)
        return;
      this.setter(value);
    };
    this.startEdit = () => {
      this.lastEditValue = this.el.textContent;
      this.setState({ editing: true, originalValue: this.el.textContent });
    };
    this.frame = 0;
    this.tick = () => {
      if (!this.el) {
        return;
      }
      const every = this.props.every ?? 1;
      if (!this.state.editing && this.frame % every === 0) {
        const value = this.stringify(this.getter());
        if (this.el.textContent !== value)
          this.el.textContent = value;
      }
      this.frame++;
      window.requestAnimationFrame(this.tick);
    };
    this.setRef = (ref) => {
      this.el = ref;
    };
  }
  componentDidMount() {
    this.tick();
  }
  componentWillUnmount() {
  }
  render() {
    const editable = this.props.editable && !!this.setter;
    return /* @__PURE__ */ React.createElement("span", { onFocus: this.startEdit, onBlur: this.stopEdit, onKeyUp: this.updateEdit, onKeyDown: this.updateEdit, onKeyPress: this.updateEdit, onClick: this.startEdit, contentEditable: editable, style: editable ? editStyle : viewStyle, ref: this.setRef });
  }
}
class WatchText extends WatchValue {
  constructor() {
    super(...arguments);
    this.parse = (v) => v;
    this.stringify = (v) => v;
  }
}
class WatchInteger extends WatchValue {
  constructor() {
    super(...arguments);
    this.parse = (v) => {
      const n = parseInt(v);
      return isValidNumber(n) ? n : null;
    };
    this.stringify = (num) => {
      if (typeof num === "number") {
        return num.toFixed(0);
      } else {
        return num || "";
      }
    };
  }
}
class WatchNumber extends WatchValue {
  constructor() {
    super(...arguments);
    this.parse = (v) => {
      const n = parseFloat(v);
      return isValidNumber(n) ? n : null;
    };
    this.stringify = (num) => {
      if (typeof num === "number") {
        return String(num);
      } else {
        return num || "";
      }
    };
  }
}
class WatchBoolean extends WatchValue {
  constructor() {
    super(...arguments);
    this.parse = (v) => {
      if (/(true|false|t|f|1|0)/.test(v)) {
        return v === "true" || v === "t" || v === "1";
      }
    };
    this.stringify = (v) => {
      return v + "";
    };
  }
}
class WatchVec2 extends WatchValue {
  constructor() {
    super(...arguments);
    this.parse = (v) => {
      if (!v)
        return null;
      const xy = v.split(",");
      if (xy.length !== 2)
        return;
      const x = parseFloat(xy[0]);
      const y = parseFloat(xy[1]);
      if (isValidNumber(x) && isValidNumber(y)) {
        return { x, y };
      }
      return null;
    };
    this.stringify = (v) => {
      if (typeof v === "undefined" || v === null) {
        return "";
      } else if (typeof v === "object") {
        const x = typeof v.x === "number" ? v.x.toFixed(1) : v.x || "";
        const y = typeof v.y === "number" ? v.y.toFixed(1) : v.y || "";
        return x + ", " + y;
      } else if (typeof v === "string") {
        return v;
      } else {
        return String(v);
      }
    };
  }
}
const viewStyle = {
  whiteSpace: "nowrap"
};
const editStyle = {
  ...viewStyle,
  display: "inline-block",
  width: "100%",
  borderBottom: "1px solid rgba(255, 255, 255, 0.3)"
};
const SubtreeContext = React.createContext({});
const subtreeStyle = {
  position: "relative",
  color: "#aaa"
};
const Subtree = (props) => {
  const [openState, setOpenState] = React.useState(props.open ?? false);
  const controlled = typeof props.onToggle === "function";
  const open = controlled ? !!props.open : openState;
  const setOpen = controlled ? props.onToggle : setOpenState;
  const context = React.useMemo(() => {
    return { open, setOpen, rowHeight: props.rowHeight };
  }, [open, setOpen, props.rowHeight]);
  return /* @__PURE__ */ React.createElement(SubtreeContext.Provider, { value: context }, /* @__PURE__ */ React.createElement("div", { style: subtreeStyle }, props.children));
};
const headerIconStyle = {
  fontSize: "0.8em",
  marginLeft: "-2px",
  marginRight: "5px"
};
const subtreeBranchStyle = {
  display: "inline-block",
  position: "absolute",
  left: "-0.9em",
  top: "-0.1em",
  width: "0.5em",
  height: "1em",
  borderBottom: "1px solid #aaa"
};
const SubtreeHeader = (props) => {
  const subtree = React.useContext(SubtreeContext);
  const onClick = React.useCallback(() => {
    subtree.setOpen(!subtree.open);
    props.onClick?.();
  }, [subtree.open, subtree.setOpen, props.onClick]);
  const rowStyle = subtree.rowHeight ? { height: subtree.rowHeight, lineHeight: subtree.rowHeight + "px", whiteSpace: "nowrap", overflow: "hidden" } : void 0;
  return /* @__PURE__ */ React.createElement("div", { style: rowStyle }, /* @__PURE__ */ React.createElement("span", { style: subtreeBranchStyle }, " "), subtree.open ? /* @__PURE__ */ React.createElement(FiChevronDown, { style: headerIconStyle }) : /* @__PURE__ */ React.createElement(FiChevronRight, { style: headerIconStyle }), /* @__PURE__ */ React.createElement("a", { onClick }, props.children));
};
const subtreeBodyStyle = {
  borderLeft: "1px solid #aaa",
  paddingLeft: "0.9em",
  marginBottom: "1em"
};
const SubtreeBody = (props) => {
  const subtree = React.useContext(SubtreeContext);
  if (!subtree.open)
    return null;
  const style = subtree.rowHeight ? { ...subtreeBodyStyle, marginBottom: 0 } : subtreeBodyStyle;
  return /* @__PURE__ */ React.createElement("div", { style }, props.children);
};
const pairStyle = {
  display: "flex",
  flexDirection: "row"
};
const Pair = (props) => {
  return /* @__PURE__ */ React.createElement("div", { style: pairStyle }, props.children);
};
const keyStyle = {
  overflow: "hidden",
  flexGrow: 1,
  flexShrink: 1,
  paddingRight: "5px",
  textOverflow: "ellipsis"
};
const PairKey = (props) => {
  return /* @__PURE__ */ React.createElement("div", { style: keyStyle }, props.children);
};
const valueStyle = {
  width: "95px",
  flexGrow: 0,
  flexShrink: 0
};
const PairValue = (props) => {
  return /* @__PURE__ */ React.createElement("div", { style: valueStyle }, props.children);
};
class LiveBodyComponent extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.handleClick = () => {
      const { emit, body } = this.props;
      emit("select-body", { body: getKey(body) });
    };
  }
  render() {
    const { body, selected, selectable, variant, every } = this.props;
    if (!body) {
      return null;
    }
    const label = getLabel(body);
    let showType;
    let showPosition;
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
    return /* @__PURE__ */ React.createElement("span", { className, onClick: selectable ? this.handleClick : null }, label ? "body#" + label : showType && body.getType(), " ", showPosition && /* @__PURE__ */ React.createElement(WatchVec2, { getValue: () => body.getPosition(), every }));
  }
}
const LiveBody = tracked((props) => {
  const { context, emit } = useMiddleware();
  const bodyKey = getKey(props.body);
  const selected = isSelected(context.multiselect?.value, bodyKey);
  return /* @__PURE__ */ React.createElement(LiveBodyComponent, { body: props.body, selectable: props.selectable, variant: props.variant, every: props.every, emit, selected });
});
class LiveFixtureComponent extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.handleClick = () => {
      const { emit, fixture } = this.props;
      emit("select-fixture", {
        fixture: getKey(fixture),
        body: getKey(fixture.getBody())
      });
    };
  }
  render() {
    const { fixture, selected, selectable } = this.props;
    if (!fixture) {
      return null;
    }
    const label = getLabel(fixture);
    let className = "";
    className += selected ? "selected-item " : "";
    className += selectable ? "clickable " : "";
    return /* @__PURE__ */ React.createElement("span", { className, onClick: selectable ? this.handleClick : null }, label ? "fixture#" + label : fixture.getType() ?? "");
  }
}
const LiveFixture = tracked((props) => {
  const { context, emit } = useMiddleware();
  const fixtureKey = getKey(props.fixture);
  const selected = isSelected(context.multiselect?.value, fixtureKey);
  return /* @__PURE__ */ React.createElement(LiveFixtureComponent, { fixture: props.fixture, selectable: props.selectable, emit, selected });
});
const FixtureView = ({ fixture }) => {
  if (!fixture)
    return null;
  return /* @__PURE__ */ React.createElement(Subtree, { open: true }, /* @__PURE__ */ React.createElement(SubtreeHeader, null, /* @__PURE__ */ React.createElement(LiveFixture, { fixture })), /* @__PURE__ */ React.createElement(SubtreeBody, null, /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "label"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchText, { editable: true, getValue: () => getLabel(fixture) }))), /* @__PURE__ */ React.createElement(ShapeView, { fixture }), /* @__PURE__ */ React.createElement(MaterialView, { fixture }), /* @__PURE__ */ React.createElement(FilterView, { fixture })));
};
const MaterialView = tracked(({ fixture }) => {
  const { context } = useMiddleware();
  const editable = context.editable.value;
  if (!fixture)
    return null;
  return /* @__PURE__ */ React.createElement(Subtree, { open: true }, /* @__PURE__ */ React.createElement(SubtreeHeader, null, "material"), /* @__PURE__ */ React.createElement(SubtreeBody, null, /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "density"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => fixture.getDensity() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "friction"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => fixture.getFriction() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "restitution"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => fixture.getRestitution() })))));
});
const FilterView = tracked(({ fixture }) => {
  const { context } = useMiddleware();
  const editable = context.editable.value;
  if (!fixture)
    return null;
  return /* @__PURE__ */ React.createElement(Subtree, null, /* @__PURE__ */ React.createElement(SubtreeHeader, null, "filter"), /* @__PURE__ */ React.createElement(SubtreeBody, null, /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "group index"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchInteger, { editable, getValue: () => fixture.getFilterGroupIndex() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "category bits"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchInteger, { editable, getValue: () => fixture.getFilterCategoryBits() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "mask bits"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchInteger, { editable, getValue: () => fixture.getFilterMaskBits() })))));
});
const ShapeView = ({ fixture }) => {
  const shape = fixture.getShape();
  let comp;
  if (shape.getType() === "circle") {
    comp = /* @__PURE__ */ React.createElement(CircleView, { fixture });
  } else if (shape.getType() === "edge") {
    comp = /* @__PURE__ */ React.createElement(EdgeView, { fixture });
  } else if (shape.getType() === "chain") {
    comp = /* @__PURE__ */ React.createElement(ChainView, { fixture });
  } else if (shape.getType() === "polygon") {
    comp = /* @__PURE__ */ React.createElement(PolygonView, { fixture });
  }
  return comp;
};
const CircleView = tracked(({ fixture }) => {
  const { context } = useMiddleware();
  const editable = context.editable.value;
  const shape = fixture.getShape();
  if (shape.getType() !== "circle")
    return;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "center"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchVec2, { editable, getValue: () => shape.m_p }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "radius"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => shape.m_radius }))));
});
const EdgeView = tracked(({ fixture }) => {
  const { context } = useMiddleware();
  const editable = context.editable.value;
  const shape = fixture.getShape();
  if (shape.getType() !== "edge")
    return;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "vertex1"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchVec2, { editable, getValue: () => shape.m_vertex1 }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "vertex2"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchVec2, { editable, getValue: () => shape.m_vertex2 }))));
});
const ChainView = tracked(({ fixture }) => {
  const { context } = useMiddleware();
  const editable = context.editable.value;
  const shape = fixture.getShape();
  if (shape.getType() !== "chain")
    return;
  return /* @__PURE__ */ React.createElement(Subtree, { open: true }, /* @__PURE__ */ React.createElement(SubtreeHeader, null, "vertices"), /* @__PURE__ */ React.createElement(SubtreeBody, null, shape.m_vertices?.map((v, i) => /* @__PURE__ */ React.createElement(Pair, { key: i }, /* @__PURE__ */ React.createElement(PairKey, null, "[", i, "]"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchVec2, { editable, getValue: () => v }))))));
});
const PolygonView = tracked(({ fixture }) => {
  const { context } = useMiddleware();
  const editable = context.editable.value;
  const shape = fixture.getShape();
  if (shape.getType() !== "polygon")
    return;
  return /* @__PURE__ */ React.createElement(Subtree, { open: true }, /* @__PURE__ */ React.createElement(SubtreeHeader, null, "vertices"), /* @__PURE__ */ React.createElement(SubtreeBody, null, shape.m_vertices?.map((v, i) => /* @__PURE__ */ React.createElement(Pair, { key: i }, /* @__PURE__ */ React.createElement(PairKey, null, "[", i, "]"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchVec2, { editable, getValue: () => v }))))));
});
function VirtualList(props) {
  const { items, rowHeight, visibleRows, rowsOf, keyOf, renderItem } = props;
  const overscan = props.overscan ?? 3;
  const [scrollTop, setScrollTop] = React.useState(0);
  const handleScroll = React.useCallback((ev) => {
    setScrollTop(ev.currentTarget.scrollTop);
  }, []);
  const firstRow = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const lastRow = Math.floor(scrollTop / rowHeight) + visibleRows + overscan;
  let row = 0;
  let start = -1;
  let end = items.length;
  let rowsBefore = 0;
  let rowsAfter = 0;
  for (let i = 0; i < items.length; i++) {
    const rows = rowsOf(items[i], i);
    if (start < 0 && row + rows > firstRow) {
      start = i;
      rowsBefore = row;
    }
    if (start >= 0 && row > lastRow) {
      end = i;
      rowsAfter = totalRows(items, rowsOf) - row;
      break;
    }
    row += rows;
  }
  if (start < 0)
    start = items.length;
  const boxStyle = {
    height: rowHeight * visibleRows,
    overflowY: "auto",
    overflowX: "hidden"
  };
  return /* @__PURE__ */ React.createElement("div", { style: boxStyle, onScroll: handleScroll }, /* @__PURE__ */ React.createElement("div", { style: { height: rowsBefore * rowHeight } }), items.slice(start, end).map((item, i) => /* @__PURE__ */ React.createElement(React.Fragment, { key: keyOf(item, start + i) }, renderItem(item, start + i))), /* @__PURE__ */ React.createElement("div", { style: { height: rowsAfter * rowHeight } }));
}
const totalRows = (items, rowsOf) => {
  let rows = 0;
  for (let i = 0; i < items.length; i++)
    rows += rowsOf(items[i], i);
  return rows;
};
class LiveJointComponent extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.handleClick = () => {
      const { emit, joint } = this.props;
      emit("select-joint", { joint: getKey(joint) });
    };
  }
  render() {
    const { joint, selected, selectable } = this.props;
    if (!joint) {
      return null;
    }
    const label = getLabel(joint);
    let className = "";
    className += selected ? "selected-item " : "";
    className += selectable ? "clickable " : "";
    return /* @__PURE__ */ React.createElement("span", { className, onClick: selectable ? this.handleClick : null }, label ? "joint#" + label : joint.getType() ?? "");
  }
}
const LiveJoint = tracked((props) => {
  const { context, emit } = useMiddleware();
  const jointKey = getKey(props.joint);
  const selected = isSelected(context.multiselect?.value, jointKey);
  return /* @__PURE__ */ React.createElement(LiveJointComponent, { joint: props.joint, selectable: props.selectable, emit, selected });
});
const ROW_HEIGHT = 24;
const VISIBLE_ROWS = 10;
const LIST_EVERY = 10;
const WorldSubtree = tracked(() => {
  const { context, emit } = useMiddleware();
  const world = context.world.value;
  const [, setReload] = React.useState(0);
  const [expanded, setExpanded] = React.useState(() => /* @__PURE__ */ new Set());
  const toggleBody = React.useCallback((key, open) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (open)
        next.add(key);
      else
        next.delete(key);
      return next;
    });
  }, []);
  React.useEffect(() => {
    if (!world)
      return;
    const reload = () => setReload((n) => n + 1);
    world.on("add-body", reload);
    world.on("remove-body", reload);
    world.on("add-fixture", reload);
    world.on("remove-fixture", reload);
    world.on("add-joint", reload);
    world.on("remove-joint", reload);
    reload();
    return () => {
      world.off("add-body", reload);
      world.off("remove-body", reload);
      world.off("add-fixture", reload);
      world.off("remove-fixture", reload);
      world.off("add-joint", reload);
      world.off("remove-joint", reload);
    };
  }, [world]);
  if (!world)
    return null;
  const bodies = bodyArray(world);
  const joints = jointArray(world);
  return /* @__PURE__ */ React.createElement(Tabs, { defaultValue: "bodies" }, /* @__PURE__ */ React.createElement(Tabs.List, null, /* @__PURE__ */ React.createElement(Tabs.Tab, { value: "bodies" }, /* @__PURE__ */ React.createElement(Text, { size: "xs" }, "Bodies")), /* @__PURE__ */ React.createElement(Tabs.Tab, { value: "joints" }, /* @__PURE__ */ React.createElement(Text, { size: "xs" }, "Joints"))), /* @__PURE__ */ React.createElement(Tabs.Panel, { value: "bodies" }, /* @__PURE__ */ React.createElement(Subtree, { open: true }, /* @__PURE__ */ React.createElement(SubtreeHeader, null, "bodies ", bodies.length), /* @__PURE__ */ React.createElement(SubtreeBody, null, /* @__PURE__ */ React.createElement(VirtualList, { items: bodies, rowHeight: ROW_HEIGHT, visibleRows: VISIBLE_ROWS, keyOf: (body) => getKey(body), rowsOf: (body) => 1 + (expanded.has(getKey(body)) ? fixtureCount(body) : 0), renderItem: (body) => {
    const key = getKey(body);
    return /* @__PURE__ */ React.createElement(Subtree, { open: expanded.has(key), onToggle: (open) => toggleBody(key, open), rowHeight: ROW_HEIGHT }, /* @__PURE__ */ React.createElement(SubtreeHeader, { onClick: () => emit("select-body", { body: key }) }, /* @__PURE__ */ React.createElement(LiveBody, { body, every: LIST_EVERY })), /* @__PURE__ */ React.createElement(SubtreeBody, null, fixtureArray(body).map((fixture) => /* @__PURE__ */ React.createElement(Subtree, { key: getKey(fixture), rowHeight: ROW_HEIGHT }, /* @__PURE__ */ React.createElement(SubtreeHeader, { onClick: () => emit("select-fixture", {
      fixture: getKey(fixture),
      body: key
    }) }, /* @__PURE__ */ React.createElement(LiveFixture, { fixture }))))));
  } })))), /* @__PURE__ */ React.createElement(Tabs.Panel, { value: "joints" }, /* @__PURE__ */ React.createElement(Subtree, { open: true }, /* @__PURE__ */ React.createElement(SubtreeHeader, null, "joints ", joints.length), /* @__PURE__ */ React.createElement(SubtreeBody, null, /* @__PURE__ */ React.createElement(VirtualList, { items: joints, rowHeight: ROW_HEIGHT, visibleRows: VISIBLE_ROWS, keyOf: (joint) => getKey(joint), rowsOf: () => 1, renderItem: (joint) => /* @__PURE__ */ React.createElement(Subtree, { rowHeight: ROW_HEIGHT }, /* @__PURE__ */ React.createElement(SubtreeHeader, { onClick: () => emit("select-joint", { joint: getKey(joint) }) }, /* @__PURE__ */ React.createElement(LiveJoint, { joint }))) })))));
});
const WorldEdit = tracked(() => {
  const { context } = useMiddleware();
  const editable = context.editable.value;
  const world = context.world.value;
  if (!world)
    return null;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Subtree, { open: true }, /* @__PURE__ */ React.createElement(SubtreeHeader, null, "world"), /* @__PURE__ */ React.createElement(SubtreeBody, null, /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "gravity"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchVec2, { editable, getValue: () => world.getGravity() }))))));
});
function bodyArray(world) {
  const list = [];
  for (let body = world.getBodyList(); body; body = body.getNext()) {
    list.push(body);
  }
  return list;
}
function fixtureCount(body) {
  let count = 0;
  for (let fix = body.getFixtureList(); fix; fix = fix.getNext())
    count++;
  return count;
}
function fixtureArray(body) {
  const list = [];
  for (let fix = body.getFixtureList(); fix; fix = fix.getNext()) {
    list.push(fix);
  }
  return list;
}
function jointArray(world) {
  const list = [];
  for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
    list.push(joint);
  }
  return list;
}
const BodyView = tracked(({ body }) => {
  const { context } = useMiddleware();
  const editable = context.editable.value;
  if (!body)
    return null;
  return /* @__PURE__ */ React.createElement(Subtree, { open: true }, /* @__PURE__ */ React.createElement(SubtreeHeader, null, /* @__PURE__ */ React.createElement(LiveBody, { body })), /* @__PURE__ */ React.createElement(SubtreeBody, null, /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "label"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchText, { editable, getValue: () => getLabel(body) }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "type"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchText, { editable, getValue: () => body.getType() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "bullet"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchBoolean, { editable, getValue: () => body.isBullet() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "position"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchVec2, { editable, getValue: () => body.getPosition() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "angle"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => body.getAngle() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "linearVelocity"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchVec2, { editable, getValue: () => body.getLinearVelocity() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "angularVelocity"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => body.getAngularVelocity() }))), fixtureArray(body).map((fix) => /* @__PURE__ */ React.createElement(FixtureView, { fixture: fix, key: getKey(fix) }))));
});
const JointView = tracked(({ joint }) => {
  const { context, emit } = useMiddleware();
  const editable = context.editable.value;
  if (!joint)
    return null;
  const type = joint.getType();
  return /* @__PURE__ */ React.createElement(Subtree, { open: true }, /* @__PURE__ */ React.createElement(SubtreeHeader, { onClick: () => emit("select-joint", { joint: getKey(joint) }) }, /* @__PURE__ */ React.createElement(LiveJoint, { joint })), /* @__PURE__ */ React.createElement(SubtreeBody, null, /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "type"), /* @__PURE__ */ React.createElement(PairValue, null, type)), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "collideConnected"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchBoolean, { editable, getValue: () => joint.getCollideConnected() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "label"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchText, { editable, getValue: () => getLabel(joint) }))), type === "distance-joint" && /* @__PURE__ */ React.createElement(EditDistanceJoint, { editable, joint }), type === "rope-joint" && /* @__PURE__ */ React.createElement(EditRopeJoint, { editable, joint }), type === "friction-joint" && /* @__PURE__ */ React.createElement(EditFrictionJoint, { editable, joint }), type === "prismatic-joint" && /* @__PURE__ */ React.createElement(EditPrismaticJoint, { editable, joint }), type === "revolute-joint" && /* @__PURE__ */ React.createElement(EditRevoluteJoint, { editable, joint }), type === "weld-joint" && /* @__PURE__ */ React.createElement(EditWeldJoint, { editable, joint }), type === "wheel-joint" && /* @__PURE__ */ React.createElement(EditWheelJoint, { editable, joint }), type === "motor-joint" && /* @__PURE__ */ React.createElement(EditMotorJoint, { editable, joint }), type === "pulley-joint" && /* @__PURE__ */ React.createElement(EditPulleyJoint, { editable, joint })));
});
const EditBodies = tracked(({ joint, noAnchors }) => {
  const { context } = useMiddleware();
  const editable = context.editable.value;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "bodyA"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(LiveBody, { variant: "short", body: joint.getBodyA(), selectable: false }))), !noAnchors && /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "localAnchorA"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchVec2, { editable, getValue: () => joint.getAnchorA() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "bodyB"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(LiveBody, { variant: "short", body: joint.getBodyB(), selectable: false }))), !noAnchors && /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "localAnchorB"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchVec2, { editable, getValue: () => joint.getAnchorA() }))));
});
const EditDistanceJoint = ({ editable, joint }) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(EditBodies, { joint }), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "length"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, allowNull: true, getValue: () => joint.getLength() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "frequencyHz"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getFrequency() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "dampingRatio"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getDampingRatio() }))));
};
const EditRopeJoint = ({ editable, joint }) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(EditBodies, { joint }), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "maxLength"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getMaxLength() }))));
};
const EditFrictionJoint = ({ editable, joint }) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(EditBodies, { joint }), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "maxForce"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getMaxForce() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "maxTorque"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getMaxTorque() }))));
};
const EditPrismaticJoint = ({ editable, joint }) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(EditBodies, { joint }), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "localAxisA"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchVec2, { editable, getValue: () => joint.getLocalAxisA() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "enableLimit"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchBoolean, { editable, getValue: () => joint.isLimitEnabled() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "lowerTranslation"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getLowerLimit() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "upperTranslation"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getUpperLimit() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "enableMotor"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchBoolean, { editable, getValue: () => joint.isLimitEnabled() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "maxMotorForce"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getMaxMotorForce() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "motorSpeed"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getMotorSpeed() }))));
};
const EditRevoluteJoint = ({ editable, joint }) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(EditBodies, { joint }), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "enableLimit"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchBoolean, { editable, getValue: () => joint.isLimitEnabled() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "lowerAngle"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getLowerLimit() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "upperAngle"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getUpperLimit() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "enableMotor"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchBoolean, { editable, getValue: () => joint.isMotorEnabled() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "maxMotorTorque"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getMaxMotorTorque() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "motorSpeed"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getMotorSpeed() }))));
};
const EditWeldJoint = ({ editable, joint }) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(EditBodies, { joint }), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "referenceAngle"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getReferenceAngle() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "frequencyHz"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getFrequency() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "dampingRatio"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getDampingRatio() }))));
};
const EditWheelJoint = ({ editable, joint }) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(EditBodies, { joint }), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "localAxisA"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchVec2, { editable, getValue: () => joint.getLocalAxisA() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "springFrequencyHz"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getSpringFrequencyHz() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "springDampingRatio"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getSpringDampingRatio() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "enableMotor"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchBoolean, { editable, getValue: () => joint.isMotorEnabled() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "maxMotorTorque"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getMaxMotorTorque() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "motorSpeed"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getMotorSpeed() }))));
};
const EditMotorJoint = ({ editable, joint }) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(EditBodies, { joint, noAnchors: true }), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "linearOffset"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchVec2, { editable, getValue: () => joint.getLinearOffset() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "angularOffset"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getAngularOffset() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "maxForce"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getMaxForce() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "maxTorque"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getMaxForce() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "correctionFactor"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getCorrectionFactor() }))));
};
const EditPulleyJoint = ({ editable, joint }) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(EditBodies, { joint }), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "groundAnchorA"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchVec2, { editable, getValue: () => joint.getGroundAnchorA() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "groundAnchorB"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchVec2, { editable, getValue: () => joint.getGroundAnchorB() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "lengthA"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, allowNull: true, getValue: () => joint.getLengthA() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "lengthB"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, allowNull: true, getValue: () => joint.getLengthB() }))), /* @__PURE__ */ React.createElement(Pair, null, /* @__PURE__ */ React.createElement(PairKey, null, "ratio"), /* @__PURE__ */ React.createElement(PairValue, null, /* @__PURE__ */ React.createElement(WatchNumber, { editable, getValue: () => joint.getRatio() }))));
};
const SelectionView = tracked(() => {
  const { context } = useMiddleware();
  const world = context.world?.value;
  if (!world)
    return;
  const multiselect = context.multiselect?.value;
  if (multiselect?.selected.length > 0) {
    return multiselect.selected.map((selection) => {
      if (selection?.type === "fixture") {
        if (selection.up?.type === "body") {
          const fixture = findFixture(world, selection.key);
          const body = findBody(world, selection.up.key);
          return /* @__PURE__ */ React.createElement(BodyView, { body, fixture });
        } else {
          const fixture = findFixture(world, selection.key);
          return /* @__PURE__ */ React.createElement(FixtureView, { fixture });
        }
      }
      if (selection?.type === "body") {
        const body = findBody(world, selection.key);
        return /* @__PURE__ */ React.createElement(BodyView, { body });
      }
      if (selection?.type === "joint") {
        const joint = findJoint(world, selection.key);
        return /* @__PURE__ */ React.createElement(JointView, { joint });
      }
    });
  }
  return /* @__PURE__ */ React.createElement(WorldEdit, null);
});
const LiveOutlinePanel = tracked(() => {
  const { context } = useMiddleware();
  if (context.activity?.value !== "mode:play")
    return;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Group, { justify: "end", gap: 8, m: 8 }), /* @__PURE__ */ React.createElement(OutlineSection, null, /* @__PURE__ */ React.createElement(SelectionView, null)), /* @__PURE__ */ React.createElement(OutlineSection, null, /* @__PURE__ */ React.createElement(WorldSubtree, null)));
});
const affixStyle = {
  width: 290,
  overflowY: "auto",
  background: "#1e1e1e",
  borderLeft: "1px solid #333"
};
const affixPosition = {
  right: 0,
  top: 0,
  bottom: 0
};
const panelStyle = {
  fontSize: "0.9em",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "12px"
};
const OutlineComponent = tracked((props) => {
  const context = runtime.value?.context;
  if (!context?.showOutline?.value)
    return null;
  return /* @__PURE__ */ React.createElement(Affix, { position: affixPosition, style: { ...affixStyle, paddingTop: (props.top ?? 0) + "px" } }, /* @__PURE__ */ React.createElement("div", { style: panelStyle }, /* @__PURE__ */ React.createElement(LiveOutlinePanel, null)));
});
const TOOLBAR_HEIGHT = 46;
const ShellLayout = (props) => {
  const toolbar = props.toolbar ?? true;
  useEffect(() => {
    return effect(() => {
      if (!runtime?.value)
        return;
      const el = runtime?.value.context.containerElement?.value;
      if (!el)
        return;
      const showOutline = runtime.value.context.showOutline?.value;
      el.style.top = toolbar ? TOOLBAR_HEIGHT + "px" : "0px";
      el.style.right = showOutline ? "290px" : "0px";
    });
  }, [toolbar]);
  return /* @__PURE__ */ React.createElement(IconContext.Provider, { value: { className: "svg-icon" } }, /* @__PURE__ */ React.createElement(MantineProvider, { theme, defaultColorScheme: "dark" }, toolbar && /* @__PURE__ */ React.createElement(ToolbarComponent, null), /* @__PURE__ */ React.createElement(OutlineComponent, { top: toolbar ? TOOLBAR_HEIGHT : 0 })));
};
let root;
function renderShell(id, props = {}) {
  const container = document.getElementById(id);
  if (!container) {
    console.log("Element not found: ", id);
    return;
  }
  if (root)
    return;
  root = createRoot(container);
  root.render(/* @__PURE__ */ React.createElement(ShellLayout, { ...props }));
}
export {
  renderShell
};
//# sourceMappingURL=shell.mjs.map
