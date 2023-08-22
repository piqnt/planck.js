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

*Defined in [dynamics/Body.ts:180](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L180)*

A dynamic body is fully simulated.
They can be moved manually by the user, but normally they move according to forces.
A dynamic body can collide with all body types.
A dynamic body always has finite, non-zero mass.
If you try to set the mass of a dynamic body to zero, it will automatically acquire a mass of one kilogram and it won't rotate.

___

### `Static` `Readonly` KINEMATIC

▪ **KINEMATIC**: *[BodyType](../globals.md#bodytype)* = "kinematic"

*Defined in [dynamics/Body.ts:171](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L171)*

A kinematic body moves under simulation according to its velocity.
Kinematic bodies do not respond to forces.
They can be moved manually by the user, but normally a kinematic body is moved by setting its velocity.
A kinematic body behaves as if it has infinite mass, however, zero is stored for the mass and the inverse mass.
Kinematic bodies do not collide with other kinematic or static bodies.

___

### `Static` `Readonly` STATIC

▪ **STATIC**: *[BodyType](../globals.md#bodytype)* = "static"

*Defined in [dynamics/Body.ts:163](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L163)*

A static body does not move under simulation and behaves as if it has infinite mass.
Internally, zero is stored for the mass and the inverse mass.
Static bodies can be moved manually by the user.
A static body has zero velocity.
Static bodies do not collide with other static or kinematic bodies.

## Methods

###  advance

▸ **advance**(`alpha`: number): *void*

*Defined in [dynamics/Body.ts:609](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L609)*

Used in TOI.

**Parameters:**

Name | Type |
------ | ------ |
`alpha` | number |

**Returns:** *void*

___

###  applyAngularImpulse

▸ **applyAngularImpulse**(`impulse`: number, `wake`: boolean): *void*

*Defined in [dynamics/Body.ts:980](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L980)*

Apply an angular impulse.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`impulse` | number | - | The angular impulse in units of kg*m*m/s |
`wake` | boolean | true | Also wake up the body  |

**Returns:** *void*

___

###  applyForce

▸ **applyForce**(`force`: [Vec2](vec2.md), `point`: [Vec2](vec2.md), `wake`: boolean): *void*

*Defined in [dynamics/Body.ts:897](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L897)*

Apply a force at a world point. If the force is not applied at the center of
mass, it will generate a torque and affect the angular velocity. This wakes
up the body.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`force` | [Vec2](vec2.md) | - | The world force vector, usually in Newtons (N). |
`point` | [Vec2](vec2.md) | - | The world position of the point of application. |
`wake` | boolean | true | Also wake up the body  |

**Returns:** *void*

___

###  applyForceToCenter

▸ **applyForceToCenter**(`force`: [Vec2Value](../interfaces/vec2value.md), `wake`: boolean): *void*

*Defined in [dynamics/Body.ts:917](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L917)*

Apply a force to the center of mass. This wakes up the body.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`force` | [Vec2Value](../interfaces/vec2value.md) | - | The world force vector, usually in Newtons (N). |
`wake` | boolean | true | Also wake up the body  |

**Returns:** *void*

___

###  applyLinearImpulse

▸ **applyLinearImpulse**(`impulse`: [Vec2](vec2.md), `point`: [Vec2](vec2.md), `wake`: boolean): *void*

*Defined in [dynamics/Body.ts:959](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L959)*

Apply an impulse at a point. This immediately modifies the velocity. It also
modifies the angular velocity if the point of application is not at the
center of mass. This wakes up the body.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`impulse` | [Vec2](vec2.md) | - | The world impulse vector, usually in N-seconds or kg-m/s. |
`point` | [Vec2](vec2.md) | - | The world position of the point of application. |
`wake` | boolean | true | Also wake up the body  |

**Returns:** *void*

___

###  applyTorque

▸ **applyTorque**(`torque`: number, `wake`: boolean): *void*

*Defined in [dynamics/Body.ts:937](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L937)*

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

*Defined in [dynamics/Body.ts:1052](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L1052)*

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

*Defined in [dynamics/Body.ts:1053](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L1053)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) |
`opt?` | [FixtureOpt](../interfaces/fixtureopt.md) |

**Returns:** *[Fixture](fixture.md)*

▸ **createFixture**(`shape`: [Shape](shape.md), `density?`: number): *[Fixture](fixture.md)*

*Defined in [dynamics/Body.ts:1054](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L1054)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) |
`density?` | number |

**Returns:** *[Fixture](fixture.md)*

___

###  destroyFixture

▸ **destroyFixture**(`fixture`: [Fixture](fixture.md)): *void*

*Defined in [dynamics/Body.ts:1079](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L1079)*

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

*Defined in [dynamics/Body.ts:631](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L631)*

Get the current world rotation angle in radians.

**Returns:** *number*

___

###  getAngularDamping

▸ **getAngularDamping**(): *number*

*Defined in [dynamics/Body.ts:729](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L729)*

**Returns:** *number*

___

###  getAngularVelocity

▸ **getAngularVelocity**(): *number*

*Defined in [dynamics/Body.ts:702](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L702)*

Get the angular velocity.

**Returns:** *number*

the angular velocity in radians/second.

___

###  getContactList

▸ **getContactList**(): *[ContactEdge](contactedge.md) | null*

*Defined in [dynamics/Body.ts:353](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L353)*

Warning: this list changes during the time step and you may miss some
collisions if you don't use ContactListener.

**Returns:** *[ContactEdge](contactedge.md) | null*

___

###  getFixtureList

▸ **getFixtureList**(): *[Fixture](fixture.md) | null*

*Defined in [dynamics/Body.ts:341](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L341)*

**Returns:** *[Fixture](fixture.md) | null*

___

###  getGravityScale

▸ **getGravityScale**(): *number*

*Defined in [dynamics/Body.ts:737](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L737)*

**Returns:** *number*

___

###  getInertia

▸ **getInertia**(): *number*

*Defined in [dynamics/Body.ts:762](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L762)*

Get the rotational inertia of the body about the local origin.

**Returns:** *number*

the rotational inertia, usually in kg-m^2.

___

###  getJointList

▸ **getJointList**(): *[JointEdge](jointedge.md) | null*

*Defined in [dynamics/Body.ts:345](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L345)*

**Returns:** *[JointEdge](jointedge.md) | null*

___

###  getLinearDamping

▸ **getLinearDamping**(): *number*

*Defined in [dynamics/Body.ts:721](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L721)*

**Returns:** *number*

___

###  getLinearVelocity

▸ **getLinearVelocity**(): *[Vec2](vec2.md)*

*Defined in [dynamics/Body.ts:658](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L658)*

Get the linear velocity of the center of mass.

**Returns:** *[Vec2](vec2.md)*

the linear velocity of the center of mass.

___

###  getLinearVelocityFromLocalPoint

▸ **getLinearVelocityFromLocalPoint**(`localPoint`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dynamics/Body.ts:678](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L678)*

Get the world velocity of a local point.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`localPoint` | [Vec2](vec2.md) | A point in local coordinates.  |

**Returns:** *[Vec2](vec2.md)*

___

###  getLinearVelocityFromWorldPoint

▸ **getLinearVelocityFromWorldPoint**(`worldPoint`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dynamics/Body.ts:667](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L667)*

Get the world linear velocity of a world point attached to this body.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`worldPoint` | [Vec2](vec2.md) | A point in world coordinates.  |

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalCenter

▸ **getLocalCenter**(): *[Vec2](vec2.md)*

*Defined in [dynamics/Body.ts:649](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L649)*

Get the local position of the center of mass.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalPoint

▸ **getLocalPoint**(`worldPoint`: [Vec2Value](../interfaces/vec2value.md)): *[Vec2](vec2.md)*

*Defined in [dynamics/Body.ts:1156](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L1156)*

Gets the corresponding local point of a world point.

**Parameters:**

Name | Type |
------ | ------ |
`worldPoint` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalVector

▸ **getLocalVector**(`worldVector`: [Vec2Value](../interfaces/vec2value.md)): *[Vec2](vec2.md)*

*Defined in [dynamics/Body.ts:1163](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L1163)*

Gets the corresponding local vector of a world vector.

**Parameters:**

Name | Type |
------ | ------ |
`worldVector` | [Vec2Value](../interfaces/vec2value.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getMass

▸ **getMass**(): *number*

*Defined in [dynamics/Body.ts:753](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L753)*

Get the total mass of the body.

**Returns:** *number*

The mass, usually in kilograms (kg).

___

###  getMassData

▸ **getMassData**(`data`: [MassData](massdata.md)): *void*

*Defined in [dynamics/Body.ts:770](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L770)*

Copy the mass data of the body to data.

**Parameters:**

Name | Type |
------ | ------ |
`data` | [MassData](massdata.md) |

**Returns:** *void*

___

###  getNext

▸ **getNext**(): *[Body](body.md) | null*

*Defined in [dynamics/Body.ts:329](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L329)*

**Returns:** *[Body](body.md) | null*

___

###  getPosition

▸ **getPosition**(): *[Vec2](vec2.md)*

*Defined in [dynamics/Body.ts:620](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L620)*

Get the world position for the body's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getTransform

▸ **getTransform**(): *[Transform](transform.md)*

*Defined in [dynamics/Body.ts:563](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L563)*

Get the world transform for the body's origin.

**Returns:** *[Transform](transform.md)*

___

###  getType

▸ **getType**(): *[BodyType](../globals.md#bodytype)*

*Defined in [dynamics/Body.ts:390](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L390)*

Get the type of the body.

**Returns:** *[BodyType](../globals.md#bodytype)*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Defined in [dynamics/Body.ts:337](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L337)*

**Returns:** *unknown*

___

###  getWorld

▸ **getWorld**(): *[World](world.md)*

*Defined in [dynamics/Body.ts:325](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L325)*

**Returns:** *[World](world.md)*

___

###  getWorldCenter

▸ **getWorldCenter**(): *[Vec2](vec2.md)*

*Defined in [dynamics/Body.ts:642](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L642)*

Get the world position of the center of mass.

**Returns:** *[Vec2](vec2.md)*

___

###  getWorldPoint

▸ **getWorldPoint**(`localPoint`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dynamics/Body.ts:1142](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L1142)*

Get the corresponding world point of a local point.

**Parameters:**

Name | Type |
------ | ------ |
`localPoint` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getWorldVector

▸ **getWorldVector**(`localVector`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [dynamics/Body.ts:1149](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L1149)*

Get the corresponding world vector of a local vector.

**Parameters:**

Name | Type |
------ | ------ |
`localVector` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  isActive

▸ **isActive**(): *boolean*

*Defined in [dynamics/Body.ts:489](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L489)*

**Returns:** *boolean*

___

###  isAwake

▸ **isAwake**(): *boolean*

*Defined in [dynamics/Body.ts:466](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L466)*

**Returns:** *boolean*

___

###  isBullet

▸ **isBullet**(): *boolean*

*Defined in [dynamics/Body.ts:444](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L444)*

**Returns:** *boolean*

___

###  isDynamic

▸ **isDynamic**(): *boolean*

*Defined in [dynamics/Body.ts:361](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L361)*

**Returns:** *boolean*

___

###  isFixedRotation

▸ **isFixedRotation**(): *boolean*

*Defined in [dynamics/Body.ts:541](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L541)*

**Returns:** *boolean*

___

###  isKinematic

▸ **isKinematic**(): *boolean*

*Defined in [dynamics/Body.ts:365](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L365)*

**Returns:** *boolean*

___

###  isSleepingAllowed

▸ **isSleepingAllowed**(): *boolean*

*Defined in [dynamics/Body.ts:455](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L455)*

**Returns:** *boolean*

___

###  isStatic

▸ **isStatic**(): *boolean*

*Defined in [dynamics/Body.ts:357](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L357)*

**Returns:** *boolean*

___

###  isWorldLocked

▸ **isWorldLocked**(): *boolean*

*Defined in [dynamics/Body.ts:321](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L321)*

**Returns:** *boolean*

___

###  resetMassData

▸ **resetMassData**(): *void*

*Defined in [dynamics/Body.ts:781](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L781)*

This resets the mass properties to the sum of the mass properties of the
fixtures. This normally does not need to be called unless you called
SetMassData to override the mass and you later want to reset the mass.

**Returns:** *void*

___

###  setActive

▸ **setActive**(`flag`: boolean): *void*

*Defined in [dynamics/Body.ts:506](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L506)*

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

*Defined in [dynamics/Body.ts:635](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L635)*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number |

**Returns:** *void*

___

###  setAngularDamping

▸ **setAngularDamping**(`angularDamping`: number): *void*

*Defined in [dynamics/Body.ts:733](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L733)*

**Parameters:**

Name | Type |
------ | ------ |
`angularDamping` | number |

**Returns:** *void*

___

###  setAngularVelocity

▸ **setAngularVelocity**(`w`: number): *void*

*Defined in [dynamics/Body.ts:711](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L711)*

Set the angular velocity.

**Parameters:**

Name | Type |
------ | ------ |
`w` | number |

**Returns:** *void*

___

###  setAwake

▸ **setAwake**(`flag`: boolean): *void*

*Defined in [dynamics/Body.ts:475](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L475)*

Set the sleep state of the body. A sleeping body has very low CPU cost.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`flag` | boolean | Set to true to wake the body, false to put it to sleep.  |

**Returns:** *void*

___

###  setBullet

▸ **setBullet**(`flag`: boolean): *void*

*Defined in [dynamics/Body.ts:451](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L451)*

Should this body be treated like a bullet for continuous collision detection?

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setDynamic

▸ **setDynamic**(): *[Body](body.md)*

*Defined in [dynamics/Body.ts:377](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L377)*

**Returns:** *[Body](body.md)*

___

###  setFixedRotation

▸ **setFixedRotation**(`flag`: boolean): *void*

*Defined in [dynamics/Body.ts:548](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L548)*

Set this body to have fixed rotation. This causes the mass to be reset.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setGravityScale

▸ **setGravityScale**(`scale`: number): *void*

*Defined in [dynamics/Body.ts:744](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L744)*

Scale the gravity applied to this body.

**Parameters:**

Name | Type |
------ | ------ |
`scale` | number |

**Returns:** *void*

___

###  setKinematic

▸ **setKinematic**(): *[Body](body.md)*

*Defined in [dynamics/Body.ts:382](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L382)*

**Returns:** *[Body](body.md)*

___

###  setLinearDamping

▸ **setLinearDamping**(`linearDamping`: number): *void*

*Defined in [dynamics/Body.ts:725](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L725)*

**Parameters:**

Name | Type |
------ | ------ |
`linearDamping` | number |

**Returns:** *void*

___

###  setLinearVelocity

▸ **setLinearVelocity**(`v`: [Vec2](vec2.md)): *void*

*Defined in [dynamics/Body.ts:687](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L687)*

Set the linear velocity of the center of mass.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec2](vec2.md) | The new linear velocity of the center of mass.  |

**Returns:** *void*

___

###  setMassData

▸ **setMassData**(`massData`: [MassData](massdata.md)): *void*

*Defined in [dynamics/Body.ts:852](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L852)*

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

*Defined in [dynamics/Body.ts:624](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L624)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  setSleepingAllowed

▸ **setSleepingAllowed**(`flag`: boolean): *void*

*Defined in [dynamics/Body.ts:459](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L459)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setStatic

▸ **setStatic**(): *[Body](body.md)*

*Defined in [dynamics/Body.ts:372](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L372)*

This will alter the mass and velocity.

**Returns:** *[Body](body.md)*

___

###  setTransform

▸ **setTransform**(`position`: [Vec2](vec2.md), `angle`: number): *void*

*Defined in [dynamics/Body.ts:575](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L575)*

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

###  setType

▸ **setType**(`type`: [BodyType](../globals.md#bodytype)): *void*

*Defined in [dynamics/Body.ts:398](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L398)*

Set the type of the body to "static", "kinematic" or "dynamic".

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`type` | [BodyType](../globals.md#bodytype) | The type of the body.  |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: any): *void*

*Defined in [dynamics/Body.ts:333](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L333)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

###  shouldCollide

▸ **shouldCollide**(`that`: [Body](body.md)): *boolean*

*Defined in [dynamics/Body.ts:998](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L998)*

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

*Defined in [dynamics/Body.ts:597](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L597)*

Update fixtures in broad-phase.

**Returns:** *void*

___

###  synchronizeTransform

▸ **synchronizeTransform**(): *void*

*Defined in [dynamics/Body.ts:590](https://github.com/shakiba/planck.js/blob/1bc1208/src/dynamics/Body.ts#L590)*

**Returns:** *void*
