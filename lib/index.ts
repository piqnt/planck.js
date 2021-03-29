export { default as Serializer } from './serializer/index';

export { default as Math } from './common/Math';
export { default as Vec2 } from './common/Vec2';
export { default as Vec3 } from './common/Vec3';
export { default as Mat22 } from './common/Mat22';
export { default as Mat33 } from './common/Mat33';
export { default as Transform } from './common/Transform';
export { default as Rot } from './common/Rot';

export { default as AABB } from './collision/AABB';

export { default as Shape } from './Shape';
export { default as Fixture } from './Fixture';
export { default as Body } from './Body';
export { default as Contact } from './Contact';
export { default as Joint } from './Joint';
export { default as World } from './World';

export { default as Circle } from './shape/CircleShape';
export { default as Edge } from './shape/EdgeShape';
export { default as Polygon } from './shape/PolygonShape';
export { default as Chain } from './shape/ChainShape';
export { default as Box } from './shape/BoxShape';

export { CollideCircles } from './shape/CollideCircle';
export { CollideEdgeCircle } from './shape/CollideEdgeCircle';
export { CollidePolygons } from './shape/CollidePolygon';
export { CollidePolygonCircle } from './shape/CollideCirclePolygone';
export { CollideEdgePolygon } from './shape/CollideEdgePolygon';

export { default as DistanceJoint } from './joint/DistanceJoint';
export { default as FrictionJoint } from './joint/FrictionJoint';
export { default as GearJoint } from './joint/GearJoint';
export { default as MotorJoint } from './joint/MotorJoint';
export { default as MouseJoint } from './joint/MouseJoint';
export { default as PrismaticJoint } from './joint/PrismaticJoint';
export { default as PulleyJoint } from './joint/PulleyJoint';
export { default as RevoluteJoint } from './joint/RevoluteJoint';
export { default as RopeJoint } from './joint/RopeJoint';
export { default as WeldJoint } from './joint/WeldJoint';
export { default as WheelJoint } from './joint/WheelJoint';

export { default as Settings } from './Settings';

export { default as Sweep } from './common/Sweep';
export { default as Manifold } from './Manifold';
export { default as Distance } from './collision/Distance';
export { default as TimeOfImpact } from './collision/TimeOfImpact';
export { default as DynamicTree } from './collision/DynamicTree';

import Solver, { TimeStep } from "./Solver";
import { CollidePolygons } from './shape/CollidePolygon';
import { default as Settings } from './Settings';
import { default as Sweep } from './common/Sweep';
import { clipSegmentToLine, ClipVertex, default as Manifold, getPointStates, PointState } from './Manifold';
import { default as Distance, DistanceInput, DistanceOutput, DistanceProxy, SimplexCache, testOverlap } from './collision/Distance';
import { default as TimeOfImpact, TOIInput, TOIOutput } from './collision/TimeOfImpact';
import { default as DynamicTree } from './collision/DynamicTree';

import { default as stats } from './util/stats'; // todo: what to do with this?

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
Manifold.clipSegmentToLine = clipSegmentToLine;
// @ts-ignore
Manifold.ClipVertex = ClipVertex;
// @ts-ignore
Manifold.getPointStates = getPointStates;
// @ts-ignore
Manifold.PointState = PointState;

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
