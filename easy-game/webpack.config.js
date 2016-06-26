const path = require('path');

// Ref:
// https://github.com/webpack/webpack-with-common-libs/blob/master/gulpfile.js

module.exports = {
  entry: {
    app: ['./src/main.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: 'assets/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /(pixi|phaser).js/,
        loader: 'script', // script-loader
      },
    ],
  },
};
