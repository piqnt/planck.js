import * as Stage from "stage-js";
import {
  Vec2,
  AABB,
  type Vec2Value,
  type World,
  type Fixture,
  type Body,
  type EdgeShape,
  type PolygonShape,
  type ChainShape,
  type Joint,
  PulleyJoint,
  DistanceInput,
  CircleShape,
  Transform,
  SimplexCache,
  DistanceOutput,
  Distance,
} from "../";

import { ComputedJointStyle, ComputedShapeStyle } from "./ComputedStyle";
import { ChainShapeComponent } from "./ChainShapeComponent";
import { CircleShapeComponent } from "./CircleShapeComponent";
import { EdgeShapeComponent } from "./EdgeShapeComponent";
import { PolygonShapeComponent } from "./PolygonShapeComponent";
import { JointComponent } from "./JointComponent";
import { PulleyJointComponent } from "./PulleyJointComponent";
import { BodyComponent } from "./BodyComponent";
import { WorldEventHandler } from "./WorldComponentTypes";

const math_abs = Math.abs;

// todo: remove this
const HIT_RADIUS_PIXEL = 10;

const DEFAULTS = {
  speed: 1,
  hz: 60,
};

export interface WorldComponentContext {
  speed?: number;
  hz?: number;
  paused?: boolean;

  stroke?: string;
  fill?: string;
  lineWidth?: number;
}

export class WorldComponent extends Stage.Node {
  private context: WorldComponentContext;
  private emit: WorldEventHandler;

  private world: World;

  private bodies = new WeakMap<Body, Stage.Node>();
  private shapes = new WeakMap<Fixture, Stage.Node>();
  private joints = new WeakMap<Joint, Stage.Node>();

  constructor(context: WorldComponentContext, emit?: WorldEventHandler) {
    super();

    this.context = context;
    this.emit = emit;

    this.attr("spy", true);
    this.on(Stage.POINTER_DOWN, this.handlePointerDown);
    this.on(Stage.POINTER_MOVE, this.handlePointerMove);
    this.on(Stage.POINTER_UP, this.handlePointerUp);
    this.on(Stage.POINTER_CANCEL, this.handlePointerCancel);

    this.tick(this.handleTick, true);
  }

  // todo: move this to root component?
  getHitRadius = () => {
    const pixelPerUnit = this.getLogicalPixelRatio();
    const hitRadius = HIT_RADIUS_PIXEL / pixelPerUnit;
    return hitRadius;
  };

  private timeBuffer = 0;
  private stepErrored = false;

  handleTick = (dt: number) => {
    if (!this.world) return false;
    if (this.stepErrored) return false;
    if (this.context.paused) return false;

    const speed = this.context.speed ?? DEFAULTS.speed;
    let hz = this.context.hz ?? DEFAULTS.hz;
    if (math_abs(hz) < 1) {
      hz = 1 / hz;
    }

    const timeStep = 1 / hz;
    try {
      dt = dt * 0.001 * speed;
      this.timeBuffer += dt;
      while (this.timeBuffer > timeStep) {
        this.world.step(timeStep);
        this.timeBuffer -= timeStep;
      }
      this.renderWorld();
      return true;
    } catch (error) {
      this.stepErrored = true;
      console.error(error);
      return false;
    }
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

    this.empty();
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
      this.empty();
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
      bodyComponent.appendTo(this);
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

    const style = new ComputedShapeStyle(body, fixture, this.context);

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

    const style = new ComputedJointStyle(joint, this.context);

    if (type == PulleyJoint.TYPE) {
      component = new PulleyJointComponent(joint as PulleyJoint, style);
    } else {
      component = new JointComponent(joint, style);
    }

    component.appendTo(this);
    this.joints.set(joint, component);
  }

  private pointerStart = { x: 0, y: 0 };
  private pointerLast = { x: 0, y: 0 };
  private pointerDragged = false;
  private pointerDown = false;

  private handlePointerDown = (point: Vec2Value) => {
    if (!this.world) return;

    const fixture = this.findFixture(point);

    this.emit?.("world-pointer-down", {
      point,
      fixture,
      background: !fixture,
    });

    this.pointerStart.x = point.x;
    this.pointerStart.y = point.y;
    this.pointerLast.x = point.x;
    this.pointerLast.y = point.y;

    this.pointerDown = true;
    this.pointerDragged = false;
  };

  private handlePointerMove = (point: Vec2Value) => {
    if (!this.world) return;

    this.emit?.("world-pointer-move", {
      point,
    });

    if (!this.pointerDown) return;

    const move = {
      x: point.x - this.pointerStart.x,
      y: point.y - this.pointerStart.y,
    };
    const delta = {
      x: point.x - this.pointerLast.x,
      y: point.y - this.pointerLast.y,
    };

    if (this.pointerDragged) {
      this.pointerLast.x = point.x;
      this.pointerLast.y = point.y;
      this.emit?.("world-drag-move", {
        point,
        delta,
        move,
      });
    } else if (move.x !== 0 || move.y !== 0) {
      this.pointerDragged = true;

      const fixture = this.findFixture(point);
      this.emit?.("world-drag-start", {
        point,
        fixture,
        background: !fixture,
      });
    }
  };

  private handlePointerUp = (point: Vec2Value) => {
    if (!this.world) return;

    this.emit?.("world-pointer-up", {
      point,
    });

    if (!this.pointerDown) return;

    this.pointerDown = false;

    const move = {
      x: point.x - this.pointerStart.x,
      y: point.y - this.pointerStart.y,
    };
    const delta = {
      x: point.x - this.pointerLast.x,
      y: point.y - this.pointerLast.y,
    };
    this.pointerLast.x = point.x;
    this.pointerLast.y = point.y;

    if (this.pointerDragged) {
      this.emit?.("world-drag-end", {
        point,
      });
      return;
    }

    const fixture = this.findFixture(point);
    this.emit?.("world-click", {
      point,
      fixture,
      background: !fixture,
    });
  };

  private handlePointerCancel = () => {
    if (!this.world) return;

    this.emit?.("world-pointer-cancel");

    if (!this.pointerDown) return;

    this.pointerDown = false;

    if (this.pointerDragged) {
      this.emit?.("world-drag-cancel");
    }
  };

  findFixture = (point: Vec2Value, filter?: (fixture: Fixture) => boolean) => {
    const radius = this.getHitRadius();
    const fixture = findFixture(this.world, point, radius, filter);
    return fixture;
  };
}

export function findFixture(world: World, point: Vec2Value, radius: number, filter?: (fixture: Fixture) => boolean) {
  let bestFixture: Fixture | undefined;
  let bestDistance = radius;

  const aabb = new AABB(point, point).extend(radius);

  const distanceInput = new DistanceInput();
  distanceInput.useRadii = true;
  distanceInput.proxyB.set(new CircleShape(0.00001), 0);
  distanceInput.transformB.set(new Transform(point));

  world.queryAABB(aabb, function (fixture) {
    if (filter && !filter(fixture)) {
      return true;
    }

    if (fixture.testPoint(point)) {
      bestFixture = fixture;
      bestDistance = 0;
      return true;
    }

    for (let childIndex = fixture.getShape().getChildCount(); childIndex >= 0; childIndex--) {
      distanceInput.proxyA.set(fixture.getShape(), childIndex);
      distanceInput.transformA.set(fixture.getBody().getTransform());

      const cache = new SimplexCache();
      const output = new DistanceOutput();

      Distance(output, cache, distanceInput);

      const distance = Vec2.distance(output.pointA, output.pointB);

      if (distance < bestDistance) {
        bestFixture = fixture;
        bestDistance = distance;
      }
    }

    return bestDistance == 0 ? false : true;
  });

  return bestFixture;
}
