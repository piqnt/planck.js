[API Doc](../README.md) › [MotorJoint](motorjoint.md)

# Interface: MotorJoint

## Hierarchy

* [Joint](joint.md)

  ↳ **MotorJoint**

## Index

### Properties

* [m_angularImpulse](motorjoint.md#m_angularimpulse)
* [m_angularOffset](motorjoint.md#m_angularoffset)
* [m_bodyA](motorjoint.md#m_bodya)
* [m_bodyB](motorjoint.md#m_bodyb)
* [m_collideConnected](motorjoint.md#m_collideconnected)
* [m_correctionFactor](motorjoint.md#m_correctionfactor)
* [m_edgeA](motorjoint.md#m_edgea)
* [m_edgeB](motorjoint.md#m_edgeb)
* [m_index](motorjoint.md#m_index)
* [m_islandFlag](motorjoint.md#m_islandflag)
* [m_linearImpulse](motorjoint.md#m_linearimpulse)
* [m_linearOffset](motorjoint.md#m_linearoffset)
* [m_maxForce](motorjoint.md#m_maxforce)
* [m_maxTorque](motorjoint.md#m_maxtorque)
* [m_next](motorjoint.md#m_next)
* [m_prev](motorjoint.md#m_prev)
* [m_type](motorjoint.md#m_type)
* [m_userData](motorjoint.md#m_userdata)

### Methods

* [getAnchorA](motorjoint.md#getanchora)
* [getAnchorB](motorjoint.md#getanchorb)
* [getAngularOffset](motorjoint.md#getangularoffset)
* [getBodyA](motorjoint.md#getbodya)
* [getBodyB](motorjoint.md#getbodyb)
* [getCollideConnected](motorjoint.md#getcollideconnected)
* [getCorrectionFactor](motorjoint.md#getcorrectionfactor)
* [getLinearOffset](motorjoint.md#getlinearoffset)
* [getMaxForce](motorjoint.md#getmaxforce)
* [getMaxTorque](motorjoint.md#getmaxtorque)
* [getNext](motorjoint.md#getnext)
* [getReactionForce](motorjoint.md#getreactionforce)
* [getReactionTorque](motorjoint.md#getreactiontorque)
* [getType](motorjoint.md#gettype)
* [getUserData](motorjoint.md#getuserdata)
* [initVelocityConstraints](motorjoint.md#initvelocityconstraints)
* [isActive](motorjoint.md#isactive)
* [setAngularOffset](motorjoint.md#setangularoffset)
* [setCorrectionFactor](motorjoint.md#setcorrectionfactor)
* [setLinearOffset](motorjoint.md#setlinearoffset)
* [setMaxForce](motorjoint.md#setmaxforce)
* [setMaxTorque](motorjoint.md#setmaxtorque)
* [setUserData](motorjoint.md#setuserdata)
* [shiftOrigin](motorjoint.md#shiftorigin)
* [solvePositionConstraints](motorjoint.md#solvepositionconstraints)
* [solveVelocityConstraints](motorjoint.md#solvevelocityconstraints)

## Properties

###  m_angularImpulse

• **m_angularImpulse**: *number*

*Defined in [joint/index.d.ts:187](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L187)*

___

###  m_angularOffset

• **m_angularOffset**: *number*

*Defined in [joint/index.d.ts:185](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L185)*

___

###  m_bodyA

• **m_bodyA**: *[Body](body.md)*

*Inherited from [Joint](joint.md).[m_bodyA](joint.md#m_bodya)*

*Defined in [joint/index.d.ts:22](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L22)*

___

###  m_bodyB

• **m_bodyB**: *[Body](body.md)*

*Inherited from [Joint](joint.md).[m_bodyB](joint.md#m_bodyb)*

*Defined in [joint/index.d.ts:23](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L23)*

___

###  m_collideConnected

• **m_collideConnected**: *boolean*

*Inherited from [Joint](joint.md).[m_collideConnected](joint.md#m_collideconnected)*

*Defined in [joint/index.d.ts:25](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L25)*

___

###  m_correctionFactor

• **m_correctionFactor**: *number*

*Defined in [joint/index.d.ts:190](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L190)*

___

###  m_edgeA

• **m_edgeA**: *[JointEdge](jointedge.md)*

*Inherited from [Joint](joint.md).[m_edgeA](joint.md#m_edgea)*

*Defined in [joint/index.d.ts:28](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L28)*

___

###  m_edgeB

• **m_edgeB**: *[JointEdge](jointedge.md)*

*Inherited from [Joint](joint.md).[m_edgeB](joint.md#m_edgeb)*

*Defined in [joint/index.d.ts:29](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L29)*

___

###  m_index

• **m_index**: *number*

*Inherited from [Joint](joint.md).[m_index](joint.md#m_index)*

*Defined in [joint/index.d.ts:24](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L24)*

___

###  m_islandFlag

• **m_islandFlag**: *boolean*

*Inherited from [Joint](joint.md).[m_islandFlag](joint.md#m_islandflag)*

*Defined in [joint/index.d.ts:30](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L30)*

___

###  m_linearImpulse

• **m_linearImpulse**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:186](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L186)*

___

###  m_linearOffset

• **m_linearOffset**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:184](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L184)*

___

###  m_maxForce

• **m_maxForce**: *number*

*Defined in [joint/index.d.ts:188](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L188)*

___

###  m_maxTorque

• **m_maxTorque**: *number*

*Defined in [joint/index.d.ts:189](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L189)*

___

###  m_next

• **m_next**: *[Joint](joint.md) | null*

*Inherited from [Joint](joint.md).[m_next](joint.md#m_next)*

*Defined in [joint/index.d.ts:27](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L27)*

___

###  m_prev

• **m_prev**: *[Joint](joint.md) | null*

*Inherited from [Joint](joint.md).[m_prev](joint.md#m_prev)*

*Defined in [joint/index.d.ts:26](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L26)*

___

###  m_type

• **m_type**: *"motor-joint"*

*Overrides [Joint](joint.md).[m_type](joint.md#m_type)*

*Defined in [joint/index.d.ts:182](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L182)*

___

###  m_userData

• **m_userData**: *unknown*

*Inherited from [Joint](joint.md).[m_userData](joint.md#m_userdata)*

*Defined in [joint/index.d.ts:31](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L31)*

## Methods

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Inherited from [Joint](joint.md).[getAnchorA](joint.md#getanchora)*

*Defined in [joint/index.d.ts:41](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L41)*

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Inherited from [Joint](joint.md).[getAnchorB](joint.md#getanchorb)*

*Defined in [joint/index.d.ts:42](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L42)*

**Returns:** *[Vec2](vec2.md)*

___

###  getAngularOffset

▸ **getAngularOffset**(): *number*

*Defined in [joint/index.d.ts:214](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L214)*

**Returns:** *number*

___

###  getBodyA

▸ **getBodyA**(): *[Body](body.md)*

*Inherited from [Joint](joint.md).[getBodyA](joint.md#getbodya)*

*Defined in [joint/index.d.ts:35](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L35)*

**Returns:** *[Body](body.md)*

___

###  getBodyB

▸ **getBodyB**(): *[Body](body.md)*

*Inherited from [Joint](joint.md).[getBodyB](joint.md#getbodyb)*

*Defined in [joint/index.d.ts:36](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L36)*

**Returns:** *[Body](body.md)*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [Joint](joint.md).[getCollideConnected](joint.md#getcollideconnected)*

*Defined in [joint/index.d.ts:40](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L40)*

**Returns:** *boolean*

___

###  getCorrectionFactor

▸ **getCorrectionFactor**(): *number*

*Defined in [joint/index.d.ts:210](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L210)*

**Returns:** *number*

___

###  getLinearOffset

▸ **getLinearOffset**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:212](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L212)*

**Returns:** *[Vec2](vec2.md)*

___

###  getMaxForce

▸ **getMaxForce**(): *number*

*Defined in [joint/index.d.ts:206](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L206)*

**Returns:** *number*

___

###  getMaxTorque

▸ **getMaxTorque**(): *number*

*Defined in [joint/index.d.ts:208](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L208)*

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md) | null*

*Inherited from [Joint](joint.md).[getNext](joint.md#getnext)*

*Defined in [joint/index.d.ts:37](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L37)*

**Returns:** *[Joint](joint.md) | null*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *[Vec2](vec2.md)*

*Inherited from [Joint](joint.md).[getReactionForce](joint.md#getreactionforce)*

*Defined in [joint/index.d.ts:43](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  getReactionTorque

▸ **getReactionTorque**(`inv_dt`: number): *number*

*Inherited from [Joint](joint.md).[getReactionTorque](joint.md#getreactiontorque)*

*Defined in [joint/index.d.ts:44](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [Joint](joint.md).[getType](joint.md#gettype)*

*Defined in [joint/index.d.ts:34](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L34)*

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [Joint](joint.md).[getUserData](joint.md#getuserdata)*

*Defined in [joint/index.d.ts:38](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L38)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: any): *void*

*Inherited from [Joint](joint.md).[initVelocityConstraints](joint.md#initvelocityconstraints)*

*Defined in [joint/index.d.ts:46](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [Joint](joint.md).[isActive](joint.md#isactive)*

*Defined in [joint/index.d.ts:33](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L33)*

**Returns:** *boolean*

___

###  setAngularOffset

▸ **setAngularOffset**(`angularOffset`: number): *void*

*Defined in [joint/index.d.ts:213](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L213)*

**Parameters:**

Name | Type |
------ | ------ |
`angularOffset` | number |

**Returns:** *void*

___

###  setCorrectionFactor

▸ **setCorrectionFactor**(`factor`: number): *void*

*Defined in [joint/index.d.ts:209](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L209)*

**Parameters:**

Name | Type |
------ | ------ |
`factor` | number |

**Returns:** *void*

___

###  setLinearOffset

▸ **setLinearOffset**(`linearOffset`: [Vec2](vec2.md)): *void*

*Defined in [joint/index.d.ts:211](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L211)*

**Parameters:**

Name | Type |
------ | ------ |
`linearOffset` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  setMaxForce

▸ **setMaxForce**(`force`: number): *void*

*Defined in [joint/index.d.ts:205](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L205)*

**Parameters:**

Name | Type |
------ | ------ |
`force` | number |

**Returns:** *void*

___

###  setMaxTorque

▸ **setMaxTorque**(`torque`: number): *void*

*Defined in [joint/index.d.ts:207](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L207)*

**Parameters:**

Name | Type |
------ | ------ |
`torque` | number |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: any): *void*

*Inherited from [Joint](joint.md).[setUserData](joint.md#setuserdata)*

*Defined in [joint/index.d.ts:39](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Inherited from [Joint](joint.md).[shiftOrigin](joint.md#shiftorigin)*

*Defined in [joint/index.d.ts:45](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  solvePositionConstraints

▸ **solvePositionConstraints**(`step`: any): *boolean*

*Inherited from [Joint](joint.md).[solvePositionConstraints](joint.md#solvepositionconstraints)*

*Defined in [joint/index.d.ts:48](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *boolean*

___

###  solveVelocityConstraints

▸ **solveVelocityConstraints**(`step`: any): *void*

*Inherited from [Joint](joint.md).[solveVelocityConstraints](joint.md#solvevelocityconstraints)*

*Defined in [joint/index.d.ts:47](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*
