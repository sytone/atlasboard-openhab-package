var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');


gulp.task('mocha', function() {
    return gulp.src(['jobs/*/test/*.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
    gulp.watch(['jobs/**', 'test/**'], ['mocha']);
});

gulp.task('default', ['watch-mocha']);