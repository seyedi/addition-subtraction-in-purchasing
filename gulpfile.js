var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync').create()
    ;



// Define file sources
var sassMain = ['css/style.scss'];
var sassSources = ['css/**/*.scss']; // Any .scss file in any sub-directory
var jsSources = ['js/dev/*.js']; // Any .js file in scripts directory


// Task to do the things about sass and css
gulp.task('css', function () {
  return gulp.src(sassSources)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// Task to concatenate and uglify js files
gulp.task('js', function() {
  return gulp.src(jsSources)
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./js'));
});

// Task to watch for changes in our file sources
gulp.task('watch', ['browser-sync'], function() {
  gulp.watch(sassMain,['css']); // If any changes in 'sassMain', perform 'sass' task
  gulp.watch(sassSources,['css']);
  gulp.watch(jsSources, ['js-watch']);
  gulp.watch("*.html").on('change', browserSync.reload);
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], browserSync.reload);


// BrowserSync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Default gulp task
gulp.task('default', ['css', 'js']);

gulp.task('serve', ['watch']);
