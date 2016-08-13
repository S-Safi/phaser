import 'phaser-shim';

const game = new Phaser.Game(
  640,
  512,
  Phaser.AUTO,
  ''
);

const levels = [];
let currentLevel;
let currentLevelId;

const PLAYER_SPEED = 95;

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
      bottom: 64 * 6,
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
    direction: 'vertical',
    boundary: {
      top: 64,
      bottom: 64 * 6,
    },
    start: {
      x: 64 * 7 + 16,
      y: 64 * 6,
    },
  });

  enemies.push({
    type: 'crainer',
    speed: 110,
    direction: 'vertical',
    boundary: {
      top: 64,
      bottom: 64 * 6,
    },
    start: {
      x: 64 * 8 + 16,
      y: 64 * 3,
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

  enemies.push({
    type: 'crainer',
    speed: 85,
    direction: 'vertical',
    boundary: {
      top: 64 + 16,
      bottom: 64 * 7 - 16,
    },
    start: {
      x: 64 * 7 + 16,
      y: 64 * 2 + 16,
    },
  });

  enemies.push({
    type: 'crainer',
    speed: 55,
    direction: 'vertical',
    boundary: {
      top: 64 + 16,
      bottom: 64 * 7 - 16,
    },
    start: {
      x: 64 * 7 + 16,
      y: 64 * 7 - 16,
    },
  });

  enemies.push({
    type: 'crainer',
    speed: 105,
    direction: 'vertical',
    boundary: {
      top: 64 + 16,
      bottom: 64 * 7 - 16,
    },
    start: {
      x: 64 * 5 + 16,
      y: 64 * 7 - 16,
    },
  });

  level.enemies = enemies;
  levels.push(level);

  // level 3

  level = {};

  level.tilemapId = 'level3';
  level.tilesetImage = 'tiles';
  level.layerId = 'Tile Layer 1';
  level.collisionIds = [1, 3, 4];

  level.endTile = {
    x: 64 * 9,
    y: 64 * 7,
    id: 'endTile',
  };
  level.playerStart = {
    x: 64,
    y: 64,
  };
}

function startCurrentLevel() {
  const level = currentLevel;
  game.world.removeAll();

  level.map = game.add.tilemap(level.tilemapId);
  level.map.addTilesetImage(level.tilesetImage, level.tilesetImage);

  level.layer = level.map.createLayer(level.layerId);
  level.layer.resizeWorld();

  player = game.add.sprite(level.playerStart.x, level.playerStart.y, 'player');
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;

  level.map.setCollision(level.collisionIds);

  level.enemies = level.enemies.map((enemy) => {
    const sprite = game.add.sprite(enemy.start.x, enemy.start.y, enemy.type);
    game.physics.arcade.enable(sprite);
    if (enemy.direction === 'horizontal') {
      sprite.body.velocity.x = enemy.speed;
    }
    if (enemy.direction === 'vertical') {
      sprite.body.velocity.y = enemy.speed;
    }
    const newEnemy = {
      ...enemy,
      sprite,
    };
    return newEnemy;
  });

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
  game.load.tilemap('level3', 'assets/levels/level3.json', null, Phaser.Tilemap.TILED_JSON);
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

function enemyCollisionHandler() {
  player.body.x = currentLevel.playerStart.x;
  player.body.y = currentLevel.playerStart.y;
}

function portalCollisionHandler() {
  goToNextLevel();
}

function checkCollisions(level) {
  game.physics.arcade.collide(player, level.layer);
  game.physics.arcade.overlap(player, level.endTile.sprite, portalCollisionHandler, null, this);
  level.enemies.forEach(
    (enemy) => {
      game.physics.arcade.overlap(player, enemy.sprite, enemyCollisionHandler, null, this);
    }
  );
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
  level.enemies = level.enemies.map(
    (enemy) => {
      const newEnemy = { ...enemy };
      if (newEnemy.direction === 'vertical') {
        if (newEnemy.sprite.body.y >= (newEnemy.boundary.bottom - newEnemy.sprite.height)) {
          newEnemy.sprite.body.velocity.y = -newEnemy.speed;
        } else if (newEnemy.sprite.body.y <= newEnemy.boundary.top) {
          newEnemy.sprite.body.velocity.y = newEnemy.speed;
        }
      }
      if (newEnemy.direction === 'horizontal') {
        if (newEnemy.sprite.body.x >= (newEnemy.boundary.right - newEnemy.sprite.width)) {
          newEnemy.sprite.body.velocity.x = -newEnemy.speed;
        } else if (newEnemy.sprite.body.x <= newEnemy.boundary.left) {
          newEnemy.sprite.body.velocity.x = newEnemy.speed;
        }
      }
      return newEnemy;
    }
  );
}

function update() {
  if (currentLevel) {
    updatePlayer();
    updateEnemies(currentLevel);
    checkCollisions(currentLevel);
  }
}

const playState = { preload, create, update };

game.state.add('main', playState);
game.state.start('main');
