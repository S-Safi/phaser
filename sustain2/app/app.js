var game = new Phaser.Game(
  800,
  400,
  Phaser.AUTO,
  '',
  { preload: preload, create: create, update: update }
);

function preload() {
  console.log('preload');
  game.load.image('background', 'assets/images/background.jpg');
  game.load.image('doorLeftClosed', 'assets/images/door-left-closed.jpg');
  game.load.image('doorLeftOpen', 'assets/images/door-left-open.jpg');
  game.load.image('doorRightClosed', 'assets/images/door-right-closed.jpg');
  game.load.image('doorRightOpen', 'assets/images/door-right-open.jpg');
}

var DOOR_LEFT_X = 148;
var DOOR_LEFT_Y = 71;
var DOOR_RIGHT_X = 544;
var DOOR_RIGHT_Y = 71;
var DOOR_WIDTH = 108;
var DOOR_HEIGHT = 220;

function isPointInRectangle(px,py,rx1,ry1,rx2,ry2){
  return px>=rx1 && px<=rx2 && py>=ry1 && py<=ry2;
}

function create() {
  console.log('create')

  var gameWidth = game.world.width;
  var gameHeight = game.world.height;
  game.add.sprite(0, 0, 'background');
  game.add.sprite(DOOR_LEFT_X, DOOR_LEFT_Y, 'doorLeftClosed');
  game.add.sprite(DOOR_LEFT_X, DOOR_LEFT_Y, 'doorLeftOpen');
  game.add.sprite(DOOR_RIGHT_X, DOOR_RIGHT_Y, 'doorRightClosed');
  game.add.sprite(DOOR_RIGHT_X, DOOR_RIGHT_Y, 'doorRightOpen');
}

function update() {
  //console.log('update')
  //if (game.input.mousePointer.isDown){
    //console.log('click');
  //}
  var mousex = game.input.activePointer.x;
  var mousey = game.input.activePointer.y;

  var rx1 = DOOR_LEFT_X;
  var rx2 = DOOR_LEFT_X + DOOR_WIDTH;
  var ry1 = DOOR_LEFT_Y;
  var ry2 = DOOR_LEFT_Y + DOOR_HEIGHT;

  var isMouseOverLeftDoor = isPointInRectangle(mousex, mousey, rx1, ry1, rx2, ry2);
  console.log(isMouseOverLeftDoor);
}
