'use strict';

var gulp = require('gulp');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'browser-sync']
});

module.exports = function() {

  gulp.task('serve:html', function () {
    var assets = $.useref.assets();

    gulp.src('src/image/*.{png,jpg,gif}')
      .pipe(gulp.dest('tmp/dev/image/'));

    return gulp.src('src/*.html')
      .pipe($.ejs())
      .pipe(assets)
      .pipe(assets.restore())
      .pipe($.useref())
      .pipe(gulp.dest('tmp/dev'));
  });

  gulp.task('dev', ['sprity', 'style', 'script'], function () {
      gulp.start('serve:html');
  });

  gulp.task('watch', function () {
    gulp.watch('src/image/sprite/**/*.{png, jpg, gif}', ['sprity']);
    gulp.watch('src/less/**/*.less', ['style']);
    gulp.watch('src/js/**/*.js', ['script']);
    gulp.watch('src/**/*.html', ['serve:html']);
    gulp.watch(['tmp/css/**/*.css', 'tmp/js/**/*.js'], ['serve:html']);
  });

  gulp.task('serve', ['dev'], function () {
    $.browserSync.init({
      server: {
        baseDir: 'tmp/dev'
      },
      reloadDelay: 1000
    });
    $.browserSync.watch(['tmp/dev/**/*.html']).on('change', function () {
      $.browserSync.reload();
    });
    gulp.start(['watch']);
  });
};
