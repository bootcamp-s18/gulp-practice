var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');

// gulp.task('copyhtml', function() {
// 	return gulp.src('app/**/*.+(htm|html)')
// 		.pipe(gulp.dest('dist/'))
// });

gulp.task('copycss', function() {
	return gulp.src('app/css/**/*.css')
		.pipe(gulp.dest('dist/css/'))
});

gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/css/'))
});

gulp.task('inject', function() {
	var targets = gulp.src('app/**/*.+(htm|html)');
	var sources = gulp.src(['dist/css/**/*.css'], {read: false});
	return targets.pipe(inject(sources))
		.pipe(gulp.dest('dist/'));
});

gulp.task('default', function(callback) {
	runSequence(['sass', 'copycss'], 'inject', callback)
});
