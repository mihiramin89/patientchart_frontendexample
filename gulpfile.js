var gulp = require('gulp');
var gutils = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();


//runs task to minify all JS files in folder JS/
gulp.task('js', function() {
    gulp.src(
            [
                'public/scripts/main.js',
                'public/scripts/tabcontroller.js'
            ])
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/scripts'));
});

gulp.task('webserver', function() {
    connect.server();
});

gulp.task('log', function() {
    gutils.log(" === Mihir's Logging Information ===");
});

gulp.task('sass', function() {
    gulp.src('public/scss/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .on('error', gutils.log)
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'public'
        },
    })
})


gulp.task('default', ['js', 'watch', 'webserver', 'log', 'sass']);

// watch for when any js files change and then re-run js task to create minify file.


gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('public/scss/*.scss', ['sass']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('public/*.html', browserSync.reload);
    gulp.watch('public/scripts/*.js', browserSync.reload);
});