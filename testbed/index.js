var planck = require('../lib/');
var Stage = require('stage-js/platform/web');

module.exports = planck;

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

    var paused = false;
    testbed.isPaused = function() {
      return paused;
    };
    testbed.togglePause = function() {
      paused ? testbed.play() : testbed.pause();
      stage.pause();
      paused = true;
      testbed._pause();
    };
    testbed.pause = function() {
      stage.pause();
      paused = true;
      testbed._pause();
    };
    testbed.resume = function() {
      paused = false;
      stage.resume();
      testbed.focus();
      testbed._resume();
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
    testbed.ratio = 16;
    testbed.hz = 1 / 60;
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

    (function() {
      stage.tick(function() {
        viewer.offset(-testbed.x, -testbed.y);
        drawingImage.offset(-testbed.x, -testbed.y);
      });

      var drawingCanvas = document.createElement('canvas');
      var drawingContext = drawingCanvas.getContext('2d');

      drawingCanvas.width = testbed.width * testbed.ratio * 2;
      drawingCanvas.height = testbed.height * testbed.ratio * 2;

      var drawingImage = Stage
        .image(new Stage.Texture(drawingCanvas, testbed.ratio))
        .pin('handle', 0.5)
        .scale(1, -1)
        .appendTo(stage);

      function drawX(x) {
        return (x + testbed.width) * testbed.ratio;
      }

      function drawY(y) {
        return (y + testbed.height) * testbed.ratio;
      }

      testbed.drawPoint = function(p, r, color) {
        drawingContext.beginPath();
        drawingContext.arc(drawX(p.x), drawY(p.y), r, 0, 2 * Math.PI);
        drawingContext.strokeStyle = color;
        drawingContext.lineWidth = 2;
        drawingContext.stroke();
        drawingImage.touch();
      };

      testbed.drawCircle = function(p, r, color) {
        drawingContext.beginPath();
        drawingContext.arc(drawX(p.x), drawY(p.y), r * testbed.ratio, 0, 2 * Math.PI);
        drawingContext.strokeStyle = color;
        drawingContext.lineWidth = 2;
        drawingContext.stroke();
        drawingImage.touch();
      };

      testbed.drawSegment = function(a, b, color) {
        drawingContext.beginPath();
        drawingContext.moveTo(drawX(a.x), drawY(a.y));
        drawingContext.lineTo(drawX(b.x), drawY(b.y));
        drawingContext.strokeStyle = color;
        drawingContext.lineCap = 'round';
        drawingContext.lineWidth = 2;
        drawingContext.stroke();
        drawingImage.touch();
      };

      testbed.drawPolygon = function(points, color) {
        if (!points || !points.length) {
          return;
        }
        drawingContext.beginPath();
        drawingContext.moveTo(drawX(points[0].x), drawY(points[0].y));
        for (var i = 1; i < points.length; i++) {
          drawingContext.lineTo(drawX(points[i].x), drawY(points[i].y));
        }
        drawingContext.strokeStyle = color;
        drawingContext.lineWidth = 2;
        drawingContext.closePath();
        drawingContext.stroke();
        drawingImage.touch();
      };

      testbed.drawAABB = function(aabb, color) {
        drawingContext.beginPath();
        drawingContext.moveTo(drawX(aabb.lowerBound.x), drawY(aabb.lowerBound.y));
        drawingContext.lineTo(drawX(aabb.upperBound.x), drawY(aabb.lowerBound.y));
        drawingContext.lineTo(drawX(aabb.upperBound.x), drawY(aabb.upperBound.y));
        drawingContext.lineTo(drawX(aabb.lowerBound.x), drawY(aabb.upperBound.y));
        drawingContext.strokeStyle = color;
        drawingContext.lineWidth = 2;
        drawingContext.closePath();
        drawingContext.stroke();
        drawingImage.touch();
      };

      testbed.color = function(r, g, b) {
        return 'rgb(' + (r * 256 | 0) + ', ' + (g * 256 | 0) + ', ' + (b * 256 | 0) + ')'
      };

      stage.tick(function() {
        drawingContext.save();
        drawingContext.setTransform(1, 0, 0, 1, 0, 0);
        drawingContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
        drawingContext.restore();
      }, true);
    })();

    var world = callback(testbed);

    var viewer = new Viewer(world, testbed);

    viewer.tick(function(dt, t) {
      testbed.step && testbed.step(dt, t);
    });

    viewer.scale(1, -1);

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

    viewer.attr('spy', true).on(Stage.Mouse.START, function(point) {
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
      if (mouseJoint) {
        mouseJoint.setTarget(point);
      }

    }).on(Stage.Mouse.END, function(point) {
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

  this._options = {};
  this._options.speed = opts.speed || 1;
  this._options.hz = opts.hz || (1 / 60);
  this._options.ratio = opts.ratio || 16;
  this._options.lineWidth = 2 / this._options.ratio;

  this._world = world;

  !opts.debug && this.tick(function(dt) {
    world.step(this._options.hz, dt / 1000 * this._options.speed);
    this.renderWorld();
    return false;
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
  var viewer = this;

  for (var b = world.getBodyList(); b; b = b.getNext()) {
    for (var f = b.getFixtureList(); f; f = f.getNext()) {

      if (!f.ui) {
        if (f.render && f.render.stroke) {
          this._options.strokeStyle = f.render.stroke;
        } else if (b.render && b.render.stroke) {
            this._options.strokeStyle = b.render.stroke;
        } else if (b.isDynamic()) {
          this._options.strokeStyle = 'rgba(255,255,255,0.9)';
        } else if (b.isKinematic()) {
          this._options.strokeStyle = 'rgba(255,255,255,0.7)';
        } else if (b.isStatic()) {
          this._options.strokeStyle = 'rgba(255,255,255,0.5)';
        }

        var type = f.getType();
        var shape = f.getShape();
        if (type == 'circle') {
          f.ui = viewer.drawCircle(shape, this._options);
        }
        if (type == 'edge') {
          f.ui = viewer.drawEdge(shape, this._options);
        }
        if (type == 'polygon') {
          f.ui = viewer.drawPolygon(shape, this._options);
        }
        if (type == 'chain') {
          f.ui = viewer.drawChain(shape, this._options);
        }

        if (f.ui) {
          f.ui.appendTo(viewer);
        }
      }

      if (f.ui) {
        f.ui.offset(b.getPosition());
        f.ui.rotate(b.getAngle());
      }

    }
  }

  for (var j = world.getJointList(); j; j = j.getNext()) {
    var type = j.getType();
    var a = j.getAnchorA();
    var b = j.getAnchorB();

    if (!j.ui) {
      this._options.strokeStyle = 'rgba(255,255,255,0.2)';

      j.ui = viewer.drawJoint(j, this._options);
      j.ui.pin('handle', 0.5);
      if (j.ui) {
        j.ui.appendTo(viewer);
      }
    }

    if (j.ui) {
      var cx = (a.x + b.x) * 0.5;
      var cy = (a.y + b.y) * 0.5;
      var dx = a.x - b.x;
      var dy = a.y - b.y;
      var d = Math.sqrt(dx * dx + dy * dy);
      j.ui.width(d)
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
    .offset(shape.m_p.x - cx, shape.m_p.y - cy);
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
  var minY = Math.min(v1.y, v2.y);

  var image = Stage.image(texture);
  image.rotate(Math.atan2(dy, dx));
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
    minY = Math.min(minY, v.y);
    maxY = Math.max(maxY, v.y);
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
      var y = v.y - minY + lw;
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
    minY = Math.min(minY, v.y);
    maxY = Math.max(maxY, v.y);
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
      var y = v.y - minY + lw;
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
