[API Doc](../README.md) › [PulleyJoint](pulleyjoint.md)

# Interface: PulleyJoint

## Hierarchy

* [Joint](joint.md)

  ↳ **PulleyJoint**

## Index

### Properties

* [m_bodyA](pulleyjoint.md#m_bodya)
* [m_bodyB](pulleyjoint.md#m_bodyb)
* [m_collideConnected](pulleyjoint.md#m_collideconnected)
* [m_constant](pulleyjoint.md#m_constant)
* [m_edgeA](pulleyjoint.md#m_edgea)
* [m_edgeB](pulleyjoint.md#m_edgeb)
* [m_groundAnchorA](pulleyjoint.md#m_groundanchora)
* [m_groundAnchorB](pulleyjoint.md#m_groundanchorb)
* [m_impulse](pulleyjoint.md#m_impulse)
* [m_index](pulleyjoint.md#m_index)
* [m_islandFlag](pulleyjoint.md#m_islandflag)
* [m_lengthA](pulleyjoint.md#m_lengtha)
* [m_lengthB](pulleyjoint.md#m_lengthb)
* [m_localAnchorA](pulleyjoint.md#m_localanchora)
* [m_localAnchorB](pulleyjoint.md#m_localanchorb)
* [m_next](pulleyjoint.md#m_next)
* [m_prev](pulleyjoint.md#m_prev)
* [m_ratio](pulleyjoint.md#m_ratio)
* [m_type](pulleyjoint.md#m_type)
* [m_userData](pulleyjoint.md#m_userdata)

### Methods

* [getAnchorA](pulleyjoint.md#getanchora)
* [getAnchorB](pulleyjoint.md#getanchorb)
* [getBodyA](pulleyjoint.md#getbodya)
* [getBodyB](pulleyjoint.md#getbodyb)
* [getCollideConnected](pulleyjoint.md#getcollideconnected)
* [getCurrentLengthA](pulleyjoint.md#getcurrentlengtha)
* [getCurrentLengthB](pulleyjoint.md#getcurrentlengthb)
* [getGroundAnchorA](pulleyjoint.md#getgroundanchora)
* [getGroundAnchorB](pulleyjoint.md#getgroundanchorb)
* [getLengthA](pulleyjoint.md#getlengtha)
* [getLengthB](pulleyjoint.md#getlengthb)
* [getNext](pulleyjoint.md#getnext)
* [getRatio](pulleyjoint.md#getratio)
* [getReactionForce](pulleyjoint.md#getreactionforce)
* [getReactionTorque](pulleyjoint.md#getreactiontorque)
* [getType](pulleyjoint.md#gettype)
* [getUserData](pulleyjoint.md#getuserdata)
* [initVelocityConstraints](pulleyjoint.md#initvelocityconstraints)
* [isActive](pulleyjoint.md#isactive)
* [setUserData](pulleyjoint.md#setuserdata)
* [shiftOrigin](pulleyjoint.md#shiftorigin)
* [solvePositionConstraints](pulleyjoint.md#solvepositionconstraints)
* [solveVelocityConstraints](pulleyjoint.md#solvevelocityconstraints)

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

###  m_constant

• **m_constant**: *number*

*Defined in [joint/index.d.ts:338](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L338)*

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

###  m_groundAnchorA

• **m_groundAnchorA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:331](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L331)*

___

###  m_groundAnchorB

• **m_groundAnchorB**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:332](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L332)*

___

###  m_impulse

• **m_impulse**: *number*

*Defined in [joint/index.d.ts:339](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L339)*

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

###  m_lengthA

• **m_lengthA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:335](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L335)*

___

###  m_lengthB

• **m_lengthB**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:336](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L336)*

___

###  m_localAnchorA

• **m_localAnchorA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:333](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L333)*

___

###  m_localAnchorB

• **m_localAnchorB**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:334](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L334)*

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

###  m_ratio

• **m_ratio**: *number*

*Defined in [joint/index.d.ts:337](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L337)*

___

###  m_type

• **m_type**: *"pulley-joint"*

*Overrides [Joint](joint.md).[m_type](joint.md#m_type)*

*Defined in [joint/index.d.ts:329](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L329)*

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

###  getCurrentLengthA

▸ **getCurrentLengthA**(): *number*

*Defined in [joint/index.d.ts:358](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L358)*

**Returns:** *number*

___

###  getCurrentLengthB

▸ **getCurrentLengthB**(): *number*

*Defined in [joint/index.d.ts:359](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L359)*

**Returns:** *number*

___

###  getGroundAnchorA

▸ **getGroundAnchorA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:353](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L353)*

**Returns:** *[Vec2](vec2.md)*

___

###  getGroundAnchorB

▸ **getGroundAnchorB**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:354](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L354)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLengthA

▸ **getLengthA**(): *number*

*Defined in [joint/index.d.ts:355](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L355)*

**Returns:** *number*

___

###  getLengthB

▸ **getLengthB**(): *number*

*Defined in [joint/index.d.ts:356](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L356)*

**Returns:** *number*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md) | null*

*Inherited from [Joint](joint.md).[getNext](joint.md#getnext)*

*Defined in [joint/index.d.ts:37](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L37)*

**Returns:** *[Joint](joint.md) | null*

___

###  getRatio

▸ **getRatio**(): *number*

*Defined in [joint/index.d.ts:357](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L357)*

**Returns:** *number*

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
