import app from '../../app';

const { game } = app;

function startPlaying() {
  game.state.start('main');
}

function showStart() {
  game.world.removeAll();
  game.add.button(0, 0, 'startScreen', startPlaying);
}

export default function create() {
  showStart();
}
