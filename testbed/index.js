var planck = require('../lib/');
var Stage = require('stage-js/platform/web');

module.exports = planck;

// x, y, width, height: camera position
// hz, speed: frequency and speed of simulation
// background: background color
// step: function, is always called
// paint: function, is called only after repaint

planck.testbed = function(opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = null;
  }

  Stage(function(stage, canvas) {

    stage.on(Stage.Mouse.START, function() {
      window.focus();
      document.activeElement && document.activeElement.blur();
      canvas.focus();
    });

    stage.MAX_ELAPSE = 1000 / 30;
    var Vec2 = planck.Vec2;

    var testbed = {};
    testbed.canvas = canvas;

    var paused = false;
    stage.on('resume', function() {
      paused = false;
      testbed._resume && testbed._resume();
    });
    stage.on('pause', function() {
      paused = true;
      testbed._pause && testbed._pause();
    });
    testbed.isPaused = function() {
      return paused;
    };
    testbed.togglePause = function() {
      paused ? testbed.resume() : testbed.pause();
    };
    testbed.pause = function() {
      stage.pause();
    };
    testbed.resume = function() {
      stage.resume();
      testbed.focus();
    };
    testbed.focus = function() {
      document.activeElement && document.activeElement.blur();
      canvas.focus();
    };

    testbed.debug = false;
    testbed.width = 80;
    testbed.height = 60;
    testbed.x = 0;
    testbed.y = -10;
    testbed.scaleY = -1;
    testbed.ratio = 16;
    testbed.hz = 60;
    testbed.speed = 1;
    testbed.activeKeys = {};
    testbed.background = '#222222';

    var statusText = '';
    var statusMap = {};

    function statusSet(name, value) {
      if (typeof value !== 'function' && typeof value !== 'object') {
        statusMap[name] = value;
      }
    }

    function statusMerge(obj) {
      for (var key in obj) {
        statusSet(key, obj[key]);
      }
    }

    testbed.status = function(a, b) {
      if (typeof b !== 'undefined') {
        statusSet(a, b);
      } else if (a && typeof a === 'object') {
        statusMerge(a);
      } else if (typeof a === 'string') {
        statusText = a;
      }

      testbed._status && testbed._status(statusText, statusMap);
    };

    testbed.info = function(text) {
      testbed._info && testbed._info(text);
    };

    var lastDrawHash = "", drawHash = "";

    (function() {
      var drawingTexture = new Stage.Texture();
      stage.append(Stage.image(drawingTexture));

      var buffer = [];
      stage.tick(function() {
        buffer.length = 0;
      }, true);

      drawingTexture.draw = function(ctx) {
        ctx.save();
        ctx.transform(1, 0, 0, testbed.scaleY, -testbed.x, -testbed.y);
        ctx.lineWidth = 2  / testbed.ratio;
        ctx.lineCap = 'round';
        for (var drawing = buffer.shift(); drawing; drawing = buffer.shift()) {
          drawing(ctx, testbed.ratio);
        }
        ctx.restore();
      };

      testbed.drawPoint = function(p, r, color) {
        buffer.push(function (ctx, ratio) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5  / ratio, 0, 2 * Math.PI);
          ctx.strokeStyle = color;
          ctx.stroke();
        });
        drawHash += "point" + p.x + ',' + p.y + ',' + r + ',' + color;
      };

      testbed.drawCircle = function(p, r, color) {
        buffer.push(function (ctx) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
          ctx.strokeStyle = color;
          ctx.stroke();
        });
        drawHash += "circle" + p.x + ',' + p.y + ',' + r + ',' + color;
      };

      testbed.drawSegment = function(a, b, color) {
        buffer.push(function (ctx) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = color;
          ctx.stroke();
        });
        drawHash += "segment" + a.x + ',' + a.y + ',' + b.x + ',' + b.y + ',' + color;
      };

      testbed.drawPolygon = function(points, color) {
        if (!points || !points.length) {
          return;
        }
        buffer.push(function (ctx) {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          for (var i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
          }
          ctx.strokeStyle = color;
          ctx.closePath();
          ctx.stroke();
        });
        drawHash += "segment";
        for (var i = 1; i < points.length; i++) {
          drawHash += points[i].x + ',' + points[i].y + ',';
        }
        drawHash += color;
      };

      testbed.drawAABB = function(aabb, color) {
        buffer.push(function (ctx) {
          ctx.beginPath();
          ctx.moveTo(aabb.lowerBound.x, aabb.lowerBound.y);
          ctx.lineTo(aabb.upperBound.x, aabb.lowerBound.y);
          ctx.lineTo(aabb.upperBound.x, aabb.upperBound.y);
          ctx.lineTo(aabb.lowerBound.x, aabb.upperBound.y);
          ctx.strokeStyle = color;
          ctx.closePath();
          ctx.stroke();
        });
        drawHash += "aabb";
        drawHash += aabb.lowerBound.x + ',' + aabb.lowerBound.y + ',';
        drawHash += aabb.upperBound.x + ',' + aabb.upperBound.y + ',';
        drawHash += color;
      };

      testbed.color = function(r, g, b) {
        r = r * 256 | 0;
        g = g * 256 | 0;
        b = b * 256 | 0;
        return 'rgb(' + r + ', ' + g + ', ' + b + ')'
      };

    })();

    var world = callback(testbed);

    var viewer = new Viewer(world, testbed);

    var lastX = 0, lastY = 0;
    stage.tick(function(dt, t) {
      // update camera position
      if (lastX !== testbed.x || lastY !== testbed.y) {
        viewer.offset(-testbed.x, -testbed.y);
        lastX = testbed.x, lastY = testbed.y;
      }
    });

    viewer.tick(function(dt, t) {
      // call testbed step, if provided
      if (typeof testbed.step === 'function') {
        testbed.step(dt, t);
      }

      if (targetBody) {
        testbed.drawSegment(targetBody.getPosition(), mouseMove, 'rgba(255,255,255,0.2)');
      }

      if (lastDrawHash !== drawHash) {
        lastDrawHash = drawHash;
        stage.touch();
      }
      drawHash = "";

      return true;
    });

    // stage.empty();
    stage.background(testbed.background);
    stage.viewbox(testbed.width, testbed.height);
    stage.pin('alignX', -0.5);
    stage.pin('alignY', -0.5);
    stage.prepend(viewer);

    function findBody(point) {
      var body;
      var aabb = planck.AABB(point, point);
      world.queryAABB(aabb, function(fixture) {
        if (body) {
          return;
        }
        if (!fixture.getBody().isDynamic() || !fixture.testPoint(point)) {
          return;
        }
        body = fixture.getBody();
        return true;
      });
      return body;
    }

    var mouseGround = world.createBody();
    var mouseJoint;

    var targetBody;
    var mouseMove = {x:0, y:0};

    viewer.attr('spy', true).on(Stage.Mouse.START, function(point) {
      point = { x: point.x, y: testbed.scaleY * point.y };
      if (targetBody) {
        return;
      }

      var body = findBody(point);
      if (!body) {
        return;
      }

      if (testbed.mouseForce) {
        targetBody = body;

      } else {
        mouseJoint = planck.MouseJoint({maxForce: 1000}, mouseGround, body, Vec2(point));
        world.createJoint(mouseJoint);
      }

    }).on(Stage.Mouse.MOVE, function(point) {
      point = { x: point.x, y: testbed.scaleY * point.y };
      if (mouseJoint) {
        mouseJoint.setTarget(point);
      }

      mouseMove.x = point.x;
      mouseMove.y = point.y;
    }).on(Stage.Mouse.END, function(point) {
      point = { x: point.x, y: testbed.scaleY * point.y };
      if (mouseJoint) {
        world.destroyJoint(mouseJoint);
        mouseJoint = null;
      }
      if (targetBody) {
        var force = Vec2.sub(point, targetBody.getPosition());
        targetBody.applyForceToCenter(force.mul(testbed.mouseForce), true);
        targetBody = null;
      }

    }).on(Stage.Mouse.CANCEL, function(point) {
      point = { x: point.x, y: testbed.scaleY * point.y };
      if (mouseJoint) {
        world.destroyJoint(mouseJoint);
        mouseJoint = null;
      }
      if (targetBody) {
        targetBody = null;
      }
    });

    window.addEventListener("keydown", function(e) {
      switch (e.keyCode) {
        case 'P'.charCodeAt(0):
          testbed.togglePause();
          break;
      }
    }, false);

    var downKeys = {};
    window.addEventListener("keydown", function(e) {
      var keyCode = e.keyCode;
      downKeys[keyCode] = true;
      updateActiveKeys(keyCode, true);
      testbed.keydown && testbed.keydown(keyCode, String.fromCharCode(keyCode));
    });
    window.addEventListener("keyup", function(e) {
      var keyCode = e.keyCode;
      downKeys[keyCode] = false;
      updateActiveKeys(keyCode, false);
      testbed.keyup && testbed.keyup(keyCode, String.fromCharCode(keyCode));
    });

    var activeKeys = testbed.activeKeys;
    function updateActiveKeys(keyCode, down) {
      var char = String.fromCharCode(keyCode)
      if (/\w/.test(char)) {
        activeKeys[char] = down;
      }
      activeKeys.right = downKeys[39] || activeKeys['D'];
      activeKeys.left = downKeys[37] || activeKeys['A'];
      activeKeys.up = downKeys[38] || activeKeys['W'];
      activeKeys.down = downKeys[40] || activeKeys['S'];
      activeKeys.fire = downKeys[32] || downKeys[13] ;
    }

  });

};

Viewer._super = Stage;
Viewer.prototype = Stage._create(Viewer._super.prototype);

function Viewer(world, opts) {
  Viewer._super.call(this);
  this.label('Planck');

  opts = opts || {};

  var options = this._options = {};
  this._options.speed = opts.speed || 1;
  this._options.hz = opts.hz || 60;
  if (Math.abs(this._options.hz) < 1) {
    this._options.hz = 1 / this._options.hz;
  }
  this._options.scaleY = opts.scaleY || -1;
  this._options.ratio = opts.ratio || 16;
  this._options.lineWidth = 2 / this._options.ratio;

  this._world = world;

  var timeStep = 1 / this._options.hz;
  var elapsedTime = 0;
  this.tick(function(dt) {
    dt = dt * 0.001 * options.speed;
    elapsedTime += dt;
    while (elapsedTime > timeStep) {
      world.step(timeStep);
      elapsedTime -= timeStep;
    }
    this.renderWorld();
    return true;
  }, true);

  world.on('remove-fixture', function (obj) {
    obj.ui && obj.ui.remove();
  });

  world.on('remove-joint', function (obj) {
    obj.ui && obj.ui.remove();
  });
}

Viewer.prototype.renderWorld = function(world) {
  var world = this._world;
  var options = this._options;
  var viewer = this;

  for (var b = world.getBodyList(); b; b = b.getNext()) {
    for (var f = b.getFixtureList(); f; f = f.getNext()) {

      if (!f.ui) {
        if (f.render && f.render.stroke) {
          options.strokeStyle = f.render.stroke;
        } else if (b.render && b.render.stroke) {
          options.strokeStyle = b.render.stroke;
        } else if (b.isDynamic()) {
          options.strokeStyle = 'rgba(255,255,255,0.9)';
        } else if (b.isKinematic()) {
          options.strokeStyle = 'rgba(255,255,255,0.7)';
        } else if (b.isStatic()) {
          options.strokeStyle = 'rgba(255,255,255,0.5)';
        }

        if (f.render && f.render.fill) {
          options.fillStyle = f.render.fill;
        } else if (b.render && b.render.fill) {
          options.fillStyle = b.render.fill;
        } else {
          options.fillStyle = '';
        }

        var type = f.getType();
        var shape = f.getShape();
        if (type == 'circle') {
          f.ui = viewer.drawCircle(shape, options);
        }
        if (type == 'edge') {
          f.ui = viewer.drawEdge(shape, options);
        }
        if (type == 'polygon') {
          f.ui = viewer.drawPolygon(shape, options);
        }
        if (type == 'chain') {
          f.ui = viewer.drawChain(shape, options);
        }

        if (f.ui) {
          f.ui.appendTo(viewer);
        }
      }

      if (f.ui) {
        var p = b.getPosition(), r = b.getAngle();
        if (f.ui.__lastX !== p.x || f.ui.__lastY !== p.y || f.ui.__lastR !== r) {
          f.ui.__lastX = p.x;
          f.ui.__lastY = p.y;
          f.ui.__lastR = r;
          f.ui.offset(p.x, options.scaleY * p.y);
          f.ui.rotate(options.scaleY * r);
        }
      }

    }
  }

  for (var j = world.getJointList(); j; j = j.getNext()) {
    var type = j.getType();
    var a = j.getAnchorA();
    var b = j.getAnchorB();

    if (!j.ui) {
      options.strokeStyle = 'rgba(255,255,255,0.2)';

      j.ui = viewer.drawJoint(j, options);
      j.ui.pin('handle', 0.5);
      if (j.ui) {
        j.ui.appendTo(viewer);
      }
    }

    if (j.ui) {
      var cx = (a.x + b.x) * 0.5;
      var cy = options.scaleY * (a.y + b.y) * 0.5;
      var dx = a.x - b.x;
      var dy = options.scaleY * (a.y - b.y);
      var d = Math.sqrt(dx * dx + dy * dy);
      j.ui.width(d);
      j.ui.rotate(Math.atan2(dy, dx));
      j.ui.offset(cx, cy);
    }
  }

}

Viewer.prototype.drawJoint = function(joint, options) {
  var lw = options.lineWidth;
  var ratio = options.ratio;

  var length = 10;

  var texture = Stage.canvas(function(ctx) {

    this.size(length + 2 * lw, 2 * lw, ratio);

    ctx.scale(ratio, ratio);
    ctx.beginPath();
    ctx.moveTo(lw, lw);
    ctx.lineTo(lw + length, lw);

    ctx.lineCap = 'round';
    ctx.lineWidth = options.lineWidth;
    ctx.strokeStyle = options.strokeStyle;
    ctx.stroke();
  });

  var image = Stage.image(texture).stretch();
  return image;
};

Viewer.prototype.drawCircle = function(shape, options) {
  var lw = options.lineWidth;
  var ratio = options.ratio;

  var r = shape.m_radius;
  var cx = r + lw;
  var cy = r + lw;
  var w = r * 2 + lw * 2;
  var h = r * 2 + lw * 2;

  var texture = Stage.canvas(function(ctx) {

    this.size(w, h, ratio);

    ctx.scale(ratio, ratio);
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    if (options.fillStyle) {
      ctx.fillStyle = options.fillStyle;
      ctx.fill();
    }
    ctx.lineTo(cx, cy);
    ctx.lineWidth = options.lineWidth;
    ctx.strokeStyle = options.strokeStyle;
    ctx.stroke();
  });
  var image = Stage.image(texture)
    .offset(shape.m_p.x - cx, options.scaleY * shape.m_p.y - cy);
  var node = Stage.create().append(image);
  return node;
};

Viewer.prototype.drawEdge = function(edge, options) {
  var lw = options.lineWidth;
  var ratio = options.ratio;

  var v1 = edge.m_vertex1;
  var v2 = edge.m_vertex2;

  var dx = v2.x - v1.x;
  var dy = v2.y - v1.y;

  var length = Math.sqrt(dx * dx + dy * dy);

  var texture = Stage.canvas(function(ctx) {

    this.size(length + 2 * lw, 2 * lw, ratio);

    ctx.scale(ratio, ratio);
    ctx.beginPath();
    ctx.moveTo(lw, lw);
    ctx.lineTo(lw + length, lw);

    ctx.lineCap = 'round';
    ctx.lineWidth = options.lineWidth;
    ctx.strokeStyle = options.strokeStyle;
    ctx.stroke();
  });

  var minX = Math.min(v1.x, v2.x);
  var minY = Math.min(options.scaleY * v1.y, options.scaleY * v2.y);

  var image = Stage.image(texture);
  image.rotate(options.scaleY * Math.atan2(dy, dx));
  image.offset(minX - lw, minY - lw);
  var node = Stage.create().append(image);
  return node;
};

Viewer.prototype.drawPolygon = function(shape, options) {
  var lw = options.lineWidth;
  var ratio = options.ratio;

  var vertices = shape.m_vertices;

  if (!vertices.length) {
    return;
  }

  var minX = Infinity, minY = Infinity;
  var maxX = -Infinity, maxY = -Infinity;
  for (var i = 0; i < vertices.length; ++i) {
    var v = vertices[i];
    minX = Math.min(minX, v.x);
    maxX = Math.max(maxX, v.x);
    minY = Math.min(minY, options.scaleY * v.y);
    maxY = Math.max(maxY, options.scaleY * v.y);
  }

  var width = maxX - minX;
  var height = maxY - minY;

  var texture = Stage.canvas(function(ctx) {

    this.size(width + 2 * lw, height + 2 * lw, ratio);

    ctx.scale(ratio, ratio);
    ctx.beginPath();
    for (var i = 0; i < vertices.length; ++i) {
      var v = vertices[i];
      var x = v.x - minX + lw;
      var y = options.scaleY * v.y - minY + lw;
      if (i == 0)
        ctx.moveTo(x, y);
      else
        ctx.lineTo(x, y);
    }

    if (vertices.length > 2) {
      ctx.closePath();
    }

    if (options.fillStyle) {
      ctx.fillStyle = options.fillStyle;
      ctx.fill();
      ctx.closePath();
    }

    ctx.lineCap = 'round';
    ctx.lineWidth = options.lineWidth;
    ctx.strokeStyle = options.strokeStyle;
    ctx.stroke();
  });

  var image = Stage.image(texture);
  image.offset(minX - lw, minY - lw);
  var node = Stage.create().append(image);
  return node;
};

Viewer.prototype.drawChain = function(shape, options) {
  var lw = options.lineWidth;
  var ratio = options.ratio;

  var vertices = shape.m_vertices;

  if (!vertices.length) {
    return;
  }

  var minX = Infinity, minY = Infinity;
  var maxX = -Infinity, maxY = -Infinity;
  for (var i = 0; i < vertices.length; ++i) {
    var v = vertices[i];
    minX = Math.min(minX, v.x);
    maxX = Math.max(maxX, v.x);
    minY = Math.min(minY, options.scaleY * v.y);
    maxY = Math.max(maxY, options.scaleY * v.y);
  }

  var width = maxX - minX;
  var height = maxY - minY;

  var texture = Stage.canvas(function(ctx) {

    this.size(width + 2 * lw, height + 2 * lw, ratio);

    ctx.scale(ratio, ratio);
    ctx.beginPath();
    for (var i = 0; i < vertices.length; ++i) {
      var v = vertices[i];
      var x = v.x - minX + lw;
      var y = options.scaleY * v.y - minY + lw;
      if (i == 0)
        ctx.moveTo(x, y);
      else
        ctx.lineTo(x, y);
    }

    // TODO: if loop
    if (vertices.length > 2) {
      // ctx.closePath();
    }

    if (options.fillStyle) {
      ctx.fillStyle = options.fillStyle;
      ctx.fill();
      ctx.closePath();
    }

    ctx.lineCap = 'round';
    ctx.lineWidth = options.lineWidth;
    ctx.strokeStyle = options.strokeStyle;
    ctx.stroke();
  });

  var image = Stage.image(texture);
  image.offset(minX - lw, minY - lw);
  var node = Stage.create().append(image);
  return node;
};
