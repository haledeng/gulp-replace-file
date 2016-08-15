# gulp-replace-file
将JS文件中引用的模板文件编译成函数，css文件编译成字符串。

### install
```
npm i gulp-replace-file
```

### JS文件引用
```
var htmlFunc = __inline('./temp.html');
var htmlStr = htmlFunc(data);
var cssText = __inline('./test.css');
```

### gulp配置
```
gulp.task('replace', function() {
	gulp.src('replace/test.js')
		.pipe(replace())
		.pipe(gulp.dest('./build/'))
});
```

### config option
**prefix**:引用关键字，默认是`__inline`