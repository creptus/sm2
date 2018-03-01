/**
 * Created by akorolev on 07.12.2017.
 */

const gulp = require('gulp');
const concat = require('gulp-concat');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const path = require('path');

const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({browsers: ['last 2 versions']});

/*
gulp.task('js', function () {
    return gulp.src(['./app/simple.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('simple.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./resources/js/build'));

});
*/
/*
gulp.task('less', function () {
    return gulp.src('./resources/css/less/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')],
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('./resources/css/build'));
});
*/

// gulp.task('default', ['js','less']);

