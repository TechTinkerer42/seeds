'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'browser-sync', 'del']
});

module.exports = function() {

  var imageRevManifest;

  gulp.task('build:html', ['style', 'sprity', 'build:image', 'script'], function () {
    var assets = $.useref.assets();

    return gulp.src('src/*.html')
      .pipe($.ejs())
      .pipe(assets)
      .pipe($.if('*.css', $.csso()))
      .pipe($.if('*.js', $.uglify()))
      .pipe($.rev())
      .pipe(assets.restore())
      .pipe($.useref())
      .pipe($.revReplace({manifest: imageRevManifest}))
      .pipe($.if('*.html', $.minifyHtml()))
      .pipe(gulp.dest('dist'));
  });

  gulp.task('build:image', ['sprity', 'style'], function(){
    var imageFilter = $.filter('*.{jpg,png,gif}', {restore: true});
    gulp.src(['src/image/*.{jpg,png,gif}', 'tmp/image/*.{jpg,png,gif}', 'tmp/css/*.css'])
      .pipe(imageFilter)
      .pipe($.rev())
      .pipe(gulp.dest('dist/image/'))
      .pipe(imageFilter.restore)
      .pipe($.revReplace())
      .pipe($.if('*.css', gulp.dest('tmp/css/')))
      .pipe(imageRevManifest = $.rev.manifest());
  });

  gulp.task('build', function () {
    gulp.start(['build:html']);
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
