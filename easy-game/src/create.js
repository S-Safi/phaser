export default function (game) {

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


  return function create() {
    createLevelData();

    showStart();
  };
}
