import app from '../../app';

const { game } = app;

const PLAYER_SPEED = 95;

function enemyCollisionHandler() {
  app.player.body.x = app.currentLevel.playerStart.x;
  app.player.body.y = app.currentLevel.playerStart.y;
}

function startCurrentLevel() {
  const level = app.currentLevel;
  game.world.removeAll();

  level.map = game.add.tilemap(level.tilemapId);
  level.map.addTilesetImage(level.tilesetImage, level.tilesetImage);

  level.layer = level.map.createLayer(level.layerId);
  level.layer.resizeWorld();

  app.player = game.add.sprite(level.playerStart.x, level.playerStart.y, 'player');
  game.physics.arcade.enable(app.player);
  app.player.body.collideWorldBounds = true;

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

  app.currentLevel = level;
}

function showStart() {
  game.state.start('start');
}

function showWin() {
  game.world.removeAll();
  game.add.button(0, 0, 'winScreen', showStart);
}

function goToNextLevel() {
  // Increase current level by 1
  app.currentLevelId = app.currentLevelId + 1;
  // if current level is greater than maximum level id
  // then set current level id to 0
  if (app.currentLevelId < app.levels.length) {
    app.currentLevel = app.levels[app.currentLevelId];
    startCurrentLevel();
  } else {
    app.currentLevel = null;
    showWin();
  }
}

function portalCollisionHandler() {
  goToNextLevel();
}


function updatePlayer() {
  if (app.cursors.left.isDown) {
    app.player.body.velocity.x = -PLAYER_SPEED;
  } else if (app.cursors.right.isDown) {
    app.player.body.velocity.x = PLAYER_SPEED;
  } else {
    app.player.body.velocity.x = 0;
  }

  if (app.cursors.up.isDown) {
    app.player.body.velocity.y = -PLAYER_SPEED;
  } else if (app.cursors.down.isDown) {
    app.player.body.velocity.y = PLAYER_SPEED;
  } else {
    app.player.body.velocity.y = 0;
  }
}

function updateEnemies(level) {
  const newLevel = { ...level };
  newLevel.enemies = newLevel.enemies.map(
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
  return newLevel;
}

function checkCollisions(level) {
  game.physics.arcade.collide(app.player, level.layer);
  game.physics.arcade.overlap(app.player, level.endTile.sprite, portalCollisionHandler, null, this);
  level.enemies.forEach(
    (enemy) => {
      game.physics.arcade.overlap(app.player, enemy.sprite, enemyCollisionHandler, null, this);
    }
  );
}


export default function () {
  if (app.currentLevel) {
    updatePlayer();
    updateEnemies(app.currentLevel);
    checkCollisions(app.currentLevel);
  } else {
    app.currentLevelId = 0;
    app.currentLevel = app.levels[app.currentLevelId];
    startCurrentLevel();
  }
}
