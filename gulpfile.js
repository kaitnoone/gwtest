var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var clip = require('gulp-clip-empty-files');
var rename = require('gulp-rename');
var include = require("gulp-include");

gulp.task('default', ['styles', 'javascript']);


gulp.task('styles', function () {
    return gulp.src('./src/stylesheets/**/*.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'ie > 9'],
            cascade: false
        }))
        .pipe(gulp.dest('./build/Stylesheets'))
        ;
});

gulp.task('javascript', function () {
    return gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/flickity/dist/flickity.pkgd.min.js',
        './src/scripts/**/*.js'
    ])
        .pipe(clip())
        .pipe(include())
        .on('error', console.log)
        .pipe(gulp.dest('./build/Javascript'))
        ;
});


gulp.task('watch', function () {
    gulp.watch('./src/stylesheets/**/*.scss', ['styles']);
    gulp.watch('./src/scripts/**/*.js', ['javascript']);
});