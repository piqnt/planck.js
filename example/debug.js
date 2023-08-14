const planck = window.planck;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
const KeyboardHelper = { left: 37, up: 38, right: 39, down: 40, space: 32 };
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let spacePressed = false;
let spaceHolding = false;
function keyDownHandler(event) {
  if (event.keyCode === KeyboardHelper.space) {
    spacePressed = true;
  }
  if (event.keyCode === KeyboardHelper.right) {
    rightPressed = true;
  }
  if (event.keyCode === KeyboardHelper.left) {
    leftPressed = true;
  }
  if (event.keyCode === KeyboardHelper.up) {
    upPressed = true;
  }
  if (event.keyCode === KeyboardHelper.down) {
    downPressed = true;
    console.log("down pressed");
  }
}
function keyUpHandler(event) {
  if (event.keyCode === KeyboardHelper.space) {
    spacePressed = false;
    spaceHolding = false;
  }
  if (event.keyCode === KeyboardHelper.right) {
    rightPressed = false;
  }
  if (event.keyCode === KeyboardHelper.left) {
    leftPressed = false;
  }
  if (event.keyCode === KeyboardHelper.up) {
    upPressed = false;
  }
  if (event.keyCode === KeyboardHelper.down) {
    downPressed = false;
  }
}

// let characterSprite = PIXI.Sprite.from("./assets/character_64px.png");
// let platform1Sprite = PIXI.Sprite.from("./assets/ground.png");
// let platform2Sprite = PIXI.Sprite.from("./assets/ground.png");
// characterSprite.anchor.set(0.5);
// platform1Sprite.anchor.set(0.5);
// platform2Sprite.anchor.set(0.5);
// app.stage.addChild(characterSprite);
// app.stage.addChild(platform1Sprite);
// app.stage.addChild(platform2Sprite);

let gravity = planck.Vec2(0.0, -10.0);
let world = planck.World({ gravity: gravity });

const testbed = planck.testbed();

let platform1Def = {
  position: planck.Vec2(15.0, 8.0),
};
let platform2Def = {
  position: planck.Vec2(15.0, 12.0),
};
let platform1Body = world.createBody(platform1Def);
let platform2Body = world.createBody(platform2Def);
let groundBox = planck.Box(5.0, 0.5);
let platform1Fix = platform1Body.createFixture(groundBox, 0.0);
let platform2Fix = platform2Body.createFixture(groundBox, 0.0);
let characterBody = world.createBody({
  type: "dynamic",
  fixedRotation: true,
  position: planck.Vec2(9.9, 15.0),
});
let dynamicBox = planck.Box(0.5, 0.5);
let fixtureDef = {
  shape: dynamicBox,
  density: 1.0,
  friction: 0.9,
};
let characterFix = characterBody.createFixture(fixtureDef);

let timeStep = 1 / 60;
let velocityIterations = 8;
let positionIterations = 3;

// This function will be called on each frame update (tick)
function gameLoop(delta) {
  // Step the physics simulation

  world.on("pre-solve", function (contact, oldManifold) {
    if (downPressed) {
      contact.setEnabled(false);
    }
    //console.log("Contact!");
    let fixA = contact.getFixtureA();
    let fixB = contact.getFixtureB();

    let isCharPlatformContact;
    let contactingPlatform;
    if (fixA.m_body.m_type == "static") {
      isCharPlatformContact = true;
      contactingPlatform = fixA;
    }
    if (fixB.m_body.m_type == "static") {
      isCharPlatformContact = true;
      contactingPlatform = fixB;
    }
    if (!isCharPlatformContact) {
      return;
    }

    let p = characterBody.getPosition();

    if (p.y <= contactingPlatform.m_body.c_position.c.y + 1) {
      contact.setEnabled(false);
    }
  });

  world.step(timeStep * delta, velocityIterations, positionIterations);
  //console.log(characterBody.getLinearVelocity());
  if (rightPressed && characterBody.getLinearVelocity().x < 5) {
    characterBody.applyForce(planck.Vec2(70, 0), planck.Vec2(0, 0));
  }
  if (leftPressed && characterBody.getLinearVelocity().x > -5) {
    //console.log("pressing right");
    characterBody.applyForce(planck.Vec2(-70, 0), planck.Vec2(0, 0));
  }
  if (spacePressed && !spaceHolding) {
    characterBody.applyLinearImpulse(planck.Vec2(0, 7), planck.Vec2(0, 0));
    //console.log("applied impulse");
    spaceHolding = true;
  }

  // Update the sprite position based on the physics body position
  let characterPosition = characterBody.getPosition();
  let characterAngle = characterBody.getAngle();
  // let pixiCharacterPos = plankPositionToPixi(characterPosition);
  // let platform1Pos = plankPositionToPixi(platform1Body.getPosition());
  // let platform2Pos = plankPositionToPixi(platform2Body.getPosition());
  /* console.log(
    "ground pos:",
    groundBody.getPosition(),
    "ground location:",
    groundPos
  );
  console.log(
    "character pos:",
    characterPosition,
    "character location:",
    pixiCharacterPos
  ); */

  // characterSprite.position.set(pixiCharacterPos.x, pixiCharacterPos.y);
  // characterSprite.rotation = characterAngle;
  // platform1Sprite.position.set(platform1Pos.x, platform1Pos.y);
  // platform2Sprite.position.set(platform2Pos.x, platform2Pos.y);

}

// Register the game loop function with Pixi.js ticker
// app.ticker.add(gameLoop);
