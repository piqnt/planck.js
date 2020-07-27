[API Doc](../README.md) › [Contact](contact.md)

# Interface: Contact

## Hierarchy

* **Contact**

## Index

### Properties

* [m_bulletHitFlag](contact.md#m_bullethitflag)
* [m_enabledFlag](contact.md#m_enabledflag)
* [m_evaluateFcn](contact.md#m_evaluatefcn)
* [m_filterFlag](contact.md#m_filterflag)
* [m_fixtureA](contact.md#m_fixturea)
* [m_fixtureB](contact.md#m_fixtureb)
* [m_friction](contact.md#m_friction)
* [m_indexA](contact.md#m_indexa)
* [m_indexB](contact.md#m_indexb)
* [m_islandFlag](contact.md#m_islandflag)
* [m_manifold](contact.md#m_manifold)
* [m_next](contact.md#m_next)
* [m_nodeA](contact.md#m_nodea)
* [m_nodeB](contact.md#m_nodeb)
* [m_prev](contact.md#m_prev)
* [m_restitution](contact.md#m_restitution)
* [m_tangentSpeed](contact.md#m_tangentspeed)
* [m_toi](contact.md#m_toi)
* [m_toiCount](contact.md#m_toicount)
* [m_toiFlag](contact.md#m_toiflag)
* [m_touchingFlag](contact.md#m_touchingflag)
* [p_invIA](contact.md#p_invia)
* [p_invIB](contact.md#p_invib)
* [p_invMassA](contact.md#p_invmassa)
* [p_invMassB](contact.md#p_invmassb)
* [p_localCenterA](contact.md#p_localcentera)
* [p_localCenterB](contact.md#p_localcenterb)
* [p_localNormal](contact.md#p_localnormal)
* [p_localPoint](contact.md#p_localpoint)
* [p_localPoints](contact.md#p_localpoints)
* [p_pointCount](contact.md#p_pointcount)
* [p_radiusA](contact.md#p_radiusa)
* [p_radiusB](contact.md#p_radiusb)
* [p_type](contact.md#p_type)
* [v_K](contact.md#v_k)
* [v_friction](contact.md#v_friction)
* [v_invIA](contact.md#v_invia)
* [v_invIB](contact.md#v_invib)
* [v_invMassA](contact.md#v_invmassa)
* [v_invMassB](contact.md#v_invmassb)
* [v_normal](contact.md#v_normal)
* [v_normalMass](contact.md#v_normalmass)
* [v_pointCount](contact.md#v_pointcount)
* [v_points](contact.md#v_points)
* [v_restitution](contact.md#v_restitution)
* [v_tangentSpeed](contact.md#v_tangentspeed)

### Methods

* [_solvePositionConstraint](contact.md#_solvepositionconstraint)
* [evaluate](contact.md#evaluate)
* [flagForFiltering](contact.md#flagforfiltering)
* [getChildIndexA](contact.md#getchildindexa)
* [getChildIndexB](contact.md#getchildindexb)
* [getFixtureA](contact.md#getfixturea)
* [getFixtureB](contact.md#getfixtureb)
* [getFriction](contact.md#getfriction)
* [getManifold](contact.md#getmanifold)
* [getNext](contact.md#getnext)
* [getRestitution](contact.md#getrestitution)
* [getTangentSpeed](contact.md#gettangentspeed)
* [getWorldManifold](contact.md#getworldmanifold)
* [initConstraint](contact.md#initconstraint)
* [initVelocityConstraint](contact.md#initvelocityconstraint)
* [isEnabled](contact.md#isenabled)
* [isTouching](contact.md#istouching)
* [resetFriction](contact.md#resetfriction)
* [resetRestitution](contact.md#resetrestitution)
* [setEnabled](contact.md#setenabled)
* [setFriction](contact.md#setfriction)
* [setRestitution](contact.md#setrestitution)
* [setTangentSpeed](contact.md#settangentspeed)
* [solvePositionConstraint](contact.md#solvepositionconstraint)
* [solvePositionConstraintTOI](contact.md#solvepositionconstrainttoi)
* [solveVelocityConstraint](contact.md#solvevelocityconstraint)
* [storeConstraintImpulses](contact.md#storeconstraintimpulses)
* [update](contact.md#update)
* [warmStartConstraint](contact.md#warmstartconstraint)

## Properties

###  m_bulletHitFlag

• **m_bulletHitFlag**: *boolean*

*Defined in [index.d.ts:331](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L331)*

___

###  m_enabledFlag

• **m_enabledFlag**: *boolean*

*Defined in [index.d.ts:327](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L327)*

___

###  m_evaluateFcn

• **m_evaluateFcn**: *function*

*Defined in [index.d.ts:317](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L317)*

#### Type declaration:

▸ (`manifold`: [Manifold](manifold.md), `xfA`: [Transform](transform.md), `fixtureA`: [Fixture](fixture.md), `indexA`: number, `xfB`: [Transform](transform.md), `fixtureB`: [Fixture](fixture.md), `indexB`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`manifold` | [Manifold](manifold.md) |
`xfA` | [Transform](transform.md) |
`fixtureA` | [Fixture](fixture.md) |
`indexA` | number |
`xfB` | [Transform](transform.md) |
`fixtureB` | [Fixture](fixture.md) |
`indexB` | number |

___

###  m_filterFlag

• **m_filterFlag**: *boolean*

*Defined in [index.d.ts:330](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L330)*

___

###  m_fixtureA

• **m_fixtureA**: *[Fixture](fixture.md)*

*Defined in [index.d.ts:313](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L313)*

___

###  m_fixtureB

• **m_fixtureB**: *[Fixture](fixture.md)*

*Defined in [index.d.ts:314](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L314)*

___

###  m_friction

• **m_friction**: *number*

*Defined in [index.d.ts:324](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L324)*

___

###  m_indexA

• **m_indexA**: *number*

*Defined in [index.d.ts:315](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L315)*

___

###  m_indexB

• **m_indexB**: *number*

*Defined in [index.d.ts:316](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L316)*

___

###  m_islandFlag

• **m_islandFlag**: *boolean*

*Defined in [index.d.ts:328](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L328)*

___

###  m_manifold

• **m_manifold**: *[Manifold](manifold.md)*

*Defined in [index.d.ts:318](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L318)*

___

###  m_next

• **m_next**: *[Contact](contact.md) | null*

*Defined in [index.d.ts:320](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L320)*

___

###  m_nodeA

• **m_nodeA**: *[ContactEdge](contactedge.md)*

*Defined in [index.d.ts:311](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L311)*

___

###  m_nodeB

• **m_nodeB**: *[ContactEdge](contactedge.md)*

*Defined in [index.d.ts:312](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L312)*

___

###  m_prev

• **m_prev**: *[Contact](contact.md) | null*

*Defined in [index.d.ts:319](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L319)*

___

###  m_restitution

• **m_restitution**: *number*

*Defined in [index.d.ts:325](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L325)*

___

###  m_tangentSpeed

• **m_tangentSpeed**: *number*

*Defined in [index.d.ts:326](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L326)*

___

###  m_toi

• **m_toi**: *number*

*Defined in [index.d.ts:321](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L321)*

___

###  m_toiCount

• **m_toiCount**: *number*

*Defined in [index.d.ts:322](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L322)*

___

###  m_toiFlag

• **m_toiFlag**: *boolean*

*Defined in [index.d.ts:323](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L323)*

___

###  m_touchingFlag

• **m_touchingFlag**: *boolean*

*Defined in [index.d.ts:329](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L329)*

___

###  p_invIA

• **p_invIA**: *number | undefined*

*Defined in [index.d.ts:355](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L355)*

___

###  p_invIB

• **p_invIB**: *number | undefined*

*Defined in [index.d.ts:356](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L356)*

___

###  p_invMassA

• **p_invMassA**: *number | undefined*

*Defined in [index.d.ts:353](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L353)*

___

###  p_invMassB

• **p_invMassB**: *number | undefined*

*Defined in [index.d.ts:354](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L354)*

___

###  p_localCenterA

• **p_localCenterA**: *[Vec2](vec2.md)*

*Defined in [index.d.ts:347](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L347)*

___

###  p_localCenterB

• **p_localCenterB**: *[Vec2](vec2.md)*

*Defined in [index.d.ts:348](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L348)*

___

###  p_localNormal

• **p_localNormal**: *[Vec2](vec2.md)*

*Defined in [index.d.ts:345](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L345)*

___

###  p_localPoint

• **p_localPoint**: *[Vec2](vec2.md)*

*Defined in [index.d.ts:346](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L346)*

___

###  p_localPoints

• **p_localPoints**: *[Vec2](vec2.md)[]*

*Defined in [index.d.ts:344](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L344)*

___

###  p_pointCount

• **p_pointCount**: *number | undefined*

*Defined in [index.d.ts:352](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L352)*

___

###  p_radiusA

• **p_radiusA**: *number | undefined*

*Defined in [index.d.ts:350](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L350)*

___

###  p_radiusB

• **p_radiusB**: *number | undefined*

*Defined in [index.d.ts:351](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L351)*

___

###  p_type

• **p_type**: *[ManifoldType](../enums/manifoldtype.md) | undefined*

*Defined in [index.d.ts:349](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L349)*

___

###  v_K

• **v_K**: *[Mat22](mat22.md)*

*Defined in [index.d.ts:335](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L335)*

___

###  v_friction

• **v_friction**: *number | undefined*

*Defined in [index.d.ts:338](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L338)*

___

###  v_invIA

• **v_invIA**: *number | undefined*

*Defined in [index.d.ts:342](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L342)*

___

###  v_invIB

• **v_invIB**: *number | undefined*

*Defined in [index.d.ts:343](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L343)*

___

###  v_invMassA

• **v_invMassA**: *number | undefined*

*Defined in [index.d.ts:340](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L340)*

___

###  v_invMassB

• **v_invMassB**: *number | undefined*

*Defined in [index.d.ts:341](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L341)*

___

###  v_normal

• **v_normal**: *[Vec2](vec2.md)*

*Defined in [index.d.ts:333](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L333)*

___

###  v_normalMass

• **v_normalMass**: *[Mat22](mat22.md)*

*Defined in [index.d.ts:334](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L334)*

___

###  v_pointCount

• **v_pointCount**: *number*

*Defined in [index.d.ts:336](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L336)*

___

###  v_points

• **v_points**: *[VelocityConstraintPoint](velocityconstraintpoint.md)[]*

*Defined in [index.d.ts:332](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L332)*

___

###  v_restitution

• **v_restitution**: *number | undefined*

*Defined in [index.d.ts:339](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L339)*

___

###  v_tangentSpeed

• **v_tangentSpeed**: *number | undefined*

*Defined in [index.d.ts:337](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L337)*

## Methods

###  _solvePositionConstraint

▸ **_solvePositionConstraint**(`step`: any, `toi`: boolean, `toiA?`: [Body](body.md) | null, `toiB?`: [Body](body.md) | null): *number*

*Defined in [index.d.ts:382](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L382)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |
`toi` | boolean |
`toiA?` | [Body](body.md) &#124; null |
`toiB?` | [Body](body.md) &#124; null |

**Returns:** *number*

___

###  evaluate

▸ **evaluate**(`manifold`: [Manifold](manifold.md), `xfA`: [Transform](transform.md), `xfB`: [Transform](transform.md)): *void*

*Defined in [index.d.ts:378](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L378)*

**Parameters:**

Name | Type |
------ | ------ |
`manifold` | [Manifold](manifold.md) |
`xfA` | [Transform](transform.md) |
`xfB` | [Transform](transform.md) |

**Returns:** *void*

___

###  flagForFiltering

▸ **flagForFiltering**(): *void*

*Defined in [index.d.ts:369](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L369)*

**Returns:** *void*

___

###  getChildIndexA

▸ **getChildIndexA**(): *number*

*Defined in [index.d.ts:367](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L367)*

**Returns:** *number*

___

###  getChildIndexB

▸ **getChildIndexB**(): *number*

*Defined in [index.d.ts:368](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L368)*

**Returns:** *number*

___

###  getFixtureA

▸ **getFixtureA**(): *[Fixture](fixture.md)*

*Defined in [index.d.ts:365](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L365)*

**Returns:** *[Fixture](fixture.md)*

___

###  getFixtureB

▸ **getFixtureB**(): *[Fixture](fixture.md)*

*Defined in [index.d.ts:366](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L366)*

**Returns:** *[Fixture](fixture.md)*

___

###  getFriction

▸ **getFriction**(): *number*

*Defined in [index.d.ts:371](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L371)*

**Returns:** *number*

___

###  getManifold

▸ **getManifold**(): *[Manifold](manifold.md)*

*Defined in [index.d.ts:359](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L359)*

**Returns:** *[Manifold](manifold.md)*

___

###  getNext

▸ **getNext**(): *[Contact](contact.md) | null*

*Defined in [index.d.ts:364](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L364)*

**Returns:** *[Contact](contact.md) | null*

___

###  getRestitution

▸ **getRestitution**(): *number*

*Defined in [index.d.ts:374](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L374)*

**Returns:** *number*

___

###  getTangentSpeed

▸ **getTangentSpeed**(): *number*

*Defined in [index.d.ts:377](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L377)*

**Returns:** *number*

___

###  getWorldManifold

▸ **getWorldManifold**(`worldManifold`: [WorldManifold](worldmanifold.md) | null | undefined): *[WorldManifold](worldmanifold.md) | undefined*

*Defined in [index.d.ts:360](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L360)*

**Parameters:**

Name | Type |
------ | ------ |
`worldManifold` | [WorldManifold](worldmanifold.md) &#124; null &#124; undefined |

**Returns:** *[WorldManifold](worldmanifold.md) | undefined*

___

###  initConstraint

▸ **initConstraint**(`step`: object): *void*

*Defined in [index.d.ts:358](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L358)*

**Parameters:**

▪ **step**: *object*

Name | Type |
------ | ------ |
`dtRatio` | number |
`warmStarting` | boolean |

**Returns:** *void*

___

###  initVelocityConstraint

▸ **initVelocityConstraint**(`step`: object): *void*

*Defined in [index.d.ts:383](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L383)*

**Parameters:**

▪ **step**: *object*

Name | Type |
------ | ------ |
`blockSolve` | boolean |

**Returns:** *void*

___

###  isEnabled

▸ **isEnabled**(): *boolean*

*Defined in [index.d.ts:362](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L362)*

**Returns:** *boolean*

___

###  isTouching

▸ **isTouching**(): *boolean*

*Defined in [index.d.ts:363](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L363)*

**Returns:** *boolean*

___

###  resetFriction

▸ **resetFriction**(): *void*

*Defined in [index.d.ts:372](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L372)*

**Returns:** *void*

___

###  resetRestitution

▸ **resetRestitution**(): *void*

*Defined in [index.d.ts:375](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L375)*

**Returns:** *void*

___

###  setEnabled

▸ **setEnabled**(`flag`: boolean): *void*

*Defined in [index.d.ts:361](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L361)*

**Parameters:**

Name | Type |
------ | ------ |
`flag` | boolean |

**Returns:** *void*

___

###  setFriction

▸ **setFriction**(`friction`: number): *void*

*Defined in [index.d.ts:370](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L370)*

**Parameters:**

Name | Type |
------ | ------ |
`friction` | number |

**Returns:** *void*

___

###  setRestitution

▸ **setRestitution**(`restitution`: number): *void*

*Defined in [index.d.ts:373](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L373)*

**Parameters:**

Name | Type |
------ | ------ |
`restitution` | number |

**Returns:** *void*

___

###  setTangentSpeed

▸ **setTangentSpeed**(`speed`: number): *void*

*Defined in [index.d.ts:376](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L376)*

**Parameters:**

Name | Type |
------ | ------ |
`speed` | number |

**Returns:** *void*

___

###  solvePositionConstraint

▸ **solvePositionConstraint**(`step`: any): *number*

*Defined in [index.d.ts:380](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L380)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *number*

___

###  solvePositionConstraintTOI

▸ **solvePositionConstraintTOI**(`step`: any, `toiA?`: [Body](body.md) | null, `toiB?`: [Body](body.md) | null): *number*

*Defined in [index.d.ts:381](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L381)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |
`toiA?` | [Body](body.md) &#124; null |
`toiB?` | [Body](body.md) &#124; null |

**Returns:** *number*

___

###  solveVelocityConstraint

▸ **solveVelocityConstraint**(`step`: object): *void*

*Defined in [index.d.ts:386](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L386)*

**Parameters:**

▪ **step**: *object*

Name | Type |
------ | ------ |
`blockSolve` | boolean |

**Returns:** *void*

___

###  storeConstraintImpulses

▸ **storeConstraintImpulses**(`step?`: any): *void*

*Defined in [index.d.ts:385](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L385)*

**Parameters:**

Name | Type |
------ | ------ |
`step?` | any |

**Returns:** *void*

___

###  update

▸ **update**(`listener?`: object): *void*

*Defined in [index.d.ts:379](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L379)*

**Parameters:**

▪`Optional`  **listener**: *object*

Name | Type |
------ | ------ |
`beginContact` |  |
`endContact` |  |
`oreSolve` |  |

**Returns:** *void*

___

###  warmStartConstraint

▸ **warmStartConstraint**(`step?`: any): *void*

*Defined in [index.d.ts:384](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L384)*

**Parameters:**

Name | Type |
------ | ------ |
`step?` | any |

**Returns:** *void*
