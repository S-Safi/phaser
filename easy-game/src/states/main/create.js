import app from '../../app';

const { game, levels } = app;

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

export default function create() {
  app.cursors = game.input.keyboard.createCursorKeys();
  createLevelData();
}
