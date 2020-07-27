[API Doc](../README.md) › [WheelJoint](wheeljoint.md)

# Interface: WheelJoint

## Hierarchy

* [Joint](joint.md)

  ↳ **WheelJoint**

## Index

### Properties

* [m_bias](wheeljoint.md#m_bias)
* [m_bodyA](wheeljoint.md#m_bodya)
* [m_bodyB](wheeljoint.md#m_bodyb)
* [m_collideConnected](wheeljoint.md#m_collideconnected)
* [m_dampingRatio](wheeljoint.md#m_dampingratio)
* [m_edgeA](wheeljoint.md#m_edgea)
* [m_edgeB](wheeljoint.md#m_edgeb)
* [m_enableMotor](wheeljoint.md#m_enablemotor)
* [m_frequencyHz](wheeljoint.md#m_frequencyhz)
* [m_gamma](wheeljoint.md#m_gamma)
* [m_impulse](wheeljoint.md#m_impulse)
* [m_index](wheeljoint.md#m_index)
* [m_islandFlag](wheeljoint.md#m_islandflag)
* [m_localAnchorA](wheeljoint.md#m_localanchora)
* [m_localAnchorB](wheeljoint.md#m_localanchorb)
* [m_localXAxisA](wheeljoint.md#m_localxaxisa)
* [m_localYAxisA](wheeljoint.md#m_localyaxisa)
* [m_mass](wheeljoint.md#m_mass)
* [m_maxMotorTorque](wheeljoint.md#m_maxmotortorque)
* [m_motorImpulse](wheeljoint.md#m_motorimpulse)
* [m_motorMass](wheeljoint.md#m_motormass)
* [m_motorSpeed](wheeljoint.md#m_motorspeed)
* [m_next](wheeljoint.md#m_next)
* [m_prev](wheeljoint.md#m_prev)
* [m_springImpulse](wheeljoint.md#m_springimpulse)
* [m_springMass](wheeljoint.md#m_springmass)
* [m_type](wheeljoint.md#m_type)
* [m_userData](wheeljoint.md#m_userdata)

### Methods

* [enableMotor](wheeljoint.md#enablemotor)
* [getAnchorA](wheeljoint.md#getanchora)
* [getAnchorB](wheeljoint.md#getanchorb)
* [getBodyA](wheeljoint.md#getbodya)
* [getBodyB](wheeljoint.md#getbodyb)
* [getCollideConnected](wheeljoint.md#getcollideconnected)
* [getJointSpeed](wheeljoint.md#getjointspeed)
* [getJointTranslation](wheeljoint.md#getjointtranslation)
* [getLocalAnchorA](wheeljoint.md#getlocalanchora)
* [getLocalAnchorB](wheeljoint.md#getlocalanchorb)
* [getLocalAxisA](wheeljoint.md#getlocalaxisa)
* [getMaxMotorTorque](wheeljoint.md#getmaxmotortorque)
* [getMotorSpeed](wheeljoint.md#getmotorspeed)
* [getMotorTorque](wheeljoint.md#getmotortorque)
* [getNext](wheeljoint.md#getnext)
* [getReactionForce](wheeljoint.md#getreactionforce)
* [getReactionTorque](wheeljoint.md#getreactiontorque)
* [getSpringDampingRatio](wheeljoint.md#getspringdampingratio)
* [getSpringFrequencyHz](wheeljoint.md#getspringfrequencyhz)
* [getType](wheeljoint.md#gettype)
* [getUserData](wheeljoint.md#getuserdata)
* [initVelocityConstraints](wheeljoint.md#initvelocityconstraints)
* [isActive](wheeljoint.md#isactive)
* [isMotorEnabled](wheeljoint.md#ismotorenabled)
* [setMaxMotorTorque](wheeljoint.md#setmaxmotortorque)
* [setMotorSpeed](wheeljoint.md#setmotorspeed)
* [setSpringDampingRatio](wheeljoint.md#setspringdampingratio)
* [setSpringFrequencyHz](wheeljoint.md#setspringfrequencyhz)
* [setUserData](wheeljoint.md#setuserdata)
* [shiftOrigin](wheeljoint.md#shiftorigin)
* [solvePositionConstraints](wheeljoint.md#solvepositionconstraints)
* [solveVelocityConstraints](wheeljoint.md#solvevelocityconstraints)

## Properties

###  m_bias

• **m_bias**: *number*

*Defined in [joint/index.d.ts:531](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L531)*

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

*Defined in [joint/index.d.ts:530](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L530)*

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

###  m_enableMotor

• **m_enableMotor**: *boolean*

*Defined in [joint/index.d.ts:528](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L528)*

___

###  m_frequencyHz

• **m_frequencyHz**: *number*

*Defined in [joint/index.d.ts:529](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L529)*

___

###  m_gamma

• **m_gamma**: *number*

*Defined in [joint/index.d.ts:532](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L532)*

___

###  m_impulse

• **m_impulse**: *number*

*Defined in [joint/index.d.ts:521](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L521)*

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

*Defined in [joint/index.d.ts:516](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L516)*

___

###  m_localAnchorB

• **m_localAnchorB**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:517](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L517)*

___

###  m_localXAxisA

• **m_localXAxisA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:518](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L518)*

___

###  m_localYAxisA

• **m_localYAxisA**: *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:519](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L519)*

___

###  m_mass

• **m_mass**: *number*

*Defined in [joint/index.d.ts:520](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L520)*

___

###  m_maxMotorTorque

• **m_maxMotorTorque**: *number*

*Defined in [joint/index.d.ts:526](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L526)*

___

###  m_motorImpulse

• **m_motorImpulse**: *number*

*Defined in [joint/index.d.ts:523](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L523)*

___

###  m_motorMass

• **m_motorMass**: *number*

*Defined in [joint/index.d.ts:522](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L522)*

___

###  m_motorSpeed

• **m_motorSpeed**: *number*

*Defined in [joint/index.d.ts:527](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L527)*

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

###  m_springImpulse

• **m_springImpulse**: *number*

*Defined in [joint/index.d.ts:525](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L525)*

___

###  m_springMass

• **m_springMass**: *number*

*Defined in [joint/index.d.ts:524](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L524)*

___

###  m_type

• **m_type**: *"wheel-joint"*

*Overrides [Joint](joint.md).[m_type](joint.md#m_type)*

*Defined in [joint/index.d.ts:514](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L514)*

___

###  m_userData

• **m_userData**: *unknown*

*Inherited from [Joint](joint.md).[m_userData](joint.md#m_userdata)*

*Defined in [joint/index.d.ts:31](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L31)*

## Methods

###  enableMotor

▸ **enableMotor**(`flag`: boolean): *void*

*Defined in [joint/index.d.ts:553](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L553)*

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

*Defined in [joint/index.d.ts:551](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L551)*

**Returns:** *number*

___

###  getJointTranslation

▸ **getJointTranslation**(): *number*

*Defined in [joint/index.d.ts:550](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L550)*

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:547](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L547)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:548](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L548)*

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAxisA

▸ **getLocalAxisA**(): *[Vec2](vec2.md)*

*Defined in [joint/index.d.ts:549](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L549)*

**Returns:** *[Vec2](vec2.md)*

___

###  getMaxMotorTorque

▸ **getMaxMotorTorque**(): *number*

*Defined in [joint/index.d.ts:557](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L557)*

**Returns:** *number*

___

###  getMotorSpeed

▸ **getMotorSpeed**(): *number*

*Defined in [joint/index.d.ts:555](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L555)*

**Returns:** *number*

___

###  getMotorTorque

▸ **getMotorTorque**(`inv_dt`: number): *number*

*Defined in [joint/index.d.ts:558](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L558)*

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

###  getSpringDampingRatio

▸ **getSpringDampingRatio**(): *number*

*Defined in [joint/index.d.ts:562](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L562)*

**Returns:** *number*

___

###  getSpringFrequencyHz

▸ **getSpringFrequencyHz**(): *number*

*Defined in [joint/index.d.ts:560](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L560)*

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

###  isMotorEnabled

▸ **isMotorEnabled**(): *boolean*

*Defined in [joint/index.d.ts:552](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L552)*

**Returns:** *boolean*

___

###  setMaxMotorTorque

▸ **setMaxMotorTorque**(`torque`: number): *void*

*Defined in [joint/index.d.ts:556](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L556)*

**Parameters:**

Name | Type |
------ | ------ |
`torque` | number |

**Returns:** *void*

___

###  setMotorSpeed

▸ **setMotorSpeed**(`speed`: number): *void*

*Defined in [joint/index.d.ts:554](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L554)*

**Parameters:**

Name | Type |
------ | ------ |
`speed` | number |

**Returns:** *void*

___

###  setSpringDampingRatio

▸ **setSpringDampingRatio**(`ratio`: number): *void*

*Defined in [joint/index.d.ts:561](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L561)*

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setSpringFrequencyHz

▸ **setSpringFrequencyHz**(`hz`: number): *void*

*Defined in [joint/index.d.ts:559](https://github.com/shakiba/planck.js/blob/49dcd19/lib/joint/index.d.ts#L559)*

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
