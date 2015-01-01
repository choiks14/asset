/* jshint node:true */
'use strict';
// generated on 2014-12-30 using generator-gulp-webapp 0.2.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var mainBowerFiles = require('main-bower-files');
var config = require('./config.json');
var src = require('./src.json');


/**
 * scss로 된 파일 추가(vendors)
 * @param  
 * @return {[type]}   [description]
 */
gulp.task('style_vendors', function () {
  return gulp.src('app/styles/vendors.scss')
    .pipe($.plumber())
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10
    }))
    .pipe(gulp.dest(config.public_path + 'styles/'))
    .pipe(gulp.dest('.tmp/styles'));
});

/**
 * css로 된 파일 추가 
 * @param  
 * @return {[type]}   [description]
 */
gulp.task('style_libs', function () {
  return gulp.src(src.css.libs)
  .pipe($.concat('libs.css'))
  .pipe($.minifyCss())
  .pipe(gulp.dest(config.public_path + 'styles/'))
  .pipe($.size());
});

/**
 * main css
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
  .pipe(gulp.dest(config.public_path + 'jsons/'))
  .pipe($.size());
});


/**
 * templates
 * @return {[type]} [description]
 */
gulp.task('templates', function () {
  return gulp.src(src.etc.templates)
  .pipe(gulp.dest(config.public_path + 'templates/'))
  .pipe($.size());
});


/**
 * images
 * @return {[type]} [description]
 */
gulp.task('images', function () {
  return gulp.src('app/images/**.*')
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
    .pipe($.clean({force:true}));
});



gulp.task('default', ['clean'], function () {
     gulp.start('watch');
});


gulp.task('watch', ['fonts','images','templates','jsons',
          'style_vendors','style_libs','style_main',
          'jquery_maps',
          'script_vendors','scripts'], function () {

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch('app/templates/**/*', ['templates']);
  gulp.watch('app/styles/**/*.scss', ['style_main']);
});