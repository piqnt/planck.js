/*
 * MIT License
 * Copyright (c) 2019 Erin Catto
 */

const { World, Vec2, DynamicTree, AABB, Math } = planck;

var world = new World();

const testbed = planck.testbed();
testbed.start(world);

var ACTOR_COUNT = 128;
var worldExtent = 15.0;
var proxyExtent = 0.5;

var tree = new DynamicTree();
var queryAABB = new AABB();
var rayCastInput = {};
var rayCastOutput = {};
var rayActor;
var actors = []; // Actor[e_actorCount];
var automated = false;

for (var i = 0; i < ACTOR_COUNT; ++i) {
  var actor = actors[i] = new Actor();
  getRandomAABB(actor.aabb);
  actor.proxyId = tree.createProxy(actor.aabb, actor);
}

var h = worldExtent;
queryAABB.lowerBound.set(-3.0, -4.0 + h);
queryAABB.upperBound.set(5.0, 6.0 + h);

rayCastInput.p1 = new Vec2(-5.0, 5.0 + h);
rayCastInput.p2 = new Vec2(7.0, -4.0 + h);
// rayCastInput.p1 = new Vec2(0.0, 2.0 + h);
// rayCastInput.p2 = new Vec2(0.0, -2.0 + h);
rayCastInput.maxFraction = 1.0;

testbed.step = function() {
  rayActor = null;
  for (var i = 0; i < ACTOR_COUNT; ++i) {
    actors[i].fraction = 1.0;
    actors[i].overlap = false;
  }

  if (automated == true) {
    var actionCount = Math.max(1, ACTOR_COUNT >> 2);

    for (var i = 0; i < actionCount; ++i) {
      Action();
    }
  }

  Query();
  rayCast();

  for (var i = 0; i < ACTOR_COUNT; ++i) {
    var actor = actors[i];
    if (actor.proxyId == null)
      continue;

    var c = testbed.color(0.9, 0.9, 0.9);
    if (actor == rayActor && actor.overlap) {
      c = testbed.color(0.9, 0.6, 0.6);
    } else if (actor == rayActor) {
      c = testbed.color(0.6, 0.9, 0.6);
    } else if (actor.overlap) {
      c = testbed.color(0.6, 0.6, 0.9);
    }

    testbed.drawAABB(actor.aabb, c);
  }

  testbed.drawAABB(queryAABB, testbed.color(0.7, 0.7, 0.7));
  testbed.drawSegment(rayCastInput.p1, rayCastInput.p2, c);
  testbed.drawPoint(rayCastInput.p1, 6.0, testbed.color(0.2, 0.9, 0.2));
  testbed.drawPoint(rayCastInput.p2, 6.0, testbed.color(0.9, 0.2, 0.2));

  if (rayActor) {
    var p = Vec2.combine(1 - rayActor.fraction, rayCastInput.p1, rayActor.fraction, rayCastInput.p2);
    testbed.drawPoint(p, 6.0, testbed.color(0.2, 0.2, 0.9));
  }

  var height = tree.getHeight();
  testbed.status("dynamic tree height", height);
};

testbed.keydown = function(code, char) {
  switch (char) {
  case 'Z':
    automated = !automated;
    break;

  case 'C':
    createProxy();
    break;

  case 'X':
    destroyProxy();
    break;

  case 'M':
    moveProxy();
    break;
  }
};

function queryCallback(proxyId) {
  var actor = tree.getUserData(proxyId); // Actor
  actor.overlap = AABB.testOverlap(queryAABB, actor.aabb);
  return true;
}

function rayCastCallback(input, proxyId) {
  var actor = tree.getUserData(proxyId);

  var output = {}; // RayCastOutput
  var hit = actor.aabb.rayCast(output, input);

  if (hit) {
    rayCastOutput = output;
    rayActor = actor;
    rayActor.fraction = output.fraction;
    return output.fraction;
  }

  return input.maxFraction;
}

function Actor() {
  this.aabb = new AABB();
  this.fraction;
  this.overlap;
  this.proxyId;
}

function getRandomAABB(aabb) {
  var w = new Vec2(2.0 * proxyExtent, 2.0 * proxyExtent);
  // aabb.lowerBound.x = -proxyExtent;
  // aabb.lowerBound.y = -proxyExtent + worldExtent;
  aabb.lowerBound.x = Math.random(-worldExtent, worldExtent);
  aabb.lowerBound.y = Math.random(0.0, 2.0 * worldExtent);
  aabb.upperBound = w.add(aabb.lowerBound);
}

function moveAABB(aabb) {
  var d = new Vec2();
  d.x = Math.random(-0.5, 0.5);
  d.y = Math.random(-0.5, 0.5);
  // d.x = 2.0;
  // d.y = 0.0;
  aabb.lowerBound.add(d);
  aabb.upperBound.add(d);

  var c0 = Vec2.mid(aabb.lowerBound, aabb.upperBound);
  var min = new Vec2(-worldExtent, 0.0);
  var max = new Vec2(worldExtent, 2.0 * worldExtent);
  var c = Vec2.clamp(c0, min, max);

  aabb.lowerBound.add(c).sub(c0);
  aabb.upperBound.add(c).sub(c0);
}

function createProxy() {
  for (var i = 0; i < ACTOR_COUNT; ++i) {
    var j = Math.random() * ACTOR_COUNT | 0;
    var actor = actors[j];
    if (actor.proxyId == null) {
      getRandomAABB(actor.aabb);
      actor.proxyId = tree.createProxy(actor.aabb, actor);
      return;
    }
  }
}

function destroyProxy() {
  for (var i = 0; i < ACTOR_COUNT; ++i) {
    var j = Math.random() * ACTOR_COUNT | 0;
    var actor = actors[j];
    if (actor.proxyId != null) {
      tree.destroyProxy(actor.proxyId);
      actor.proxyId = null;
      return;
    }
  }
}

function moveProxy() {
  for (var i = 0; i < ACTOR_COUNT; ++i) {
    var j = Math.random() * ACTOR_COUNT | 0;
    actor = actors[j];
    if (actor.proxyId == null) {
      continue;
    }

    var aabb0 = actor.aabb;
    moveAABB(actor.aabb);
    var displacement = Vec2.sub(actor.aabb.getCenter(), aabb0.getCenter());
    tree.moveProxy(actor.proxyId, actor.aabb, displacement);
    return;
  }
}

function Action() {
  var choice = Math.random() * 20 | 0;

  switch (choice) {
  case 0:
    createProxy();
    break;

  case 1:
    destroyProxy();
    break;

  default:
    moveProxy();
  }
}

function Query() {
  tree.query(queryAABB, queryCallback);

  for (var i = 0; i < ACTOR_COUNT; ++i) {
    if (actors[i].proxyId == null) {
      continue;
    }

    var overlap = AABB.testOverlap(queryAABB, actors[i].aabb);
    // assert(overlap == actors[i].overlap);
  }
}

function rayCast() {
  rayActor = null;

  var input = rayCastInput; // RayCastInput

  // Ray cast against the dynamic tree.
  tree.rayCast(input, rayCastCallback);

  // Brute force ray cast.
  var bruteActor = null; // Actor
  var bruteOutput = {}; // RayCastOutput
  for (var i = 0; i < ACTOR_COUNT; ++i) {
    if (actors[i].proxyId == null) {
      continue;
    }

    var output = {}; // RayCastOutput
    var hit = actors[i].aabb.rayCast(output, input);
    if (hit) {
      bruteActor = actors[i];
      bruteOutput = output;
      input.maxFraction = output.fraction;
    }
  }

  if (bruteActor != null) {
    // Assert(bruteOutput.fraction == rayCastOutput.fraction);
  }
}
