[API Doc](../README.md) › [PrismaticJoint](prismaticjoint.md)

# Interface: PrismaticJoint

## Hierarchy

* [Joint](joint.md)

  ↳ **PrismaticJoint**

## Index

### Properties

* [m_axis](prismaticjoint.md#m_axis)
* [m_bodyA](prismaticjoint.md#m_bodya)
* [m_bodyB](prismaticjoint.md#m_bodyb)
* [m_collideConnected](prismaticjoint.md#m_collideconnected)
* [m_edgeA](prismaticjoint.md#m_edgea)
* [m_edgeB](prismaticjoint.md#m_edgeb)
* [m_enableLimit](prismaticjoint.md#m_enablelimit)
* [m_enableMotor](prismaticjoint.md#m_enablemotor)
* [m_impulse](prismaticjoint.md#m_impulse)
* [m_index](prismaticjoint.md#m_index)
* [m_islandFlag](prismaticjoint.md#m_islandflag)
* [m_limitState](prismaticjoint.md#m_limitstate)
* [m_localAnchorA](prismaticjoint.md#m_localanchora)
* [m_localAnchorB](prismaticjoint.md#m_localanchorb)
* [m_localXAxisA](prismaticjoint.md#m_localxaxisa)
* [m_localYAxisA](prismaticjoint.md#m_localyaxisa)
* [m_lowerTranslation](prismaticjoint.md#m_lowertranslation)
* [m_maxMotorForce](prismaticjoint.md#m_maxmotorforce)
* [m_motorImpulse](prismaticjoint.md#m_motorimpulse)
* [m_motorMass](prismaticjoint.md#m_motormass)
* [m_motorSpeed](prismaticjoint.md#m_motorspeed)
* [m_next](prismaticjoint.md#m_next)
* [m_perp](prismaticjoint.md#m_perp)
* [m_prev](prismaticjoint.md#m_prev)
* [m_referenceAngle](prismaticjoint.md#m_referenceangle)
* [m_type](prismaticjoint.md#m_type)
* [m_upperTranslation](prismaticjoint.md#m_uppertranslation)
* [m_userData](prismaticjoint.md#m_userdata)

### Methods

* [enableLimit](prismaticjoint.md#enablelimit)
* [enableMotor](prismaticjoint.md#enablemotor)
* [getAnchorA](prismaticjoint.md#getanchora)
* [getAnchorB](prismaticjoint.md#getanchorb)
* [getBodyA](prismaticjoint.md#getbodya)
* [getBodyB](prismaticjoint.md#getbodyb)
* [getCollideConnected](prismaticjoint.md#getcollideconnected)
* [getJointSpeed](prismaticjoint.md#getjointspeed)
* [getJointTranslation](prismaticjoint.md#getjointtranslation)
* [getLocalAnchorA](prismaticjoint.md#getlocalanchora)
* [getLocalAnchorB](prismaticjoint.md#getlocalanchorb)
* [getLocalAxisA](prismaticjoint.md#getlocalaxisa)
* [getLowerLimit](prismaticjoint.md#getlowerlimit)
* [getMotorForce](prismaticjoint.md#getmotorforce)
* [getMotorSpeed](prismaticjoint.md#getmotorspeed)
* [getNext](prismaticjoint.md#getnext)
* [getReactionForce](prismaticjoint.md#getreactionforce)
* [getReactionTorque](prismaticjoint.md#getreactiontorque)
* [getReferenceAngle](prismaticjoint.md#getreferenceangle)
* [getType](prismaticjoint.md#gettype)
* [getUpperLimit](prismaticjoint.md#getupperlimit)
* [getUserData](prismaticjoint.md#getuserdata)
* [initVelocityConstraints](prismaticjoint.md#initvelocityconstraints)
* [isActive](prismaticjoint.md#isactive)
* [isLimitEnabled](prismaticjoint.md#islimitenabled)
* [isMotorEnabled](prismaticjoint.md#ismotorenabled)
* [setLimits](prismaticjoint.md#setlimits)
* [setMaxMotorForce](prismaticjoint.md#setmaxmotorforce)
* [setMotorSpeed](prismaticjoint.md#setmotorspeed)
* [setUserData](prismaticjoint.md#setuserdata)
* [shiftOrigin](prismaticjoint.md#shiftorigin)
* [solvePositionConstraints](prismaticjoint.md#solvepositionconstraints)
* [solveVelocityConstraints](prismaticjoint.md#solvevelocityconstraints)

## Properties

###  m_axis

• **m_axis**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:280](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L280)*

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

*Defined in [joint/index.d.ts:277](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L277)*

___

###  m_enableMotor

• **m_enableMotor**: *boolean*

*Defined in [joint/index.d.ts:278](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L278)*

___

###  m_impulse

• **m_impulse**: *[Vec3](vec3.md)*

*Defined in [joint/index.d.ts:270](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L270)*

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

###  m_limitState

• **m_limitState**: *[LIMIT_STATE](../enums/limit_state.md)*

*Defined in [joint/index.d.ts:279](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L279)*

___

###  m_localAnchorA

• **m_localAnchorA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:265](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L265)*

___

###  m_localAnchorB

• **m_localAnchorB**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:266](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L266)*

___

###  m_localXAxisA

• **m_localXAxisA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:267](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L267)*

___

###  m_localYAxisA

• **m_localYAxisA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:268](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L268)*

___

###  m_lowerTranslation

• **m_lowerTranslation**: *number*

*Defined in [joint/index.d.ts:273](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L273)*

___

###  m_maxMotorForce

• **m_maxMotorForce**: *number*

*Defined in [joint/index.d.ts:275](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L275)*

___

###  m_motorImpulse

• **m_motorImpulse**: *number*

*Defined in [joint/index.d.ts:272](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L272)*

___

###  m_motorMass

• **m_motorMass**: *number*

*Defined in [joint/index.d.ts:271](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L271)*

___

###  m_motorSpeed

• **m_motorSpeed**: *number*

*Defined in [joint/index.d.ts:276](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L276)*

___

###  m_next

• **m_next**: *[Joint](joint.md) | null*

*Inherited from [Joint](joint.md).[m_next](joint.md#m_next)*

*Defined in [joint/index.d.ts:27](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L27)*

___

###  m_perp

• **m_perp**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:281](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L281)*

___

###  m_prev

• **m_prev**: *[Joint](joint.md) | null*

*Inherited from [Joint](joint.md).[m_prev](joint.md#m_prev)*

*Defined in [joint/index.d.ts:26](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L26)*

___

###  m_referenceAngle

• **m_referenceAngle**: *number*

*Defined in [joint/index.d.ts:269](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L269)*

___

###  m_type

• **m_type**: *"prismatic-joint"*

*Overrides [Joint](joint.md).[m_type](joint.md#m_type)*

*Defined in [joint/index.d.ts:263](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L263)*

___

###  m_upperTranslation

• **m_upperTranslation**: *number*

*Defined in [joint/index.d.ts:274](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L274)*

___

###  m_userData

• **m_userData**: *unknown*

*Inherited from [Joint](joint.md).[m_userData](joint.md#m_userdata)*

*Defined in [joint/index.d.ts:31](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L31)*

## Methods

###  enableLimit

▸ **enableLimit**(`flag`: boolean): *void*

*Defined in [joint/index.d.ts:302](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L302)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  enableMotor

▸ **enableMotor**(`flag`: boolean): *void*

*Defined in [joint/index.d.ts:307](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L307)*

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

###  getJointSpeed

▸ **getJointSpeed**(): *number*

*Defined in [joint/index.d.ts:300](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L300)*

**Returns:** *number*

___

###  getJointTranslation

▸ **getJointTranslation**(): *number*

*Defined in [joint/index.d.ts:299](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L299)*

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:295](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L295)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:296](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L296)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAxisA

▸ **getLocalAxisA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:297](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L297)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLowerLimit

▸ **getLowerLimit**(): *number*

*Defined in [joint/index.d.ts:303](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L303)*

**Returns:** *number*

___

###  getMotorForce

▸ **getMotorForce**(`inv_dt`: number): *number*

*Defined in [joint/index.d.ts:311](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L311)*

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

*Defined in [joint/index.d.ts:310](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L310)*

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

*Defined in [joint/index.d.ts:298](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L298)*

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

*Defined in [joint/index.d.ts:304](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L304)*

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

*Defined in [joint/index.d.ts:301](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L301)*

**Returns:** *boolean*

___

###  isMotorEnabled

▸ **isMotorEnabled**(): *boolean*

*Defined in [joint/index.d.ts:306](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L306)*

**Returns:** *boolean*

___

###  setLimits

▸ **setLimits**(`lower`: number, `upper`: number): *void*

*Defined in [joint/index.d.ts:305](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L305)*

**Parameters:**

Name | Type |
------ | ------ |
`lower` | number |
`upper` | number |

**Returns:** *void*

___

###  setMaxMotorForce

▸ **setMaxMotorForce**(`force`: number): *void*

*Defined in [joint/index.d.ts:309](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L309)*

**Parameters:**

Name | Type |
------ | ------ |
`force` | number |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: number): *void*

*Defined in [joint/index.d.ts:308](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L308)*

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
