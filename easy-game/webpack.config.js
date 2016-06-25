var path = require('path');

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
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015'],
        }
      },
      {
        test: /(pixi|phaser).js/,
        loader: 'script', // script-loader
      },
    ]
  }
};


// module.exports = {
//     entry: './app/app.js',
//     output: {
//         path: __dirname + '/build',
//         filename: 'bundle.js'
//     },
//     module: {
//       loaders: [
//         {
//           test: /\.js$/,
//           exclude: /(node_modules|bower_components)/,
//           loader: 'babel', // 'babel-loader' is also a legal name to reference
//           query: {
//             presets: ['es2015']
//           }
//         }
//       ]
//     }
// };
