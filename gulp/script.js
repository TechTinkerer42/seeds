'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*']
});

module.exports = function(){

  gulp.task('script', function(){
    return gulp.src('src/js/**/*.js')
      .pipe($.jsdependency({base: 'src/js'}))
      .pipe(gulp.dest('tmp/js/'));
  });

};

