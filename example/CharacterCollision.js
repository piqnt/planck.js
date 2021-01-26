/*
 * MIT License
 * Copyright (c) 2019 Erin Catto
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// This is a test of typical character collision scenarios. This does not
// show how you should implement a character in your application.
// Instead this is used to test smooth collision on edge chains.
planck.testbed('CharacterCollision', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  // Ground body
  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-20.0, 0.0), Vec2(20.0, 0.0)), 0.0);

  // Collinear edges with no adjacency information.
  // This shows the problematic case where a box shape can hit
  // an internal vertex.
  var edge = world.createBody();
  edge.createFixture(pl.Edge(Vec2(-8.0, 1.0), Vec2(-6.0, 1.0)), 0.0);
  edge.createFixture(pl.Edge(Vec2(-6.0, 1.0), Vec2(-4.0, 1.0)), 0.0);
  edge.createFixture(pl.Edge(Vec2(-4.0, 1.0), Vec2(-2.0, 1.0)), 0.0);

  // Chain shape
  var chain = world.createBody(Vec2(), 0.25 * Math.PI);
  chain.createFixture(pl.Chain([
    Vec2(5.0, 7.0),
    Vec2(6.0, 8.0),
    Vec2(7.0, 8.0),
    Vec2(8.0, 7.0)
  ]), 0.0);

  // Square tiles. This shows that adjacency shapes may
  // have non-smooth collision. There is no solution
  // to this problem.
  var tiles = world.createBody();
  tiles.createFixture(pl.Box(1.0, 1.0, Vec2(4.0, 3.0), 0.0), 0.0);
  tiles.createFixture(pl.Box(1.0, 1.0, Vec2(6.0, 3.0), 0.0), 0.0);
  tiles.createFixture(pl.Box(1.0, 1.0, Vec2(8.0, 3.0), 0.0), 0.0);

  // Square made from an edge loop. Collision should be smooth.
  var square = world.createBody();
  square.createFixture(pl.Chain([
    Vec2(-1.0, 3.0),
    Vec2(1.0, 3.0),
    Vec2(1.0, 5.0),
    Vec2(-1.0, 5.0)
  ], true), 0.0);

  // Edge loop. Collision should be smooth.
  var loop = world.createBody(Vec2(-10.0, 4.0));
  loop.createFixture(pl.Chain([
    Vec2(0.0, 0.0),
    Vec2(6.0, 0.0),
    Vec2(6.0, 2.0),
    Vec2(4.0, 1.0),
    Vec2(2.0, 2.0),
    Vec2(0.0, 2.0),
    Vec2(-2.0, 2.0),
    Vec2(-4.0, 3.0),
    Vec2(-6.0, 2.0),
    Vec2(-6.0, 0.0)
  ], true), 0.0);

  // Square character 1
  var char1 = world.createBody({
    position : Vec2(-3.0, 8.0),
    type : 'dynamic',
    fixedRotation : true,
    allowSleep : false
  });
  char1.createFixture(pl.Box(0.5, 0.5), 20.0);

  // Square character 2
  var char2 = world.createBody({
    position : Vec2(-5.0, 5.0),
    type : 'dynamic',
    fixedRotation : true,
    allowSleep : false
  });
  char2.createFixture(pl.Box(0.25, 0.25), 20.0);

  // Hexagon character
  var hex = world.createBody({
    position : Vec2(-5.0, 8.0),
    type : 'dynamic',
    fixedRotation : true,
    allowSleep : false
  });

  var angle = 0.0;
  var delta = Math.PI / 3.0;
  var vertices = [];
  for (var i = 0; i < 6; ++i) {
    vertices[i] = Vec2(0.5 * Math.cos(angle), 0.5 * Math.sin(angle));
    angle += delta;
  }

  hex.createFixture(pl.Polygon(vertices), 20.0);

  // Circle character
  var circle = world.createBody({
    position : Vec2(3.0, 5.0),
    type : 'dynamic',
    fixedRotation : true,
    allowSleep : false
  });
  circle.createFixture(pl.Circle(0.5), 20.0);

  // Circle character
  var character = world.createBody({
    position : Vec2(-7.0, 6.0),
    type : 'dynamic',
    allowSleep : false
  });
  character.createFixture(pl.Circle(0.25), {
    density : 20.0,
    friction : 1.0
  });

  testbed.step = function() {
    var v = character.getLinearVelocity();
    v.x = -5.0;
    character.setLinearVelocity(v);
  };

  testbed.info(
    'This tests various character collision shapes.' +
    '\nLimitation: square and hexagon can snag on aligned boxes.' +
    '\nFeature: edge chains have smooth collision inside and out.'
  );

  return world;
});
