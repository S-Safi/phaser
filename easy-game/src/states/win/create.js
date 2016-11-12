import app from '../../app';

const { game } = app;

function showStart() {
  game.state.start('start');
}

function showWin() {
  //  game.world.removeAll();
  game.add.button(0, 0, 'winScreen', showStart);
}

export default function create() {
  showWin();
}
