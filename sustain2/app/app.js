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

  game.load.image('q1', 'assets/questions/q1.png');
  game.load.image('q2', 'assets/questions/q2.png');
  game.load.image('q3', 'assets/questions/q3.png');

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

var doorLeftClosed;
var doorLeftOpen;
var doorRightOpen;
var doorRightClosed;

var questions = [];
var currentQuestionIndex = 0;

function addQuestion(image, answer) {

  var question = {};
  question.sprite = game.add.sprite(0, 0, image);
  question.answer = answer;

  question.sprite.visible = false;

  questions.push(question);

}

function create() {
  console.log('create')

  var gameWidth = game.world.width;
  var gameHeight = game.world.height;
  game.add.sprite(0, 0, 'background');
  doorLeftClosed = game.add.sprite(DOOR_LEFT_X, DOOR_LEFT_Y, 'doorLeftClosed');
  doorLeftOpen = game.add.sprite(DOOR_LEFT_X, DOOR_LEFT_Y, 'doorLeftOpen');
  doorRightClosed = game.add.sprite(DOOR_RIGHT_X, DOOR_RIGHT_Y, 'doorRightClosed');
  doorRightOpen = game.add.sprite(DOOR_RIGHT_X, DOOR_RIGHT_Y, 'doorRightOpen');
  // console.log(doorLeftClosed);

  addQuestion('q1', false);
  addQuestion('q2', true);
  addQuestion('q3', false);

}

function showQuestion(index){
  for (var i = 0; i < questions.length; i++) {
    questions[i].sprite.visible = false;
  }
  var currentQuestion = questions[index];
  currentQuestion.sprite.visible = true;
}

function update() {

  showQuestion(currentQuestionIndex);

  //console.log('update')
  //if (game.input.mousePointer.isDown){
    //console.log('click');
  //}
  var mousex = game.input.activePointer.x;
  var mousey = game.input.activePointer.y;

  var rx1Left = DOOR_LEFT_X;
  var rx2Left = DOOR_LEFT_X + DOOR_WIDTH;
  var ry1Left = DOOR_LEFT_Y;
  var ry2Left = DOOR_LEFT_Y + DOOR_HEIGHT;

  var isMouseOverLeftDoor = isPointInRectangle(mousex, mousey, rx1Left, ry1Left, rx2Left, ry2Left);
  // console.log('isMouseOverLeftDoor',isMouseOverLeftDoor);

  doorLeftOpen.visible = isMouseOverLeftDoor;

  var rx1Right = DOOR_RIGHT_X;
  var rx2Right = DOOR_RIGHT_X + DOOR_WIDTH;
  var ry1Right = DOOR_RIGHT_Y;
  var ry2Right = DOOR_RIGHT_Y + DOOR_HEIGHT;

  var isMouseOverRightDoor = isPointInRectangle(mousex, mousey, rx1Right, ry1Right, rx2Right, ry2Right);
  // console.log('isMouseOverRightDoor',isMouseOverRightDoor);

  doorRightOpen.visible = isMouseOverRightDoor;

  if (game.input.mousePointer.isDown){
    currentQuestionIndex = currentQuestionIndex + 1;
  }

}
