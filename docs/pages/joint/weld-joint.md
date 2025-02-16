
## Weld Joint
The weld joint attempts to constrain all relative motion between two
bodies. See the Cantilever.js in the testbed to see how the weld joint
behaves.

It is tempting to use the weld joint to define breakable structures.
However, the Planck.js solver is iterative so the joints are a bit soft. So
chains of bodies connected by weld joints will flex.

Instead it is better to create breakable bodies starting with a single
body with multiple fixtures. When the body breaks, you can destroy a
fixture and recreate it on a new body. See the Breakable example in the
testbed.