import * as Stage from "stage-js";
import { Middleware, Memo } from "polymatic";

import {
  type World,
  type Fixture,
  type Body,
  type EdgeShape,
  type PolygonShape,
  type ChainShape,
  type Joint,
  PulleyJoint,
  CircleShape,
} from "../";

import { ComputedJointStyle, ComputedShapeStyle } from "./ComputedStyle";
import { ChainShapeComponent } from "./ChainComponent";
import { CircleShapeComponent } from "./CircleComponent";
import { EdgeShapeComponent } from "./EdgeComponent";
import { PolygonShapeComponent } from "./PolygonComponent";
import { JointComponent } from "./JointComponent";
import { PulleyJointComponent } from "./PulleyComponent";
import { BodyComponent } from "./BodyComponent";
import { ContextStyle } from "../testbed/TestbedContext";

interface WorldViewContext {
  world: World;
  stage: Stage.Root;
  style?: ContextStyle;
}

/**
 * Render the world in the stage.
 */
export class WorldView extends Middleware<WorldViewContext> {
  component: Stage.Node | null = null;
  setupMemo = Memo.init();

  constructor() {
    super();
    this.on("activate", this.handleContextChange);
    this.on("context-change", this.handleContextChange);
    this.on("deactivate", this.handleDeactivate);

    this.on("world-edited", this.handleWorldEdited);
    this.on("frame-render", this.handleTick);
  }

  handleContextChange = () => {
    const stage = this.context.stage;
    const world = this.context.world;

    if (!this.setupMemo.update(stage, world)) return;

    if (this.component) {
      // todo: do we need to reset anything else?
      this.component.remove();
      this.component = null;
    }

    if (stage) {
      this.component = new Stage.Node();
      this.component.prependTo(stage);
      if (world) {
        this.setWorld(world);
      }
    }
  };

  handleDeactivate = () => {
    if (this.component) {
      this.component.remove();
    }
    this.component = null;
    this.setupMemo.clear();
  };

  // world-edited
  handleWorldEdited = () => {
    if (this.component) this.rerenderWorld();
  };

  private world: World;

  private bodies = new WeakMap<Body, Stage.Node>();
  private shapes = new WeakMap<Fixture, Stage.Node>();
  private joints = new WeakMap<Joint, Stage.Node>();

  handleTick = () => {
    this.renderWorld();
  };

  setWorld = (world: World) => {
    if (this.world === world) {
      return;
    }

    if (this.world) {
      // off
      this.world.off("remove-body", this.removeBody);
      this.world.off("remove-fixture", this.removeShape);
      this.world.off("remove-joint", this.removeJoint);
    }
    this.world = world;
    if (this.world) {
      // on
      this.world.on("remove-body", this.removeBody);
      this.world.on("remove-fixture", this.removeShape);
      this.world.on("remove-joint", this.removeJoint);
    }

    this.component.empty();
    this.bodies = new WeakMap();
    this.shapes = new WeakMap();
    this.joints = new WeakMap();
    this.renderWorld();
  };

  removeShape = (obj: Fixture) => {
    this.shapes.get(obj)?.remove();
    this.shapes.delete(obj);
  };

  removeBody = (obj: Body) => {
    this.bodies.get(obj)?.remove();
    this.bodies.delete(obj);
  };

  removeJoint = (obj: Joint) => {
    this.joints.get(obj)?.remove();
    this.joints.delete(obj);
  };

  rerenderWorld = () => {
    this.renderWorld(true);
  };

  renderWorld = (clearCache = false) => {
    if (clearCache === true) {
      this.component.empty();
      this.shapes = new WeakMap();
      this.bodies = new WeakMap();
      this.joints = new WeakMap();
    }

    if (!this.world) return;

    const world = this.world;
    for (let b = world.getBodyList(); b; b = b.getNext()) {
      this.renderBody(b);
    }
    for (let j = world.getJointList(); j; j = j.getNext()) {
      this.renderJoint(j);
    }
  };

  renderBody(body: Body) {
    let bodyComponent = this.bodies.get(body);

    if (!bodyComponent) {
      bodyComponent = new BodyComponent(body);
      bodyComponent.appendTo(this.component);
      this.bodies.set(body, bodyComponent);
    }

    for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
      this.renderFixture(bodyComponent, body, fixture);
    }
  }

  renderFixture(bodyComponent: Stage.Node, body: Body, fixture: Fixture) {
    let shapeComponent = this.shapes.get(fixture);

    if (shapeComponent) {
      return;
    }

    const type = fixture.getType();
    const shape = fixture.getShape();

    const style = new ComputedShapeStyle(body, fixture, this.context.style);

    if (type == "circle") {
      shapeComponent = new CircleShapeComponent(shape as CircleShape, style);
    } else if (type == "edge") {
      shapeComponent = new EdgeShapeComponent(shape as EdgeShape, style);
    } else if (type == "polygon") {
      shapeComponent = new PolygonShapeComponent(shape as PolygonShape, style);
    } else if (type == "chain") {
      shapeComponent = new ChainShapeComponent(shape as ChainShape, style);
    } else {
      // console.warn("Unknown fixture type", type);
      return;
    }

    shapeComponent.appendTo(bodyComponent);
    this.shapes.set(fixture, shapeComponent);
  }

  renderJoint(joint: Joint) {
    let component = this.joints.get(joint);

    if (component) {
      return;
    }

    const type = joint.getType();

    const style = new ComputedJointStyle(joint, this.context.style);

    if (type == PulleyJoint.TYPE) {
      component = new PulleyJointComponent(joint as PulleyJoint, style);
    } else {
      component = new JointComponent(joint, style);
    }

    component.appendTo(this.component);
    this.joints.set(joint, component);
  }
}
