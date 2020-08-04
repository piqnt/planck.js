[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Joint](joint.md)

# Class: Joint

## Hierarchy

* **Joint**

## Index

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

## Methods

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:41](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L41)*

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:42](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L42)*

**Returns:** *[Vec2](vec2.md)*

___

###  getBodyA

▸ **getBodyA**(): *[Body](body.md)*

*Defined in [joint/index.d.ts:35](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L35)*

**Returns:** *[Body](body.md)*

___

###  getBodyB

▸ **getBodyB**(): *[Body](body.md)*

*Defined in [joint/index.d.ts:36](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L36)*

**Returns:** *[Body](body.md)*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Defined in [joint/index.d.ts:40](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L40)*

**Returns:** *boolean*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md) | null*

*Defined in [joint/index.d.ts:37](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L37)*

**Returns:** *[Joint](joint.md) | null*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:43](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  getReactionTorque

▸ **getReactionTorque**(`inv_dt`: number): *number*

*Defined in [joint/index.d.ts:44](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Defined in [joint/index.d.ts:34](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L34)*

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Defined in [joint/index.d.ts:38](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L38)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: any): *void*

*Defined in [joint/index.d.ts:46](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Defined in [joint/index.d.ts:33](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L33)*

**Returns:** *boolean*

___

###  setUserData

▸ **setUserData**(`data`: any): *void*

*Defined in [joint/index.d.ts:39](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: [Vec2](vec2.md)): *void*

*Defined in [joint/index.d.ts:45](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | [Vec2](vec2.md) |

**Returns:** *void*

___

###  solvePositionConstraints

▸ **solvePositionConstraints**(`step`: any): *boolean*

*Defined in [joint/index.d.ts:48](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *boolean*

___

###  solveVelocityConstraints

▸ **solveVelocityConstraints**(`step`: any): *void*

*Defined in [joint/index.d.ts:47](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*
