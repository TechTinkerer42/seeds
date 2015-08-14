'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {
    
  gulp.task('rev', ['html'], function(){
    var revFilter = $.filter(['**/*.{png,jpg,gif}', '**/*.css']);
    var htmlFilter = $.filter('*.html');
      
    gulp.src(options.tmp + '/.dist/**/*')
      .pipe($.rev())
      .pipe(revFilter)
      .pipe($.revCssUrl())
      .pipe(revFilter.restore())
      .pipe($.revReplace())
      .pipe(htmlFilter)
      .pipe($.rename(function(path){
          path.basename = path.basename.replace(/-\w{8}$/gi, '');
      }))
      .pipe(htmlFilter.restore())
      .pipe(gulp.dest(options.dist + '/'))
      .pipe($.size({ title: options.dist + '/', showFiles: true }));
  });

  gulp.task('html', ['inject'], function () {

    var imageStream = gulp.src(options.tmp + '/serve/image/**/*')
        .pipe(gulp.dest(options.tmp + '/.dist/image/'));
    var htmlFilter = $.filter('*.html');
    var jsFilter = $.filter('**/*.js');
    var assets = $.useref.assets({additionalStreams: imageStream});
     
    return gulp.src(options.tmp + '/serve/*.html')
      .pipe(assets)
      .pipe(jsFilter)
      .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', options.errorHandler('Uglify'))
      .pipe(jsFilter.restore())
      .pipe(assets.restore())
      .pipe($.useref())
      .pipe(htmlFilter)
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true,
        conditionals: true
      }))
      .pipe(htmlFilter.restore())
      .pipe(gulp.dest(options.tmp + '/.dist/'));
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

  gulp.task('build', ['html', 'rev', 'fonts']);
};
