[API Doc](../README.md) › [RopeJoint](ropejoint.md)

# Interface: RopeJoint

## Hierarchy

* [Joint](joint.md)

  ↳ **RopeJoint**

## Index

### Properties

* [m_bodyA](ropejoint.md#m_bodya)
* [m_bodyB](ropejoint.md#m_bodyb)
* [m_collideConnected](ropejoint.md#m_collideconnected)
* [m_edgeA](ropejoint.md#m_edgea)
* [m_edgeB](ropejoint.md#m_edgeb)
* [m_impulse](ropejoint.md#m_impulse)
* [m_index](ropejoint.md#m_index)
* [m_islandFlag](ropejoint.md#m_islandflag)
* [m_length](ropejoint.md#m_length)
* [m_localAnchorA](ropejoint.md#m_localanchora)
* [m_localAnchorB](ropejoint.md#m_localanchorb)
* [m_mass](ropejoint.md#m_mass)
* [m_maxLength](ropejoint.md#m_maxlength)
* [m_next](ropejoint.md#m_next)
* [m_prev](ropejoint.md#m_prev)
* [m_state](ropejoint.md#m_state)
* [m_type](ropejoint.md#m_type)
* [m_userData](ropejoint.md#m_userdata)

### Methods

* [getAnchorA](ropejoint.md#getanchora)
* [getAnchorB](ropejoint.md#getanchorb)
* [getBodyA](ropejoint.md#getbodya)
* [getBodyB](ropejoint.md#getbodyb)
* [getCollideConnected](ropejoint.md#getcollideconnected)
* [getLimitState](ropejoint.md#getlimitstate)
* [getLocalAnchorA](ropejoint.md#getlocalanchora)
* [getLocalAnchorB](ropejoint.md#getlocalanchorb)
* [getMaxLength](ropejoint.md#getmaxlength)
* [getNext](ropejoint.md#getnext)
* [getReactionForce](ropejoint.md#getreactionforce)
* [getReactionTorque](ropejoint.md#getreactiontorque)
* [getType](ropejoint.md#gettype)
* [getUserData](ropejoint.md#getuserdata)
* [initVelocityConstraints](ropejoint.md#initvelocityconstraints)
* [isActive](ropejoint.md#isactive)
* [setMaxLength](ropejoint.md#setmaxlength)
* [setUserData](ropejoint.md#setuserdata)
* [shiftOrigin](ropejoint.md#shiftorigin)
* [solvePositionConstraints](ropejoint.md#solvepositionconstraints)
* [solveVelocityConstraints](ropejoint.md#solvevelocityconstraints)

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

###  m_impulse

• **m_impulse**: *number*

*Defined in [joint/index.d.ts:442](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L442)*

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

###  m_length

• **m_length**: *number*

*Defined in [joint/index.d.ts:443](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L443)*

___

###  m_localAnchorA

• **m_localAnchorA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:438](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L438)*

___

###  m_localAnchorB

• **m_localAnchorB**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:439](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L439)*

___

###  m_mass

• **m_mass**: *number*

*Defined in [joint/index.d.ts:441](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L441)*

___

###  m_maxLength

• **m_maxLength**: *number*

*Defined in [joint/index.d.ts:440](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L440)*

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

###  m_state

• **m_state**: *[LIMIT_STATE](../enums/limit_state.md)*

*Defined in [joint/index.d.ts:444](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L444)*

___

###  m_type

• **m_type**: *"rope-joint"*

*Overrides [Joint](joint.md).[m_type](joint.md#m_type)*

*Defined in [joint/index.d.ts:436](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L436)*

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

###  getLimitState

▸ **getLimitState**(): *[LIMIT_STATE](../enums/limit_state.md)*

*Defined in [joint/index.d.ts:462](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L462)*

**Returns:** *[LIMIT_STATE](../enums/limit_state.md)*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:458](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L458)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:459](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L459)*

**Returns:** *[Vec2](vec2.md)*

___

###  getMaxLength

▸ **getMaxLength**(): *number*

*Defined in [joint/index.d.ts:461](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L461)*

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

###  setMaxLength

▸ **setMaxLength**(`length`: number): *void*

*Defined in [joint/index.d.ts:460](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L460)*

**Parameters:**

Name | Type |
------ | ------ |
`length` | number |

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
