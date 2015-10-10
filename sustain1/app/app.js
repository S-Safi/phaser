var game = new Phaser.Game(
  600,
  400,
  Phaser.AUTO,
  '',
  { preload: preload, create: create, update: update }
);

function preload() {
  console.log('preload')
  game.load.image('star', 'assets/star.png');
  game.load.image('diamond', 'assets/diamond.png');
}

function create() {
  console.log('create')

  var gameWidth = game.world.width;
  var gameHeight = game.world.height;

  // Add random stars
  var starCount = 20;
  for (var i=0; i<starCount; i++) {
    var starX = Math.round( Math.random() * gameWidth );
    var starY = Math.round( Math.random() * gameHeight );
    var star = game.add.sprite(starX, starY, 'star');
    star.inputEnabled = true;
    star.events.onInputDown.add(collectStar, this);
  }

  // Add random diamonds
  var diamondCount = 20;
  for (var i=0; i<diamondCount; i++) {
    var diamondX = Math.round( Math.random() * gameWidth );
    var diamondY = Math.round( Math.random() * gameHeight );
    var diamond = game.add.sprite(diamondX, diamondY, 'diamond');
    diamond.inputEnabled = true;
    diamond.events.onInputDown.add(collectDiamond, this);
  }


  // var star = game.add.sprite(300, 300, 'star');
  //console.log(game.input.mousePointer);
  // star.inputEnabled = true;
  // diamond.inputEnabled = true;
  // var diamond = game.add.sprite(50, 50, 'diamond');
  // star.events.onInputDown.add(collectStar, this);
  // diamond.events.onInputDown.add(collectDiamond, this);

}

function update() {
  //console.log('update')
  //if (game.input.mousePointer.isDown){
    //console.log('click');
  //}
}

function collectStar (star) {
    star.kill();
}

function collectDiamond (diamond) {
    diamond.kill();
}
