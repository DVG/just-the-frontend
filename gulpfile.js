var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var slim = require("gulp-slim");

var gulpFilter = require('gulp-filter');
var uglify = require('gulp-uglify');
var mainBowerFiles = require('main-bower-files');


gulp.task('vendor', function() {
  gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public'));
});
 
gulp.task('slim', function(){
  gulp.src("./src/slim/**/*.slim")
    .pipe(slim({pretty: true}))
    .pipe(gulp.dest('./public'));
});

gulp.task('sass', function () {
  gulp.src('./src/scss/application.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public'));
});

gulp.task('coffee', function() {
  gulp.src('./src/coffee/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(concat('application.js'))
    .pipe(gulp.dest('./public'));
});

gulp.task('watch', ['sass', 'coffee', 'slim', 'vendor'], function() {
  gulp.watch('./gulpfile.js', ['sass', 'coffee', 'slim', 'vendor']);
  gulp.watch('bower_components/**/*.min.js', ['vendor']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/coffee/**/*.coffee', ['coffee']);
  gulp.watch('src/slim/**/*.slim', ['slim']);
});