/*
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2009 Erin Catto  http://www.box2d.org
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

planck.play('BodyTypes', function(pl) {
  var /* Body */ground = null;
  {
    var /* BodyDef */bd;
    ground = world.createBody(bd);

    var /* EdgeShape */shape;
    shape.set(Vec2(-20.0, 0.0), Vec2(20.0, 0.0));

    var /* FixtureDef */fd;
    fd.shape = shape;

    ground.createFixture(fd);
  }

  // Define attachment
  {
    var /* BodyDef */bd;
    bd.type = 'dynamic';
    bd.position.set(0.0, 3.0);
    m_attachment = world.createBody(bd);

    var /* PolygonShape */shape;
    shape.setAsBox(0.5, 2.0);
    m_attachment.createFixture(shape, 2.0);
  }

  // Define platform
  {
    var /* BodyDef */bd;
    bd.type = 'dynamic';
    bd.position.set(-4.0, 5.0);
    m_platform = world.createBody(bd);

    var /* PolygonShape */shape;
    shape.setAsBox(0.5, 4.0, Vec2(4.0, 0.0), 0.5 * Math.PI);

    var /* FixtureDef */fd;
    fd.shape = shape;
    fd.friction = 0.6;
    fd.density = 2.0;
    m_platform.createFixture(fd);

    var /* RevoluteJointDef */rjd;
    rjd.initialize(m_attachment, m_platform, Vec2(0.0, 5.0));
    rjd.maxMotorTorque = 50.0;
    rjd.enableMotor = true;
    world.createJoint(rjd);

    var /* PrismaticJointDef */pjd;
    pjd.initialize(ground, m_platform, Vec2(0.0, 5.0), Vec2(1.0, 0.0));

    pjd.maxMotorForce = 1000.0;
    pjd.enableMotor = true;
    pjd.lowerTranslation = -10.0;
    pjd.upperTranslation = 10.0;
    pjd.enableLimit = true;

    world.createJoint(pjd);

    m_speed = 3.0;
  }

  // Create a payload
  {
    var /* BodyDef */bd;
    bd.type = 'dynamic';
    bd.position.set(0.0, 8.0);
    var /* Body */body = world.createBody(bd);

    var /* PolygonShape */shape;
    shape.setAsBox(0.75, 0.75);

    var /* FixtureDef */fd;
    fd.shape = shape;
    fd.friction = 0.6;
    fd.density = 2.0;

    body.createFixture(fd);
  }

  function Keyboard(/* int */key) {
    switch (key) {
    case GLFW_KEY_D:
      m_platform.setType('dynamic');
      break;

    case GLFW_KEY_S:
      m_platform.setType('static');
      break;

    case GLFW_KEY_K:
      m_platform.setType('kinematic');
      m_platform.setLinearVelocity(Vec2(-m_speed, 0.0));
      m_platform.setAngularVelocity(0.0);
      break;
    }
  }

  function Step(settings) {
    // Drive the kinematic body.
    if (m_platform.getType() == 'kinematic') {
      var /* Vec2 */p = m_platform.getTransform().p;
      var /* Vec2 */v = m_platform.getLinearVelocity();

      if ((p.x < -10.0 && v.x < 0.0) || (p.x > 10.0 && v.x > 0.0)) {
        v.x = -v.x;
        m_platform.setLinearVelocity(v);
      }
    }

    Test.step(settings);
    g_debugDraw.DrawString(5, m_textLine,
        "Keys: (d) dynamic, (s) static, (k) kinematic");
    m_textLine += DRAW_STRING_NEW_LINE;
  }

  var /* Body */m_attachment;
  var /* Body */m_platform;
  var /* float32 */m_speed;

  return world;
});
