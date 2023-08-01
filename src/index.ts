export * from './serializer/index';

export * from './common/Math';

export * from './common/Vec2';
export * from './common/Vec3';
export * from './common/Mat22';
export * from './common/Mat33';
export * from './common/Transform';
export * from './common/Rot';

export * from './collision/AABB';

export * from './collision/Shape';
export * from './dynamics/Fixture';
export * from './dynamics/Body';
export * from './dynamics/Contact';
export * from './dynamics/Joint';
export * from './dynamics/World';

export * from './collision/shape/CircleShape';
export * from './collision/shape/EdgeShape';
export * from './collision/shape/PolygonShape';
export * from './collision/shape/ChainShape';
export * from './collision/shape/BoxShape';

export * from './collision/shape/CollideCircle';
export * from './collision/shape/CollideEdgeCircle';
export * from './collision/shape/CollidePolygon';
export * from './collision/shape/CollideCirclePolygon';
export * from './collision/shape/CollideEdgePolygon';

export * from './dynamics/joint/DistanceJoint';
export * from './dynamics/joint/FrictionJoint';
export * from './dynamics/joint/GearJoint';
export * from './dynamics/joint/MotorJoint';
export * from './dynamics/joint/MouseJoint';
export * from './dynamics/joint/PrismaticJoint';
export * from './dynamics/joint/PulleyJoint';
export * from './dynamics/joint/RevoluteJoint';
export * from './dynamics/joint/RopeJoint';
export * from './dynamics/joint/WeldJoint';
export * from './dynamics/joint/WheelJoint';

export * from './Settings';

export * from './common/Sweep';
export * from './collision/Manifold';
export * from './collision/Distance';
export * from './collision/TimeOfImpact';
export * from './collision/DynamicTree';
export * from './util/stats';

import { math } from './common/Math';

export const Math = math;

import { CollidePolygons } from './collision/shape/CollidePolygon';
import { Settings } from './Settings';
import { Sweep } from './common/Sweep';
import { DynamicTree } from './collision/DynamicTree';
import { Manifold } from './collision/Manifold';
import { Distance } from './collision/Distance';
import { TimeOfImpact } from './collision/TimeOfImpact';
import { stats } from './util/stats';

/** @deprecated Merged with main namespace */
export const internal = {
  CollidePolygons,
  Settings,
  Sweep,
  Manifold,
  Distance,
  TimeOfImpact,
  DynamicTree,
  stats
};
