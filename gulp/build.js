'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'browser-sync', 'del']
});

module.exports = function(opts) {

  gulp.task('html', ['style', 'sprity', 'image'], function () {
    var assets = $.useref.assets();

    return gulp.src('src/*.html')
      .pipe($.ejs())
      .pipe(assets)
      .pipe($.if('*.css', $.csso()))
      .pipe($.if('*.js', $.uglify()))
      .pipe($.rev())
      .pipe(assets.restore())
      .pipe($.revReplace({manifest: opts.styleTask.imageManifest}))
      .pipe($.useref())
      .pipe($.if('*.html', $.minifyHtml()))
      .pipe(gulp.dest('dist'));
  });

  gulp.task('build', function () {
    gulp.start(['style', 'image', 'html']);
  });

  gulp.task('serve:dist', ['build'], function () {
    $.browserSync.init({
      server: {
        baseDir: 'dist'
      },
      reloadDelay: 1000
    });
  });

};
