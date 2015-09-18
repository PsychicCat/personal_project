var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jade = require('gulp-jade');

gulp.task('default', ['copy','build-js', 'jade'], function(){
    gutil.log('Gulp ran.');
});

//copy angular files and css
gulp.task('copy', function(){
    gulp.src(['node_modules/angular/angular.min.js', 'node_modules/angular/angular.min.js.map', 'node_modules/angular-route/angular-route.min.js', 'node_modules/angular-route/angular-route.min.js.map'])
        .pipe(gulp.dest('public/vendors/angular'));
    gulp.src(['bower_components/angular-material/angular-material.css', 'bower_components/angular-material/angular-material.js'])
        .pipe(gulp.dest('public/vendors/angular-material'));
    gulp.src('bower_components/angular-aria/angular-aria.js')
        .pipe(gulp.dest('public/vendors/angular-aria'));
    gulp.src('bower_components/angular-animate/angular-animate.js')
        .pipe(gulp.dest('public/vendors/angular-animate'));
    gulp.src('client/stylesheets/*.css')
        .pipe(gulp.dest('public/stylesheets'));
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

//render jade templates
gulp.task('jade', function(){
   gulp.src('./client/**/*.jade')
       .pipe(jade())
       .pipe(gulp.dest('./public/'))
});