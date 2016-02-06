var game = new Phaser.Game(
  600,
  400,
  Phaser.AUTO,
  '',
  { preload: preload, create: create, update: update }
);

function preload() {
  game.load.image('level1Background', 'assets/levels/test.png');
  game.load.image('player', 'assets/player/derp-ssundee.png');
}

function create() {

  var gameWidth = game.world.width;
  var gameHeight = game.world.height;
  game.add.sprite(0, 0, 'level1Background');
  game.add.sprite(300, 200, 'player');

}

function update() {

}
