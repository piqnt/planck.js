[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Joint](joint.md)

# Class: Joint

## Hierarchy

* **Joint**

## Index

### Properties

* [m_bodyA](joint.md#m_bodya)
* [m_bodyB](joint.md#m_bodyb)
* [m_collideConnected](joint.md#m_collideconnected)
* [m_edgeA](joint.md#m_edgea)
* [m_edgeB](joint.md#m_edgeb)
* [m_index](joint.md#m_index)
* [m_islandFlag](joint.md#m_islandflag)
* [m_next](joint.md#m_next)
* [m_prev](joint.md#m_prev)
* [m_type](joint.md#m_type)
* [m_userData](joint.md#m_userdata)

### Methods

* [getAnchorA](joint.md#getanchora)
* [getAnchorB](joint.md#getanchorb)
* [getBodyA](joint.md#getbodya)
* [getBodyB](joint.md#getbodyb)
* [getCollideConnected](joint.md#getcollideconnected)
* [getNext](joint.md#getnext)
* [getReactionForce](joint.md#getreactionforce)
* [getReactionTorque](joint.md#getreactiontorque)
* [getType](joint.md#gettype)
* [getUserData](joint.md#getuserdata)
* [initVelocityConstraints](joint.md#initvelocityconstraints)
* [isActive](joint.md#isactive)
* [setUserData](joint.md#setuserdata)
* [shiftOrigin](joint.md#shiftorigin)
* [solvePositionConstraints](joint.md#solvepositionconstraints)
* [solveVelocityConstraints](joint.md#solvevelocityconstraints)

## Properties

###  m_bodyA

• **m_bodyA**: *[Body](body.md)*

*Defined in [joint/index.d.ts:22](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L22)*

___

###  m_bodyB

• **m_bodyB**: *[Body](body.md)*

*Defined in [joint/index.d.ts:23](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L23)*

___

###  m_collideConnected

• **m_collideConnected**: *boolean*

*Defined in [joint/index.d.ts:25](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L25)*

___

###  m_edgeA

• **m_edgeA**: *[JointEdge](../interfaces/jointedge.md)*

*Defined in [joint/index.d.ts:28](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L28)*

___

###  m_edgeB

• **m_edgeB**: *[JointEdge](../interfaces/jointedge.md)*

*Defined in [joint/index.d.ts:29](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L29)*

___

###  m_index

• **m_index**: *number*

*Defined in [joint/index.d.ts:24](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L24)*

___

###  m_islandFlag

• **m_islandFlag**: *boolean*

*Defined in [joint/index.d.ts:30](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L30)*

___

###  m_next

• **m_next**: *[Joint](joint.md) | null*

*Defined in [joint/index.d.ts:27](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L27)*

___

###  m_prev

• **m_prev**: *[Joint](joint.md) | null*

*Defined in [joint/index.d.ts:26](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L26)*

___

###  m_type

• **m_type**: *string*

*Defined in [joint/index.d.ts:21](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L21)*

___

###  m_userData

• **m_userData**: *unknown*

*Defined in [joint/index.d.ts:31](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L31)*

## Methods

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:41](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L41)*

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:42](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L42)*

**Returns:** *[Vec2](vec2.md)*

___

###  getBodyA

▸ **getBodyA**(): *[Body](body.md)*

*Defined in [joint/index.d.ts:35](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L35)*

**Returns:** *[Body](body.md)*

___

###  getBodyB

▸ **getBodyB**(): *[Body](body.md)*

*Defined in [joint/index.d.ts:36](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L36)*

**Returns:** *[Body](body.md)*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Defined in [joint/index.d.ts:40](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L40)*

**Returns:** *boolean*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md) | null*

*Defined in [joint/index.d.ts:37](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L37)*

**Returns:** *[Joint](joint.md) | null*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:43](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  getReactionTorque

▸ **getReactionTorque**(`inv_dt`: number): *number*

*Defined in [joint/index.d.ts:44](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Defined in [joint/index.d.ts:34](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L34)*

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Defined in [joint/index.d.ts:38](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L38)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: any): *void*

*Defined in [joint/index.d.ts:46](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Defined in [joint/index.d.ts:33](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L33)*

**Returns:** *boolean*

___

###  setUserData

▸ **setUserData**(`data`: any): *void*

*Defined in [joint/index.d.ts:39](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Defined in [joint/index.d.ts:45](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  solvePositionConstraints

▸ **solvePositionConstraints**(`step`: any): *boolean*

*Defined in [joint/index.d.ts:48](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *boolean*

___

###  solveVelocityConstraints

▸ **solveVelocityConstraints**(`step`: any): *void*

*Defined in [joint/index.d.ts:47](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/joint/index.d.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*
