import React from "react";
import { Tabs, Text } from "@mantine/core";

import { useMiddleware } from "../shell/useRuntime";
import { OutlineContext } from "./OutlineContext";

import { getKey } from "planck/testbed";

import { WatchVec2 } from "../shell/WatchValue";
import { Pair, PairKey, PairValue, Subtree, SubtreeBody, SubtreeHeader } from "../shell/Subtree";
import { VirtualList } from "../shell/VirtualList";

import { LiveBody } from "./LiveBody";
import { LiveFixture } from "./LiveFixture";
import { LiveJoint } from "./LiveJoint";
import { Body, Fixture, Joint, World } from "planck";

// the bodies and joints lists show this many rows and scroll through the
// rest; only the rows in view exist (VirtualList), and a row's position
// refreshes every LIST_EVERY frames
const ROW_HEIGHT = 24;
const VISIBLE_ROWS = 10;
const LIST_EVERY = 10;

export const WorldSubtree = () => {
  const { context, emit } = useMiddleware<OutlineContext>();
  const world = context.world.value;
  const [, setReload] = React.useState(0);

  // which bodies are expanded, by key: kept here since rows out of view are unmounted
  const [expanded, setExpanded] = React.useState<Set<string>>(() => new Set());
  const toggleBody = React.useCallback((key: string, open: boolean) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (open) next.add(key);
      else next.delete(key);
      return next;
    });
  }, []);

  React.useEffect(() => {
    if (!world) return;
    const reload = () => setReload((n) => n + 1);
    world.on("add-body", reload);
    world.on("remove-body", reload);
    world.on("add-fixture", reload);
    world.on("remove-fixture", reload);
    world.on("add-joint", reload);
    world.on("remove-joint", reload);
    // whatever the world gained between the render and this subscription
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

  if (!world) return null;

  const bodies = bodyArray(world);
  const joints = jointArray(world);

  return (
    <Tabs defaultValue="bodies">
      <Tabs.List>
        <Tabs.Tab value="bodies">
          <Text size="xs">Bodies</Text>
        </Tabs.Tab>
        <Tabs.Tab value="joints">
          <Text size="xs">Joints</Text>
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="bodies">
        <Subtree open>
          <SubtreeHeader>bodies {bodies.length}</SubtreeHeader>
          <SubtreeBody>
            <VirtualList
              items={bodies}
              rowHeight={ROW_HEIGHT}
              visibleRows={VISIBLE_ROWS}
              keyOf={(body) => getKey(body)}
              rowsOf={(body) => 1 + (expanded.has(getKey(body)) ? fixtureCount(body) : 0)}
              renderItem={(body) => {
                const key = getKey(body);
                return (
                  <Subtree open={expanded.has(key)} onToggle={(open) => toggleBody(key, open)} rowHeight={ROW_HEIGHT}>
                    <SubtreeHeader onClick={() => emit("select-body", { body: key })}>
                      <LiveBody body={body} every={LIST_EVERY} />
                    </SubtreeHeader>
                    <SubtreeBody>
                      {fixtureArray(body).map((fixture) => (
                        <Subtree key={getKey(fixture)} rowHeight={ROW_HEIGHT}>
                          <SubtreeHeader
                            onClick={() =>
                              emit("select-fixture", {
                                fixture: getKey(fixture),
                                body: key,
                              })
                            }
                          >
                            <LiveFixture fixture={fixture} />
                          </SubtreeHeader>
                        </Subtree>
                      ))}
                    </SubtreeBody>
                  </Subtree>
                );
              }}
            />
          </SubtreeBody>
        </Subtree>
      </Tabs.Panel>
      <Tabs.Panel value="joints">
        <Subtree open>
          <SubtreeHeader>joints {joints.length}</SubtreeHeader>
          <SubtreeBody>
            <VirtualList
              items={joints}
              rowHeight={ROW_HEIGHT}
              visibleRows={VISIBLE_ROWS}
              keyOf={(joint) => getKey(joint)}
              rowsOf={() => 1}
              renderItem={(joint) => (
                <Subtree rowHeight={ROW_HEIGHT}>
                  <SubtreeHeader onClick={() => emit("select-joint", { joint: getKey(joint) })}>
                    <LiveJoint joint={joint} />
                  </SubtreeHeader>
                </Subtree>
              )}
            />
          </SubtreeBody>
        </Subtree>
      </Tabs.Panel>
    </Tabs>
  );
};

export const WorldEdit = () => {
  const { context } = useMiddleware<OutlineContext>();
  const editable = context.editable.value;
  const world = context.world.value;

  if (!world) return null;

  return (
    <>
      <Subtree open>
        <SubtreeHeader>world</SubtreeHeader>
        <SubtreeBody>
          <Pair>
            <PairKey>gravity</PairKey>
            <PairValue>
              <WatchVec2 editable={editable} getValue={() => world.getGravity()} />
            </PairValue>
          </Pair>
        </SubtreeBody>
      </Subtree>
    </>
  );
};

export function bodyArray(world: World) {
  const list: Body[] = [];
  for (let body = world.getBodyList(); body; body = body.getNext()) {
    list.push(body);
  }
  return list;
}

export function fixtureCount(body: Body) {
  let count = 0;
  for (let fix = body.getFixtureList(); fix; fix = fix.getNext()) count++;
  return count;
}

export function fixtureArray(body: Body) {
  const list: Fixture[] = [];
  for (let fix = body.getFixtureList(); fix; fix = fix.getNext()) {
    list.push(fix);
  }
  return list;
}

export function jointArray(world: World) {
  const list: Joint[] = [];
  for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
    list.push(joint);
  }
  return list;
}
