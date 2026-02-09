import { World, Fixture, Joint, Body } from "../";

type LookupResult = Body | Fixture | Joint;

export const getLookupId = (obj: any) => {
  if (obj.lookupId) {
    return obj.lookupId;
  }
  if (obj.spaceName) {
    return obj.spaceName;
  }
  return null;
};

export const setLookupId = (obj: any, id: string) => {
  obj.lookupId = id;
};

export const findOne = (world: World, query: string): LookupResult | null => {
  if (query.indexOf("#")) {
    const [type, id] = query.split("#", 2);
    if (type === "body") {
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        if (getLookupId(body) === id) {
          return body;
        }
      }
    } else if (type === "fixture") {
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
          if (getLookupId(fixture) === id) {
            return fixture;
          }
        }
      }
    } else if (type === "joint") {
      for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
        if (getLookupId(joint) === id) {
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
    const [type, id] = query.split("#", 2);
    if (type === "body") {
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        if (getLookupId(body) === id) {
          result.push(body);
        }
      }
    } else if (type === "fixture") {
      for (let body = world.getBodyList(); body; body = body.getNext()) {
        for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
          if (getLookupId(fixture) === id) {
            result.push(fixture);
          }
        }
      }
    } else if (type === "joint") {
      for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
        if (getLookupId(joint) === id) {
          result.push(joint);
        }
      }
    }
  }
  return result;
};
