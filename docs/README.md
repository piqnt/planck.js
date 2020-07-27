[API Doc](README.md)

# API Doc

## Index

### Namespaces

* [internal](modules/internal.md)

### Enumerations

* [ContactFeatureType](enums/contactfeaturetype.md)
* [LIMIT_STATE](enums/limit_state.md)
* [ManifoldType](enums/manifoldtype.md)
* [TOIOutputState](enums/toioutputstate.md)

### Interfaces

* [AABB](interfaces/aabb.md)
* [Body](interfaces/body.md)
* [ChainShape](interfaces/chainshape.md)
* [CircleShape](interfaces/circleshape.md)
* [Contact](interfaces/contact.md)
* [ContactEdge](interfaces/contactedge.md)
* [ContactFeature](interfaces/contactfeature.md)
* [ContactID](interfaces/contactid.md)
* [DistanceJoint](interfaces/distancejoint.md)
* [DistanceProxy](interfaces/distanceproxy.md)
* [DynamicTree](interfaces/dynamictree.md)
* [EdgeShape](interfaces/edgeshape.md)
* [Fixture](interfaces/fixture.md)
* [FixtureProxy](interfaces/fixtureproxy.md)
* [FrictionJoint](interfaces/frictionjoint.md)
* [GearJoint](interfaces/gearjoint.md)
* [Joint](interfaces/joint.md)
* [JointEdge](interfaces/jointedge.md)
* [Manifold](interfaces/manifold.md)
* [ManifoldPoint](interfaces/manifoldpoint.md)
* [MassData](interfaces/massdata.md)
* [Mat22](interfaces/mat22.md)
* [Mat33](interfaces/mat33.md)
* [MotorJoint](interfaces/motorjoint.md)
* [MouseJoint](interfaces/mousejoint.md)
* [PolygonShape](interfaces/polygonshape.md)
* [Position](interfaces/position.md)
* [PrismaticJoint](interfaces/prismaticjoint.md)
* [PulleyJoint](interfaces/pulleyjoint.md)
* [RevoluteJoint](interfaces/revolutejoint.md)
* [RopeJoint](interfaces/ropejoint.md)
* [Rot](interfaces/rot.md)
* [Settings](interfaces/settings.md)
* [Shape](interfaces/shape.md)
* [Sweep](interfaces/sweep.md)
* [Transform](interfaces/transform.md)
* [TreeNode](interfaces/treenode.md)
* [Vec2](interfaces/vec2.md)
* [Vec3](interfaces/vec3.md)
* [Velocity](interfaces/velocity.md)
* [VelocityConstraintPoint](interfaces/velocityconstraintpoint.md)
* [WeldJoint](interfaces/weldjoint.md)
* [WheelJoint](interfaces/wheeljoint.md)
* [World](interfaces/world.md)
* [WorldManifold](interfaces/worldmanifold.md)

### Type aliases

* [BodyDef](README.md#bodydef)
* [BodyType](README.md#bodytype)
* [BroadPhase](README.md#broadphase)
* [ContactImpulse](README.md#contactimpulse)
* [DistanceJointDef](README.md#distancejointdef)
* [DistanceJointOpt](README.md#distancejointopt)
* [FixtureDef](README.md#fixturedef)
* [FixtureOpt](README.md#fixtureopt)
* [FrictionJointDef](README.md#frictionjointdef)
* [FrictionJointOpt](README.md#frictionjointopt)
* [GearJointDef](README.md#gearjointdef)
* [GearJointOpt](README.md#gearjointopt)
* [JointDef](README.md#jointdef)
* [JointOpt](README.md#jointopt)
* [MotorJointDef](README.md#motorjointdef)
* [MotorJointOpt](README.md#motorjointopt)
* [MouseJointDef](README.md#mousejointdef)
* [MouseJointOpt](README.md#mousejointopt)
* [PrismaticJointDef](README.md#prismaticjointdef)
* [PrismaticJointOpt](README.md#prismaticjointopt)
* [PulleyJointDef](README.md#pulleyjointdef)
* [PulleyJointOpt](README.md#pulleyjointopt)
* [RayCastInput](README.md#raycastinput)
* [RayCastOutput](README.md#raycastoutput)
* [RevoluteJointDef](README.md#revolutejointdef)
* [RevoluteJointOpt](README.md#revolutejointopt)
* [RopeJointDef](README.md#ropejointdef)
* [RopeJointOpt](README.md#ropejointopt)
* [ShapeType](README.md#shapetype)
* [Solver](README.md#solver)
* [WeldJointDef](README.md#weldjointdef)
* [WeldJointOpt](README.md#weldjointopt)
* [WheelJointDef](README.md#wheeljointdef)
* [WheelJointOpt](README.md#wheeljointopt)
* [WorldDef](README.md#worlddef)

### Variables

* [AABB](README.md#let-aabb)
* [Body](README.md#let-body)
* [Box](README.md#let-box)
* [Chain](README.md#let-chain)
* [Circle](README.md#let-circle)
* [Contact](README.md#let-contact)
* [DistanceJoint](README.md#let-distancejoint)
* [Edge](README.md#let-edge)
* [Fixture](README.md#let-fixture)
* [FrictionJoint](README.md#let-frictionjoint)
* [GearJoint](README.md#let-gearjoint)
* [Mat22](README.md#let-mat22)
* [Mat33](README.md#let-mat33)
* [Math](README.md#let-math)
* [MotorJoint](README.md#let-motorjoint)
* [MouseJoint](README.md#let-mousejoint)
* [Polygon](README.md#let-polygon)
* [PrismaticJoint](README.md#let-prismaticjoint)
* [PulleyJoint](README.md#let-pulleyjoint)
* [RevoluteJoint](README.md#let-revolutejoint)
* [RopeJoint](README.md#let-ropejoint)
* [Rot](README.md#let-rot)
* [Transform](README.md#let-transform)
* [Vec2](README.md#let-vec2)
* [Vec3](README.md#let-vec3)
* [WeldJoint](README.md#let-weldjoint)
* [WheelJoint](README.md#let-wheeljoint)
* [World](README.md#let-world)

## Type aliases

###  BodyDef

Ƭ **BodyDef**: *Partial‹object›*

*Defined in [index.d.ts:268](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L268)*

___

###  BodyType

Ƭ **BodyType**: *"static" | "kinematic" | "dynamic"*

*Defined in [index.d.ts:146](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L146)*

___

###  BroadPhase

Ƭ **BroadPhase**: *any*

*Defined in [collision/index.d.ts:4](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L4)*

___

###  ContactImpulse

Ƭ **ContactImpulse**: *any*

*Defined in [index.d.ts:66](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L66)*

___

###  DistanceJointDef

Ƭ **DistanceJointDef**: *[JointDef](README.md#jointdef) & [DistanceJointOpt](README.md#distancejointopt) & object*

*Defined in [joint/index.d.ts:97](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L97)*

___

###  DistanceJointOpt

Ƭ **DistanceJointOpt**: *[JointOpt](README.md#jointopt) & Partial‹object›*

*Defined in [joint/index.d.ts:92](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L92)*

___

###  FixtureDef

Ƭ **FixtureDef**: *[FixtureOpt](README.md#fixtureopt) & object*

*Defined in [index.d.ts:136](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L136)*

___

###  FixtureOpt

Ƭ **FixtureOpt**: *Partial‹object›*

*Defined in [index.d.ts:125](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L125)*

___

###  FrictionJointDef

Ƭ **FrictionJointDef**: *[JointDef](README.md#jointdef) & [FrictionJointOpt](README.md#frictionjointopt) & object*

*Defined in [joint/index.d.ts:135](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L135)*

___

###  FrictionJointOpt

Ƭ **FrictionJointOpt**: *[JointOpt](README.md#jointopt) & Partial‹object›*

*Defined in [joint/index.d.ts:131](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L131)*

___

###  GearJointDef

Ƭ **GearJointDef**: *[JointDef](README.md#jointdef) & [GearJointOpt](README.md#gearjointopt) & object*

*Defined in [joint/index.d.ts:176](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L176)*

___

###  GearJointOpt

Ƭ **GearJointOpt**: *[JointOpt](README.md#jointopt) & Partial‹object›*

*Defined in [joint/index.d.ts:173](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L173)*

___

###  JointDef

Ƭ **JointDef**: *[JointOpt](README.md#jointopt) & object*

*Defined in [joint/index.d.ts:54](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L54)*

___

###  JointOpt

Ƭ **JointOpt**: *Partial‹object›*

*Defined in [joint/index.d.ts:50](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L50)*

___

###  MotorJointDef

Ƭ **MotorJointDef**: *[JointDef](README.md#jointdef) & [MotorJointOpt](README.md#motorjointopt) & object*

*Defined in [joint/index.d.ts:222](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L222)*

___

###  MotorJointOpt

Ƭ **MotorJointOpt**: *[JointOpt](README.md#jointopt) & Partial‹object›*

*Defined in [joint/index.d.ts:216](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L216)*

___

###  MouseJointDef

Ƭ **MouseJointDef**: *[JointDef](README.md#jointdef) & [MouseJointOpt](README.md#mousejointopt) & object*

*Defined in [joint/index.d.ts:258](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L258)*

___

###  MouseJointOpt

Ƭ **MouseJointOpt**: *[JointOpt](README.md#jointopt) & Partial‹object›*

*Defined in [joint/index.d.ts:253](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L253)*

___

###  PrismaticJointDef

Ƭ **PrismaticJointDef**: *[JointDef](README.md#jointdef) & [PrismaticJointOpt](README.md#prismaticjointopt) & object*

*Defined in [joint/index.d.ts:321](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L321)*

___

###  PrismaticJointOpt

Ƭ **PrismaticJointOpt**: *[JointOpt](README.md#jointopt) & Partial‹object›*

*Defined in [joint/index.d.ts:313](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L313)*

___

###  PulleyJointDef

Ƭ **PulleyJointDef**: *[JointDef](README.md#jointdef) & [PulleyJointOpt](README.md#pulleyjointopt) & object*

*Defined in [joint/index.d.ts:363](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L363)*

___

###  PulleyJointOpt

Ƭ **PulleyJointOpt**: *[JointOpt](README.md#jointopt) & Partial‹object›*

*Defined in [joint/index.d.ts:361](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L361)*

___

###  RayCastInput

Ƭ **RayCastInput**: *object*

*Defined in [collision/index.d.ts:6](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L6)*

#### Type declaration:

* **maxFraction**: *number*

* **p1**: *[Vec2](interfaces/vec2.md)*

* **p2**: *[Vec2](interfaces/vec2.md)*

___

###  RayCastOutput

Ƭ **RayCastOutput**: *object*

*Defined in [collision/index.d.ts:12](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L12)*

#### Type declaration:

* **fraction**: *number*

* **normal**: *[Vec2](interfaces/vec2.md)*

___

###  RevoluteJointDef

Ƭ **RevoluteJointDef**: *[JointDef](README.md#jointdef) & [RevoluteJointOpt](README.md#revolutejointopt) & object*

*Defined in [joint/index.d.ts:429](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L429)*

___

###  RevoluteJointOpt

Ƭ **RevoluteJointOpt**: *[JointOpt](README.md#jointopt) & Partial‹object›*

*Defined in [joint/index.d.ts:421](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L421)*

___

###  RopeJointDef

Ƭ **RopeJointDef**: *[JointDef](README.md#jointdef) & [RopeJointOpt](README.md#ropejointopt) & object*

*Defined in [joint/index.d.ts:467](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L467)*

___

###  RopeJointOpt

Ƭ **RopeJointOpt**: *[JointOpt](README.md#jointopt) & Partial‹object›*

*Defined in [joint/index.d.ts:464](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L464)*

___

###  ShapeType

Ƭ **ShapeType**: *"circle" | "edge" | "polygon" | "chain"*

*Defined in [shape/index.d.ts:6](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L6)*

___

###  Solver

Ƭ **Solver**: *any*

*Defined in [index.d.ts:64](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L64)*

___

###  WeldJointDef

Ƭ **WeldJointDef**: *[JointDef](README.md#jointdef) & [WeldJointOpt](README.md#weldjointopt) & object*

*Defined in [joint/index.d.ts:507](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L507)*

___

###  WeldJointOpt

Ƭ **WeldJointOpt**: *[JointOpt](README.md#jointopt) & Partial‹object›*

*Defined in [joint/index.d.ts:502](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L502)*

___

###  WheelJointDef

Ƭ **WheelJointDef**: *[JointDef](README.md#jointdef) & [JointOpt](README.md#jointopt) & object*

*Defined in [joint/index.d.ts:571](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L571)*

___

###  WheelJointOpt

Ƭ **WheelJointOpt**: *[JointOpt](README.md#jointopt) & Partial‹object›*

*Defined in [joint/index.d.ts:564](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L564)*

___

###  WorldDef

Ƭ **WorldDef**: *Partial‹object›*

*Defined in [index.d.ts:400](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L400)*

## Variables

### `Let` AABB

• **AABB**: *object*

*Defined in [collision/index.d.ts:47](https://github.com/shakiba/planck.js/blob/49dcd19/lib/collision/index.d.ts#L47)*

#### Type declaration:

▸ (`lower?`: [Vec2](interfaces/vec2.md), `upper?`: [Vec2](interfaces/vec2.md)): *[AABB](interfaces/aabb.md)*

**Parameters:**

Name | Type |
------ | ------ |
`lower?` | [Vec2](interfaces/vec2.md) |
`upper?` | [Vec2](interfaces/vec2.md) |

* **new __type**(`lower?`: [Vec2](interfaces/vec2.md), `upper?`: [Vec2](interfaces/vec2.md)): *[AABB](interfaces/aabb.md)*

* **areEqual**(`a`: [AABB](interfaces/aabb.md), `b`: [AABB](interfaces/aabb.md)): *boolean*

* **assert**(`o`: any): *void*

* **diff**(`a`: [AABB](interfaces/aabb.md), `b`: [AABB](interfaces/aabb.md)): *number*

* **extend**(`aabb`: [AABB](interfaces/aabb.md), `value`: number): *void*

* **isValid**(`o`: any): *boolean*

* **testOverlap**(`a`: [AABB](interfaces/aabb.md), `b`: [AABB](interfaces/aabb.md)): *boolean*

___

### `Let` Body

• **Body**: *object*

*Defined in [index.d.ts:285](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L285)*

#### Type declaration:

* **new __type**(`world`: [World](interfaces/world.md), `def?`: [BodyDef](README.md#bodydef)): *[Body](interfaces/body.md)*

* **DYNAMIC**: *"dynamic"*

* **KINEMATIC**: *"kinematic"*

* **STATIC**: *"static"*

___

### `Let` Box

• **Box**: *object*

*Defined in [shape/index.d.ts:109](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L109)*

#### Type declaration:

▸ (`hx`: number, `hy`: number, `center?`: [Vec2](interfaces/vec2.md), `angle?`: number): *[PolygonShape](interfaces/polygonshape.md)*

**Parameters:**

Name | Type |
------ | ------ |
`hx` | number |
`hy` | number |
`center?` | [Vec2](interfaces/vec2.md) |
`angle?` | number |

* **new __type**(`hx`: number, `hy`: number, `center?`: [Vec2](interfaces/vec2.md), `angle?`: number): *[PolygonShape](interfaces/polygonshape.md)*

* **TYPE**: *"polygon"*

___

### `Let` Chain

• **Chain**: *object*

*Defined in [shape/index.d.ts:103](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L103)*

#### Type declaration:

▸ (`vertices`: [Vec2](interfaces/vec2.md)[], `loop?`: boolean): *[ChainShape](interfaces/chainshape.md)*

**Parameters:**

Name | Type |
------ | ------ |
`vertices` | [Vec2](interfaces/vec2.md)[] |
`loop?` | boolean |

* **new __type**(`vertices`: [Vec2](interfaces/vec2.md)[], `loop?`: boolean): *[ChainShape](interfaces/chainshape.md)*

* **TYPE**: *"chain"*

___

### `Let` Circle

• **Circle**: *object*

*Defined in [shape/index.d.ts:82](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L82)*

#### Type declaration:

▸ (`position`: [Vec2](interfaces/vec2.md), `radius?`: number): *[CircleShape](interfaces/circleshape.md)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](interfaces/vec2.md) |
`radius?` | number |

▸ (`radius?`: number): *[CircleShape](interfaces/circleshape.md)*

**Parameters:**

Name | Type |
------ | ------ |
`radius?` | number |

* **new __type**(`position`: [Vec2](interfaces/vec2.md), `radius?`: number): *[CircleShape](interfaces/circleshape.md)*

* **new __type**(`radius?`: number): *[CircleShape](interfaces/circleshape.md)*

* **TYPE**: *"circle"*

___

### `Let` Contact

• **Contact**: *object*

*Defined in [index.d.ts:389](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L389)*

#### Type declaration:

* **new __type**(`fA`: [Fixture](interfaces/fixture.md), `indexA`: number, `fB`: [Fixture](interfaces/fixture.md), `indexB`: number, `evaluateFcn`: function): *[Contact](interfaces/contact.md)*

* **addType**(`type1`: [ShapeType](README.md#shapetype), `type2`: [ShapeType](README.md#shapetype), `callback`: function): *void*

* **create**(`fixtureA`: [Fixture](interfaces/fixture.md), `indexA`: number, `fixtureB`: [Fixture](interfaces/fixture.md), `indexB`: number): *[Contact](interfaces/contact.md) | null*

* **destroy**(`contact`: [Contact](interfaces/contact.md), `listener`: object): *void*

___

### `Let` DistanceJoint

• **DistanceJoint**: *object*

*Defined in [joint/index.d.ts:578](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L578)*

#### Type declaration:

▸ (`def`: [DistanceJointDef](README.md#distancejointdef)): *[DistanceJoint](interfaces/distancejoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [DistanceJointDef](README.md#distancejointdef) |

▸ (`def`: [DistanceJointOpt](README.md#distancejointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `anchorA`: [Vec2](interfaces/vec2.md), `anchorB`: [Vec2](interfaces/vec2.md)): *[DistanceJoint](interfaces/distancejoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [DistanceJointOpt](README.md#distancejointopt) |
`bodyA` | [Body](interfaces/body.md) |
`bodyB` | [Body](interfaces/body.md) |
`anchorA` | [Vec2](interfaces/vec2.md) |
`anchorB` | [Vec2](interfaces/vec2.md) |

* **new __type**(`def`: [DistanceJointDef](README.md#distancejointdef)): *[DistanceJoint](interfaces/distancejoint.md)*

* **new __type**(`def`: [DistanceJointOpt](README.md#distancejointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `anchorA`: [Vec2](interfaces/vec2.md), `anchorB`: [Vec2](interfaces/vec2.md)): *[DistanceJoint](interfaces/distancejoint.md)*

* **TYPE**: *"distance-joint"*

___

### `Let` Edge

• **Edge**: *object*

*Defined in [shape/index.d.ts:91](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L91)*

#### Type declaration:

▸ (`v1`: [Vec2](interfaces/vec2.md), `v2`: [Vec2](interfaces/vec2.md)): *[EdgeShape](interfaces/edgeshape.md)*

**Parameters:**

Name | Type |
------ | ------ |
`v1` | [Vec2](interfaces/vec2.md) |
`v2` | [Vec2](interfaces/vec2.md) |

* **new __type**(`v1`: [Vec2](interfaces/vec2.md), `v2`: [Vec2](interfaces/vec2.md)): *[EdgeShape](interfaces/edgeshape.md)*

* **TYPE**: *"edge"*

___

### `Let` Fixture

• **Fixture**: *object*

*Defined in [index.d.ts:140](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L140)*

#### Type declaration:

* **new __type**(`body`: [Body](interfaces/body.md), `def`: [FixtureDef](README.md#fixturedef)): *[Fixture](interfaces/fixture.md)*

* **new __type**(`body`: [Body](interfaces/body.md), `shape`: [Shape](interfaces/shape.md), `def?`: [FixtureOpt](README.md#fixtureopt)): *[Fixture](interfaces/fixture.md)*

* **new __type**(`body`: [Body](interfaces/body.md), `shape`: [Shape](interfaces/shape.md), `density?`: number): *[Fixture](interfaces/fixture.md)*

___

### `Let` FrictionJoint

• **FrictionJoint**: *object*

*Defined in [joint/index.d.ts:587](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L587)*

#### Type declaration:

▸ (`def`: [FrictionJointDef](README.md#frictionjointdef)): *[FrictionJoint](interfaces/frictionjoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [FrictionJointDef](README.md#frictionjointdef) |

▸ (`def`: [FrictionJointOpt](README.md#frictionjointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `anchor`: [Vec2](interfaces/vec2.md)): *[FrictionJoint](interfaces/frictionjoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [FrictionJointOpt](README.md#frictionjointopt) |
`bodyA` | [Body](interfaces/body.md) |
`bodyB` | [Body](interfaces/body.md) |
`anchor` | [Vec2](interfaces/vec2.md) |

* **new __type**(`def`: [FrictionJointDef](README.md#frictionjointdef)): *[FrictionJoint](interfaces/frictionjoint.md)*

* **new __type**(`def`: [FrictionJointOpt](README.md#frictionjointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `anchor`: [Vec2](interfaces/vec2.md)): *[FrictionJoint](interfaces/frictionjoint.md)*

* **TYPE**: *"friction-joint"*

___

### `Let` GearJoint

• **GearJoint**: *object*

*Defined in [joint/index.d.ts:596](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L596)*

#### Type declaration:

▸ (`def`: [GearJointDef](README.md#gearjointdef)): *[GearJoint](interfaces/gearjoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [GearJointDef](README.md#gearjointdef) |

▸ (`def`: [GearJointOpt](README.md#gearjointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `joint1`: [RevoluteJoint](interfaces/revolutejoint.md) | [PrismaticJoint](interfaces/prismaticjoint.md), `joint2`: [RevoluteJoint](interfaces/revolutejoint.md) | [PrismaticJoint](interfaces/prismaticjoint.md), `ratio?`: number): *[GearJoint](interfaces/gearjoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [GearJointOpt](README.md#gearjointopt) |
`bodyA` | [Body](interfaces/body.md) |
`bodyB` | [Body](interfaces/body.md) |
`joint1` | [RevoluteJoint](interfaces/revolutejoint.md) &#124; [PrismaticJoint](interfaces/prismaticjoint.md) |
`joint2` | [RevoluteJoint](interfaces/revolutejoint.md) &#124; [PrismaticJoint](interfaces/prismaticjoint.md) |
`ratio?` | number |

* **new __type**(`def`: [GearJointDef](README.md#gearjointdef)): *[GearJoint](interfaces/gearjoint.md)*

* **new __type**(`def`: [GearJointOpt](README.md#gearjointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `joint1`: [RevoluteJoint](interfaces/revolutejoint.md) | [PrismaticJoint](interfaces/prismaticjoint.md), `joint2`: [RevoluteJoint](interfaces/revolutejoint.md) | [PrismaticJoint](interfaces/prismaticjoint.md), `ratio?`: number): *[GearJoint](interfaces/gearjoint.md)*

* **TYPE**: *"gear-joint"*

___

### `Let` Mat22

• **Mat22**: *object*

*Defined in [common/index.d.ts:220](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L220)*

#### Type declaration:

* **new __type**(`a`: number, `b`: number, `c`: number, `d`: number): *[Mat22](interfaces/mat22.md)*

* **new __type**(`a`: object, `b`: object): *[Mat22](interfaces/mat22.md)*

* **new __type**(): *[Mat22](interfaces/mat22.md)*

* **abs**(`mx`: [Mat22](interfaces/mat22.md)): *[Mat22](interfaces/mat22.md)*

* **add**(`mx1`: [Mat22](interfaces/mat22.md), `mx2`: [Mat22](interfaces/mat22.md)): *[Mat22](interfaces/mat22.md)*

* **assert**(`o`: any): *void*

* **isValid**(`o`: any): *boolean*

* **mul**(`mx`: [Mat22](interfaces/mat22.md), `my`: [Mat22](interfaces/mat22.md)): *[Mat22](interfaces/mat22.md)*

* **mul**(`mx`: [Mat22](interfaces/mat22.md), `v`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **mulMat22**(`mx`: [Mat22](interfaces/mat22.md), `my`: [Mat22](interfaces/mat22.md)): *[Mat22](interfaces/mat22.md)*

* **mulT**(`mx`: [Mat22](interfaces/mat22.md), `my`: [Mat22](interfaces/mat22.md)): *[Mat22](interfaces/mat22.md)*

* **mulT**(`mx`: [Mat22](interfaces/mat22.md), `v`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **mulVec2**(`mx`: [Mat22](interfaces/mat22.md), `v`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

___

### `Let` Mat33

• **Mat33**: *object*

*Defined in [common/index.d.ts:251](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L251)*

#### Type declaration:

* **new __type**(`a`: [Vec3](interfaces/vec3.md), `b`: [Vec3](interfaces/vec3.md), `c`: [Vec3](interfaces/vec3.md)): *[Mat33](interfaces/mat33.md)*

* **new __type**(`a`: any, `b`: any, `c`: any): *[Mat33](interfaces/mat33.md)*

* **new __type**(): *[Mat33](interfaces/mat33.md)*

* **add**(`a`: [Mat33](interfaces/mat33.md), `b`: [Mat33](interfaces/mat33.md)): *[Mat33](interfaces/mat33.md)*

* **assert**(`o`: any): *void*

* **isValid**(`o`: any): *boolean*

* **mul**(`a`: [Mat33](interfaces/mat33.md), `b`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **mul**(`a`: [Mat33](interfaces/mat33.md), `b`: [Vec3](interfaces/vec3.md)): *[Vec3](interfaces/vec3.md)*

* **mulVec2**(`a`: [Mat33](interfaces/mat33.md), `b`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **mulVec3**(`a`: [Mat33](interfaces/mat33.md), `b`: [Vec3](interfaces/vec3.md)): *[Vec3](interfaces/vec3.md)*

___

### `Let` Math

• **Math**: *Math & object*

*Defined in [common/index.d.ts:1](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L1)*

___

### `Let` MotorJoint

• **MotorJoint**: *object*

*Defined in [joint/index.d.ts:605](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L605)*

#### Type declaration:

▸ (`def`: [MotorJointDef](README.md#motorjointdef)): *[MotorJoint](interfaces/motorjoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MotorJointDef](README.md#motorjointdef) |

▸ (`def`: [MotorJointOpt](README.md#motorjointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md)): *[MotorJoint](interfaces/motorjoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MotorJointOpt](README.md#motorjointopt) |
`bodyA` | [Body](interfaces/body.md) |
`bodyB` | [Body](interfaces/body.md) |

* **new __type**(`def`: [MotorJointDef](README.md#motorjointdef)): *[MotorJoint](interfaces/motorjoint.md)*

* **new __type**(`def`: [MotorJointOpt](README.md#motorjointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md)): *[MotorJoint](interfaces/motorjoint.md)*

* **TYPE**: *"motor-joint"*

___

### `Let` MouseJoint

• **MouseJoint**: *object*

*Defined in [joint/index.d.ts:614](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L614)*

#### Type declaration:

▸ (`def`: [MouseJointDef](README.md#mousejointdef)): *[MouseJoint](interfaces/mousejoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MouseJointDef](README.md#mousejointdef) |

▸ (`def`: [MouseJointOpt](README.md#mousejointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `target`: [Vec2](interfaces/vec2.md)): *[MouseJoint](interfaces/mousejoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [MouseJointOpt](README.md#mousejointopt) |
`bodyA` | [Body](interfaces/body.md) |
`bodyB` | [Body](interfaces/body.md) |
`target` | [Vec2](interfaces/vec2.md) |

* **new __type**(`def`: [MouseJointDef](README.md#mousejointdef)): *[MouseJoint](interfaces/mousejoint.md)*

* **new __type**(`def`: [MouseJointOpt](README.md#mousejointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `target`: [Vec2](interfaces/vec2.md)): *[MouseJoint](interfaces/mousejoint.md)*

* **TYPE**: *"mouse-joint"*

___

### `Let` Polygon

• **Polygon**: *object*

*Defined in [shape/index.d.ts:97](https://github.com/shakiba/planck.js/blob/49dcd19/lib/shape/index.d.ts#L97)*

#### Type declaration:

▸ (`vertices`: [Vec2](interfaces/vec2.md)[]): *[PolygonShape](interfaces/polygonshape.md)*

**Parameters:**

Name | Type |
------ | ------ |
`vertices` | [Vec2](interfaces/vec2.md)[] |

* **new __type**(`vertices`: [Vec2](interfaces/vec2.md)[]): *[PolygonShape](interfaces/polygonshape.md)*

* **TYPE**: *"polygon"*

___

### `Let` PrismaticJoint

• **PrismaticJoint**: *object*

*Defined in [joint/index.d.ts:623](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L623)*

#### Type declaration:

▸ (`def`: [PrismaticJointDef](README.md#prismaticjointdef)): *[PrismaticJoint](interfaces/prismaticjoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PrismaticJointDef](README.md#prismaticjointdef) |

▸ (`def`: [PrismaticJointOpt](README.md#prismaticjointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `anchor`: [Vec2](interfaces/vec2.md), `axis`: [Vec2](interfaces/vec2.md)): *[PrismaticJoint](interfaces/prismaticjoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PrismaticJointOpt](README.md#prismaticjointopt) |
`bodyA` | [Body](interfaces/body.md) |
`bodyB` | [Body](interfaces/body.md) |
`anchor` | [Vec2](interfaces/vec2.md) |
`axis` | [Vec2](interfaces/vec2.md) |

* **new __type**(`def`: [PrismaticJointDef](README.md#prismaticjointdef)): *[PrismaticJoint](interfaces/prismaticjoint.md)*

* **new __type**(`def`: [PrismaticJointOpt](README.md#prismaticjointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `anchor`: [Vec2](interfaces/vec2.md), `axis`: [Vec2](interfaces/vec2.md)): *[PrismaticJoint](interfaces/prismaticjoint.md)*

* **TYPE**: *"prismatic-joint"*

___

### `Let` PulleyJoint

• **PulleyJoint**: *object*

*Defined in [joint/index.d.ts:632](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L632)*

#### Type declaration:

▸ (`def`: [PulleyJointDef](README.md#pulleyjointdef)): *[PulleyJoint](interfaces/pulleyjoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PulleyJointDef](README.md#pulleyjointdef) |

▸ (`def`: [PulleyJointOpt](README.md#pulleyjointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `groundA`: [Vec2](interfaces/vec2.md), `groundB`: [Vec2](interfaces/vec2.md), `anchorA`: [Vec2](interfaces/vec2.md), `anchorB`: [Vec2](interfaces/vec2.md), `ratio`: number): *[PulleyJoint](interfaces/pulleyjoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [PulleyJointOpt](README.md#pulleyjointopt) |
`bodyA` | [Body](interfaces/body.md) |
`bodyB` | [Body](interfaces/body.md) |
`groundA` | [Vec2](interfaces/vec2.md) |
`groundB` | [Vec2](interfaces/vec2.md) |
`anchorA` | [Vec2](interfaces/vec2.md) |
`anchorB` | [Vec2](interfaces/vec2.md) |
`ratio` | number |

* **new __type**(`def`: [PulleyJointDef](README.md#pulleyjointdef)): *[PulleyJoint](interfaces/pulleyjoint.md)*

* **new __type**(`def`: [PulleyJointOpt](README.md#pulleyjointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `groundA`: [Vec2](interfaces/vec2.md), `groundB`: [Vec2](interfaces/vec2.md), `anchorA`: [Vec2](interfaces/vec2.md), `anchorB`: [Vec2](interfaces/vec2.md), `ratio`: number): *[PulleyJoint](interfaces/pulleyjoint.md)*

* **MIN_PULLEY_LENGTH**: *number*

* **TYPE**: *"pulley-joint"*

___

### `Let` RevoluteJoint

• **RevoluteJoint**: *object*

*Defined in [joint/index.d.ts:642](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L642)*

#### Type declaration:

▸ (`def`: [RevoluteJointDef](README.md#revolutejointdef)): *[RevoluteJoint](interfaces/revolutejoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RevoluteJointDef](README.md#revolutejointdef) |

▸ (`def`: [RevoluteJointOpt](README.md#revolutejointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `anchor`: [Vec2](interfaces/vec2.md)): *[RevoluteJoint](interfaces/revolutejoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RevoluteJointOpt](README.md#revolutejointopt) |
`bodyA` | [Body](interfaces/body.md) |
`bodyB` | [Body](interfaces/body.md) |
`anchor` | [Vec2](interfaces/vec2.md) |

* **new __type**(`def`: [RevoluteJointDef](README.md#revolutejointdef)): *[RevoluteJoint](interfaces/revolutejoint.md)*

* **new __type**(`def`: [RevoluteJointOpt](README.md#revolutejointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `anchor`: [Vec2](interfaces/vec2.md)): *[RevoluteJoint](interfaces/revolutejoint.md)*

* **TYPE**: *"revolute-joint"*

___

### `Let` RopeJoint

• **RopeJoint**: *object*

*Defined in [joint/index.d.ts:651](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L651)*

#### Type declaration:

▸ (`def`: [RopeJointDef](README.md#ropejointdef)): *[RopeJoint](interfaces/ropejoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RopeJointDef](README.md#ropejointdef) |

▸ (`def`: [RopeJointOpt](README.md#ropejointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `anchor`: [Vec2](interfaces/vec2.md)): *[RopeJoint](interfaces/ropejoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [RopeJointOpt](README.md#ropejointopt) |
`bodyA` | [Body](interfaces/body.md) |
`bodyB` | [Body](interfaces/body.md) |
`anchor` | [Vec2](interfaces/vec2.md) |

* **new __type**(`def`: [RopeJointDef](README.md#ropejointdef)): *[RopeJoint](interfaces/ropejoint.md)*

* **new __type**(`def`: [RopeJointOpt](README.md#ropejointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `anchor`: [Vec2](interfaces/vec2.md)): *[RopeJoint](interfaces/ropejoint.md)*

* **TYPE**: *"rope-joint"*

___

### `Let` Rot

• **Rot**: *object*

*Defined in [common/index.d.ts:181](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L181)*

#### Type declaration:

▸ (`angle`: number): *[Rot](interfaces/rot.md)*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number |

▸ (`rot`: [Rot](interfaces/rot.md)): *[Rot](interfaces/rot.md)*

**Parameters:**

Name | Type |
------ | ------ |
`rot` | [Rot](interfaces/rot.md) |

▸ (): *[Rot](interfaces/rot.md)*

* **new __type**(`angle`: number): *[Rot](interfaces/rot.md)*

* **new __type**(`rot`: [Rot](interfaces/rot.md)): *[Rot](interfaces/rot.md)*

* **new __type**(): *[Rot](interfaces/rot.md)*

* **assert**(`o`: any): *void*

* **clone**(`rot`: [Rot](interfaces/rot.md)): *[Rot](interfaces/rot.md)*

* **identity**(): *[Rot](interfaces/rot.md)*

* **isValid**(`o`: any): *boolean*

* **mul**(`rot`: [Rot](interfaces/rot.md), `m`: [Rot](interfaces/rot.md)): *[Rot](interfaces/rot.md)*

* **mul**(`rot`: [Rot](interfaces/rot.md), `m`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **mulRot**(`rot`: [Rot](interfaces/rot.md), `m`: [Rot](interfaces/rot.md)): *[Rot](interfaces/rot.md)*

* **mulSub**(`rot`: [Rot](interfaces/rot.md), `v`: [Vec2](interfaces/vec2.md), `w`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **mulT**(`rot`: [Rot](interfaces/rot.md), `m`: [Rot](interfaces/rot.md)): *[Rot](interfaces/rot.md)*

* **mulT**(`rot`: [Rot](interfaces/rot.md), `m`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **mulTRot**(`rot`: [Rot](interfaces/rot.md), `m`: [Rot](interfaces/rot.md)): *[Rot](interfaces/rot.md)*

* **mulTVec2**(`rot`: [Rot](interfaces/rot.md), `m`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **mulVec2**(`rot`: [Rot](interfaces/rot.md), `m`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

___

### `Let` Transform

• **Transform**: *object*

*Defined in [common/index.d.ts:142](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L142)*

#### Type declaration:

▸ (`position`: [Vec2](interfaces/vec2.md), `rotation`: number): *[Transform](interfaces/transform.md)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](interfaces/vec2.md) |
`rotation` | number |

▸ (): *[Transform](interfaces/transform.md)*

* **new __type**(`position`: [Vec2](interfaces/vec2.md), `rotation`: number): *[Transform](interfaces/transform.md)*

* **new __type**(): *[Transform](interfaces/transform.md)*

* **assert**(`o`: any): *void*

* **clone**(`xf`: [Transform](interfaces/transform.md)): *[Transform](interfaces/transform.md)*

* **identity**(): *[Transform](interfaces/transform.md)*

* **isValid**(`o`: any): *boolean*

* **mul**(`a`: [Transform](interfaces/transform.md), `b`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **mul**(`a`: [Transform](interfaces/transform.md), `b`: [Transform](interfaces/transform.md)): *[Transform](interfaces/transform.md)*

* **mul**(`a`: [Transform](interfaces/transform.md), `b`: [Vec2](interfaces/vec2.md)[]): *[Vec2](interfaces/vec2.md)[]*

* **mul**(`a`: [Transform](interfaces/transform.md), `b`: [Transform](interfaces/transform.md)[]): *[Transform](interfaces/transform.md)[]*

* **mulT**(`a`: [Transform](interfaces/transform.md), `b`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **mulT**(`a`: [Transform](interfaces/transform.md), `b`: [Transform](interfaces/transform.md)): *[Transform](interfaces/transform.md)*

* **mulTVec2**(`a`: [Transform](interfaces/transform.md), `b`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **mulTXf**(`a`: [Transform](interfaces/transform.md), `b`: [Transform](interfaces/transform.md)): *[Transform](interfaces/transform.md)*

* **mulVec2**(`a`: [Transform](interfaces/transform.md), `b`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **mulXf**(`a`: [Transform](interfaces/transform.md), `b`: [Transform](interfaces/transform.md)): *[Transform](interfaces/transform.md)*

___

### `Let` Vec2

• **Vec2**: *object*

*Defined in [common/index.d.ts:55](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L55)*

#### Type declaration:

▸ (`x`: number, `y`: number): *[Vec2](interfaces/vec2.md)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

▸ (`obj`: object): *[Vec2](interfaces/vec2.md)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

▸ (): *[Vec2](interfaces/vec2.md)*

* **new __type**(`x`: number, `y`: number): *[Vec2](interfaces/vec2.md)*

* **new __type**(`obj`: object): *[Vec2](interfaces/vec2.md)*

* **new __type**(): *[Vec2](interfaces/vec2.md)*

* **abs**(`v`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **add**(`v`: [Vec2](interfaces/vec2.md), `w`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **addCross**(`a`: [Vec2](interfaces/vec2.md), `v`: [Vec2](interfaces/vec2.md), `w`: number): *[Vec2](interfaces/vec2.md)*

* **addCross**(`a`: [Vec2](interfaces/vec2.md), `v`: number, `w`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **areEqual**(`v`: [Vec2](interfaces/vec2.md), `w`: [Vec2](interfaces/vec2.md)): *boolean*

* **assert**(`o`: any): *void*

* **clamp**(`v`: [Vec2](interfaces/vec2.md), `max`: number): *[Vec2](interfaces/vec2.md)*

* **clone**(`v`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **combine**(`a`: number, `v`: [Vec2](interfaces/vec2.md), `b`: number, `w`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **cross**(`v`: [Vec2](interfaces/vec2.md), `w`: [Vec2](interfaces/vec2.md)): *number*

* **cross**(`v`: [Vec2](interfaces/vec2.md), `w`: number): *[Vec2](interfaces/vec2.md)*

* **cross**(`v`: number, `w`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **distance**(`v`: [Vec2](interfaces/vec2.md), `w`: [Vec2](interfaces/vec2.md)): *number*

* **distanceSquared**(`v`: [Vec2](interfaces/vec2.md), `w`: [Vec2](interfaces/vec2.md)): *number*

* **dot**(`v`: [Vec2](interfaces/vec2.md), `w`: [Vec2](interfaces/vec2.md)): *number*

* **isValid**(`v`: any): *boolean*

* **lengthOf**(`v`: [Vec2](interfaces/vec2.md)): *number*

* **lengthSquared**(`v`: [Vec2](interfaces/vec2.md)): *number*

* **lower**(`v`: [Vec2](interfaces/vec2.md), `w`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **mid**(`v`: [Vec2](interfaces/vec2.md), `w`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **mul**(`a`: [Vec2](interfaces/vec2.md), `b`: number): *[Vec2](interfaces/vec2.md)*

* **mul**(`a`: number, `b`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **neg**(`v`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **skew**(`v`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **sub**(`v`: [Vec2](interfaces/vec2.md), `w`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **upper**(`v`: [Vec2](interfaces/vec2.md), `w`: [Vec2](interfaces/vec2.md)): *[Vec2](interfaces/vec2.md)*

* **zero**(): *[Vec2](interfaces/vec2.md)*

___

### `Let` Vec3

• **Vec3**: *object*

*Defined in [common/index.d.ts:110](https://github.com/shakiba/planck.js/blob/49dcd19/lib/common/index.d.ts#L110)*

#### Type declaration:

▸ (`x`: number, `y`: number, `z`: number): *[Vec3](interfaces/vec3.md)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

▸ (`obj`: object): *[Vec3](interfaces/vec3.md)*

**Parameters:**

▪ **obj**: *object*

Name | Type |
------ | ------ |
`x` | number |
`y` | number |
`z` | number |

▸ (): *[Vec3](interfaces/vec3.md)*

* **new __type**(`x`: number, `y`: number, `z`: number): *[Vec3](interfaces/vec3.md)*

* **new __type**(`obj`: object): *[Vec3](interfaces/vec3.md)*

* **new __type**(): *[Vec3](interfaces/vec3.md)*

* **add**(`v`: [Vec3](interfaces/vec3.md), `w`: [Vec3](interfaces/vec3.md)): *[Vec3](interfaces/vec3.md)*

* **areEqual**(`v`: [Vec3](interfaces/vec3.md), `w`: [Vec3](interfaces/vec3.md)): *boolean*

* **assert**(`o`: any): *void*

* **clone**(`v`: [Vec3](interfaces/vec3.md)): *[Vec3](interfaces/vec3.md)*

* **cross**(`v`: [Vec3](interfaces/vec3.md), `w`: [Vec3](interfaces/vec3.md)): *[Vec3](interfaces/vec3.md)*

* **dot**(`v`: [Vec3](interfaces/vec3.md), `w`: [Vec3](interfaces/vec3.md)): *number*

* **isValid**(`v`: any): *void*

* **mul**(`v`: [Vec3](interfaces/vec3.md), `m`: number): *[Vec3](interfaces/vec3.md)*

* **neg**(`v`: [Vec3](interfaces/vec3.md)): *[Vec3](interfaces/vec3.md)*

* **sub**(`v`: [Vec3](interfaces/vec3.md), `w`: [Vec3](interfaces/vec3.md)): *[Vec3](interfaces/vec3.md)*

___

### `Let` WeldJoint

• **WeldJoint**: *object*

*Defined in [joint/index.d.ts:660](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L660)*

#### Type declaration:

▸ (`def`: [WeldJointDef](README.md#weldjointdef)): *[WeldJoint](interfaces/weldjoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WeldJointDef](README.md#weldjointdef) |

▸ (`def`: [WeldJointOpt](README.md#weldjointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `anchor`: [Vec2](interfaces/vec2.md)): *[WeldJoint](interfaces/weldjoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WeldJointOpt](README.md#weldjointopt) |
`bodyA` | [Body](interfaces/body.md) |
`bodyB` | [Body](interfaces/body.md) |
`anchor` | [Vec2](interfaces/vec2.md) |

* **new __type**(`def`: [WeldJointDef](README.md#weldjointdef)): *[WeldJoint](interfaces/weldjoint.md)*

* **new __type**(`def`: [WeldJointOpt](README.md#weldjointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `anchor`: [Vec2](interfaces/vec2.md)): *[WeldJoint](interfaces/weldjoint.md)*

* **TYPE**: *"weld-joint"*

___

### `Let` WheelJoint

• **WheelJoint**: *object*

*Defined in [joint/index.d.ts:669](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L669)*

#### Type declaration:

▸ (`def`: [WheelJointDef](README.md#wheeljointdef)): *[WheelJoint](interfaces/wheeljoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WheelJointDef](README.md#wheeljointdef) |

▸ (`def`: [WheelJointOpt](README.md#wheeljointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `anchor`: [Vec2](interfaces/vec2.md), `axis`: [Vec2](interfaces/vec2.md)): *[WheelJoint](interfaces/wheeljoint.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WheelJointOpt](README.md#wheeljointopt) |
`bodyA` | [Body](interfaces/body.md) |
`bodyB` | [Body](interfaces/body.md) |
`anchor` | [Vec2](interfaces/vec2.md) |
`axis` | [Vec2](interfaces/vec2.md) |

* **new __type**(`def`: [WheelJointDef](README.md#wheeljointdef)): *[WheelJoint](interfaces/wheeljoint.md)*

* **new __type**(`def`: [WheelJointOpt](README.md#wheeljointopt), `bodyA`: [Body](interfaces/body.md), `bodyB`: [Body](interfaces/body.md), `anchor`: [Vec2](interfaces/vec2.md), `axis`: [Vec2](interfaces/vec2.md)): *[WheelJoint](interfaces/wheeljoint.md)*

* **TYPE**: *"wheel-joint"*

___

### `Let` World

• **World**: *object*

*Defined in [index.d.ts:508](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L508)*

#### Type declaration:

▸ (`def`: [WorldDef](README.md#worlddef)): *[World](interfaces/world.md)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WorldDef](README.md#worlddef) |

▸ (`gravity`: [Vec2](interfaces/vec2.md)): *[World](interfaces/world.md)*

**Parameters:**

Name | Type |
------ | ------ |
`gravity` | [Vec2](interfaces/vec2.md) |

▸ (): *[World](interfaces/world.md)*

* **new __type**(`def`: [WorldDef](README.md#worlddef)): *[World](interfaces/world.md)*

* **new __type**(`gravity`: [Vec2](interfaces/vec2.md)): *[World](interfaces/world.md)*

* **new __type**(): *[World](interfaces/world.md)*
