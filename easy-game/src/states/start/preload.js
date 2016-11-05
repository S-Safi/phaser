import app from '../../app';

const { game } = app;

export default function preload() {
  game.load.image('startScreen', '../../assets/misc/startscreen.jpg');
}
