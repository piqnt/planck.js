[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [GearJointDef](gearjointdef.md)

# Interface: GearJointDef

## Hierarchy

  ↳ [JointDef](jointdef.md)

  ↳ [GearJointOpt](gearjointopt.md)

  ↳ **GearJointDef**

## Index

### Properties

* [bodyA](gearjointdef.md#bodya)
* [bodyB](gearjointdef.md#bodyb)
* [collideConnected](gearjointdef.md#optional-collideconnected)
* [joint1](gearjointdef.md#joint1)
* [joint2](gearjointdef.md#joint2)
* [ratio](gearjointdef.md#ratio)
* [userData](gearjointdef.md#optional-userdata)

## Properties

###  bodyA

• **bodyA**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyA](jointdef.md#bodya)*

*Defined in [joint/index.d.ts:56](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L56)*

___

###  bodyB

• **bodyB**: *[Body](../classes/body.md)*

*Inherited from [JointDef](jointdef.md).[bodyB](jointdef.md#bodyb)*

*Defined in [joint/index.d.ts:57](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L57)*

___

### `Optional` collideConnected

• **collideConnected**? : *boolean*

*Inherited from [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Overrides [JointOpt](jointopt.md).[collideConnected](jointopt.md#optional-collideconnected)*

*Defined in [joint/index.d.ts:52](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L52)*

___

###  joint1

• **joint1**: *[RevoluteJoint](../classes/revolutejoint.md) | [PrismaticJoint](../classes/prismaticjoint.md)*

*Defined in [joint/index.d.ts:202](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L202)*

___

###  joint2

• **joint2**: *[RevoluteJoint](../classes/revolutejoint.md) | [PrismaticJoint](../classes/prismaticjoint.md)*

*Defined in [joint/index.d.ts:203](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L203)*

___

###  ratio

• **ratio**: *number*

*Inherited from [GearJointOpt](gearjointopt.md).[ratio](gearjointopt.md#ratio)*

*Defined in [joint/index.d.ts:198](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L198)*

___

### `Optional` userData

• **userData**? : *any*

*Inherited from [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Overrides [JointOpt](jointopt.md).[userData](jointopt.md#optional-userdata)*

*Defined in [joint/index.d.ts:51](https://github.com/shakiba/planck.js/blob/038d425/lib/joint/index.d.ts#L51)*
