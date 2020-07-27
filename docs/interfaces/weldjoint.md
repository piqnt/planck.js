[API Doc](../README.md) › [WeldJoint](weldjoint.md)

# Interface: WeldJoint

## Hierarchy

* [Joint](joint.md)

  ↳ **WeldJoint**

## Index

### Properties

* [m_bias](weldjoint.md#m_bias)
* [m_bodyA](weldjoint.md#m_bodya)
* [m_bodyB](weldjoint.md#m_bodyb)
* [m_collideConnected](weldjoint.md#m_collideconnected)
* [m_dampingRatio](weldjoint.md#m_dampingratio)
* [m_edgeA](weldjoint.md#m_edgea)
* [m_edgeB](weldjoint.md#m_edgeb)
* [m_frequencyHz](weldjoint.md#m_frequencyhz)
* [m_gamma](weldjoint.md#m_gamma)
* [m_impulse](weldjoint.md#m_impulse)
* [m_index](weldjoint.md#m_index)
* [m_islandFlag](weldjoint.md#m_islandflag)
* [m_localAnchorA](weldjoint.md#m_localanchora)
* [m_localAnchorB](weldjoint.md#m_localanchorb)
* [m_next](weldjoint.md#m_next)
* [m_prev](weldjoint.md#m_prev)
* [m_referenceAngle](weldjoint.md#m_referenceangle)
* [m_type](weldjoint.md#m_type)
* [m_userData](weldjoint.md#m_userdata)

### Methods

* [getAnchorA](weldjoint.md#getanchora)
* [getAnchorB](weldjoint.md#getanchorb)
* [getBodyA](weldjoint.md#getbodya)
* [getBodyB](weldjoint.md#getbodyb)
* [getCollideConnected](weldjoint.md#getcollideconnected)
* [getDampingRatio](weldjoint.md#getdampingratio)
* [getFrequency](weldjoint.md#getfrequency)
* [getLocalAnchorA](weldjoint.md#getlocalanchora)
* [getLocalAnchorB](weldjoint.md#getlocalanchorb)
* [getNext](weldjoint.md#getnext)
* [getReactionForce](weldjoint.md#getreactionforce)
* [getReactionTorque](weldjoint.md#getreactiontorque)
* [getReferenceAngle](weldjoint.md#getreferenceangle)
* [getType](weldjoint.md#gettype)
* [getUserData](weldjoint.md#getuserdata)
* [initVelocityConstraints](weldjoint.md#initvelocityconstraints)
* [isActive](weldjoint.md#isactive)
* [setDampingRatio](weldjoint.md#setdampingratio)
* [setFrequency](weldjoint.md#setfrequency)
* [setUserData](weldjoint.md#setuserdata)
* [shiftOrigin](weldjoint.md#shiftorigin)
* [solvePositionConstraints](weldjoint.md#solvepositionconstraints)
* [solveVelocityConstraints](weldjoint.md#solvevelocityconstraints)

## Properties

###  m_bias

• **m_bias**: *number*

*Defined in [joint/index.d.ts:481](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L481)*

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

###  m_dampingRatio

• **m_dampingRatio**: *number*

*Defined in [joint/index.d.ts:479](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L479)*

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

###  m_frequencyHz

• **m_frequencyHz**: *number*

*Defined in [joint/index.d.ts:478](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L478)*

___

###  m_gamma

• **m_gamma**: *number*

*Defined in [joint/index.d.ts:482](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L482)*

___

###  m_impulse

• **m_impulse**: *[Vec3](vec3.md)*

*Defined in [joint/index.d.ts:480](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L480)*

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

*Defined in [joint/index.d.ts:475](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L475)*

___

###  m_localAnchorB

• **m_localAnchorB**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:476](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L476)*

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

*Defined in [joint/index.d.ts:477](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L477)*

___

###  m_type

• **m_type**: *"weld-joint"*

*Overrides [Joint](joint.md).[m_type](joint.md#m_type)*

*Defined in [joint/index.d.ts:473](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L473)*

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

###  getDampingRatio

▸ **getDampingRatio**(): *number*

*Defined in [joint/index.d.ts:500](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L500)*

**Returns:** *number*

___

###  getFrequency

▸ **getFrequency**(): *number*

*Defined in [joint/index.d.ts:498](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L498)*

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:494](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L494)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:495](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L495)*

**Returns:** *[Vec2](vec2.md)*

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

*Defined in [joint/index.d.ts:496](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L496)*

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

###  setDampingRatio

▸ **setDampingRatio**(`ratio`: number): *void*

*Defined in [joint/index.d.ts:499](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L499)*

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setFrequency

▸ **setFrequency**(`hz`: number): *void*

*Defined in [joint/index.d.ts:497](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L497)*

**Parameters:**

Name | Type |
------ | ------ |
`hz` | number |

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
