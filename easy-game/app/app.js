var game = new Phaser.Game(
  600,
  400,
  Phaser.AUTO,
  '',
  { preload: preload, create: create, update: update }
);

function preload() {
  game.load.image('level1Background', 'assets/levels/test3.png');
  game.load.image('player', 'assets/player/derp-ssundee.png');
  game.load.image('wall', 'assets/backgrounds/tile.png');
}

var SPEED = 50;

var walls;
var player;
var gameWidth;
var gameHeight;
var cursors;

function create() {

  gameWidth = game.world.width;
  gameHeight = game.world.height;
  background = game.add.sprite(200, 0, 'level1Background');
  player = game.add.sprite(300, 200, 'player');

  game.physics.arcade.enable(player);
  game.physics.arcade.enable(background);

  player.body.collideWorldBounds = true;

  //game.add.sprite(300, 200, 'backgroundTile');

  //walls = game.add.group();

  //var wall1 = walls.create(20, 20, 'wall')
  //wall1.scale.setTo(560, 80);

  cursors = game.input.keyboard.createCursorKeys();


}

//var xDir = 1;
// var yDir = -1;
// var xSpeed = 2;
// var ySpeed = 2;

function update() {

  if (cursors.left.isDown) {
    player.body.velocity.x = -SPEED;
  }
  else if (cursors.right.isDown) {
    player.body.velocity.x = SPEED;
  }
  else {
    player.body.velocity.x = 0;
  }

  if (cursors.up.isDown) {
    player.body.velocity.y = -SPEED;
  }
  else if (cursors.down.isDown) {
    player.body.velocity.y = SPEED;
  }
  else {
    player.body.velocity.y = 0;
  }

  game.physics.arcade.collide(player, background);


  //player.y = player.y + yDir * ySpeed;
  //player.x = player.x + xDir * xSpeed;

  // if (player.x + player.width > gameWidth - 1) {
  //   xDir = -1;
  // }
  //
  // if (player.x < 0 + 1) {
  //   xDir = 1;
  // }
  //
  // if (player.y + player.height > gameHeight - 1) {
  //   yDir = -1;
  // }
  //
  // if (player.y < 0 + 1) {
  //   yDir = 1;
  // }

}
