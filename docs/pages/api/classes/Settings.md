# Class: Settings

Tuning constants based on meters-kilograms-seconds (MKS) units.

Some tolerances are absolute and some are relative. Absolute tolerances use MKS units.

## Constructors

### new Settings()

> **new Settings**(): [`Settings`](/api/classes/Settings)

#### Returns

[`Settings`](/api/classes/Settings)

## Properties

### aabbExtension

> `static` **aabbExtension**: `number` = `0.1`

This is used to fatten AABBs in the dynamic tree. This allows proxies to move
by a small amount without triggering a tree adjustment. This is in meters.

***

### aabbMultiplier

> `static` **aabbMultiplier**: `number` = `2.0`

This is used to fatten AABBs in the dynamic tree. This is used to predict the
future position based on the current displacement. This is a dimensionless
multiplier.

***

### angularSleepTolerance

> `static` **angularSleepTolerance**: `number`

A body cannot sleep if its angular velocity is above this tolerance.

***

### angularSlop

> `static` **angularSlop**: `number`

A small angle used as a collision and constraint tolerance. Usually it is
chosen to be numerically significant, but visually insignificant.

***

### baumgarte

> `static` **baumgarte**: `number` = `0.2`

This scale factor controls how fast overlap is resolved. Ideally this would
be 1 so that overlap is removed in one time step. However using values close
to 1 often lead to overshoot.

***

### lengthUnitsPerMeter

> `static` **lengthUnitsPerMeter**: `number` = `1.0`

You can use this to change the length scale used by your game.

For example for inches you could use 39.4.

***

### linearSleepTolerance

> `static` **linearSleepTolerance**: `number` = `0.01`

A body cannot sleep if its linear velocity is above this tolerance.

***

### linearSlop

> `static` **linearSlop**: `number` = `0.005`

A small length used as a collision and constraint tolerance. Usually it is
chosen to be numerically significant, but visually insignificant.

***

### maxAngularCorrection

> `static` **maxAngularCorrection**: `number`

The maximum angular position correction used when solving constraints. This
helps to prevent overshoot.

***

### maxDistanceIterations

> `static` **maxDistanceIterations**: `number` = `20`

Maximum iterations to find Distance.

***

### maxLinearCorrection

> `static` **maxLinearCorrection**: `number` = `0.2`

The maximum linear position correction used when solving constraints. This
helps to prevent overshoot.

***

### maxManifoldPoints

> `static` **maxManifoldPoints**: `number` = `2`

The maximum number of contact points between two convex shapes. Do not change
this value.

***

### maxPolygonVertices

> `static` **maxPolygonVertices**: `number` = `12`

The maximum number of vertices on a convex polygon. You cannot increase this
too much because BlockAllocator has a maximum object size.

***

### maxRotation

> `static` **maxRotation**: `number`

The maximum angular velocity of a body. This limit is very large and is used
to prevent numerical problems. You shouldn't need to adjust Settings.

***

### maxSubSteps

> `static` **maxSubSteps**: `number` = `8`

Maximum number of sub-steps per contact in continuous physics simulation.

***

### maxTOIContacts

> `static` **maxTOIContacts**: `number` = `32`

Maximum number of contacts to be handled to solve a TOI impact.

***

### maxTOIIterations

> `static` **maxTOIIterations**: `number` = `20`

Maximum iterations to solve a TOI.

***

### maxTranslation

> `static` **maxTranslation**: `number` = `2.0`

The maximum linear velocity of a body. This limit is very large and is used
to prevent numerical problems. You shouldn't need to adjust Settings.

***

### timeToSleep

> `static` **timeToSleep**: `number` = `0.5`

The time that a body must be still before it will go to sleep.

***

### toiBaugarte

> `static` **toiBaugarte**: `number` = `0.75`

***

### velocityThreshold

> `static` **velocityThreshold**: `number` = `1.0`

A velocity threshold for elastic collisions. Any collision with a relative
linear velocity below this threshold will be treated as inelastic.

## Accessors

### polygonRadius

#### Get Signature

> **get** `static` **polygonRadius**(): `number`

The radius of the polygon/edge shape skin. This should not be modified.
Making this smaller means polygons will have an insufficient buffer for
continuous collision. Making it larger may create artifacts for vertex
collision.

##### Returns

`number`
