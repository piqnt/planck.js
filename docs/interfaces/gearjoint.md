[API Doc](../README.md) › [GearJoint](gearjoint.md)

# Interface: GearJoint

## Hierarchy

* [Joint](joint.md)

  ↳ **GearJoint**

## Index

### Properties

* [m_bodyA](gearjoint.md#m_bodya)
* [m_bodyB](gearjoint.md#m_bodyb)
* [m_bodyC](gearjoint.md#m_bodyc)
* [m_bodyD](gearjoint.md#m_bodyd)
* [m_collideConnected](gearjoint.md#m_collideconnected)
* [m_constant](gearjoint.md#m_constant)
* [m_edgeA](gearjoint.md#m_edgea)
* [m_edgeB](gearjoint.md#m_edgeb)
* [m_impulse](gearjoint.md#m_impulse)
* [m_index](gearjoint.md#m_index)
* [m_islandFlag](gearjoint.md#m_islandflag)
* [m_joint1](gearjoint.md#m_joint1)
* [m_joint2](gearjoint.md#m_joint2)
* [m_localAnchorA](gearjoint.md#m_localanchora)
* [m_localAnchorB](gearjoint.md#m_localanchorb)
* [m_localAnchorC](gearjoint.md#m_localanchorc)
* [m_localAnchorD](gearjoint.md#m_localanchord)
* [m_localAxisC](gearjoint.md#m_localaxisc)
* [m_localAxisD](gearjoint.md#m_localaxisd)
* [m_next](gearjoint.md#m_next)
* [m_prev](gearjoint.md#m_prev)
* [m_ratio](gearjoint.md#m_ratio)
* [m_referenceAngleA](gearjoint.md#m_referenceanglea)
* [m_referenceAngleB](gearjoint.md#m_referenceangleb)
* [m_type](gearjoint.md#m_type)
* [m_type1](gearjoint.md#m_type1)
* [m_type2](gearjoint.md#m_type2)
* [m_userData](gearjoint.md#m_userdata)

### Methods

* [getAnchorA](gearjoint.md#getanchora)
* [getAnchorB](gearjoint.md#getanchorb)
* [getBodyA](gearjoint.md#getbodya)
* [getBodyB](gearjoint.md#getbodyb)
* [getCollideConnected](gearjoint.md#getcollideconnected)
* [getJoint1](gearjoint.md#getjoint1)
* [getJoint2](gearjoint.md#getjoint2)
* [getNext](gearjoint.md#getnext)
* [getRatio](gearjoint.md#getratio)
* [getReactionForce](gearjoint.md#getreactionforce)
* [getReactionTorque](gearjoint.md#getreactiontorque)
* [getType](gearjoint.md#gettype)
* [getUserData](gearjoint.md#getuserdata)
* [initVelocityConstraints](gearjoint.md#initvelocityconstraints)
* [isActive](gearjoint.md#isactive)
* [setRatio](gearjoint.md#setratio)
* [setUserData](gearjoint.md#setuserdata)
* [shiftOrigin](gearjoint.md#shiftorigin)
* [solvePositionConstraints](gearjoint.md#solvepositionconstraints)
* [solveVelocityConstraints](gearjoint.md#solvevelocityconstraints)

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

###  m_bodyC

• **m_bodyC**: *[Body](body.md)*

*Defined in [joint/index.d.ts:147](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L147)*

___

###  m_bodyD

• **m_bodyD**: *[Body](body.md)*

*Defined in [joint/index.d.ts:152](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L152)*

___

###  m_collideConnected

• **m_collideConnected**: *boolean*

*Inherited from [Joint](joint.md).[m_collideConnected](joint.md#m_collideconnected)*

*Defined in [joint/index.d.ts:25](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L25)*

___

###  m_constant

• **m_constant**: *number*

*Defined in [joint/index.d.ts:158](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L158)*

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

*Defined in [joint/index.d.ts:159](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L159)*

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

###  m_joint1

• **m_joint1**: *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

*Defined in [joint/index.d.ts:143](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L143)*

___

###  m_joint2

• **m_joint2**: *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

*Defined in [joint/index.d.ts:144](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L144)*

___

###  m_localAnchorA

• **m_localAnchorA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:149](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L149)*

___

###  m_localAnchorB

• **m_localAnchorB**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:154](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L154)*

___

###  m_localAnchorC

• **m_localAnchorC**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:148](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L148)*

___

###  m_localAnchorD

• **m_localAnchorD**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:153](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L153)*

___

###  m_localAxisC

• **m_localAxisC**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:151](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L151)*

___

###  m_localAxisD

• **m_localAxisD**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:156](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L156)*

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

*Defined in [joint/index.d.ts:157](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L157)*

___

###  m_referenceAngleA

• **m_referenceAngleA**: *number*

*Defined in [joint/index.d.ts:150](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L150)*

___

###  m_referenceAngleB

• **m_referenceAngleB**: *number*

*Defined in [joint/index.d.ts:155](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L155)*

___

###  m_type

• **m_type**: *"gear-joint"*

*Overrides [Joint](joint.md).[m_type](joint.md#m_type)*

*Defined in [joint/index.d.ts:141](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L141)*

___

###  m_type1

• **m_type1**: *"revolute-joint" | "prismatic-joint"*

*Defined in [joint/index.d.ts:145](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L145)*

___

###  m_type2

• **m_type2**: *"revolute-joint" | "prismatic-joint"*

*Defined in [joint/index.d.ts:146](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L146)*

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

###  getJoint1

▸ **getJoint1**(): *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

*Defined in [joint/index.d.ts:168](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L168)*

**Returns:** *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

___

###  getJoint2

▸ **getJoint2**(): *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

*Defined in [joint/index.d.ts:169](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L169)*

**Returns:** *[RevoluteJoint](revolutejoint.md) | [PrismaticJoint](prismaticjoint.md)*

___

###  getNext

▸ **getNext**(): *[Joint](joint.md) | null*

*Inherited from [Joint](joint.md).[getNext](joint.md#getnext)*

*Defined in [joint/index.d.ts:37](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L37)*

**Returns:** *[Joint](joint.md) | null*

___

###  getRatio

▸ **getRatio**(): *number*

*Defined in [joint/index.d.ts:171](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L171)*

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

###  setRatio

▸ **setRatio**(`ratio`: number): *void*

*Defined in [joint/index.d.ts:170](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L170)*

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

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
