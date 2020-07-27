[API Doc](../README.md) › [Settings](settings.md)

# Interface: Settings

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

*Defined in [index.d.ts:540](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L540)*

This is used to fatten AABBs in the dynamic tree. This allows proxies to move
by a small amount without triggering a tree adjustment. This is in meters.

___

###  aabbMultiplier

• **aabbMultiplier**: *number*

*Defined in [index.d.ts:547](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L547)*

This is used to fatten AABBs in the dynamic tree. This is used to predict the
future position based on the current displacement. This is a dimensionless
multiplier.

___

###  angularSleepTolerance

• **angularSleepTolerance**: *number*

*Defined in [index.d.ts:648](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L648)*

A body cannot sleep if its angular velocity is above this tolerance.

___

###  angularSleepToleranceSqr

• **angularSleepToleranceSqr**: *number*

*Defined in [index.d.ts:649](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L649)*

___

###  angularSlop

• **angularSlop**: *number*

*Defined in [index.d.ts:560](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L560)*

A small angle used as a collision and constraint tolerance. Usually it is
chosen to be numerically significant, but visually insignificant.

___

###  baumgarte

• **baumgarte**: *number*

*Defined in [index.d.ts:629](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L629)*

This scale factor controls how fast overlap is resolved. Ideally this would
be 1 so that overlap is removed in one time step. However using values close
to 1 often lead to overshoot.

___

###  linearSleepTolerance

• **linearSleepTolerance**: *number*

*Defined in [index.d.ts:642](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L642)*

A body cannot sleep if its linear velocity is above this tolerance.

___

###  linearSleepToleranceSqr

• **linearSleepToleranceSqr**: *number*

*Defined in [index.d.ts:643](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L643)*

___

###  linearSlop

• **linearSlop**: *number*

*Defined in [index.d.ts:553](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L553)*

A small length used as a collision and constraint tolerance. Usually it is
chosen to be numerically significant, but visually insignificant.

___

###  linearSlopSquared

• **linearSlopSquared**: *number*

*Defined in [index.d.ts:554](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L554)*

___

###  maxAngularCorrection

• **maxAngularCorrection**: *number*

*Defined in [index.d.ts:608](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L608)*

The maximum angular position correction used when solving constraints. This
helps to prevent overshoot.

___

###  maxDistnceIterations

• **maxDistnceIterations**: *number*

*Defined in [index.d.ts:590](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L590)*

Maximum iterations to find Distance.

___

###  maxLinearCorrection

• **maxLinearCorrection**: *number*

*Defined in [index.d.ts:602](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L602)*

The maximum linear position correction used when solving constraints. This
helps to prevent overshoot.

___

###  maxManifoldPoints

• **maxManifoldPoints**: *number*

*Defined in [index.d.ts:528](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L528)*

The maximum number of contact points between two convex shapes. Do not change
this value.

___

###  maxPolygonVertices

• **maxPolygonVertices**: *number*

*Defined in [index.d.ts:534](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L534)*

The maximum number of vertices on a convex polygon. You cannot increase this
too much because BlockAllocator has a maximum object size.

___

###  maxRotation

• **maxRotation**: *number*

*Defined in [index.d.ts:621](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L621)*

The maximum angular velocity of a body. This limit is very large and is used
to prevent numerical problems. You shouldn't need to adjust this.

___

###  maxRotationSquared

• **maxRotationSquared**: *number*

*Defined in [index.d.ts:622](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L622)*

___

###  maxSubSteps

• **maxSubSteps**: *number*

*Defined in [index.d.ts:573](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L573)*

Maximum number of sub-steps per contact in continuous physics simulation.

___

###  maxTOIContacts

• **maxTOIContacts**: *number*

*Defined in [index.d.ts:580](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L580)*

Maximum number of contacts to be handled to solve a TOI impact.

___

###  maxTOIIterations

• **maxTOIIterations**: *number*

*Defined in [index.d.ts:585](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L585)*

Maximum iterations to solve a TOI.

___

###  maxTranslation

• **maxTranslation**: *number*

*Defined in [index.d.ts:614](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L614)*

The maximum linear velocity of a body. This limit is very large and is used
to prevent numerical problems. You shouldn't need to adjust this.

___

###  maxTranslationSquared

• **maxTranslationSquared**: *number*

*Defined in [index.d.ts:615](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L615)*

___

###  polygonRadius

• **polygonRadius**: *number*

*Defined in [index.d.ts:568](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L568)*

The radius of the polygon/edge shape skin. This should not be modified.
Making this smaller means polygons will have an insufficient buffer for
continuous collision. Making it larger may create artifacts for vertex
collision.

___

###  timeToSleep

• **timeToSleep**: *number*

*Defined in [index.d.ts:637](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L637)*

The time that a body must be still before it will go to sleep.

___

###  toiBaugarte

• **toiBaugarte**: *number*

*Defined in [index.d.ts:630](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L630)*

___

###  velocityThreshold

• **velocityThreshold**: *number*

*Defined in [index.d.ts:596](https://github.com/shakiba/planck.js/blob/49dcd19/lib/index.d.ts#L596)*

A velocity threshold for elastic collisions. Any collision with a relative
linear velocity below this threshold will be treated as inelastic.
