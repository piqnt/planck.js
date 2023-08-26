[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Body](body.md)

# Class: Body

A rigid body composed of one or more fixtures.

To create a new Body use {@link World.createBody}.

## Hierarchy

* **Body**

## Index

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
* [getType](body.md#gettype)
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
* [setType](body.md#settype)
* [setUserData](body.md#setuserdata)
* [shouldCollide](body.md#shouldcollide)
* [synchronizeFixtures](body.md#synchronizefixtures)
* [synchronizeTransform](body.md#synchronizetransform)

## Properties

### `Static` `Readonly` DYNAMIC

▪ **DYNAMIC**: *[BodyType](../globals.md#bodytype)* = "dynamic"

*Defined in [src/dynamics/Body.ts:181](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L181)*

A dynamic body is fully simulated.
They can be moved manually by the user, but normally they move according to forces.
A dynamic body can collide with all body types.
A dynamic body always has finite, non-zero mass.
If you try to set the mass of a dynamic body to zero, it will automatically acquire a mass of one kilogram and it won't rotate.

___

### `Static` `Readonly` KINEMATIC

▪ **KINEMATIC**: *[BodyType](../globals.md#bodytype)* = "kinematic"

*Defined in [src/dynamics/Body.ts:172](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L172)*

A kinematic body moves under simulation according to its velocity.
Kinematic bodies do not respond to forces.
They can be moved manually by the user, but normally a kinematic body is moved by setting its velocity.
A kinematic body behaves as if it has infinite mass, however, zero is stored for the mass and the inverse mass.
Kinematic bodies do not collide with other kinematic or static bodies.

___

### `Static` `Readonly` STATIC

▪ **STATIC**: *[BodyType](../globals.md#bodytype)* = "static"

*Defined in [src/dynamics/Body.ts:164](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L164)*

A static body does not move under simulation and behaves as if it has infinite mass.
Internally, zero is stored for the mass and the inverse mass.
Static bodies can be moved manually by the user.
A static body has zero velocity.
Static bodies do not collide with other static or kinematic bodies.

## Methods

###  advance

▸ **advance**(`alpha`: number): *void*

*Defined in [src/dynamics/Body.ts:611](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L611)*

Used in TOI.

**Parameters:**

Name | Type |
------ | ------ |
`alpha` | number |

**Returns:** *void*

___

###  applyAngularImpulse

▸ **applyAngularImpulse**(`impulse`: number, `wake`: boolean): *void*

*Defined in [src/dynamics/Body.ts:987](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L987)*

Apply an angular impulse.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`impulse` | number | - | The angular impulse in units of kg*m*m/s |
`wake` | boolean | true | Also wake up the body  |

**Returns:** *void*

___

###  applyForce

▸ **applyForce**(`force`: Vec2, `point`: Vec2, `wake`: boolean): *void*

*Defined in [src/dynamics/Body.ts:904](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L904)*

Apply a force at a world point. If the force is not applied at the center of
mass, it will generate a torque and affect the angular velocity. This wakes
up the body.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`force` | Vec2 | - | The world force vector, usually in Newtons (N). |
`point` | Vec2 | - | The world position of the point of application. |
`wake` | boolean | true | Also wake up the body  |

**Returns:** *void*

___

###  applyForceToCenter

▸ **applyForceToCenter**(`force`: [Vec2Value](../interfaces/vec2value.md), `wake`: boolean): *void*

*Defined in [src/dynamics/Body.ts:924](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L924)*

Apply a force to the center of mass. This wakes up the body.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`force` | [Vec2Value](../interfaces/vec2value.md) | - | The world force vector, usually in Newtons (N). |
`wake` | boolean | true | Also wake up the body  |

**Returns:** *void*

___

###  applyLinearImpulse

▸ **applyLinearImpulse**(`impulse`: Vec2, `point`: Vec2, `wake`: boolean): *void*

*Defined in [src/dynamics/Body.ts:966](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L966)*

Apply an impulse at a point. This immediately modifies the velocity. It also
modifies the angular velocity if the point of application is not at the
center of mass. This wakes up the body.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`impulse` | Vec2 | - | The world impulse vector, usually in N-seconds or kg-m/s. |
`point` | Vec2 | - | The world position of the point of application. |
`wake` | boolean | true | Also wake up the body  |

**Returns:** *void*

___

###  applyTorque

▸ **applyTorque**(`torque`: number, `wake`: boolean): *void*

*Defined in [src/dynamics/Body.ts:944](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L944)*

Apply a torque. This affects the angular velocity without affecting the
linear velocity of the center of mass. This wakes up the body.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`torque` | number | - | About the z-axis (out of the screen), usually in N-m. |
`wake` | boolean | true | Also wake up the body  |

**Returns:** *void*

___

###  createFixture

▸ **createFixture**(`def`: [FixtureDef](../interfaces/fixturedef.md)): *[Fixture](fixture.md)*

*Defined in [src/dynamics/Body.ts:1062](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L1062)*

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

*Defined in [src/dynamics/Body.ts:1063](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L1063)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) |
`opt?` | [FixtureOpt](../interfaces/fixtureopt.md) |

**Returns:** *[Fixture](fixture.md)*

▸ **createFixture**(`shape`: [Shape](shape.md), `density?`: number): *[Fixture](fixture.md)*

*Defined in [src/dynamics/Body.ts:1064](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L1064)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) |
`density?` | number |

**Returns:** *[Fixture](fixture.md)*

___

###  destroyFixture

▸ **destroyFixture**(`fixture`: [Fixture](fixture.md)): *void*

*Defined in [src/dynamics/Body.ts:1089](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L1089)*

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

*Defined in [src/dynamics/Body.ts:633](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L633)*

Get the current world rotation angle in radians.

**Returns:** *number*

___

###  getAngularDamping

▸ **getAngularDamping**(): *number*

*Defined in [src/dynamics/Body.ts:731](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L731)*

**Returns:** *number*

___

###  getAngularVelocity

▸ **getAngularVelocity**(): *number*

*Defined in [src/dynamics/Body.ts:704](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L704)*

Get the angular velocity.

**Returns:** *number*

the angular velocity in radians/second.

___

###  getContactList

▸ **getContactList**(): *[ContactEdge](contactedge.md) | null*

*Defined in [src/dynamics/Body.ts:354](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L354)*

Warning: this list changes during the time step and you may miss some
collisions if you don't use ContactListener.

**Returns:** *[ContactEdge](contactedge.md) | null*

___

###  getFixtureList

▸ **getFixtureList**(): *[Fixture](fixture.md) | null*

*Defined in [src/dynamics/Body.ts:342](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L342)*

**Returns:** *[Fixture](fixture.md) | null*

___

###  getGravityScale

▸ **getGravityScale**(): *number*

*Defined in [src/dynamics/Body.ts:739](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L739)*

**Returns:** *number*

___

###  getInertia

▸ **getInertia**(): *number*

*Defined in [src/dynamics/Body.ts:764](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L764)*

Get the rotational inertia of the body about the local origin.

**Returns:** *number*

the rotational inertia, usually in kg-m^2.

___

###  getJointList

▸ **getJointList**(): *[JointEdge](jointedge.md) | null*

*Defined in [src/dynamics/Body.ts:346](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L346)*

**Returns:** *[JointEdge](jointedge.md) | null*

___

###  getLinearDamping

▸ **getLinearDamping**(): *number*

*Defined in [src/dynamics/Body.ts:723](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L723)*

**Returns:** *number*

___

###  getLinearVelocity

▸ **getLinearVelocity**(): *Vec2*

*Defined in [src/dynamics/Body.ts:660](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L660)*

Get the linear velocity of the center of mass.

**Returns:** *Vec2*

the linear velocity of the center of mass.

___

###  getLinearVelocityFromLocalPoint

▸ **getLinearVelocityFromLocalPoint**(`localPoint`: Vec2): *Vec2*

*Defined in [src/dynamics/Body.ts:680](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L680)*

Get the world velocity of a local point.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`localPoint` | Vec2 | A point in local coordinates.  |

**Returns:** *Vec2*

___

###  getLinearVelocityFromWorldPoint

▸ **getLinearVelocityFromWorldPoint**(`worldPoint`: Vec2): *Vec2*

*Defined in [src/dynamics/Body.ts:669](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L669)*

Get the world linear velocity of a world point attached to this body.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`worldPoint` | Vec2 | A point in world coordinates.  |

**Returns:** *Vec2*

___

###  getLocalCenter

▸ **getLocalCenter**(): *Vec2*

*Defined in [src/dynamics/Body.ts:651](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L651)*

Get the local position of the center of mass.

**Returns:** *Vec2*

___

###  getLocalPoint

▸ **getLocalPoint**(`worldPoint`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/dynamics/Body.ts:1166](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L1166)*

Gets the corresponding local point of a world point.

**Parameters:**

Name | Type |
------ | ------ |
`worldPoint` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

###  getLocalVector

▸ **getLocalVector**(`worldVector`: [Vec2Value](../interfaces/vec2value.md)): *Vec2*

*Defined in [src/dynamics/Body.ts:1173](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L1173)*

Gets the corresponding local vector of a world vector.

**Parameters:**

Name | Type |
------ | ------ |
`worldVector` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *Vec2*

___

###  getMass

▸ **getMass**(): *number*

*Defined in [src/dynamics/Body.ts:755](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L755)*

Get the total mass of the body.

**Returns:** *number*

The mass, usually in kilograms (kg).

___

###  getMassData

▸ **getMassData**(`data`: [MassData](../interfaces/massdata.md)): *void*

*Defined in [src/dynamics/Body.ts:772](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L772)*

Copy the mass data of the body to data.

**Parameters:**

Name | Type |
------ | ------ |
`data` | [MassData](../interfaces/massdata.md) |

**Returns:** *void*

___

###  getNext

▸ **getNext**(): *[Body](body.md) | null*

*Defined in [src/dynamics/Body.ts:330](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L330)*

**Returns:** *[Body](body.md) | null*

___

###  getPosition

▸ **getPosition**(): *Vec2*

*Defined in [src/dynamics/Body.ts:622](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L622)*

Get the world position for the body's origin.

**Returns:** *Vec2*

___

###  getTransform

▸ **getTransform**(): *[Transform](transform.md)*

*Defined in [src/dynamics/Body.ts:564](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L564)*

Get the world transform for the body's origin.

**Returns:** *[Transform](transform.md)*

___

###  getType

▸ **getType**(): *[BodyType](../globals.md#bodytype)*

*Defined in [src/dynamics/Body.ts:391](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L391)*

Get the type of the body.

**Returns:** *[BodyType](../globals.md#bodytype)*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Defined in [src/dynamics/Body.ts:338](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L338)*

**Returns:** *unknown*

___

###  getWorld

▸ **getWorld**(): *World*

*Defined in [src/dynamics/Body.ts:326](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L326)*

**Returns:** *World*

___

###  getWorldCenter

▸ **getWorldCenter**(): *Vec2*

*Defined in [src/dynamics/Body.ts:644](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L644)*

Get the world position of the center of mass.

**Returns:** *Vec2*

___

###  getWorldPoint

▸ **getWorldPoint**(`localPoint`: Vec2): *Vec2*

*Defined in [src/dynamics/Body.ts:1152](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L1152)*

Get the corresponding world point of a local point.

**Parameters:**

Name | Type |
------ | ------ |
`localPoint` | Vec2 |

**Returns:** *Vec2*

___

###  getWorldVector

▸ **getWorldVector**(`localVector`: Vec2): *Vec2*

*Defined in [src/dynamics/Body.ts:1159](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L1159)*

Get the corresponding world vector of a local vector.

**Parameters:**

Name | Type |
------ | ------ |
`localVector` | Vec2 |

**Returns:** *Vec2*

___

###  isActive

▸ **isActive**(): *boolean*

*Defined in [src/dynamics/Body.ts:490](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L490)*

**Returns:** *boolean*

___

###  isAwake

▸ **isAwake**(): *boolean*

*Defined in [src/dynamics/Body.ts:467](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L467)*

**Returns:** *boolean*

___

###  isBullet

▸ **isBullet**(): *boolean*

*Defined in [src/dynamics/Body.ts:445](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L445)*

**Returns:** *boolean*

___

###  isDynamic

▸ **isDynamic**(): *boolean*

*Defined in [src/dynamics/Body.ts:362](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L362)*

**Returns:** *boolean*

___

###  isFixedRotation

▸ **isFixedRotation**(): *boolean*

*Defined in [src/dynamics/Body.ts:542](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L542)*

**Returns:** *boolean*

___

###  isKinematic

▸ **isKinematic**(): *boolean*

*Defined in [src/dynamics/Body.ts:366](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L366)*

**Returns:** *boolean*

___

###  isSleepingAllowed

▸ **isSleepingAllowed**(): *boolean*

*Defined in [src/dynamics/Body.ts:456](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L456)*

**Returns:** *boolean*

___

###  isStatic

▸ **isStatic**(): *boolean*

*Defined in [src/dynamics/Body.ts:358](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L358)*

**Returns:** *boolean*

___

###  isWorldLocked

▸ **isWorldLocked**(): *boolean*

*Defined in [src/dynamics/Body.ts:322](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L322)*

**Returns:** *boolean*

___

###  resetMassData

▸ **resetMassData**(): *void*

*Defined in [src/dynamics/Body.ts:783](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L783)*

This resets the mass properties to the sum of the mass properties of the
fixtures. This normally does not need to be called unless you called
SetMassData to override the mass and you later want to reset the mass.

**Returns:** *void*

___

###  setActive

▸ **setActive**(`flag`: boolean): *void*

*Defined in [src/dynamics/Body.ts:507](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L507)*

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

*Defined in [src/dynamics/Body.ts:637](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L637)*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number |

**Returns:** *void*

___

###  setAngularDamping

▸ **setAngularDamping**(`angularDamping`: number): *void*

*Defined in [src/dynamics/Body.ts:735](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L735)*

**Parameters:**

Name | Type |
------ | ------ |
`angularDamping` | number |

**Returns:** *void*

___

###  setAngularVelocity

▸ **setAngularVelocity**(`w`: number): *void*

*Defined in [src/dynamics/Body.ts:713](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L713)*

Set the angular velocity.

**Parameters:**

Name | Type |
------ | ------ |
`w` | number |

**Returns:** *void*

___

###  setAwake

▸ **setAwake**(`flag`: boolean): *void*

*Defined in [src/dynamics/Body.ts:476](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L476)*

Set the sleep state of the body. A sleeping body has very low CPU cost.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`flag` | boolean | Set to true to wake the body, false to put it to sleep.  |

**Returns:** *void*

___

###  setBullet

▸ **setBullet**(`flag`: boolean): *void*

*Defined in [src/dynamics/Body.ts:452](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L452)*

Should this body be treated like a bullet for continuous collision detection?

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setDynamic

▸ **setDynamic**(): *[Body](body.md)*

*Defined in [src/dynamics/Body.ts:378](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L378)*

**Returns:** *[Body](body.md)*

___

###  setFixedRotation

▸ **setFixedRotation**(`flag`: boolean): *void*

*Defined in [src/dynamics/Body.ts:549](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L549)*

Set this body to have fixed rotation. This causes the mass to be reset.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setGravityScale

▸ **setGravityScale**(`scale`: number): *void*

*Defined in [src/dynamics/Body.ts:746](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L746)*

Scale the gravity applied to this body.

**Parameters:**

Name | Type |
------ | ------ |
`scale` | number |

**Returns:** *void*

___

###  setKinematic

▸ **setKinematic**(): *[Body](body.md)*

*Defined in [src/dynamics/Body.ts:383](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L383)*

**Returns:** *[Body](body.md)*

___

###  setLinearDamping

▸ **setLinearDamping**(`linearDamping`: number): *void*

*Defined in [src/dynamics/Body.ts:727](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L727)*

**Parameters:**

Name | Type |
------ | ------ |
`linearDamping` | number |

**Returns:** *void*

___

###  setLinearVelocity

▸ **setLinearVelocity**(`v`: Vec2): *void*

*Defined in [src/dynamics/Body.ts:689](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L689)*

Set the linear velocity of the center of mass.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`v` | Vec2 | The new linear velocity of the center of mass.  |

**Returns:** *void*

___

###  setMassData

▸ **setMassData**(`massData`: [MassData](../interfaces/massdata.md)): *void*

*Defined in [src/dynamics/Body.ts:859](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L859)*

Set the mass properties to override the mass properties of the fixtures. Note
that this changes the center of mass position. Note that creating or
destroying fixtures can also alter the mass. This function has no effect if
the body isn't dynamic.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | [MassData](../interfaces/massdata.md) | The mass properties.  |

**Returns:** *void*

___

###  setPosition

▸ **setPosition**(`p`: Vec2): *void*

*Defined in [src/dynamics/Body.ts:626](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L626)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | Vec2 |

**Returns:** *void*

___

###  setSleepingAllowed

▸ **setSleepingAllowed**(`flag`: boolean): *void*

*Defined in [src/dynamics/Body.ts:460](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L460)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setStatic

▸ **setStatic**(): *[Body](body.md)*

*Defined in [src/dynamics/Body.ts:373](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L373)*

This will alter the mass and velocity.

**Returns:** *[Body](body.md)*

___

###  setTransform

▸ **setTransform**(`position`: Vec2, `angle`: number): *void*

*Defined in [src/dynamics/Body.ts:576](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L576)*

Set the position of the body's origin and rotation. Manipulating a body's
transform may cause non-physical behavior. Note: contacts are updated on the
next call to World.step.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`position` | Vec2 | The world position of the body's local origin. |
`angle` | number | The world rotation in radians.  |

**Returns:** *void*

___

###  setType

▸ **setType**(`type`: [BodyType](../globals.md#bodytype)): *void*

*Defined in [src/dynamics/Body.ts:399](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L399)*

Set the type of the body to "static", "kinematic" or "dynamic".

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`type` | [BodyType](../globals.md#bodytype) | The type of the body.  |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: any): *void*

*Defined in [src/dynamics/Body.ts:334](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L334)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

###  shouldCollide

▸ **shouldCollide**(`that`: [Body](body.md)): *boolean*

*Defined in [src/dynamics/Body.ts:1008](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L1008)*

This is used to test if two bodies should collide.

Bodies do not collide when:
- Neither of them is dynamic
- They are connected by a joint with collideConnected == false

**Parameters:**

Name | Type |
------ | ------ |
`that` | [Body](body.md) |

**Returns:** *boolean*

___

###  synchronizeFixtures

▸ **synchronizeFixtures**(): *void*

*Defined in [src/dynamics/Body.ts:599](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L599)*

Update fixtures in broad-phase.

**Returns:** *void*

___

###  synchronizeTransform

▸ **synchronizeTransform**(): *void*

*Defined in [src/dynamics/Body.ts:592](https://github.com/shakiba/planck.js/blob/ae24904/src/dynamics/Body.ts#L592)*

**Returns:** *void*
