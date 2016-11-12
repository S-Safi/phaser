import 'phaser-shim';
import app from './app';
import main from './states/main';
import start from './states/start';
import win from './states/win';

const { game } = app;

game.state.add('start', start);
game.state.add('main', main);
game.state.add('win', win);
game.state.start('start');
