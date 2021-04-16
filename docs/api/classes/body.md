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

* [_serialize](body.md#_serialize)
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
* [_deserialize](body.md#static-_deserialize)

## Constructors

###  constructor

\+ **new Body**(`world`: any, `def`: any): *[Body](body.md)*

*Defined in [dist/planck.d.ts:1633](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1633)*

**Parameters:**

Name | Type |
------ | ------ |
`world` | any |
`def` | any |

**Returns:** *[Body](body.md)*

## Properties

### `Static` DYNAMIC

▪ **DYNAMIC**: *[BodyType](../globals.md#bodytype)* = DYNAMIC

*Defined in [dist/planck.d.ts:1633](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1633)*

*Defined in [src/dynamics/Body.ts:145](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L145)*

___

### `Static` KINEMATIC

▪ **KINEMATIC**: *[BodyType](../globals.md#bodytype)* = KINEMATIC

*Defined in [dist/planck.d.ts:1632](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1632)*

*Defined in [src/dynamics/Body.ts:144](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L144)*

___

### `Static` STATIC

▪ **STATIC**: *[BodyType](../globals.md#bodytype)* = STATIC

*Defined in [dist/planck.d.ts:1631](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1631)*

*Defined in [src/dynamics/Body.ts:143](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L143)*

## Methods

###  _serialize

▸ **_serialize**(): *object*

*Defined in [dist/planck.d.ts:1635](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1635)*

**Returns:** *object*

* **angle**: *number*

* **angularVelocity**: *number*

* **bullet**: *boolean*

* **fixtures**: *any[]*

* **linearVelocity**: *[Vec2](vec2.md)*

* **position**: *[Vec2](vec2.md)*

* **type**: *[BodyType](../globals.md#bodytype)*

___

###  advance

▸ **advance**(`alpha`: number): *void*

*Defined in [dist/planck.d.ts:1721](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1721)*

Used in TOI.

**Parameters:**

Name | Type |
------ | ------ |
`alpha` | number |

**Returns:** *void*

___

###  applyAngularImpulse

▸ **applyAngularImpulse**(`impulse`: number, `wake?`: boolean): *void*

*Defined in [dist/planck.d.ts:1857](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1857)*

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

*Defined in [dist/planck.d.ts:1825](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1825)*

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

*Defined in [dist/planck.d.ts:1832](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1832)*

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

*Defined in [dist/planck.d.ts:1850](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1850)*

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

*Defined in [dist/planck.d.ts:1840](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1840)*

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

*Defined in [dist/planck.d.ts:1873](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1873)*

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

*Defined in [dist/planck.d.ts:1874](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1874)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) |
`opt?` | [FixtureOpt](../interfaces/fixtureopt.md) |

**Returns:** *[Fixture](fixture.md)*

▸ **createFixture**(`shape`: [Shape](shape.md), `density?`: number): *[Fixture](fixture.md)*

*Defined in [dist/planck.d.ts:1875](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1875)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) |
`density?` | number |

**Returns:** *[Fixture](fixture.md)*

▸ **createFixture**(`def`: FixtureDef): *Fixture*

*Defined in [src/dynamics/Body.ts:1021](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L1021)*

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

*Defined in [src/dynamics/Body.ts:1022](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L1022)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | Shape |
`opt?` | FixtureOpt |

**Returns:** *Fixture*

▸ **createFixture**(`shape`: Shape, `density?`: number): *Fixture*

*Defined in [src/dynamics/Body.ts:1023](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L1023)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | Shape |
`density?` | number |

**Returns:** *Fixture*

___

###  destroyFixture

▸ **destroyFixture**(`fixture`: [Fixture](fixture.md)): *void*

*Defined in [dist/planck.d.ts:1887](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1887)*

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

*Defined in [dist/planck.d.ts:1730](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1730)*

Get the current world rotation angle in radians.

**Returns:** *number*

___

###  getAngularDamping

▸ **getAngularDamping**(): *number*

*Defined in [dist/planck.d.ts:1778](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1778)*

**Returns:** *number*

___

###  getAngularVelocity

▸ **getAngularVelocity**(): *number*

*Defined in [dist/planck.d.ts:1769](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1769)*

Get the angular velocity.

**Returns:** *number*

the angular velocity in radians/second.

___

###  getContactList

▸ **getContactList**(): *[ContactEdge](contactedge.md) | null*

*Defined in [dist/planck.d.ts:1656](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1656)*

Warning: this list changes during the time step and you may miss some
collisions if you don't use ContactListener.

**Returns:** *[ContactEdge](contactedge.md) | null*

___

###  getFixtureList

▸ **getFixtureList**(): *[Fixture](fixture.md) | null*

*Defined in [dist/planck.d.ts:1650](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1650)*

**Returns:** *[Fixture](fixture.md) | null*

___

###  getGravityScale

▸ **getGravityScale**(): *number*

*Defined in [dist/planck.d.ts:1780](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1780)*

**Returns:** *number*

___

###  getInertia

▸ **getInertia**(): *number*

*Defined in [dist/planck.d.ts:1796](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1796)*

Get the rotational inertia of the body about the local origin.

**Returns:** *number*

the rotational inertia, usually in kg-m^2.

___

###  getJointList

▸ **getJointList**(): *[JointEdge](jointedge.md) | null*

*Defined in [dist/planck.d.ts:1651](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1651)*

**Returns:** *[JointEdge](jointedge.md) | null*

___

###  getLinearDamping

▸ **getLinearDamping**(): *number*

*Defined in [dist/planck.d.ts:1776](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1776)*

**Returns:** *number*

___

###  getLinearVelocity

▸ **getLinearVelocity**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1745](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1745)*

Get the linear velocity of the center of mass.

**Returns:** *[Vec2](vec2.md)*

the linear velocity of the center of mass.

___

###  getLinearVelocityFromLocalPoint

▸ **getLinearVelocityFromLocalPoint**(`localPoint`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1757](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1757)*

Get the world velocity of a local point.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`localPoint` | [Vec2](vec2.md) | A point in local coordinates.  |

**Returns:** *[Vec2](vec2.md)*

___

###  getLinearVelocityFromWorldPoint

▸ **getLinearVelocityFromWorldPoint**(`worldPoint`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1751](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1751)*

Get the world linear velocity of a world point attached to this body.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`worldPoint` | [Vec2](vec2.md) | A point in world coordinates.  |

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalCenter

▸ **getLocalCenter**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1739](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1739)*

Get the local position of the center of mass.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalPoint

▸ **getLocalPoint**(`worldPoint`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1899](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1899)*

Gets the corresponding local point of a world point.

**Parameters:**

Name | Type |
------ | ------ |
`worldPoint` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalVector

▸ **getLocalVector**(`worldVector`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1903](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1903)*

Gets the corresponding local vector of a world vector.

**Parameters:**

Name | Type |
------ | ------ |
`worldVector` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getMass

▸ **getMass**(): *number*

*Defined in [dist/planck.d.ts:1790](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1790)*

Get the total mass of the body.

**Returns:** *number*

The mass, usually in kilograms (kg).

___

###  getMassData

▸ **getMassData**(`data`: [MassData](massdata.md)): *void*

*Defined in [dist/planck.d.ts:1800](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1800)*

Copy the mass data of the body to data.

**Parameters:**

Name | Type |
------ | ------ |
`data` | [MassData](massdata.md) |

**Returns:** *void*

___

###  getNext

▸ **getNext**(): *[Body](body.md) | null*

*Defined in [dist/planck.d.ts:1647](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1647)*

**Returns:** *[Body](body.md) | null*

___

###  getPosition

▸ **getPosition**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1725](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1725)*

Get the world position for the body's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getTransform

▸ **getTransform**(): *[Transform](transform.md)*

*Defined in [dist/planck.d.ts:1703](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1703)*

Get the world transform for the body's origin.

**Returns:** *[Transform](transform.md)*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Defined in [dist/planck.d.ts:1649](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1649)*

**Returns:** *unknown*

___

###  getWorld

▸ **getWorld**(): *[World](world.md)*

*Defined in [dist/planck.d.ts:1646](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1646)*

**Returns:** *[World](world.md)*

___

###  getWorldCenter

▸ **getWorldCenter**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1735](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1735)*

Get the world position of the center of mass.

**Returns:** *[Vec2](vec2.md)*

___

###  getWorldPoint

▸ **getWorldPoint**(`localPoint`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1891](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1891)*

Get the corresponding world point of a local point.

**Parameters:**

Name | Type |
------ | ------ |
`localPoint` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getWorldVector

▸ **getWorldVector**(`localVector`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:1895](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1895)*

Get the corresponding world vector of a local vector.

**Parameters:**

Name | Type |
------ | ------ |
`localVector` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  isActive

▸ **isActive**(): *boolean*

*Defined in [dist/planck.d.ts:1680](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1680)*

**Returns:** *boolean*

___

###  isAwake

▸ **isAwake**(): *boolean*

*Defined in [dist/planck.d.ts:1673](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1673)*

**Returns:** *boolean*

___

###  isBullet

▸ **isBullet**(): *boolean*

*Defined in [dist/planck.d.ts:1666](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1666)*

**Returns:** *boolean*

___

###  isDynamic

▸ **isDynamic**(): *boolean*

*Defined in [dist/planck.d.ts:1658](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1658)*

**Returns:** *boolean*

___

###  isFixedRotation

▸ **isFixedRotation**(): *boolean*

*Defined in [dist/planck.d.ts:1695](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1695)*

**Returns:** *boolean*

___

###  isKinematic

▸ **isKinematic**(): *boolean*

*Defined in [dist/planck.d.ts:1659](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1659)*

**Returns:** *boolean*

___

###  isSleepingAllowed

▸ **isSleepingAllowed**(): *boolean*

*Defined in [dist/planck.d.ts:1671](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1671)*

**Returns:** *boolean*

___

###  isStatic

▸ **isStatic**(): *boolean*

*Defined in [dist/planck.d.ts:1657](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1657)*

**Returns:** *boolean*

___

###  isWorldLocked

▸ **isWorldLocked**(): *boolean*

*Defined in [dist/planck.d.ts:1645](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1645)*

**Returns:** *boolean*

___

###  resetMassData

▸ **resetMassData**(): *void*

*Defined in [dist/planck.d.ts:1806](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1806)*

This resets the mass properties to the sum of the mass properties of the
fixtures. This normally does not need to be called unless you called
SetMassData to override the mass and you later want to reset the mass.

**Returns:** *void*

___

###  setActive

▸ **setActive**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1694](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1694)*

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

*Defined in [dist/planck.d.ts:1731](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1731)*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number |

**Returns:** *void*

___

###  setAngularDamping

▸ **setAngularDamping**(`angularDamping`: number): *void*

*Defined in [dist/planck.d.ts:1779](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1779)*

**Parameters:**

Name | Type |
------ | ------ |
`angularDamping` | number |

**Returns:** *void*

___

###  setAngularVelocity

▸ **setAngularVelocity**(`w`: number): *void*

*Defined in [dist/planck.d.ts:1775](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1775)*

Set the angular velocity.

**Parameters:**

Name | Type |
------ | ------ |
`w` | number |

**Returns:** *void*

___

###  setAwake

▸ **setAwake**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1679](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1679)*

Set the sleep state of the body. A sleeping body has very low CPU cost.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`flag` | boolean | Set to true to wake the body, false to put it to sleep.  |

**Returns:** *void*

___

###  setBullet

▸ **setBullet**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1670](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1670)*

Should this body be treated like a bullet for continuous collision detection?

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setDynamic

▸ **setDynamic**(): *[Body](body.md)*

*Defined in [dist/planck.d.ts:1664](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1664)*

**Returns:** *[Body](body.md)*

___

###  setFixedRotation

▸ **setFixedRotation**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1699](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1699)*

Set this body to have fixed rotation. This causes the mass to be reset.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setGravityScale

▸ **setGravityScale**(`scale`: number): *void*

*Defined in [dist/planck.d.ts:1784](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1784)*

Scale the gravity applied to this body.

**Parameters:**

Name | Type |
------ | ------ |
`scale` | number |

**Returns:** *void*

___

###  setKinematic

▸ **setKinematic**(): *[Body](body.md)*

*Defined in [dist/planck.d.ts:1665](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1665)*

**Returns:** *[Body](body.md)*

___

###  setLinearDamping

▸ **setLinearDamping**(`linearDamping`: number): *void*

*Defined in [dist/planck.d.ts:1777](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1777)*

**Parameters:**

Name | Type |
------ | ------ |
`linearDamping` | number |

**Returns:** *void*

___

###  setLinearVelocity

▸ **setLinearVelocity**(`v`: [Vec2](vec2.md)): *void*

*Defined in [dist/planck.d.ts:1763](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1763)*

Set the linear velocity of the center of mass.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec2](vec2.md) | The new linear velocity of the center of mass.  |

**Returns:** *void*

___

###  setMassData

▸ **setMassData**(`massData`: [MassData](massdata.md)): *void*

*Defined in [dist/planck.d.ts:1815](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1815)*

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

*Defined in [dist/planck.d.ts:1726](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1726)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  setSleepingAllowed

▸ **setSleepingAllowed**(`flag`: boolean): *void*

*Defined in [dist/planck.d.ts:1672](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1672)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setStatic

▸ **setStatic**(): *[Body](body.md)*

*Defined in [dist/planck.d.ts:1663](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1663)*

This will alter the mass and velocity.

**Returns:** *[Body](body.md)*

___

###  setTransform

▸ **setTransform**(`position`: [Vec2](vec2.md), `angle`: number): *void*

*Defined in [dist/planck.d.ts:1712](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1712)*

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

*Defined in [dist/planck.d.ts:1648](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1648)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

###  shouldCollide

▸ **shouldCollide**(`that`: [Body](body.md)): *boolean*

*Defined in [dist/planck.d.ts:1862](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1862)*

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

*Defined in [dist/planck.d.ts:1717](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1717)*

Update fixtures in broad-phase.

**Returns:** *void*

___

###  synchronizeTransform

▸ **synchronizeTransform**(): *void*

*Defined in [dist/planck.d.ts:1713](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1713)*

**Returns:** *void*

___

### `Static` _deserialize

▸ **_deserialize**(`data`: any, `world`: any, `restore`: any): *[Body](body.md)*

*Defined in [dist/planck.d.ts:1644](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1644)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`world` | any |
`restore` | any |

**Returns:** *[Body](body.md)*
