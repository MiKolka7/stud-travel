var   gulp = require('gulp')
    , sass = require('gulp-sass')
    , csso = require('gulp-csso')
    , gutil = require('gulp-util')
    , concat = require('gulp-concat')
    , notify = require('gulp-notify')
    , uglify = require('gulp-uglify')
    , connect = require('gulp-connect')
    , autoprefixer = require('gulp-autoprefixer')
    , imageminJpegtran = require('imagemin-jpegtran')
    , imageminPngquant = require('imagemin-pngquant')
    ;


//server
gulp.task('server', function () {
    connect.server({
        livereload: true
    });
});


//html
gulp.task('html', function () {
    gulp.src(['./index.html', './template/**/*.html'])
        .pipe(connect.reload());
});


//css
gulp.task('css', function () {
    gulp.src('./css/*.css')
        .pipe(connect.reload());
});


//js
gulp.task('js', function () {
    gulp.src('./js/**/*.js')
        .pipe(connect.reload());
});


//minify pic
gulp.task('minify-image', function () {
    gulp.src('./image/*')
        .pipe(imageminJpegtran({progressive: true})())
        .pipe(imageminPngquant({quality: '65-80', speed: 4})())
        .pipe(gulp.dest('./public/'));
});


//sass
gulp.task('sass', function () {
    gulp.src('./sass/**/*.sass')
        .pipe(sass().on('error', gutil.log))
        .pipe(gulp.dest('./css/'));
});


//watch
gulp.task('watch', function () {
    gulp.watch('./index.html', ['html']);
    gulp.watch('./sass/**/*', ['sass']);
    gulp.watch('./css/**/*', ['css']);
});


//minify css
gulp.task('minify-css', function () {
    gulp.src('./css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 38 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(gulp.dest('./css/'));
});


//minify js
gulp.task('minify-js', function () {
    gulp.src('./js/*')
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./public/js/'))
});


gulp.task('default', ['server', 'sass', 'watch']);
