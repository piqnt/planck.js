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

This is used to fatten AABBs in the dynamic tree. This allows proxies to move
by a small amount without triggering a tree adjustment. This is in meters.

___

### `Static` aabbMultiplier

▪ **aabbMultiplier**: *number* = 2

This is used to fatten AABBs in the dynamic tree. This is used to predict the
future position based on the current displacement. This is a dimensionless
multiplier.

___

### `Static` angularSleepTolerance

▪ **angularSleepTolerance**: *number* = (2.0 / 180.0 * math_PI)

A body cannot sleep if its angular velocity is above this tolerance.

___

### `Static` angularSlop

▪ **angularSlop**: *number* = (2.0 / 180.0 * math_PI)

A small angle used as a collision and constraint tolerance. Usually it is
chosen to be numerically significant, but visually insignificant.

___

### `Static` baumgarte

▪ **baumgarte**: *number* = 0.2

This scale factor controls how fast overlap is resolved. Ideally this would
be 1 so that overlap is removed in one time step. However using values close
to 1 often lead to overshoot.

___

### `Static` lengthUnitsPerMeter

▪ **lengthUnitsPerMeter**: *number* = 1

You can use this to change the length scale used by your game.

For example for inches you could use 39.4.

___

### `Static` linearSleepTolerance

▪ **linearSleepTolerance**: *number* = 0.01

A body cannot sleep if its linear velocity is above this tolerance.

___

### `Static` linearSlop

▪ **linearSlop**: *number* = 0.005

A small length used as a collision and constraint tolerance. Usually it is
chosen to be numerically significant, but visually insignificant.

___

### `Static` maxAngularCorrection

▪ **maxAngularCorrection**: *number* = (8.0 / 180.0 * math_PI)

The maximum angular position correction used when solving constraints. This
helps to prevent overshoot.

___

### `Static` maxDistanceIterations

▪ **maxDistanceIterations**: *number* = 20

Maximum iterations to find Distance.

___

### `Static` maxLinearCorrection

▪ **maxLinearCorrection**: *number* = 0.2

The maximum linear position correction used when solving constraints. This
helps to prevent overshoot.

___

### `Static` maxManifoldPoints

▪ **maxManifoldPoints**: *number* = 2

The maximum number of contact points between two convex shapes. Do not change
this value.

___

### `Static` maxPolygonVertices

▪ **maxPolygonVertices**: *number* = 12

The maximum number of vertices on a convex polygon. You cannot increase this
too much because BlockAllocator has a maximum object size.

___

### `Static` maxRotation

▪ **maxRotation**: *number* = (0.5 * math_PI)

The maximum angular velocity of a body. This limit is very large and is used
to prevent numerical problems. You shouldn't need to adjust Settings.

___

### `Static` maxSubSteps

▪ **maxSubSteps**: *number* = 8

Maximum number of sub-steps per contact in continuous physics simulation.

___

### `Static` maxTOIContacts

▪ **maxTOIContacts**: *number* = 32

Maximum number of contacts to be handled to solve a TOI impact.

___

### `Static` maxTOIIterations

▪ **maxTOIIterations**: *number* = 20

Maximum iterations to solve a TOI.

___

### `Static` maxTranslation

▪ **maxTranslation**: *number* = 2

The maximum linear velocity of a body. This limit is very large and is used
to prevent numerical problems. You shouldn't need to adjust Settings.

___

### `Static` timeToSleep

▪ **timeToSleep**: *number* = 0.5

The time that a body must be still before it will go to sleep.

___

### `Static` toiBaugarte

▪ **toiBaugarte**: *number* = 0.75

___

### `Static` velocityThreshold

▪ **velocityThreshold**: *number* = 1

A velocity threshold for elastic collisions. Any collision with a relative
linear velocity below this threshold will be treated as inelastic.

## Accessors

### `Static` polygonRadius

• **get polygonRadius**(): *number*

The radius of the polygon/edge shape skin. This should not be modified.
Making this smaller means polygons will have an insufficient buffer for
continuous collision. Making it larger may create artifacts for vertex
collision.

**Returns:** *number*
