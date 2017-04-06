/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2009      Erin Catto  http://www.box2d.org
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */

planck.testbed('DynamicTreeTest', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;

  var world = new pl.World();

  var e_actorCount = 128;
  var worldExtent = 15.0;
  var m_proxyExtent = 0.5;

  var m_tree = new pl.internal.DynamicTree();
  var m_queryAABB = pl.AABB();
  var m_rayCastInput = {};
  var m_rayCastOutput = {};
  var m_rayActor;
  var m_actors = []; // Actor[e_actorCount];
  var m_automated = false;

  for (var i = 0; i < e_actorCount; ++i) {
    var actor = m_actors[i] = new Actor();
    GetRandomAABB(actor.aabb);
    actor.proxyId = m_tree.createProxy(actor.aabb, actor);
  }

  var h = worldExtent;
  m_queryAABB.lowerBound.set(-3.0, -4.0 + h);
  m_queryAABB.upperBound.set(5.0, 6.0 + h);

  m_rayCastInput.p1 = Vec2(-5.0, 5.0 + h);
  m_rayCastInput.p2 = Vec2(7.0, -4.0 + h);
  // m_rayCastInput.p1 = Vec2(0.0, 2.0 + h);
  // m_rayCastInput.p2 = Vec2(0.0, -2.0 + h);
  m_rayCastInput.maxFraction = 1.0;

  testbed.step = function() {
    m_rayActor = null;
    for (var i = 0; i < e_actorCount; ++i) {
      m_actors[i].fraction = 1.0;
      m_actors[i].overlap = false;
    }

    if (m_automated == true) {
      var actionCount = Math.max(1, e_actorCount >> 2);

      for (var i = 0; i < actionCount; ++i) {
        Action();
      }
    }

    Query();
    RayCast();

    for (var i = 0; i < e_actorCount; ++i) {
      var actor = m_actors[i];
      if (actor.proxyId == null)
        continue;

      var c = testbed.color(0.9, 0.9, 0.9);
      if (actor == m_rayActor && actor.overlap) {
        c = testbed.color(0.9, 0.6, 0.6);
      } else if (actor == m_rayActor) {
        c = testbed.color(0.6, 0.9, 0.6);
      } else if (actor.overlap) {
        c = testbed.color(0.6, 0.6, 0.9);
      }

      testbed.drawAABB(actor.aabb, c);
    }

    testbed.drawAABB(m_queryAABB, testbed.color(0.7, 0.7, 0.7));
    testbed.drawSegment(m_rayCastInput.p1, m_rayCastInput.p2, c);
    testbed.drawPoint(m_rayCastInput.p1, 6.0, testbed.color(0.2, 0.9, 0.2));
    testbed.drawPoint(m_rayCastInput.p2, 6.0, testbed.color(0.9, 0.2, 0.2));

    if (m_rayActor) {
      var p = Vec2.wAdd(1 - m_rayActor.fraction, m_rayCastInput.p1, m_rayActor.fraction, m_rayCastInput.p2);
      testbed.drawPoint(p, 6.0, testbed.color(0.2, 0.2, 0.9));
    }

    var height = m_tree.getHeight();
    testbed.status("dynamic tree height", height);
  };

  testbed.keydown = function(code, char) {
    switch (char) {
    case 'A':
      m_automated = !m_automated;
      break;

    case 'C':
      CreateProxy();
      break;

    case 'D':
      DestroyProxy();
      break;

    case 'M':
      MoveProxy();
      break;
    }
  };

  function QueryCallback(proxyId) {
    var actor = m_tree.getUserData(proxyId); // Actor
    actor.overlap = pl.AABB.testOverlap(m_queryAABB, actor.aabb);
    return true;
  }

  function RayCastCallback(input, proxyId) {
    var actor = m_tree.getUserData(proxyId);

    var output = {}; // RayCastOutput
    var hit = actor.aabb.rayCast(output, input);

    if (hit) {
      m_rayCastOutput = output;
      m_rayActor = actor;
      m_rayActor.fraction = output.fraction;
      return output.fraction;
    }

    return input.maxFraction;
  }

  function Actor() {
    this.aabb = pl.AABB();
    this.fraction;
    this.overlap;
    this.proxyId;
  }

  function GetRandomAABB(aabb) {
    var w = Vec2(2.0 * m_proxyExtent, 2.0 * m_proxyExtent);
    // aabb.lowerBound.x = -m_proxyExtent;
    // aabb.lowerBound.y = -m_proxyExtent + worldExtent;
    aabb.lowerBound.x = pl.Math.random(-worldExtent, worldExtent);
    aabb.lowerBound.y = pl.Math.random(0.0, 2.0 * worldExtent);
    aabb.upperBound = w.add(aabb.lowerBound);
  }

  function MoveAABB(aabb) {
    var d = Vec2();
    d.x = pl.Math.random(-0.5, 0.5);
    d.y = pl.Math.random(-0.5, 0.5);
    // d.x = 2.0;
    // d.y = 0.0;
    aabb.lowerBound.add(d);
    aabb.upperBound.add(d);

    var c0 = Vec2.mid(aabb.lowerBound, aabb.upperBound);
    var min = Vec2(-worldExtent, 0.0);
    var max = Vec2(worldExtent, 2.0 * worldExtent);
    var c = Vec2.clamp(c0, min, max);

    aabb.lowerBound.add(c).sub(c0);
    aabb.upperBound.add(c).sub(c0);
  }

  function CreateProxy() {
    for (var i = 0; i < e_actorCount; ++i) {
      var j = Math.random() * e_actorCount | 0;
      var actor = m_actors[j];
      if (actor.proxyId == null) {
        GetRandomAABB(actor.aabb);
        actor.proxyId = m_tree.createProxy(actor.aabb, actor);
        return;
      }
    }
  }

  function DestroyProxy() {
    for (var i = 0; i < e_actorCount; ++i) {
      var j = Math.random() * e_actorCount | 0;
      var actor = m_actors[j];
      if (actor.proxyId != null) {
        m_tree.destroyProxy(actor.proxyId);
        actor.proxyId = null;
        return;
      }
    }
  }

  function MoveProxy() {
    for (var i = 0; i < e_actorCount; ++i) {
      var j = Math.random() * e_actorCount | 0;
      actor = m_actors[j];
      if (actor.proxyId == null) {
        continue;
      }

      var aabb0 = actor.aabb;
      MoveAABB(actor.aabb);
      var displacement = Vec2.sub(actor.aabb.getCenter(), aabb0.getCenter());
      m_tree.moveProxy(actor.proxyId, actor.aabb, displacement);
      return;
    }
  }

  function Action() {
    var choice = Math.random() * 20 | 0;

    switch (choice) {
    case 0:
      CreateProxy();
      break;

    case 1:
      DestroyProxy();
      break;

    default:
      MoveProxy();
    }
  }

  function Query() {
    m_tree.query(m_queryAABB, QueryCallback);

    for (var i = 0; i < e_actorCount; ++i) {
      if (m_actors[i].proxyId == null) {
        continue;
      }

      var overlap = pl.AABB.testOverlap(m_queryAABB, m_actors[i].aabb);
      // assert(overlap == m_actors[i].overlap);
    }
  }

  function RayCast() {
    m_rayActor = null;

    var input = m_rayCastInput; // RayCastInput

    // Ray cast against the dynamic tree.
    m_tree.rayCast(input, RayCastCallback);

    // Brute force ray cast.
    var bruteActor = null; // Actor
    var bruteOutput = {}; // RayCastOutput
    for (var i = 0; i < e_actorCount; ++i) {
      if (m_actors[i].proxyId == null) {
        continue;
      }

      var output = {}; // RayCastOutput
      var hit = m_actors[i].aabb.rayCast(output, input);
      if (hit) {
        bruteActor = m_actors[i];
        bruteOutput = output;
        input.maxFraction = output.fraction;
      }
    }

    if (bruteActor != null) {
      // Assert(bruteOutput.fraction == m_rayCastOutput.fraction);
    }
  }

  return world;
});
