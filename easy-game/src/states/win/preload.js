import app from '../../app';

const { game } = app;

export default function preload() {
  game.load.image('winScreen', 'assets/misc/youwin.jpg');
}
