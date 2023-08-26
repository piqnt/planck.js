[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Settings](settings.md)

# Class: Settings

Tuning constants based on meters-kilograms-seconds (MKS) units.

Some tolerances are absolute and some are relative. Absolute tolerances use MKS units.

## Hierarchy

* **Settings**

## Index

### Properties

* [aabbExtension](settings.md#static-aabbextension)
* [aabbMultiplier](settings.md#static-aabbmultiplier)
* [angularSleepTolerance](settings.md#static-angularsleeptolerance)
* [angularSlop](settings.md#static-angularslop)
* [baumgarte](settings.md#static-baumgarte)
* [lengthUnitsPerMeter](settings.md#static-lengthunitspermeter)
* [linearSleepTolerance](settings.md#static-linearsleeptolerance)
* [linearSlop](settings.md#static-linearslop)
* [maxAngularCorrection](settings.md#static-maxangularcorrection)
* [maxDistanceIterations](settings.md#static-maxdistanceiterations)
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

* [polygonRadius](settings.md#static-polygonradius)

## Properties

### `Static` aabbExtension

▪ **aabbExtension**: *number* = 0.1

*Defined in [src/Settings.ts:58](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L58)*

This is used to fatten AABBs in the dynamic tree. This allows proxies to move
by a small amount without triggering a tree adjustment. This is in meters.

___

### `Static` aabbMultiplier

▪ **aabbMultiplier**: *number* = 2

*Defined in [src/Settings.ts:65](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L65)*

This is used to fatten AABBs in the dynamic tree. This is used to predict the
future position based on the current displacement. This is a dimensionless
multiplier.

___

### `Static` angularSleepTolerance

▪ **angularSleepTolerance**: *number* = (2.0 / 180.0 * math_PI)

*Defined in [src/Settings.ts:162](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L162)*

A body cannot sleep if its angular velocity is above this tolerance.

___

### `Static` angularSlop

▪ **angularSlop**: *number* = (2.0 / 180.0 * math_PI)

*Defined in [src/Settings.ts:77](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L77)*

A small angle used as a collision and constraint tolerance. Usually it is
chosen to be numerically significant, but visually insignificant.

___

### `Static` baumgarte

▪ **baumgarte**: *number* = 0.2

*Defined in [src/Settings.ts:144](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L144)*

This scale factor controls how fast overlap is resolved. Ideally this would
be 1 so that overlap is removed in one time step. However using values close
to 1 often lead to overshoot.

___

### `Static` lengthUnitsPerMeter

▪ **lengthUnitsPerMeter**: *number* = 1

*Defined in [src/Settings.ts:39](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L39)*

You can use this to change the length scale used by your game.

For example for inches you could use 39.4.

___

### `Static` linearSleepTolerance

▪ **linearSleepTolerance**: *number* = 0.01

*Defined in [src/Settings.ts:157](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L157)*

A body cannot sleep if its linear velocity is above this tolerance.

___

### `Static` linearSlop

▪ **linearSlop**: *number* = 0.005

*Defined in [src/Settings.ts:71](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L71)*

A small length used as a collision and constraint tolerance. Usually it is
chosen to be numerically significant, but visually insignificant.

___

### `Static` maxAngularCorrection

▪ **maxAngularCorrection**: *number* = (8.0 / 180.0 * math_PI)

*Defined in [src/Settings.ts:125](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L125)*

The maximum angular position correction used when solving constraints. This
helps to prevent overshoot.

___

### `Static` maxDistanceIterations

▪ **maxDistanceIterations**: *number* = 20

*Defined in [src/Settings.ts:107](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L107)*

Maximum iterations to find Distance.

___

### `Static` maxLinearCorrection

▪ **maxLinearCorrection**: *number* = 0.2

*Defined in [src/Settings.ts:119](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L119)*

The maximum linear position correction used when solving constraints. This
helps to prevent overshoot.

___

### `Static` maxManifoldPoints

▪ **maxManifoldPoints**: *number* = 2

*Defined in [src/Settings.ts:46](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L46)*

The maximum number of contact points between two convex shapes. Do not change
this value.

___

### `Static` maxPolygonVertices

▪ **maxPolygonVertices**: *number* = 12

*Defined in [src/Settings.ts:52](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L52)*

The maximum number of vertices on a convex polygon. You cannot increase this
too much because BlockAllocator has a maximum object size.

___

### `Static` maxRotation

▪ **maxRotation**: *number* = (0.5 * math_PI)

*Defined in [src/Settings.ts:137](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L137)*

The maximum angular velocity of a body. This limit is very large and is used
to prevent numerical problems. You shouldn't need to adjust Settings.

___

### `Static` maxSubSteps

▪ **maxSubSteps**: *number* = 8

*Defined in [src/Settings.ts:90](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L90)*

Maximum number of sub-steps per contact in continuous physics simulation.

___

### `Static` maxTOIContacts

▪ **maxTOIContacts**: *number* = 32

*Defined in [src/Settings.ts:97](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L97)*

Maximum number of contacts to be handled to solve a TOI impact.

___

### `Static` maxTOIIterations

▪ **maxTOIIterations**: *number* = 20

*Defined in [src/Settings.ts:102](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L102)*

Maximum iterations to solve a TOI.

___

### `Static` maxTranslation

▪ **maxTranslation**: *number* = 2

*Defined in [src/Settings.ts:131](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L131)*

The maximum linear velocity of a body. This limit is very large and is used
to prevent numerical problems. You shouldn't need to adjust Settings.

___

### `Static` timeToSleep

▪ **timeToSleep**: *number* = 0.5

*Defined in [src/Settings.ts:152](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L152)*

The time that a body must be still before it will go to sleep.

___

### `Static` toiBaugarte

▪ **toiBaugarte**: *number* = 0.75

*Defined in [src/Settings.ts:145](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L145)*

___

### `Static` velocityThreshold

▪ **velocityThreshold**: *number* = 1

*Defined in [src/Settings.ts:113](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L113)*

A velocity threshold for elastic collisions. Any collision with a relative
linear velocity below this threshold will be treated as inelastic.

## Accessors

### `Static` polygonRadius

• **get polygonRadius**(): *number*

*Defined in [src/Settings.ts:85](https://github.com/shakiba/planck.js/blob/6ab76c7/src/Settings.ts#L85)*

The radius of the polygon/edge shape skin. This should not be modified.
Making this smaller means polygons will have an insufficient buffer for
continuous collision. Making it larger may create artifacts for vertex
collision.

**Returns:** *number*
