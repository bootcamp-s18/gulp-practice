var gulp = require('gulp');

gulp.task('copy', function() {
	return gulp.src('app/**/*.+(htm|html)')
		.pipe(gulp.dest('dist/'))
})
