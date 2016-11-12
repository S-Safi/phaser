import app from '../../app';

const { game } = app;

export default function preload() {
  game.load.image('player', 'assets/entities/player/derp-ssundee.png');
  game.load.image('crainer', 'assets/entities/enemies/crainer.png');
  game.load.image('evil', 'assets/entities/enemies/enemy-evil.jpg');
  game.load.tilemap('level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.tilemap('level2', 'assets/levels/level2.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.tilemap('level3', 'assets/levels/level3.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', 'assets/tiles/tiles.png');
  game.load.image('endTile', 'assets/entities/tiles/gold.png');
}
