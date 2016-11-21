var gulp = require('gulp');
var replace = require('../');


gulp.task('replace', function() {
	gulp.src('replace/test.js')
		.pipe(replace())
		.pipe(gulp.dest('./build/'))
});