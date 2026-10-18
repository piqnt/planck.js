import { type World, type Fixture, type Joint, type Body } from "planck";
import { getLabel } from "./FindLabel";

type LookupResult = Body | Fixture | Joint;

export const findOne = (world: World, query: string): LookupResult | null => {
  if (query.indexOf("#")) {
    const [type, label] = query.split("#", 2);
    if (type === "body") {
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        if (getLabel(body) === label) {
          return body;
        }
      }
    } else if (type === "fixture") {
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
          if (getLabel(fixture) === label) {
            return fixture;
          }
        }
      }
    } else if (type === "joint") {
      for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
        if (getLabel(joint) === label) {
          return joint;
        }
      }
    }
  }
  return null;
};

export const findAll = (world: World, query: string): LookupResult[] => {
  const result: LookupResult[] = [];
  if (query.indexOf("#")) {
    const [type, label] = query.split("#", 2);
    if (type === "body") {
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        if (getLabel(body) === label) {
          result.push(body);
        }
      }
    } else if (type === "fixture") {
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
          if (getLabel(fixture) === label) {
            result.push(fixture);
          }
        }
      }
    } else if (type === "joint") {
      for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
        if (getLabel(joint) === label) {
          result.push(joint);
        }
      }
    }
  }
  return result;
};

export * from "./Label";
