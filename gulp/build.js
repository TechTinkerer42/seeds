'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {
    
  gulp.task('imagerev', ['html'], function(){
    var revFilter = $.filter(['**/*.{png,jpg,gif}', '**/*.css']);
    var cssFilter = $.filter('**/*.css');
    var imgFilter = $.filter('**/*.{png,jpg,gif}');
      
    function renameCSS(path){
      path.basename = path.basename.replace(/-[\da-f]{8,10}$/gi, '');
    }

    gulp.src(options.tmp + '/serve/**/*')
      .pipe(revFilter)
      .pipe($.rev())
      .pipe($.revCssUrl())
      .pipe(revFilter.restore())
      .pipe(imgFilter)
      .pipe(gulp.dest(options.dist));
  });

  gulp.task('html', ['inject'], function () {

    var htmlFilter = $.filter('*.html');
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var imgFilter = $.filter('**/*.{png,jpg,gif}');
    var revImgFilter = $.filter(['**/*.{png,jpg,gif}', '**/*.css']);
    var assets;
      
    return gulp.src(options.tmp + '/serve/*.html')
      .pipe(assets = $.useref.assets())
      .pipe(gulp.src(options.tmp + '/serve/image/*', {base: options.tmp + '/serve'}))
      .pipe($.rev())
      .pipe(revImgFilter)
      .pipe($.revCssUrl())
      .pipe(revImgFilter.restore())
      .pipe(jsFilter)
      .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', options.errorHandler('Uglify'))
      .pipe(jsFilter.restore())
      .pipe(assets.restore())
      .pipe($.useref())
      .pipe($.revReplace())
      .pipe(htmlFilter)
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true,
        conditionals: true
      }))
      .pipe(htmlFilter.restore())
      .pipe(gulp.dest(options.dist + '/'))
      .pipe($.size({ title: options.dist + '/', showFiles: true }));
  });

  gulp.task('fonts', function () {
    return gulp.src($.mainBowerFiles())
      .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe($.flatten())
      .pipe(gulp.dest(options.dist + '/fonts/'));
  });

  gulp.task('clean', function (done) {
    $.del([options.dist + '/', options.tmp + '/'], done);
  });

  gulp.task('build', ['html', 'fonts', 'imagerev']);
};
