import 'phaser-shim';

const game = new Phaser.Game(
  640,
  512,
  Phaser.AUTO,
  '',
  { preload, create, update }
);


const PLAYER_SPEED = 95;

const levels = [];
let currentLevel;
let currentLevelId;
let player;
let cursors;

function createLevelData() {

  let level;
  let enemies;

  // Level 1

  level = {};

  level.tilemapId = 'level1';
  level.tilesetImage = 'tiles';
  level.layerId = 'Tile Layer 1';
  level.collisionIds = [1, 3, 4];

  level.endTile = {
    x: 64 * 5,
    y: 64 * 3,
    id: 'endTile',
  };
  level.playerStart = {
    x: 64,
    y: 64,
  };

  enemies = [];

  enemies.push({
    type: 'crainer',
    speed: 90,
    direction: 'vertical',
    boundary: {
      top: 64,
      bottom: 64 * 7,
    },
    start: {
      x: 64 * 2 - 16,
      y: 64 * 3 - 16,
    },
  });

  enemies.push({
    type: 'crainer',
    speed: 90,
    direction: 'horizontal',
    boundary: {
      left: 64,
      right: 64 * 9,
    },
    start: {
      x: 64 * 5 - 16,
      y: 64 * 6 + 16,
    },
  });

  enemies.push({
    type: 'crainer',
    speed: 90,
    direction: 'horizontal',
    boundary: {
      left: 64 * 7,
      right: 64 * 9,
    },
    start: {
      x: 64 * 7,
      y: 64 + 16,
    },
  });

  enemies.push({
    type: 'evil',
    speed: 90,
    direction: 'horizontal',
    boundary: {
      left: 64,
      right: 64 * 9,
      top: 64,
      bottom: 64 * 9,
    },
    start: {
      x: 64 * 7,
      y: 64 * 4,
    },
  });

  enemies.push({
    type: 'crainer',
    speed: 90,
    direction: 'horizontal',
    boundary: {
      left: 64 * 4,
      right: 64 * 6,
    },
    start: {
      x: 64 * 4,
      y: 64 + 16,
    },
  });

  level.enemies = enemies;

  levels.push(level);

  // Level 2

  level = {};

  level.tilemapId = 'level2';
  level.tilesetImage = 'tiles';
  level.layerId = 'Tile Layer 1';
  level.collisionIds = [1, 3, 4];

  level.endTile = {
    x: 64 * 8,
    y: 64 * 1,
    id: 'endTile',
  };

  level.playerStart = {
    x: 64,
    y: 64,
  };

  enemies = [];

  enemies.push({
    type: 'crainer',
    speed: 200,
    direction: 'vertical',
    boundary: {
      top: 64 + 16,
      bottom: 64 * 7 - 16,
    },
    start: {
      x: 64 * 3 + 16,
      y: 64 * 3 - 16,
    },
  });

  level.enemies = enemies;
  levels.push(level);
}

function startCurrentLevel() {
  game.world.removeAll();

  const level = currentLevel;

  level.map = game.add.tilemap(level.tilemapId);
  level.map.addTilesetImage(level.tilesetImage, level.tilesetImage);

  level.layer = level.map.createLayer(level.layerId);
  level.layer.resizeWorld();

  player = game.add.sprite(level.playerStart.x, level.playerStart.y, 'player');
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;

  level.map.setCollision(level.collisionIds);

  level.enemies.forEach(
    (enemy) => {
      enemy.sprite = game.add.sprite( // eslint-disable-line no-param-reassign
        enemy.start.x,
        enemy.start.y,
        enemy.type
      );
      game.physics.arcade.enable(enemy.sprite);
      if (enemy.direction === 'horizontal') {
        enemy.sprite.body.velocity.x = enemy.speed; // eslint-disable-line no-param-reassign
      }
      if (enemy.direction === 'vertical') {
        enemy.sprite.body.velocity.y = enemy.speed; // eslint-disable-line no-param-reassign
      }
    }
  );

  level.endTile.sprite = game.add.sprite(level.endTile.x, level.endTile.y, level.endTile.id);

  game.physics.arcade.enable(level.endTile.sprite);

  currentLevel = level;

}

function startPlaying() {
  currentLevelId = 0;
  currentLevel = levels[currentLevelId];
  startCurrentLevel();
}

function showStart() {
  game.world.removeAll();
  game.add.button(0, 0, 'startScreen', startPlaying);
}

function showWin() {
  game.world.removeAll();
  game.add.button(0, 0, 'winScreen', showStart);
}

function goToNextLevel() {
  // Increase current level by 1
  currentLevelId = currentLevelId + 1;
  // if current level is greater than maximum level id
  // then set current level id to 0

  if (currentLevelId < levels.length) {
    currentLevel = levels[currentLevelId];
    startCurrentLevel();
  } else {
    currentLevel = null;
    showWin();
  }

}

function preload() {
  game.load.image('player', 'assets/entities/player/derp-ssundee.png');
  game.load.image('crainer', 'assets/entities/enemies/crainer.png');
  game.load.image('evil', 'assets/entities/enemies/enemy-evil.jpg');

  game.load.tilemap('level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.tilemap('level2', 'assets/levels/level2.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', 'assets/tiles/tiles.png');
  game.load.image('endTile', 'assets/entities/tiles/gold.png');
  game.load.image('winScreen', 'assets/misc/youwin.jpg');
  game.load.image('startScreen', 'assets/misc/startscreen.jpg');
}

function create() {
  createLevelData();
  cursors = game.input.keyboard.createCursorKeys();
  showStart();
}

function enemyCollisionHandler(thePlayer /* , enemy */) {
  console.log('CRASH');
  thePlayer.body.x = currentLevel.playerStart.x; // eslint-disable-line no-param-reassign
  thePlayer.body.y = currentLevel.playerStart.y; // eslint-disable-line no-param-reassign
}

function portalCollisionHandler(/* thePlayer  , endTile */) {
  console.log('(confetti)');
  goToNextLevel();
}

function checkCollisions(level) {
  game.physics.arcade.collide(player, level.layer);
  game.physics.arcade.overlap(player, level.endTile.sprite, portalCollisionHandler, null, this);
  level.enemies.forEach((enemy) => {
    game.physics.arcade.overlap(player, enemy.sprite, enemyCollisionHandler, null, this);
  });
}

function updatePlayer() {
  if (cursors.left.isDown) {
    player.body.velocity.x = -PLAYER_SPEED;
  } else if (cursors.right.isDown) {
    player.body.velocity.x = PLAYER_SPEED;
  } else {
    player.body.velocity.x = 0;
  }
  if (cursors.up.isDown) {
    player.body.velocity.y = -PLAYER_SPEED;
  } else if (cursors.down.isDown) {
    player.body.velocity.y = PLAYER_SPEED;
  } else {
    player.body.velocity.y = 0;
  }
}

function updateEnemies(level) {
  level.enemies.forEach((enemy) => {
    if (enemy.direction === 'vertical') {
      if (enemy.sprite.body.y >= (enemy.boundary.bottom - enemy.sprite.height)) {
        enemy.sprite.body.velocity.y = -enemy.speed;
      } else if (enemy.sprite.body.y <= enemy.boundary.top) {
        enemy.sprite.body.velocity.y = enemy.speed;
      }
    }
    if (enemy.direction === 'horizontal') {
      if (enemy.sprite.body.x >= (enemy.boundary.right - enemy.sprite.width)) {
        enemy.sprite.body.velocity.x = -enemy.speed;
      } else if (enemy.sprite.body.x <= enemy.boundary.left) {
        enemy.sprite.body.velocity.x = enemy.speed;
      }
    }
  });
}


function update() {
  if (currentLevel) {
    updatePlayer();
    updateEnemies(currentLevel);
    checkCollisions(currentLevel);
  }
}
