[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Settings](settings.md)

# Class: Settings

Tuning constants based on meters-kilograms-seconds (MKS) units.

## Hierarchy

* **Settings**

## Index

### Properties

* [aabbExtension](settings.md#static-aabbextension)
* [aabbMultiplier](settings.md#static-aabbmultiplier)
* [angularSleepTolerance](settings.md#static-angularsleeptolerance)
* [angularSlop](settings.md#static-angularslop)
* [baumgarte](settings.md#static-baumgarte)
* [linearSleepTolerance](settings.md#static-linearsleeptolerance)
* [linearSlop](settings.md#static-linearslop)
* [maxAngularCorrection](settings.md#static-maxangularcorrection)
* [maxDistnceIterations](settings.md#static-maxdistnceiterations)
* [maxLinearCorrection](settings.md#static-maxlinearcorrection)
* [maxManifoldPoints](settings.md#static-maxmanifoldpoints)
* [maxPolygonVertices](settings.md#static-maxpolygonvertices)
* [maxRotation](settings.md#static-maxrotation)
* [maxSubSteps](settings.md#static-maxsubsteps)
* [maxTOIContacts](settings.md#static-maxtoicontacts)
* [maxTOIIterations](settings.md#static-maxtoiiterations)
* [maxTranslation](settings.md#static-maxtranslation)
* [timeToSleep](settings.md#static-timetosleep)
* [toiBaugarte](settings.md#static-toibaugarte)
* [velocityThreshold](settings.md#static-velocitythreshold)

### Accessors

* [angularSleepToleranceSqr](settings.md#static-angularsleeptolerancesqr)
* [linearSleepToleranceSqr](settings.md#static-linearsleeptolerancesqr)
* [linearSlopSquared](settings.md#static-linearslopsquared)
* [maxRotationSquared](settings.md#static-maxrotationsquared)
* [maxTranslationSquared](settings.md#static-maxtranslationsquared)
* [polygonRadius](settings.md#static-polygonradius)

## Properties

### `Static` aabbExtension

▪ **aabbExtension**: *number* = 0.1

*Defined in [src/Settings.ts:49](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L49)*

This is used to fatten AABBs in the dynamic tree. This allows proxies to move
by a small amount without triggering a tree adjustment. This is in meters.

___

### `Static` aabbMultiplier

▪ **aabbMultiplier**: *number* = 2

*Defined in [src/Settings.ts:56](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L56)*

This is used to fatten AABBs in the dynamic tree. This is used to predict the
future position based on the current displacement. This is a dimensionless
multiplier.

___

### `Static` angularSleepTolerance

▪ **angularSleepTolerance**: *number* = (2.0 / 180.0 * Math.PI)

*Defined in [src/Settings.ts:157](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L157)*

A body cannot sleep if its angular velocity is above this tolerance.

___

### `Static` angularSlop

▪ **angularSlop**: *number* = (2.0 / 180.0 * Math.PI)

*Defined in [src/Settings.ts:69](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L69)*

A small angle used as a collision and constraint tolerance. Usually it is
chosen to be numerically significant, but visually insignificant.

___

### `Static` baumgarte

▪ **baumgarte**: *number* = 0.2

*Defined in [src/Settings.ts:138](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L138)*

This scale factor controls how fast overlap is resolved. Ideally this would
be 1 so that overlap is removed in one time step. However using values close
to 1 often lead to overshoot.

___

### `Static` linearSleepTolerance

▪ **linearSleepTolerance**: *number* = 0.01

*Defined in [src/Settings.ts:151](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L151)*

A body cannot sleep if its linear velocity is above this tolerance.

___

### `Static` linearSlop

▪ **linearSlop**: *number* = 0.005

*Defined in [src/Settings.ts:62](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L62)*

A small length used as a collision and constraint tolerance. Usually it is
chosen to be numerically significant, but visually insignificant.

___

### `Static` maxAngularCorrection

▪ **maxAngularCorrection**: *number* = (8.0 / 180.0 * Math.PI)

*Defined in [src/Settings.ts:117](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L117)*

The maximum angular position correction used when solving constraints. This
helps to prevent overshoot.

___

### `Static` maxDistnceIterations

▪ **maxDistnceIterations**: *number* = 20

*Defined in [src/Settings.ts:99](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L99)*

Maximum iterations to find Distance.

___

### `Static` maxLinearCorrection

▪ **maxLinearCorrection**: *number* = 0.2

*Defined in [src/Settings.ts:111](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L111)*

The maximum linear position correction used when solving constraints. This
helps to prevent overshoot.

___

### `Static` maxManifoldPoints

▪ **maxManifoldPoints**: *number* = 2

*Defined in [src/Settings.ts:37](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L37)*

The maximum number of contact points between two convex shapes. Do not change
this value.

___

### `Static` maxPolygonVertices

▪ **maxPolygonVertices**: *number* = 12

*Defined in [src/Settings.ts:43](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L43)*

The maximum number of vertices on a convex polygon. You cannot increase this
too much because BlockAllocator has a maximum object size.

___

### `Static` maxRotation

▪ **maxRotation**: *number* = (0.5 * Math.PI)

*Defined in [src/Settings.ts:130](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L130)*

The maximum angular velocity of a body. This limit is very large and is used
to prevent numerical problems. You shouldn't need to adjust Settings.

___

### `Static` maxSubSteps

▪ **maxSubSteps**: *number* = 8

*Defined in [src/Settings.ts:82](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L82)*

Maximum number of sub-steps per contact in continuous physics simulation.

___

### `Static` maxTOIContacts

▪ **maxTOIContacts**: *number* = 32

*Defined in [src/Settings.ts:89](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L89)*

Maximum number of contacts to be handled to solve a TOI impact.

___

### `Static` maxTOIIterations

▪ **maxTOIIterations**: *number* = 20

*Defined in [src/Settings.ts:94](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L94)*

Maximum iterations to solve a TOI.

___

### `Static` maxTranslation

▪ **maxTranslation**: *number* = 2

*Defined in [src/Settings.ts:123](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L123)*

The maximum linear velocity of a body. This limit is very large and is used
to prevent numerical problems. You shouldn't need to adjust Settings.

___

### `Static` timeToSleep

▪ **timeToSleep**: *number* = 0.5

*Defined in [src/Settings.ts:146](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L146)*

The time that a body must be still before it will go to sleep.

___

### `Static` toiBaugarte

▪ **toiBaugarte**: *number* = 0.75

*Defined in [src/Settings.ts:139](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L139)*

___

### `Static` velocityThreshold

▪ **velocityThreshold**: *number* = 1

*Defined in [src/Settings.ts:105](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L105)*

A velocity threshold for elastic collisions. Any collision with a relative
linear velocity below this threshold will be treated as inelastic.

## Accessors

### `Static` angularSleepToleranceSqr

• **get angularSleepToleranceSqr**(): *number*

*Defined in [src/Settings.ts:158](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L158)*

**Returns:** *number*

___

### `Static` linearSleepToleranceSqr

• **get linearSleepToleranceSqr**(): *number*

*Defined in [src/Settings.ts:152](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L152)*

**Returns:** *number*

___

### `Static` linearSlopSquared

• **get linearSlopSquared**(): *number*

*Defined in [src/Settings.ts:63](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L63)*

**Returns:** *number*

___

### `Static` maxRotationSquared

• **get maxRotationSquared**(): *number*

*Defined in [src/Settings.ts:131](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L131)*

**Returns:** *number*

___

### `Static` maxTranslationSquared

• **get maxTranslationSquared**(): *number*

*Defined in [src/Settings.ts:124](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L124)*

**Returns:** *number*

___

### `Static` polygonRadius

• **get polygonRadius**(): *number*

*Defined in [src/Settings.ts:77](https://github.com/shakiba/planck.js/blob/acc3bd8/src/Settings.ts#L77)*

The radius of the polygon/edge shape skin. This should not be modified.
Making this smaller means polygons will have an insufficient buffer for
continuous collision. Making it larger may create artifacts for vertex
collision.

**Returns:** *number*
