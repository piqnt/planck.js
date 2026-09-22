import React from "react";

import { WatchBoolean, WatchNumber, WatchText, WatchVec2 } from "../shell/WatchValue";
import { Pair, PairKey, PairValue, Subtree, SubtreeBody, SubtreeHeader } from "../shell/Subtree";

import { useMiddleware } from "../shell/useRuntime";
import { getLabel } from "planck/testbed";

import { LiveBody } from "./LiveBody";
import { OutlineContext } from "./OutlineContext";
import { FixtureView } from "./FixtureView";
import { Body, Fixture } from "planck";
import { getKey } from "planck/testbed";
import { fixtureArray } from "./WorldView";

interface PropsWithBody {
  body: Body;
  fixture?: Fixture;
}

export const BodyView: React.FC<PropsWithBody> = ({ body }) => {
  const { context } = useMiddleware<OutlineContext>();
  const editable = context.editable.value;

  if (!body) return null;

  return (
    <Subtree open>
      <SubtreeHeader>
        <LiveBody body={body} />
      </SubtreeHeader>
      <SubtreeBody>
        <Pair>
          <PairKey>label</PairKey>
          <PairValue>
            <WatchText editable={editable} getValue={() => getLabel(body)} />
          </PairValue>
        </Pair>
        <Pair>
          <PairKey>type</PairKey>
          <PairValue>
            <WatchText editable={editable} getValue={() => body.getType()} />
          </PairValue>
        </Pair>
        <Pair>
          <PairKey>bullet</PairKey>
          <PairValue>
            <WatchBoolean editable={editable} getValue={() => body.isBullet()} />
          </PairValue>
        </Pair>
        <Pair>
          <PairKey>position</PairKey>
          <PairValue>
            <WatchVec2 editable={editable} getValue={() => body.getPosition()} />
          </PairValue>
        </Pair>
        <Pair>
          <PairKey>angle</PairKey>
          <PairValue>
            <WatchNumber editable={editable} getValue={() => body.getAngle()} />
          </PairValue>
        </Pair>
        <Pair>
          <PairKey>linearVelocity</PairKey>
          <PairValue>
            <WatchVec2 editable={editable} getValue={() => body.getLinearVelocity()} />
          </PairValue>
        </Pair>
        <Pair>
          <PairKey>angularVelocity</PairKey>
          <PairValue>
            <WatchNumber editable={editable} getValue={() => body.getAngularVelocity()} />
          </PairValue>
        </Pair>
        {fixtureArray(body).map((fix) => (
          <FixtureView fixture={fix} key={getKey(fix)} />
        ))}
      </SubtreeBody>
    </Subtree>
  );
};
