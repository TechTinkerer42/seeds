'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'sprity']
});

module.exports.imageManifest = null;

module.exports = function(){

  gulp.task('style', function(){
    return gulp.src('src/less/*.less')
      .pipe($.less())
      .pipe(gulp.dest('tmp/css/'));
  });

  gulp.task('sprity', function(){
    return $.sprity.src({
      src: 'src/image/sprite/**/*.{png,jpg,gif}',
      name: 'sprite',
      style: './sprite.css',
      cssPath: '../image',
      prefix: 'sprite',
      split: true
    })
    .pipe($.if('*.png', gulp.dest('tmp/image/'), gulp.dest('tmp/css/')))
    .pipe($.if('*.png', gulp.dest('tmp/dev/image/')));
  });

};
