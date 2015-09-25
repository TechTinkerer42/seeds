'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'browser-sync', 'del']
});

require('./gulp/style')();
require('./gulp/script')();
require('./gulp/dev')();
require('./gulp/build')();

gulp.task('clean', function(){
  $.del(['tmp/', 'dist/']);
});

gulp.task('clean:tmp', function(){
  $.del(['tmp/']);
});

gulp.task('clean:dist', function(){
  $.del(['dist/']);
});

gulp.task('default', function(){
  gulp.start(['build']);
});
