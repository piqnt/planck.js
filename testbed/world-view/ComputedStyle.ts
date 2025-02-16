import type { Joint, Fixture, Body, Shape } from "../";

export interface ComputedStyle {
  stroke: string;
  fill: string;
  lineWidth: number;
}

export interface ProvidedStyle {
  stroke?: string;
  fill?: string;
  lineWidth?: number;
}

const SHAPE_DEFAULTS = {
  stroke: "rgba(255,255,255,0.9)",
  fill: "rgba(255,255,255,0.1)",
  lineWidth: 3,
};

const JOINT_DEFAULTS = {
  stroke: "rgba(255,255,255,0.9)",
  fill: null,
  lineWidth: 3,
};

function getStyle(obj: Body | Fixture | Joint | Shape): ProvidedStyle {
  if (typeof obj["render"] === "object" && ("stroke" in obj["render"] || "fill" in obj["render"])) {
    // this was used in planck before v1
    return obj["render"];
  } else if (typeof obj["style"] === "object") {
    return obj["style"];
  }
}

export class ComputedShapeStyle implements ComputedStyle {
  body: Body;
  fixture: Fixture;
  global?: ProvidedStyle;

  constructor(body: Body, fixture: Fixture, global?: ProvidedStyle) {
    this.body = body;
    this.fixture = fixture;
    this.global = global;
  }

  get stroke() {
    const shapeStyle = getStyle(this.fixture.getShape());
    const fixtureStyle = getStyle(this.fixture);
    const bodyStyle = getStyle(this.body);

    let stroke = SHAPE_DEFAULTS.stroke;
    if (shapeStyle?.stroke) {
      stroke = shapeStyle.stroke;
    } else if (fixtureStyle?.stroke) {
      stroke = fixtureStyle.stroke;
    } else if (bodyStyle?.stroke) {
      stroke = bodyStyle.stroke;
    } else if (this.global?.stroke) {
      stroke = this.global.stroke;
    } else if (this.body.isDynamic()) {
      stroke = "rgba(255,255,255,0.9)";
    } else if (this.body.isKinematic()) {
      stroke = "rgba(255,255,255,0.8)";
    } else if (this.body.isStatic()) {
      stroke = "rgba(255,255,255,0.7)";
    }
    return stroke;
  }

  get fill() {
    const shapeStyle = getStyle(this.fixture.getShape());
    const fixtureStyle = getStyle(this.fixture);
    const bodyStyle = getStyle(this.body);
    let fill = SHAPE_DEFAULTS.fill;
    if (shapeStyle?.fill) {
      fill = shapeStyle.fill;
    } else if (fixtureStyle?.fill) {
      fill = fixtureStyle.fill;
    } else if (bodyStyle?.fill) {
      fill = bodyStyle.fill;
    } else if (this.global?.fill) {
      fill = this.global.fill;
    }
    return fill;
  }

  get lineWidth() {
    const shapeStyle = getStyle(this.fixture.getShape());
    const fixtureStyle = getStyle(this.fixture);
    const bodyStyle = getStyle(this.body);
    let lineWidth = SHAPE_DEFAULTS.lineWidth;
    if (shapeStyle?.lineWidth) {
      lineWidth = shapeStyle.lineWidth;
    } else if (fixtureStyle?.lineWidth) {
      lineWidth = fixtureStyle.lineWidth;
    } else if (bodyStyle?.lineWidth) {
      lineWidth = bodyStyle.lineWidth;
    } else if (this.global?.lineWidth) {
      lineWidth = this.global.lineWidth;
    }
    return lineWidth;
  }
}

export class ComputedJointStyle implements ComputedStyle {
  joint: Joint;
  global?: ProvidedStyle;

  constructor(joint: Joint, global?: ProvidedStyle) {
    this.joint = joint;
    this.global = global;
  }

  get stroke() {
    const jointStyle = getStyle(this.joint);

    let stroke = JOINT_DEFAULTS.stroke;
    if (jointStyle?.stroke) {
      stroke = jointStyle.stroke;
    } else if (this.global?.stroke) {
      stroke = this.global.stroke;
    }
    return stroke;
  }

  get fill() {
    const jointStyle = getStyle(this.joint);

    let fill = JOINT_DEFAULTS.fill;
    if (jointStyle?.fill) {
      fill = jointStyle.fill;
    } else if (this.global?.fill) {
      fill = this.global.fill;
    }
    return fill;
  }

  get lineWidth() {
    const jointStyle = getStyle(this.joint);

    let lineWidth = JOINT_DEFAULTS.lineWidth;
    if (jointStyle?.lineWidth) {
      lineWidth = jointStyle.lineWidth;
    } else if (this.global?.lineWidth) {
      lineWidth = this.global.lineWidth;
    }
    return lineWidth;
  }
}
