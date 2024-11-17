
# Class: Body

A rigid body composed of one or more fixtures.

To create a new Body use [World.createBody](world#createbody).

## Hierarchy

* **Body**

## Index

### Properties

* [style](/api/classes/body#style)
* [DYNAMIC](/api/classes/body#static-readonly-dynamic)
* [KINEMATIC](/api/classes/body#static-readonly-kinematic)
* [STATIC](/api/classes/body#static-readonly-static)

### Methods

* [advance](/api/classes/body#advance)
* [applyAngularImpulse](/api/classes/body#applyangularimpulse)
* [applyForce](/api/classes/body#applyforce)
* [applyForceToCenter](/api/classes/body#applyforcetocenter)
* [applyLinearImpulse](/api/classes/body#applylinearimpulse)
* [applyTorque](/api/classes/body#applytorque)
* [createFixture](/api/classes/body#createfixture)
* [destroyFixture](/api/classes/body#destroyfixture)
* [getAngle](/api/classes/body#getangle)
* [getAngularDamping](/api/classes/body#getangulardamping)
* [getAngularVelocity](/api/classes/body#getangularvelocity)
* [getContactList](/api/classes/body#getcontactlist)
* [getFixtureList](/api/classes/body#getfixturelist)
* [getGravityScale](/api/classes/body#getgravityscale)
* [getInertia](/api/classes/body#getinertia)
* [getJointList](/api/classes/body#getjointlist)
* [getLinearDamping](/api/classes/body#getlineardamping)
* [getLinearVelocity](/api/classes/body#getlinearvelocity)
* [getLinearVelocityFromLocalPoint](/api/classes/body#getlinearvelocityfromlocalpoint)
* [getLinearVelocityFromWorldPoint](/api/classes/body#getlinearvelocityfromworldpoint)
* [getLocalCenter](/api/classes/body#getlocalcenter)
* [getLocalPoint](/api/classes/body#getlocalpoint)
* [getLocalVector](/api/classes/body#getlocalvector)
* [getMass](/api/classes/body#getmass)
* [getMassData](/api/classes/body#getmassdata)
* [getNext](/api/classes/body#getnext)
* [getPosition](/api/classes/body#getposition)
* [getTransform](/api/classes/body#gettransform)
* [getType](/api/classes/body#gettype)
* [getUserData](/api/classes/body#getuserdata)
* [getWorld](/api/classes/body#getworld)
* [getWorldCenter](/api/classes/body#getworldcenter)
* [getWorldPoint](/api/classes/body#getworldpoint)
* [getWorldVector](/api/classes/body#getworldvector)
* [isActive](/api/classes/body#isactive)
* [isAwake](/api/classes/body#isawake)
* [isBullet](/api/classes/body#isbullet)
* [isDynamic](/api/classes/body#isdynamic)
* [isFixedRotation](/api/classes/body#isfixedrotation)
* [isKinematic](/api/classes/body#iskinematic)
* [isSleepingAllowed](/api/classes/body#issleepingallowed)
* [isStatic](/api/classes/body#isstatic)
* [isWorldLocked](/api/classes/body#isworldlocked)
* [resetMassData](/api/classes/body#resetmassdata)
* [setActive](/api/classes/body#setactive)
* [setAngle](/api/classes/body#setangle)
* [setAngularDamping](/api/classes/body#setangulardamping)
* [setAngularVelocity](/api/classes/body#setangularvelocity)
* [setAwake](/api/classes/body#setawake)
* [setBullet](/api/classes/body#setbullet)
* [setDynamic](/api/classes/body#setdynamic)
* [setFixedRotation](/api/classes/body#setfixedrotation)
* [setGravityScale](/api/classes/body#setgravityscale)
* [setKinematic](/api/classes/body#setkinematic)
* [setLinearDamping](/api/classes/body#setlineardamping)
* [setLinearVelocity](/api/classes/body#setlinearvelocity)
* [setMassData](/api/classes/body#setmassdata)
* [setPosition](/api/classes/body#setposition)
* [setSleepingAllowed](/api/classes/body#setsleepingallowed)
* [setStatic](/api/classes/body#setstatic)
* [setTransform](/api/classes/body#settransform)
* [setType](/api/classes/body#settype)
* [setUserData](/api/classes/body#setuserdata)
* [shouldCollide](/api/classes/body#shouldcollide)
* [synchronizeFixtures](/api/classes/body#synchronizefixtures)
* [synchronizeTransform](/api/classes/body#synchronizetransform)

## Properties

###  style

• **style**: *[Style](/api/interfaces/style)*

Styling for dev-tools.

___

### `Static` `Readonly` DYNAMIC

▪ **DYNAMIC**: *[BodyType](/api/globals#bodytype)* = "dynamic"

A dynamic body is fully simulated.
They can be moved manually by the user, but normally they move according to forces.
A dynamic body can collide with all body types.
A dynamic body always has finite, non-zero mass.
If you try to set the mass of a dynamic body to zero, it will automatically acquire a mass of one kilogram and it won't rotate.

___

### `Static` `Readonly` KINEMATIC

▪ **KINEMATIC**: *[BodyType](/api/globals#bodytype)* = "kinematic"

A kinematic body moves under simulation according to its velocity.
Kinematic bodies do not respond to forces.
They can be moved manually by the user, but normally a kinematic body is moved by setting its velocity.
A kinematic body behaves as if it has infinite mass, however, zero is stored for the mass and the inverse mass.
Kinematic bodies do not collide with other kinematic or static bodies.

___

### `Static` `Readonly` STATIC

▪ **STATIC**: *[BodyType](/api/globals#bodytype)* = "static"

A static body does not move under simulation and behaves as if it has infinite mass.
Internally, zero is stored for the mass and the inverse mass.
Static bodies can be moved manually by the user.
A static body has zero velocity.
Static bodies do not collide with other static or kinematic bodies.

## Methods

###  advance

▸ **advance**(`alpha`: number): *void*

Used in TOI.

**Parameters:**

Name | Type |
------ | ------ |
`alpha` | number |

**Returns:** *void*

___

###  applyAngularImpulse

▸ **applyAngularImpulse**(`impulse`: number, `wake`: boolean): *void*

Apply an angular impulse.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`impulse` | number | - | The angular impulse in units of kg*m*m/s |
`wake` | boolean | true | Also wake up the body  |

**Returns:** *void*

___

###  applyForce

▸ **applyForce**(`force`: [Vec2Value](/api/interfaces/vec2value), `point`: [Vec2Value](/api/interfaces/vec2value), `wake`: boolean): *void*

Apply a force at a world point. If the force is not applied at the center of
mass, it will generate a torque and affect the angular velocity. This wakes
up the body.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`force` | [Vec2Value](/api/interfaces/vec2value) | - | The world force vector, usually in Newtons (N). |
`point` | [Vec2Value](/api/interfaces/vec2value) | - | The world position of the point of application. |
`wake` | boolean | true | Also wake up the body  |

**Returns:** *void*

___

###  applyForceToCenter

▸ **applyForceToCenter**(`force`: [Vec2Value](/api/interfaces/vec2value), `wake`: boolean): *void*

Apply a force to the center of mass. This wakes up the body.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`force` | [Vec2Value](/api/interfaces/vec2value) | - | The world force vector, usually in Newtons (N). |
`wake` | boolean | true | Also wake up the body  |

**Returns:** *void*

___

###  applyLinearImpulse

▸ **applyLinearImpulse**(`impulse`: [Vec2Value](/api/interfaces/vec2value), `point`: [Vec2Value](/api/interfaces/vec2value), `wake`: boolean): *void*

Apply an impulse at a point. This immediately modifies the velocity. It also
modifies the angular velocity if the point of application is not at the
center of mass. This wakes up the body.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`impulse` | [Vec2Value](/api/interfaces/vec2value) | - | The world impulse vector, usually in N-seconds or kg-m/s. |
`point` | [Vec2Value](/api/interfaces/vec2value) | - | The world position of the point of application. |
`wake` | boolean | true | Also wake up the body  |

**Returns:** *void*

___

###  applyTorque

▸ **applyTorque**(`torque`: number, `wake`: boolean): *void*

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

▸ **createFixture**(`def`: [FixtureDef](/api/interfaces/fixturedef)): *[Fixture](/api/classes/fixture)*

Creates a fixture and attach it to this body.

If the density is non-zero, this function automatically updates the mass of
the body.

Contacts are not created until the next time step.

Warning: This function is locked during callbacks.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [FixtureDef](/api/interfaces/fixturedef) |

**Returns:** *[Fixture](/api/classes/fixture)*

▸ **createFixture**(`shape`: [Shape](/api/classes/shape), `opt?`: [FixtureOpt](/api/interfaces/fixtureopt)): *[Fixture](/api/classes/fixture)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](/api/classes/shape) |
`opt?` | [FixtureOpt](/api/interfaces/fixtureopt) |

**Returns:** *[Fixture](/api/classes/fixture)*

▸ **createFixture**(`shape`: [Shape](/api/classes/shape), `density?`: number): *[Fixture](/api/classes/fixture)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](/api/classes/shape) |
`density?` | number |

**Returns:** *[Fixture](/api/classes/fixture)*

___

###  destroyFixture

▸ **destroyFixture**(`fixture`: [Fixture](/api/classes/fixture)): *void*

Destroy a fixture. This removes the fixture from the broad-phase and destroys
all contacts associated with this fixture. This will automatically adjust the
mass of the body if the body is dynamic and the fixture has positive density.
All fixtures attached to a body are implicitly destroyed when the body is
destroyed.

Warning: This function is locked during callbacks.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fixture` | [Fixture](/api/classes/fixture) | The fixture to be removed.  |

**Returns:** *void*

___

###  getAngle

▸ **getAngle**(): *number*

Get the current world rotation angle in radians.

**Returns:** *number*

___

###  getAngularDamping

▸ **getAngularDamping**(): *number*

**Returns:** *number*

___

###  getAngularVelocity

▸ **getAngularVelocity**(): *number*

Get the angular velocity.

**Returns:** *number*

the angular velocity in radians/second.

___

###  getContactList

▸ **getContactList**(): *[ContactEdge](/api/classes/contactedge) | null*

Warning: this list changes during the time step and you may miss some
collisions if you don't use ContactListener.

**Returns:** *[ContactEdge](/api/classes/contactedge) | null*

___

###  getFixtureList

▸ **getFixtureList**(): *[Fixture](/api/classes/fixture) | null*

**Returns:** *[Fixture](/api/classes/fixture) | null*

___

###  getGravityScale

▸ **getGravityScale**(): *number*

**Returns:** *number*

___

###  getInertia

▸ **getInertia**(): *number*

Get the rotational inertia of the body about the local origin.

**Returns:** *number*

the rotational inertia, usually in kg-m^2.

___

###  getJointList

▸ **getJointList**(): *[JointEdge](/api/classes/jointedge) | null*

**Returns:** *[JointEdge](/api/classes/jointedge) | null*

___

###  getLinearDamping

▸ **getLinearDamping**(): *number*

**Returns:** *number*

___

###  getLinearVelocity

▸ **getLinearVelocity**(): *[Vec2](/api/classes/vec2)*

Get the linear velocity of the center of mass.

**Returns:** *[Vec2](/api/classes/vec2)*

the linear velocity of the center of mass.

___

###  getLinearVelocityFromLocalPoint

▸ **getLinearVelocityFromLocalPoint**(`localPoint`: [Vec2Value](/api/interfaces/vec2value)): *[Vec2](/api/classes/vec2)*

Get the world velocity of a local point.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`localPoint` | [Vec2Value](/api/interfaces/vec2value) | A point in local coordinates.  |

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getLinearVelocityFromWorldPoint

▸ **getLinearVelocityFromWorldPoint**(`worldPoint`: [Vec2Value](/api/interfaces/vec2value)): *[Vec2](/api/classes/vec2)*

Get the world linear velocity of a world point attached to this body.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`worldPoint` | [Vec2Value](/api/interfaces/vec2value) | A point in world coordinates.  |

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getLocalCenter

▸ **getLocalCenter**(): *[Vec2](/api/classes/vec2)*

Get the local position of the center of mass.

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getLocalPoint

▸ **getLocalPoint**(`worldPoint`: [Vec2Value](/api/interfaces/vec2value)): *[Vec2](/api/classes/vec2)*

Gets the corresponding local point of a world point.

**Parameters:**

Name | Type |
------ | ------ |
`worldPoint` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getLocalVector

▸ **getLocalVector**(`worldVector`: [Vec2Value](/api/interfaces/vec2value)): *[Vec2](/api/classes/vec2)*

Gets the corresponding local vector of a world vector.

**Parameters:**

Name | Type |
------ | ------ |
`worldVector` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getMass

▸ **getMass**(): *number*

Get the total mass of the body.

**Returns:** *number*

The mass, usually in kilograms (kg).

___

###  getMassData

▸ **getMassData**(`data`: [MassData](/api/interfaces/massdata)): *void*

Copy the mass data of the body to data.

**Parameters:**

Name | Type |
------ | ------ |
`data` | [MassData](/api/interfaces/massdata) |

**Returns:** *void*

___

###  getNext

▸ **getNext**(): *[Body](/api/classes/body) | null*

**Returns:** *[Body](/api/classes/body) | null*

___

###  getPosition

▸ **getPosition**(): *[Vec2](/api/classes/vec2)*

Get the world position for the body's origin.

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getTransform

▸ **getTransform**(): *[Transform](/api/classes/transform)*

Get the world transform for the body's origin.

**Returns:** *[Transform](/api/classes/transform)*

___

###  getType

▸ **getType**(): *[BodyType](/api/globals#bodytype)*

Get the type of the body.

**Returns:** *[BodyType](/api/globals#bodytype)*

___

###  getUserData

▸ **getUserData**(): *unknown*

**Returns:** *unknown*

___

###  getWorld

▸ **getWorld**(): *[World](/api/classes/world)*

**Returns:** *[World](/api/classes/world)*

___

###  getWorldCenter

▸ **getWorldCenter**(): *[Vec2](/api/classes/vec2)*

Get the world position of the center of mass.

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getWorldPoint

▸ **getWorldPoint**(`localPoint`: [Vec2Value](/api/interfaces/vec2value)): *[Vec2](/api/classes/vec2)*

Get the corresponding world point of a local point.

**Parameters:**

Name | Type |
------ | ------ |
`localPoint` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  getWorldVector

▸ **getWorldVector**(`localVector`: [Vec2Value](/api/interfaces/vec2value)): *[Vec2](/api/classes/vec2)*

Get the corresponding world vector of a local vector.

**Parameters:**

Name | Type |
------ | ------ |
`localVector` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *[Vec2](/api/classes/vec2)*

___

###  isActive

▸ **isActive**(): *boolean*

**Returns:** *boolean*

___

###  isAwake

▸ **isAwake**(): *boolean*

**Returns:** *boolean*

___

###  isBullet

▸ **isBullet**(): *boolean*

**Returns:** *boolean*

___

###  isDynamic

▸ **isDynamic**(): *boolean*

**Returns:** *boolean*

___

###  isFixedRotation

▸ **isFixedRotation**(): *boolean*

**Returns:** *boolean*

___

###  isKinematic

▸ **isKinematic**(): *boolean*

**Returns:** *boolean*

___

###  isSleepingAllowed

▸ **isSleepingAllowed**(): *boolean*

**Returns:** *boolean*

___

###  isStatic

▸ **isStatic**(): *boolean*

**Returns:** *boolean*

___

###  isWorldLocked

▸ **isWorldLocked**(): *boolean*

**Returns:** *boolean*

___

###  resetMassData

▸ **resetMassData**(): *void*

This resets the mass properties to the sum of the mass properties of the
fixtures. This normally does not need to be called unless you called
SetMassData to override the mass and you later want to reset the mass.

**Returns:** *void*

___

###  setActive

▸ **setActive**(`flag`: boolean): *void*

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

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number |

**Returns:** *void*

___

###  setAngularDamping

▸ **setAngularDamping**(`angularDamping`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`angularDamping` | number |

**Returns:** *void*

___

###  setAngularVelocity

▸ **setAngularVelocity**(`w`: number): *void*

Set the angular velocity.

**Parameters:**

Name | Type |
------ | ------ |
`w` | number |

**Returns:** *void*

___

###  setAwake

▸ **setAwake**(`flag`: boolean): *void*

Set the sleep state of the body. A sleeping body has very low CPU cost.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`flag` | boolean | Set to true to wake the body, false to put it to sleep.  |

**Returns:** *void*

___

###  setBullet

▸ **setBullet**(`flag`: boolean): *void*

Should this body be treated like a bullet for continuous collision detection?

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setDynamic

▸ **setDynamic**(): *[Body](/api/classes/body)*

**Returns:** *[Body](/api/classes/body)*

___

###  setFixedRotation

▸ **setFixedRotation**(`flag`: boolean): *void*

Set this body to have fixed rotation. This causes the mass to be reset.

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setGravityScale

▸ **setGravityScale**(`scale`: number): *void*

Scale the gravity applied to this body.

**Parameters:**

Name | Type |
------ | ------ |
`scale` | number |

**Returns:** *void*

___

###  setKinematic

▸ **setKinematic**(): *[Body](/api/classes/body)*

**Returns:** *[Body](/api/classes/body)*

___

###  setLinearDamping

▸ **setLinearDamping**(`linearDamping`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`linearDamping` | number |

**Returns:** *void*

___

###  setLinearVelocity

▸ **setLinearVelocity**(`v`: [Vec2Value](/api/interfaces/vec2value)): *void*

Set the linear velocity of the center of mass.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vec2Value](/api/interfaces/vec2value) | The new linear velocity of the center of mass.  |

**Returns:** *void*

___

###  setMassData

▸ **setMassData**(`massData`: [MassData](/api/interfaces/massdata)): *void*

Set the mass properties to override the mass properties of the fixtures. Note
that this changes the center of mass position. Note that creating or
destroying fixtures can also alter the mass. This function has no effect if
the body isn't dynamic.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | [MassData](/api/interfaces/massdata) | The mass properties.  |

**Returns:** *void*

___

###  setPosition

▸ **setPosition**(`p`: [Vec2Value](/api/interfaces/vec2value)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Vec2Value](/api/interfaces/vec2value) |

**Returns:** *void*

___

###  setSleepingAllowed

▸ **setSleepingAllowed**(`flag`: boolean): *void*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setStatic

▸ **setStatic**(): *[Body](/api/classes/body)*

This will alter the mass and velocity.

**Returns:** *[Body](/api/classes/body)*

___

###  setTransform

▸ **setTransform**(`position`: [Vec2Value](/api/interfaces/vec2value), `angle`: number): *void*

Set the position of the body's origin and rotation. Manipulating a body's
transform may cause non-physical behavior. Note: contacts are updated on the
next call to World.step.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`position` | [Vec2Value](/api/interfaces/vec2value) | The world position of the body's local origin. |
`angle` | number | The world rotation in radians.  |

**Returns:** *void*

___

###  setType

▸ **setType**(`type`: [BodyType](/api/globals#bodytype)): *void*

Set the type of the body to "static", "kinematic" or "dynamic".

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`type` | [BodyType](/api/globals#bodytype) | The type of the body.  |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

###  shouldCollide

▸ **shouldCollide**(`that`: [Body](/api/classes/body)): *boolean*

This is used to test if two bodies should collide.

Bodies do not collide when:
- Neither of them is dynamic
- They are connected by a joint with collideConnected == false

**Parameters:**

Name | Type |
------ | ------ |
`that` | [Body](/api/classes/body) |

**Returns:** *boolean*

___

###  synchronizeFixtures

▸ **synchronizeFixtures**(): *void*

Update fixtures in broad-phase.

**Returns:** *void*

___

###  synchronizeTransform

▸ **synchronizeTransform**(): *void*

**Returns:** *void*
