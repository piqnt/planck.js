import React from "react";

import { WatchInteger, WatchNumber, WatchText, WatchVec2 } from "../shell/WatchValue";
import { Pair, PairKey, PairValue, Subtree, SubtreeBody, SubtreeHeader } from "../shell/Subtree";

import { useMiddleware } from "../shell/useRuntime";
import { OutlineContext } from "./OutlineContext";

import { getLabel } from "planck/testbed";

import { LiveFixture } from "./LiveFixture";
import { ChainShape, CircleShape, EdgeShape, Fixture, PolygonShape } from "planck";

interface PropsWithFixture {
  fixture: Fixture;
}

export const FixtureView: React.FC<PropsWithFixture> = ({ fixture }) => {
  if (!fixture) return null;

  return (
    <Subtree open>
      <SubtreeHeader>
        <LiveFixture fixture={fixture} />
      </SubtreeHeader>
      <SubtreeBody>
        <Pair>
          <PairKey>label</PairKey>
          <PairValue>
            <WatchText editable={true} getValue={() => getLabel(fixture)} />
          </PairValue>
        </Pair>
        <ShapeView fixture={fixture} />
        <MaterialView fixture={fixture} />
        <FilterView fixture={fixture} />
      </SubtreeBody>
    </Subtree>
  );
};

export const MaterialView: React.FC<PropsWithFixture> = ({ fixture }) => {
  const { context } = useMiddleware<OutlineContext>();
  const editable = context.editable.value;

  if (!fixture) return null;

  return (
    <Subtree open>
      <SubtreeHeader>material</SubtreeHeader>
      <SubtreeBody>
        <Pair>
          <PairKey>density</PairKey>
          <PairValue>
            <WatchNumber editable={editable} getValue={() => fixture.getDensity()} />
          </PairValue>
        </Pair>
        <Pair>
          <PairKey>friction</PairKey>
          <PairValue>
            <WatchNumber editable={editable} getValue={() => fixture.getFriction()} />
          </PairValue>
        </Pair>
        <Pair>
          <PairKey>restitution</PairKey>
          <PairValue>
            <WatchNumber editable={editable} getValue={() => fixture.getRestitution()} />
          </PairValue>
        </Pair>
      </SubtreeBody>
    </Subtree>
  );
};

export const FilterView: React.FC<PropsWithFixture> = ({ fixture }) => {
  const { context } = useMiddleware<OutlineContext>();
  const editable = context.editable.value;

  if (!fixture) return null;

  return (
    <Subtree>
      <SubtreeHeader>filter</SubtreeHeader>
      <SubtreeBody>
        <Pair>
          <PairKey>group index</PairKey>
          <PairValue>
            <WatchInteger editable={editable} getValue={() => fixture.getFilterGroupIndex()} />
          </PairValue>
        </Pair>
        <Pair>
          <PairKey>category bits</PairKey>
          <PairValue>
            <WatchInteger editable={editable} getValue={() => fixture.getFilterCategoryBits()} />
          </PairValue>
        </Pair>
        <Pair>
          <PairKey>mask bits</PairKey>
          <PairValue>
            <WatchInteger editable={editable} getValue={() => fixture.getFilterMaskBits()} />
          </PairValue>
        </Pair>
      </SubtreeBody>
    </Subtree>
  );
};

const ShapeView: React.FC<PropsWithFixture> = ({ fixture }) => {
  const shape = fixture.getShape();
  let comp: React.ReactNode;
  if (shape.getType() === "circle") {
    comp = <CircleView fixture={fixture} />;
  } else if (shape.getType() === "edge") {
    comp = <EdgeView fixture={fixture} />;
  } else if (shape.getType() === "chain") {
    comp = <ChainView fixture={fixture} />;
  } else if (shape.getType() === "polygon") {
    comp = <PolygonView fixture={fixture} />;
  }

  return comp;
};

const CircleView: React.FC<PropsWithFixture> = ({ fixture }) => {
  const { context } = useMiddleware<OutlineContext>();
  const editable = context.editable.value;
  const shape = fixture.getShape() as CircleShape;
  if (shape.getType() !== "circle") return;
  return (
    <>
      <Pair>
        <PairKey>center</PairKey>
        <PairValue>
          <WatchVec2 editable={editable} getValue={() => shape.m_p} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>radius</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => shape.m_radius} />
        </PairValue>
      </Pair>
    </>
  );
};

const EdgeView: React.FC<PropsWithFixture> = ({ fixture }) => {
  const { context } = useMiddleware<OutlineContext>();
  const editable = context.editable.value;
  const shape = fixture.getShape() as EdgeShape;
  if (shape.getType() !== "edge") return;

  return (
    <>
      <Pair>
        <PairKey>vertex1</PairKey>
        <PairValue>
          <WatchVec2 editable={editable} getValue={() => shape.m_vertex1} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>vertex2</PairKey>
        <PairValue>
          <WatchVec2 editable={editable} getValue={() => shape.m_vertex2} />
        </PairValue>
      </Pair>
    </>
  );
};

const ChainView: React.FC<PropsWithFixture> = ({ fixture }) => {
  const { context } = useMiddleware<OutlineContext>();
  const editable = context.editable.value;
  const shape = fixture.getShape() as ChainShape;
  if (shape.getType() !== "chain") return;

  return (
    <Subtree open>
      <SubtreeHeader>vertices</SubtreeHeader>
      <SubtreeBody>
        {shape.m_vertices?.map((v, i) => (
          <Pair key={i}>
            <PairKey>[{i}]</PairKey>
            <PairValue>
              <WatchVec2 editable={editable} getValue={() => v} />
            </PairValue>
          </Pair>
        ))}
      </SubtreeBody>
    </Subtree>
  );
};

const PolygonView: React.FC<PropsWithFixture> = ({ fixture }) => {
  const { context } = useMiddleware<OutlineContext>();
  const editable = context.editable.value;
  const shape = fixture.getShape() as PolygonShape;
  if (shape.getType() !== "polygon") return;

  return (
    <Subtree open>
      <SubtreeHeader>vertices</SubtreeHeader>
      <SubtreeBody>
        {shape.m_vertices?.map((v, i) => (
          <Pair key={i}>
            <PairKey>[{i}]</PairKey>
            <PairValue>
              <WatchVec2 editable={editable} getValue={() => v} />
            </PairValue>
          </Pair>
        ))}
      </SubtreeBody>
    </Subtree>
  );
};
