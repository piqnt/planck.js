/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2011      Erin Catto  http://www.box2d.org
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

// This test holds worlds dumped using World.Dump.
planck.play('DumpShell', function(pl) {
  // Source code dump of Box2D scene: issue304-minimal-case.rube
  //
  // Created by R.U.B.E 1.3.0
  // Using Box2D version 2.3.0
  // Wed April 3 2013 04:33:28
  //
  // This code is originally intended for use in the Box2D testbed,
  // but you can easily use it in other applications by providing
  // a var /*World*/ for use as the 'world' variable in the code below.

  var g = Vec2(0.000000000000000e+00, -1.000000000000000e+01);
  world.setGravity(g);
  var bodies = [];// 3
  var joints = []; //
  {
    var /* BodyDef */bd;
    bd.type = BodyType(0);
    bd.position.set(2.587699890136719e-02, 5.515012264251709e+00);
    bd.angle = 0.000000000000000e+00;
    bd.linearVelocity.set(0.000000000000000e+00, 0.000000000000000e+00);
    bd.angularVelocity = 0.000000000000000e+00;
    bd.linearDamping = 0.000000000000000e+00;
    bd.angularDamping = 0.000000000000000e+00;
    bd.allowSleep = bool(4);
    bd.awake = bool(2);
    bd.fixedRotation = bool(0);
    bd.bullet = bool(0);
    bd.active = bool(32);
    bd.gravityScale = 1.000000000000000e+00;
    bodies[0] = world.createBody(bd);

    {
      var /* FixtureDef */fd;
      fd.friction = 2.000000029802322e-01;
      fd.restitution = 0.000000000000000e+00;
      fd.density = 1.000000000000000e+00;
      fd.isSensor = bool(0);
      fd.filterCategoryBits = uint16(1);
      fd.filterMaskBits = uint16(65535);
      fd.filterGroupIndex = int16(0);
      var /* PolygonShape */shape;
      var /* Vec2 */vs
      [ 8 ];
      vs[0].set(7.733039855957031e-01, -1.497260034084320e-01);
      vs[1].set(-4.487270116806030e-01, 1.138330027461052e-01);
      vs[2].set(-1.880589962005615e+00, -1.365900039672852e-01);
      vs[3].set(3.972740173339844e-01, -3.897832870483398e+00);
      shape.set(vs, 4);

      fd.shape = shape;

      bodies[0].createFixture(fd);
    }
  }
  {
    var /* BodyDef */bd;
    bd.type = BodyType(2);
    bd.position.set(-3.122138977050781e-02, 7.535382270812988e+00);
    bd.angle = -1.313644275069237e-02;
    bd.linearVelocity.set(8.230687379837036e-01, 7.775862514972687e-02);
    bd.angularVelocity = 3.705333173274994e-02;
    bd.linearDamping = 0.000000000000000e+00;
    bd.angularDamping = 0.000000000000000e+00;
    bd.allowSleep = bool(4);
    bd.awake = bool(2);
    bd.fixedRotation = bool(0);
    bd.bullet = bool(0);
    bd.active = bool(32);
    bd.gravityScale = 1.000000000000000e+00;
    bodies[1] = world.createBody(bd);

    {
      var /* FixtureDef */fd;
      fd.friction = 5.000000000000000e-01;
      fd.restitution = 0.000000000000000e+00;
      fd.density = 5.000000000000000e+00;
      fd.isSensor = bool(0);
      fd.filterCategoryBits = uint16(1);
      fd.filterMaskBits = uint16(65535);
      fd.filterGroupIndex = int16(0);
      var /* PolygonShape */shape;
      var /* Vec2 */vs
      [ 8 ];
      vs[0].set(3.473900079727173e+00, -2.009889930486679e-01);
      vs[1].set(3.457079887390137e+00, 3.694039955735207e-02);
      vs[2].set(-3.116359949111938e+00, 2.348500071093440e-03);
      vs[3].set(-3.109960079193115e+00, -3.581250011920929e-01);
      vs[4].set(-2.590820074081421e+00, -5.472509860992432e-01);
      vs[5].set(2.819370031356812e+00, -5.402340292930603e-01);
      shape.set(vs, 6);

      fd.shape = shape;

      bodies[1].createFixture(fd);
    }
  }
  {
    var /* BodyDef */bd;
    bd.type = BodyType(2);
    bd.position.set(-7.438077926635742e-01, 6.626811981201172e+00);
    bd.angle = -1.884713363647461e+01;
    bd.linearVelocity.set(1.785794943571091e-01, 3.799796104431152e-07);
    bd.angularVelocity = -5.908820639888290e-06;
    bd.linearDamping = 0.000000000000000e+00;
    bd.angularDamping = 0.000000000000000e+00;
    bd.allowSleep = bool(4);
    bd.awake = bool(2);
    bd.fixedRotation = bool(0);
    bd.bullet = bool(0);
    bd.active = bool(32);
    bd.gravityScale = 1.000000000000000e+00;
    bodies[2] = world.createBody(bd);

    {
      var /* FixtureDef */fd;
      fd.friction = 9.499999880790710e-01;
      fd.restitution = 0.000000000000000e+00;
      fd.density = 1.000000000000000e+01;
      fd.isSensor = bool(0);
      fd.filterCategoryBits = uint16(1);
      fd.filterMaskBits = uint16(65535);
      fd.filterGroupIndex = int16(-3);
      var /* PolygonShape */shape;
      var /* Vec2 */vs
      [ 8 ];
      vs[0].set(1.639146506786346e-01, 4.428443685173988e-02);
      vs[1].set(-1.639146655797958e-01, 4.428443685173988e-02);
      vs[2].set(-1.639146655797958e-01, -4.428443312644958e-02);
      vs[3].set(1.639146357774734e-01, -4.428444057703018e-02);
      shape.set(vs, 4);

      fd.shape = shape;

      bodies[2].createFixture(fd);
    }
  }
  Free(joints);
  Free(bodies);
  joints = null;
  bodies = null;

  return world;
});
