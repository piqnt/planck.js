[API Doc](../README.md) › [RevoluteJoint](revolutejoint.md)

# Interface: RevoluteJoint

## Hierarchy

* [Joint](joint.md)

  ↳ **RevoluteJoint**

## Index

### Properties

* [m_bodyA](revolutejoint.md#m_bodya)
* [m_bodyB](revolutejoint.md#m_bodyb)
* [m_collideConnected](revolutejoint.md#m_collideconnected)
* [m_edgeA](revolutejoint.md#m_edgea)
* [m_edgeB](revolutejoint.md#m_edgeb)
* [m_enableLimit](revolutejoint.md#m_enablelimit)
* [m_enableMotor](revolutejoint.md#m_enablemotor)
* [m_impulse](revolutejoint.md#m_impulse)
* [m_index](revolutejoint.md#m_index)
* [m_islandFlag](revolutejoint.md#m_islandflag)
* [m_localAnchorA](revolutejoint.md#m_localanchora)
* [m_localAnchorB](revolutejoint.md#m_localanchorb)
* [m_lowerAngle](revolutejoint.md#m_lowerangle)
* [m_maxMotorTorque](revolutejoint.md#m_maxmotortorque)
* [m_motorImpulse](revolutejoint.md#m_motorimpulse)
* [m_motorSpeed](revolutejoint.md#m_motorspeed)
* [m_next](revolutejoint.md#m_next)
* [m_prev](revolutejoint.md#m_prev)
* [m_referenceAngle](revolutejoint.md#m_referenceangle)
* [m_type](revolutejoint.md#m_type)
* [m_upperAngle](revolutejoint.md#m_upperangle)
* [m_userData](revolutejoint.md#m_userdata)

### Methods

* [enableLimit](revolutejoint.md#enablelimit)
* [enableMotor](revolutejoint.md#enablemotor)
* [getAnchorA](revolutejoint.md#getanchora)
* [getAnchorB](revolutejoint.md#getanchorb)
* [getBodyA](revolutejoint.md#getbodya)
* [getBodyB](revolutejoint.md#getbodyb)
* [getCollideConnected](revolutejoint.md#getcollideconnected)
* [getJointAngle](revolutejoint.md#getjointangle)
* [getJointSpeed](revolutejoint.md#getjointspeed)
* [getLocalAnchorA](revolutejoint.md#getlocalanchora)
* [getLocalAnchorB](revolutejoint.md#getlocalanchorb)
* [getLowerLimit](revolutejoint.md#getlowerlimit)
* [getMaxMotorTorque](revolutejoint.md#getmaxmotortorque)
* [getMotorSpeed](revolutejoint.md#getmotorspeed)
* [getMotorTorque](revolutejoint.md#getmotortorque)
* [getNext](revolutejoint.md#getnext)
* [getReactionForce](revolutejoint.md#getreactionforce)
* [getReactionTorque](revolutejoint.md#getreactiontorque)
* [getReferenceAngle](revolutejoint.md#getreferenceangle)
* [getType](revolutejoint.md#gettype)
* [getUpperLimit](revolutejoint.md#getupperlimit)
* [getUserData](revolutejoint.md#getuserdata)
* [initVelocityConstraints](revolutejoint.md#initvelocityconstraints)
* [isActive](revolutejoint.md#isactive)
* [isLimitEnabled](revolutejoint.md#islimitenabled)
* [isMotorEnabled](revolutejoint.md#ismotorenabled)
* [setLimits](revolutejoint.md#setlimits)
* [setMaxMotorTorque](revolutejoint.md#setmaxmotortorque)
* [setMotorSpeed](revolutejoint.md#setmotorspeed)
* [setUserData](revolutejoint.md#setuserdata)
* [shiftOrigin](revolutejoint.md#shiftorigin)
* [solvePositionConstraints](revolutejoint.md#solvepositionconstraints)
* [solveVelocityConstraints](revolutejoint.md#solvevelocityconstraints)

## Properties

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

###  m_enableLimit

• **m_enableLimit**: *boolean*

*Defined in [joint/index.d.ts:385](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L385)*

___

###  m_enableMotor

• **m_enableMotor**: *boolean*

*Defined in [joint/index.d.ts:386](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L386)*

___

###  m_impulse

• **m_impulse**: *[Vec3](vec3.md)*

*Defined in [joint/index.d.ts:379](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L379)*

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

###  m_localAnchorA

• **m_localAnchorA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:376](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L376)*

___

###  m_localAnchorB

• **m_localAnchorB**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:377](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L377)*

___

###  m_lowerAngle

• **m_lowerAngle**: *number*

*Defined in [joint/index.d.ts:381](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L381)*

___

###  m_maxMotorTorque

• **m_maxMotorTorque**: *number*

*Defined in [joint/index.d.ts:383](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L383)*

___

###  m_motorImpulse

• **m_motorImpulse**: *number*

*Defined in [joint/index.d.ts:380](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L380)*

___

###  m_motorSpeed

• **m_motorSpeed**: *number*

*Defined in [joint/index.d.ts:384](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L384)*

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

###  m_referenceAngle

• **m_referenceAngle**: *number*

*Defined in [joint/index.d.ts:378](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L378)*

___

###  m_type

• **m_type**: *"revolute-joint"*

*Overrides [Joint](joint.md).[m_type](joint.md#m_type)*

*Defined in [joint/index.d.ts:374](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L374)*

___

###  m_upperAngle

• **m_upperAngle**: *number*

*Defined in [joint/index.d.ts:382](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L382)*

___

###  m_userData

• **m_userData**: *unknown*

*Inherited from [Joint](joint.md).[m_userData](joint.md#m_userdata)*

*Defined in [joint/index.d.ts:31](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L31)*

## Methods

###  enableLimit

▸ **enableLimit**(`flag`: boolean): *void*

*Defined in [joint/index.d.ts:416](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L416)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  enableMotor

▸ **enableMotor**(`flag`: boolean): *void*

*Defined in [joint/index.d.ts:409](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L409)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

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

###  getJointAngle

▸ **getJointAngle**(): *number*

*Defined in [joint/index.d.ts:406](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L406)*

**Returns:** *number*

___

###  getJointSpeed

▸ **getJointSpeed**(): *number*

*Defined in [joint/index.d.ts:407](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L407)*

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:403](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L403)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:404](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L404)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLowerLimit

▸ **getLowerLimit**(): *number*

*Defined in [joint/index.d.ts:417](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L417)*

**Returns:** *number*

___

###  getMaxMotorTorque

▸ **getMaxMotorTorque**(): *number*

*Defined in [joint/index.d.ts:414](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L414)*

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

*Defined in [joint/index.d.ts:412](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L412)*

**Returns:** *number*

___

###  getMotorTorque

▸ **getMotorTorque**(`inv_dt`: number): *number*

*Defined in [joint/index.d.ts:410](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L410)*

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

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

###  getReferenceAngle

▸ **getReferenceAngle**(): *number*

*Defined in [joint/index.d.ts:405](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L405)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [Joint](joint.md).[getType](joint.md#gettype)*

*Defined in [joint/index.d.ts:34](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L34)*

**Returns:** *string*

___

###  getUpperLimit

▸ **getUpperLimit**(): *number*

*Defined in [joint/index.d.ts:418](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L418)*

**Returns:** *number*

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

###  isLimitEnabled

▸ **isLimitEnabled**(): *boolean*

*Defined in [joint/index.d.ts:415](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L415)*

**Returns:** *boolean*

___

###  isMotorEnabled

▸ **isMotorEnabled**(): *boolean*

*Defined in [joint/index.d.ts:408](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L408)*

**Returns:** *boolean*

___

###  setLimits

▸ **setLimits**(`lower`: number, `upper`: number): *void*

*Defined in [joint/index.d.ts:419](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L419)*

**Parameters:**

Name | Type |
------ | ------ |
`lower` | number |
`upper` | number |

**Returns:** *void*

___

###  setMaxMotorTorque

▸ **setMaxMotorTorque**(`torque`: number): *void*

*Defined in [joint/index.d.ts:413](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L413)*

**Parameters:**

Name | Type |
------ | ------ |
`torque` | number |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: number): *void*

*Defined in [joint/index.d.ts:411](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L411)*

**Parameters:**

Name | Type |
------ | ------ |
`speed` | number |

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
