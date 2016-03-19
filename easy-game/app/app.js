var game = new Phaser.Game(
  640,
  512,
  Phaser.AUTO,
  '',
  { preload: preload, create: create, update: update }
);

function preload() {
  game.load.image('player', 'assets/entities/player/derp-ssundee.png');
  game.load.image('crainer','assets/entities/enemies/crainer.png');
  game.load.image('evil','assets/entities/enemies/enemy-evil.jpg');

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
var enemies;

function createEnemies() {

  enemies = [];

  enemies.push({
    type: 'crainer',
    speed: 90,
    direction: 'vertical',
    boundary: {
      top: 64,
      bottom: 64*7,
    },
    start: {
      x: 64*2-16,
      y: 64*3-16,
    },
  });

  enemies.push({
    type: 'crainer',
    speed: 90,
    direction: 'horizontal',
    boundary: {
      left: 64,
      right: 64*9,
    },
    start: {
      x: 64*5-16,
      y: 64*6-16,
    },
  });

  enemies.push({
    type: 'crainer',
    speed: 90,
    direction: 'horizontal',
    boundary: {
      left: 64*6,
      right: 64*9,
    },
    start: {
      x: 64*6,
      y: 64 + 16,
    },
  });

  enemies.push({
    type: 'evil',
    speed: 45,
    direction: 'horizontal',
    boundary: {
      left: 64,
      right: 64*9,
      top:64,
      bottom:64*9,
    },
    start: {
      x: 64*7,
      y: 64*4,
    },
  });

  enemies.push({
    type: 'crainer',
    speed: 45,
    direction: 'horizontal',
    boundary: {
      left: 64*4,
      right: 64*6,
    },
    start: {
      x: 64*4,
      y: 64 + 16,
    },
  });

  enemies.forEach(
    function(enemy) {
      enemy.sprite = game.add.sprite(enemy.start.x, enemy.start.y, enemy.type);
      game.physics.arcade.enable(enemy.sprite);
      if (enemy.direction === 'horizontal') {
        enemy.sprite.body.velocity.x = enemy.speed;
      }
      if (enemy.direction === 'vertical') {
        enemy.sprite.body.velocity.y = enemy.speed;
      }
    }
  );
}

function create() {

  gameWidth = game.world.width;
  gameHeight = game.world.height;

  map = game.add.tilemap('test');
  map.addTilesetImage('tiles', 'tiles');
  layer = map.createLayer('Tile Layer 1');
  layer.resizeWorld();

  map.setCollision(1);

  createEnemies();

  player = game.add.sprite(playerStart.x, playerStart.y, 'player');

  game.physics.arcade.enable(player);

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
  enemies.forEach(
    function (enemy) {
      game.physics.arcade.overlap(player, enemy.sprite, collisionHandler, null, this);
    }
  );

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

  enemies.forEach(
    function (enemy) {
      if (enemy.direction === 'vertical') {
        if (enemy.sprite.body.y >= (enemy.boundary.bottom - enemy.sprite.height)) {
          enemy.sprite.body.velocity.y = -enemy.speed;
        }
        else if (enemy.sprite.body.y <= enemy.boundary.top) {
          enemy.sprite.body.velocity.y = enemy.speed;
        }
      }
      if (enemy.direction === 'horizontal') {
        if (enemy.sprite.body.x >= (enemy.boundary.right - enemy.sprite.width)) {
          enemy.sprite.body.velocity.x = -enemy.speed;
        }
        else if (enemy.sprite.body.x <= enemy.boundary.left) {
          enemy.sprite.body.velocity.x = enemy.speed;
        }
      }
    }
  );
}

function update() {

  updatePlayer();
  updateEnemies();
  checkCollisions();
}
