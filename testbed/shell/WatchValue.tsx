import React, { KeyboardEvent } from "react";

interface Vec2Value {
  x: number;
  y: number;
}

function isValidNumber(n) {
  return typeof n === "number" && isFinite(n) && !isNaN(n);
}

interface WatchValueProps<T> {
  editable?: boolean;

  setValue?: (v: T) => void;
  getValue?: () => T;

  allowNull?: boolean;

  /** shown again every this many frames; 1 (every frame) unless set */
  every?: number;
}

interface WatchValueState {
  originalValue?: string;
  editing?: boolean;
}

abstract class WatchValue<T> extends React.Component<WatchValueProps<T>, WatchValueState> {
  state: WatchValueState = {};

  lastEditValue: string;

  abstract stringify: (v: T) => string;
  abstract parse: (v: string) => T;

  setter = (v: T) => {
    this.props.setValue?.(v);
  };

  getter = () => {
    if (this.props.getValue) {
      return this.props.getValue?.();
    }
  };

  el: HTMLSpanElement;

  componentDidMount() {
    this.tick();
  }

  componentWillUnmount() {}

  stopEdit = () => {
    this.setState({ editing: false });
    this.commitEdit();
  };

  updateEdit = (e: KeyboardEvent) => {
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

  commitEdit = () => {
    if (!this.setter) return;
    if (this.el.textContent === this.lastEditValue) return;
    this.lastEditValue = this.el.textContent;
    const value = this.parse(this.el.textContent);
    if (typeof value === "undefined") return;
    if (value === null && !this.props.allowNull) return;
    this.setter(value);
  };

  startEdit = () => {
    this.lastEditValue = this.el.textContent;
    this.setState({ editing: true, originalValue: this.el.textContent });
  };

  frame = 0;

  tick = () => {
    if (!this.el) {
      return;
    }
    const every = this.props.every ?? 1;
    if (!this.state.editing && this.frame % every === 0) {
      const value = this.stringify(this.getter());
      if (this.el.textContent !== value) this.el.textContent = value;
    }
    this.frame++;
    window.requestAnimationFrame(this.tick);
  };

  setRef = (ref: HTMLSpanElement) => {
    this.el = ref;
  };

  render() {
    const editable = this.props.editable && !!this.setter;
    return (
      <span
        onFocus={this.startEdit}
        onBlur={this.stopEdit}
        onKeyUp={this.updateEdit}
        onKeyDown={this.updateEdit}
        onKeyPress={this.updateEdit}
        onClick={this.startEdit}
        contentEditable={editable}
        style={editable ? editStyle : viewStyle}
        ref={this.setRef}
      />
    );
  }
}

export class WatchText extends WatchValue<string> {
  parse = (v: string) => v;
  stringify = (v: string) => v;
}

export class WatchInteger extends WatchValue<number> {
  parse = (v: string) => {
    const n = parseInt(v);
    return isValidNumber(n) ? n : null;
  };
  stringify = (num: number) => {
    if (typeof num === "number") {
      return num.toFixed(0);
    } else {
      return num || "";
    }
  };
}

export class WatchNumber extends WatchValue<number> {
  parse = (v: string) => {
    const n = parseFloat(v);
    return isValidNumber(n) ? n : null;
  };
  stringify = (num: number) => {
    if (typeof num === "number") {
      return String(num);
    } else {
      return num || "";
    }
  };
}

export class WatchBoolean extends WatchValue<boolean> {
  parse = (v: string) => {
    if (/(true|false|t|f|1|0)/.test(v)) {
      return v === "true" || v === "t" || v === "1";
    }
  };
  stringify = (v: boolean) => {
    return v + "";
  };
}

export class WatchVec2 extends WatchValue<Vec2Value> {
  parse = (v: string) => {
    if (!v) return null;
    const xy = v.split(",");
    if (xy.length !== 2) return;
    const x = parseFloat(xy[0]);
    const y = parseFloat(xy[1]);
    if (isValidNumber(x) && isValidNumber(y)) {
      return { x, y };
    }
    return null;
  };
  stringify = (v: Vec2Value) => {
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

const viewStyle: React.CSSProperties = {
  whiteSpace: "nowrap",
};

const editStyle: React.CSSProperties = {
  ...viewStyle,
  display: "inline-block",
  width: "100%",
  borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
};
