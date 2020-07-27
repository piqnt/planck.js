[API Doc](../README.md) › [MouseJoint](mousejoint.md)

# Interface: MouseJoint

## Hierarchy

* [Joint](joint.md)

  ↳ **MouseJoint**

## Index

### Properties

* [m_beta](mousejoint.md#m_beta)
* [m_bodyA](mousejoint.md#m_bodya)
* [m_bodyB](mousejoint.md#m_bodyb)
* [m_collideConnected](mousejoint.md#m_collideconnected)
* [m_dampingRatio](mousejoint.md#m_dampingratio)
* [m_edgeA](mousejoint.md#m_edgea)
* [m_edgeB](mousejoint.md#m_edgeb)
* [m_frequencyHz](mousejoint.md#m_frequencyhz)
* [m_gamma](mousejoint.md#m_gamma)
* [m_impulse](mousejoint.md#m_impulse)
* [m_index](mousejoint.md#m_index)
* [m_islandFlag](mousejoint.md#m_islandflag)
* [m_localAnchorB](mousejoint.md#m_localanchorb)
* [m_maxForce](mousejoint.md#m_maxforce)
* [m_next](mousejoint.md#m_next)
* [m_prev](mousejoint.md#m_prev)
* [m_targetA](mousejoint.md#m_targeta)
* [m_type](mousejoint.md#m_type)
* [m_userData](mousejoint.md#m_userdata)

### Methods

* [getAnchorA](mousejoint.md#getanchora)
* [getAnchorB](mousejoint.md#getanchorb)
* [getBodyA](mousejoint.md#getbodya)
* [getBodyB](mousejoint.md#getbodyb)
* [getCollideConnected](mousejoint.md#getcollideconnected)
* [getDampingRatio](mousejoint.md#getdampingratio)
* [getFrequency](mousejoint.md#getfrequency)
* [getMaxForce](mousejoint.md#getmaxforce)
* [getNext](mousejoint.md#getnext)
* [getReactionForce](mousejoint.md#getreactionforce)
* [getReactionTorque](mousejoint.md#getreactiontorque)
* [getTarget](mousejoint.md#gettarget)
* [getType](mousejoint.md#gettype)
* [getUserData](mousejoint.md#getuserdata)
* [initVelocityConstraints](mousejoint.md#initvelocityconstraints)
* [isActive](mousejoint.md#isactive)
* [setDampingRatio](mousejoint.md#setdampingratio)
* [setFrequency](mousejoint.md#setfrequency)
* [setMaxForce](mousejoint.md#setmaxforce)
* [setTarget](mousejoint.md#settarget)
* [setUserData](mousejoint.md#setuserdata)
* [shiftOrigin](mousejoint.md#shiftorigin)
* [solvePositionConstraints](mousejoint.md#solvepositionconstraints)
* [solveVelocityConstraints](mousejoint.md#solvevelocityconstraints)

## Properties

###  m_beta

• **m_beta**: *number*

*Defined in [joint/index.d.ts:234](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L234)*

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

*Defined in [joint/index.d.ts:233](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L233)*

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

*Defined in [joint/index.d.ts:232](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L232)*

___

###  m_gamma

• **m_gamma**: *number*

*Defined in [joint/index.d.ts:235](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L235)*

___

###  m_impulse

• **m_impulse**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:231](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L231)*

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

###  m_localAnchorB

• **m_localAnchorB**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:229](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L229)*

___

###  m_maxForce

• **m_maxForce**: *number*

*Defined in [joint/index.d.ts:230](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L230)*

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

###  m_targetA

• **m_targetA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:228](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L228)*

___

###  m_type

• **m_type**: *"mouse-joint"*

*Overrides [Joint](joint.md).[m_type](joint.md#m_type)*

*Defined in [joint/index.d.ts:226](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L226)*

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

*Defined in [joint/index.d.ts:251](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L251)*

**Returns:** *number*

___

###  getFrequency

▸ **getFrequency**(): *number*

*Defined in [joint/index.d.ts:249](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L249)*

**Returns:** *number*

___

###  getMaxForce

▸ **getMaxForce**(): *number*

*Defined in [joint/index.d.ts:247](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L247)*

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

###  getTarget

▸ **getTarget**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:245](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L245)*

**Returns:** *[Vec2](vec2.md)*

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

*Defined in [joint/index.d.ts:250](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L250)*

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setFrequency

▸ **setFrequency**(`hz`: number): *void*

*Defined in [joint/index.d.ts:248](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L248)*

**Parameters:**

Name | Type |
------ | ------ |
`hz` | number |

**Returns:** *void*

___

###  setMaxForce

▸ **setMaxForce**(`force`: number): *void*

*Defined in [joint/index.d.ts:246](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L246)*

**Parameters:**

Name | Type |
------ | ------ |
`force` | number |

**Returns:** *void*

___

###  setTarget

▸ **setTarget**(`target`: [Vec2](vec2.md)): *void*

*Defined in [joint/index.d.ts:244](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L244)*

**Parameters:**

Name | Type |
------ | ------ |
`target` | [Vec2](vec2.md) |

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
