"use strict";

planck.testbed('Breakout', function(testbed) {

  var WIDTH = 20;
  var HEIGHT = 26;

  testbed.width = WIDTH;
  testbed.height = HEIGHT * 1.12;
  testbed.ratio = 32;
  testbed.y = 0;

  testbed.keydown = function() {
    if (testbed.activeKeys.fire) {
      if(state.state == 'gameover') {
        state.initGame();
      } else if (state.state == 'ready') {
        state.startGame();
      }
    }
  };

  var physics = new Physics();
  var state = new State();

  function State() {
    var state = this;

    state.state = '';

    var _score = 0;
    var _combo = 1;
    var _time = 0;
    var _createRowTime = 0;
    var _fullPaddleTime = 0;
    var _balls = [];
    var _bricks = [];
    var _drops = [];

    function updateStatus() {
      if (state.state == 'gameover') {
        testbed.status('Gameover!');
        testbed.status('Score', _score);

      } else if (state.state == 'ready') {
        testbed.status('Ready!');
        testbed.status('Score', _score);

      } else {
        testbed.status('');
        testbed.status('Score', _score);
      }
    }

    function paddleSpeed() {
      return 18;
    }

    function dropSpeed() {
      return -6;
    }

    function ballSpeed() {
      return (13 + _score * 0.05) * 0.7;
    }

    function createRowTime() {
      return Math.max(8000 - 20 * _score, 1000);
    }

    function resetPaddleTime() {
      return 7500;
    }

    function addBall(ball) {
      _balls.push(ball);
      ball.speed = ballSpeed();
      physics.addBall(ball);
    }

    function miniPaddle() {
      physics.miniPaddle();
    }

    function fullPaddle() {
      physics.fullPaddle();
    }

    function addDrop(drop) {
      _drops.push(drop);
      physics.addDrop(drop);
    }

    function createDrop(brick) {
      var random = Math.random();
      if (random < 0.06) {
        addDrop({i: brick.i, j: brick.j, type: '+', speed : dropSpeed()});
      } else if (random < 0.1) {
        addDrop({i: brick.i, j: brick.j, type: '-', speed : dropSpeed()});
      }
    }

    function addBrick(brick) {
      _bricks.push(brick);
      physics.addBrick(brick);
    }

    function createRow() {
      _createRowTime = _time + createRowTime();

      var gameover = false;
      _bricks.forEach(function(brick) {
        brick.j++;
        physics.updateBrick(brick);
        gameover = gameover | brick >= 10;
      });

      for (var i = 0; i < 7; i++) {
        if (Math.random() < 0.1) {
          continue;
        }
        var one = _score + 1, four = Math.max(0, _score * 1.1 - 60);
        if (Math.random() < one / (four + one)) {
          addBrick({type: 'normal', i: i, j: 0});
        } else {
          addBrick({type: 'small', i: i - 0.25, j: -0.25});
          addBrick({type: 'small', i: i + 0.25, j: -0.25});
          addBrick({type: 'small', i: i - 0.25, j: +0.25});
          addBrick({type: 'small', i: i + 0.25, j: +0.25});
        }
      }

      if (gameover) {
        endGame();
      }
    }

    testbed.step = function(t) {
      _time += t = Math.min(t, 50);


      if (state.state !== 'playing' && state.state !== 'ready') {
        return;
      }

      if (testbed.activeKeys.left && !testbed.activeKeys.right) {
        physics.movePaddle(-paddleSpeed() * t / 1000);

      } else if (!testbed.activeKeys.left && testbed.activeKeys.right) {
        physics.movePaddle(+paddleSpeed() * t / 1000);
      }

      if (state.state !== 'playing') {
        return;
      }

      if (_createRowTime && _time > _createRowTime) {
        _createRowTime = 0;
        createRow();
      }

      if (_fullPaddleTime && _time > _fullPaddleTime) {
        _fullPaddleTime = 0;
        fullPaddle();
      }

      physics.tick(t);
    };

    state.hitBrick = function(brick) {
      if (!removeFromArray(_bricks, brick)) return;
      physics.removeBrick(brick);

      !_bricks.length && createRow();
      _score += _combo;
      // _combo++;
      updateStatus();
      createDrop(brick);
    };

    state.hitBall = function() {
      // _combo = 1;
    };

    state.missBall = function(ball) {
      if (!removeFromArray(_balls, ball)) return;
      physics.removeBall(ball);

      if (!_balls.length) {
        endGame();
      }
    };

    state.catchDrop = function(drop) {
      if (!removeFromArray(_drops, drop)) return;
      physics.removeDrop(drop);

      if (drop.type == '+') {
        addBall({});
      } else if (drop.type == '-') {
        _fullPaddleTime = _time + resetPaddleTime();
        miniPaddle();
      }
    };

    state.missDrop = function(drop) {
      if (!removeFromArray(_drops, drop)) return;
      physics.removeDrop(drop);
    };

    function endGame() {
      state.state = 'gameover';
      updateStatus();
      physics.endGame();
    }

    state.startGame = function() {
      state.initGame();
      physics.startGame();
      state.state = 'playing';
    };

    state.initGame = function() {
      if (state.state == 'ready') return;
      state.state = 'ready';
      _score = 0;
      _combo = 1;
      _createRowTime = 0;
      _fullPaddleTime = 0;
      physics.initGame();
      addBall({});
      createRow();
      createRow();
      createRow();
      updateStatus();
    };
  }

  function Physics() {
    var pl = planck, Vec2 = pl.Vec2;

    var world = this.world = new pl.World();

    var bottomWall, paddle, balls = [], bricks = [], drops = [];

    var BALL = 1, WALL = 2, BRICK = 4, DROP = 8, PADDLE = 16;

    var ballFix = {
      friction: 0.0,
      restitution: 1.0,
      filterCategoryBits: BALL,
      filterMaskBits: PADDLE | WALL | BRICK
    };

    var paddleFix = {filterCategoryBits: PADDLE, filterMaskBits: BALL | DROP};
    var wallFix = {filterCategoryBits: WALL, filterMaskBits: BALL | DROP};
    var brickFix = {filterCategoryBits: BRICK, filterMaskBits: BALL};
    var dropFix = {filterCategoryBits: DROP, filterMaskBits: PADDLE | WALL};

    var ballShape = pl.Circle(0.5);
    var normalBrickShape = pl.Box(1.9 / 2, 1.9 / 2);
    var smallBrickShape = pl.Box(0.9 / 2, 0.9 / 2);

    var fullPaddleShape = pl.Polygon([
      Vec2(1.7, -0.2),
      Vec2(1.8, -0.1),
      Vec2(1.8, 0.1),
      Vec2(1.7, 0.2),
      Vec2(1.2, 0.4),
      Vec2(0.4, 0.6),
      Vec2(-0.4, 0.6),
      Vec2(-1.2, 0.4),
      Vec2(-1.7, 0.2),
      Vec2(-1.8, 0.1),
      Vec2(-1.8, -0.1),
      Vec2(-1.7, -0.2)
    ]);
    fullPaddleShape.paddleWidth = 3.6;

    var miniPaddleShape = pl.Polygon([
      Vec2(1.2, -0.1),
      Vec2(1.2, 0.1),
      Vec2(0.9, 0.4),
      Vec2(0.2, 0.6),
      Vec2(-0.2, 0.6),
      Vec2(-0.9, 0.4),
      Vec2(-1.2, 0.1),
      Vec2(-1.2, -0.1)
    ]);
    miniPaddleShape.paddleWidth = 2.4;

    world.on('pre-solve', function(contact) {
      var fA = contact.getFixtureA(), bA = fA.getBody();
      var fB = contact.getFixtureB(), bB = fB.getBody();

      var ball = bA.isBall && bA || bB.isBall && bB;
      var brick = bA.isBrick && bA || bB.isBrick && bB;
      var bottom = bA.isBottom && bA || bB.isBottom && bB;
      var paddle = bA.isPaddle && bA || bB.isPaddle && bB;
      var drop = bA.isDrop && bA || bB.isDrop && bB;

      // do not change world immediately
      setTimeout(function() {
        if (ball && brick) {
          state.hitBrick(brick.getUserData());

        } else if (ball && bottom) {
          state.missBall(ball.getUserData());

        } else if (ball && paddle) {
          state.hitBall(ball.getUserData());

        } else if (drop && paddle) {
          state.catchDrop(drop.getUserData());

        } else if (drop && bottom) {
          state.missDrop(drop.getUserData());
        }
      }, 1);
    });

    function createWorld() {

      world.createBody(Vec2(+9, -0.5))
        .createFixture(pl.Edge(Vec2(0, -12.5), Vec2(0, +11.5)), wallFix);

      world.createBody(Vec2(-9, -0.5))
        .createFixture(pl.Edge(Vec2(0, -12.5), Vec2(0, +11.5)), wallFix);

      world.createBody(Vec2(0, +12))
        .createFixture(pl.Edge(Vec2(-8, 0), Vec2(+8, 0)), wallFix);

      world.createBody(Vec2(9, 12))
        .createFixture(pl.Edge(Vec2(-1, 0), Vec2(0, -1)), wallFix);

      world.createBody(Vec2(-9, 12))
        .createFixture(pl.Edge(Vec2(1, 0), Vec2(0, -1)), wallFix);

      bottomWall = world.createBody(Vec2(0, -13));
      bottomWall.createFixture(pl.Edge(Vec2(-9, 0), Vec2(+9, 0)), wallFix);
      bottomWall.isBottom = true;
    }

    function createPaddle(shape) {
      var p, v;
      if (paddle) {
        p = paddle.getPosition();
        v = paddle.getLinearVelocity();
        world.destroyBody(paddle);
      }

      paddle = world.createKinematicBody({
        position: Vec2(0, -10.5)
      });
      paddle.paddleWidth = shape.paddleWidth;
      paddle.createFixture(shape, paddleFix);
      paddle.isPaddle = true;

      p && paddle.setPosition(p);
      v && paddle.setLinearVelocity(v);
    }

    function createBall(pos) {
      var body = world.createDynamicBody({
        bullet: true,
        angle: Math.random() * Math.PI * 2,
        position: pos
      });
      body.createFixture(ballShape, ballFix);
      body.isBall = true;
      balls.push(body);
      return body;
    }

    function createBrick(shape, pos) {
      var body = world.createBody(pos);
      body.createFixture(shape, brickFix);
      body.isBrick = true;
      bricks.push(body);
      return body;
    }

    function createDrop(type) {
      var body = world.createDynamicBody();
      if (type == '+') {
        body.createFixture(pl.Box(0.08, 0.32), dropFix);
        body.createFixture(pl.Box(0.32, 0.08), dropFix);
      } else if (type == '-') {
        body.createFixture(pl.Box(0.3, 0.1), dropFix);
      } else {
        body.createFixture(pl.Circle(0.3), dropFix);
      }
      body.isDrop = true;
      drops.push(body);
      return body;
    }

    this.removeDrop = function(drop) {
      if (!removeFromArray(drops, drop.body)) return;
      world.destroyBody(drop.body);
    };

    this.removeBrick = function(brick) {
      if (!removeFromArray(bricks, brick.body)) return;
      world.destroyBody(brick.body);
    };

    this.removeBall = function(ball) {
      if (!removeFromArray(balls, ball.body)) return;
      world.destroyBody(ball.body);
    };

    this.updateBrick = function(brick) {
      brick.body.setPosition(Vec2((brick.i - 3) * 2, 9 - brick.j * 2));
    };

    this.addBrick = function(brick) {
      var shape = brick.type == 'small' ? smallBrickShape : normalBrickShape;
      var pos = Vec2((brick.i - 3) * 2, 9 - brick.j * 2);
      var body = brick.body = createBrick(shape, pos);
      body.setUserData(brick);
    };

    this.addDrop = function(drop) {
      var body = drop.body = createDrop(drop.type);
      body.setUserData(drop);
      body.setPosition(Vec2((drop.i - 3) * 2, 9 - drop.j * 2));
      body.setLinearVelocity(Vec2(0, drop.speed));
    };

    this.addBall = function(ball) {
      var body = ball.body = createBall();
      body.setUserData(ball);

      var oldball = balls[0];
      if (oldball) {
        body.setPosition(oldball.getPosition());
        body.setLinearVelocity(Vec2(oldball.getLinearVelocity()).mul(-1));
      } else {
        body.setPosition(Vec2(0, -5));
      }
    };

    this.miniPaddle = function() {
      createPaddle(miniPaddleShape);
    };

    this.fullPaddle = function() {
      createPaddle(fullPaddleShape);
    };

    this.movePaddle = function(dir) {
      var p = paddle.getPosition();
      p = Vec2(dir, 0).add(p);
      p.x = Math.min(9 - paddle.paddleWidth / 2, Math.max(-(9 - paddle.paddleWidth / 2), p.x))
      paddle.setPosition(p);
    };

    this.tick = function(t) {
    };

    this.endGame = function() {
      world.destroyBody(paddle);
    };

    this.startGame = function() {
      var ball = balls[0];
      var a = Math.PI * Math.random() * 0.4 - 0.2;
      var speed = ball.getUserData().speed;
      ball.setLinearVelocity(Vec2(speed * Math.sin(a), speed * Math.cos(a)));
    };

    this.initGame = function() {
      balls.forEach(function(body) {
        world.destroyBody(body);
      });

      bricks.forEach(function(body) {
        world.destroyBody(body);
      });

      drops.forEach(function(body) {
        world.destroyBody(body);
      });
      createPaddle(fullPaddleShape);
    };

    createWorld();
  }

  state.initGame();

  function removeFromArray(array, item) {
    var i = array.indexOf(item);
    if (i == -1) {
      return false;
    } else {
      array.splice(i, 1);
      return true;
    }
  }

  return physics.world;
});
