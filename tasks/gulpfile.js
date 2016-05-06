'use strict';

var gulp  = require("gulp"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    ngAnnotate = require("gulp-ng-annotate"),
    cleanCSS = require('gulp-clean-css'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass');

var input = {
    javascript  : '../frontend/js/**/*.js',
    css         : '../frontend/css/*.scss'
};

var output = {
    javascript  : '../frontend/bundles/',
    css         : '../frontend/bundles/'
};

gulp.task('watcher', function() {
    gulp.watch(input.javascript, ['build-js']);
    gulp.watch(input.css, ['build-css']);
});

gulp.task("build-css", function () {
    console.log('Build CSS');
    return gulp.src(input.css)
             .pipe(concat('bundle.css'))
             .pipe(sass.sync().on('error', sass.logError))
             .pipe(gulp.dest(output.css));
});

gulp.task("build-js", function() {
    console.log('Build JS');
    return gulp.src(input.javascript)
            .pipe(sourcemaps.init())
            .pipe(concat("bundle.js"))
            .pipe(ngAnnotate())
            .pipe(sourcemaps.write())
            .on('error', onError)
            .pipe(gulp.dest(output.javascript));
}) ;

function onError(error) {
    console.error(error);
    this.emit(end);
}