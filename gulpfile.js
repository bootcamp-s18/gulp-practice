var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

// gulp.task('copyhtml', function() {
// 	return gulp.src('app/**/*.+(htm|html)')
// 		.pipe(gulp.dest('dist/'))
// });

gulp.task('copycss', function() {
	return gulp.src('app/css/**/*.css')
		.pipe(gulp.dest('dist/css/'))		
		.pipe(browserSync.reload({
      		stream: true
    	}))
});

gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.reload({
      		stream: true
    	}))
});

gulp.task('inject', function() {
	var targets = gulp.src('app/**/*.+(htm|html)');
	return targets.pipe(inject(gulp.src('dist/css/**/*.css', {read: false}), {ignorePath: 'dist'}))
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.reload({
      		stream: true
    	}))

});

gulp.task('default', function(callback) {
	runSequence(['sass', 'copycss'], 'inject', callback)
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		},
	})
});

gulp.task('watch', ['browserSync', 'sass'], function (){
	gulp.watch('app/scss/**/*.scss', ['sass']); 
 	gulp.watch('app/**/*.+(htm|html)', ['inject']);
 	gulp.watch('app/css/**/*.css', ['copycss']);
});