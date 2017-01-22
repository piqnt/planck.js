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
    opts.keydown && opts.keydown(keyCode, String.fromCharCode(keyCode));
  });
  window.addEventListener("keyup", function(e) {
    var keyCode = e.keyCode;
    downKeys[keyCode] = false;
    updateActiveKeys(keyCode, false);
    opts.keyup && opts.keyup(keyCode, String.fromCharCode(keyCode));
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

  var opts = {};
  function run(fn) {
    if (!fn) {
      return;
    }

    stage.empty();

    document.activeElement && document.activeElement.blur();
    canvas.focus();

    // codefld.innerHTML = fn + "";
    status.innerText = '';

    opts = {};
    opts.debug = debug;
    opts.width = 80;
    opts.height = 60;
    opts.pin = {};
    opts.activeKeys = activeKeys;

    opts.status = function(text) {
      status.innerText = text;
    }

    world = fn(planck, opts);
    stage.viewbox(opts.width, opts.height);
    stage.pin('alignX', -0.5);
    stage.pin('alignY', -0.7);
    stage.pin(opts.pin);

    viewer = new Stage.Planck(world, opts);
    if (opts.step) {
      viewer.tick(opts.step);
    }
    viewer.scale(1, -1);
    stage.append(viewer);

    // viewer.timeout(pausePlay, 20000);

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
