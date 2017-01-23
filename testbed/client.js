(function() {

  var world, viewer;
  var stage, paused = false;
  var debug = false;

  var canvas = document.getElementById('stage');

  var playbtn = document.getElementById('playbtn');
  playbtn.onclick = togglePlay;

  var tickbtn = document.getElementById('tickbtn');
  tickbtn.onclick = tickPlay;

  // var reloadbtn = document.getElementById('reloadbtn');
  // reloadbtn.onclick = function() {
  //   select();
  // };

  // var codefld = document.getElementById('code');
  // var codebtn = document.getElementById('codebtn');
  // codebtn.onclick = function() {
  //   codefld.classList.toggle('hide');
  //   canvas.classList.toggle('hide');
  //   status.classList.toggle('hide');
  //   playbtn.classList.toggle('hide');
  //   reloadbtn.classList.toggle('hide');
  //   pausePlay();
  // };

  var nextbtn = document.getElementById('nextbtn');
  nextbtn.onclick = function() {
    var index = dropdown.selectedIndex + 1;
    var option = dropdown.options[index % dropdown.options.length];
    window.location = option.value;
    // window.location.hash = option.value;
  };

  var prevbtn = document.getElementById('prevbtn');
  prevbtn.onclick = function() {
    var index = dropdown.selectedIndex + dropdown.options.length - 1;
    var option = dropdown.options[index % dropdown.options.length];
    window.location = option.value;
    // window.location.hash = option.value;
  };

  var dropdown = document.getElementById('dropdown');
  dropdown.onchange = function() {
    var option = this.options[this.selectedIndex];
    var script = option.getAttribute('data-script');
    window.location = option.value;
    // window.location.hash = option.value;
    // loadScript(option.getAttribute('data-script'));
  };

  var status = document.getElementById('status');

  // window.addEventListener("hashchange", function() {
  //   select();
  // });

  window.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
    case 'P'.charCodeAt(0):
      togglePlay();
      break;
    }
  }, false);

  function togglePlay() {
    paused ? resumePlay() : pausePlay();
  }

  function pausePlay() {
    stage.pause();
    paused = true;
    playbtn.className = playbtn.className.replace('fa-pause', 'fa-play');
  }

  function resumePlay() {
    document.activeElement && document.activeElement.blur();
    canvas.focus();
    stage.resume();
    paused = false;
    playbtn.className = playbtn.className.replace('fa-play', 'fa-pause');
    tickPlay();
  }

  function tickPlay() {
    if (debug) {
      world.step(1 / 10);
      viewer.renderWorld();
    }
  }

  // function select(id) {
  //   id = id || window.location.hash.substr(1);
  //   for (var i = 0, l = dropdown.options.length; i < l; i++) {
  //     var el = dropdown.options[i];
  //     if (id == el.getAttribute('value')) {
  //       dropdown.selectedIndex = i;
  //       var url = el.getAttribute('data-script');
  //       url += (url.indexOf('?') >= 0 ? '&' : '?') + Date.now();
  //       // loadScript(url);
  //       break;
  //     }
  //   }
  // }

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

  var activeKeys = {};
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

  var testbed = {};
  function run(fn) {
    if (!fn) {
      return;
    }

    stage.empty();

    document.activeElement && document.activeElement.blur();
    canvas.focus();

    // codefld.innerHTML = fn + "";
    status.innerText = '';

    testbed = {};
    testbed.debug = debug;
    testbed.width = 80;
    testbed.height = 60;
    testbed.x = 0;
    testbed.y = -10;
    testbed.ratio = 16;
    testbed.activeKeys = activeKeys;

    testbed.status = function(text) {
      status.innerText = text;
    };

    world = fn(planck, testbed);
    stage.viewbox(testbed.width, testbed.height);
    stage.pin('alignX', - 0.5);
    stage.pin('alignY', - 0.5);

    viewer = new Stage.Planck(world, testbed);
    if (testbed.step) {
      viewer.tick(testbed.step);
    }
    viewer.scale(1, -1);
    stage.append(viewer);


    // viewer.timeout(pausePlay, 20000);

    (function(){
      stage.tick(function() {
        viewer.offset(-testbed.x, -testbed.y);
        image.offset(-testbed.x, -testbed.y);
      });

      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.width = testbed.width * testbed.ratio * 2;
      canvas.height = testbed.height * testbed.ratio * 2;

      var image = Stage
        .image(new Stage.Texture(canvas, testbed.ratio))
        .pin('handle', 0.5)
        .scale(1, -1)
        .appendTo(stage);

      function getX(x) {
        return (x + testbed.width) * testbed.ratio;
      }

      function getY(y) {
        return (y + testbed.height) * testbed.ratio;
      }

      testbed.drawPoint = function(p, r, color) {
        context.beginPath();
        context.arc(getX(p.x), getY(p.y), r, 0, 2 * Math.PI);
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.stroke();
        image.touch();
      };

      testbed.drawCircle = function(p, r, color) {
        context.beginPath();
        context.arc(getX(p.x), getY(p.y), r * testbed.ratio, 0, 2 * Math.PI);
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.stroke();
        image.touch();
      };

      testbed.drawSegment = function(a, b, color) {
        context.beginPath();
        context.moveTo(getX(a.x), getY(a.y));
        context.lineTo(getX(b.x), getY(b.y));
        context.strokeStyle = color;
        context.lineCap = 'round';
        context.lineWidth = 2;
        context.stroke();
        image.touch();
      };

      testbed.drawPolygon = function(points, color) {
        if (!points || !points.length) {
          return;
        }
        context.beginPath();
        context.moveTo(getX(points[0].x), getY(points[0].y));
        for (var i = 1; i < points.length; i++) {
          context.lineTo(getX(points[i].x), getY(points[i].y));
        }
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.closePath();
        context.stroke();
        image.touch();
      };

      testbed.drawAABB = function(aabb) {
        context.beginPath();
        context.moveTo(getX(aabb.lowerBound.x), getY(aabb.lowerBound.y));
        context.lineTo(getX(aabb.upperBound.x), getY(aabb.lowerBound.y));
        context.lineTo(getX(aabb.upperBound.x), getY(aabb.upperBound.y));
        context.lineTo(getX(aabb.lowerBound.x), getY(aabb.upperBound.y));
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.closePath();
        context.stroke();
        image.touch();
      };

      testbed.color = function(r, g, b) {
        return 'rgb(' + (r * 256 | 0) + ', ' + (g * 256 | 0) + ', ' + (b * 256 | 0) + ')'
      };

      stage.tick(function() {
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
      }, true)
    })();


    var mouseGround = world.createBody();
    var mouseJoint;
    viewer.attr('spy', true).on(Stage.Mouse.START, function(point) {
      if (mouseJoint) {
        return;
      }
      var aabb = new planck.AABB(point, point);
      world.queryAABB(aabb, function(fixture) {
        if (mouseJoint) {
          return;
        }
        if (!fixture.getBody().isDynamic() || !fixture.testPoint(point)) {
          return;
        }
        var mouseBody = fixture.getBody();
        mouseJoint = new planck.MouseJoint({
          maxForce : 1000
        }, mouseGround, mouseBody, planck.Vec2(point));
        world.createJoint(mouseJoint);
        return true;
      });

    }).on(Stage.Mouse.MOVE, function(point) {
      if (mouseJoint) {
        mouseJoint.setTarget(point);
      }

    }).on(Stage.Mouse.END, function(point) {
      if (mouseJoint) {
        world.destroyJoint(mouseJoint);
        mouseJoint = null;
      }
    });

    resumePlay();
  }

  // function loadScript(url) {
  //   var parent = document.getElementsByTagName('head')[0]
  //       || document.getElementsByTagName('body')[0];
  //   var script = document.createElement('script');
  //   script.src = url;
  //   parent.appendChild(script);
  // }


  planck.play = function(name, fn) {
    Stage(function(root) {
      stage = root;
      root.MAX_ELAPSE = 100;
      run(fn);
    });
  };

})();
