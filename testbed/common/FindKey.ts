import { getKey } from "./Key";
import { type Body, type Fixture, type Joint, World } from "planck";

export function findBody(world: World, key: string): Body | undefined {
  if (!world) return undefined;
  for (let body = world.getBodyList(); body; body = body.getNext()) {
    if (getKey(body) === key) return body;
  }
}

export function findFixture(world: World, key: string): Fixture | undefined {
  if (!world) return undefined;
  for (let body = world.getBodyList(); body; body = body.getNext()) {
    for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
      if (getKey(fixture) === key) return fixture;
    }
  }
}

export function findJoint(world: World, key: string): Joint | undefined {
  if (!world) return undefined;
  for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
    if (getKey(joint) === key) return joint;
  }
}
