
## Units
Planck.js works with floating point numbers and tolerances have to be used to make Planck.js perform well.
These tolerances have been tuned to work well with meters-kilogram-second (MKS) units.
In particular, Planck.js has been tuned to work well with moving shapes between 0.1 and 10 units (meters).
So this means objects between soup cans and buses in size should work well. Static shapes may be up to 50 meters long without trouble.

You should try to get your moving objects in the range 0.1 - 10 meters, with 1 meter being the sweet spot.

Being a 2D physics engine, it is tempting to use pixels as your units.
This could lead to a poor simulation and possibly weird behavior.
An object of length 200 pixels would be seen by Planck.js as the size of a 45 story building.

If you need to use different length units, you have two options:

- Use some scaling system when you render your environment and actors. It is highly recommended to use this approach to keep your physics code portable. The Planck.js testbed does this by using stage.js viewbox transform.

- Set Settings.lengthUnitsPerMeter accordingly. For example if a car height which is around 1.6 meter is 80 units (pixels) in in your game, value of lengthUnitsPerMeter should be set to 50 (80 / 1.6).

Planck.js uses radians for angles.
The body rotation is stored in radians and may grow unbounded.
Consider normalizing the angle of your bodies if the magnitude of the angle becomes too large (use body.setAngle).

> **Caution**:
> Planck.js uses radians, not degrees.
