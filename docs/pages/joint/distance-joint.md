
## Distance Joint
One of the simplest joints is a distance joint which says that the
distance between two points on two bodies must be constant. When you
specify a distance joint the two bodies should already be in place. Then
you specify the two anchor points in world coordinates. The first anchor
point is connected to body 1, and the second anchor point is connected
to body 2. These points imply the length of the distance constraint.

![Distance Joint](/planck.js/docs/images/distance_joint.gif)

Here is an example of a distance joint definition. In this case we
decide to allow the bodies to collide.

```js
new DistanceJoint({
  collideConnected: true,
}, myBodyA, myBodyB, worldAnchorOnBodyA, worldAnchorOnBodyB);
```

The distance joint can also be made soft, like a spring-damper
connection. See the Web example in the testbed to see how this behaves.

Softness is achieved by tuning two constants in the definition:
frequency and damping ratio. Think of the frequency as the frequency of
a harmonic oscillator (like a guitar string). The frequency is specified
in Hertz. Typically the frequency should be less than a half the
frequency of the time step. So if you are using a 60Hz time step, the
frequency of the distance joint should be less than 30Hz. The reason is
related to the Nyquist frequency.

The damping ratio is non-dimensional and is typically between 0 and 1,
but can be larger. At 1, the damping is critical (all oscillations
should vanish).

```js
new DistanceJoint({
  frequencyHz: 4,
  dampingRatio: 0.5,
  collideConnected: true,
}, myBodyA, myBodyB, worldAnchorOnBodyA, worldAnchorOnBodyB);
```
