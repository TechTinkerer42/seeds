'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sprity = require('sprity');
var gulpif = require('gulp-if');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

module.exports = function(options) {
  
  gulp.task('sprity', function(){
    sprity.src({
        src: options.src + '/image/sprite/**/*.{png,jpg}',
        name: 'sprite',
        style: './sprite.less',
        cssPath: '../image',
        prefix: 'sprite',
        split: true
      }).on('error', options.errorHandler('Sprity'))
      .pipe(gulpif('*.png', gulp.dest(options.src + '/image/'), gulp.dest(options.src + '/less/')));
  });
    
  gulp.task('images', ['sprity'], function(){
    gulp.src(options.src + '/image/*.{jpg,png,gif}')
      .pipe(gulp.dest(options.tmp + '/serve/image'));
  });
    
  gulp.task('styles', ['sprity', 'images'], function () {
    var lessOptions = {
      options: [
        options.src + '/less/'
      ]
    };
      
    return gulp.src([
        options.src + '/less/*.less'
      ])
      .pipe(wiredep(options.wiredep))
      .pipe($.less(lessOptions)).on('error', options.errorHandler('Less'))
      .pipe(gulp.dest(options.tmp + '/serve/css/'))
      .pipe(browserSync.reload({ stream: true }));
  });
};
