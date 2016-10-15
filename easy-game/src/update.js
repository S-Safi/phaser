export default function (game) {

  const PLAYER_SPEED = 95;

  const cursors = game.input.keyboard.createCursorKeys();

  function enemyCollisionHandler() {
    player.body.x = currentLevel.playerStart.x;
    player.body.y = currentLevel.playerStart.y;
  }

  function portalCollisionHandler() {
    goToNextLevel();
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
    game.physics.arcade.collide(player, level.layer);
    game.physics.arcade.overlap(player, level.endTile.sprite, portalCollisionHandler, null, this);
    level.enemies.forEach(
      (enemy) => {
        game.physics.arcade.overlap(player, enemy.sprite, enemyCollisionHandler, null, this);
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
}
