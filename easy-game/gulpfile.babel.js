import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import clean from 'gulp-clean';
import merge from 'gulp-merge';
import eslint from 'gulp-eslint';
import webpackConfig from './webpack.config.js';

gulp.task('clean', () =>
	gulp
		.src('./build', { read: false })
		.pipe(clean())
);

gulp.task('lint', () =>
	gulp
		.src('./src/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
);

gulp.task('copy', ['clean', 'lint'], () => {
  const index = gulp
		.src('./src/index.html')
    .pipe(gulp.dest('./build'));
  const assets = gulp
    .src('./src/assets/**/*')
    .pipe(gulp.dest('./build/assets'));
  return merge(index, assets);
});

gulp.task('build:prod', ['copy'], (callback) => {
  const config = Object.create(webpackConfig);
  config.plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ];

  const compiler = webpack(config);

  compiler.run((err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack:build:prod', err);
    }
    gutil.log('[webpack:build:prod]', stats.toString({
      colors: true,
    }));
    callback();
  });
});

gulp.task('build:dev', ['copy'], (callback) => {

  const config = Object.create(webpackConfig);
  config.devtool = 'sourcemap'; // What's this?
  config.debug = true;

  const compiler = webpack(config);

  compiler.run((err, stats) => {

    if (err) {
      throw new gutil.PluginError('webpack:build:dev', err);
    }

    gutil.log('[webpack:build:dev]', stats.toString({
      colors: true,
    }));

    callback();

  });

});

gulp.task('serve', ['copy'], (callback) => {

  const config = Object.create(webpackConfig);
  config.devtool = 'eval';
  config.debug = true;

  const compiler = webpack(config);

  const devServerConfig = {
    contentBase: 'build/',
    publicPath: `/${config.output.publicPath}`,
  };

  new WebpackDevServer(compiler, devServerConfig)
    .listen(8080, 'localhost', (err) => {

      if (err) {
        throw new gutil.PluginError('webpack-dev-server', err);
      }

      gutil.log('[webpack:serve]', 'http://localhost:8080/');

      callback();

    }
  );

});
