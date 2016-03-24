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

planck.play('DynamicTreeTest', function(pl) {
  {
    e_actorCount = 128
    {

      worldExtent = 15.0;
      m_proxyExtent = 0.5;

      srand(888);

      for (var /* int32 */i = 0; i < e_actorCount; ++i) {
        Actor
        actor = m_actors + i;
        GetRandomAABB(actor.aabb);
        actor.proxyId = m_tree.createProxy(actor.aabb, actor);
      }

      m_stepCount = 0;

      var /* float32 */h = worldExtent;
      m_queryAABB.lowerBound.set(-3.0, -4.0 + h);
      m_queryAABB.upperBound.set(5.0, 6.0 + h);

      m_rayCastInput.p1.set(-5.0, 5.0 + h);
      m_rayCastInput.p2.set(7.0, -4.0 + h);
      // m_rayCastInput.p1.set(0.0, 2.0 + h);
      // m_rayCastInput.p2.set(0.0, -2.0 + h);
      m_rayCastInput.maxFraction = 1.0;

      m_automated = false;
    }

    function Step(settings) {
      B2_NOT_USED(settings);

      m_rayActor = null;
      for (var /* int32 */i = 0; i < e_actorCount; ++i) {
        m_actors[i].fraction = 1.0;
        m_actors[i].overlap = false;
      }

      if (m_automated == true) {
        var /* int32 */actionCount = Max(1, e_actorCount >> 2);

        for (var /* int32 */i = 0; i < actionCount; ++i) {
          Action();
        }
      }

      Query();
      RayCast();

      for (var /* int32 */i = 0; i < e_actorCount; ++i) {
        var /* Actor */actor = m_actors + i;
        if (actor.proxyId == b2_nullNode)
          continue;

        var c = Color(0.9, 0.9, 0.9);
        if (actor == m_rayActor && actor.overlap) {
          c.set(0.9, 0.6, 0.6);
        } else if (actor == m_rayActor) {
          c.set(0.6, 0.9, 0.6);
        } else if (actor.overlap) {
          c.set(0.6, 0.6, 0.9);
        }

        g_debugDraw.DrawAABB(actor.aabb, c);
      }

      var c = Color(0.7, 0.7, 0.7);
      g_debugDraw.DrawAABB(m_queryAABB, c);

      g_debugDraw.DrawSegment(m_rayCastInput.p1, m_rayCastInput.p2, c);

      var c1 = Color(0.2, 0.9, 0.2);
      var c2 = Color(0.9, 0.2, 0.2);
      g_debugDraw.DrawPoint(m_rayCastInput.p1, 6.0, c1);
      g_debugDraw.DrawPoint(m_rayCastInput.p2, 6.0, c2);

      if (m_rayActor) {
        var cr = Color(0.2, 0.2, 0.9);
        var /* Vec2 */p = m_rayCastInput.p1 + m_rayActor.fraction
            * (m_rayCastInput.p2 - m_rayCastInput.p1);
        g_debugDraw.DrawPoint(p, 6.0, cr);
      }

      {
        var /* int32 */height = m_tree.getHeight();
        g_debugDraw.DrawString(5, m_textLine, "dynamic tree height = %d",
            height);
        m_textLine += DRAW_STRING_NEW_LINE;
      }

      ++m_stepCount;
    }

    function Keyboard( /* int */key) {
      switch (key) {
      case GLFW_KEY_A:
        m_automated = !m_automated;
        break;

      case GLFW_KEY_C:
        CreateProxy();
        break;

      case GLFW_KEY_D:
        DestroyProxy();
        break;

      case GLFW_KEY_M:
        MoveProxy();
        break;
      }
    }

    function /* bool */QueryCallback(/* int32 */proxyId) {
      var /* Actor */actor = m_tree.getUserData(proxyId);
      actor.overlap = TestOverlap(m_queryAABB, actor.aabb);
      return true;
    }

    function /* float32 */RayCastCallback(
    /* const *//* RayCastInput */input, /* int32 */proxyId) {
      var /* Actor */actor = m_tree.getUserData(proxyId);

      var /* RayCastOutput */output;
      var /* bool */hit = actor.aabb.rayCast(output, input);

      if (hit) {
        m_rayCastOutput = output;
        m_rayActor = actor;
        m_rayActor.fraction = output.fraction;
        return output.fraction;
      }

      return input.maxFraction;
    }

    function Actor() {
      var /* AABB */aabb;
      var /* float32 */fraction;
      var /* bool */overlap;
      var /* int32 */proxyId;
    }
    ;

    function GetRandomAABB( /* AABB */aabb) {
      var /* Vec2 */w;
      w.set(2.0 * m_proxyExtent, 2.0 * m_proxyExtent);
      // aabb.lowerBound.x = -m_proxyExtent;
      // aabb.lowerBound.y = -m_proxyExtent + worldExtent;
      aabb.lowerBound.x = RandomFloat(-worldExtent, worldExtent);
      aabb.lowerBound.y = RandomFloat(0.0, 2.0 * worldExtent);
      aabb.upperBound = aabb.lowerBound + w;
    }

    function MoveAABB( /* AABB */aabb) {
      var /* Vec2 */d;
      d.x = RandomFloat(-0.5, 0.5);
      d.y = RandomFloat(-0.5, 0.5);
      // d.x = 2.0;
      // d.y = 0.0;
      aabb.lowerBound += d;
      aabb.upperBound += d;

      var /* Vec2 */c0 = 0.5 * (aabb.lowerBound + aabb.upperBound);
      var /* Vec2 */min;
      min.set(-worldExtent, 0.0);
      var /* Vec2 */max;
      max.set(worldExtent, 2.0 * worldExtent);
      var /* Vec2 */c = Clamp(c0, min, max);

      aabb.lowerBound += c - c0;
      aabb.upperBound += c - c0;
    }

    function CreateProxy() {
      for (var /* int32 */i = 0; i < e_actorCount; ++i) {
        var /* int32 */j = rand() % e_actorCount;
        Actor
        actor = m_actors + j;
        if (actor.proxyId == b2_nullNode) {
          GetRandomAABB(actor.aabb);
          actor.proxyId = m_tree.createProxy(actor.aabb, actor);
          return;
        }
      }
    }

    function DestroyProxy() {
      for (var /* int32 */i = 0; i < e_actorCount; ++i) {
        var /* int32 */j = rand() % e_actorCount;
        Actor
        actor = m_actors + j;
        if (actor.proxyId != b2_nullNode) {
          m_tree.destroyProxy(actor.proxyId);
          actor.proxyId = b2_nullNode;
          return;
        }
      }
    }

    function MoveProxy() {
      for (var /* int32 */i = 0; i < e_actorCount; ++i) {
        var /* int32 */j = rand() % e_actorCount;
        Actor
        actor = m_actors + j;
        if (actor.proxyId == b2_nullNode) {
          continue;
        }

        var /* AABB */aabb0 = actor.aabb;
        MoveAABB(actor.aabb);
        var /* Vec2 */displacement = actor.aabb.getCenter()
            - aabb0.getCenter();
        m_tree.moveProxy(actor.proxyId, actor.aabb, displacement);
        return;
      }
    }

    function Action() {
      var /* int32 */choice = rand() % 20;

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
      m_tree.query(this, m_queryAABB);

      for (var /* int32 */i = 0; i < e_actorCount; ++i) {
        if (m_actors[i].proxyId == b2_nullNode) {
          continue;
        }

        var /* bool */overlap = TestOverlap(m_queryAABB, m_actors[i].aabb);
        B2_NOT_USED(overlap);
        Assert(overlap == m_actors[i].overlap);
      }
    }

    function RayCast() {
      m_rayActor = null;

      var /* RayCastInput */input = m_rayCastInput;

      // Ray cast against the dynamic tree.
      m_tree.rayCast(this, input);

      // Brute force ray cast.
      Actor
      bruteActor = null;
      var /* RayCastOutput */bruteOutput;
      for (var /* int32 */i = 0; i < e_actorCount; ++i) {
        if (m_actors[i].proxyId == b2_nullNode) {
          continue;
        }

        var /* RayCastOutput */output;
        var /* bool */hit = m_actors[i].aabb.rayCast(output, input);
        if (hit) {
          bruteActor = m_actors + i;
          bruteOutput = output;
          input.maxFraction = output.fraction;
        }
      }

      if (bruteActor != null) {
        Assert(bruteOutput.fraction == m_rayCastOutput.fraction);
      }
    }

    var /* float32 */worldExtent;
    var /* float32 */m_proxyExtent;

    var /* DynamicTree */m_tree;
    var /* AABB */m_queryAABB;
    var /* RayCastInput */m_rayCastInput;
    var /* RayCastOutput */m_rayCastOutput;
    var /* Actor */m_rayActor;
    var /* Actor */m_actors = [];// [e_actorCount];
    var /* int32 */m_stepCount;
    var /* bool */m_automated;

    return world;
  }
});
