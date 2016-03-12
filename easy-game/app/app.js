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

var PLAYER_SPEED = 90;

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

  enemy1 = {
    speed: 90,
    direction: 'vertical',
    boundary: {
      top: 64,
      bottom: 64*7,
    },
  };

  enemy1.sprite = game.add.sprite(64*2-16, 64*3-16, 'enemy');
  game.physics.arcade.enable(enemy1.sprite);
  enemy1.sprite.body.velocity.y = enemy1.speed;

  enemy2 = {
    speed: 90,
    direction: 'horizontal',
    boundary: {
      left: 64,
      right: 64*9,
    },
  };

  enemy2.sprite = game.add.sprite(64*5-16, 64*6-16, 'enemy');
  game.physics.arcade.enable(enemy2.sprite);
  enemy2.sprite.body.velocity.x = enemy2.speed;

  enemy3 = {
    speed: 90,
    direction: 'horizontal',
    boundary: {
      left: 64*4,
      right: 64*9,
    },
  };

  enemy3.sprite = game.add.sprite(64*6 + 16, 64 + 16, 'enemy');
  game.physics.arcade.enable(enemy3.sprite);
  enemy3.sprite.body.velocity.x = enemy3.speed;

  player = game.add.sprite(playerStart.x, playerStart.y, 'player');

  game.physics.arcade.enable(player);
  game.physics.arcade.enable(enemy2.sprite);
  game.physics.arcade.enable(enemy3.sprite);

  //enemy1.sprite.body.immovable = true;
  //enemy2.sprite.body.immovable = true;
  //enemy3.sprite.body.immovable = true;

  player.body.collideWorldBounds = true;

  cursors = game.input.keyboard.createCursorKeys();

}

function collisionHandler (player, enemy) {
  console.log('CRASH');
  player.body.x = playerStart.x;
  player.body.y = playerStart.y;
}

function checkCollisions() {
  game.physics.arcade.collide(player, layer);
  game.physics.arcade.overlap(player, enemy1.sprite, collisionHandler, null, this);
  game.physics.arcade.overlap(player, enemy2.sprite, collisionHandler, null, this);
  game.physics.arcade.overlap(player, enemy3.sprite, collisionHandler, null, this);

}

function updatePlayer() {
  if (cursors.left.isDown) {
    player.body.velocity.x = -PLAYER_SPEED;
  }
  else if (cursors.right.isDown) {
    player.body.velocity.x = PLAYER_SPEED;
  }
  else {
    player.body.velocity.x = 0;
  }

  if (cursors.up.isDown) {
    player.body.velocity.y = -PLAYER_SPEED;
  }
  else if (cursors.down.isDown) {
    player.body.velocity.y = PLAYER_SPEED;
  }
  else {
    player.body.velocity.y = 0;
  }

}

function updateEnemies() {
  if (enemy1.sprite.body.y >= (enemy1.boundary.bottom - enemy1.sprite.height)) {
    enemy1.sprite.body.velocity.y = -enemy1.speed;
  }
  else if (enemy1.sprite.body.y <= enemy1.boundary.top) {
    enemy1.sprite.body.velocity.y = enemy1.speed;
  }

  if (enemy2.sprite.body.x >= (enemy2.boundary.right - enemy2.sprite.width)) {
    enemy2.sprite.body.velocity.x = -enemy2.speed;
  }
  else if (enemy2.sprite.body.x <= enemy2.boundary.left) {
    enemy2.sprite.body.velocity.x = enemy2.speed;
  }

  if (enemy3.sprite.body.x >= (enemy3.boundary.right - enemy3.sprite.width)) {
    enemy3.sprite.body.velocity.x = -enemy3.speed;
  }
  else if (enemy3.sprite.body.x <= enemy3.boundary.left) {
    enemy3.sprite.body.velocity.x = enemy3.speed;
  }
}

function update() {

  updatePlayer();
  updateEnemies();
  checkCollisions();
}
