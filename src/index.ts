export { default as Serializer } from './serializer/index';

export { default as Math } from './common/Math';
export { default as Vec2 } from './common/Vec2';
export { default as Vec3 } from './common/Vec3';
export { default as Mat22 } from './common/Mat22';
export { default as Mat33 } from './common/Mat33';
export { default as Transform } from './common/Transform';
export { default as Rot } from './common/Rot';

export { default as AABB } from './collision/AABB';

export { default as Shape } from './collision/Shape';
export { default as Fixture } from './dynamics/Fixture';
export { default as Body } from './dynamics/Body';
export { default as Contact } from './dynamics/Contact';
export { default as Joint } from './dynamics/Joint';
export { default as World } from './dynamics/World';

export { default as Circle } from './collision/shape/CircleShape';
export { default as Edge } from './collision/shape/EdgeShape';
export { default as Polygon } from './collision/shape/PolygonShape';
export { default as Chain } from './collision/shape/ChainShape';
export { default as Box } from './collision/shape/BoxShape';

export { CollideCircles } from './collision/shape/CollideCircle';
export { CollideEdgeCircle } from './collision/shape/CollideEdgeCircle';
export { CollidePolygons } from './collision/shape/CollidePolygon';
export { CollidePolygonCircle } from './collision/shape/CollideCirclePolygone';
export { CollideEdgePolygon } from './collision/shape/CollideEdgePolygon';

export { default as DistanceJoint } from './dynamics/joint/DistanceJoint';
export { default as FrictionJoint } from './dynamics/joint/FrictionJoint';
export { default as GearJoint } from './dynamics/joint/GearJoint';
export { default as MotorJoint } from './dynamics/joint/MotorJoint';
export { default as MouseJoint } from './dynamics/joint/MouseJoint';
export { default as PrismaticJoint } from './dynamics/joint/PrismaticJoint';
export { default as PulleyJoint } from './dynamics/joint/PulleyJoint';
export { default as RevoluteJoint } from './dynamics/joint/RevoluteJoint';
export { default as RopeJoint } from './dynamics/joint/RopeJoint';
export { default as WeldJoint } from './dynamics/joint/WeldJoint';
export { default as WheelJoint } from './dynamics/joint/WheelJoint';

export { default as Settings } from './Settings';

export { default as Sweep } from './common/Sweep';
export { default as Manifold } from './collision/Manifold';
export { default as Distance } from './collision/Distance';
export { default as TimeOfImpact } from './collision/TimeOfImpact';
export { default as DynamicTree } from './collision/DynamicTree';

import Solver, { TimeStep } from './dynamics/Solver';
import { CollidePolygons } from './collision/shape/CollidePolygon';
import { default as Settings } from './Settings';
import { default as Sweep } from './common/Sweep';
import { default as Manifold } from './collision/Manifold';
import { default as Distance, DistanceInput, DistanceOutput, DistanceProxy, SimplexCache, testOverlap } from './collision/Distance';
import { default as TimeOfImpact, TOIInput, TOIOutput } from './collision/TimeOfImpact';
import { default as DynamicTree } from './collision/DynamicTree';

import { default as stats } from './util/stats'; // todo: what to do with this?

import { ContactImpulse } from './dynamics/Solver';
type _ContactImpulse = InstanceType<typeof ContactImpulse>;
export type { _ContactImpulse as ContactImpulse }

/** @deprecated Merged with main namespace */
export const internal = {};

// @ts-ignore
internal.CollidePolygons = CollidePolygons;
// @ts-ignore
internal.Settings = Settings;
// @ts-ignore
internal.Sweep = Sweep;
// @ts-ignore
internal.Manifold = Manifold;
// @ts-ignore
internal.Distance = Distance;
// @ts-ignore
internal.TimeOfImpact = TimeOfImpact;
// @ts-ignore
internal.DynamicTree = DynamicTree;
// @ts-ignore
internal.stats = stats;

// @ts-ignore
Solver.TimeStep = TimeStep;

// @ts-ignore
Distance.testOverlap = testOverlap;
// @ts-ignore
Distance.Input = DistanceInput;
// @ts-ignore
Distance.Output = DistanceOutput;
// @ts-ignore
Distance.Proxy = DistanceProxy;
// @ts-ignore
Distance.Cache = SimplexCache;

// @ts-ignore
TimeOfImpact.Input = TOIInput;
// @ts-ignore
TimeOfImpact.Output = TOIOutput;
