/**
 * Created by akorolev on 07.12.2017.
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');

/*
 gulp.task('js', function () {
 return gulp.src(['./js/simple.js'
 ])
 .pipe(sourcemaps.init())
 .pipe(babel({
 presets: ['es2015']
 }))
 .pipe(concat('simple.js'))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest('./js/build'));

 });*/

/*
gulp.task('css', function () {
    return gulp.src(['./css/simple.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('simple.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./js/build'));

});*/


gulp.task('default', ['js']);

