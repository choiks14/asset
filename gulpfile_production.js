/* jshint node:true */
'use strict';
// generated on 2014-12-30 using generator-gulp-webapp 0.2.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var mainBowerFiles = require('main-bower-files');
var config = require('./config.json');
var src = require('./src.json');


gulp.task('style_vendors', function () {
  return gulp.src('app/styles/vendors.scss')
    .pipe($.plumber())
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10
    }))
    .pipe($.minifyCss())
    .pipe(gulp.dest(config.public_path + 'styles/'))
    .pipe(gulp.dest('.tmp/styles'));
});


gulp.task('style_libs', function () {
  return gulp.src(src.css.libs)
  .pipe($.concat('libs.css'))
  .pipe($.minifyCss())
  .pipe(gulp.dest(config.public_path + 'styles/'))
  .pipe($.size());
});

/**
 * styles
 * @return {[type]} [description]
 */
gulp.task('style_main', function () {
  return gulp.src('app/styles/main.scss')
  .pipe($.rubySass({
    style: 'expanded',
    precision: 10,
    compass:true,
    debugInfo:false,
    lineNumbers:false
  }))
  .pipe($.autoprefixer('last 1 version'))
  .pipe($.minifyCss())
  .pipe(gulp.dest(config.public_path + 'styles/'))
  .pipe($.size());
});


/**
 * script_vendors
 * @return {[type]} [description]
 */
gulp.task('script_vendors', function () {
  return gulp.src(src.js.vendors)
  .pipe($.sourcemaps.init())
  .pipe($.concat('vendors.js'))
  .pipe($.uglify())
  .pipe(gulp.dest(config.public_path + 'scripts/'))
  .pipe($.jshint.reporter(require('jshint-stylish')))
  .pipe($.size());
});

/**
 * scripts
 * @return {[type]} [description]
 */
gulp.task('scripts', function () {
  return gulp.src(src.js.main)
  .pipe($.concat('main.js'))
  .pipe($.uglify())
  .pipe(gulp.dest(config.public_path + 'scripts/'))
  .pipe($.jshint.reporter(require('jshint-stylish')))
  .pipe($.size());
});


/**
 * jquery_maps
 * @return {[type]} [description]
 */
gulp.task('jquery_maps', function () {
  return gulp.src(src.etc.maps)
  .pipe(gulp.dest(config.public_path + 'scripts/'))
  .pipe($.size());
});



/**
 * fonts
 * @return {[type]} [description]
 */
gulp.task('fonts', function () {
  return  gulp.src(mainBowerFiles({filter:/^.*.(eot|svg|ttf|woff)$/i}))
  .pipe($.flatten())
  .pipe(gulp.dest(config.public_path + 'fonts/'))
  .pipe($.size());
});


/**
 * jsons
 * @return {[type]} [description]
 */
gulp.task('jsons', function () {
  return gulp.src(src.etc.jsons)
  .pipe($.jsonminify())
  .pipe(gulp.dest(config.public_path + 'jsons/'))
  .pipe($.size());
});


/**
 * templates
 * @return {[type]} [description]
 */
gulp.task('templates', function () {
  return gulp.src(src.etc.templates)
  .pipe($.minifyHtml())
  .pipe(gulp.dest(config.public_path + 'templates/'))
  .pipe($.size());
});


/**
 * images
 * @return {[type]} [description]
 */
gulp.task('images', function () {
  return gulp.src(src.etc.images)
  .pipe($.cache($.imagemin({
    optimizationLevel: 3,
    progressive: true,
    interlaced: true
  })))
  .pipe(gulp.dest(config.public_path + 'images/'))
  .pipe($.size());
});

/**
 * clean
 * @return {[type]} [description]
 */
gulp.task('clean', function () {
  return gulp.src(src.etc.clean, { read: false })
      .pipe($.ignore.exclude("/packages"))
    .pipe($.clean({force:true}));
});


gulp.task('clean_public', function () {
  return gulp.src(config.public_path, { read: false })
    .pipe($.clean({force:true}));
});



/**
 * build
 * @param  
 * @return {[type]}   [description]
 */
gulp.task('build', ['clean_public'], function () {
  gulp.start('release');
});


/**
 * build
 * @param  {[type]} ) {                       } [description]
 * @return {[type]}   [description]
 */
gulp.task('release', ['fonts','images','templates','jsons',
          'style_vendors','style_libs','style_main',
          'script_vendors','jquery_maps', 'scripts'], function () {
            
});
