[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Body](body.md)

# Class: Body

A rigid body composed of one or more fixtures.
A rigid body composed of one or more fixtures.

## Hierarchy

* **Body**

## Index

### Constructors

* [constructor](body.md#constructor)

### Properties

* [DYNAMIC](body.md#static-dynamic)
* [KINEMATIC](body.md#static-kinematic)
* [STATIC](body.md#static-static)

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

\+ **new Body**(`world`: any, `def`: any): *[Body](body.md)*

*Defined in [dist/planck.d.ts:1614](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1614)*

**Parameters:**

Name | Type |
------ | ------ |
`world` | any |
`def` | any |

**Returns:** *[Body](body.md)*

## Properties

### `Static` DYNAMIC

▪ **DYNAMIC**: *[BodyType](../globals.md#bodytype)* = DYNAMIC

*Defined in [dist/planck.d.ts:1614](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1614)*

*Defined in [src/dynamics/Body.ts:149](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Body.ts#L149)*

___

### `Static` KINEMATIC

▪ **KINEMATIC**: *[BodyType](../globals.md#bodytype)* = KINEMATIC

*Defined in [dist/planck.d.ts:1613](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1613)*

*Defined in [src/dynamics/Body.ts:148](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Body.ts#L148)*

___

### `Static` STATIC

▪ **STATIC**: *[BodyType](../globals.md#bodytype)* = STATIC

*Defined in [dist/planck.d.ts:1612](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1612)*

*Defined in [src/dynamics/Body.ts:147](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Body.ts#L147)*

## Methods

###  advance

▸ **advance**(`alpha`: number): *void*

*Defined in [dist/planck.d.ts:1692](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1692)*

Used in TOI.

**Parameters:**

Name | Type |
------ | ------ |
`alpha` | number |

**Returns:** *void*

___

###  applyAngularImpulse

▸ **applyAngularImpulse**(`impulse`: number, `wake?`: boolean): *void*

*Defined in [dist/planck.d.ts:1828](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1828)*

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

*Defined in [dist/planck.d.ts:1796](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1796)*

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

*Defined in [dist/planck.d.ts:1803](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1803)*

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

*Defined in [dist/planck.d.ts:1821](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1821)*

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

*Defined in [dist/planck.d.ts:1811](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1811)*

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

*Defined in [dist/planck.d.ts:1844](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1844)*

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

*Defined in [dist/planck.d.ts:1845](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1845)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) |
`opt?` | [FixtureOpt](../interfaces/fixtureopt.md) |

**Returns:** *[Fixture](fixture.md)*

▸ **createFixture**(`shape`: [Shape](shape.md), `density?`: number): *[Fixture](fixture.md)*

*Defined in [dist/planck.d.ts:1846](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1846)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) |
`density?` | number |

**Returns:** *[Fixture](fixture.md)*

▸ **createFixture**(`def`: FixtureDef): *Fixture*

*Defined in [src/dynamics/Body.ts:1027](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Body.ts#L1027)*

Creates a fixture and attach it to this body.

If the density is non-zero, this function automatically updates the mass of
the body.

Contacts are not created until the next time step.

Warning: This function is locked during callbacks.

**Parameters:**

Name | Type |
------ | ------ |
`def` | FixtureDef |

**Returns:** *Fixture*

▸ **createFixture**(`shape`: Shape, `opt?`: FixtureOpt): *Fixture*

*Defined in [src/dynamics/Body.ts:1028](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Body.ts#L1028)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | Shape |
`opt?` | FixtureOpt |

**Returns:** *Fixture*

▸ **createFixture**(`shape`: Shape, `density?`: number): *Fixture*

*Defined in [src/dynamics/Body.ts:1029](https://github.com/shakiba/planck.js/blob/6a5d3be/src/dynamics/Body.ts#L1029)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | Shape |
`density?` | number |

**Returns:** *Fixture*

___

###  destroyFixture

▸ **destroyFixture**(`fixture`: [Fixture](fixture.md)): *void*

*Defined in [dist/planck.d.ts:1858](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1858)*

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

*Defined in [dist/planck.d.ts:1701](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1701)*

Get the current world rotation angle in radians.

**Returns:** *number*

___

###  getAngularDamping

▸ **getAngularDamping**(): *number*

*Defined in [dist/planck.d.ts:1749](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1749)*

**Returns:** *number*

___

###  getAngularVelocity

▸ **getAngularVelocity**(): *number*

*Defined in [dist/planck.d.ts:1740](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1740)*

Get the angular velocity.

**Returns:** *number*

the angular velocity in radians/second.

___

###  getContactList

▸ **getContactList**(): *[ContactEdge](contactedge.md) | null*

*Defined in [dist/planck.d.ts:1627](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1627)*

Warning: this list changes during the time step and you may miss some
collisions if you don't use ContactListener.

**Returns:** *[ContactEdge](contactedge.md) | null*

___

###  getFixtureList

▸ **getFixtureList**(): *[Fixture](fixture.md) | null*

*Defined in [dist/planck.d.ts:1621](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1621)*

**Returns:** *[Fixture](fixture.md) | null*

___

###  getGravityScale

▸ **getGravityScale**(): *number*

*Defined in [dist/planck.d.ts:1751](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1751)*

**Returns:** *number*

___

###  getInertia

▸ **getInertia**(): *number*

*Defined in [dist/planck.d.ts:1767](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1767)*

Get the rotational inertia of the body about the local origin.

**Returns:** *number*

the rotational inertia, usually in kg-m^2.

___

###  getJointList

▸ **getJointList**(): *[JointEdge](jointedge.md) | null*

*Defined in [dist/planck.d.ts:1622](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1622)*

**Returns:** *[JointEdge](jointedge.md) | null*

___

###  getLinearDamping

▸ **getLinearDamping**(): *number*

*Defined in [dist/planck.d.ts:1747](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1747)*

**Returns:** *number*

___

###  getLinearVelocity

▸ **getLinearVelocity**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1716](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1716)*

Get the linear velocity of the center of mass.

**Returns:** *[Vec2](vec2.md)*

the linear velocity of the center of mass.

___

###  getLinearVelocityFromLocalPoint

▸ **getLinearVelocityFromLocalPoint**(`localPoint`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1728](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1728)*

Get the world velocity of a local point.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`localPoint` | [Vec2](vec2.md) | A point in local coordinates.  |

**Returns:** *[Vec2](vec2.md)*

___

###  getLinearVelocityFromWorldPoint

▸ **getLinearVelocityFromWorldPoint**(`worldPoint`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1722](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1722)*

Get the world linear velocity of a world point attached to this body.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`worldPoint` | [Vec2](vec2.md) | A point in world coordinates.  |

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalCenter

▸ **getLocalCenter**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1710](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1710)*

Get the local position of the center of mass.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalPoint

▸ **getLocalPoint**(`worldPoint`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1870](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1870)*

Gets the corresponding local point of a world point.

**Parameters:**

Name | Type |
------ | ------ |
`worldPoint` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalVector

▸ **getLocalVector**(`worldVector`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1874](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1874)*

Gets the corresponding local vector of a world vector.

**Parameters:**

Name | Type |
------ | ------ |
`worldVector` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getMass

▸ **getMass**(): *number*

*Defined in [dist/planck.d.ts:1761](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1761)*

Get the total mass of the body.

**Returns:** *number*

The mass, usually in kilograms (kg).

___

###  getMassData

▸ **getMassData**(`data`: [MassData](massdata.md)): *void*

*Defined in [dist/planck.d.ts:1771](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1771)*

Copy the mass data of the body to data.

**Parameters:**

Name | Type |
------ | ------ |
`data` | [MassData](massdata.md) |

**Returns:** *void*

___

###  getNext

▸ **getNext**(): *[Body](body.md) | null*

*Defined in [dist/planck.d.ts:1618](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1618)*

**Returns:** *[Body](body.md) | null*

___

###  getPosition

▸ **getPosition**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1696](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1696)*

Get the world position for the body's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getTransform

▸ **getTransform**(): *[Transform](transform.md)*

*Defined in [dist/planck.d.ts:1674](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1674)*

Get the world transform for the body's origin.

**Returns:** *[Transform](transform.md)*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Defined in [dist/planck.d.ts:1620](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1620)*

**Returns:** *unknown*

___

###  getWorld

▸ **getWorld**(): *[World](world.md)*

*Defined in [dist/planck.d.ts:1617](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1617)*

**Returns:** *[World](world.md)*

___

###  getWorldCenter

▸ **getWorldCenter**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1706](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1706)*

Get the world position of the center of mass.

**Returns:** *[Vec2](vec2.md)*

___

###  getWorldPoint

▸ **getWorldPoint**(`localPoint`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1862](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1862)*

Get the corresponding world point of a local point.

**Parameters:**

Name | Type |
------ | ------ |
`localPoint` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getWorldVector

▸ **getWorldVector**(`localVector`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1866](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1866)*

Get the corresponding world vector of a local vector.

**Parameters:**

Name | Type |
------ | ------ |
`localVector` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  isActive

▸ **isActive**(): *boolean*

*Defined in [dist/planck.d.ts:1651](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1651)*

**Returns:** *boolean*

___

###  isAwake

▸ **isAwake**(): *boolean*

*Defined in [dist/planck.d.ts:1644](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1644)*

**Returns:** *boolean*

___

###  isBullet

▸ **isBullet**(): *boolean*

*Defined in [dist/planck.d.ts:1637](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1637)*

**Returns:** *boolean*

___

###  isDynamic

▸ **isDynamic**(): *boolean*

*Defined in [dist/planck.d.ts:1629](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1629)*

**Returns:** *boolean*

___

###  isFixedRotation

▸ **isFixedRotation**(): *boolean*

*Defined in [dist/planck.d.ts:1666](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1666)*

**Returns:** *boolean*

___

###  isKinematic

▸ **isKinematic**(): *boolean*

*Defined in [dist/planck.d.ts:1630](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1630)*

**Returns:** *boolean*

___

###  isSleepingAllowed

▸ **isSleepingAllowed**(): *boolean*

*Defined in [dist/planck.d.ts:1642](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1642)*

**Returns:** *boolean*

___

###  isStatic

▸ **isStatic**(): *boolean*

*Defined in [dist/planck.d.ts:1628](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1628)*

**Returns:** *boolean*

___

###  isWorldLocked

▸ **isWorldLocked**(): *boolean*

*Defined in [dist/planck.d.ts:1616](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1616)*

**Returns:** *boolean*

___

###  resetMassData

▸ **resetMassData**(): *void*

*Defined in [dist/planck.d.ts:1777](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1777)*

This resets the mass properties to the sum of the mass properties of the
fixtures. This normally does not need to be called unless you called
SetMassData to override the mass and you later want to reset the mass.

**Returns:** *void*

___

###  setActive

▸ **setActive**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1665](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1665)*

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

*Defined in [dist/planck.d.ts:1702](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1702)*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number |

**Returns:** *void*

___

###  setAngularDamping

▸ **setAngularDamping**(`angularDamping`: number): *void*

*Defined in [dist/planck.d.ts:1750](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1750)*

**Parameters:**

Name | Type |
------ | ------ |
`angularDamping` | number |

**Returns:** *void*

___

###  setAngularVelocity

▸ **setAngularVelocity**(`w`: number): *void*

*Defined in [dist/planck.d.ts:1746](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1746)*

Set the angular velocity.

**Parameters:**

Name | Type |
------ | ------ |
`w` | number |

**Returns:** *void*

___

###  setAwake

▸ **setAwake**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1650](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1650)*

Set the sleep state of the body. A sleeping body has very low CPU cost.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`flag` | boolean | Set to true to wake the body, false to put it to sleep.  |

**Returns:** *void*

___

###  setBullet

▸ **setBullet**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1641](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1641)*

Should this body be treated like a bullet for continuous collision detection?

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setDynamic

▸ **setDynamic**(): *[Body](body.md)*

*Defined in [dist/planck.d.ts:1635](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1635)*

**Returns:** *[Body](body.md)*

___

###  setFixedRotation

▸ **setFixedRotation**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1670](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1670)*

Set this body to have fixed rotation. This causes the mass to be reset.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setGravityScale

▸ **setGravityScale**(`scale`: number): *void*

*Defined in [dist/planck.d.ts:1755](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1755)*

Scale the gravity applied to this body.

**Parameters:**

Name | Type |
------ | ------ |
`scale` | number |

**Returns:** *void*

___

###  setKinematic

▸ **setKinematic**(): *[Body](body.md)*

*Defined in [dist/planck.d.ts:1636](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1636)*

**Returns:** *[Body](body.md)*

___

###  setLinearDamping

▸ **setLinearDamping**(`linearDamping`: number): *void*

*Defined in [dist/planck.d.ts:1748](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1748)*

**Parameters:**

Name | Type |
------ | ------ |
`linearDamping` | number |

**Returns:** *void*

___

###  setLinearVelocity

▸ **setLinearVelocity**(`v`: [Vec2](vec2.md)): *void*

*Defined in [dist/planck.d.ts:1734](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1734)*

Set the linear velocity of the center of mass.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec2](vec2.md) | The new linear velocity of the center of mass.  |

**Returns:** *void*

___

###  setMassData

▸ **setMassData**(`massData`: [MassData](massdata.md)): *void*

*Defined in [dist/planck.d.ts:1786](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1786)*

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

*Defined in [dist/planck.d.ts:1697](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1697)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  setSleepingAllowed

▸ **setSleepingAllowed**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1643](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1643)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setStatic

▸ **setStatic**(): *[Body](body.md)*

*Defined in [dist/planck.d.ts:1634](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1634)*

This will alter the mass and velocity.

**Returns:** *[Body](body.md)*

___

###  setTransform

▸ **setTransform**(`position`: [Vec2](vec2.md), `angle`: number): *void*

*Defined in [dist/planck.d.ts:1683](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1683)*

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

*Defined in [dist/planck.d.ts:1619](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1619)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

###  shouldCollide

▸ **shouldCollide**(`that`: [Body](body.md)): *boolean*

*Defined in [dist/planck.d.ts:1833](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1833)*

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

*Defined in [dist/planck.d.ts:1688](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1688)*

Update fixtures in broad-phase.

**Returns:** *void*

___

###  synchronizeTransform

▸ **synchronizeTransform**(): *void*

*Defined in [dist/planck.d.ts:1684](https://github.com/shakiba/planck.js/blob/6a5d3be/dist/planck.d.ts#L1684)*

**Returns:** *void*
