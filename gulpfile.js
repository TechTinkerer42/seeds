'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'browser-sync', 'del']
});

var styleTask = require('./gulp/style');
var scriptTask = require('./gulp/script');
var devTask = require('./gulp/dev');
var buildTask = require('./gulp/build');

styleTask();
scriptTask();
devTask();
buildTask({styleTask: styleTask});

gulp.task('clean', function(){
  $.del('tmp');
  $.del('dist');
});

gulp.task('default', function(){
  gulp.start(['serve']);
});
