
## Mouse Joint
The mouse joint is used in the testbed to manipulate bodies with the
mouse. It attempts to drive a point on a body towards the current
position of the cursor. There is no restriction on rotation.

The mouse joint definition has a target point, maximum force, frequency,
and damping ratio. The target point initially coincides with the body's
anchor point. The maximum force is used to prevent violent reactions
when multiple dynamic bodies interact. You can make this as large as you
like. The frequency and damping ratio are used to create a spring/damper
effect similar to the distance joint.

Many users have tried to adapt the mouse joint for game play. Users
often want to achieve precise positioning and instantaneous response.
The mouse joint doesn't work very well in that context. You may wish to
consider using kinematic bodies instead.

