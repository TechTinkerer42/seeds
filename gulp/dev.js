'use strict';

var gulp = require('gulp');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'browser-sync']
});

module.exports = function() {

  gulp.task('dev', ['style', 'script'], function () {
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

  gulp.task('watch', function () {
    gulp.watch('src/image/sprite/**/*.{png, jpg, gif}', ['sprity']);
    gulp.watch('src/less/**/*.less', ['style', 'dev']);
    gulp.watch('src/js/**/*.js', ['script', 'dev']);
    gulp.watch('src/**/*.html', ['dev']);
  });

  gulp.task('serve', ['style', 'dev'], function () {
    $.browserSync.init({
      server: {
        baseDir: 'tmp/dev'
      },
      reloadDelay: 1000
    });
    $.browserSync.watch('tmp/dev/**/*').on('change', function () {
      $.browserSync.reload();
    });
    gulp.start(['watch']);
  });
};
