/*jshint esversion: 6 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var autoprefixer = require('autoprefixer');
var mainBowerFiles = require('main-bower-files');
var browserSync = require('browser-sync').create();
var minimist = require('minimist');
var gulpSequence = require('gulp-sequence');

var envOptions = {
    string: 'env',
    default: {env:'develop'}
};
var options = minimist(process.argv.slice(2), envOptions);

gulp.task('clean', function () {
    return gulp.src(['./.tmp','./public'], {
            read: false
        })
        .pipe($.clean());
});

gulp.task('copyHTML', function () {
    return gulp.src('./source/**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('./public/'));
});

gulp.task('jade', function () {
    // var YOUR_LOCALS = {};

    gulp.src('./source/*.jade')
        .pipe($.plumber())
        .pipe($.jade({
            pretty: true
            // locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('./public/'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function () {
    var plugins = [
        autoprefixer({
            browsers: ['last 3 version', '>5%']
        })
    ];
    return gulp.src('./source/sass/**/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.postcss(plugins))
        .pipe($.if(options.env === 'production',$.minifyCss()))
        .pipe($.sourcemaps.write("."))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});

gulp.task('babel', () => {
    return gulp.src("./source/js/**/*.js")
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(
        $.babel({
            presets: ["es2015"]
        })
    )
    //要輸出的檔名
    .pipe($.concat("all.js"))
    .pipe($.if(options.env === 'production', $.uglify({
        compress: {
            drop_console: true
        }
    })))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest("./public/js"))
    .pipe(browserSync.stream());
});

gulp.task('bower',function () {
    return gulp.src(mainBowerFiles())
    .pipe(gulp.dest('./.tmp/vendors'));
});

gulp.task('vendorJs',['bower'],function () {
    return gulp.src('./.tmp/vendors/**/**.js')
    .pipe($.concat('vender.js'))
    .pipe($.if(options.env === 'production', $.uglify()))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('browser-sync',function () {
    browserSync.init({
        server:{
            baseDir:"./public"
        },
        reloadDebounce: 2000
    });
});

gulp.task('image-min', () =>
    gulp.src('./source/images/*')
    .pipe($.if(options.env === 'production', $.imagemin()))
    .pipe(gulp.dest('./public/images'))
);

gulp.task('watch', function () {
    gulp.watch('./source/sass/**/*.scss', ['sass']);
    gulp.watch('./source/*.jade', ['jade']);
    gulp.watch('./source/js/**/*.js', ['babel']);
});

gulp.task('deploy', function () {
    return gulp.src('./public/**/*')
        .pipe($.ghPages());
});

gulp.task('build', gulpSequence('clean', 'jade', 'sass', 'babel', 'vendorJs'));
gulp.task('default', ['jade', 'sass', 'babel', 'vendorJs', 'browser-sync','image-min', 'watch']);rr