[Planck.js API Doc](README.md) › [Globals](globals.md)

# Planck.js API Doc

## Index

### Namespaces

* [internal](modules/internal.md)

### Enumerations

* [ContactFeatureType](enums/contactfeaturetype.md)
* [LIMIT_STATE](enums/limit_state.md)
* [ManifoldType](enums/manifoldtype.md)
* [TOIOutputState](enums/toioutputstate.md)

### Classes

* [AABB](classes/aabb.md)
* [Body](classes/body.md)
* [BoxShape](classes/boxshape.md)
* [BroadPhase](classes/broadphase.md)
* [ChainShape](classes/chainshape.md)
* [CircleShape](classes/circleshape.md)
* [Contact](classes/contact.md)
* [ContactEdge](classes/contactedge.md)
* [ContactImpulse](classes/contactimpulse.md)
* [DistanceJoint](classes/distancejoint.md)
* [DistanceProxy](classes/distanceproxy.md)
* [DynamicTree](classes/dynamictree.md)
* [EdgeShape](classes/edgeshape.md)
* [Fixture](classes/fixture.md)
* [FrictionJoint](classes/frictionjoint.md)
* [GearJoint](classes/gearjoint.md)
* [Joint](classes/joint.md)
* [Mat22](classes/mat22.md)
* [Mat33](classes/mat33.md)
* [Math](classes/math.md)
* [MotorJoint](classes/motorjoint.md)
* [MouseJoint](classes/mousejoint.md)
* [PolygonShape](classes/polygonshape.md)
* [Position](classes/position.md)
* [PrismaticJoint](classes/prismaticjoint.md)
* [PulleyJoint](classes/pulleyjoint.md)
* [RevoluteJoint](classes/revolutejoint.md)
* [RopeJoint](classes/ropejoint.md)
* [Rot](classes/rot.md)
* [Settings](classes/settings.md)
* [Shape](classes/shape.md)
* [Solver](classes/solver.md)
* [Sweep](classes/sweep.md)
* [Transform](classes/transform.md)
* [TreeNode](classes/treenode.md)
* [Vec2](classes/vec2.md)
* [Vec3](classes/vec3.md)
* [Velocity](classes/velocity.md)
* [VelocityConstraintPoint](classes/velocityconstraintpoint.md)
* [WeldJoint](classes/weldjoint.md)
* [WheelJoint](classes/wheeljoint.md)
* [World](classes/world.md)

### Interfaces

* [BodyDef](interfaces/bodydef.md)
* [ContactFeature](interfaces/contactfeature.md)
* [ContactID](interfaces/contactid.md)
* [DistanceJointDef](interfaces/distancejointdef.md)
* [DistanceJointOpt](interfaces/distancejointopt.md)
* [FixtureDef](interfaces/fixturedef.md)
* [FixtureOpt](interfaces/fixtureopt.md)
* [FixtureProxy](interfaces/fixtureproxy.md)
* [FrictionJointDef](interfaces/frictionjointdef.md)
* [FrictionJointOpt](interfaces/frictionjointopt.md)
* [GearJointDef](interfaces/gearjointdef.md)
* [GearJointOpt](interfaces/gearjointopt.md)
* [JointDef](interfaces/jointdef.md)
* [JointEdge](interfaces/jointedge.md)
* [JointOpt](interfaces/jointopt.md)
* [Manifold](interfaces/manifold.md)
* [ManifoldPoint](interfaces/manifoldpoint.md)
* [MassData](interfaces/massdata.md)
* [MotorJointDef](interfaces/motorjointdef.md)
* [MotorJointOpt](interfaces/motorjointopt.md)
* [MouseJointDef](interfaces/mousejointdef.md)
* [MouseJointOpt](interfaces/mousejointopt.md)
* [PrismaticJointDef](interfaces/prismaticjointdef.md)
* [PrismaticJointOpt](interfaces/prismaticjointopt.md)
* [PulleyJointDef](interfaces/pulleyjointdef.md)
* [PulleyJointOpt](interfaces/pulleyjointopt.md)
* [RayCastInput](interfaces/raycastinput.md)
* [RayCastOutput](interfaces/raycastoutput.md)
* [RevoluteJointDef](interfaces/revolutejointdef.md)
* [RevoluteJointOpt](interfaces/revolutejointopt.md)
* [RopeJointDef](interfaces/ropejointdef.md)
* [RopeJointOpt](interfaces/ropejointopt.md)
* [WeldJointDef](interfaces/weldjointdef.md)
* [WeldJointOpt](interfaces/weldjointopt.md)
* [WheelJointDef](interfaces/wheeljointdef.md)
* [WheelJointOpt](interfaces/wheeljointopt.md)
* [WorldDef](interfaces/worlddef.md)
* [WorldManifold](interfaces/worldmanifold.md)

### Type aliases

* [BodyType](globals.md#bodytype)
* [ContactCallack](globals.md#contactcallack)
* [EvaluateFunction](globals.md#evaluatefunction)
* [ShapeType](globals.md#shapetype)

## Type aliases

###  BodyType

Ƭ **BodyType**: *"static" | "kinematic" | "dynamic"*

*Defined in [index.d.ts:148](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L148)*

___

###  ContactCallack

Ƭ **ContactCallack**: *function*

*Defined in [index.d.ts:311](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L311)*

#### Type declaration:

▸ (`manifold`: [Manifold](interfaces/manifold.md), `xfA`: [Transform](classes/transform.md), `fixtureA`: [Fixture](classes/fixture.md), `indexA`: number, `xfB`: [Transform](classes/transform.md), `fixtureB`: [Fixture](classes/fixture.md), `indexB`: number): *void & object*

**Parameters:**

Name | Type |
------ | ------ |
`manifold` | [Manifold](interfaces/manifold.md) |
`xfA` | [Transform](classes/transform.md) |
`fixtureA` | [Fixture](classes/fixture.md) |
`indexA` | number |
`xfB` | [Transform](classes/transform.md) |
`fixtureB` | [Fixture](classes/fixture.md) |
`indexB` | number |

___

###  EvaluateFunction

Ƭ **EvaluateFunction**: *function*

*Defined in [index.d.ts:321](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L321)*

#### Type declaration:

▸ (`manifold`: [Manifold](interfaces/manifold.md), `xfA`: [Transform](classes/transform.md), `fixtureA`: [Fixture](classes/fixture.md), `indexA`: number, `xfB`: [Transform](classes/transform.md), `fixtureB`: [Fixture](classes/fixture.md), `indexB`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`manifold` | [Manifold](interfaces/manifold.md) |
`xfA` | [Transform](classes/transform.md) |
`fixtureA` | [Fixture](classes/fixture.md) |
`indexA` | number |
`xfB` | [Transform](classes/transform.md) |
`fixtureB` | [Fixture](classes/fixture.md) |
`indexB` | number |

___

###  ShapeType

Ƭ **ShapeType**: *"circle" | "edge" | "polygon" | "chain"*

*Defined in [shape/index.d.ts:6](https://github.com/shakiba/planck.js/blob/038d425/lib/shape/index.d.ts#L6)*
