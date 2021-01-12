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

*Defined in [index.d.ts:553](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L553)*

This is used to fatten AABBs in the dynamic tree. This allows proxies to move
by a small amount without triggering a tree adjustment. This is in meters.

___

###  aabbMultiplier

• **aabbMultiplier**: *number*

*Defined in [index.d.ts:560](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L560)*

This is used to fatten AABBs in the dynamic tree. This is used to predict the
future position based on the current displacement. This is a dimensionless
multiplier.

___

###  angularSleepTolerance

• **angularSleepTolerance**: *number*

*Defined in [index.d.ts:661](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L661)*

A body cannot sleep if its angular velocity is above this tolerance.

___

###  angularSleepToleranceSqr

• **angularSleepToleranceSqr**: *number*

*Defined in [index.d.ts:662](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L662)*

___

###  angularSlop

• **angularSlop**: *number*

*Defined in [index.d.ts:573](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L573)*

A small angle used as a collision and constraint tolerance. Usually it is
chosen to be numerically significant, but visually insignificant.

___

###  baumgarte

• **baumgarte**: *number*

*Defined in [index.d.ts:642](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L642)*

This scale factor controls how fast overlap is resolved. Ideally this would
be 1 so that overlap is removed in one time step. However using values close
to 1 often lead to overshoot.

___

###  linearSleepTolerance

• **linearSleepTolerance**: *number*

*Defined in [index.d.ts:655](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L655)*

A body cannot sleep if its linear velocity is above this tolerance.

___

###  linearSleepToleranceSqr

• **linearSleepToleranceSqr**: *number*

*Defined in [index.d.ts:656](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L656)*

___

###  linearSlop

• **linearSlop**: *number*

*Defined in [index.d.ts:566](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L566)*

A small length used as a collision and constraint tolerance. Usually it is
chosen to be numerically significant, but visually insignificant.

___

###  linearSlopSquared

• **linearSlopSquared**: *number*

*Defined in [index.d.ts:567](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L567)*

___

###  maxAngularCorrection

• **maxAngularCorrection**: *number*

*Defined in [index.d.ts:621](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L621)*

The maximum angular position correction used when solving constraints. This
helps to prevent overshoot.

___

###  maxDistnceIterations

• **maxDistnceIterations**: *number*

*Defined in [index.d.ts:603](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L603)*

Maximum iterations to find Distance.

___

###  maxLinearCorrection

• **maxLinearCorrection**: *number*

*Defined in [index.d.ts:615](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L615)*

The maximum linear position correction used when solving constraints. This
helps to prevent overshoot.

___

###  maxManifoldPoints

• **maxManifoldPoints**: *number*

*Defined in [index.d.ts:541](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L541)*

The maximum number of contact points between two convex shapes. Do not change
this value.

___

###  maxPolygonVertices

• **maxPolygonVertices**: *number*

*Defined in [index.d.ts:547](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L547)*

The maximum number of vertices on a convex polygon. You cannot increase this
too much because BlockAllocator has a maximum object size.

___

###  maxRotation

• **maxRotation**: *number*

*Defined in [index.d.ts:634](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L634)*

The maximum angular velocity of a body. This limit is very large and is used
to prevent numerical problems. You shouldn't need to adjust this.

___

###  maxRotationSquared

• **maxRotationSquared**: *number*

*Defined in [index.d.ts:635](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L635)*

___

###  maxSubSteps

• **maxSubSteps**: *number*

*Defined in [index.d.ts:586](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L586)*

Maximum number of sub-steps per contact in continuous physics simulation.

___

###  maxTOIContacts

• **maxTOIContacts**: *number*

*Defined in [index.d.ts:593](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L593)*

Maximum number of contacts to be handled to solve a TOI impact.

___

###  maxTOIIterations

• **maxTOIIterations**: *number*

*Defined in [index.d.ts:598](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L598)*

Maximum iterations to solve a TOI.

___

###  maxTranslation

• **maxTranslation**: *number*

*Defined in [index.d.ts:627](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L627)*

The maximum linear velocity of a body. This limit is very large and is used
to prevent numerical problems. You shouldn't need to adjust this.

___

###  maxTranslationSquared

• **maxTranslationSquared**: *number*

*Defined in [index.d.ts:628](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L628)*

___

###  polygonRadius

• **polygonRadius**: *number*

*Defined in [index.d.ts:581](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L581)*

The radius of the polygon/edge shape skin. This should not be modified.
Making this smaller means polygons will have an insufficient buffer for
continuous collision. Making it larger may create artifacts for vertex
collision.

___

###  timeToSleep

• **timeToSleep**: *number*

*Defined in [index.d.ts:650](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L650)*

The time that a body must be still before it will go to sleep.

___

###  toiBaugarte

• **toiBaugarte**: *number*

*Defined in [index.d.ts:643](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L643)*

___

###  velocityThreshold

• **velocityThreshold**: *number*

*Defined in [index.d.ts:609](https://github.com/shakiba/planck.js/blob/038d425/lib/index.d.ts#L609)*

A velocity threshold for elastic collisions. Any collision with a relative
linear velocity below this threshold will be treated as inelastic.
