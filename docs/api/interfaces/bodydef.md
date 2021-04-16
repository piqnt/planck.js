[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [BodyDef](bodydef.md)

# Interface: BodyDef

**`prop`** type Body types are static, kinematic, or dynamic. Note: if a dynamic
      body would have zero mass, the mass is set to one.

**`prop`** position The world position of the body. Avoid creating bodies at the
      origin since this can lead to many overlapping shapes.

**`prop`** angle The world angle of the body in radians.

**`prop`** linearVelocity The linear velocity of the body's origin in world
      co-ordinates.

**`prop`** angularVelocity

**`prop`** linearDamping Linear damping is use to reduce the linear velocity. The
      damping parameter can be larger than 1.0 but the damping effect becomes
      sensitive to the time step when the damping parameter is large.

**`prop`** angularDamping Angular damping is use to reduce the angular velocity.
      The damping parameter can be larger than 1.0 but the damping effect
      becomes sensitive to the time step when the damping parameter is large.

**`prop`** fixedRotation Should this body be prevented from rotating? Useful for
      characters.

**`prop`** bullet Is this a fast moving body that should be prevented from
      tunneling through other moving bodies? Note that all bodies are
      prevented from tunneling through kinematic and static bodies. This
      setting is only considered on dynamic bodies. Warning: You should use
      this flag sparingly since it increases processing time.

**`prop`** active Does this body start out active?

**`prop`** awake Is this body initially awake or sleeping?

**`prop`** allowSleep Set this flag to false if this body should never fall
      asleep. Note that this increases CPU usage.

**`prop`** type Body types are static, kinematic, or dynamic. Note: if a dynamic
      body would have zero mass, the mass is set to one.

**`prop`** position The world position of the body. Avoid creating bodies at the
      origin since this can lead to many overlapping shapes.

**`prop`** angle The world angle of the body in radians.

**`prop`** linearVelocity The linear velocity of the body's origin in world
      co-ordinates.

**`prop`** angularVelocity

**`prop`** linearDamping Linear damping is use to reduce the linear velocity. The
      damping parameter can be larger than 1.0 but the damping effect becomes
      sensitive to the time step when the damping parameter is large.

**`prop`** angularDamping Angular damping is use to reduce the angular velocity.
      The damping parameter can be larger than 1.0 but the damping effect
      becomes sensitive to the time step when the damping parameter is large.

**`prop`** fixedRotation Should this body be prevented from rotating? Useful for
      characters.

**`prop`** bullet Is this a fast moving body that should be prevented from
      tunneling through other moving bodies? Note that all bodies are
      prevented from tunneling through kinematic and static bodies. This
      setting is only considered on dynamic bodies. Warning: You should use
      this flag sparingly since it increases processing time.

**`prop`** active Does this body start out active?

**`prop`** awake Is this body initially awake or sleeping?

**`prop`** allowSleep Set this flag to false if this body should never fall
      asleep. Note that this increases CPU usage.

## Hierarchy

* **BodyDef**

## Index

### Properties

* [active](bodydef.md#optional-active)
* [allowSleep](bodydef.md#optional-allowsleep)
* [angle](bodydef.md#optional-angle)
* [angularDamping](bodydef.md#optional-angulardamping)
* [angularVelocity](bodydef.md#optional-angularvelocity)
* [awake](bodydef.md#optional-awake)
* [bullet](bodydef.md#optional-bullet)
* [fixedRotation](bodydef.md#optional-fixedrotation)
* [gravityScale](bodydef.md#optional-gravityscale)
* [linearDamping](bodydef.md#optional-lineardamping)
* [linearVelocity](bodydef.md#optional-linearvelocity)
* [position](bodydef.md#optional-position)
* [type](bodydef.md#optional-type)
* [userData](bodydef.md#optional-userdata)

## Properties

### `Optional` active

• **active**? : *boolean*

*Defined in [dist/planck.d.ts:1613](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1613)*

*Defined in [src/dynamics/Body.ts:101](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L101)*

___

### `Optional` allowSleep

• **allowSleep**? : *boolean*

*Defined in [dist/planck.d.ts:1611](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1611)*

*Defined in [src/dynamics/Body.ts:99](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L99)*

___

### `Optional` angle

• **angle**? : *number*

*Defined in [dist/planck.d.ts:1603](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1603)*

*Defined in [src/dynamics/Body.ts:91](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L91)*

___

### `Optional` angularDamping

• **angularDamping**? : *number*

*Defined in [dist/planck.d.ts:1607](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1607)*

*Defined in [src/dynamics/Body.ts:95](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L95)*

___

### `Optional` angularVelocity

• **angularVelocity**? : *number*

*Defined in [dist/planck.d.ts:1605](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1605)*

*Defined in [src/dynamics/Body.ts:93](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L93)*

___

### `Optional` awake

• **awake**? : *boolean*

*Defined in [dist/planck.d.ts:1612](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1612)*

*Defined in [src/dynamics/Body.ts:100](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L100)*

___

### `Optional` bullet

• **bullet**? : *boolean*

*Defined in [dist/planck.d.ts:1609](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1609)*

*Defined in [src/dynamics/Body.ts:97](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L97)*

___

### `Optional` fixedRotation

• **fixedRotation**? : *boolean*

*Defined in [dist/planck.d.ts:1608](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1608)*

*Defined in [src/dynamics/Body.ts:96](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L96)*

___

### `Optional` gravityScale

• **gravityScale**? : *number*

*Defined in [dist/planck.d.ts:1610](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1610)*

*Defined in [src/dynamics/Body.ts:98](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L98)*

___

### `Optional` linearDamping

• **linearDamping**? : *number*

*Defined in [dist/planck.d.ts:1606](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1606)*

*Defined in [src/dynamics/Body.ts:94](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L94)*

___

### `Optional` linearVelocity

• **linearVelocity**? : *Vec2*

*Defined in [dist/planck.d.ts:1604](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1604)*

*Defined in [src/dynamics/Body.ts:92](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L92)*

___

### `Optional` position

• **position**? : *Vec2*

*Defined in [dist/planck.d.ts:1602](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1602)*

*Defined in [src/dynamics/Body.ts:90](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L90)*

___

### `Optional` type

• **type**? : *[BodyType](../globals.md#bodytype)*

*Defined in [dist/planck.d.ts:1601](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1601)*

*Defined in [src/dynamics/Body.ts:89](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L89)*

___

### `Optional` userData

• **userData**? : *any*

*Defined in [dist/planck.d.ts:1614](https://github.com/shakiba/planck.js/blob/7e469c4/dist/planck.d.ts#L1614)*

*Defined in [src/dynamics/Body.ts:102](https://github.com/shakiba/planck.js/blob/7e469c4/src/dynamics/Body.ts#L102)*
