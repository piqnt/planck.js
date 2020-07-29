[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Settings](settings.md)

# Class: Settings

Tuning constants based on meters-kilograms-seconds (MKS) units.

## Hierarchy

* **Settings**

## Index

### Properties

* [aabbExtension](settings.md#aabbextension)
* [aabbMultiplier](settings.md#aabbmultiplier)
* [angularSleepTolerance](settings.md#angularsleeptolerance)
* [angularSleepToleranceSqr](settings.md#angularsleeptolerancesqr)
* [angularSlop](settings.md#angularslop)
* [baumgarte](settings.md#baumgarte)
* [linearSleepTolerance](settings.md#linearsleeptolerance)
* [linearSleepToleranceSqr](settings.md#linearsleeptolerancesqr)
* [linearSlop](settings.md#linearslop)
* [linearSlopSquared](settings.md#linearslopsquared)
* [maxAngularCorrection](settings.md#maxangularcorrection)
* [maxDistnceIterations](settings.md#maxdistnceiterations)
* [maxLinearCorrection](settings.md#maxlinearcorrection)
* [maxManifoldPoints](settings.md#maxmanifoldpoints)
* [maxPolygonVertices](settings.md#maxpolygonvertices)
* [maxRotation](settings.md#maxrotation)
* [maxRotationSquared](settings.md#maxrotationsquared)
* [maxSubSteps](settings.md#maxsubsteps)
* [maxTOIContacts](settings.md#maxtoicontacts)
* [maxTOIIterations](settings.md#maxtoiiterations)
* [maxTranslation](settings.md#maxtranslation)
* [maxTranslationSquared](settings.md#maxtranslationsquared)
* [polygonRadius](settings.md#polygonradius)
* [timeToSleep](settings.md#timetosleep)
* [toiBaugarte](settings.md#toibaugarte)
* [velocityThreshold](settings.md#velocitythreshold)

## Properties

###  aabbExtension

• **aabbExtension**: *number*

*Defined in [index.d.ts:555](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L555)*

This is used to fatten AABBs in the dynamic tree. This allows proxies to move
by a small amount without triggering a tree adjustment. This is in meters.

___

###  aabbMultiplier

• **aabbMultiplier**: *number*

*Defined in [index.d.ts:562](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L562)*

This is used to fatten AABBs in the dynamic tree. This is used to predict the
future position based on the current displacement. This is a dimensionless
multiplier.

___

###  angularSleepTolerance

• **angularSleepTolerance**: *number*

*Defined in [index.d.ts:663](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L663)*

A body cannot sleep if its angular velocity is above this tolerance.

___

###  angularSleepToleranceSqr

• **angularSleepToleranceSqr**: *number*

*Defined in [index.d.ts:664](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L664)*

___

###  angularSlop

• **angularSlop**: *number*

*Defined in [index.d.ts:575](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L575)*

A small angle used as a collision and constraint tolerance. Usually it is
chosen to be numerically significant, but visually insignificant.

___

###  baumgarte

• **baumgarte**: *number*

*Defined in [index.d.ts:644](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L644)*

This scale factor controls how fast overlap is resolved. Ideally this would
be 1 so that overlap is removed in one time step. However using values close
to 1 often lead to overshoot.

___

###  linearSleepTolerance

• **linearSleepTolerance**: *number*

*Defined in [index.d.ts:657](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L657)*

A body cannot sleep if its linear velocity is above this tolerance.

___

###  linearSleepToleranceSqr

• **linearSleepToleranceSqr**: *number*

*Defined in [index.d.ts:658](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L658)*

___

###  linearSlop

• **linearSlop**: *number*

*Defined in [index.d.ts:568](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L568)*

A small length used as a collision and constraint tolerance. Usually it is
chosen to be numerically significant, but visually insignificant.

___

###  linearSlopSquared

• **linearSlopSquared**: *number*

*Defined in [index.d.ts:569](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L569)*

___

###  maxAngularCorrection

• **maxAngularCorrection**: *number*

*Defined in [index.d.ts:623](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L623)*

The maximum angular position correction used when solving constraints. This
helps to prevent overshoot.

___

###  maxDistnceIterations

• **maxDistnceIterations**: *number*

*Defined in [index.d.ts:605](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L605)*

Maximum iterations to find Distance.

___

###  maxLinearCorrection

• **maxLinearCorrection**: *number*

*Defined in [index.d.ts:617](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L617)*

The maximum linear position correction used when solving constraints. This
helps to prevent overshoot.

___

###  maxManifoldPoints

• **maxManifoldPoints**: *number*

*Defined in [index.d.ts:543](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L543)*

The maximum number of contact points between two convex shapes. Do not change
this value.

___

###  maxPolygonVertices

• **maxPolygonVertices**: *number*

*Defined in [index.d.ts:549](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L549)*

The maximum number of vertices on a convex polygon. You cannot increase this
too much because BlockAllocator has a maximum object size.

___

###  maxRotation

• **maxRotation**: *number*

*Defined in [index.d.ts:636](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L636)*

The maximum angular velocity of a body. This limit is very large and is used
to prevent numerical problems. You shouldn't need to adjust this.

___

###  maxRotationSquared

• **maxRotationSquared**: *number*

*Defined in [index.d.ts:637](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L637)*

___

###  maxSubSteps

• **maxSubSteps**: *number*

*Defined in [index.d.ts:588](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L588)*

Maximum number of sub-steps per contact in continuous physics simulation.

___

###  maxTOIContacts

• **maxTOIContacts**: *number*

*Defined in [index.d.ts:595](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L595)*

Maximum number of contacts to be handled to solve a TOI impact.

___

###  maxTOIIterations

• **maxTOIIterations**: *number*

*Defined in [index.d.ts:600](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L600)*

Maximum iterations to solve a TOI.

___

###  maxTranslation

• **maxTranslation**: *number*

*Defined in [index.d.ts:629](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L629)*

The maximum linear velocity of a body. This limit is very large and is used
to prevent numerical problems. You shouldn't need to adjust this.

___

###  maxTranslationSquared

• **maxTranslationSquared**: *number*

*Defined in [index.d.ts:630](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L630)*

___

###  polygonRadius

• **polygonRadius**: *number*

*Defined in [index.d.ts:583](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L583)*

The radius of the polygon/edge shape skin. This should not be modified.
Making this smaller means polygons will have an insufficient buffer for
continuous collision. Making it larger may create artifacts for vertex
collision.

___

###  timeToSleep

• **timeToSleep**: *number*

*Defined in [index.d.ts:652](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L652)*

The time that a body must be still before it will go to sleep.

___

###  toiBaugarte

• **toiBaugarte**: *number*

*Defined in [index.d.ts:645](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L645)*

___

###  velocityThreshold

• **velocityThreshold**: *number*

*Defined in [index.d.ts:611](https://github.com/shakiba/planck.js/blob/9a1fbe4/lib/index.d.ts#L611)*

A velocity threshold for elastic collisions. Any collision with a relative
linear velocity below this threshold will be treated as inelastic.
