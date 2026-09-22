import React from "react";

import { WatchBoolean, WatchNumber, WatchText, WatchVec2 } from "../shell/WatchValue";
import { Pair, PairKey, PairValue, Subtree, SubtreeBody, SubtreeHeader } from "../shell/Subtree";

import { useMiddleware } from "../shell/useRuntime";
import { OutlineContext } from "./OutlineContext";

import { getLabel } from "planck/testbed";
import { getKey } from "planck/testbed";

import { LiveBody } from "./LiveBody";
import { LiveJoint } from "./LiveJoint";
import type {
  Joint,
  DistanceJoint,
  FrictionJoint,
  MotorJoint,
  PrismaticJoint,
  PulleyJoint,
  RevoluteJoint,
  RopeJoint,
  WeldJoint,
  WheelJoint,
} from "planck";

interface PropsWithJoint {
  joint: Joint;
  isDraft?: boolean;
}

export const JointView: React.FC<PropsWithJoint> = ({ joint }) => {
  const { context, emit } = useMiddleware<OutlineContext>();
  const editable = context.editable.value;

  if (!joint) return null;
  const type = joint.getType();

  return (
    <Subtree open>
      <SubtreeHeader onClick={() => emit("select-joint", { joint: getKey(joint) })}>
        <LiveJoint joint={joint} />
      </SubtreeHeader>
      <SubtreeBody>
        <Pair>
          <PairKey>type</PairKey>
          <PairValue>{type}</PairValue>
        </Pair>

        <Pair>
          <PairKey>collideConnected</PairKey>
          <PairValue>
            <WatchBoolean editable={editable} getValue={() => joint.getCollideConnected()} />
          </PairValue>
        </Pair>

        <Pair>
          <PairKey>label</PairKey>
          <PairValue>
            <WatchText editable={editable} getValue={() => getLabel(joint)} />
          </PairValue>
        </Pair>

        {type === "distance-joint" && <EditDistanceJoint editable={editable} joint={joint as DistanceJoint} />}

        {type === "rope-joint" && <EditRopeJoint editable={editable} joint={joint as RopeJoint} />}

        {type === "friction-joint" && <EditFrictionJoint editable={editable} joint={joint as FrictionJoint} />}

        {type === "prismatic-joint" && <EditPrismaticJoint editable={editable} joint={joint as PrismaticJoint} />}

        {type === "revolute-joint" && <EditRevoluteJoint editable={editable} joint={joint as RevoluteJoint} />}

        {type === "weld-joint" && <EditWeldJoint editable={editable} joint={joint as WeldJoint} />}

        {type === "wheel-joint" && <EditWheelJoint editable={editable} joint={joint as WheelJoint} />}

        {type === "motor-joint" && <EditMotorJoint editable={editable} joint={joint as MotorJoint} />}

        {type === "pulley-joint" && <EditPulleyJoint editable={editable} joint={joint as PulleyJoint} />}
      </SubtreeBody>
    </Subtree>
  );
};

type PropsWithJointBody = {
  joint: Joint;
  noAnchors?: boolean;
};

export const EditBodies: React.FC<PropsWithJointBody> = ({ joint, noAnchors }) => {
  const { context } = useMiddleware<OutlineContext>();
  const editable = context.editable.value;

  return (
    <>
      <Pair>
        <PairKey>bodyA</PairKey>
        <PairValue>
          <LiveBody variant="short" body={joint.getBodyA()} selectable={false} />
        </PairValue>
      </Pair>
      {!noAnchors && (
        <Pair>
          <PairKey>localAnchorA</PairKey>
          <PairValue>
            <WatchVec2 editable={editable} getValue={() => joint.getAnchorA()} />
          </PairValue>
        </Pair>
      )}
      <Pair>
        <PairKey>bodyB</PairKey>
        <PairValue>
          <LiveBody variant="short" body={joint.getBodyB()} selectable={false} />
        </PairValue>
      </Pair>
      {!noAnchors && (
        <Pair>
          <PairKey>localAnchorB</PairKey>
          <PairValue>
            <WatchVec2 editable={editable} getValue={() => joint.getAnchorA()} />
          </PairValue>
        </Pair>
      )}
    </>
  );
};

const EditDistanceJoint: React.FC<{
  editable: boolean;
  joint: DistanceJoint;
}> = ({ editable, joint }) => {
  return (
    <>
      <EditBodies joint={joint} />
      <Pair>
        <PairKey>length</PairKey>
        <PairValue>
          <WatchNumber editable={editable} allowNull getValue={() => joint.getLength()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>frequencyHz</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getFrequency()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>dampingRatio</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getDampingRatio()} />
        </PairValue>
      </Pair>
    </>
  );
};

const EditRopeJoint: React.FC<{
  editable: boolean;
  joint: RopeJoint;
}> = ({ editable, joint }) => {
  return (
    <>
      <EditBodies joint={joint} />
      <Pair>
        <PairKey>maxLength</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getMaxLength()} />
        </PairValue>
      </Pair>
    </>
  );
};

const EditFrictionJoint: React.FC<{
  editable: boolean;
  joint: FrictionJoint;
}> = ({ editable, joint }) => {
  return (
    <>
      <EditBodies joint={joint} />
      <Pair>
        <PairKey>maxForce</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getMaxForce()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>maxTorque</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getMaxTorque()} />
        </PairValue>
      </Pair>
    </>
  );
};

const EditPrismaticJoint: React.FC<{
  editable: boolean;
  joint: PrismaticJoint;
}> = ({ editable, joint }) => {
  return (
    <>
      <EditBodies joint={joint} />
      <Pair>
        <PairKey>localAxisA</PairKey>
        <PairValue>
          <WatchVec2 editable={editable} getValue={() => joint.getLocalAxisA()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>enableLimit</PairKey>
        <PairValue>
          <WatchBoolean editable={editable} getValue={() => joint.isLimitEnabled()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>lowerTranslation</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getLowerLimit()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>upperTranslation</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getUpperLimit()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>enableMotor</PairKey>
        <PairValue>
          <WatchBoolean editable={editable} getValue={() => joint.isLimitEnabled()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>maxMotorForce</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getMaxMotorForce()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>motorSpeed</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getMotorSpeed()} />
        </PairValue>
      </Pair>
    </>
  );
};

const EditRevoluteJoint: React.FC<{
  editable: boolean;
  joint: RevoluteJoint;
}> = ({ editable, joint }) => {
  return (
    <>
      <EditBodies joint={joint} />
      <Pair>
        <PairKey>enableLimit</PairKey>
        <PairValue>
          <WatchBoolean editable={editable} getValue={() => joint.isLimitEnabled()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>lowerAngle</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getLowerLimit()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>upperAngle</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getUpperLimit()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>enableMotor</PairKey>
        <PairValue>
          <WatchBoolean editable={editable} getValue={() => joint.isMotorEnabled()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>maxMotorTorque</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getMaxMotorTorque()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>motorSpeed</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getMotorSpeed()} />
        </PairValue>
      </Pair>
    </>
  );
};

const EditWeldJoint: React.FC<{
  editable: boolean;
  joint: WeldJoint;
}> = ({ editable, joint }) => {
  return (
    <>
      <EditBodies joint={joint} />
      <Pair>
        <PairKey>referenceAngle</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getReferenceAngle()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>frequencyHz</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getFrequency()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>dampingRatio</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getDampingRatio()} />
        </PairValue>
      </Pair>
    </>
  );
};

const EditWheelJoint: React.FC<{
  editable: boolean;
  joint: WheelJoint;
}> = ({ editable, joint }) => {
  return (
    <>
      <EditBodies joint={joint} />
      <Pair>
        <PairKey>localAxisA</PairKey>
        <PairValue>
          <WatchVec2 editable={editable} getValue={() => joint.getLocalAxisA()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>springFrequencyHz</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getSpringFrequencyHz()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>springDampingRatio</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getSpringDampingRatio()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>enableMotor</PairKey>
        <PairValue>
          <WatchBoolean editable={editable} getValue={() => joint.isMotorEnabled()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>maxMotorTorque</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getMaxMotorTorque()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>motorSpeed</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getMotorSpeed()} />
        </PairValue>
      </Pair>
    </>
  );
};

const EditMotorJoint: React.FC<{
  editable: boolean;
  joint: MotorJoint;
}> = ({ editable, joint }) => {
  return (
    <>
      <EditBodies joint={joint} noAnchors />
      <Pair>
        <PairKey>linearOffset</PairKey>
        <PairValue>
          <WatchVec2 editable={editable} getValue={() => joint.getLinearOffset()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>angularOffset</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getAngularOffset()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>maxForce</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getMaxForce()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>maxTorque</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getMaxForce()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>correctionFactor</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getCorrectionFactor()} />
        </PairValue>
      </Pair>
    </>
  );
};

const EditPulleyJoint: React.FC<{
  editable: boolean;
  joint: PulleyJoint;
}> = ({ editable, joint }) => {
  return (
    <>
      <EditBodies joint={joint} />
      <Pair>
        <PairKey>groundAnchorA</PairKey>
        <PairValue>
          <WatchVec2 editable={editable} getValue={() => joint.getGroundAnchorA()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>groundAnchorB</PairKey>
        <PairValue>
          <WatchVec2 editable={editable} getValue={() => joint.getGroundAnchorB()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>lengthA</PairKey>
        <PairValue>
          <WatchNumber editable={editable} allowNull getValue={() => joint.getLengthA()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>lengthB</PairKey>
        <PairValue>
          <WatchNumber editable={editable} allowNull getValue={() => joint.getLengthB()} />
        </PairValue>
      </Pair>
      <Pair>
        <PairKey>ratio</PairKey>
        <PairValue>
          <WatchNumber editable={editable} getValue={() => joint.getRatio()} />
        </PairValue>
      </Pair>
    </>
  );
};
