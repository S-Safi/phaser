var game = new Phaser.Game(
  600,
  400,
  Phaser.AUTO,
  '',
  { preload: preload, create: create, update: update }
);

function preload() {
  game.load.image('level1Background', 'assets/levels/test.png');
  game.load.image('player', 'assets/player/derp-ssundee.png');
  game.load.image('wall', 'assets/backgrounds/tile.png');
}

var walls;
var player;
var gameWidth;
var gameHeight;

function create() {

  gameWidth = game.world.width;
  gameHeight = game.world.height;
  //game.add.sprite(0, 0, 'level1Background');
  player = game.add.sprite(300, 200, 'player');
  //game.add.sprite(300, 200, 'backgroundTile');

  //walls = game.add.group();

  //var wall1 = walls.create(20, 20, 'wall')
  //wall1.scale.setTo(560, 80);


}

var xDir = 1;
var yDir = -1;
var xSpeed = 100;
var ySpeed = 100;

function update() {

  player.y = player.y + yDir * ySpeed;
  player.x = player.x + xDir * xSpeed;

  if (player.x + player.width > gameWidth - 1) {
    xDir = -1;
  }

  if (player.x < 0 + 1) {
    xDir = 1;
  }

  if (player.y + player.height > gameHeight - 1) {
    yDir = -1;
  }

  if (player.y < 0 + 1) {
    yDir = 1;
  }

}
