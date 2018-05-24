var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('copy', function() {
	return gulp.src('app/**/*.+(htm|html)')
		.pipe(gulp.dest('dist/'))
})

gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/css/'))
})

