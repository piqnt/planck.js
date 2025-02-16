
## Simulation

The world class is used to drive the simulation. You specify a time step
and a velocity and position iteration count. For example:

```js
let timeStep = 1 / 60;
let velocityIterations = 10;
let positionIterations = 8;
myWorld.step(timeStep, velocityIterations, positionIterations);
```

After the time step you can examine your bodies and joints for
information. Most likely you will grab the position off the bodies so
that you can update your actors and render them. You can perform the
time step anywhere in your game loop, but you should be aware of the
order of things. For example, you must create bodies before the time
step if you want to get collision results for the new bodies in that
frame.

As I discussed above in the HelloWorld tutorial[todo], you should use a fixed
time step. By using a larger time step you can improve performance in
low frame rate scenarios. But generally you should use a time step no
larger than 1/30 seconds. A time step of 1/60 seconds will usually
deliver a high quality simulation.

The iteration count controls how many times the constraint solver sweeps
over all the contacts and joints in the world. More iteration always
yields a better simulation. But don't trade a small time step for a
large iteration count. 60Hz and 10 iterations is far better than 30Hz
and 20 iterations.

After stepping, you should clear any forces you have applied to your
bodies. This is done with the command `world.clearForces()`. This lets
you take multiple sub-steps with the same force field.

```js
myWorld.clearForces();
```


[todo: clean up next section, it is duplicate]

### Simulating the World

Planck.js uses a computational algorithm called an integrator. Integrators
simulate the physics equations at discrete points of time. This goes
along with the traditional game loop where we essentially have a flip
book of movement on the screen. So we need to pick a time step for
Planck.js. Generally physics engines for games like a time step at least as
fast as 60Hz or 1/60 seconds. You can get away with larger time steps,
but you will have to be more careful about setting up the definitions
for your world. We also don't like the time step to change much. A
variable time step produces variable results, which makes it difficult
to debug. So don't tie the time step to your frame rate (unless you
really, really have to). Without further ado, here is the time step.

```js
let timeStep = 1 / 60;
```

In addition to the integrator, Planck.js also uses a larger bit of code
called a constraint solver. The constraint solver solves all the
constraints in the simulation, one at a time. A single constraint can be
solved perfectly. However, when we solve one constraint, we slightly
disrupt other constraints. To get a good solution, we need to iterate
over all constraints a number of times.

There are two phases in the constraint solver: a velocity phase and a
position phase. In the velocity phase the solver computes the impulses
necessary for the bodies to move correctly. In the position phase the
solver adjusts the positions of the bodies to reduce overlap and joint
detachment. Each phase has its own iteration count. In addition, the
position phase may exit iterations early if the errors are small.

The suggested iteration count for Planck.js is 8 for velocity and 3 for
position. You can tune this number to your liking, just keep in mind
that this has a trade-off between performance and accuracy. Using fewer
iterations increases performance but accuracy suffers. Likewise, using
more iterations decreases performance but improves the quality of your
simulation. For this simple example, we don't need much iteration. Here
are our chosen iteration counts.

```js
let velocityIterations = 6;
let positionIterations = 2;
```

Note that the time step and the iteration count are completely
unrelated. An iteration is not a sub-step. One solver iteration is a
single pass over all the constraints within a time step. You can have
multiple passes over the constraints within a single time step.

We are now ready to begin the simulation loop. In your game the
simulation loop can be merged with your game loop. In each pass through
your game loop you call world.step(). Just one call is usually enough,
depending on your frame rate and your physics time step.

The Hello World program was designed to be simple, so it has no
graphical output. The code prints out the position and rotation of the
dynamic body. Here is the simulation loop that simulates 60 time steps
for a total of 1 second of simulated time.

```js
for (let i = 0; i < 60; ++i) {
    world.step(timeStep, velocityIterations, positionIterations);
    let position = body.getPosition();
    let angle = body.getAngle();
    console.log(position.x, position.y, angle);
}
```

The output shows the box falling and landing on the ground box. Your
output should look like this:

```
0.00 4.00 0.00
0.00 3.99 0.00
0.00 3.98 0.00
...
0.00 1.25 0.00
0.00 1.13 0.00
0.00 1.01 0.00
```
