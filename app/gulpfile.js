'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    maps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate');


gulp
.task('concatScripts', function(){
	gulp.src([
		'js/app.js',
		'js/factory/*.js',
		'js/routes/*.js',
		'js/controllers/*.js', 
		'js/directives/*.js',
		'js/index.js'])
	.pipe(ngAnnotate({remove: true, add: true, single_quotes: true}))
	.pipe(maps.init())
	.pipe(concat("main.js"))
	.pipe(gulp.dest('js'))
})
.task('minifyScripts', function(){
	gulp.src('js/main.js')
	.pipe(uglify())
	.pipe(rename('main.min.js'))
	.pipe(gulp.dest('js'))
})
.task('compileSass', function(){
  return gulp.src('css/scss/*.scss')
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./min'))
      .pipe(gulp.dest('css/compiled'));
})
.task('minify-css', function() {
  return gulp.src('css/compiled/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('css/compiled/min/'));
})
.task('watchSass', function(){
  gulp.watch('css/scss/*.scss', ['compileSass']);
})
.task("build", ['concatScripts', 'minifyScripts', 'compileSass', 'minify-css'])
  .task("default", ['build']);
   

