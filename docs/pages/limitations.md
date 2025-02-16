
## Limitations
Planck.js uses several approximations to simulate rigid body physics
efficiently. This brings some limitations.

Here are the current limitations:
1. Stacking heavy bodies on top of much lighter bodies is not stable. Stability degrades as the mass ratio passes 10:1.
2. Chains of bodies connected by joints may stretch if a lighter body is supporting a heavier body. For example, a wrecking ball connect to a chain of light weight bodies may not be stable. Stability degrades as the mass ratio passes 10:1.
3. There is typically around 0.5cm of slop in shape versus shape collision.
4. Continuous collision does not handle joints. So you may see joint stretching on fast moving objects.
5. Planck.js uses the symplectic Euler integration scheme. It does not reproduce parabolic motion of projectiles and has only first-order accuracy. However it is fast and has good stability.
6. Planck.js uses an iterative solver to provide real-time performance. You will not get precisely rigid collisions or pixel perfect accuracy. Increasing the iterations will improve accuracy.

## Accuracy

Box2D/Planck.js uses approximate methods for a few reasons.

* Performance
* Some differential equations don't have known solutions
* Some constraints cannot be determined uniquely

What this means is that constraints are not perfectly rigid and sometimes you will see some bounce even when the restitution is zero.
Box2D/Planck.js uses Gauss-Seidel to approximately solve constraints.
Box2D/Planck.js also uses Semi-implicit Euler to approximately solve the differential equations.
Box2D/Planck.js also does not have exact collision. Polygons are covered with a thin skin (around 0.5cm thick) to avoid numerical problems. This can sometimes lead to unexpected contact normals. Also, some shapes may begin to overlap and then be pushed apart by the solver.


## Restitution/Friction mixing accuracy

A physically correct restitution value must be measured in experiments.
But as soon as you change the geometry from the experiment then the value is wrong.
Next, adding simultaneous collision makes the answer worse.

## Determinism

For the same input, and same javascript runtime, Box2D/Planck.js will reproduce any simulation.
Box2D/Planck.js does not use any random numbers nor base any computation on random events (such as timers, etc).

However, people often want more stringent determinism.
People often want to know if Box2D/Planck.js can produce identical results on different binaries and on different platforms. The answer is no. The reason for this answer has to do with how floating point math is implemented in many compilers and processors. I recommend reading this article if you are curious: http://www.yosefk.com/blog/consistency-how-to-defeat-the-purpose-of-ieee-floating-point.html

This naturally leads to the question of fixed-point math.
Box2D/Planck.js does not support fixed-point math.
In the past Box2D was ported to the NDS in fixed-point and apparently it worked okay.
Fixed-point math is slower and more tedious to develop, so fixed-point is used for the development of Box2D.

## Making Games

### Worms Clones

Making a worms clone requires arbitrarily destructible terrain.
This is beyond the scope of Box2D/Planck.js, so you will have to figure out how to do this on your own.

### Tile Based Environment

Using many boxes for your terrain may not work well because box-like characters can get snagged on internal corners.
A future update to Box2D/Planck.js should allow for smooth motion over edge chains.
In general you should avoid using a rectangular character because collision tolerances will still lead to undesirable snagging.

### Asteroid Type Coordinate Systems

Box2D/Planck.js does not have any support for coordinate frame wrapping.
You would likely need to customize Box2D/Planck.js for this purpose.
You may need to use a different broad-phase for this to work.
