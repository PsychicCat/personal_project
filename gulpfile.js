var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', ['copy','build-js'], function(){
    gutil.log('Gulp ran.');
});

//copy angular and bootstrap files
gulp.task('copy', function(){
    gulp.src(['node_modules/angular/angular.min.js', 'node_modules/angular/angular.min.js.map'])
        .pipe(gulp.dest('public/vendors/angular'));
    gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('public/vendors/bootstrap'));
});

//uglify client app.js
gulp.task('build-js', function(){
    return gulp.src('client/javascripts/app.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/javascripts'))
});