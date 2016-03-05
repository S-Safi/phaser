var game = new Phaser.Game(
  640,
  512,
  Phaser.AUTO,
  '',
  { preload: preload, create: create, update: update }
);

function preload() {
  game.load.image('player', 'assets/entities/player/derp-ssundee.png');
  game.load.image('enemy','assets/entities/enemies/crainer.png');

  game.load.tilemap('test', 'assets/levels/test.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', 'assets/tiles/tiles.png');

}

var SPEED = 90;

var player;
var playerStart = {
  x: 64,
  y: 64,
};

var gameWidth;
var gameHeight;
var cursors;
var map;
var layer;
var enemy1;
var enemy2;
var enemy3;

function create() {

  gameWidth = game.world.width;
  gameHeight = game.world.height;

  map = game.add.tilemap('test');
  map.addTilesetImage('tiles', 'tiles');
  layer = map.createLayer('Tile Layer 1');
  layer.resizeWorld();

  map.setCollision(1);

  enemy1 = game.add.sprite(64*5-16, 64*6-16, 'enemy');
  enemy2 = game.add.sprite(64*2-16, 64*3-16, 'enemy');
  enemy3 = game.add.sprite(64*7-16, 64 + 48, 'enemy');

  player = game.add.sprite(playerStart.x, playerStart.y, 'player');

  game.physics.arcade.enable(player);
  game.physics.arcade.enable(enemy1);
  game.physics.arcade.enable(enemy2);
  game.physics.arcade.enable(enemy3);

  enemy1.body.immovable = true;
  enemy2.body.immovable = true;
  enemy3.body.immovable = true;
  player.body.collideWorldBounds = true;

  cursors = game.input.keyboard.createCursorKeys();

}

function collisionHandler (player, enemy) {
  console.log('CRASH');
  player.body.x = playerStart.x;
  player.body.y = playerStart.y;
}

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

  game.physics.arcade.collide(player, layer);
  game.physics.arcade.collide(player, enemy1, collisionHandler, null, this);
  game.physics.arcade.collide(player, enemy2, collisionHandler, null, this);
  game.physics.arcade.collide(player, enemy3, collisionHandler, null, this);

}
