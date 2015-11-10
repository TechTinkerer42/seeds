'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'browserify', 'glob', 'through2']
});

module.exports = function(){

  gulp.task('script', function(){
    var browserified = $.through2.obj(function(file, enc, next){
        $.browserify(file.path)
            .bundle(function(err, res){
                file.contents = res;
                next(null, file);
            });
    });

    return gulp.src('src/js/*.js')
        .on('error', $.util.log.bind($.util, 'browserify error.'))
        .pipe(browserified)
        .pipe(gulp.dest('tmp/js/'));

  });

};
