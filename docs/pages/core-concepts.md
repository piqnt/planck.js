
## Core Concepts
Planck.js works with several fundamental concepts and objects. We briefly
define these objects here and more details are given later in this
document.

### World
A physics world is a collection of bodies, fixtures, and constraints that interact together.
`World` also manages running simulation.

### Shape
A shape is a 2D geometrical object, such as a circle or polygon.

### Rigid Body
A chunk of matter that is so strong that the distance between any two bits of matter on the chunk is constant.
In the following discussion we use body interchangeably with rigid body.

### Fixture
A fixture binds a shape to a body and adds physical properties such as density, friction, and restitution.
A fixture puts a shape into the collision system (broad-phase) so that it can collide with other shapes.

### Constraint
A constraint is a physical connection that removes degrees of freedom from bodies.
A 2D body has 3 degrees of freedom (two position coordinates and one rotation coordinate).

If we take a body and pin it to the wall (like a pendulum) we have constrained the body to the wall.
At this point the body can only rotate about the pin, so the constraint has removed 2 degrees of freedom.

### Contact Constraint
A special constraint designed to prevent penetration of rigid bodies and to simulate friction and restitution.
You do not create contact constraints; they are created automatically when two objects might collide.

### Joint
This is a constraint used to hold two or more bodies together. There are several joint types implemented in the library: revolute, prismatic, distance, and more.
Some joints may have limits and motors.

A joint limit restricts the range of motion of a joint. For example, the human elbow only allows a certain range of angles.

A joint motor drives the motion of the connected bodies according to the joint's degrees of freedom. For example, you can use a motor to drive the rotation of an elbow.

### Solver
The physics world has a solver that is used to advance time and to resolve contact and joint constraints.
The Planck.js solver is a high-performance iterative solver that operates in order N time, where N is the number of constraints.

### Continuous Collision
The solver advances bodies in time using discrete time steps. Without intervention this can lead to tunneling.

![Tunneling Effect](/planck.js/docs/images/tunneling1.svg)

Planck.js contains specialized algorithms to deal with tunneling. First, the collision algorithms can interpolate the motion of two bodies to find the first time of impact (TOI).
Second, there is a sub-stepping solver that moves bodies to their first time of impact and then resolves the collision.
