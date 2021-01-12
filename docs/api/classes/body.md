[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Body](body.md)

# Class: Body

## Hierarchy

* **Body**

## Callable

▸ **Body**(`world`: [World](world.md), `def?`: [BodyDef](../interfaces/bodydef.md)): *[Body](body.md)*

*Defined in [index.d.ts:150](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L150)*

**Parameters:**

Name | Type |
------ | ------ |
`world` | [World](world.md) |
`def?` | [BodyDef](../interfaces/bodydef.md) |

**Returns:** *[Body](body.md)*

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

\+ **new Body**(`world`: [World](world.md), `def?`: [BodyDef](../interfaces/bodydef.md)): *[Body](body.md)*

*Defined in [index.d.ts:151](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L151)*

**Parameters:**

Name | Type |
------ | ------ |
`world` | [World](world.md) |
`def?` | [BodyDef](../interfaces/bodydef.md) |

**Returns:** *[Body](body.md)*

## Properties

### `Static` DYNAMIC

▪ **DYNAMIC**: *"dynamic"*

*Defined in [index.d.ts:156](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L156)*

___

### `Static` KINEMATIC

▪ **KINEMATIC**: *"kinematic"*

*Defined in [index.d.ts:155](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L155)*

___

### `Static` STATIC

▪ **STATIC**: *"static"*

*Defined in [index.d.ts:154](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L154)*

## Methods

###  advance

▸ **advance**(`alpha`: number): *void*

*Defined in [index.d.ts:237](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L237)*

**Parameters:**

Name | Type |
------ | ------ |
`alpha` | number |

**Returns:** *void*

___

###  applyAngularImpulse

▸ **applyAngularImpulse**(`impulse`: number, `wake?`: boolean): *void*

*Defined in [index.d.ts:265](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L265)*

**Parameters:**

Name | Type |
------ | ------ |
`impulse` | number |
`wake?` | boolean |

**Returns:** *void*

___

###  applyForce

▸ **applyForce**(`force`: [Vec2](vec2.md), `point`: [Vec2](vec2.md), `wake?`: boolean): *void*

*Defined in [index.d.ts:261](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L261)*

**Parameters:**

Name | Type |
------ | ------ |
`force` | [Vec2](vec2.md) |
`point` | [Vec2](vec2.md) |
`wake?` | boolean |

**Returns:** *void*

___

###  applyForceToCenter

▸ **applyForceToCenter**(`force`: [Vec2](vec2.md), `wake?`: boolean): *void*

*Defined in [index.d.ts:262](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L262)*

**Parameters:**

Name | Type |
------ | ------ |
`force` | [Vec2](vec2.md) |
`wake?` | boolean |

**Returns:** *void*

___

###  applyLinearImpulse

▸ **applyLinearImpulse**(`impulse`: [Vec2](vec2.md), `point`: [Vec2](vec2.md), `wake?`: boolean): *void*

*Defined in [index.d.ts:264](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L264)*

**Parameters:**

Name | Type |
------ | ------ |
`impulse` | [Vec2](vec2.md) |
`point` | [Vec2](vec2.md) |
`wake?` | boolean |

**Returns:** *void*

___

###  applyTorque

▸ **applyTorque**(`torque`: number, `wake?`: boolean): *void*

*Defined in [index.d.ts:263](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L263)*

**Parameters:**

Name | Type |
------ | ------ |
`torque` | number |
`wake?` | boolean |

**Returns:** *void*

___

###  createFixture

▸ **createFixture**(`def`: [FixtureDef](../interfaces/fixturedef.md)): *[Fixture](fixture.md)*

*Defined in [index.d.ts:267](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L267)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [FixtureDef](../interfaces/fixturedef.md) |

**Returns:** *[Fixture](fixture.md)*

▸ **createFixture**(`shape`: [Shape](shape.md), `opt?`: [FixtureOpt](../interfaces/fixtureopt.md)): *[Fixture](fixture.md)*

*Defined in [index.d.ts:268](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L268)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) |
`opt?` | [FixtureOpt](../interfaces/fixtureopt.md) |

**Returns:** *[Fixture](fixture.md)*

▸ **createFixture**(`shape`: [Shape](shape.md), `density?`: number): *[Fixture](fixture.md)*

*Defined in [index.d.ts:269](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L269)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | [Shape](shape.md) |
`density?` | number |

**Returns:** *[Fixture](fixture.md)*

___

###  destroyFixture

▸ **destroyFixture**(`fixture`: [Fixture](fixture.md)): *void*

*Defined in [index.d.ts:270](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L270)*

**Parameters:**

Name | Type |
------ | ------ |
`fixture` | [Fixture](fixture.md) |

**Returns:** *void*

___

###  getAngle

▸ **getAngle**(): *number*

*Defined in [index.d.ts:240](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L240)*

**Returns:** *number*

___

###  getAngularDamping

▸ **getAngularDamping**(): *number*

*Defined in [index.d.ts:252](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L252)*

**Returns:** *number*

___

###  getAngularVelocity

▸ **getAngularVelocity**(): *number*

*Defined in [index.d.ts:248](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L248)*

**Returns:** *number*

___

###  getContactList

▸ **getContactList**(): *[ContactEdge](contactedge.md) | null*

*Defined in [index.d.ts:205](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L205)*

Warning: this list changes during the time step and you may miss some
collisions if you don't use ContactListener.

**Returns:** *[ContactEdge](contactedge.md) | null*

___

###  getFixtureList

▸ **getFixtureList**(): *[Fixture](fixture.md) | null*

*Defined in [index.d.ts:199](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L199)*

**Returns:** *[Fixture](fixture.md) | null*

___

###  getGravityScale

▸ **getGravityScale**(): *number*

*Defined in [index.d.ts:254](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L254)*

**Returns:** *number*

___

###  getInertia

▸ **getInertia**(): *number*

*Defined in [index.d.ts:257](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L257)*

**Returns:** *number*

___

###  getJointList

▸ **getJointList**(): *[JointEdge](../interfaces/jointedge.md) | null*

*Defined in [index.d.ts:200](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L200)*

**Returns:** *[JointEdge](../interfaces/jointedge.md) | null*

___

###  getLinearDamping

▸ **getLinearDamping**(): *number*

*Defined in [index.d.ts:250](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L250)*

**Returns:** *number*

___

###  getLinearVelocity

▸ **getLinearVelocity**(): *[Vec2](vec2.md)*

*Defined in [index.d.ts:244](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L244)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLinearVelocityFromLocalPoint

▸ **getLinearVelocityFromLocalPoint**(`localPoint`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [index.d.ts:246](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L246)*

**Parameters:**

Name | Type |
------ | ------ |
`localPoint` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getLinearVelocityFromWorldPoint

▸ **getLinearVelocityFromWorldPoint**(`worldPoint`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [index.d.ts:245](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L245)*

**Parameters:**

Name | Type |
------ | ------ |
`worldPoint` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalCenter

▸ **getLocalCenter**(): *[Vec2](vec2.md)*

*Defined in [index.d.ts:243](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L243)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalPoint

▸ **getLocalPoint**(`worldPoint`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [index.d.ts:273](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L273)*

**Parameters:**

Name | Type |
------ | ------ |
`worldPoint` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalVector

▸ **getLocalVector**(`worldVector`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [index.d.ts:274](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L274)*

**Parameters:**

Name | Type |
------ | ------ |
`worldVector` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getMass

▸ **getMass**(): *number*

*Defined in [index.d.ts:256](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L256)*

**Returns:** *number*

___

###  getMassData

▸ **getMassData**(`data`: [MassData](../interfaces/massdata.md)): *void*

*Defined in [index.d.ts:258](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L258)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [MassData](../interfaces/massdata.md) |

**Returns:** *void*

___

###  getNext

▸ **getNext**(): *[Body](body.md) | null*

*Defined in [index.d.ts:196](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L196)*

**Returns:** *[Body](body.md) | null*

___

###  getPosition

▸ **getPosition**(): *[Vec2](vec2.md)*

*Defined in [index.d.ts:238](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L238)*

**Returns:** *[Vec2](vec2.md)*

___

###  getTransform

▸ **getTransform**(): *[Transform](transform.md)*

*Defined in [index.d.ts:233](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L233)*

**Returns:** *[Transform](transform.md)*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Defined in [index.d.ts:198](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L198)*

**Returns:** *unknown*

___

###  getWorld

▸ **getWorld**(): *[World](world.md)*

*Defined in [index.d.ts:195](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L195)*

**Returns:** *[World](world.md)*

___

###  getWorldCenter

▸ **getWorldCenter**(): *[Vec2](vec2.md)*

*Defined in [index.d.ts:242](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L242)*

**Returns:** *[Vec2](vec2.md)*

___

###  getWorldPoint

▸ **getWorldPoint**(`localPoint`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [index.d.ts:271](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L271)*

**Parameters:**

Name | Type |
------ | ------ |
`localPoint` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  getWorldVector

▸ **getWorldVector**(`localVector`: [Vec2](vec2.md)): *[Vec2](vec2.md)*

*Defined in [index.d.ts:272](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L272)*

**Parameters:**

Name | Type |
------ | ------ |
`localVector` | [Vec2](vec2.md) |

**Returns:** *[Vec2](vec2.md)*

___

###  isActive

▸ **isActive**(): *boolean*

*Defined in [index.d.ts:229](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L229)*

**Returns:** *boolean*

___

###  isAwake

▸ **isAwake**(): *boolean*

*Defined in [index.d.ts:227](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L227)*

**Returns:** *boolean*

___

###  isBullet

▸ **isBullet**(): *boolean*

*Defined in [index.d.ts:223](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L223)*

**Returns:** *boolean*

___

###  isDynamic

▸ **isDynamic**(): *boolean*

*Defined in [index.d.ts:207](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L207)*

**Returns:** *boolean*

___

###  isFixedRotation

▸ **isFixedRotation**(): *boolean*

*Defined in [index.d.ts:231](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L231)*

**Returns:** *boolean*

___

###  isKinematic

▸ **isKinematic**(): *boolean*

*Defined in [index.d.ts:208](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L208)*

**Returns:** *boolean*

___

###  isSleepingAllowed

▸ **isSleepingAllowed**(): *boolean*

*Defined in [index.d.ts:225](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L225)*

**Returns:** *boolean*

___

###  isStatic

▸ **isStatic**(): *boolean*

*Defined in [index.d.ts:206](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L206)*

**Returns:** *boolean*

___

###  isWorldLocked

▸ **isWorldLocked**(): *boolean*

*Defined in [index.d.ts:194](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L194)*

**Returns:** *boolean*

___

###  resetMassData

▸ **resetMassData**(): *void*

*Defined in [index.d.ts:259](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L259)*

**Returns:** *void*

___

###  setActive

▸ **setActive**(`flag`: boolean): *void*

*Defined in [index.d.ts:230](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L230)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setAngle

▸ **setAngle**(`angle`: number): *void*

*Defined in [index.d.ts:241](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L241)*

**Parameters:**

Name | Type |
------ | ------ |
`angle` | number |

**Returns:** *void*

___

###  setAngularDamping

▸ **setAngularDamping**(`angularDamping`: number): *void*

*Defined in [index.d.ts:253](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L253)*

**Parameters:**

Name | Type |
------ | ------ |
`angularDamping` | number |

**Returns:** *void*

___

###  setAngularVelocity

▸ **setAngularVelocity**(`w`: number): *void*

*Defined in [index.d.ts:249](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L249)*

**Parameters:**

Name | Type |
------ | ------ |
`w` | number |

**Returns:** *void*

___

###  setAwake

▸ **setAwake**(`flag`: boolean): *void*

*Defined in [index.d.ts:228](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L228)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setBullet

▸ **setBullet**(`flag`: boolean): *void*

*Defined in [index.d.ts:224](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L224)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setDynamic

▸ **setDynamic**(): *[Body](body.md)*

*Defined in [index.d.ts:213](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L213)*

**Returns:** *[Body](body.md)*

___

###  setFixedRotation

▸ **setFixedRotation**(`flag`: boolean): *void*

*Defined in [index.d.ts:232](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L232)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setGravityScale

▸ **setGravityScale**(`scale`: number): *void*

*Defined in [index.d.ts:255](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L255)*

**Parameters:**

Name | Type |
------ | ------ |
`scale` | number |

**Returns:** *void*

___

###  setKinematic

▸ **setKinematic**(): *[Body](body.md)*

*Defined in [index.d.ts:214](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L214)*

**Returns:** *[Body](body.md)*

___

###  setLinearDamping

▸ **setLinearDamping**(`linearDamping`: number): *void*

*Defined in [index.d.ts:251](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L251)*

**Parameters:**

Name | Type |
------ | ------ |
`linearDamping` | number |

**Returns:** *void*

___

###  setLinearVelocity

▸ **setLinearVelocity**(`v`: [Vec2](vec2.md)): *void*

*Defined in [index.d.ts:247](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L247)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  setMassData

▸ **setMassData**(`massData`: [MassData](../interfaces/massdata.md)): *void*

*Defined in [index.d.ts:260](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L260)*

**Parameters:**

Name | Type |
------ | ------ |
`massData` | [MassData](../interfaces/massdata.md) |

**Returns:** *void*

___

###  setPosition

▸ **setPosition**(`p`: [Vec2](vec2.md)): *void*

*Defined in [index.d.ts:239](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L239)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  setSleepingAllowed

▸ **setSleepingAllowed**(`flag`: boolean): *void*

*Defined in [index.d.ts:226](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L226)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setStatic

▸ **setStatic**(): *[Body](body.md)*

*Defined in [index.d.ts:212](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L212)*

This will alter the mass and velocity.

**Returns:** *[Body](body.md)*

___

###  setTransform

▸ **setTransform**(`position`: [Vec2](vec2.md), `angle`: number): *void*

*Defined in [index.d.ts:234](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L234)*

**Parameters:**

Name | Type |
------ | ------ |
`position` | [Vec2](vec2.md) |
`angle` | number |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: any): *void*

*Defined in [index.d.ts:197](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L197)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

###  shouldCollide

▸ **shouldCollide**(`that`: [Body](body.md)): *boolean*

*Defined in [index.d.ts:266](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L266)*

**Parameters:**

Name | Type |
------ | ------ |
`that` | [Body](body.md) |

**Returns:** *boolean*

___

###  synchronizeFixtures

▸ **synchronizeFixtures**(): *void*

*Defined in [index.d.ts:236](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L236)*

**Returns:** *void*

___

###  synchronizeTransform

▸ **synchronizeTransform**(): *void*

*Defined in [index.d.ts:235](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L235)*

**Returns:** *void*
