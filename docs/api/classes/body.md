[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Body](body.md)

# Class: Body

A rigid body composed of one or more fixtures.

## Hierarchy

* **Body**

## Index

### Constructors

* [constructor](body.md#constructor)

### Properties

* [DYNAMIC](body.md#static-readonly-dynamic)
* [KINEMATIC](body.md#static-readonly-kinematic)
* [STATIC](body.md#static-readonly-static)

### Methods

* [advance](body.md#advance)
* [applyAngularImpulse](body.md#applyangularimpulse)
* [applyForce](body.md#applyforce)
* [applyForceToCenter](body.md#applyforcetocenter)
* [applyLinearImpulse](body.md#applylinearimpulse)
* [applyTorque](body.md#applytorque)
* [createFixture](body.md#createfixture)
* [destroyFixture](body.md#destroyfixture)
* [getAngle](body.md#getangle)
* [getAngularDamping](body.md#getangulardamping)
* [getAngularVelocity](body.md#getangularvelocity)
* [getContactList](body.md#getcontactlist)
* [getFixtureList](body.md#getfixturelist)
* [getGravityScale](body.md#getgravityscale)
* [getInertia](body.md#getinertia)
* [getJointList](body.md#getjointlist)
* [getLinearDamping](body.md#getlineardamping)
* [getLinearVelocity](body.md#getlinearvelocity)
* [getLinearVelocityFromLocalPoint](body.md#getlinearvelocityfromlocalpoint)
* [getLinearVelocityFromWorldPoint](body.md#getlinearvelocityfromworldpoint)
* [getLocalCenter](body.md#getlocalcenter)
* [getLocalPoint](body.md#getlocalpoint)
* [getLocalVector](body.md#getlocalvector)
* [getMass](body.md#getmass)
* [getMassData](body.md#getmassdata)
* [getNext](body.md#getnext)
* [getPosition](body.md#getposition)
* [getTransform](body.md#gettransform)
* [getUserData](body.md#getuserdata)
* [getWorld](body.md#getworld)
* [getWorldCenter](body.md#getworldcenter)
* [getWorldPoint](body.md#getworldpoint)
* [getWorldVector](body.md#getworldvector)
* [isActive](body.md#isactive)
* [isAwake](body.md#isawake)
* [isBullet](body.md#isbullet)
* [isDynamic](body.md#isdynamic)
* [isFixedRotation](body.md#isfixedrotation)
* [isKinematic](body.md#iskinematic)
* [isSleepingAllowed](body.md#issleepingallowed)
* [isStatic](body.md#isstatic)
* [isWorldLocked](body.md#isworldlocked)
* [resetMassData](body.md#resetmassdata)
* [setActive](body.md#setactive)
* [setAngle](body.md#setangle)
* [setAngularDamping](body.md#setangulardamping)
* [setAngularVelocity](body.md#setangularvelocity)
* [setAwake](body.md#setawake)
* [setBullet](body.md#setbullet)
* [setDynamic](body.md#setdynamic)
* [setFixedRotation](body.md#setfixedrotation)
* [setGravityScale](body.md#setgravityscale)
* [setKinematic](body.md#setkinematic)
* [setLinearDamping](body.md#setlineardamping)
* [setLinearVelocity](body.md#setlinearvelocity)
* [setMassData](body.md#setmassdata)
* [setPosition](body.md#setposition)
* [setSleepingAllowed](body.md#setsleepingallowed)
* [setStatic](body.md#setstatic)
* [setTransform](body.md#settransform)
* [setUserData](body.md#setuserdata)
* [shouldCollide](body.md#shouldcollide)
* [synchronizeFixtures](body.md#synchronizefixtures)
* [synchronizeTransform](body.md#synchronizetransform)

## Constructors

###  constructor

\+ **new Body**(`world`: [World](world.md), `def`: [BodyDef](../interfaces/bodydef.md)): *[Body](body.md)*

*Defined in [src/dynamics/Body.ts:208](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L208)*

**Parameters:**

Name | Type |
------ | ------ |
`world` | [World](world.md) |
`def` | [BodyDef](../interfaces/bodydef.md) |

**Returns:** *[Body](body.md)*

## Properties

### `Static` `Readonly` DYNAMIC

▪ **DYNAMIC**: *[BodyType](../globals.md#bodytype)* = "dynamic"

*Defined in [src/dynamics/Body.ts:171](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L171)*

A dynamic body is fully simulated.
They can be moved manually by the user, but normally they move according to forces.
A dynamic body can collide with all body types.
A dynamic body always has finite, non-zero mass.
If you try to set the mass of a dynamic body to zero, it will automatically acquire a mass of one kilogram and it won't rotate.

___

### `Static` `Readonly` KINEMATIC

▪ **KINEMATIC**: *[BodyType](../globals.md#bodytype)* = "kinematic"

*Defined in [src/dynamics/Body.ts:162](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L162)*

A kinematic body moves under simulation according to its velocity.
Kinematic bodies do not respond to forces.
They can be moved manually by the user, but normally a kinematic body is moved by setting its velocity.
A kinematic body behaves as if it has infinite mass, however, zero is stored for the mass and the inverse mass.
Kinematic bodies do not collide with other kinematic or static bodies.

___

### `Static` `Readonly` STATIC

▪ **STATIC**: *[BodyType](../globals.md#bodytype)* = "static"

*Defined in [src/dynamics/Body.ts:154](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L154)*

A static body does not move under simulation and behaves as if it has infinite mass.
Internally, zero is stored for the mass and the inverse mass.
Static bodies can be moved manually by the user.
A static body has zero velocity.
Static bodies do not collide with other static or kinematic bodies.

## Methods

###  advance

▸ **advance**(`alpha`: number): *void*

*Defined in [src/dynamics/Body.ts:603](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L603)*

Used in TOI.

**Parameters:**

Name | Type |
------ | ------ |
`alpha` | number |

**Returns:** *void*

___

###  applyAngularImpulse

▸ **applyAngularImpulse**(`impulse`: number, `wake?`: boolean): *void*

*Defined in [src/dynamics/Body.ts:975](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L975)*

Apply an angular impulse.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`impulse` | number | The angular impulse in units of kg*m*m/s |
`wake?` | boolean | Also wake up the body  |

**Returns:** *void*

___

###  applyForce

▸ **applyForce**(`force`: [Vec2](vec2.md), `point`: [Vec2](vec2.md), `wake?`: boolean): *void*

*Defined in [src/dynamics/Body.ts:892](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L892)*

Apply a force at a world point. If the force is not applied at the center of
mass, it will generate a torque and affect the angular velocity. This wakes
up the body.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`force` | [Vec2](vec2.md) | The world force vector, usually in Newtons (N). |
`point` | [Vec2](vec2.md) | The world position of the point of application. |
`wake?` | boolean | Also wake up the body  |

**Returns:** *void*

___

###  applyForceToCenter

▸ **applyForceToCenter**(`force`: [Vec2](vec2.md), `wake?`: boolean): *void*

*Defined in [src/dynamics/Body.ts:912](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L912)*

Apply a force to the center of mass. This wakes up the body.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`force` | [Vec2](vec2.md) | The world force vector, usually in Newtons (N). |
`wake?` | boolean | Also wake up the body  |

**Returns:** *void*

___

###  applyLinearImpulse

▸ **applyLinearImpulse**(`impulse`: [Vec2](vec2.md), `point`: [Vec2](vec2.md), `wake?`: boolean): *void*

*Defined in [src/dynamics/Body.ts:954](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L954)*

Apply an impulse at a point. This immediately modifies the velocity. It also
modifies the angular velocity if the point of application is not at the
center of mass. This wakes up the body.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`impulse` | [Vec2](vec2.md) | The world impulse vector, usually in N-seconds or kg-m/s. |
`point` | [Vec2](vec2.md) | The world position of the point of application. |
`wake?` | boolean | Also wake up the body  |

**Returns:** *void*

___

###  applyTorque

▸ **applyTorque**(`torque`: number, `wake?`: boolean): *void*

*Defined in [src/dynamics/Body.ts:932](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L932)*

Apply a torque. This affects the angular velocity without affecting the
linear velocity of the center of mass. This wakes up the body.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`torque` | number | About the z-axis (out of the screen), usually in N-m. |
`wake?` | boolean | Also wake up the body  |

**Returns:** *void*

___

###  createFixture

▸ **createFixture**(`def`: [FixtureDef](../interfaces/fixturedef.md)): *[Fixture](fixture.md)*

*Defined in [src/dynamics/Body.ts:1049](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L1049)*

Creates a fixture and attach it to this body.

If the density is non-zero, this function automatically updates the mass of
the body.

Contacts are not created until the next time step.

Warning: This function is locked during callbacks.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [FixtureDef](../interfaces/fixturedef.md) |

**Returns:** *[Fixture](fixture.md)*

▸ **createFixture**(`shape`: [Shape](shape.md), `opt?`: [FixtureOpt](../interfaces/fixtureopt.md)): *[Fixture](fixture.md)*

*Defined in [src/dynamics/Body.ts:1050](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L1050)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) |
`opt?` | [FixtureOpt](../interfaces/fixtureopt.md) |

**Returns:** *[Fixture](fixture.md)*

▸ **createFixture**(`shape`: [Shape](shape.md), `density?`: number): *[Fixture](fixture.md)*

*Defined in [src/dynamics/Body.ts:1051](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L1051)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) |
`density?` | number |

**Returns:** *[Fixture](fixture.md)*

___

###  destroyFixture

▸ **destroyFixture**(`fixture`: [Fixture](fixture.md)): *void*

*Defined in [src/dynamics/Body.ts:1075](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L1075)*

Destroy a fixture. This removes the fixture from the broad-phase and destroys
all contacts associated with this fixture. This will automatically adjust the
mass of the body if the body is dynamic and the fixture has positive density.
All fixtures attached to a body are implicitly destroyed when the body is
destroyed.

Warning: This function is locked during callbacks.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fixture` | [Fixture](fixture.md) | The fixture to be removed.  |

**Returns:** *void*

___

###  getAngle

▸ **getAngle**(): *number*

*Defined in [src/dynamics/Body.ts:625](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L625)*

Get the current world rotation angle in radians.

**Returns:** *number*

___

###  getAngularDamping

▸ **getAngularDamping**(): *number*

*Defined in [src/dynamics/Body.ts:723](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L723)*

**Returns:** *number*

___

###  getAngularVelocity

▸ **getAngularVelocity**(): *number*

*Defined in [src/dynamics/Body.ts:696](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L696)*

Get the angular velocity.

**Returns:** *number*

the angular velocity in radians/second.

___

###  getContactList

▸ **getContactList**(): *[ContactEdge](contactedge.md) | null*

*Defined in [src/dynamics/Body.ts:343](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L343)*

Warning: this list changes during the time step and you may miss some
collisions if you don't use ContactListener.

**Returns:** *[ContactEdge](contactedge.md) | null*

___

###  getFixtureList

▸ **getFixtureList**(): *[Fixture](fixture.md) | null*

*Defined in [src/dynamics/Body.ts:331](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L331)*

**Returns:** *[Fixture](fixture.md) | null*

___

###  getGravityScale

▸ **getGravityScale**(): *number*

*Defined in [src/dynamics/Body.ts:731](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L731)*

**Returns:** *number*

___

###  getInertia

▸ **getInertia**(): *number*

*Defined in [src/dynamics/Body.ts:756](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L756)*

Get the rotational inertia of the body about the local origin.

**Returns:** *number*

the rotational inertia, usually in kg-m^2.

___

###  getJointList

▸ **getJointList**(): *[JointEdge](jointedge.md) | null*

*Defined in [src/dynamics/Body.ts:335](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L335)*

**Returns:** *[JointEdge](jointedge.md) | null*

___

###  getLinearDamping

▸ **getLinearDamping**(): *number*

*Defined in [src/dynamics/Body.ts:715](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L715)*

**Returns:** *number*

___

###  getLinearVelocity

▸ **getLinearVelocity**(): *[Vec2](vec2.md)*

*Defined in [src/dynamics/Body.ts:652](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L652)*

Get the linear velocity of the center of mass.

**Returns:** *[Vec2](vec2.md)*

the linear velocity of the center of mass.

___

###  getLinearVelocityFromLocalPoint

▸ **getLinearVelocityFromLocalPoint**(`localPoint`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/dynamics/Body.ts:672](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L672)*

Get the world velocity of a local point.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`localPoint` | [Vec2](vec2.md) | A point in local coordinates.  |

**Returns:** *[Vec2](vec2.md)*

___

###  getLinearVelocityFromWorldPoint

▸ **getLinearVelocityFromWorldPoint**(`worldPoint`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/dynamics/Body.ts:661](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L661)*

Get the world linear velocity of a world point attached to this body.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`worldPoint` | [Vec2](vec2.md) | A point in world coordinates.  |

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalCenter

▸ **getLocalCenter**(): *[Vec2](vec2.md)*

*Defined in [src/dynamics/Body.ts:643](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L643)*

Get the local position of the center of mass.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalPoint

▸ **getLocalPoint**(`worldPoint`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/dynamics/Body.ts:1152](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L1152)*

Gets the corresponding local point of a world point.

**Parameters:**

Name | Type |
------ | ------ |
`worldPoint` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalVector

▸ **getLocalVector**(`worldVector`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/dynamics/Body.ts:1159](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L1159)*

Gets the corresponding local vector of a world vector.

**Parameters:**

Name | Type |
------ | ------ |
`worldVector` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getMass

▸ **getMass**(): *number*

*Defined in [src/dynamics/Body.ts:747](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L747)*

Get the total mass of the body.

**Returns:** *number*

The mass, usually in kilograms (kg).

___

###  getMassData

▸ **getMassData**(`data`: [MassData](massdata.md)): *void*

*Defined in [src/dynamics/Body.ts:764](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L764)*

Copy the mass data of the body to data.

**Parameters:**

Name | Type |
------ | ------ |
`data` | [MassData](massdata.md) |

**Returns:** *void*

___

###  getNext

▸ **getNext**(): *[Body](body.md) | null*

*Defined in [src/dynamics/Body.ts:319](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L319)*

**Returns:** *[Body](body.md) | null*

___

###  getPosition

▸ **getPosition**(): *[Vec2](vec2.md)*

*Defined in [src/dynamics/Body.ts:614](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L614)*

Get the world position for the body's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getTransform

▸ **getTransform**(): *[Transform](transform.md)*

*Defined in [src/dynamics/Body.ts:555](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L555)*

Get the world transform for the body's origin.

**Returns:** *[Transform](transform.md)*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Defined in [src/dynamics/Body.ts:327](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L327)*

**Returns:** *unknown*

___

###  getWorld

▸ **getWorld**(): *[World](world.md)*

*Defined in [src/dynamics/Body.ts:315](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L315)*

**Returns:** *[World](world.md)*

___

###  getWorldCenter

▸ **getWorldCenter**(): *[Vec2](vec2.md)*

*Defined in [src/dynamics/Body.ts:636](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L636)*

Get the world position of the center of mass.

**Returns:** *[Vec2](vec2.md)*

___

###  getWorldPoint

▸ **getWorldPoint**(`localPoint`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/dynamics/Body.ts:1138](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L1138)*

Get the corresponding world point of a local point.

**Parameters:**

Name | Type |
------ | ------ |
`localPoint` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getWorldVector

▸ **getWorldVector**(`localVector`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [src/dynamics/Body.ts:1145](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L1145)*

Get the corresponding world vector of a local vector.

**Parameters:**

Name | Type |
------ | ------ |
`localVector` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  isActive

▸ **isActive**(): *boolean*

*Defined in [src/dynamics/Body.ts:481](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L481)*

**Returns:** *boolean*

___

###  isAwake

▸ **isAwake**(): *boolean*

*Defined in [src/dynamics/Body.ts:456](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L456)*

**Returns:** *boolean*

___

###  isBullet

▸ **isBullet**(): *boolean*

*Defined in [src/dynamics/Body.ts:434](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L434)*

**Returns:** *boolean*

___

###  isDynamic

▸ **isDynamic**(): *boolean*

*Defined in [src/dynamics/Body.ts:351](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L351)*

**Returns:** *boolean*

___

###  isFixedRotation

▸ **isFixedRotation**(): *boolean*

*Defined in [src/dynamics/Body.ts:533](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L533)*

**Returns:** *boolean*

___

###  isKinematic

▸ **isKinematic**(): *boolean*

*Defined in [src/dynamics/Body.ts:355](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L355)*

**Returns:** *boolean*

___

###  isSleepingAllowed

▸ **isSleepingAllowed**(): *boolean*

*Defined in [src/dynamics/Body.ts:445](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L445)*

**Returns:** *boolean*

___

###  isStatic

▸ **isStatic**(): *boolean*

*Defined in [src/dynamics/Body.ts:347](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L347)*

**Returns:** *boolean*

___

###  isWorldLocked

▸ **isWorldLocked**(): *boolean*

*Defined in [src/dynamics/Body.ts:311](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L311)*

**Returns:** *boolean*

___

###  resetMassData

▸ **resetMassData**(): *void*

*Defined in [src/dynamics/Body.ts:775](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L775)*

This resets the mass properties to the sum of the mass properties of the
fixtures. This normally does not need to be called unless you called
SetMassData to override the mass and you later want to reset the mass.

**Returns:** *void*

___

###  setActive

▸ **setActive**(`flag`: boolean): *void*

*Defined in [src/dynamics/Body.ts:498](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L498)*

Set the active state of the body. An inactive body is not simulated and
cannot be collided with or woken up. If you pass a flag of true, all fixtures
will be added to the broad-phase. If you pass a flag of false, all fixtures
will be removed from the broad-phase and all contacts will be destroyed.
Fixtures and joints are otherwise unaffected.

You may continue to create/destroy fixtures and joints on inactive bodies.
Fixtures on an inactive body are implicitly inactive and will not participate
in collisions, ray-casts, or queries. Joints connected to an inactive body
are implicitly inactive. An inactive body is still owned by a World object
and remains

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setAngle

▸ **setAngle**(`angle`: number): *void*

*Defined in [src/dynamics/Body.ts:629](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L629)*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number |

**Returns:** *void*

___

###  setAngularDamping

▸ **setAngularDamping**(`angularDamping`: number): *void*

*Defined in [src/dynamics/Body.ts:727](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L727)*

**Parameters:**

Name | Type |
------ | ------ |
`angularDamping` | number |

**Returns:** *void*

___

###  setAngularVelocity

▸ **setAngularVelocity**(`w`: number): *void*

*Defined in [src/dynamics/Body.ts:705](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L705)*

Set the angular velocity.

**Parameters:**

Name | Type |
------ | ------ |
`w` | number |

**Returns:** *void*

___

###  setAwake

▸ **setAwake**(`flag`: boolean): *void*

*Defined in [src/dynamics/Body.ts:465](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L465)*

Set the sleep state of the body. A sleeping body has very low CPU cost.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`flag` | boolean | Set to true to wake the body, false to put it to sleep.  |

**Returns:** *void*

___

###  setBullet

▸ **setBullet**(`flag`: boolean): *void*

*Defined in [src/dynamics/Body.ts:441](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L441)*

Should this body be treated like a bullet for continuous collision detection?

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setDynamic

▸ **setDynamic**(): *[Body](body.md)*

*Defined in [src/dynamics/Body.ts:367](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L367)*

**Returns:** *[Body](body.md)*

___

###  setFixedRotation

▸ **setFixedRotation**(`flag`: boolean): *void*

*Defined in [src/dynamics/Body.ts:540](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L540)*

Set this body to have fixed rotation. This causes the mass to be reset.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setGravityScale

▸ **setGravityScale**(`scale`: number): *void*

*Defined in [src/dynamics/Body.ts:738](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L738)*

Scale the gravity applied to this body.

**Parameters:**

Name | Type |
------ | ------ |
`scale` | number |

**Returns:** *void*

___

###  setKinematic

▸ **setKinematic**(): *[Body](body.md)*

*Defined in [src/dynamics/Body.ts:372](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L372)*

**Returns:** *[Body](body.md)*

___

###  setLinearDamping

▸ **setLinearDamping**(`linearDamping`: number): *void*

*Defined in [src/dynamics/Body.ts:719](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L719)*

**Parameters:**

Name | Type |
------ | ------ |
`linearDamping` | number |

**Returns:** *void*

___

###  setLinearVelocity

▸ **setLinearVelocity**(`v`: [Vec2](vec2.md)): *void*

*Defined in [src/dynamics/Body.ts:681](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L681)*

Set the linear velocity of the center of mass.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec2](vec2.md) | The new linear velocity of the center of mass.  |

**Returns:** *void*

___

###  setMassData

▸ **setMassData**(`massData`: [MassData](massdata.md)): *void*

*Defined in [src/dynamics/Body.ts:846](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L846)*

Set the mass properties to override the mass properties of the fixtures. Note
that this changes the center of mass position. Note that creating or
destroying fixtures can also alter the mass. This function has no effect if
the body isn't dynamic.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | [MassData](massdata.md) | The mass properties.  |

**Returns:** *void*

___

###  setPosition

▸ **setPosition**(`p`: [Vec2](vec2.md)): *void*

*Defined in [src/dynamics/Body.ts:618](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L618)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  setSleepingAllowed

▸ **setSleepingAllowed**(`flag`: boolean): *void*

*Defined in [src/dynamics/Body.ts:449](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L449)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setStatic

▸ **setStatic**(): *[Body](body.md)*

*Defined in [src/dynamics/Body.ts:362](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L362)*

This will alter the mass and velocity.

**Returns:** *[Body](body.md)*

___

###  setTransform

▸ **setTransform**(`position`: [Vec2](vec2.md), `angle`: number): *void*

*Defined in [src/dynamics/Body.ts:567](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L567)*

Set the position of the body's origin and rotation. Manipulating a body's
transform may cause non-physical behavior. Note: contacts are updated on the
next call to World.step.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`position` | [Vec2](vec2.md) | The world position of the body's local origin. |
`angle` | number | The world rotation in radians.  |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: any): *void*

*Defined in [src/dynamics/Body.ts:323](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L323)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

###  shouldCollide

▸ **shouldCollide**(`that`: [Body](body.md)): *boolean*

*Defined in [src/dynamics/Body.ts:993](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L993)*

This is used to prevent connected bodies (by joints) from colliding,
depending on the joint's collideConnected flag.

**Parameters:**

Name | Type |
------ | ------ |
`that` | [Body](body.md) |

**Returns:** *boolean*

___

###  synchronizeFixtures

▸ **synchronizeFixtures**(): *void*

*Defined in [src/dynamics/Body.ts:589](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L589)*

Update fixtures in broad-phase.

**Returns:** *void*

___

###  synchronizeTransform

▸ **synchronizeTransform**(): *void*

*Defined in [src/dynamics/Body.ts:582](https://github.com/shakiba/planck.js/blob/1523746/src/dynamics/Body.ts#L582)*

**Returns:** *void*
