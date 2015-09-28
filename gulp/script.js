'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var mergeStream = require('merge-stream');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'watchify', 'browserify', 'glob']
});

module.exports = function(){

  gulp.task('script', function(){
    var files = $.glob.sync('src/js/*.js');
    var stream = mergeStream();

    files.forEach(function(file){
      var b = $.watchify($.browserify(file));
      var name = file.replace(/^.*\/(?=[^\/]+\.js$)/gi, '');

      var bundle = b.bundle()
        .on('error', $.util.log.bind($.util, 'Browserify Error.'))
        .pipe(source(name))
        .pipe(gulp.dest('tmp/js/'));

      stream.add(bundle);
    });

    return stream;

  });

};
