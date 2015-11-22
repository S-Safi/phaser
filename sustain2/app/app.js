var game = new Phaser.Game(
  800,
  400,
  Phaser.AUTO,
  '',
  { preload: preload, create: create, update: update }
);

function preload() {
  game.load.image('start', 'assets/images/start.jpg');
  game.load.image('background', 'assets/images/background.jpg');
  game.load.image('doorLeftClosed', 'assets/images/door-left-closed.jpg');
  game.load.image('doorLeftOpen', 'assets/images/door-left-open.jpg');
  game.load.image('doorRightClosed', 'assets/images/door-right-closed.jpg');
  game.load.image('doorRightOpen', 'assets/images/door-right-open.jpg');
  game.load.image('win', 'assets/images/win.jpg');
  game.load.image('bars', 'assets/images/bars.png');

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
var bars;
var win;
var start;

var YES = true;
var NO = false;

var questions = [];
var currentQuestionIndex = 0;

function addQuestion(image, answer) {

  var question = {};
  question.sprite = game.add.sprite(0, 0, image);
  question.answer = answer;

  question.sprite.visible = false;

  questions.push(question);

}

var gameWon = false;
var gameLost = false;

function goToNextQuestion() {
  currentQuestionIndex = currentQuestionIndex + 1;
  if (currentQuestionIndex === questions.length) {
    gameWon = true;
  }
}

// Left Door = YES
function doorLeftClicked() {
  var currentQuestion = questions[currentQuestionIndex];
  if (currentQuestion.answer === YES) {
    goToNextQuestion();
  }
  else {
    gameLost = true;
  }
}

// Right Door = NO
function doorRightClicked() {
  var currentQuestion = questions[currentQuestionIndex];
  if (currentQuestion.answer === NO) {
    goToNextQuestion();
  }
  else {
    gameLost = true;
  }
}

function startGameClicked() {
  start.visible = false;
}

function create() {

  var gameWidth = game.world.width;
  var gameHeight = game.world.height;

  game.add.sprite(0, 0, 'background');

  doorLeftClosed = game.add.sprite(DOOR_LEFT_X, DOOR_LEFT_Y, 'doorLeftClosed');
  doorRightClosed = game.add.sprite(DOOR_RIGHT_X, DOOR_RIGHT_Y, 'doorRightClosed');

  doorLeftOpen = game.add.button(DOOR_LEFT_X, DOOR_LEFT_Y, 'doorLeftOpen', doorLeftClicked);
  doorRightOpen = game.add.button(DOOR_RIGHT_X, DOOR_RIGHT_Y, 'doorRightOpen', doorRightClicked);

  addQuestion('q1', NO);
  addQuestion('q2', YES);
  addQuestion('q3', NO);

  win = game.add.sprite(0, 0, 'win');
  bars = game.add.sprite(0, 0, 'bars');
  start = game.add.button(0, 0, 'start', startGameClicked);

  win.visible = false;
  bars.visible = false;

}

function showQuestion(index){
  for (var i = 0; i < questions.length; i++) {
    questions[i].sprite.visible = false;
  }
  var currentQuestion = questions[index];
  currentQuestion.sprite.visible = true;
}

function gameEnded() {
  doorLeftOpen.visible = false;
  doorRightOpen.visible = false;
}

function showGameWon() {
  win.visible = true;
  gameEnded();
}

function showGameLost() {
  bars.visible = true;
  gameEnded();
}

function update() {

  if (gameWon) {
    showGameWon();
    return;
  }

  if (gameLost) {
    showGameLost();
    return;
  }

  showQuestion(currentQuestionIndex);

  var mousex = game.input.activePointer.x;
  var mousey = game.input.activePointer.y;

  var rx1Left = DOOR_LEFT_X;
  var rx2Left = DOOR_LEFT_X + DOOR_WIDTH;
  var ry1Left = DOOR_LEFT_Y;
  var ry2Left = DOOR_LEFT_Y + DOOR_HEIGHT;

  var isMouseOverLeftDoor = isPointInRectangle(mousex, mousey, rx1Left, ry1Left, rx2Left, ry2Left);

  doorLeftOpen.visible = isMouseOverLeftDoor;

  var rx1Right = DOOR_RIGHT_X;
  var rx2Right = DOOR_RIGHT_X + DOOR_WIDTH;
  var ry1Right = DOOR_RIGHT_Y;
  var ry2Right = DOOR_RIGHT_Y + DOOR_HEIGHT;

  var isMouseOverRightDoor = isPointInRectangle(mousex, mousey, rx1Right, ry1Right, rx2Right, ry2Right);

  doorRightOpen.visible = isMouseOverRightDoor;

}
