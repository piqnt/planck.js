
# API Reference

## Index

### Enumerations

* [ContactFeatureType](/api/enums/contactfeaturetype)
* [ManifoldType](/api/enums/manifoldtype)
* [PointState](/api/enums/pointstate)
* [SeparationFunctionType](/api/enums/separationfunctiontype)
* [TOIOutputState](/api/enums/toioutputstate)

### Classes

* [AABB](/api/classes/aabb)
* [Body](/api/classes/body)
* [BoxShape](/api/classes/boxshape)
* [BroadPhase](/api/classes/broadphase)
* [ChainShape](/api/classes/chainshape)
* [CircleShape](/api/classes/circleshape)
* [ClipVertex](/api/classes/clipvertex)
* [Contact](/api/classes/contact)
* [ContactEdge](/api/classes/contactedge)
* [ContactID](/api/classes/contactid)
* [ContactImpulse](/api/classes/contactimpulse)
* [DistanceInput](/api/classes/distanceinput)
* [DistanceJoint](/api/classes/distancejoint)
* [DistanceOutput](/api/classes/distanceoutput)
* [DistanceProxy](/api/classes/distanceproxy)
* [DynamicTree](/api/classes/dynamictree)
* [EdgeShape](/api/classes/edgeshape)
* [Fixture](/api/classes/fixture)
* [FixtureProxy](/api/classes/fixtureproxy)
* [FrictionJoint](/api/classes/frictionjoint)
* [GearJoint](/api/classes/gearjoint)
* [Joint](/api/classes/joint)
* [JointEdge](/api/classes/jointedge)
* [Manifold](/api/classes/manifold)
* [ManifoldPoint](/api/classes/manifoldpoint)
* [Mat22](/api/classes/mat22)
* [Mat33](/api/classes/mat33)
* [MotorJoint](/api/classes/motorjoint)
* [MouseJoint](/api/classes/mousejoint)
* [PolygonShape](/api/classes/polygonshape)
* [Position](/api/classes/position)
* [PrismaticJoint](/api/classes/prismaticjoint)
* [PulleyJoint](/api/classes/pulleyjoint)
* [RevoluteJoint](/api/classes/revolutejoint)
* [RopeJoint](/api/classes/ropejoint)
* [Rot](/api/classes/rot)
* [SeparationFunction](/api/classes/separationfunction)
* [Settings](/api/classes/settings)
* [Shape](/api/classes/shape)
* [ShapeCastInput](/api/classes/shapecastinput)
* [ShapeCastOutput](/api/classes/shapecastoutput)
* [Simplex](/api/classes/simplex)
* [SimplexCache](/api/classes/simplexcache)
* [SimplexVertex](/api/classes/simplexvertex)
* [Solver](/api/classes/solver)
* [Sweep](/api/classes/sweep)
* [TOIInput](/api/classes/toiinput)
* [TOIOutput](/api/classes/toioutput)
* [Testbed](/api/classes/testbed)
* [TimeStep](/api/classes/timestep)
* [Transform](/api/classes/transform)
* [TreeNode](/api/classes/treenode)
* [Vec2](/api/classes/vec2)
* [Vec3](/api/classes/vec3)
* [Velocity](/api/classes/velocity)
* [VelocityConstraintPoint](/api/classes/velocityconstraintpoint)
* [WeldJoint](/api/classes/weldjoint)
* [WheelJoint](/api/classes/wheeljoint)
* [World](/api/classes/world)
* [WorldManifold](/api/classes/worldmanifold)

### Interfaces

* [AABBValue](/api/interfaces/aabbvalue)
* [BodyDef](/api/interfaces/bodydef)
* [DistanceJointDef](/api/interfaces/distancejointdef)
* [DistanceJointOpt](/api/interfaces/distancejointopt)
* [FixtureDef](/api/interfaces/fixturedef)
* [FixtureOpt](/api/interfaces/fixtureopt)
* [FrictionJointDef](/api/interfaces/frictionjointdef)
* [FrictionJointOpt](/api/interfaces/frictionjointopt)
* [GearJointDef](/api/interfaces/gearjointdef)
* [GearJointOpt](/api/interfaces/gearjointopt)
* [JointDef](/api/interfaces/jointdef)
* [JointOpt](/api/interfaces/jointopt)
* [MassData](/api/interfaces/massdata)
* [MotorJointDef](/api/interfaces/motorjointdef)
* [MotorJointOpt](/api/interfaces/motorjointopt)
* [MouseJointDef](/api/interfaces/mousejointdef)
* [MouseJointOpt](/api/interfaces/mousejointopt)
* [PrismaticJointDef](/api/interfaces/prismaticjointdef)
* [PrismaticJointOpt](/api/interfaces/prismaticjointopt)
* [PulleyJointDef](/api/interfaces/pulleyjointdef)
* [PulleyJointOpt](/api/interfaces/pulleyjointopt)
* [RayCastInput](/api/interfaces/raycastinput)
* [RayCastOutput](/api/interfaces/raycastoutput)
* [RevoluteJointDef](/api/interfaces/revolutejointdef)
* [RevoluteJointOpt](/api/interfaces/revolutejointopt)
* [RopeJointDef](/api/interfaces/ropejointdef)
* [RopeJointOpt](/api/interfaces/ropejointopt)
* [RotValue](/api/interfaces/rotvalue)
* [Style](/api/interfaces/style)
* [Vec2Value](/api/interfaces/vec2value)
* [Vec3Value](/api/interfaces/vec3value)
* [WeldJointDef](/api/interfaces/weldjointdef)
* [WeldJointOpt](/api/interfaces/weldjointopt)
* [WheelJointDef](/api/interfaces/wheeljointdef)
* [WheelJointOpt](/api/interfaces/wheeljointopt)
* [WorldDef](/api/interfaces/worlddef)

### Type aliases

* [ActiveKeys](/api/globals#activekeys)
* [BodyType](/api/globals#bodytype)
* [DynamicTreeQueryCallback](/api/globals#dynamictreequerycallback)
* [EvaluateFunction](/api/globals#evaluatefunction)
* [KEY](/api/globals#key)
* [RayCastCallback](/api/globals#raycastcallback)
* [ShapeType](/api/globals#shapetype)
* [TestbedCallback](/api/globals#testbedcallback)
* [TestbedFactoryOptions](/api/globals#testbedfactoryoptions)
* [TestbedMountOptions](/api/globals#testbedmountoptions)
* [TransformValue](/api/globals#transformvalue)
* [WorldAABBQueryCallback](/api/globals#worldaabbquerycallback)
* [WorldRayCastCallback](/api/globals#worldraycastcallback)

### Variables

* [Box](/api/globals#const-box)
* [Chain](/api/globals#const-chain)
* [Circle](/api/globals#const-circle)
* [EPSILON](/api/globals#const-epsilon)
* [Edge](/api/globals#const-edge)
* [Polygon](/api/globals#const-polygon)

### Functions

* [ChainCircleContact](/api/globals#chaincirclecontact)
* [CollideCircles](/api/globals#const-collidecircles)
* [CollideEdgeCircle](/api/globals#const-collideedgecircle)
* [CollideEdgePolygon](/api/globals#const-collideedgepolygon)
* [CollidePolygonCircle](/api/globals#const-collidepolygoncircle)
* [CollidePolygons](/api/globals#const-collidepolygons)
* [Distance](/api/globals#const-distance)
* [ShapeCast](/api/globals#const-shapecast)
* [TimeOfImpact](/api/globals#const-timeofimpact)
* [clamp](/api/globals#clamp)
* [clipSegmentToLine](/api/globals#clipsegmenttoline)
* [getPointStates](/api/globals#getpointstates)
* [getTransform](/api/globals#gettransform)
* [isPowerOfTwo](/api/globals#ispoweroftwo)
* [mixFriction](/api/globals#mixfriction)
* [mixRestitution](/api/globals#mixrestitution)
* [mod](/api/globals#mod)
* [nextPowerOfTwo](/api/globals#nextpoweroftwo)
* [random](/api/globals#random)
* [testOverlap](/api/globals#const-testoverlap)

## Type aliases

###  ActiveKeys

Ƭ **ActiveKeys**: *object*

#### Type declaration:

___

###  BodyType

Ƭ **BodyType**: *"static" | "kinematic" | "dynamic"*

___

###  DynamicTreeQueryCallback

Ƭ **DynamicTreeQueryCallback**: *function*

#### Type declaration:

▸ (`nodeId`: number): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`nodeId` | number |

___

###  EvaluateFunction

Ƭ **EvaluateFunction**: *function*

#### Type declaration:

▸ (`manifold`: [Manifold](/api/classes/manifold), `xfA`: [TransformValue](/api/globals#transformvalue), `fixtureA`: [Fixture](/api/classes/fixture), `indexA`: number, `xfB`: [TransformValue](/api/globals#transformvalue), `fixtureB`: [Fixture](/api/classes/fixture), `indexB`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`manifold` | [Manifold](/api/classes/manifold) |
`xfA` | [TransformValue](/api/globals#transformvalue) |
`fixtureA` | [Fixture](/api/classes/fixture) |
`indexA` | number |
`xfB` | [TransformValue](/api/globals#transformvalue) |
`fixtureB` | [Fixture](/api/classes/fixture) |
`indexB` | number |

___

###  KEY

Ƭ **KEY**: *"0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "right" | "left" | "up" | "down" | "fire"*

___

###  RayCastCallback

Ƭ **RayCastCallback**: *function*

#### Type declaration:

▸ (`subInput`: [RayCastInput](/api/interfaces/raycastinput), `id`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`subInput` | [RayCastInput](/api/interfaces/raycastinput) |
`id` | number |

___

###  ShapeType

Ƭ **ShapeType**: *"circle" | "edge" | "polygon" | "chain"*

___

###  TestbedCallback

Ƭ **TestbedCallback**: *function*

**`deprecated`** 

#### Type declaration:

▸ (`testbed`: [Testbed](/api/classes/testbed)): *[World](/api/classes/world)*

**Parameters:**

Name | Type |
------ | ------ |
`testbed` | [Testbed](/api/classes/testbed) |

___

###  TestbedFactoryOptions

Ƭ **TestbedFactoryOptions**: *string | object*

___

###  TestbedMountOptions

Ƭ **TestbedMountOptions**: *object*

#### Type declaration:

___

###  TransformValue

Ƭ **TransformValue**: *object*

#### Type declaration:

* **p**: *[Vec2Value](/api/interfaces/vec2value)*

* **q**: *[RotValue](/api/interfaces/rotvalue)*

___

###  WorldAABBQueryCallback

Ƭ **WorldAABBQueryCallback**: *function*

Called for each fixture found in the query AABB. It may return `false` to terminate the query.

#### Type declaration:

▸ (`fixture`: [Fixture](/api/classes/fixture)): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`fixture` | [Fixture](/api/classes/fixture) |

___

###  WorldRayCastCallback

Ƭ **WorldRayCastCallback**: *function*

Callback function for ray casts, see [World.rayCast](classes/world#raycast).

Called for each fixture found in the query.
The returned value replaces the ray-cast input maxFraction.
You control how the ray cast proceeds by returning a numeric/float value.

- `0` to terminate the ray cast
- `fraction` to clip the ray cast at current point
- `1` don't clip the ray and continue
- `-1` (or anything else) to continue

**`param`** The fixture hit by the ray

**`param`** The point of initial intersection

**`param`** The normal vector at the point of intersection

**`param`** The fraction along the ray at the point of intersection

**`returns`** A number to update the maxFraction

#### Type declaration:

▸ (`fixture`: [Fixture](/api/classes/fixture), `point`: [Vec2](/api/classes/vec2), `normal`: [Vec2](/api/classes/vec2), `fraction`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`fixture` | [Fixture](/api/classes/fixture) |
`point` | [Vec2](/api/classes/vec2) |
`normal` | [Vec2](/api/classes/vec2) |
`fraction` | number |

## Variables

### `Const` Box

• **Box**: *[BoxShape](/api/classes/boxshape)* = BoxShape

___

### `Const` Chain

• **Chain**: *[ChainShape](/api/classes/chainshape)* = ChainShape

___

### `Const` Circle

• **Circle**: *[CircleShape](/api/classes/circleshape)* = CircleShape

___

### `Const` EPSILON

• **EPSILON**: *1e-9* = 1e-9

___

### `Const` Edge

• **Edge**: *[EdgeShape](/api/classes/edgeshape)* = EdgeShape

___

### `Const` Polygon

• **Polygon**: *[PolygonShape](/api/classes/polygonshape)* = PolygonShape

## Functions

###  ChainCircleContact

▸ **ChainCircleContact**(`manifold`: [Manifold](/api/classes/manifold), `xfA`: [TransformValue](/api/globals#transformvalue), `fixtureA`: [Fixture](/api/classes/fixture), `indexA`: number, `xfB`: [TransformValue](/api/globals#transformvalue), `fixtureB`: [Fixture](/api/classes/fixture), `indexB`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`manifold` | [Manifold](/api/classes/manifold) |
`xfA` | [TransformValue](/api/globals#transformvalue) |
`fixtureA` | [Fixture](/api/classes/fixture) |
`indexA` | number |
`xfB` | [TransformValue](/api/globals#transformvalue) |
`fixtureB` | [Fixture](/api/classes/fixture) |
`indexB` | number |

**Returns:** *void*

___

### `Const` CollideCircles

▸ **CollideCircles**(`manifold`: [Manifold](/api/classes/manifold), `circleA`: [CircleShape](/api/classes/circleshape), `xfA`: [Transform](/api/classes/transform), `circleB`: [CircleShape](/api/classes/circleshape), `xfB`: [Transform](/api/classes/transform)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`manifold` | [Manifold](/api/classes/manifold) |
`circleA` | [CircleShape](/api/classes/circleshape) |
`xfA` | [Transform](/api/classes/transform) |
`circleB` | [CircleShape](/api/classes/circleshape) |
`xfB` | [Transform](/api/classes/transform) |

**Returns:** *void*

___

### `Const` CollideEdgeCircle

▸ **CollideEdgeCircle**(`manifold`: [Manifold](/api/classes/manifold), `edgeA`: [EdgeShape](/api/classes/edgeshape), `xfA`: [TransformValue](/api/globals#transformvalue), `circleB`: [CircleShape](/api/classes/circleshape), `xfB`: [TransformValue](/api/globals#transformvalue)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`manifold` | [Manifold](/api/classes/manifold) |
`edgeA` | [EdgeShape](/api/classes/edgeshape) |
`xfA` | [TransformValue](/api/globals#transformvalue) |
`circleB` | [CircleShape](/api/classes/circleshape) |
`xfB` | [TransformValue](/api/globals#transformvalue) |

**Returns:** *void*

___

### `Const` CollideEdgePolygon

▸ **CollideEdgePolygon**(`manifold`: [Manifold](/api/classes/manifold), `edgeA`: [EdgeShape](/api/classes/edgeshape), `xfA`: [TransformValue](/api/globals#transformvalue), `polygonB`: [PolygonShape](/api/classes/polygonshape), `xfB`: [TransformValue](/api/globals#transformvalue)): *void*

This function collides and edge and a polygon, taking into account edge
adjacency.

**Parameters:**

Name | Type |
------ | ------ |
`manifold` | [Manifold](/api/classes/manifold) |
`edgeA` | [EdgeShape](/api/classes/edgeshape) |
`xfA` | [TransformValue](/api/globals#transformvalue) |
`polygonB` | [PolygonShape](/api/classes/polygonshape) |
`xfB` | [TransformValue](/api/globals#transformvalue) |

**Returns:** *void*

___

### `Const` CollidePolygonCircle

▸ **CollidePolygonCircle**(`manifold`: [Manifold](/api/classes/manifold), `polygonA`: [PolygonShape](/api/classes/polygonshape), `xfA`: [TransformValue](/api/globals#transformvalue), `circleB`: [CircleShape](/api/classes/circleshape), `xfB`: [TransformValue](/api/globals#transformvalue)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`manifold` | [Manifold](/api/classes/manifold) |
`polygonA` | [PolygonShape](/api/classes/polygonshape) |
`xfA` | [TransformValue](/api/globals#transformvalue) |
`circleB` | [CircleShape](/api/classes/circleshape) |
`xfB` | [TransformValue](/api/globals#transformvalue) |

**Returns:** *void*

___

### `Const` CollidePolygons

▸ **CollidePolygons**(`manifold`: [Manifold](/api/classes/manifold), `polyA`: [PolygonShape](/api/classes/polygonshape), `xfA`: [TransformValue](/api/globals#transformvalue), `polyB`: [PolygonShape](/api/classes/polygonshape), `xfB`: [TransformValue](/api/globals#transformvalue)): *void*

Find edge normal of max separation on A - return if separating axis is found<br>
Find edge normal of max separation on B - return if separation axis is found<br>
Choose reference edge as min(minA, minB)<br>
Find incident edge<br>
Clip

The normal points from 1 to 2

**Parameters:**

Name | Type |
------ | ------ |
`manifold` | [Manifold](/api/classes/manifold) |
`polyA` | [PolygonShape](/api/classes/polygonshape) |
`xfA` | [TransformValue](/api/globals#transformvalue) |
`polyB` | [PolygonShape](/api/classes/polygonshape) |
`xfB` | [TransformValue](/api/globals#transformvalue) |

**Returns:** *void*

___

### `Const` Distance

▸ **Distance**(`output`: [DistanceOutput](/api/classes/distanceoutput), `cache`: [SimplexCache](/api/classes/simplexcache), `input`: [DistanceInput](/api/classes/distanceinput)): *void*

Compute the closest points between two shapes. Supports any combination of:
CircleShape, PolygonShape, EdgeShape. The simplex cache is input/output. On
the first call set SimplexCache.count to zero.

**Parameters:**

Name | Type |
------ | ------ |
`output` | [DistanceOutput](/api/classes/distanceoutput) |
`cache` | [SimplexCache](/api/classes/simplexcache) |
`input` | [DistanceInput](/api/classes/distanceinput) |

**Returns:** *void*

___

### `Const` ShapeCast

▸ **ShapeCast**(`output`: [ShapeCastOutput](/api/classes/shapecastoutput), `input`: [ShapeCastInput](/api/classes/shapecastinput)): *boolean*

Perform a linear shape cast of shape B moving and shape A fixed. Determines
the hit point, normal, and translation fraction.

**Parameters:**

Name | Type |
------ | ------ |
`output` | [ShapeCastOutput](/api/classes/shapecastoutput) |
`input` | [ShapeCastInput](/api/classes/shapecastinput) |

**Returns:** *boolean*

true if hit, false if there is no hit or an initial overlap

___

### `Const` TimeOfImpact

▸ **TimeOfImpact**(`output`: [TOIOutput](/api/classes/toioutput), `input`: [TOIInput](/api/classes/toiinput)): *void*

Compute the upper bound on time before two shapes penetrate. Time is
represented as a fraction between [0,tMax]. This uses a swept separating axis
and may miss some intermediate, non-tunneling collisions. If you change the
time interval, you should call this function again.

Note: use Distance to compute the contact point and normal at the time of
impact.

CCD via the local separating axis method. This seeks progression by computing
the largest time at which separation is maintained.

**Parameters:**

Name | Type |
------ | ------ |
`output` | [TOIOutput](/api/classes/toioutput) |
`input` | [TOIInput](/api/classes/toiinput) |

**Returns:** *void*

___

###  clamp

▸ **clamp**(`num`: number, `min`: number, `max`: number): *number*

**`deprecated`** 
Returns a min if num is less than min, and max if more than max, otherwise returns num.

**Parameters:**

Name | Type |
------ | ------ |
`num` | number |
`min` | number |
`max` | number |

**Returns:** *number*

___

###  clipSegmentToLine

▸ **clipSegmentToLine**(`vOut`: [ClipVertex](/api/classes/clipvertex)[], `vIn`: [ClipVertex](/api/classes/clipvertex)[], `normal`: [Vec2Value](/api/interfaces/vec2value), `offset`: number, `vertexIndexA`: number): *number*

Clipping for contact manifolds. Sutherland-Hodgman clipping.

**Parameters:**

Name | Type |
------ | ------ |
`vOut` | [ClipVertex](/api/classes/clipvertex)[] |
`vIn` | [ClipVertex](/api/classes/clipvertex)[] |
`normal` | [Vec2Value](/api/interfaces/vec2value) |
`offset` | number |
`vertexIndexA` | number |

**Returns:** *number*

___

###  getPointStates

▸ **getPointStates**(`state1`: [PointState](/api/enums/pointstate)[], `state2`: [PointState](/api/enums/pointstate)[], `manifold1`: [Manifold](/api/classes/manifold), `manifold2`: [Manifold](/api/classes/manifold)): *void*

Compute the point states given two manifolds. The states pertain to the
transition from manifold1 to manifold2. So state1 is either persist or remove
while state2 is either add or persist.

**Parameters:**

Name | Type |
------ | ------ |
`state1` | [PointState](/api/enums/pointstate)[] |
`state2` | [PointState](/api/enums/pointstate)[] |
`manifold1` | [Manifold](/api/classes/manifold) |
`manifold2` | [Manifold](/api/classes/manifold) |

**Returns:** *void*

___

###  getTransform

▸ **getTransform**(`xf`: [TransformValue](/api/globals#transformvalue), `p`: [Vec2Value](/api/interfaces/vec2value), `c`: [Vec2Value](/api/interfaces/vec2value), `a`: number): *[TransformValue](/api/globals#transformvalue)*

**Parameters:**

Name | Type |
------ | ------ |
`xf` | [TransformValue](/api/globals#transformvalue) |
`p` | [Vec2Value](/api/interfaces/vec2value) |
`c` | [Vec2Value](/api/interfaces/vec2value) |
`a` | number |

**Returns:** *[TransformValue](/api/globals#transformvalue)*

___

###  isPowerOfTwo

▸ **isPowerOfTwo**(`x`: number): *boolean*

**`deprecated`** 

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |

**Returns:** *boolean*

___

###  mixFriction

▸ **mixFriction**(`friction1`: number, `friction2`: number): *number*

Friction mixing law. The idea is to allow either fixture to drive the
friction to zero. For example, anything slides on ice.

**Parameters:**

Name | Type |
------ | ------ |
`friction1` | number |
`friction2` | number |

**Returns:** *number*

___

###  mixRestitution

▸ **mixRestitution**(`restitution1`: number, `restitution2`: number): *number*

Restitution mixing law. The idea is allow for anything to bounce off an
inelastic surface. For example, a superball bounces on anything.

**Parameters:**

Name | Type |
------ | ------ |
`restitution1` | number |
`restitution2` | number |

**Returns:** *number*

___

###  mod

▸ **mod**(`num`: number, `min?`: number, `max?`: number): *number*

**`deprecated`** 

**Parameters:**

Name | Type |
------ | ------ |
`num` | number |
`min?` | number |
`max?` | number |

**Returns:** *number*

___

###  nextPowerOfTwo

▸ **nextPowerOfTwo**(`x`: number): *number*

**`deprecated`** 
Next Largest Power of 2 Given a binary integer value x, the next largest
power of 2 can be computed by a SWAR algorithm that recursively "folds" the
upper bits into the lower bits. This process yields a bit vector with the
same most significant 1 as x, but all 1's below it. Adding 1 to that value
yields the next largest power of 2. For a 32-bit value:

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |

**Returns:** *number*

___

###  random

▸ **random**(`min?`: number, `max?`: number): *number*

**`deprecated`** 
Returns a random number between min and max when two arguments are provided.
If one arg is provided between 0 to max.
If one arg is passed between 0 to 1.

**Parameters:**

Name | Type |
------ | ------ |
`min?` | number |
`max?` | number |

**Returns:** *number*

___

### `Const` testOverlap

▸ **testOverlap**(`shapeA`: [Shape](/api/classes/shape), `indexA`: number, `shapeB`: [Shape](/api/classes/shape), `indexB`: number, `xfA`: [TransformValue](/api/globals#transformvalue), `xfB`: [TransformValue](/api/globals#transformvalue)): *boolean*

Determine if two generic shapes overlap.

**Parameters:**

Name | Type |
------ | ------ |
`shapeA` | [Shape](/api/classes/shape) |
`indexA` | number |
`shapeB` | [Shape](/api/classes/shape) |
`indexB` | number |
`xfA` | [TransformValue](/api/globals#transformvalue) |
`xfB` | [TransformValue](/api/globals#transformvalue) |

**Returns:** *boolean*
